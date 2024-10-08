import { Posts } from "@/app/_components/Posts";
import { getPosts } from "@/app/api/dato/getPosts";
import { PostType, SearchParamsType } from "@/types";
import { CategoryType } from "junyeol-components";
import { Metadata } from "next";
import React from "react";
import styles from "../../page.module.scss";
import { getCategories } from "@/app/api/dato/getCategories";
import { getCategoriesAndSubCategories } from "@/app/sitemap";
import { paginatePosts } from "@/libs/paginate";

interface PostsPageFilteredBySubCategory extends SearchParamsType {
  params: {
    category: CategoryType;
    subCategory: string;
  };
}

export async function generateStaticParams() {
  const { allArticles: categories } = await getCategories<{
    allArticles: Pick<PostType, "category" | "_createdAt">[];
  }>(`
  query allArticles {
    allArticles {
        category
    }
  }
`);
  const { subCategoriesUrlPath } = getCategoriesAndSubCategories(categories);

  return subCategoriesUrlPath.map((subCategories) => {
    const category = subCategories.split("/")[1];
    const subCategory = subCategories.split("/")[2];
    return {
      category,
      subCategory,
    };
  });
}

export default async function PostsPageFilteredBySubCategory({
  params,
  searchParams,
}: PostsPageFilteredBySubCategory) {
  const { category, subCategory } = params;
  const currentPage = Number(searchParams.currentPage);
  const pageSize = Number(searchParams.pageSize);

  const { allArticles: articles } = await getPosts<{
    allArticles: PostType[];
  }>();

  const filteredArticles = articles.filter((article) =>
    article.category.category[category]
      ? !!article.category.category[category]?.includes(subCategory)
      : false,
  );
  // ** pagination으로 바꿀때 주석 해제 **//

  // const { paginatedArticles, hasNext, hasPrev } = paginatePosts({
  //   posts: filteredArticles,
  //   currentPage,
  //   pageSize,
  // });

  return (
    <>
      <h2 className={styles.heading}>{`${subCategory}`}</h2>

      {/* <Posts posts={paginatedArticles} hasNext={hasNext} hasPrev={hasPrev} /> */}
      <Posts posts={filteredArticles} />
    </>
  );
}

export async function generateMetadata({
  params,
}: PostsPageFilteredBySubCategory): Promise<Metadata> {
  const { subCategory } = params;

  return {
    title: subCategory,
    description: `류준열의 기술 블로그 ${subCategory} 주제 모아보기`,
  };
}
