import { create } from "zustand";

export interface HeaderStoreProps {
  isSidebarOn: boolean;
  setIsSidebarOn: (isSidebarOn: boolean) => void;
}

//zustand store
export const useHeaderStore = create<HeaderStoreProps>((set) => ({
  isSidebarOn: false,
  setIsSidebarOn: (isSidebarOn: boolean) => set({ isSidebarOn }),
}));
