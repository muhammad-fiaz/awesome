'use client';
import { motion } from 'framer-motion';
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
        {categories.map((cat, i) => (
          <motion.a
            key={cat.slug}
            href={`${BASE_PATH}/categories/${cat.slug}/`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
            whileHover={{ scale: 1.04 }}
            className={cn(
              'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium',
              'bg-ds-surface-high border border-ds-outline-variant',
              'text-ds-on-surface-variant hover:text-ds-on-surface',
              'hover:border-ds-primary transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-ds-primary/50 focus:ring-offset-1 focus:ring-offset-ds-surface-lowest',
            )}
          >
            {cat.title}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
