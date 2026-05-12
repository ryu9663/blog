"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type Sidebar from "@/app/_components/Sidebar";

const ClientSidebar = dynamic(() => import("@/app/_components/Sidebar"), {
  ssr: false,
});

export const SidebarClient = (props: ComponentProps<typeof Sidebar>) => (
  <ClientSidebar {...props} />
);
