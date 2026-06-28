'use client';
import { Clock01Icon, StarIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'framer-motion';
import { BASE_PATH } from '@/config/site';
import { cn } from '@/lib/utils';

export interface FeaturedPost {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  categories: string[];
  tags: string[];
  readingTime: number;
  featured?: boolean;
}

interface FeaturedBentoProps {
  posts: FeaturedPost[];
}

export function FeaturedBento({ posts }: FeaturedBentoProps) {
  if (!posts.length) return null;

  const [primary, ...rest] = posts;
  const secondary = rest.slice(0, 2);

  return (
    <section className="px-6 pb-8">
      <div className="max-w-320 mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-ds-on-surface flex items-center gap-2">
            <HugeiconsIcon
              icon={StarIcon}
              size={22}
              strokeWidth={1.5}
              className="text-ds-primary"
            />
            Featured Resources
          </h2>
          <a
            href={`${BASE_PATH}/featured/`}
            className="text-xs font-bold uppercase tracking-wide text-ds-primary hover:underline"
          >
            View All →
          </a>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Large primary card */}
          <motion.a
            href={`${BASE_PATH}/post/${primary.slug}/`}
            className={cn(
              'card-ds lg:col-span-2 relative overflow-hidden group',
              'h-72 lg:h-96 flex flex-col justify-end p-6',
              'cursor-pointer',
            )}
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.2 }}
          >
            {/* Background */}
            {primary.thumbnail ? (
              <div className="absolute inset-0">
                <img
                  src={primary.thumbnail}
                  alt={primary.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ds-surface-lowest via-ds-surface-lowest/60 to-transparent" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-ds-primary-container/30 to-ds-secondary-container/20" />
            )}

            {/* Content */}
            <div className="relative z-10">
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-ds-primary-container text-ds-on-primary-container mb-3">
                {primary.categories[0] ?? 'Resource'}
              </span>
              <h3 className="text-xl lg:text-2xl font-bold text-ds-on-surface mb-2 group-hover:text-ds-primary transition-colors">
                {primary.title}
              </h3>
              <p className="text-sm text-ds-on-surface-variant line-clamp-2 mb-4 max-w-lg">
                {primary.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-ds-text-muted">
                <HugeiconsIcon icon={Clock01Icon} size={14} strokeWidth={1.5} />
                {primary.readingTime} min read
              </div>
            </div>
          </motion.a>

          {/* Secondary cards */}
          <div className="grid grid-rows-2 gap-5">
            {secondary.map((post) => (
              <motion.a
                key={post.slug}
                href={`${BASE_PATH}/post/${post.slug}/`}
                className="card-ds relative overflow-hidden group p-5 flex flex-col justify-between cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* Thumbnail background */}
                {post.thumbnail ? (
                  <div className="absolute inset-0">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ds-surface-card via-ds-surface-card/80 to-ds-surface-card/40" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-ds-primary-container/10 to-ds-secondary-container/5" />
                )}

                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ds-secondary">
                    {post.categories[0] ?? 'Resource'}
                  </span>
                  <h3 className="mt-1.5 text-base font-semibold text-ds-on-surface group-hover:text-ds-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-1.5 text-xs text-ds-on-surface-variant line-clamp-2">
                      {post.description}
                    </p>
                  )}
                </div>
                <div className="relative z-10 flex items-center gap-2 text-xs text-ds-text-muted mt-2">
                  <HugeiconsIcon
                    icon={Clock01Icon}
                    size={14}
                    strokeWidth={1.5}
                  />
                  {post.readingTime} min read
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
