'use client';
import { cn } from '@/lib/utils';

interface PostCardSkeletonProps {
  count?: number;
  compact?: boolean;
}

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded bg-ds-surface-high', className)}
    />
  );
}

function SingleSkeleton({ compact }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        'card-ds overflow-hidden',
        compact ? 'p-4' : 'flex gap-4 p-5',
      )}
    >
      {!compact && <SkeletonLine className="shrink-0 w-28 h-20 rounded-lg" />}
      <div className="flex-1 space-y-2">
        <SkeletonLine className="h-3 w-24" />
        <SkeletonLine className="h-4 w-4/5" />
        {!compact && <SkeletonLine className="h-3 w-full" />}
        <SkeletonLine className="h-3 w-2/3" />
        <div className="flex gap-2 pt-1">
          <SkeletonLine className="h-4 w-16 rounded-full" />
          <SkeletonLine className="h-4 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function PostCardSkeleton({
  count = 3,
  compact = false,
}: PostCardSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_el, idx) => (
        <SingleSkeleton key={`skel-${String(idx)}`} compact={compact} />
      ))}
    </div>
  );
}
