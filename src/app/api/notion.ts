import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({ auth: process.env.NOTION_KEY });
const fileToken = process.env.NOTION_FILE_TOKEN;
const tokenV2 = process.env.NOTION_TOKEN_V2;
const databaseId = process.env.NOTION_DATABASE_ID;

export const getPosts = async () => {
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

  const postIds: string[] = await getPostIds(databaseId);
  const markdowns = await getMarkdowns({ notion, postIds });

  return markdowns;
};

export const getPostIds = async (databaseId: string) => {
  "use server";

  const notion = new Client({ auth: process.env.NOTION_KEY });

  const data = await notion.databases.query({ database_id: databaseId });

  const postIds = data.results.map((res: any) => res.id);
  return postIds;
};

const getMarkdowns = async ({
  notion,
  postIds,
}: {
  notion: Client;
  postIds: string[];
}) => {
  "use server";
  const n2m = new NotionToMarkdown({ notionClient: notion });

  const markdowns = Promise.all(
    postIds.map(async (postId) => {
      const mdblocks = await n2m.pageToMarkdown(postId);
      const mdString = n2m.toMarkdownString(mdblocks);
      console.log("이mdblock", mdblocks);
      //   console.log("이mdString", mdString);
      return mdString.parent;
    })
  );
  return markdowns;
};

export interface PostMetaDataType {
  title: string;
  description: string;
  date: Date;
  ogImg: {
    src: string;
    alt: string;
  };
}
export const getPostMetaDatas = async () => {
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
  const data = await notion.databases.query({ database_id: databaseId });
  const _metas = data.results.map((res: any) => res.properties);
  const metas: PostMetaDataType[] = _metas.map((meta) => ({
    title: meta.title.title[0].plain_text,
    description: meta.description.rich_text[0].plain_text,
    date: meta.date.date.start,
    ogImg: {
      src: meta.ogImg.rich_text[0].plain_text,
      alt:
        meta.ogImg.rich_text[0].plain_text.match(
          /\.amazonaws\.com\/(.*?)\.\w+$/
        )[1] || "thumbnail",
    },
  }));

  return metas;
};
