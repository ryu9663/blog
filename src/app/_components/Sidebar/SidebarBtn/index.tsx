"use client";
import { useSidebarStore } from "@/app/_components/Sidebar/index.store";
import styles from "./index.module.scss";

import { Button } from "junyeol-components";
import React from "react";
import { Sidebar as SidebarIcon, X } from "react-feather";

export const SidebarBtn = () => {
  const [isSidebarOn, setIsSidebarOn] = useSidebarStore((state) => [
    state.isSidebarOn,
    state.setIsSidebarOn,
  ]);
  return (
    <Button
      className={styles.menu_button}
      onClick={() => {
        setIsSidebarOn(!isSidebarOn);
      }}
    >
      {isSidebarOn ? <X /> : <SidebarIcon />}
    </Button>
  );
};
