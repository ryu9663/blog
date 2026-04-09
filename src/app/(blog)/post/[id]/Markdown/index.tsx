/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { PostType } from "@/types/apiResponseType";
import "github-markdown-css/github-markdown-light.css";
import MarkdownLibrary from "react-markdown";
import remarkGfm from "remark-gfm";
import { MarkdownImage } from "@/app/_components/MarkdownImage";
import styles from "./index.module.scss";
import { Suspense, lazy } from "react";
import Heading from "@/app/(blog)/post/[id]/Markdown/_components/Heading";
import CommentScript from "@/app/(blog)/post/[id]/Markdown/_components/CommnetScript";

const Code = lazy(() => import("@/app/(blog)/post/[id]/Markdown/_components/Code"));

interface PostProps {
  markdown: PostType["markdown"];
}
export default function Markdown({ markdown }: PostProps) {
  return (
    <section className={`markdown-body ${styles.markdown}`}>
      <MarkdownLibrary
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, href, ...props }) => {
            const isSamePageLink = (() => {
              if (!href) return false;

              try {
                const currentUrl = new URL(window.location.href);
                const linkUrl = new URL(href, window.location.href);

                return currentUrl.origin === linkUrl.origin && currentUrl.pathname === linkUrl.pathname && Boolean(linkUrl.hash);
              } catch {
                return false;
              }
            })();

            return (
              <a
                href={href}
                {...props}
                target={isSamePageLink ? undefined : "_blank"}
                rel={isSamePageLink ? undefined : "noopener noreferrer"}
              >
                {children}
              </a>
            );
          },
          h2: ({ children }) => <Heading level={2}>{children}</Heading>,
          h3: ({ children }) => <Heading level={3}>{children}</Heading>,
          h4: ({ children }) => <Heading level={4}>{children}</Heading>,
          h5: ({ children }) => <Heading level={5}>{children}</Heading>,
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

      <CommentScript />
    </section>
  );
}
