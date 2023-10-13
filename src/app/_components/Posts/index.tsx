import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";
export const Posts = ({ children }: PropsWithChildren) => {
  return <section className={styles["post_wrapper"]}>{children}</section>;
};
