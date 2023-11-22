"use client";
import { useSidebarStore } from "@/app/_components/Sidebar/index.store";
import { Button } from "junyeol-components";
import React from "react";
import { X } from "react-feather";

export const SidebarBtn = () => {
  const [isSidebarOn, setIsSidebarOn] = useSidebarStore((state) => [
    state.isSidebarOn,
    state.setIsSidebarOn,
  ]);
  return (
    <Button
      className={""}
      onClick={() => {
        setIsSidebarOn(!isSidebarOn);
      }}
    >
      <X />
    </Button>
  );
};
