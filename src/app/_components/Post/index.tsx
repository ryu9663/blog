"use client";
import React from "react";

import styles from "./index.module.scss";
import "github-markdown-css/github-markdown-light.css";

import { Markdown } from "@/app/_components/Post/Markdown";
import { MediaType, PostType } from "@/types";

interface PostProps {
  article: {
    markdown: PostType["markdown"];
    media?: PostType["media"];
  };
}
export const Post = ({ article }: PostProps) => {
  const { markdown, media } = article;

  return (
    <>
      <div className={`${styles.post_wrapper} markdown-body`}>
        <section>
          <Markdown responsiveImage={media?.responsiveImage}>
            {markdown}
          </Markdown>
        </section>
      </div>
    </>
  );
};
