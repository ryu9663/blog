"use client";
import React from "react";

import styles from "./index.module.scss";
import "github-markdown-css/github-markdown-light.css";

import { Markdown } from "@/app/_components/Post/Markdown";

export const Post = ({ markdown }: { markdown: string }) => {
  return (
    <>
      <div className={`${styles.post_wrapper} markdown-body`}>
        <section>
          <Markdown>{markdown}</Markdown>
        </section>
      </div>
    </>
  );
};
