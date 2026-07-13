'use client';
import { Clock01Icon, ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { difficultyColors } from '@/lib/difficulty';
import { BASE_PATH } from '@/config/site';
import { cn, getInitials } from '@/lib/utils';
import type { Difficulty } from '@/types/post';
import { SafeImage } from '@/components/ui/SafeImage';

interface PostHeroProps {
  title: string;
  description: string;
  heroImage?: string;
  thumbnail?: string;
  categories: string[];
  tags: string[];
  authors: string[];
  readingTime: number | string;
  license?: string;
  difficulty?: Difficulty;
}

function getGradient(title: string) {
  const gradients = [
    'from-violet-600/30 via-purple-800/20 to-indigo-900/30',
    'from-blue-600/30 via-cyan-800/20 to-teal-900/30',
    'from-emerald-600/30 via-green-800/20 to-teal-900/30',
    'from-orange-600/30 via-amber-800/20 to-yellow-900/30',
    'from-pink-600/30 via-rose-800/20 to-red-900/30',
    'from-indigo-600/30 via-violet-800/20 to-purple-900/30',
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++)
    hash = (hash * 31 + title.charCodeAt(i)) | 0;
  return gradients[Math.abs(hash) % gradients.length];
}

export function PostHero({
  title,
  description,
  heroImage,
  thumbnail,
  categories,
  tags,
  authors,
  readingTime,
  license,
  difficulty,
}: PostHeroProps) {
  const image = heroImage ?? thumbnail;

  return (
    <div className="relative w-full">
      {image ? (
        <div className="relative h-48 md:h-80 overflow-hidden bg-ds-surface-high">
          <SafeImage
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-70"
            fallback={
              <div className={cn('w-full h-full bg-linear-to-br', getGradient(title))} />
            }
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent 30%, var(--background) 100%)',
            }}
          />
        </div>
      ) : null}

      <div className={cn('px-4 sm:px-6 md:px-8 xl:px-10 py-6 w-full', image && '-mt-16 relative z-10')}>
        <nav className="flex items-center gap-2 text-sm mb-4 flex-wrap" aria-label="Breadcrumb">
          <a
            href={`${BASE_PATH}/`}
            className="text-ds-text-muted hover:text-ds-on-surface transition-colors"
          >
            Home
          </a>
          <span className="text-ds-text-muted">/</span>
          <a
            href={`${BASE_PATH}/posts/`}
            className="text-ds-text-muted hover:text-ds-on-surface transition-colors"
          >
            Resources
          </a>
          {categories.length > 0 && (
            <>
              <span className="text-ds-text-muted">/</span>
              <a
                href={`${BASE_PATH}/categories/${categories[0]}/`}
                className="text-ds-text-muted hover:text-ds-on-surface transition-colors capitalize"
              >
                {categories[0].replace(/-/g, ' ')}
              </a>
            </>
          )}
          <span className="text-ds-text-muted">/</span>
          <span className="text-ds-on-surface font-medium truncate max-w-[160px] sm:max-w-xs">
            {title}
          </span>
        </nav>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`${BASE_PATH}/categories/${cat}/`}
              className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-ds-primary-container text-ds-on-primary-container hover:opacity-80 transition-opacity"
            >
              {cat.replace(/-/g, ' ')}
            </a>
          ))}
          {difficulty && (
            <span
              className={cn(
                'inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border',
                difficultyColors[difficulty],
              )}
            >
              {difficulty}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ds-on-surface mb-3 leading-tight tracking-tight">
          {title}
        </h1>

        <p className="text-ds-on-surface-variant text-sm sm:text-base md:text-lg mb-6 max-w-3xl leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            {authors.map((author) => (
              <a
                key={author}
                href={`${BASE_PATH}/authors/${author}/`}
                className="flex items-center gap-2 text-ds-on-surface-variant hover:text-ds-on-surface transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-ds-primary-container text-ds-on-primary-container flex items-center justify-center text-[10px] font-bold shrink-0">
                  {getInitials(author)}
                </div>
                <span className="font-medium capitalize text-sm">
                  {author.replace(/-/g, ' ')}
                </span>
              </a>
            ))}
          </div>

          <span className="text-ds-outline hidden sm:inline">·</span>

          <span className="flex items-center gap-1 text-ds-text-muted text-xs sm:text-sm">
            <HugeiconsIcon icon={Clock01Icon} size={14} strokeWidth={1.5} />
            {typeof readingTime === 'string'
              ? readingTime
              : `${readingTime} min read`}
          </span>

          {license && (
            <>
              <span className="text-ds-outline hidden sm:inline">·</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-ds-surface-high text-ds-text-muted">
                {license}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
