import { Posts } from "@/app/_components/Posts";
import { getPosts } from "@/app/api/dato/getPosts";
import { PostType, SearchParamsType } from "@/types";
import { CategoryType } from "junyeol-components";
import { Metadata } from "next";
import React from "react";
import styles from "../page.module.scss";
import { getCategories } from "@/app/api/dato/getCategories";
import { getCategoriesAndSubCategories } from "@/app/sitemap";
import { paginatePosts } from "@/libs/paginate";

interface PostsPageFilteredByCategory extends SearchParamsType {
  params: {
    category: CategoryType;
  };
}

export async function generateStaticParams() {
  const { allArticles: categories } = await getCategories<{
    allArticles: Pick<PostType, "category">[];
  }>(`
  query allArticles {
    allArticles {
        category
    }
  }
`);
  const { mainCategoriesUrlPath } = getCategoriesAndSubCategories(categories);

  return mainCategoriesUrlPath.map((el) => ({
    category: el.split("/")[1],
  }));
}

export default async function PostsPageFilteredByCategory({
  params,
  searchParams,
}: PostsPageFilteredByCategory) {
  const { category } = params;
  // const currentPage = Number(searchParams.currentPage);
  // const pageSize = Number(searchParams.pageSize);
  const { allArticles: articles } = await getPosts<{
    allArticles: PostType[];
  }>();

  const filteredArticles = articles.filter(
    (article) => !!article.category.category[category],
  );
  // ** pagination으로 바꿀때 주석 해제 **//

  // const { paginatedArticles, hasNext, hasPrev } = paginatePosts({
  //   posts: filteredArticles,
  //   currentPage,
  //   pageSize,
  // });

  return (
    <>
      <h2 className={styles.heading}>{`${category}`}</h2>

      {/* <Posts posts={paginatedArticles} hasNext={hasNext} hasPrev={hasPrev} /> */}
      <Posts posts={filteredArticles} />
    </>
  );
}

export async function generateMetadata({
  params,
}: PostsPageFilteredByCategory): Promise<Metadata> {
  const { category } = params;

  return {
    title: category,
    description: `류준열의 기술 블로그 ${category} 주제 모아보기`,
  };
}
