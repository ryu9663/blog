import { extractHeadings } from "@/utils/extractHeadings";
import React from "react";
import styles from "./index.module.scss";
import { TOCList } from "./TOCList";

interface HeadingIndexProps {
  markdown: string;
}

export const HeadingIndexNav = ({ markdown }: HeadingIndexProps) => {
  const headings = extractHeadings(markdown);

  return (
    <nav className={styles.headingIndexNav}>
      <TOCList headings={headings} />
    </nav>
  );
};
