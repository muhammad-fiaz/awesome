'use client';
import { BulbIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { PostCardData } from './PostCard';
import { PostCard } from './PostCard';

interface RecommendationsProps {
  posts: PostCardData[];
}

export function Recommendations({ posts }: RecommendationsProps) {
  if (!posts.length) return null;

  return (
    <section className="mt-8 pt-8 border-t border-ds-outline-variant">
      <h2 className="text-xl font-semibold text-ds-on-surface mb-6 flex items-center gap-2">
        <HugeiconsIcon
          icon={BulbIcon}
          size={22}
          strokeWidth={1.5}
          className="text-ds-tertiary"
        />
        Recommended for You
      </h2>
      <p className="text-sm text-ds-on-surface-variant mb-4">
        Fresh picks from other topics you might find interesting.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} view="grid" />
        ))}
      </div>
    </section>
  );
}
