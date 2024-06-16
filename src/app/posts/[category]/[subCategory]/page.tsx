import Cards from "@/app/_components/Cards";
import { Posts } from "@/app/_components/Posts";
import { getPosts } from "@/app/api/dato/getPosts2";
import { PostType, SearchParamsType } from "@/types";
import { CategoryType } from "junyeol-components";
import { Metadata } from "next";
import React from "react";
import styles from "../page.module.scss";
import { getCategories } from "@/app/api/dato/getCategories";
import { getCategoriesAndSubCategories } from "@/app/sitemap";

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
    allArticles: Pick<
      PostType,
      "id" | "metaField" | "category" | "_createdAt"
    >[];
  }>({ pageSize: pageSize || 5, currentPage: currentPage || 1 });

  const filteredArticles = articles.filter((article) =>
    article.category.category[category]
      ? !!article.category.category[category]?.includes(subCategory)
      : false,
  );

  return (
    <>
      <h2 className={styles.heading}>{`${subCategory}`}</h2>

      <Posts>
        <Cards articles={filteredArticles} />
      </Posts>
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
