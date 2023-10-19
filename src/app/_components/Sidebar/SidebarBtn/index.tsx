import styles from "./index.module.scss";
import { useHeaderStore } from "@/app/_components/Header/index.store";
import { Button } from "junyeol-components";
import React from "react";
import { Sidebar as SidebarIcon, X } from "react-feather";

export const SidebarBtn = () => {
  const [isSidebarOn, setIsSidebarOn] = useHeaderStore((state) => [
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
