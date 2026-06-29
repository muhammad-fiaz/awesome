'use client';
import { BASE_PATH } from '@/config/site';
import { cn } from '@/lib/utils';

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
      <h2 className="text-xl font-semibold text-ds-on-surface mb-4">
        Popular Categories
      </h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <a
            key={cat.slug}
            href={`${BASE_PATH}/categories/${cat.slug}/`}
            className={cn(
              'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium',
              'bg-ds-surface-high border border-ds-outline-variant',
              'text-ds-on-surface-variant hover:text-ds-on-surface',
              'hover:border-ds-primary hover:scale-[1.04] transition-all duration-150 ease-out',
              'focus:outline-none focus:ring-2 focus:ring-ds-primary/50 focus:ring-offset-1 focus:ring-offset-ds-surface-lowest',
            )}
          >
            {cat.title}
          </a>
        ))}
      </div>
    </section>
  );
}

