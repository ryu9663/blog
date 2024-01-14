import React from "react";
import { PostType } from "@/types";
import { getCategories } from "@/app/api/dato/getCategories";

import { formatSidebarData } from "@/app/_components/SidebarWrapper/utils";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@/app/_components/Sidebar"), {
  ssr: false,
});

export const SidebarWrapper = async () => {
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

  return <Sidebar categories={transformedCategories} />;
};
