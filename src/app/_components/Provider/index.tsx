"use client";
import { motion, useScroll } from "framer-motion";
import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";
import { useSidebarStore } from "@/app/_components/Sidebar/index.store";

export const Provider = ({ children }: PropsWithChildren) => {
  const { scrollYProgress } = useScroll();
  console.log(scrollYProgress);
  const isSidebarOn = useSidebarStore((state) => state.isSidebarOn);
  return (
    <main
      className={`${styles.provider} ${
        isSidebarOn ? styles.sidebar_opened : ""
      }`}
    >
      <motion.div
        className={styles["progress-bar"]}
        style={{ scaleX: scrollYProgress }}
      />
      {children}
    </main>
  );
};
