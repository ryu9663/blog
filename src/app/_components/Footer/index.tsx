"use client";

import dynamic from "next/dynamic";

import styles from "./index.module.scss";

const StorybookFooter = dynamic(
  () => import("junyeol-components").then((mod) => mod.Footer),
  { ssr: false },
);

export const Footer = () => (
  <div className={styles.footer_wrapper}>
    <StorybookFooter />
  </div>
);
