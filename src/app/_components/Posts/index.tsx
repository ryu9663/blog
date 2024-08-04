import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";
import Cards from "@/app/_components/Cards";
import { Pagination } from "@/app/_components/Pagination";
import { PostType } from "@/types";

interface PostsProps {
  posts: PostType[];
  hasNext: boolean;
  hasPrev: boolean;
}

export const Posts = ({ posts, hasNext, hasPrev }: PostsProps) => (
  <section className={styles["post_wrapper"]}>
    <div className={styles["post_inside_wrapper"]}>
      <Cards articles={posts} />
      <Pagination hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  </section>
);
