import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LayoutState {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  toggleViewMode: () => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      viewMode: 'list',
      setViewMode: (viewMode) => set({ viewMode }),
      toggleViewMode: () =>
        set((state) => ({
          viewMode: state.viewMode === 'list' ? 'grid' : 'list',
        })),
    }),
    {
      name: 'awesome-layout-mode',
    },
  ),
);
