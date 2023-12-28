import Cards from "@/app/_components/Cards";
import { Posts } from "@/app/_components/Posts";
import { getPosts } from "@/app/api/dato/getPosts";
import { PostType } from "@/types";
import { CategoryType } from "junyeol-components";
import { Metadata } from "next";
import React from "react";
import styles from "./page.module.scss";
import { getCategories } from "@/app/api/dato/getCategories";
import { getCategoriesAndSubCategories } from "@/app/sitemap";

interface PostsPageFilteredByCategory {
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
}: PostsPageFilteredByCategory) {
  const { category } = params;

  const { allArticles: articles } = await getPosts<{
    allArticles: Pick<
      PostType,
      "id" | "metaField" | "category" | "_createdAt"
    >[];
  }>();

  const filteredArticles = articles.filter(
    (article) => !!article.category.category[category],
  );

  return (
    <>
      <h2 className={styles.heading}>{`${category}`}</h2>

      <Posts>
        <Cards articles={filteredArticles} />
      </Posts>
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
