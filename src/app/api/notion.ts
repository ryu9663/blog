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
  const markdowns: string[] = await getMarkdowns({
    postIds,
    tokenV2,
    fileToken,
  });

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
