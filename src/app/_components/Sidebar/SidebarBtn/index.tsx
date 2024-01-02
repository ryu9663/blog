"use client";
import { useSidebarStore } from "@/app/_components/Sidebar/index.store";
import { Button } from "junyeol-components";
import React from "react";
import { X } from "react-feather";
import styles from "../index.module.scss";

export const SidebarBtn = () => {
  const [isSidebarOn, setIsSidebarOn] = useSidebarStore((state) => [
    state.isSidebarOn,
    state.setIsSidebarOn,
  ]);
  return (
    <Button
      className={styles.close_btn}
      onClick={() => {
        setIsSidebarOn(!isSidebarOn);
      }}
    >
      <X />
    </Button>
  );
};
