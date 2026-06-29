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
import { BASE_PATH } from '@/config/site';
import { cn } from '@/lib/utils';

export interface CategoryData {
  slug: string;
  title: string;
  description?: string;
}

interface CategoriesFeedProps {
  categories: CategoryData[];
}

export function CategoriesFeed({ categories }: CategoriesFeedProps) {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return categories;
    return categories.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.description?.toLowerCase().includes(q) ?? false),
    );
  }, [categories, query]);

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
            placeholder="Search categories..."
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
            {filtered.length} categor{filtered.length !== 1 ? 'ies' : 'y'}
          </span>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-ds-text-muted border border-dashed border-ds-outline-variant rounded-xl">
          <HugeiconsIcon icon={SearchIcon} size={48} className="mx-auto mb-3 opacity-30" />
          <p className="text-base font-semibold mb-1">No categories found</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cat) => (
            <a
              key={cat.slug}
              href={`${BASE_PATH}/categories/${cat.slug}/`}
              className="card-ds p-5 group hover:scale-[1.02] transition-transform duration-200"
            >
              <h3 className="font-bold text-ds-on-surface group-hover:text-ds-primary transition-colors text-base mb-1">
                {cat.title}
              </h3>
              {cat.description && (
                <p className="text-xs text-ds-on-surface-variant line-clamp-2 mb-2">{cat.description}</p>
              )}
            </a>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((cat) => (
            <a
              key={cat.slug}
              href={`${BASE_PATH}/categories/${cat.slug}/`}
              className="card-ds flex items-center gap-4 p-4 group hover:scale-[1.01] transition-transform duration-200"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-ds-on-surface group-hover:text-ds-primary transition-colors text-sm">
                  {cat.title}
                </h3>
                {cat.description && (
                  <p className="text-xs text-ds-on-surface-variant line-clamp-1">{cat.description}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
