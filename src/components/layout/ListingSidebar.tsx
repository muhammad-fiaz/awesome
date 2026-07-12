'use client';
import { StarIcon, Clock01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { MagicCard } from '@/components/ui/magic-card';
import { BASE_PATH } from '@/config/site';

interface SidebarItem {
  slug: string;
  title: string;
  count?: number;
}

interface ListingSidebarProps {
  type: 'post' | 'news';
  categories: SidebarItem[];
  tags: SidebarItem[];
}

export function ListingSidebar({ type, categories, tags }: ListingSidebarProps) {
  const isNews = type === 'news';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
      {/* Quick Links */}
      <MagicCard
        className="rounded-xl"
        gradientSize={120}
        gradientColor="var(--ds-magic-glow)"
        gradientFrom="var(--ds-magic-glow-from)"
        gradientTo="var(--ds-magic-glow-to)"
      >
        <div className="p-5 space-y-3 bg-transparent border-0">
          <h3 className="text-xs font-bold uppercase tracking-widest text-ds-text-muted mb-3">
            {isNews ? 'Explore News' : 'Explore'}
          </h3>
          <div className="space-y-1">
            <a
              href={`${BASE_PATH}/${isNews ? 'news/featured/' : 'featured/'}`}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ds-on-surface-variant hover:text-ds-on-surface hover:bg-ds-surface-high transition-colors"
            >
              <HugeiconsIcon icon={StarIcon} className="w-4 h-4 text-ds-primary shrink-0" size={16} />
              {isNews ? 'Featured News' : 'Featured Posts'}
            </a>
            <a
              href={`${BASE_PATH}/${isNews ? 'news/latest/' : 'latest/'}`}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ds-on-surface-variant hover:text-ds-on-surface hover:bg-ds-surface-high transition-colors"
            >
              <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4 text-ds-secondary shrink-0" size={16} />
              {isNews ? 'Latest News' : 'Latest Posts'}
            </a>
          </div>
        </div>
      </MagicCard>

      {/* Categories */}
      {categories.length > 0 && (
        <MagicCard
          className="rounded-xl"
          gradientSize={120}
          gradientColor="var(--ds-magic-glow)"
          gradientFrom="var(--ds-magic-glow-from)"
          gradientTo="var(--ds-magic-glow-to)"
        >
          <div className="p-5 space-y-3 bg-transparent border-0">
            <h3 className="text-xs font-bold uppercase tracking-widest text-ds-text-muted mb-3">
              {isNews ? 'News Categories' : 'Top Categories'}
            </h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={isNews ? `${BASE_PATH}/news/?q=${cat.slug}` : `${BASE_PATH}/categories/${cat.slug}/`}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-ds-on-surface-variant hover:text-ds-on-surface hover:bg-ds-surface-high transition-colors"
                >
                  <span className="capitalize font-medium">{cat.title}</span>
                  {isNews && typeof cat.count === 'number' && (
                    <span className="text-xs text-ds-text-muted">({cat.count})</span>
                  )}
                </a>
              ))}
            </div>
            {!isNews && (
              <a
                href={`${BASE_PATH}/categories/`}
                className="block mt-3 pt-3 border-t border-ds-outline-variant text-xs text-ds-text-muted hover:text-ds-on-surface text-center transition-colors"
              >
                View all categories →
              </a>
            )}
          </div>
        </MagicCard>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <MagicCard
          className="rounded-xl"
          gradientSize={120}
          gradientColor="var(--ds-magic-glow)"
          gradientFrom="var(--ds-magic-glow-from)"
          gradientTo="var(--ds-magic-glow-to)"
        >
          <div className="p-5 bg-transparent border-0">
            <h3 className="text-xs font-bold uppercase tracking-widest text-ds-text-muted mb-3">
              {isNews ? 'News Tags' : 'Browse by Tag'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <a
                  key={tag.slug}
                  href={isNews ? `${BASE_PATH}/news/?q=${tag.slug}` : `${BASE_PATH}/tags/${tag.slug}/`}
                  className="text-xs px-2.5 py-1 rounded bg-ds-surface-high border border-ds-outline-variant hover:border-ds-outline-variant/80 text-ds-on-surface-variant hover:text-ds-on-surface transition-all"
                >
                  #{tag.title}
                </a>
              ))}
            </div>
          </div>
        </MagicCard>
      )}
    </div>
  );
}
