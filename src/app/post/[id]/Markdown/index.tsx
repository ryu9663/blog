/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { PostType } from "@/types";
import "github-markdown-css/github-markdown-light.css";
import MarkdownLibrary from "react-markdown";
import remarkGfm from "remark-gfm";
import { MarkdownImage } from "@/app/_components/MarkdownImage";
import styles from "./index.module.scss";
import { Suspense, lazy } from "react";

const Code = lazy(() => import("@/app/post/[id]/Markdown/Code"));

interface PostProps {
  markdown: PostType["markdown"];
}
export default function Markdown({ markdown }: PostProps) {
  return (
    <section className={`markdown-body ${styles.markdown}`}>
      <MarkdownLibrary
        remarkPlugins={[remarkGfm]}
        components={{
          h3: ({ children }) => (
            <h3 className={styles.anchor} id={children as string}>
              {children}
            </h3>
          ),
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (match === null) {
              return <code {...props}>{children}</code>;
            }
            return (
              <Suspense fallback={<code {...props}>{children}</code>}>
                <Code match={match}>{children}</Code>
              </Suspense>
            );
          },
          img: (data) => {
            const { src, alt } = data;
            return <MarkdownImage src={src} alt={alt} />;
          },
        }}
      >
        {markdown}
      </MarkdownLibrary>
    </section>
  );
}
