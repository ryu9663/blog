import { create } from "zustand";

export interface SidebarStoreProps {
  isSidebarOn: boolean;
  setIsSidebarOn: (isSidebarOn: boolean) => void;
}

export const useSidebarStore = create<SidebarStoreProps>((set) => ({
  isSidebarOn: false,
  setIsSidebarOn: (isSidebarOn: boolean) => set({ isSidebarOn }),
}));
