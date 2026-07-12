'use client';
import {
  GridViewIcon,
  ListViewIcon,
  SearchIcon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BASE_PATH } from '@/config/site';
import { cn } from '@/lib/utils';
import { SafeImage } from '@/components/ui/SafeImage';
import { MagicCard } from '@/components/ui/magic-card';

export interface AuthorData {
  slug: string;
  name: string;
  title?: string;
  avatar?: string;
  bio?: string;
  location?: string;
}

interface AuthorsFeedProps {
  authors: AuthorData[];
}

export function AuthorsFeed({ authors }: AuthorsFeedProps) {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return authors;
    return authors.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        (a.title?.toLowerCase().includes(q) ?? false) ||
        (a.bio?.toLowerCase().includes(q) ?? false) ||
        (a.location?.toLowerCase().includes(q) ?? false),
    );
  }, [authors, query]);

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
            placeholder="Search authors..."
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
            {filtered.length} author{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-ds-text-muted flex flex-col items-center justify-center">
          <HugeiconsIcon icon={UserIcon} size={48} className="mb-3 opacity-30 animate-none" />
          <p className="text-base font-semibold mb-1">No authors found</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((author) => (
            <MagicCard
              key={author.slug}
              className="flex flex-col transition-all duration-200 hover:scale-[1.02] rounded-xl"
              gradientSize={150}
              gradientColor="var(--ds-magic-glow)"
              gradientFrom="var(--ds-magic-glow-from)"
              gradientTo="var(--ds-magic-glow-to)"
            >
              <a
                href={`${BASE_PATH}/authors/${author.slug}/`}
                className="group p-6 flex flex-col items-center text-center w-full h-full bg-transparent border-0"
              >
                <SafeImage
                  src={author.avatar}
                  alt={author.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-ds-outline-variant group-hover:ring-ds-primary transition-all duration-200 mb-4"
                  loading="lazy"
                  crossOrigin="anonymous"
                  fallback={
                    <div className="w-20 h-20 rounded-full bg-ds-primary-container text-ds-on-primary-container flex items-center justify-center text-2xl font-bold mb-4 ring-4 ring-ds-outline-variant group-hover:ring-ds-primary transition-all duration-200">
                      {author.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                  }
                />
                <h3 className="font-bold text-ds-on-surface text-base">
                  {author.name}
                </h3>
                {author.title && (
                  <p className="text-xs text-ds-on-surface-variant mt-1 line-clamp-1">{author.title}</p>
                )}
                {author.location && (
                  <p className="text-[10px] text-ds-text-muted mt-1">{author.location}</p>
                )}
                {author.bio && (
                  <p className="text-xs text-ds-text-muted mt-2 line-clamp-2 leading-relaxed">{author.bio}</p>
                )}
              </a>
            </MagicCard>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((author) => (
            <MagicCard
              key={author.slug}
              className="flex flex-col transition-all duration-200 hover:scale-[1.01] rounded-xl"
              gradientSize={150}
              gradientColor="var(--ds-magic-glow)"
              gradientFrom="var(--ds-magic-glow-from)"
              gradientTo="var(--ds-magic-glow-to)"
            >
              <a
                href={`${BASE_PATH}/authors/${author.slug}/`}
                className="group flex items-center gap-4 p-4 w-full h-full bg-transparent border-0"
              >
                <SafeImage
                  src={author.avatar}
                  alt={author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-ds-outline-variant shrink-0"
                  loading="lazy"
                  crossOrigin="anonymous"
                  fallback={
                    <div className="w-12 h-12 rounded-full bg-ds-primary-container text-ds-on-primary-container flex items-center justify-center text-sm font-bold shrink-0 animate-none">
                      {author.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                  }
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-ds-on-surface text-sm">
                    {author.name}
                  </h3>
                  {author.title && (
                    <p className="text-xs text-ds-on-surface-variant line-clamp-1">{author.title}</p>
                  )}
                </div>
              </a>
            </MagicCard>
          ))}
        </div>
      )}
    </div>
  );
}
