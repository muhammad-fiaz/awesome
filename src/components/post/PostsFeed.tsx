'use client';
import { File02Icon, GridViewIcon, ListViewIcon, SearchIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useLayoutStore } from '@/store/layoutStore';
import { PostCard, type PostCardData } from './PostCard';

interface PostsFeedProps {
  posts: PostCardData[];
  showViewToggle?: boolean;
  emptyMessage?: string;
  showSearch?: boolean;
}

export function PostsFeed({
  posts,
  showViewToggle = true,
  emptyMessage,
  showSearch = false,
}: PostsFeedProps) {
  const { viewMode, setViewMode } = useLayoutStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeView = mounted ? viewMode : 'grid';

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.categories.some((c) => c.toLowerCase().includes(q)) ||
        (post.projectName?.toLowerCase().includes(q) ?? false)
    );
  }, [posts, searchQuery]);

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-ds-text-muted flex flex-col items-center justify-center">
        <HugeiconsIcon icon={File02Icon} size={48} className="mb-3 opacity-30 animate-none" />
        <p className="text-base font-semibold mb-1">No posts found</p>
        <p className="text-sm">{emptyMessage || 'Try a different filter or search term'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Controls */}
      {(showSearch || showViewToggle) && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-ds-outline-variant mb-5">
          {showSearch ? (
            <div className="relative flex-1 max-w-md">
              <HugeiconsIcon
                icon={SearchIcon}
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ds-text-muted pointer-events-none"
              />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 rounded-xl"
              />
            </div>
          ) : (
            <span className="text-sm text-ds-on-surface-variant font-medium">
              All posts
            </span>
          )}

          {showViewToggle && (
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
                    'p-1.5 h-auto rounded-md transition-all duration-150',
                    activeView === 'grid'
                      ? 'bg-ds-primary-container text-ds-on-primary-container shadow-sm'
                      : 'text-ds-on-surface-variant hover:text-ds-on-surface',
                  )}
                  title="Gallery view"
                  aria-label="Gallery view"
                >
                  <HugeiconsIcon icon={GridViewIcon} size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-ds-text-muted flex flex-col items-center justify-center">
          <HugeiconsIcon icon={File02Icon} size={48} className="mb-3 opacity-30 animate-none" />
          <p className="text-base font-semibold mb-1">No posts matched search</p>
          <p className="text-sm">Try a different search query</p>
        </div>
      ) : activeView === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredPosts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} view="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPosts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} view="list" />
          ))}
        </div>
      )}
    </div>
  );
}
