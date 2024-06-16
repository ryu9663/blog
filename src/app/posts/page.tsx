import { getPosts } from "@/app/api/dato/getPosts";
import { Metadata } from "next";
import { PostType, SearchParamsType } from "@/types";
import { Posts } from "@/app/_components/Posts";
import styles from "./page.module.scss";
import { paginatePosts } from "@/libs/paginate";

export const metadata: Metadata = {
  title: "류준열 기술 블로그",
  description: "개발자 류준열의 기술 블로그",
};

export default async function Home({ searchParams }: SearchParamsType) {
  const currentPage = Number(searchParams.currentPage);
  const pageSize = Number(searchParams.pageSize);

  const { allArticles: articles } = await getPosts<{
    allArticles: PostType[];
  }>();

  const posts = paginatePosts({
    posts: articles,
    currentPage,
    pageSize,
  });
  return (
    <>
      <h2 className={styles.heading}>{`게시글 전체 보기`}</h2>
      <Posts posts={posts} />
    </>
  );
}
