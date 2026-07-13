'use client';
import { BASE_PATH } from '@/config/site';
import { getInitials } from '@/lib/utils';
import { MagicCard } from '@/components/ui/magic-card';

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
      <h2 className="text-sm font-bold uppercase tracking-widest text-ds-text-muted mb-4">
        Top Authors
      </h2>
      <div className="space-y-3">
        {authors.map((author) => (
          <MagicCard
            key={author.slug}
            className="rounded-xl overflow-hidden"
            gradientSize={120}
            gradientColor="var(--ds-magic-glow)"
            gradientFrom="var(--ds-magic-glow-from)"
            gradientTo="var(--ds-magic-glow-to)"
          >
            <a
              href={`${BASE_PATH}/authors/${author.slug}/`}
              className="flex items-center gap-3.5 p-3.5 hover:bg-ds-surface-high/30 transition-all border-0 bg-transparent"
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
                <p className="text-sm font-bold text-ds-on-surface group-hover:text-ds-primary transition-colors truncate">
                  {author.name}
                </p>
                {author.title && (
                  <p className="text-xs text-ds-text-muted truncate mt-0.5">
                    {author.title}
                  </p>
                )}
              </div>

              {author.postCount !== undefined && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ds-primary-container/10 text-ds-primary shrink-0">
                  {author.postCount} post{author.postCount !== 1 ? 's' : ''}
                </span>
              )}
            </a>
          </MagicCard>
        ))}
      </div>
    </section>
  );
}

