/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import { PostType } from "@/types";
import "github-markdown-css/github-markdown-light.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import MarkdownLibrary from "react-markdown";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import { MarkdownImage } from "@/app/_components/MarkdownImage";

interface PostProps {
  article: {
    metaField: PostType["metaField"];
    markdown: PostType["markdown"];
  };
}
export default function Markdown({ article }: PostProps) {
  const { markdown } = article;

  return (
    <MarkdownLibrary
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter language={match[1]} style={github}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...props}>{children}</code>
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
  );
}
