"use client";
import React from "react";
import { HeadingType } from "@/types";
import { useTOCHighlight } from "./useTOCHighlight";
import styles from "./TOCList.module.scss";
import Link from "next/link";

interface TOCListProps {
  headings: HeadingType[];
}

export const TOCList = ({ headings }: TOCListProps) => {
  const activeId = useTOCHighlight(headings);

  if (headings.length === 0) return null;

  return (
    <div className={styles.tocContainer}>
      <ul className={styles.tocList}>
        {headings.map((heading, i) => (
          <li
            key={i}
            className={`${styles.tocItem} ${styles[`level${heading.level}`]} ${
              activeId === heading.id ? styles.active : ""
            }`}
          >
            <Link href={`#${heading.id}`} scroll>
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
