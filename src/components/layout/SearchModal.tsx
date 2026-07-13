'use client';
import {
  ArrowRight01Icon,
  Cancel01Icon,
  File02Icon,
  GridViewIcon,
  Home01Icon,
  News01Icon,
  Search01Icon,
  Tag01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useHotkey } from '@tanstack/react-hotkeys';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BASE_PATH } from '@/config/site';
import { cn } from '@/lib/utils';
import { useSearchStore } from '@/store/searchStore';

interface SearchIndexItem {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
}

const DEFAULT_ITEMS = [
  { label: 'Home', href: `${BASE_PATH}/`, icon: Home01Icon },
  { label: 'Posts', href: `${BASE_PATH}/posts/`, icon: File02Icon },
  { label: 'News', href: `${BASE_PATH}/news/`, icon: News01Icon },
  { label: 'Categories', href: `${BASE_PATH}/categories/`, icon: GridViewIcon },
  { label: 'Tags', href: `${BASE_PATH}/tags/`, icon: Tag01Icon },
  { label: 'Authors', href: `${BASE_PATH}/authors/`, icon: UserIcon },
];

export function SearchModal() {
  const { isOpen, openSearch, closeSearch } = useSearchStore();
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<SearchIndexItem[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [pagefindResults, setPagefindResults] = useState<any[] | null>(null);

  useHotkey({ key: 'k', mod: true }, () => {
    if (isOpen) {
      closeSearch();
    } else {
      openSearch();
    }
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActiveIdx(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const base = import.meta.env.BASE_URL;
    const url = base.endsWith('/') ? `${base}search-index.json` : `${base}/search-index.json`;
    fetch(url)
      .then((r) => {
        if (!r.ok) return fetch('/search-index.json').then((fr) => fr.json());
        return r.json();
      })
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeSearch]);

  useEffect(() => {
    if (!query.trim()) {
      setPagefindResults(null);
      return;
    }

    const performSearch = async () => {
      try {
        // @ts-ignore
        const pagefind = await import(/* @vite-ignore */ `${import.meta.env.BASE_URL}pagefind/pagefind.js`);
        await pagefind.init();
        const search = await pagefind.search(query);
        const results = await Promise.all(search.results.slice(0, 8).map((r: any) => r.data()));
        setPagefindResults(results);
      } catch (e) {
        setPagefindResults(null);
      }
    };

    const debounceTimer = setTimeout(performSearch, 150);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const queryWords = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 0);

  const filtered = useMemo(() => {
    if (queryWords.length === 0) {
      return DEFAULT_ITEMS.map((i) => ({ ...i, sub: '' }));
    }

    if (pagefindResults !== null) {
      return pagefindResults.map((res: any) => {
        const cleanUrl = res.url.endsWith('/') ? res.url.slice(0, -1) : res.url;
        const isNews = cleanUrl.includes('/news/');
        const isPost = cleanUrl.includes('/post/');
        const isGuide = cleanUrl.includes('/guide');

        let label = res.meta?.title || 'Untitled';
        if (label.endsWith(' | Awesome')) {
          label = label.slice(0, -10);
        }

        if (isNews) {
          const idx = cleanUrl.indexOf('/news/');
          const slug = idx !== -1 ? cleanUrl.slice(idx + 6) : '';
          return {
            label,
            href: `${BASE_PATH}/news/${slug}/`,
            sub: 'News',
            icon: News01Icon,
          };
        } else if (isPost) {
          const idx = cleanUrl.indexOf('/post/');
          const slug = idx !== -1 ? cleanUrl.slice(idx + 6) : '';
          const postMatch = posts.find((p) => p.slug === slug);
          return {
            label: postMatch?.title || label,
            href: `${BASE_PATH}/post/${slug}/`,
            sub: postMatch?.categories[0] || 'Post',
            icon: File02Icon,
          };
        } else if (isGuide) {
          return {
            label,
            href: `${BASE_PATH}/guide/`,
            sub: 'Guide',
            icon: News01Icon,
          };
        } else {
          return {
            label,
            href: res.url,
            sub: 'Page',
            icon: File02Icon,
          };
        }
      });
    }

    return posts
      .filter((p: any) =>
        queryWords.every(
          (w) =>
            p.title.toLowerCase().includes(w) ||
            p.description.toLowerCase().includes(w) ||
            p.tags.some((t: string) => t.toLowerCase().includes(w)) ||
            p.categories.some((c: string) => c.toLowerCase().includes(w)) ||
            (p.sourceNames && p.sourceNames.some((s: string) => s.toLowerCase().includes(w)))
        ),
      )
      .slice(0, 8)
      .map((p: any) => {
        let href = `${BASE_PATH}/post/${p.slug}/`;
        let sub = p.categories[0] ?? 'Post';
        let icon = File02Icon;

        if (p.type === 'news') {
          href = `${BASE_PATH}/news/${p.slug}/`;
          sub = 'News';
          icon = News01Icon;
        } else if (p.type === 'guide') {
          href = `${BASE_PATH}/guide/`;
          sub = 'Guide';
          icon = News01Icon;
        }

        return {
          label: p.title,
          href,
          sub,
          icon,
        };
      });
  }, [queryWords, pagefindResults, posts]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter') {
      if (filtered[activeIdx]) {
        closeSearch();
        window.location.href = filtered[activeIdx].href;
      } else if (query.trim()) {
        closeSearch();
        window.location.href = `${BASE_PATH}/search/?q=${encodeURIComponent(query)}`;
      }
    }
  };

  const prevQueryRef = useRef(query);

  useEffect(() => {
    if (prevQueryRef.current !== query) {
      setActiveIdx(0);
      prevQueryRef.current = query;
    }
  });

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm animate-none"
        onClick={closeSearch}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="fixed top-[12%] left-1/2 z-101 w-full max-w-2xl -translate-x-1/2 px-4 animate-none"
      >
            <div className="rounded-2xl border border-ds-outline-variant shadow-2xl bg-ds-surface-container overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-ds-outline-variant">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={20}
                  strokeWidth={1.5}
                  className="text-ds-text-muted shrink-0"
                />
                <input
                  ref={inputRef}
                  id="search-input"
                  type="text"
                  placeholder="Search posts, categories, tags..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-ds-on-surface placeholder:text-ds-text-muted outline-none text-base font-sans"
                  aria-label="Search"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="h-7 w-7"
                  >
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      size={16}
                      strokeWidth={1.5}
                    />
                  </Button>
                )}
                <kbd className="hidden sm:flex items-center px-2 py-0.5 text-xs font-mono rounded border border-ds-outline-variant text-ds-text-muted">
                  ESC
                </kbd>
              </div>

              <div
                ref={listRef}
                className="max-h-100 overflow-y-auto"
                role="listbox"
                aria-label="Search results"
              >
                {!query && (
                  <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-ds-text-muted">
                    Quick Links
                  </p>
                )}
                {query && filtered.length === 0 && (
                  <div className="px-4 py-10 text-center">
                    <HugeiconsIcon
                      icon={Search01Icon}
                      size={40}
                      strokeWidth={1.2}
                      className="mx-auto mb-3 text-ds-text-muted opacity-40"
                    />
                    <p className="text-sm text-ds-text-muted">
                      No results for{' '}
                      <span className="font-semibold text-ds-on-surface">
                        "{query}"
                      </span>
                    </p>
                    <a
                      href={`${BASE_PATH}/search/?q=${encodeURIComponent(query)}`}
                      onClick={closeSearch}
                      className="inline-flex items-center gap-1.5 mt-3 text-sm text-ds-primary hover:underline"
                    >
                      Search all results{' '}
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        size={14}
                        strokeWidth={2}
                      />
                    </a>
                  </div>
                )}
                {filtered.map((item, i) => {
                  const IconComp = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeSearch}
                      onMouseEnter={() => setActiveIdx(i)}
                      role="option"
                      aria-selected={activeIdx === i}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-100 cursor-pointer',
                        activeIdx === i
                          ? 'bg-ds-primary-container text-ds-on-primary-container'
                          : 'text-ds-on-surface-variant hover:text-ds-on-surface hover:bg-ds-surface-high',
                      )}
                    >
                      <span
                        className={cn(
                          'shrink-0',
                          activeIdx === i
                            ? 'text-ds-on-primary-container'
                            : 'text-ds-text-muted',
                        )}
                      >
                        <HugeiconsIcon
                          icon={IconComp}
                          size={18}
                          strokeWidth={1.5}
                        />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium">{item.label}</p>
                        {item.sub && (
                          <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                            {item.sub}
                          </p>
                        )}
                      </div>
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        size={14}
                        strokeWidth={2}
                        className="opacity-40 shrink-0"
                      />
                    </a>
                  );
                })}
              </div>

              <div className="px-4 py-2.5 border-t border-ds-outline-variant flex items-center gap-5 text-xs text-ds-text-muted">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-ds-outline-variant font-mono">
                    ↑↓
                  </kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-ds-outline-variant font-mono">
                    ↵
                  </kbd>
                  open
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-ds-outline-variant font-mono">
                    ESC
                  </kbd>
                  close
                </span>
                {query && (
                  <a
                    href={`${BASE_PATH}/search/?q=${encodeURIComponent(query)}`}
                    onClick={closeSearch}
                    className="ml-auto flex items-center gap-1 text-ds-primary hover:underline"
                  >
                    See all results{' '}
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={12}
                      strokeWidth={2}
                    />
                  </a>
                )}
              </div>
            </div>
      </div>
    </>
  );
}
