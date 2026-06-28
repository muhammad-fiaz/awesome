'use client';
import { StarIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { PostCardData } from './PostCard';
import { PostCard } from './PostCard';

interface RelatedPostsProps {
  posts: PostCardData[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section className="mt-12 pt-8 border-t border-ds-outline-variant">
      <h2 className="text-xl font-semibold text-ds-on-surface mb-6 flex items-center gap-2">
        <HugeiconsIcon
          icon={StarIcon}
          size={22}
          strokeWidth={1.5}
          className="text-ds-secondary"
        />
        Related Posts
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} view="grid" />
        ))}
      </div>
    </section>
  );
}
