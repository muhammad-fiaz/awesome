'use client';
import { File02Icon, GridViewIcon, ListViewIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLayoutStore } from '@/store/layoutStore';
import { PostCard, type PostCardData } from '../post/PostCard';

interface ExploreFeedProps {
  items: PostCardData[];
}

export function ExploreFeed({ items }: ExploreFeedProps) {
  const { viewMode, setViewMode } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeView = mounted ? viewMode : 'grid';

  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 20, items.length));
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [mounted, items.length]);

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-ds-text-muted flex flex-col items-center justify-center">
        <HugeiconsIcon icon={File02Icon} size={48} className="mb-3 opacity-30 animate-none" />
        <p className="text-base font-semibold mb-1">No items found</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-ds-outline-variant mb-5">
        <span className="text-sm font-semibold text-ds-on-surface">
          Latest
        </span>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-ds-text-muted font-medium">
            View:
          </span>
          <div className="flex items-center bg-ds-surface-high rounded-lg p-0.5 border border-ds-outline-variant">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('list')}
              className={cn(
                'p-1.5 h-auto rounded-md transition-all duration-150',
                activeView === 'list'
                  ? 'bg-ds-primary-container text-ds-on-primary-container shadow-sm'
                  : 'text-ds-on-surface-variant hover:text-ds-on-surface',
              )}
            >
              <HugeiconsIcon icon={ListViewIcon} className="w-4 h-4" size={16} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-1.5 h-auto rounded-md transition-all duration-150',
                activeView === 'grid'
                  ? 'bg-ds-primary-container text-ds-on-primary-container shadow-sm'
                  : 'text-ds-on-surface-variant hover:text-ds-on-surface',
              )}
            >
              <HugeiconsIcon icon={GridViewIcon} className="w-4 h-4" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {activeView === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {visibleItems.map((item, index) => (
            <PostCard
              key={`${item.type}-${item.slug}`}
              post={item}
              index={index}
              view="grid"
              aspectSquare={true}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {visibleItems.map((item, index) => (
            <PostCard
              key={`${item.type}-${item.slug}`}
              post={item}
              index={index}
              view="list"
            />
          ))}
        </div>
      )}

      {visibleCount < items.length && (
        <div ref={loadMoreRef} className="py-12 text-center flex justify-center items-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-ds-primary border-t-transparent" />
          <span className="ml-2 text-sm text-ds-text-muted">Loading more...</span>
        </div>
      )}
    </div>
  );
}
