import { Image as DatoImage } from "react-datocms";

import React from "react";
import styles from "../Post/index.module.scss";
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
          img: (image) => (
            <>
              {responsiveImage ? (
                <DatoImage
                  className={styles["post_wrapper-img"]}
                  data={responsiveImage}
                />
              ) : (
                <Image
                  src={image.src || ""}
                  alt={image.alt || ""}
                  width={500}
                  height={300}
                  className={styles["post_wrapper-img"]}
                />
              )}
            </>
          ),
        }}
      >
        {children}
      </MarkdownLibrary>
    </>
  );
};
