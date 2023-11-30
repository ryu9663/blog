import Cards from "@/app/_components/Cards";
import { getPosts } from "@/app/api/dato/getPosts";
import { Metadata } from "next";
import { PostType } from "@/types";
import { Posts } from "@/app/_components/Posts";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "류준열 기술 블로그",
  description: "프론트엔드 개발자 류준열의 기술 블로그",
};

export default async function Home() {
  const { allArticles: articles } = await getPosts<{
    allArticles: Pick<
      PostType,
      "id" | "metaField" | "category" | "_createdAt"
    >[];
  }>();

  return (
    <>
      <h2 className={styles.heading_2}>{`게시글 전체 보기`}</h2>
      <Posts>
        <Cards articles={articles} />
      </Posts>
    </>
  );
}
