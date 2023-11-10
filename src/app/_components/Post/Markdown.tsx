import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import MarkdownLibrary from "react-markdown";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { ResponsiveImageType } from "@/types";
import { NO_IMAGE } from "@/utils/constant";

interface MarkdownProps {
  children: string;
  responsiveImage?: ResponsiveImageType;
}
export const Markdown = ({ children, responsiveImage }: MarkdownProps) => {
  return (
    <>
      <MarkdownLibrary
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <>
                {/* @ts-ignore Server Component */}
                <SyntaxHighlighter language={match[1]} style={github}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </>
            ) : (
              <code {...props}>{children}</code>
            );
          },
          img: (data) => {
            return (
              <Image
                width={700}
                height={300}
                src={data.src || NO_IMAGE.src}
                alt={data.alt || NO_IMAGE.alt}
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
