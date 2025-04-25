import React from "react";
import { PostType } from "@/types";
import { getCategories } from "@/app/api/dato/getCategories";

import { formatSidebarData } from "@/app/_components/SidebarWrapper/utils";
import { getPosts } from "@/app/api/dato/getPosts";
import Sidebar from "@/app/_components/Sidebar";

export const SidebarWrapper = async () => {
  const { allArticles: articles } = await getPosts<{
    allArticles: PostType[];
  }>();

  const { allArticles: _subCategories } = await getCategories<{
    allArticles: Pick<PostType, "category" | "_createdAt">[];
  }>();

  const subCategories = _subCategories.map(
    ({ category: _category, _createdAt }) => ({
      category: _category.category,
      _createdAt,
    }),
  );

  const transformedCategories = formatSidebarData(subCategories);

  return <Sidebar posts={articles} categories={transformedCategories} />;
};
