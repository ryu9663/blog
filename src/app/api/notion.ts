import "server-only";
import NotionExporter from "notion-exporter";
import { Client } from "@notionhq/client";

export const getPosts = async (): Promise<string[]> => {
  "use server";

  const fileToken = process.env.NOTION_FILE_TOKEN;
  const tokenV2 = process.env.NOTION_TOKEN_V2;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("databaseId를 찾지 못했습니다.");
  }
  if (!tokenV2) {
    throw new Error("tokenV2을 찾지 못했습니다.");
  }
  if (!fileToken) {
    throw new Error("fileToken을 찾지 못했습니다.");
  }

  const postIds: string[] = await getPostIds(databaseId);
  console.log("포스트아이디", postIds);
  const markdowns: string[] = await getMarkdowns({
    postIds,
    tokenV2,
    fileToken,
  });
  console.log("마크다운", markdowns);

  return markdowns;
};

export const getPostIds = async (databaseId: string) => {
  "use server";

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
  console.log("일");
  const markdowns = await Promise.all(
    postIds.map(async (postId) => {
      console.log("이");
      const markdown = await new NotionExporter(tokenV2, fileToken).getMdString(
        postId
      );
      console.log("삼");
      return markdown;
    })
  );
  console.log("사");
  return markdowns;
};
