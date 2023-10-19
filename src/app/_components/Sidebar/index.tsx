"use client";
import {
  Category,
  SubCategoryList,
  Sidebar as StorybookSidebar,
  CategoryType,
  LinkType,
} from "junyeol-components";

import Link from "next/link";
import React from "react";
import styles from "./index.module.scss";

import { SidebarBtn } from "@/app/_components/Sidebar/SidebarBtn";
import { useSidebarStore } from "@/app/_components/Sidebar/index.store";

export interface SidebarProps {
  categories: {
    category: CategoryType;
    subcategories: {
      subCategoryLink: LinkType;
      publishedAt: Date;
    }[];
  }[];
}
export const Sidebar = ({ categories }: SidebarProps) => {
  const isSidebarOn = useSidebarStore((state) => state.isSidebarOn);

  return (
    <div
      className={`${styles.sidebar_wrapper} ${
        isSidebarOn
          ? `${styles.sidebar_wrapper_on}`
          : styles.sidebar_wrapper_off
      } `}
    >
      <SidebarBtn />

      <div className={styles.sidebar}>
        <StorybookSidebar linkToPosts={<Link href="/">전체 보기</Link>}>
          <ul>
            {categories.map((el, i) => (
              <li key={i}>
                <Category
                  CategoryLink={
                    <Link href={`/posts/${el.category}`}>{el.category}</Link>
                  }
                >
                  <SubCategoryList subCategories={el.subcategories} />
                </Category>
              </li>
            ))}
          </ul>
        </StorybookSidebar>
      </div>
    </div>
  );
};
