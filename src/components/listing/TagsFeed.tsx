'use client';
import {
  GridViewIcon,
  ListViewIcon,
  SearchIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BASE_PATH } from '@/config/site';
import { cn } from '@/lib/utils';

export interface TagData {
  slug: string;
  title: string;
  count: number;
}

interface TagsFeedProps {
  tags: TagData[];
}

export function TagsFeed({ tags }: TagsFeedProps) {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return tags;
    return tags.filter((t) => t.title.toLowerCase().includes(q));
  }, [tags, query]);

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <HugeiconsIcon
            icon={SearchIcon}
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ds-text-muted pointer-events-none"
          />
          <Input
            placeholder="Search tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-10 rounded-xl"
          />
        </div>
        <div className="flex items-center border border-ds-outline-variant rounded-xl overflow-hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setView('grid')}
            className={cn(
              'h-10 w-10 rounded-none',
              view === 'grid' && 'bg-ds-primary-container text-ds-on-primary-container',
            )}
          >
            <HugeiconsIcon icon={GridViewIcon} size={16} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setView('list')}
            className={cn(
              'h-10 w-10 rounded-none',
              view === 'list' && 'bg-ds-primary-container text-ds-on-primary-container',
            )}
          >
            <HugeiconsIcon icon={ListViewIcon} size={16} />
          </Button>
        </div>
        <span className="text-sm text-ds-text-muted">
          {filtered.length} tag{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Results */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-ds-text-muted border border-dashed border-ds-outline-variant rounded-xl"
          >
            <HugeiconsIcon icon={SearchIcon} size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-base font-semibold mb-1">No tags found</p>
            <p className="text-sm">Try a different search term</p>
          </motion.div>
        ) : view === 'grid' ? (
          <div className="flex flex-wrap gap-3">
            {filtered.map((tag, i) => (
              <motion.a
                key={tag.slug}
                href={`${BASE_PATH}/tags/${tag.slug}/`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ds-outline-variant bg-ds-surface-high text-ds-on-surface-variant hover:border-ds-primary hover:text-ds-primary hover:bg-ds-primary-container/30 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02, duration: 0.2 }}
              >
                <span className="text-sm font-medium">{tag.title}</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                  {tag.count}
                </Badge>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((tag, i) => (
              <motion.a
                key={tag.slug}
                href={`${BASE_PATH}/tags/${tag.slug}/`}
                className="card-ds flex items-center gap-3 p-3 group hover:scale-[1.01] transition-transform duration-200"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
              >
                <span className="text-sm font-medium text-ds-on-surface group-hover:text-ds-primary transition-colors">
                  {tag.title}
                </span>
                <span className="text-xs text-ds-text-muted">
                  {tag.count} post{tag.count !== 1 ? 's' : ''}
                </span>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
