import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import MarkdownLibrary from "react-markdown";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { MediaType } from "@/types";

interface MarkdownProps {
  children: string;
  responsiveImage?: MediaType["responsiveImage"] | null;
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
          img: () => (
            <Image
              {...responsiveImage}
              src={responsiveImage?.src || ""}
              alt={responsiveImage?.alt || ""}
              placeholder="blur"
              blurDataURL={responsiveImage?.base64}
            />
          ),
        }}
      >
        {children}
      </MarkdownLibrary>
    </>
  );
};
