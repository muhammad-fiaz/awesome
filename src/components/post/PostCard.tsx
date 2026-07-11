'use client';
import { Clock01Icon, File02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { BASE_PATH } from '@/config/site';
import { cn, resolveImageUrl } from '@/lib/utils';
import { difficultyColors } from '@/lib/difficulty';
import type { Difficulty } from '@/types/post';
import { SafeImage } from '@/components/ui/SafeImage';
import { MagicCard } from '@/components/ui/magic-card';

export interface PostCardData {
  slug: string;
  title: string;
  description: string;
  content?: string;
  thumbnail?: string;
  categories: string[];
  tags: string[];
  authors: string[];
  organisations?: string[];
  readingTime: number;
  featured?: boolean;
  difficulty?: Difficulty;
}

interface PostCardProps {
  post: PostCardData;
  index?: number;
  /** grid = vertical card with big thumbnail; list = horizontal row */
  view?: 'grid' | 'list';
}

// Deterministic gradient fallback based on slug hash
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

export function PostCard({ post, index = 0, view = 'list' }: PostCardProps) {
  const resolvedThumb = resolveImageUrl(post.thumbnail);
  const gradient = getGradient(post.slug);

  if (view === 'grid') {
    return (
      <MagicCard
        className="flex flex-col transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5 rounded-xl"
        gradientSize={150}
        gradientColor="var(--ds-magic-glow)"
        gradientFrom="var(--ds-primary)"
        gradientTo="var(--ds-secondary)"
      >
        <a
          href={`${BASE_PATH}/post/${post.slug}/`}
          className="group overflow-hidden flex flex-col w-full h-full bg-transparent border-0"
        >
          {/* Thumbnail */}
          <div className="relative w-full aspect-video overflow-hidden bg-ds-surface-high shrink-0">
            <SafeImage
              src={resolvedThumb}
              alt={post.title}
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
                      icon={File02Icon}
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
            {/* Featured badge */}
            {post.featured && (
              <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full bg-ds-primary text-ds-on-primary shadow-sm">
                Featured
              </span>
            )}
            {/* Difficulty badge */}
            {post.difficulty && (
              <span
                className={cn(
                  'absolute top-2 right-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full border backdrop-blur-sm',
                  difficultyColors[post.difficulty],
                )}
              >
                {post.difficulty}
              </span>
            )}
            {/* Category pill */}
            {post.categories[0] && (
              <span className="absolute bottom-2 left-2 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-ds-surface-lowest/90 text-ds-secondary backdrop-blur-sm border border-ds-outline-variant/40">
                {post.categories[0]}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-4">
            <h3 className="font-semibold text-ds-on-surface group-hover:text-ds-primary transition-colors leading-snug text-sm line-clamp-2 mb-1.5">
              {post.title}
            </h3>
            <p className="text-xs text-ds-on-surface-variant line-clamp-2 mb-3 flex-1">
              {post.description}
            </p>
            {/* Footer */}
            <div className="flex items-center gap-2 flex-wrap mt-auto">
              <span className="text-[10px] text-ds-text-muted flex items-center gap-0.5">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  size={11}
                  className="fill-current"
                />
                {post.readingTime} min
              </span>
              {post.authors[0] && (
                <span className="text-[10px] text-ds-text-muted ml-auto truncate max-w-20">
                  {post.authors[0].replace(/-/g, ' ')}
                </span>
              )}
            </div>
          </div>
        </a>
      </MagicCard>
    );
  }

  // List view
  return (
    <MagicCard
      className="flex flex-col sm:flex-row transition-all duration-200 hover:scale-[1.005] rounded-xl"
      gradientSize={180}
      gradientColor="var(--ds-magic-glow)"
      gradientFrom="var(--ds-primary)"
      gradientTo="var(--ds-secondary)"
    >
      <a
        href={`${BASE_PATH}/post/${post.slug}/`}
        className="group flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 md:p-5 overflow-hidden w-full h-full bg-transparent border-0"
      >
        {/* Thumbnail */}
        <div className="shrink-0 w-full sm:w-28 md:w-36 h-36 sm:h-20 md:h-24 rounded-lg overflow-hidden bg-ds-surface-high">
          <SafeImage
            src={resolvedThumb}
            alt={post.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
            loading="lazy"
            fallback={
              <div
                className={cn(
                  'w-full h-full bg-linear-to-br',
                  gradient,
                  'flex items-center justify-center',
                )}
              >
                <HugeiconsIcon
                  icon={File02Icon}
                  size={24}
                  className="text-ds-primary opacity-50"
                />
              </div>
            }
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Category + Author */}
          <div className="flex items-center gap-2 mb-1">
            {post.categories[0] && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-ds-secondary">
                {post.categories[0]}
              </span>
            )}
            {post.authors[0] && (
              <>
                <span className="text-ds-text-muted text-xs">·</span>
                <span className="text-xs text-ds-text-muted capitalize">
                  {post.authors[0].replace(/-/g, ' ')}
                </span>
              </>
            )}
            {post.featured && (
              <span className="ml-auto text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-ds-primary/10 text-ds-primary border border-ds-primary/20">
                ★ Featured
              </span>
            )}
            {post.difficulty && (
              <span
                className={cn(
                  'text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border',
                  difficultyColors[post.difficulty],
                )}
              >
                {post.difficulty}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-ds-on-surface group-hover:text-ds-primary transition-colors leading-snug text-sm md:text-base mb-1 line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-xs md:text-sm text-ds-on-surface-variant line-clamp-2 mb-2">
            {post.description}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-ds-text-muted flex items-center gap-1">
              <HugeiconsIcon
                icon={Clock01Icon}
                size={12}
                className="fill-current"
              />
              {post.readingTime} min
            </span>
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="tag-ds text-[10px] hidden sm:inline-flex"
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
