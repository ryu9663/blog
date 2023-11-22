"use client";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import MarkdownLibrary from "react-markdown";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { NO_IMAGE } from "@/utils/constant";

interface MarkdownProps {
  children: string;
}
export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <>
      <MarkdownLibrary
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <>
                <SyntaxHighlighter language={match[1]} style={github}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </>
            ) : (
              <code {...props}>{children}</code>
            );
          },
          img: (data) => {
            const { src, alt } = data;
            const urlParams = new URLSearchParams(
              new URL(src || NO_IMAGE.src).search
            );
            const width = Number(urlParams.get("w"));
            const height = Number(urlParams.get("h"));

            return (
              <Image
                width={width || 600}
                height={height || 300}
                src={src || NO_IMAGE.src}
                alt={alt || NO_IMAGE.alt}
              />
            );
          },
        }}
      >
        {children}
      </MarkdownLibrary>
    </>
  );
};
