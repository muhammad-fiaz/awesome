'use client';
import { Clock01Icon, File02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { BASE_PATH } from '@/config/site';
import { cn, resolveImageUrl } from '@/lib/utils';
import { difficultyColors } from '@/lib/difficulty';
import type { Difficulty } from '@/types/post';
import { SafeImage } from '@/components/ui/SafeImage';
import { MagicCard } from '@/components/ui/magic-card';
import { Button } from '@/components/ui/button';

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
  type?: 'post' | 'news' | 'guide';
  sources?: { name: string; url?: string }[];
  links?: {
    website?: string;
    github?: string;
    documentation?: string;
    demo?: string;
    npm?: string;
    crate?: string;
    youtube?: string;
    discord?: string;
  };
  pubDate?: string;
}

interface PostCardProps {
  post: PostCardData;
  index?: number;
  /** grid = vertical card with big thumbnail; list = horizontal row */
  view?: 'grid' | 'list';
  aspectSquare?: boolean;
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

export function PostCard({ post, index = 0, view = 'list', aspectSquare = false }: PostCardProps) {
  const resolvedThumb = resolveImageUrl(post.thumbnail);
  const gradient = getGradient(post.slug);

  const getHref = () => {
    if (post.type === 'news') return `${BASE_PATH}/news/${post.slug}/`;
    if (post.type === 'guide') return `${BASE_PATH}/guide/`;
    return `${BASE_PATH}/post/${post.slug}/`;
  };

  if (view === 'grid') {
    return (
      <MagicCard
        className="flex flex-col transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5 rounded-xl"
        gradientSize={150}
        gradientColor="var(--ds-magic-glow)"
        gradientFrom="var(--ds-magic-glow-from)"
        gradientTo="var(--ds-magic-glow-to)"
      >
        <a
          href={getHref()}
          className="group overflow-hidden flex flex-col w-full h-full bg-transparent border-0"
        >
          {/* Thumbnail */}
          <div className={cn(
            "relative w-full overflow-hidden bg-ds-surface-high shrink-0",
            aspectSquare ? "aspect-[4/3]" : "aspect-video"
          )}>
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
              <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full bg-ds-primary text-ds-on-primary shadow-sm z-10">
                Featured
              </span>
            )}
            {/* Difficulty badge */}
            {post.difficulty && (
              <span
                className={cn(
                  'absolute top-2 right-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full border backdrop-blur-sm z-10 group-hover:opacity-0 transition-opacity duration-150',
                  difficultyColors[post.difficulty],
                )}
              >
                {post.difficulty}
              </span>
            )}
            {/* Read Post Button - Top Right Corner */}
            <Button
              type="button"
              className="opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 flex items-center gap-1 h-7 rounded-lg text-[10px] font-semibold bg-ds-primary text-ds-on-primary hover:bg-ds-primary/95 px-2.5 absolute right-2 top-2 shadow-sm pointer-events-none z-20"
            >
              {post.type === 'news' ? 'Read News' : post.type === 'guide' ? 'Read Guide' : 'Read Post'}
              <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
            </Button>
            {/* Category pill */}
            {post.categories[0] && (
              <span className="absolute bottom-2 left-2 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-ds-surface-lowest/90 text-ds-secondary backdrop-blur-sm border border-ds-outline-variant/40">
                {post.categories[0]}
              </span>
            )}
            {post.type && (
              <span className={cn(
                "absolute bottom-2 right-2 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-full backdrop-blur-sm border z-10",
                post.type === 'news' && "bg-orange-500/80 dark:bg-orange-950/80 text-white dark:text-orange-400 border-orange-500/30",
                post.type === 'guide' && "bg-indigo-500/80 dark:bg-indigo-950/80 text-white dark:text-indigo-400 border-indigo-500/30",
                (post.type === 'post' || !post.type) && "bg-emerald-500/80 dark:bg-emerald-950/80 text-white dark:text-emerald-400 border-emerald-500/30"
              )}>
                {post.type ?? 'post'}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-4">
            {post.sources && post.sources.length > 0 && (
              <div className="flex flex-wrap gap-1 items-center mb-1.5">
                {post.sources.map((src) => {
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
            <h3 className="font-semibold text-ds-on-surface leading-snug text-sm line-clamp-2 mb-1.5">
              {post.title}
            </h3>
            <p className="text-xs text-ds-on-surface-variant line-clamp-2 mb-3 flex-1">
              {post.description}
            </p>
            {/* Footer */}
            <div className="relative flex items-center justify-between mt-auto pt-2 border-t border-ds-outline-variant/20">
              <span className="text-[10px] text-ds-text-muted flex items-center gap-0.5">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  size={11}
                  className="fill-current"
                />
                {post.readingTime} min
              </span>
              <span className="text-[10px] text-ds-text-muted truncate max-w-20">
                {post.authors[0] ? post.authors[0].replace(/-/g, ' ') : ''}
              </span>
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
      gradientFrom="var(--ds-magic-glow-from)"
      gradientTo="var(--ds-magic-glow-to)"
    >
      <a
        href={getHref()}
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
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {post.type && (
              <span className={cn(
                "inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider border",
                post.type === 'news' && "bg-orange-500/10 text-orange-500 border-orange-500/20",
                post.type === 'guide' && "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
                (post.type === 'post' || !post.type) && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              )}>
                {post.type}
              </span>
            )}
            {post.categories[0] && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-ds-secondary-container/10 text-ds-secondary border border-ds-secondary/20">
                {post.categories[0]}
              </span>
            )}
            {post.sources && post.sources.length > 0 && (
              <>
                <span className="text-ds-text-muted text-xs">·</span>
                <span className="flex flex-wrap gap-1 items-center">
                  {post.sources.map((src) => {
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
                </span>
              </>
            )}
            {post.authors && post.authors.length > 0 && (
              <>
                <span className="text-ds-text-muted text-xs">·</span>
                <span className="text-xs text-ds-text-muted capitalize">
                  {post.authors.map((a) => a.replace(/-/g, ' ')).join(', ')}
                </span>
              </>
            )}
            {post.organisations && post.organisations.length > 0 && (
              <>
                <span className="text-ds-text-muted text-xs">·</span>
                <span className="text-[10px] text-ds-text-muted bg-ds-surface-high/60 px-1.5 py-0.5 rounded capitalize">
                  {post.organisations.map((org) => org.replace(/-/g, ' ')).join(', ')}
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
          <h3 className="font-semibold text-ds-on-surface leading-snug text-sm md:text-base mb-1 line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-xs md:text-sm text-ds-on-surface-variant line-clamp-2 mb-2">
            {post.description}
          </p>

          {/* Footer */}
          <div className="relative flex items-center justify-between mt-2 pt-2 border-t border-ds-outline-variant/20">
            <div className="flex items-center gap-2 flex-wrap group-hover:opacity-0 transition-opacity duration-150">
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
            <Button
              type="button"
              className="opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 flex items-center gap-1 h-7 rounded-lg text-[10px] font-semibold bg-ds-primary text-ds-on-primary hover:bg-ds-primary/95 px-2.5 absolute right-0 bottom-0 shadow-xs pointer-events-none"
            >
              {post.type === 'news' ? 'Read News' : post.type === 'guide' ? 'Read Guide' : 'Read Post'}
              <HugeiconsIcon icon={ArrowRight01Icon} size={11} />
            </Button>
          </div>
        </div>
      </a>
    </MagicCard>
  );
}
