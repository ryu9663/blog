import React from "react";
import { PostWithoutMarkdownType } from "@/types";
import { getCategories } from "@/app/api/dato/getCategories";

import { formatSidebarData } from "@/app/_components/SidebarWrapper/utils";
import { getPosts } from "@/app/api/dato/getPosts";
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
