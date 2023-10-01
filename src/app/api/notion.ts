import NotionExporter from "notion-exporter";

export async function getPosts() {
  "use server";

  const { fileToken, tokenV2, databaseId } = await validateTokens({
    fileToken: process.env.NOTION_FILE_TOKEN,
    tokenV2: process.env.NOTION_TOKEN_V2,
    databaseId: process.env.NOTION_DATABASE_ID,
  });

  const postIds: string[] = await getPostIds(databaseId);
  const markdowns = await getMarkdowns({ postIds, tokenV2, fileToken });

  return markdowns;
}

export const getPostIds = async (databaseId: string) => {
  "use server";

  const { Client } = require("@notionhq/client");
  const notion = new Client({ auth: process.env.NOTION_KEY });

  const data = await notion.databases.query({ database_id: databaseId });
  const postIds = data.results.map((res: any) => res.id);
  return postIds;
};

export const getMarkdowns = async ({
  postIds,
  tokenV2,
  fileToken,
}: {
  postIds: string[];
  tokenV2: string;
  fileToken: string;
}) => {
  "use server";

  const markdowns = await Promise.all(
    postIds.map(async (postId) => {
      const markdown = await new NotionExporter(tokenV2, fileToken).getMdString(
        postId
      );
      return markdown;
    })
  );
  return markdowns;
};

const validateTokens = async ({
  databaseId,
  tokenV2,
  fileToken,
}: {
  databaseId?: string;
  tokenV2?: string;
  fileToken?: string;
}) => {
  "use server";

  if (!databaseId) {
    throw new Error("databaseId를 찾지 못했습니다.");
  }
  if (!tokenV2) {
    throw new Error("tokenV2을 찾지 못했습니다.");
  }
  if (!fileToken) {
    throw new Error("fileToken을 찾지 못했습니다.");
  }
  return {
    databaseId,
    tokenV2,
    fileToken,
  };
};
