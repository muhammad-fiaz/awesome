import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleMobileSidebar: () => void;
}

const getInitialSidebarState = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('sidebar-open');
    if (saved !== null) {
      return saved === 'true';
    }
  }
  return true;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: getInitialSidebarState(),
  isMobileOpen: false,
  toggleSidebar: () => set((state) => {
    const next = !state.isOpen;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-open', String(next));
      if (next) {
        document.documentElement.classList.remove('sidebar-collapsed');
      } else {
        document.documentElement.classList.add('sidebar-collapsed');
      }
    }
    return { isOpen: next };
  }),
  openMobileSidebar: () => set({ isMobileOpen: true }),
  closeMobileSidebar: () => set({ isMobileOpen: false }),
  toggleMobileSidebar: () =>
    set((state) => ({ isMobileOpen: !state.isMobileOpen })),
}));
