import React from "react";
import styles from "./index.module.scss";

export const LoadingCircle = () => {
  return (
    <div className={styles["loading-indicator"]}>
      <div className={styles["spinner"]} />
    </div>
  );
};
