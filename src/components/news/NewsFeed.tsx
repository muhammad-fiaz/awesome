'use client';
import { useState, useMemo, useEffect } from 'react';
import { Search01Icon, GridViewIcon, ListViewIcon, Calendar01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLayoutStore } from '@/store/layoutStore';
import { NewsCard, type NewsCardData } from './NewsCard';

interface NewsFeedProps {
  newsItems: NewsCardData[];
}

export function NewsFeed({ newsItems }: NewsFeedProps) {
  const { viewMode, setViewMode } = useLayoutStore();
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('q') || '';
    }
    return '';
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      setSearchQuery(params.get('q') || '');
    };
    window.addEventListener('popstate', handleUrlChange);
    document.addEventListener('astro:page-load', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      document.removeEventListener('astro:page-load', handleUrlChange);
    };
  }, []);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (val) {
        url.searchParams.set('q', val);
      } else {
        url.searchParams.delete('q');
      }
      window.history.replaceState(null, '', url.pathname + url.search);
    }
  };

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return newsItems;
    const q = searchQuery.toLowerCase();
    return newsItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
    );
  }, [newsItems, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search & Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pb-6 border-b border-ds-outline-variant">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <HugeiconsIcon
            icon={Search01Icon}
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ds-text-muted pointer-events-none"
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-ds-surface-low border border-ds-outline-variant rounded-xl focus:outline-none focus:border-ds-primary text-ds-on-surface"
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="text-xs text-ds-text-muted font-medium">
            View Mode:
          </span>
          <div className="flex items-center bg-ds-surface-high rounded-lg p-0.5 border border-ds-outline-variant">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('list')}
              className={cn(
                'p-1.5 h-auto rounded-md',
                viewMode === 'list'
                  ? 'bg-ds-primary-container text-ds-on-primary-container shadow-sm'
                  : 'text-ds-on-surface-variant hover:text-ds-on-surface'
              )}
              title="List view"
              aria-label="List view"
            >
              <HugeiconsIcon icon={ListViewIcon} size={16} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-1.5 h-auto rounded-md',
                viewMode === 'grid'
                  ? 'bg-ds-primary-container text-ds-on-primary-container shadow-sm'
                  : 'text-ds-on-surface-variant hover:text-ds-on-surface'
              )}
              title="Grid view"
              aria-label="Grid view"
            >
              <HugeiconsIcon icon={GridViewIcon} size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid or List list of news cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-ds-text-muted flex flex-col items-center justify-center">
          <HugeiconsIcon icon={Calendar01Icon} size={48} className="mb-3 opacity-30 animate-none" />
          <p className="text-base font-semibold mb-1">No news found</p>
          <p className="text-sm">Try a different search query</p>
        </div>
      ) : (
        <>
          <div className="posts-feed-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <NewsCard key={item.slug} news={item} view="grid" />
            ))}
          </div>
          <div className="posts-feed-list space-y-4">
            {filtered.map((item) => (
              <NewsCard key={item.slug} news={item} view="list" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
