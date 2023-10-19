"use client";

import {
  Category,
  SubCategoryList,
  Sidebar as StorybookSidebar,
  Button,
} from "junyeol-components";
import Link from "next/link";
import React from "react";
import styles from "./index.module.scss";
import { useHeaderStore } from "@/app/_components/Header/index.store";
import { X } from "react-feather";
import { SidebarBtn } from "@/app/_components/Header/SidebarBtn";

export const Sidebar = () => {
  const [isSidebarOn, setIsSidebarOn] = useHeaderStore((state) => [
    state.isSidebarOn,
    state.setIsSidebarOn,
  ]);
  const currentDate = new Date();

  // 어제의 날짜를 계산합니다.
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  // 3일 전의 날짜를 계산합니다.
  const threeDaysAgo = new Date(currentDate);
  threeDaysAgo.setDate(currentDate.getDate() - 3);

  // 4일 전의 날짜를 계산합니다.
  const fourDaysAgo = new Date(currentDate);
  fourDaysAgo.setDate(currentDate.getDate() - 4);
  return (
    <div
      className={`${styles.sidebar} ${
        isSidebarOn ? `${styles.sidebar_on}` : styles.sidebar_off
      } `}
    >
      <SidebarBtn />

      <StorybookSidebar linkToPosts={<Link href="/">전체 보기</Link>}>
        <ul>
          <Category CategoryLink={<Link href="/post/dev">dev</Link>}>
            <SubCategoryList
              subCategories={[
                {
                  subCategoryLink: <Link href="/posts/dev/react">react</Link>,
                  publishedAt: yesterday,
                },
                {
                  subCategoryLink: <Link href="/posts/dev/next">next</Link>,
                  publishedAt: threeDaysAgo,
                },
                {
                  subCategoryLink: (
                    <Link href="/posts/dev/typescript">typescript</Link>
                  ),
                  publishedAt: fourDaysAgo,
                },
                {
                  subCategoryLink: (
                    <Link href="/posts/dev/graphQL">graphQL</Link>
                  ),
                  publishedAt: fourDaysAgo,
                },
                {
                  subCategoryLink: (
                    <Link href="/posts/dev/react-query">react-query</Link>
                  ),
                  publishedAt: fourDaysAgo,
                },
                {
                  subCategoryLink: (
                    <Link href="/posts/dev/zustand">zustand</Link>
                  ),
                  publishedAt: fourDaysAgo,
                },
                {
                  subCategoryLink: (
                    <Link href="/posts/dev/javascript">javascript</Link>
                  ),
                  publishedAt: fourDaysAgo,
                },
                {
                  subCategoryLink: <Link href="/posts/dev/html">html</Link>,
                  publishedAt: fourDaysAgo,
                },
                {
                  subCategoryLink: <Link href="/posts/dev/css">css</Link>,
                  publishedAt: fourDaysAgo,
                },
              ]}
            />
          </Category>
        </ul>
      </StorybookSidebar>
    </div>
  );
};
