import React from "react";
import "github-markdown-css/github-markdown-light.css";
import { Markdown } from "@/app/_components/Post/Markdown";
import { PostType } from "@/types";

interface PostProps {
  article: {
    metaField: PostType["metaField"];
    markdown: PostType["markdown"];
  };
}
export default function Post({ article }: PostProps) {
  const { markdown } = article;

  return <Markdown>{markdown}</Markdown>;
}
