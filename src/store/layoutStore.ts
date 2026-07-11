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
      setViewMode: (viewMode) => {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('layout-grid', 'layout-list');
          document.documentElement.classList.add(`layout-${viewMode}`);
        }
        set({ viewMode });
      },
      toggleViewMode: () =>
        set((state) => {
          const next = state.viewMode === 'list' ? 'grid' : 'list';
          if (typeof document !== 'undefined') {
            document.documentElement.classList.remove('layout-grid', 'layout-list');
            document.documentElement.classList.add(`layout-${next}`);
          }
          return { viewMode: next };
        }),
    }),
    {
      name: 'awesome-layout-mode',
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          document.documentElement.classList.remove('layout-grid', 'layout-list');
          document.documentElement.classList.add(`layout-${state.viewMode}`);
        }
      },
    },
  ),
);
