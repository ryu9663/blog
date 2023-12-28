import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";
export const Posts = ({ children }: PropsWithChildren) => (
  <section className={styles["post_wrapper"]}>{children}</section>
);
