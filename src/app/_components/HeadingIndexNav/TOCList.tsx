"use client";
import React from "react";
import { HeadingType } from "@/types/headingType";
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
        {headings.map(({ id, level, text }) => (
          <li
            key={id}
            className={`${styles.tocItem} ${styles[`level${level}`]} ${
              activeId === id ? styles.active : ""
            }`}
          >
            <Link href={`#${id}`} replace>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
