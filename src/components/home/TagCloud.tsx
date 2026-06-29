import { BASE_PATH } from '@/config/site';
import { cn } from '@/lib/utils';

interface TagItem {
  slug: string;
  title: string;
  count?: number;
}

interface TagCloudProps {
  tags: TagItem[];
  title?: string;
}

export function TagCloud({ tags, title = 'Popular Tags' }: TagCloudProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-ds-on-surface mb-4">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <a
            key={tag.slug}
            href={`${BASE_PATH}/tags/${tag.slug}/`}
            className={cn(
              'tag-ds',
              'px-3 py-1.5 text-xs',
              'hover:scale-[1.05] transition-transform duration-150 ease-out',
              'focus:outline-none focus:ring-2 focus:ring-ds-primary/50 focus:ring-offset-1 focus:ring-offset-ds-surface-lowest',
            )}
          >
            #{tag.title}
          </a>
        ))}
      </div>
    </section>
  );
}
