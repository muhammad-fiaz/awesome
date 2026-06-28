'use client';
import {
  AnalyticsUpIcon,
  Clock01Icon,
  StarIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { PostCard, type PostCardData } from '@/components/post/PostCard';

type IconName = 'trending_up' | 'schedule' | 'star';

const ICON_MAP: Record<IconName, typeof AnalyticsUpIcon> = {
  trending_up: AnalyticsUpIcon,
  schedule: Clock01Icon,
  star: StarIcon,
};

interface TrendingFeedProps {
  posts: PostCardData[];
  title?: string;
  icon?: string;
  viewAllHref?: string;
}

export function TrendingFeed({
  posts,
  title = 'Trending Today',
  icon = 'trending_up',
  viewAllHref,
}: TrendingFeedProps) {
  if (!posts.length) return null;

  const IconComp = ICON_MAP[icon as IconName] ?? AnalyticsUpIcon;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-ds-on-surface flex items-center gap-2">
          <HugeiconsIcon
            icon={IconComp}
            size={22}
            strokeWidth={1.5}
            className="text-ds-secondary"
          />
          {title}
        </h2>
        {viewAllHref && (
          <a
            href={viewAllHref}
            className="text-xs font-bold uppercase tracking-wide text-ds-primary hover:underline"
          >
            View All →
          </a>
        )}
      </div>

      <div className="space-y-3">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} view="list" />
        ))}
      </div>
    </section>
  );
}
