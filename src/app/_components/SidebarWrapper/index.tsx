import React from "react";

import { Sidebar } from "@/app/_components/Sidebar";

import { PostType } from "@/types";
import { getCategories } from "@/app/api/dato/getCategories";

import { formatSidebarData } from "@/app/_components/SidebarWrapper/utils";

export const SidebarWrapper = async () => {
  const { allArticles: _subCategories } = await getCategories<{
    allArticles: Pick<PostType, "category" | "_createdAt">[];
  }>();

  const subCategories = _subCategories.map(
    ({ category: _category, _createdAt }) => {
      return { category: _category.category, _createdAt };
    }
  );

  const transformedCategories = formatSidebarData(subCategories);

  return (
    <>
      <Sidebar categories={transformedCategories} />
    </>
  );
};
