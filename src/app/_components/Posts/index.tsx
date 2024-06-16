import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";
import Cards from "@/app/_components/Cards";
import { Pagination } from "@/app/_components/Pagination";
import { PostType } from "@/types";

interface PostsProps {
  posts: PostType[];
}
export const Posts = ({ posts }: PostsProps) => (
  <section className={styles["post_wrapper"]}>
    <Cards articles={posts} />
    <Pagination />
  </section>
);
