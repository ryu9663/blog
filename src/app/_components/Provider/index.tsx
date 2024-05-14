"use client";
import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";
import { useSidebarStore } from "@/app/_components/Sidebar/index.store";
import { ToastContainer } from "junyeol-components";

const Provider = ({ children }: PropsWithChildren) => {
  const isSidebarOn = useSidebarStore((state) => state.isSidebarOn);
  return (
    <>
      <main
        className={`${styles.provider} ${
          isSidebarOn ? styles.sidebar_opened : ""
        }`}
      >
        {children}
      </main>
      <ToastContainer />
    </>
  );
};

export default Provider;
