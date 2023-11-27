import Cards from "@/app/_components/Cards";
import { Posts } from "@/app/_components/Posts";
import { getPosts } from "@/app/api/dato/getPosts";
import { PostType } from "@/types";
import { CategoryType } from "junyeol-components";
import { Metadata } from "next";
import React from "react";
import styles from "../page.module.scss";
import { getCategories } from "@/app/api/dato/getCategories";
import { getCategoriesAndSubCategories } from "@/app/sitemap";

interface PostsPageFilteredBySubCategory {
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

  return subCategoriesUrlPath.map((el) => ({
    category: el.split("/")[1],
    subCategory: el.split("/")[2],
  }));
}

export default async function PostsPageFilteredBySubCategory({
  params,
}: PostsPageFilteredBySubCategory) {
  const { category, subCategory } = params;
  const { allArticles: articles } = await getPosts<{
    allArticles: Pick<
      PostType,
      "id" | "metaField" | "media" | "category" | "_createdAt"
    >[];
  }>();

  const filteredArticles = articles.filter((article) =>
    !!article.category.category[category]
      ? !!article.category.category[category]?.includes(subCategory)
      : false
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
  const { category, subCategory } = params;

  return {
    title: "류준열의 기술 블로그 | " + subCategory,
    // openGraph: {
    //   images: metaField.image.url,
    // },
    // description: metaField.description,
  };
}
