import Cards from "@/app/_components/Cards";
import { getPosts } from "@/app/api/dato/getPosts";
import styles from "./page.module.scss";
import { Metadata } from "next";
import { PostType } from "@/types";
import { Posts } from "@/app/_components/Posts";

export const metadata: Metadata = {
  title: "류준열 기술 블로그",
  description: "프론트엔드 개발자 류준열 이력서",
};

export default async function Home() {
  const { allArticles: articles } = await getPosts<{
    allArticles: Pick<
      PostType,
      "id" | "metaField" | "media" | "category" | "_publishedAt"
    >[];
  }>();

  return (
    <>
      <h1 className={styles.heading}>{"프론트엔드 개발자 류준열"}</h1>

      <Posts>
        <Cards articles={articles} />
      </Posts>
    </>
  );
}
