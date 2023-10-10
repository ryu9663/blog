import React from "react";
import HTMLReactParser from "html-react-parser";
import "@/styles/libs/_htmlParser.scss";
import styles from "./index.module.scss";
import Script from "next/script";

export const Post = async ({ markdown }: { markdown: string }) => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1.25.0/prism.js"></Script>
      <div className={styles.post_wrapper}>{HTMLReactParser(markdown)}</div>
    </>
  );
};
