import React from "react";
import { PostWithoutMarkdownType } from "@/types/apiResponseType";
import { getCategories, getPosts } from "@/app/api";
import { formatSidebarData } from "@/app/_components/SidebarWrapper/utils";
import Sidebar from "@/app/_components/Sidebar";

export const SidebarWrapper = async () => {
  // Promise.all로 병렬 실행하여 waterfall 제거
  const [postsResult, categoriesResult] = await Promise.all([
    getPosts<{ allArticles: PostWithoutMarkdownType[] }>(),
    getCategories<{
      allArticles: Pick<PostWithoutMarkdownType, "category" | "_createdAt">[];
    }>(),
  ]);

  const { allArticles: articles } = postsResult;
  const { allArticles: _subCategories } = categoriesResult;

  const subCategories = _subCategories.map(
    ({ category: _category, _createdAt }) => ({
      category: _category.category,
      _createdAt,
    }),
  );

  const transformedCategories = formatSidebarData(subCategories);

  return <Sidebar posts={articles} categories={transformedCategories} />;
};
