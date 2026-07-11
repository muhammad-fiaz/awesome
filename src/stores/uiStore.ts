import { create } from 'zustand';

interface SearchUIState {
  query: string;
  selectedCategories: string[];
  selectedTags: string[];
  setQuery: (query: string) => void;
  toggleCategory: (cat: string) => void;
  toggleTag: (tag: string) => void;
  reset: () => void;
}

export const useSearchUI = create<SearchUIState>((set) => ({
  query: '',
  selectedCategories: [],
  selectedTags: [],
  setQuery: (query) => set({ query }),
  toggleCategory: (cat) =>
    set((s) => ({
      selectedCategories: s.selectedCategories.includes(cat)
        ? s.selectedCategories.filter((c) => c !== cat)
        : [...s.selectedCategories, cat],
    })),
  toggleTag: (tag) =>
    set((s) => ({
      selectedTags: s.selectedTags.includes(tag)
        ? s.selectedTags.filter((t) => t !== tag)
        : [...s.selectedTags, tag],
    })),
  reset: () => set({ query: '', selectedCategories: [], selectedTags: [] }),
}));

interface ReaderState {
  activeHeadingId: string | null;
  readingProgress: number;
  setActiveHeading: (id: string | null) => void;
  setReadingProgress: (pct: number) => void;
}

export const useReaderStore = create<ReaderState>((set) => ({
  activeHeadingId: null,
  readingProgress: 0,
  setActiveHeading: (id) => set({ activeHeadingId: id }),
  setReadingProgress: (pct) => set({ readingProgress: pct }),
}));
