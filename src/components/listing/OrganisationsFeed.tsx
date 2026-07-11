'use client';
import {
  GridViewIcon,
  ListViewIcon,
  SearchIcon,
  Briefcase01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BASE_PATH } from '@/config/site';
import { cn } from '@/lib/utils';
import { SafeImage } from '@/components/ui/SafeImage';
import { MagicCard } from '@/components/ui/magic-card';

export interface OrganisationData {
  slug: string;
  name: string;
  title?: string;
  avatar?: string;
  bio?: string;
  location?: string;
}

interface OrganisationsFeedProps {
  organisations: OrganisationData[];
}

export function OrganisationsFeed({ organisations }: OrganisationsFeedProps) {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return organisations;
    return organisations.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        (o.title?.toLowerCase().includes(q) ?? false) ||
        (o.bio?.toLowerCase().includes(q) ?? false) ||
        (o.location?.toLowerCase().includes(q) ?? false),
    );
  }, [organisations, query]);

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
            placeholder="Search organisations..."
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
            {filtered.length} organisation{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <MagicCard
          className="rounded-xl border border-ds-outline-variant bg-ds-surface-card shadow-sm"
          gradientSize={180}
          gradientColor="var(--ds-magic-glow)"
        >
          <div className="text-center py-16 text-ds-text-muted w-full h-full bg-transparent border-0 flex flex-col items-center justify-center">
            <HugeiconsIcon icon={Briefcase01Icon} size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-base font-semibold mb-1">No organisations found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        </MagicCard>
      ) : view === 'grid' ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((org) => (
            <MagicCard
              key={org.slug}
              className="flex flex-col transition-all duration-200 hover:scale-[1.02] rounded-xl border border-ds-outline-variant bg-ds-surface-card shadow-sm"
              gradientSize={150}
              gradientColor="var(--ds-magic-glow)"
              gradientFrom="var(--ds-primary)"
              gradientTo="var(--ds-secondary)"
            >
              <a
                href={`${BASE_PATH}/organisations/${org.slug}/`}
                className="group p-6 flex flex-col items-center text-center w-full h-full bg-transparent border-0"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden mb-4 ring-4 ring-ds-outline-variant group-hover:ring-ds-primary transition-all duration-200 bg-ds-surface-high flex items-center justify-center">
                  <SafeImage
                    src={org.avatar}
                    alt={org.name}
                    className="max-w-full max-h-full object-contain p-1"
                    loading="lazy"
                    crossOrigin="anonymous"
                    fallback={
                      <div className="w-full h-full bg-ds-primary-container text-ds-on-primary-container flex items-center justify-center text-2xl font-bold">
                        {org.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                    }
                  />
                </div>
                <h3 className="font-bold text-ds-on-surface group-hover:text-ds-primary transition-colors text-base">
                  {org.name}
                </h3>
                {org.title && (
                  <p className="text-xs text-ds-on-surface-variant mt-1 line-clamp-1">{org.title}</p>
                )}
                {org.location && (
                  <p className="text-[10px] text-ds-text-muted mt-1">{org.location}</p>
                )}
                {org.bio && (
                  <p className="text-xs text-ds-text-muted mt-2 line-clamp-2 leading-relaxed">{org.bio}</p>
                )}
              </a>
            </MagicCard>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((org) => (
            <MagicCard
              key={org.slug}
              className="flex flex-col transition-all duration-200 hover:scale-[1.01] rounded-xl border border-ds-outline-variant bg-ds-surface-card shadow-sm"
              gradientSize={150}
              gradientColor="var(--ds-magic-glow)"
              gradientFrom="var(--ds-primary)"
              gradientTo="var(--ds-secondary)"
            >
              <a
                href={`${BASE_PATH}/organisations/${org.slug}/`}
                className="group flex items-center gap-4 p-4 w-full h-full bg-transparent border-0"
              >
                <div className="shrink-0 relative w-12 h-12 rounded-lg overflow-hidden ring-2 ring-ds-outline-variant bg-ds-surface-high flex items-center justify-center">
                  <SafeImage
                    src={org.avatar}
                    alt={org.name}
                    className="max-w-full max-h-full object-contain p-0.5"
                    loading="lazy"
                    crossOrigin="anonymous"
                    fallback={
                      <div className="w-full h-full bg-ds-primary-container text-ds-on-primary-container flex items-center justify-center text-sm font-bold">
                        {org.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-ds-on-surface group-hover:text-ds-primary transition-colors text-sm">
                    {org.name}
                  </h3>
                  {org.title && (
                    <p className="text-xs text-ds-on-surface-variant line-clamp-1">{org.title}</p>
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
