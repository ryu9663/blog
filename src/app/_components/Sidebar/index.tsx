"use client";

import {
  Category,
  SubCategoryList,
  Sidebar as StorybookSidebar,
  CategoryType,
  SubCategoryType,
  Button,
} from "junyeol-components";

import Link from "next/link";
import React from "react";
import styles from "./index.module.scss";

import { SidebarBtn } from "@/app/_components/Sidebar/SidebarBtn";
import { useSidebarStore } from "@/app/_components/Sidebar/index.store";
import { Menu } from "react-feather";
import { PostType } from "@/types";
import { getPublishedSubCategories } from "@/app/_components/SidebarWrapper/utils";
export interface SidebarProps {
  categories: {
    category: CategoryType;
    subcategories: SubCategoryType[];
  }[];
  posts: PostType[];
}
const Sidebar = ({ categories, posts }: SidebarProps) => {
  const [isSidebarOn, setIsSidebarOn] = useSidebarStore((state) => [
    state.isSidebarOn,
    state.setIsSidebarOn,
  ]);

  const publishedSubCategories = getPublishedSubCategories({
    posts,
    categories,
  });

  return (
    <>
      <Button
        className={`${styles.sidebar_btn} ${styles["priority-0"]}`}
        onClick={() => {
          setIsSidebarOn(true);
        }}
      >
        <Menu />
      </Button>

      <div
        className={`${styles.sidebar_wrapper} ${styles["priority-0"]} ${
          isSidebarOn
            ? `${styles.sidebar_wrapper_on}`
            : styles.sidebar_wrapper_off
        } `}
      >
        <div className={styles.sidebar}>
          <StorybookSidebar linkToPosts={<Link href="/">전체 보기</Link>}>
            <ul>
              {publishedSubCategories.map(({ category, subcategories }, i) => (
                <li key={i}>
                  <Category
                    CategoryLink={
                      <Link href={`/posts/${category}`}>{category}</Link>
                    }
                  >
                    <SubCategoryList subCategories={subcategories} />
                  </Category>
                </li>
              ))}
            </ul>
          </StorybookSidebar>
          <hr />
          <ul className={styles.other_links}>
            <li>
              <a href="https://wnsdufdl.tistory.com" target="_blank">
                티스토리 블로그(이전 블로그)
              </a>
            </li>
            <li>
              <a href="https://github.com/ryu9663/" target="_blank">
                깃허브
              </a>
            </li>
            <li>
              <Link href="/post/198173441">이력서</Link>
            </li>
          </ul>
        </div>
        <SidebarBtn />
      </div>
    </>
  );
};
export default Sidebar;
