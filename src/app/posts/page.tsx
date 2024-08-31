import { getPosts } from "@/app/api/dato/getPosts";
import { Metadata } from "next";
import { PostType, SearchParamsType } from "@/types";
import { Posts } from "@/app/_components/Posts";
import styles from "./page.module.scss";
// ** pagination으로 바꿀때 주석 해제 **//

// import { paginatePosts } from "@/libs/paginate";

export const metadata: Metadata = {
  title: "류준열 기술 블로그",
  description: "개발자 류준열의 기술 블로그",
};

export default async function Home({ searchParams }: SearchParamsType) {
  // ** pagination으로 바꿀때 주석 해제 **//

  // const currentPage = Number(searchParams.currentPage);
  // const pageSize = Number(searchParams.pageSize);

  const { allArticles: articles } = await getPosts<{
    allArticles: PostType[];
  }>();
  // ** pagination으로 바꿀때 주석 해제 **//

  // const { paginatedArticles, hasNext, hasPrev } = paginatePosts({
  //   posts: articles,
  //   currentPage,
  //   pageSize,
  // });

  return (
    <>
      <h2 className={styles.heading}>{`게시글 전체 보기`}</h2>

      {/* <Posts posts={paginatedArticles} hasNext={hasNext} hasPrev={hasPrev} /> */}
      <Posts posts={articles} />
    </>
  );
}
