import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export interface PostMetaDataType {
  title: string;
  description: string;
  date: Date;
  ogImg: {
    src: string;
    alt: string;
  };
}

const databaseId = process.env.NOTION_DATABASE_ID as string;

export default class NotionClient {
  private static client: Client = new Client({
    auth: process.env.NOTION_KEY,
  });
  private readonly client: Client;
  constructor() {
    this.client = NotionClient.client;
  }

  async getPostIds() {
    const data = await this.client.databases.query({ database_id: databaseId });

    const postIds = data.results.map((res: any) => res.id);
    return postIds;
  }

  async getMarkdowns(postIds: string[]) {
    const n2m = new NotionToMarkdown({ notionClient: this.client });

    const markdowns = Promise.all(
      postIds.map(async (postId) => {
        const mdblocks = await n2m.pageToMarkdown(postId);
        const mdString = n2m.toMarkdownString(mdblocks);
        const markdown = mdString.parent;
        const regex = /!\[(.*?)\]\((.*?)\)/g;
        const convertedMarkdown = markdown.replace(regex, "");
        return convertedMarkdown;
      })
    );

    return markdowns;
  }

  async getPostMetaDatas() {
    const data = await this.client.databases.query({ database_id: databaseId });
    const _metas = data.results.map((res: any) => res.properties);
    const metas: PostMetaDataType[] = _metas.map((meta) => ({
      title: meta.title.title[0].plain_text,
      description: meta.description.rich_text[0].plain_text,
      date: meta.date.date.start,
      ogImg: {
        src: meta.ogImg.rich_text[0].plain_text,
        alt:
          // 'https://junesdevlog-s3.s3.ap-northeast-2.amazonaws.com/abc.png' 에서 abc 추출
          meta.ogImg.rich_text[0].plain_text.match(
            /\.amazonaws\.com\/(.*?)\.\w+$/
          )[1] || "thumbnail",
      },
    }));

    return metas;
  }
}
