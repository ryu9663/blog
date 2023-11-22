import Cards from "@/app/_components/Cards";
import { Posts } from "@/app/_components/Posts";
import { getPosts } from "@/app/api/dato/getPosts";
import { PostType } from "@/types";
import { CategoryType } from "junyeol-components";
import { Metadata } from "next";
import React from "react";
import styles from "./page.module.scss";

interface PostsPageFilteredByCategory {
  params: {
    category: CategoryType;
  };
}
export default async function PostsPageFilteredByCategory({
  params,
}: PostsPageFilteredByCategory) {
  const { category } = params;

  const { allArticles: articles } = await getPosts<{
    allArticles: Pick<
      PostType,
      "id" | "metaField" | "media" | "category" | "_createdAt"
    >[];
  }>();

  const filteredArticles = articles.filter(
    (article) => !!article.category.category[category]
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
    title: "류준열의 기술 블로그 | " + category,
    // openGraph: {
    //   images: metaField.image.url,
    // },
    // description: metaField.description,
  };
}