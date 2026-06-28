'use client';
import { GridViewIcon, ListViewIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLayoutStore } from '@/store/layoutStore';
import { PostCard, type PostCardData } from './PostCard';

interface PostsFeedProps {
  posts: PostCardData[];
  showViewToggle?: boolean;
}

export function PostsFeed({ posts, showViewToggle = true }: PostsFeedProps) {
  const { viewMode, setViewMode } = useLayoutStore();

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
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} view="grid" />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            className="space-y-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} view="list" />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
