import Cards from "@/app/_components/Cards";
import { getPosts } from "@/app/api/dato/getPosts";
import styles from "./page.module.scss";
import { Metadata } from "next";
import { PostType } from "@/types";

export const metadata: Metadata = {
  title: "류준열 기술 블로그",
  description: "프론트엔드 개발자 류준열 이력서",
};

export default async function Home() {
  const { allArticles } = await getPosts<{
    allArticles: Omit<PostType, "markdown">[];
  }>();

  return (
    <>
      <h1 className={styles.heading}>{"프론트엔드 개발자 류준열"}</h1>
      <Cards allArticles={allArticles} />;
    </>
  );
}
