'use client';
import { BASE_PATH } from '@/config/site';
import { MagicCard } from '@/components/ui/magic-card';

interface CategoryItem {
  slug: string;
  title: string;
  count?: number;
}

interface CategoryCloudProps {
  categories: CategoryItem[];
}

export function CategoryCloud({ categories }: CategoryCloudProps) {
  return (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-widest text-ds-text-muted mb-4">
        Popular Categories
      </h2>
      <div className="space-y-3">
        {categories.map((cat) => (
          <MagicCard
            key={cat.slug}
            className="rounded-xl overflow-hidden"
            gradientSize={120}
            gradientColor="var(--ds-magic-glow)"
            gradientFrom="var(--ds-magic-glow-from)"
            gradientTo="var(--ds-magic-glow-to)"
          >
            <a
              href={`${BASE_PATH}/categories/${cat.slug}/`}
              className="flex items-center justify-between p-3.5 hover:bg-ds-surface-high/30 transition-all border-0 bg-transparent"
            >
              <span className="font-bold text-sm text-ds-on-surface">
                {cat.title}
              </span>
              {cat.count !== undefined && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ds-surface-high text-ds-text-muted border border-ds-outline-variant">
                  {cat.count} post{cat.count !== 1 ? 's' : ''}
                </span>
              )}
            </a>
          </MagicCard>
        ))}
      </div>
    </section>
  );
}

