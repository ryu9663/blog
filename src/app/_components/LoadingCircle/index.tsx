import React from "react";
import styles from "./index.module.scss";

const LoadingCircle = () => (
  <div className={`${styles.backdrop} ${styles["priority-0"]}`}>
    <div className={styles["loading-indicator"]}>
      <div className={styles["spinner"]}></div>
    </div>
  </div>
);
export default LoadingCircle;
