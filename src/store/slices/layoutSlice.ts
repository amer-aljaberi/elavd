import { StateCreator } from "zustand";

export interface LayoutState {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const LayoutSlice: StateCreator<LayoutState> = (set) => ({
  isSidebarOpen: true,
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
});
