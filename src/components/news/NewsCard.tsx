'use client';
import { Calendar01Icon, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { BASE_PATH } from '@/config/site';
import { cn, resolveImageUrl } from '@/lib/utils';
import { SafeImage } from '@/components/ui/SafeImage';
import { MagicCard } from '@/components/ui/magic-card';

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
        gradientFrom="var(--ds-primary)"
        gradientTo="var(--ds-secondary)"
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

          {/* Info */}
          <div className="p-4 flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-3 text-[10px] text-ds-text-muted mb-2">
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={Calendar01Icon} size={11} strokeWidth={1.5} />
                <span>{formattedDate}</span>
              </span>
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={UserIcon} size={11} strokeWidth={1.5} />
                <span className="capitalize">{authorNames}</span>
              </span>
            </div>

            <h3 className="font-semibold text-ds-on-surface group-hover:text-ds-primary transition-colors text-sm line-clamp-2 leading-snug mb-1.5">
              {news.title}
            </h3>

            <p className="text-xs text-ds-on-surface-variant line-clamp-2 leading-relaxed mb-3 flex-1">
              {news.description}
            </p>

            <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-ds-outline-variant/30">
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
        </a>
      </MagicCard>
    );
  }

  return (
    <MagicCard
      className="flex flex-col transition-all duration-200 hover:scale-[1.01] rounded-xl"
      gradientSize={150}
      gradientColor="var(--ds-magic-glow)"
      gradientFrom="var(--ds-primary)"
      gradientTo="var(--ds-secondary)"
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
          <div className="flex items-center gap-3 text-[10px] text-ds-text-muted mb-2">
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={Calendar01Icon} size={11} strokeWidth={1.5} />
              <span>{formattedDate}</span>
            </span>
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={UserIcon} size={11} strokeWidth={1.5} />
              <span className="capitalize">{authorNames}</span>
            </span>
          </div>

          <h3 className="font-semibold text-ds-on-surface group-hover:text-ds-primary transition-colors text-sm sm:text-base line-clamp-2 leading-snug mb-1.5">
            {news.title}
          </h3>

          <p className="text-xs text-ds-on-surface-variant line-clamp-2 leading-relaxed mb-3">
            {news.description}
          </p>

          <div className="flex flex-wrap gap-1 mt-auto pt-2">
            {news.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-ds-on-surface-variant bg-ds-surface-high/60 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </MagicCard>
  );
}
