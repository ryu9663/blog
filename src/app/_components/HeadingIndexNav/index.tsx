import { extractHeadings } from "@/utils/extractHeadings";
import React from "react";
import styles from "./index.module.scss";

interface HeadingIndexProps {
  markdown: string;
}
export const HeadingIndexNav = ({ markdown }: HeadingIndexProps) => {
  const headingIndexes = extractHeadings(markdown);
  return (
    <nav className={styles.heading_index_nav}>
      {headingIndexes.map((heading, i) => (
        <li className={styles.heading_index} key={i}>
          <a
            href={`#${heading
              .split(" ")
              .join("-")
              .replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\w\s-]/g, "")
              .toLowerCase()}`}
          >{`${heading}`}</a>
        </li>
      ))}
    </nav>
  );
};
