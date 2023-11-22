import React from "react";
import styles from "./index.module.scss";
import "github-markdown-css/github-markdown-light.css";

import { Markdown } from "@/app/post/[id]/Markdown";
import { PostType } from "@/types";

interface PostProps {
  article: {
    metaField: PostType["metaField"];
    markdown: PostType["markdown"];
  };
}
export default function Post({ article }: PostProps) {
  const { markdown } = article;

  return (
    <div className={`${styles.post_wrapper} markdown-body `}>
      <section>
        <Markdown>{markdown}</Markdown>
      </section>
    </div>
  );
}
