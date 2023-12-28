import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={`${styles.post_wrapper} markdown-body `}>
      <section>{children}</section>
    </div>
  );
};

export default Layout;
