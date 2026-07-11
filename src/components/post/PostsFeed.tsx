'use client';
import { File02Icon, GridViewIcon, ListViewIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLayoutStore } from '@/store/layoutStore';
import { PostCard, type PostCardData } from './PostCard';

interface PostsFeedProps {
  posts: PostCardData[];
  showViewToggle?: boolean;
  emptyMessage?: string;
}

export function PostsFeed({ posts, showViewToggle = true, emptyMessage }: PostsFeedProps) {
  const { viewMode, setViewMode } = useLayoutStore();

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-ds-text-muted border border-dashed border-ds-outline-variant rounded-xl">
        <HugeiconsIcon icon={File02Icon} size={48} className="mx-auto mb-3 opacity-30" />
        <p className="text-base font-semibold mb-1">No posts found</p>
        <p className="text-sm">{emptyMessage || 'Try a different filter or search term'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Layout toggle */}
      {showViewToggle && (
        <div className="flex justify-between items-center pb-4 border-b border-ds-outline-variant mb-5">
          <span className="text-sm text-ds-on-surface-variant font-medium">
            All posts
          </span>
          <div className="flex items-center gap-2">
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
                  viewMode === 'list'
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
                  viewMode === 'grid'
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
        </div>
      )}

      {/* Posts */}
      <div className="posts-feed-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} view="grid" />
        ))}
      </div>
      <div className="posts-feed-list space-y-3">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} view="list" />
        ))}
      </div>
    </div>
  );
}
