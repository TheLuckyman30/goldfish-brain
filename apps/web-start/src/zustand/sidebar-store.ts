import { create } from 'zustand';

type SideBarStore = {
    sideBarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
}

export const useSideBarStore = create<SideBarStore>((set) => ({
    sideBarOpen: false,
    setSidebarOpen: (isOpen: boolean) => {
        set({sideBarOpen: isOpen});
    }
}));