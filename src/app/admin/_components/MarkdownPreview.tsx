"use client";

import MarkdownLibrary from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown-light.css";
import styles from "./MarkdownPreview.module.scss";

interface MarkdownPreviewProps {
  markdown: string;
}

export default function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  return (
    <div className={`markdown-body ${styles.preview}`}>
      <MarkdownLibrary remarkPlugins={[remarkGfm]}>{markdown}</MarkdownLibrary>
    </div>
  );
}
