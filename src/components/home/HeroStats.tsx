'use client';
import { Highlighter } from '@/components/ui/highlighter';

import { NumberTicker } from '@/components/ui/number-ticker';

interface HeroStatsProps {
  stats: {
    posts: number;
    news: number;
    categories: number;
    tags: number;
    authors: number;
    organisations: number;
  };
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <section className="px-4 md:px-6 py-6 md:py-8">
      <div className="max-w-320 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-ds-outline-variant">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ds-on-surface tracking-tight leading-tight mb-3">
              Developer Resources,{' '}
              <Highlighter action="underline" color="var(--ds-primary)" strokeWidth={2.5} padding={4}>
                <span className="text-ds-primary font-extrabold">Curated.</span>
              </Highlighter>
            </h1>
            <p className="text-ds-on-surface-variant text-sm md:text-base max-w-xl leading-relaxed">
              Hand-picked tutorials, tools, and references for the modern
              developer ecosystem.
            </p>
          </div>
          {stats && (
            <div className="hidden lg:flex lg:items-center lg:gap-3 shrink-0">
              <div className="bg-ds-surface-high/30 border border-ds-outline-variant/60 rounded-xl p-2 px-3 text-center lg:text-left min-w-[70px] lg:min-w-[85px] flex-1 lg:flex-initial transition-all hover:bg-ds-surface-high/50 hover:border-ds-primary/30">
                <NumberTicker
                  value={stats.posts}
                  className="block text-lg lg:text-xl font-extrabold text-ds-primary tracking-tight dark:text-ds-primary"
                />
                <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-wider text-ds-text-muted">
                  Posts
                </span>
              </div>
              <div className="bg-ds-surface-high/30 border border-ds-outline-variant/60 rounded-xl p-2 px-3 text-center lg:text-left min-w-[70px] lg:min-w-[85px] flex-1 lg:flex-initial transition-all hover:bg-ds-surface-high/50 hover:border-ds-secondary/30">
                <NumberTicker
                  value={stats.news}
                  className="block text-lg lg:text-xl font-extrabold text-ds-secondary tracking-tight dark:text-ds-secondary"
                />
                <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-wider text-ds-text-muted">
                  News
                </span>
              </div>
              <div className="bg-ds-surface-high/30 border border-ds-outline-variant/60 rounded-xl p-2 px-3 text-center lg:text-left min-w-[70px] lg:min-w-[85px] flex-1 lg:flex-initial transition-all hover:bg-ds-surface-high/50 hover:border-ds-tertiary/30">
                <NumberTicker
                  value={stats.categories}
                  className="block text-lg lg:text-xl font-extrabold text-ds-tertiary tracking-tight dark:text-ds-tertiary"
                />
                <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-wider text-ds-text-muted">
                  Categories
                </span>
              </div>
              <div className="bg-ds-surface-high/30 border border-ds-outline-variant/60 rounded-xl p-2 px-3 text-center lg:text-left min-w-[70px] lg:min-w-[85px] flex-1 lg:flex-initial transition-all hover:bg-ds-surface-high/50 hover:border-ds-info/30">
                <NumberTicker
                  value={stats.tags}
                  className="block text-lg lg:text-xl font-extrabold text-ds-info tracking-tight dark:text-ds-info"
                />
                <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-wider text-ds-text-muted">
                  Tags
                </span>
              </div>
              <div className="bg-ds-surface-high/30 border border-ds-outline-variant/60 rounded-xl p-2 px-3 text-center lg:text-left min-w-[70px] lg:min-w-[85px] flex-1 lg:flex-initial transition-all hover:bg-ds-surface-high/50 hover:border-ds-success/30">
                <NumberTicker
                  value={stats.authors}
                  className="block text-lg lg:text-xl font-extrabold text-ds-success tracking-tight dark:text-ds-success"
                />
                <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-wider text-ds-text-muted">
                  Authors
                </span>
              </div>
              <div className="bg-ds-surface-high/30 border border-ds-outline-variant/60 rounded-xl p-2 px-3 text-center lg:text-left min-w-[70px] lg:min-w-[85px] flex-1 lg:flex-initial transition-all hover:bg-ds-surface-high/50 hover:border-ds-on-surface/30">
                <NumberTicker
                  value={stats.organisations}
                  className="block text-lg lg:text-xl font-extrabold text-ds-on-surface tracking-tight dark:text-ds-on-surface"
                />
                <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-wider text-ds-text-muted">
                  Orgs
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
