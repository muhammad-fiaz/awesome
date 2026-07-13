'use client';
import { Calendar01Icon, UserIcon, ArrowRight01Icon, News01Icon, Clock01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { BASE_PATH } from '@/config/site';
import { cn, resolveImageUrl } from '@/lib/utils';
import { SafeImage } from '@/components/ui/SafeImage';
import { MagicCard } from '@/components/ui/magic-card';
import { Button } from '@/components/ui/button';

export interface NewsCardData {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  author?: string;
  authors?: string[];
  category?: string;
  tags: string[];
  thumbnail?: string;
  sources?: { name: string; url?: string }[];
  organisations?: string[];
}

interface NewsCardProps {
  news: NewsCardData;
  view?: 'grid' | 'list';
}

function getGradient(slug: string) {
  const gradients = [
    'from-violet-600/30 via-purple-800/20 to-indigo-900/30',
    'from-blue-600/30 via-cyan-800/20 to-teal-900/30',
    'from-emerald-600/30 via-green-800/20 to-teal-900/30',
    'from-orange-600/30 via-amber-800/20 to-yellow-900/30',
    'from-pink-600/30 via-rose-800/20 to-red-900/30',
    'from-indigo-600/30 via-violet-800/20 to-purple-900/30',
  ];
  let hash = 0;
  for (let i = 0; i < slug.length; i++)
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  return gradients[Math.abs(hash) % gradients.length];
}

export function NewsCard({ news, view = 'list' }: NewsCardProps) {
  const resolvedThumb = resolveImageUrl(news.thumbnail);
  const gradient = getGradient(news.slug);
  const formattedDate = new Date(news.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const authorsList = news.authors && news.authors.length > 0
    ? news.authors
    : [];
  const authorNames = authorsList.length > 0
    ? authorsList.map((a) => a.replace(/-/g, ' ')).join(', ')
    : 'Unknown';

  if (view === 'grid') {
    return (
      <MagicCard
        className="flex flex-col transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5 rounded-xl h-full"
        gradientSize={150}
        gradientColor="var(--ds-magic-glow)"
        gradientFrom="var(--ds-magic-glow-from)"
        gradientTo="var(--ds-magic-glow-to)"
      >
        <a
          href={`${BASE_PATH}/news/${news.slug}/`}
          className="group overflow-hidden flex flex-col w-full h-full bg-transparent border-0"
        >
          {/* Thumbnail */}
          <div className="relative w-full aspect-video overflow-hidden bg-ds-surface-high shrink-0">
            <SafeImage
              src={resolvedThumb}
              alt={news.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              loading="lazy"
              fallback={
                <div
                  className={cn(
                    'w-full h-full bg-linear-to-br',
                    gradient,
                    'flex items-center justify-center',
                  )}
                >
                  <div className="text-center p-4">
                    <HugeiconsIcon
                      icon={News01Icon}
                      size={40}
                      className="text-ds-primary opacity-60"
                    />
                  </div>
                </div>
              }
            />
            {resolvedThumb && (
              <div className="absolute inset-0 bg-linear-to-t from-ds-surface-lowest/80 via-transparent to-transparent pointer-events-none" />
            )}

            {/* Read News Button - Top Right Corner */}
            <Button
              type="button"
              className="opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 flex items-center gap-1 h-7 rounded-lg text-[10px] font-semibold bg-ds-primary text-ds-on-primary hover:bg-ds-primary/95 px-2.5 absolute right-2 top-2 shadow-sm pointer-events-none z-20"
            >
              Read News
              <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
            </Button>
            {news.category && (
              <span className="absolute bottom-2 left-2 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-ds-surface-lowest/90 text-ds-secondary backdrop-blur-sm border border-ds-outline-variant/40">
                {news.category}
              </span>
            )}
            <span className={cn(
              "absolute bottom-2 right-2 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-full backdrop-blur-sm border z-10",
              "bg-orange-500/80 dark:bg-orange-950/80 text-white dark:text-orange-400 border-orange-500/30"
            )}>
              news
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-4">
            {/* Header info */}
            <div className="flex items-center justify-between text-[10px] text-ds-text-muted mb-2">
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={Calendar01Icon} size={11} strokeWidth={1.5} />
                <span>{formattedDate}</span>
              </span>
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={UserIcon} size={11} strokeWidth={1.5} />
                <span className="capitalize">{authorNames}</span>
              </span>
            </div>

            <h3 className="font-semibold text-ds-on-surface text-sm line-clamp-2 leading-snug mb-1.5">
              {news.title}
            </h3>

            <p className="text-xs text-ds-on-surface-variant line-clamp-2 leading-relaxed mb-3 flex-1">
              {news.description}
            </p>

            <div className="relative flex items-center justify-between mt-auto pt-2 border-t border-ds-outline-variant/30">
              <div className="flex flex-wrap gap-1">
                {news.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-ds-on-surface-variant bg-ds-surface-high/60 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </a>
      </MagicCard>
    );
  }

  return (
    <MagicCard
      className="flex flex-col transition-all duration-200 hover:scale-[1.01] rounded-xl"
      gradientSize={150}
      gradientColor="var(--ds-magic-glow)"
      gradientFrom="var(--ds-magic-glow-from)"
      gradientTo="var(--ds-magic-glow-to)"
    >
      <a
        href={`${BASE_PATH}/news/${news.slug}/`}
        className="group overflow-hidden flex flex-col sm:flex-row w-full h-full bg-transparent border-0"
      >
        {/* Thumbnail (Left side on desktop) */}
        <div className="relative w-full sm:w-48 xl:w-60 aspect-video sm:aspect-auto sm:min-h-full overflow-hidden bg-ds-surface-high shrink-0">
          <SafeImage
            src={resolvedThumb}
            alt={news.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
            fallback={
              <div
                className={cn(
                  'w-full h-full bg-gradient-to-br flex items-center justify-center text-xs font-semibold uppercase tracking-wider text-ds-text-muted',
                  gradient
                )}
              >
                News
              </div>
            }
          />
          {news.category && (
            <span className="absolute top-3 left-3 bg-ds-background/80 backdrop-blur-sm border border-ds-outline-variant text-[10px] font-bold text-ds-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {news.category}
            </span>
          )}
        </div>

        {/* Content (Right side on desktop) */}
        <div className="p-4 flex flex-col flex-1 min-w-0">
          {news.sources && news.sources.length > 0 && (
            <div className="flex flex-wrap gap-1 items-center mb-1.5">
              {news.sources.map((src) => {
                const badge = (
                  <span key={src.name} className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-ds-secondary-container/10 text-ds-secondary border border-ds-secondary/20 hover:bg-ds-secondary/20 transition-colors">
                    {src.name}
                  </span>
                );
                if (src.url) {
                  return (
                    <a key={src.name} href={src.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="no-underline">
                      {badge}
                    </a>
                  );
                }
                return badge;
              })}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3 text-[10px] text-ds-text-muted mb-2">
            <span className={cn(
              "inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider border",
              "bg-orange-500/10 text-orange-500 border-orange-500/20"
            )}>
              news
            </span>
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={Calendar01Icon} size={11} strokeWidth={1.5} />
              <span>{formattedDate}</span>
            </span>
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={UserIcon} size={11} strokeWidth={1.5} />
              <span className="capitalize">{authorNames}</span>
            </span>
            {news.organisations && news.organisations.length > 0 && (
              <>
                <span className="text-ds-text-muted text-[10px]">·</span>
                <span className="text-[10px] text-ds-text-muted bg-ds-surface-high/60 px-1.5 py-0.5 rounded capitalize">
                  {news.organisations.map((org) => org.replace(/-/g, ' ')).join(', ')}
                </span>
              </>
            )}
          </div>

          <h3 className="font-semibold text-ds-on-surface text-sm sm:text-base line-clamp-2 leading-snug mb-1.5">
            {news.title}
          </h3>

          <p className="text-xs text-ds-on-surface-variant line-clamp-2 leading-relaxed mb-3">
            {news.description}
          </p>

          <div className="relative flex items-center justify-between mt-auto pt-2 border-t border-ds-outline-variant/30">
            <div className="flex flex-wrap gap-1 group-hover:opacity-0 transition-opacity duration-150">
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-ds-on-surface-variant bg-ds-surface-high/60 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <Button
              type="button"
              className="opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 flex items-center gap-1 h-7 rounded-lg text-[10px] font-semibold bg-ds-primary text-ds-on-primary hover:bg-ds-primary/95 px-2.5 absolute right-0 bottom-0 shadow-xs pointer-events-none"
            >
              Read News
              <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
            </Button>
          </div>
        </div>
      </a>
    </MagicCard>
  );
}
