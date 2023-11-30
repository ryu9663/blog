import { getPosts } from "@/app/api/dato/getPosts";
import { PostType } from "@/types";
import Rss from "rss";
const baseUrl = `https://wnsdufdl.com`;

export const generateRss = async () => {
  try {
    const date = new Date();
    const { allArticles } = await getPosts<{
      allArticles: Pick<
        PostType,
        "id" | "metaField" | "category" | "_createdAt"
      >[];
    }>(`query allArticles {
      allArticles(orderBy: _createdAt_DESC) {
        id
        _createdAt
        metaField {
          description
          title
          
        }    
      }
    }`);

    const posts = allArticles.map(({ id, _createdAt, metaField }) => ({
      id,
      _createdAt,
      title: metaField.title,
      description: metaField.description,
    }));

    const feed = new Rss({
      title: "류준열의 기술 블로그",
      description: "류준열의 기술 블로그",
      copyright: `All rights reserved ${date.getFullYear()}, 류준열`,
      feed_url: `${baseUrl}/rss.xml`,
      site_url: baseUrl,
      language: "ko",
      pubDate: date.toUTCString(),
    });

    posts.forEach(({ id, title, description, _createdAt }) => {
      const url = `${baseUrl}/post/${id}`;
      feed.item({
        title,
        url,
        description,
        author: "류준열",
        guid: url,
        date: new Date(_createdAt).toLocaleDateString(),
      });
    });

    return feed.xml();
  } catch (error) {
    console.error("Error generating Rss feed", error);
  }
};
