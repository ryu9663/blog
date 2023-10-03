import NotionClient from "@/app/api/notion/model/notionClient";

const notion = new NotionClient();

export const getPostIds = () => notion.getPostIds();
export const getMarkdowns = (postIds: string[]) => notion.getMarkdowns(postIds);
export const getPostMetaDatas = () => notion.getPostMetaDatas();
