import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
    }),
    {
      name: 'awesome-theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    },
  ),
);

// Resolve theme for new visitors: use system if no stored preference
export function resolveTheme(stored: string | null): Theme {
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const t = parsed?.state?.theme;
      if (t === 'dark' || t === 'light') return t;
    } catch {}
  }
  return getSystemTheme();
}
