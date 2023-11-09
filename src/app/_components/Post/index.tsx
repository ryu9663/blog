"use client";
import React from "react";

import styles from "./index.module.scss";
import "github-markdown-css/github-markdown-light.css";

import { Markdown } from "@/app/_components/Post/Markdown";
import { PostType } from "@/types";

interface PostProps {
  article: {
    metaField: PostType["metaField"];
    markdown: PostType["markdown"];
  };
}
export const Post = ({ article }: PostProps) => {
  const { markdown, metaField } = article;

  return (
    <>
      <div className={`${styles.post_wrapper} markdown-body`}>
        <section>
          <Markdown responsiveImage={metaField.image.responsiveImage}>
            {markdown}
          </Markdown>
        </section>
      </div>
    </>
  );
};
