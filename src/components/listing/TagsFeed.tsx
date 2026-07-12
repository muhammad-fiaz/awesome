'use client';
import {
  GridViewIcon,
  ListViewIcon,
  SearchIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MagicCard } from '@/components/ui/magic-card';
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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
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
        <div className="flex items-center gap-3">
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
          <span className="text-sm text-ds-text-muted whitespace-nowrap">
            {filtered.length} tag{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-ds-text-muted flex flex-col items-center justify-center">
          <HugeiconsIcon icon={SearchIcon} size={48} className="mb-3 opacity-30 animate-none" />
          <p className="text-base font-semibold mb-1">No tags found</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      ) : view === 'grid' ? (
        <div className="flex flex-wrap gap-2.5">
          {filtered.map((tag) => (
            <MagicCard
              key={tag.slug}
              className="flex transition-all duration-200 hover:scale-105 rounded-full"
              gradientSize={80}
              gradientColor="var(--ds-magic-glow)"
              gradientFrom="var(--ds-magic-glow-from)"
              gradientTo="var(--ds-magic-glow-to)"
            >
              <a
                href={`${BASE_PATH}/tags/${tag.slug}/`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full w-full h-full bg-transparent border-0"
              >
                <span className="text-sm font-semibold">#{tag.title}</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                  {tag.count}
                </Badge>
              </a>
            </MagicCard>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((tag) => (
            <MagicCard
              key={tag.slug}
              className="flex flex-col transition-all duration-200 hover:scale-[1.01] rounded-xl"
              gradientSize={150}
              gradientColor="var(--ds-magic-glow)"
              gradientFrom="var(--ds-magic-glow-from)"
              gradientTo="var(--ds-magic-glow-to)"
            >
              <a
                href={`${BASE_PATH}/tags/${tag.slug}/`}
                className="group overflow-hidden flex items-center gap-3 p-3 w-full h-full bg-transparent border-0"
              >
                <span className="text-sm font-semibold text-ds-on-surface">
                  #{tag.title}
                </span>
                <span className="text-xs text-ds-text-muted">
                  {tag.count} post{tag.count !== 1 ? 's' : ''}
                </span>
              </a>
            </MagicCard>
          ))}
        </div>
      )}
    </div>
  );
}
