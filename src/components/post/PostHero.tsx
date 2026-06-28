'use client';
import { Clock01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'framer-motion';
import { difficultyColors } from '@/lib/difficulty';
import { BASE_PATH } from '@/config/site';
import { cn, getInitials } from '@/lib/utils';
import type { Difficulty } from '@/types/post';

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
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {image && (
        <div className="relative h-48 md:h-80 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-70"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent 30%, var(--background) 100%)',
            }}
          />
        </div>
      )}

      <div className={cn('px-6 py-8', image && '-mt-16 relative z-10')}>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`${BASE_PATH}/categories/${cat}/`}
              className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-ds-primary-container text-ds-on-primary-container hover:opacity-80 transition-opacity"
            >
              {cat}
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

        <h1 className="text-2xl md:text-4xl font-bold text-ds-on-surface mb-3 leading-tight tracking-tight">
          {title}
        </h1>

        <p className="text-ds-on-surface-variant text-base md:text-lg mb-6 max-w-3xl">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            {authors.map((author) => (
              <a
                key={author}
                href={`${BASE_PATH}/authors/${author}/`}
                className="flex items-center gap-2 text-ds-on-surface-variant hover:text-ds-on-surface transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-ds-primary-container text-ds-on-primary-container flex items-center justify-center text-[10px] font-bold">
                  {getInitials(author)}
                </div>
                <span className="font-medium capitalize">
                  {author.replace(/-/g, ' ')}
                </span>
              </a>
            ))}
          </div>

          <span className="text-ds-outline">·</span>

          <span className="flex items-center gap-1 text-ds-text-muted">
            <HugeiconsIcon icon={Clock01Icon} size={14} strokeWidth={1.5} />
            {typeof readingTime === 'string'
              ? readingTime
              : `${readingTime} min read`}
          </span>

          {license && (
            <>
              <span className="text-ds-outline">·</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-ds-surface-high text-ds-text-muted">
                {license}
              </span>
            </>
          )}
        </div>

      </div>
    </motion.div>
  );
}
