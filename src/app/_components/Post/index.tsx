import React from "react";
import HTMLReactParser from "html-react-parser";
import "@/styles/libs/_htmlParser.scss";
import styles from "./index.module.scss";
import Script from "next/script";

// ! TODO : SPA로 전환하면 Script data 다시 로드 안하는 이슈
export const Post = async ({ markdown }: { markdown: string }) => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1.25.0/prism.js"></Script>
      <div className={styles.post_wrapper}>{HTMLReactParser(markdown)}</div>
    </>
  );
};
