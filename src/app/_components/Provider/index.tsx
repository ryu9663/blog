"use client";
import React, { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import styles from "./index.module.scss";
import { useSidebarStore } from "@/app/_components/Sidebar/index.store";

const ToastContainer = dynamic(
  () => import("junyeol-components").then((mod) => mod.ToastContainer),
  { ssr: false },
);

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
