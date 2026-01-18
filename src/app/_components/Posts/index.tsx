import React from "react";
import styles from "./index.module.scss";
import Cards from "@/app/_components/Cards";
// import { Pagination } from "@/app/_components/Pagination";
import { PostWithoutMarkdownType } from "@/types/apiResponseType";

// ** pagination으로 바꿀때 주석 해제 **//

// interface PaginatedPostsProps {
//   posts: PostType[];
//   hasNext: boolean;
//   hasPrev: boolean;
// }

interface ScrolledPostsProps {
  posts: PostWithoutMarkdownType[];
}

export const Posts = ({ posts }: ScrolledPostsProps) => (
  <section className={styles["post_wrapper"]}>
    <div className={styles["post_inside_wrapper"]}>
      <Cards articles={posts} />

      {/* <Pagination hasNext={hasNext} hasPrev={hasPrev} /> */}
    </div>
  </section>
);
