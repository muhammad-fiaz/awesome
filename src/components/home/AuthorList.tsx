'use client';
import { motion } from 'framer-motion';
import { BASE_PATH } from '@/config/site';
import { getInitials } from '@/lib/utils';

export interface AuthorItem {
  slug: string;
  name: string;
  title?: string;
  avatar?: string;
  postCount?: number;
}

interface AuthorListProps {
  authors: AuthorItem[];
}

export function AuthorList({ authors }: AuthorListProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-ds-on-surface mb-4">
        Top Authors
      </h2>
      <div className="space-y-3">
        {authors.map((author, i) => (
          <motion.a
            key={author.slug}
            href={`${BASE_PATH}/authors/${author.slug}/`}
            className="flex items-center gap-3 group"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            whileHover={{ x: 3 }}
          >
            {/* Avatar */}
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-10 h-10 rounded-full object-cover shrink-0 border border-ds-outline-variant"
                loading="lazy"
              />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-ds-primary-container text-ds-on-primary-container shrink-0">
                {getInitials(author.name)}
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ds-on-surface group-hover:text-ds-primary transition-colors truncate">
                {author.name}
              </p>
              {author.title && (
                <p className="text-xs text-ds-text-muted truncate">
                  {author.title}
                </p>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
