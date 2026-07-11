'use client';
import { Skeleton } from '@/components/ui/skeleton';

function SearchResultRowSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 border border-ds-outline-variant rounded-xl">
      <Skeleton className="w-full sm:w-24 sm:h-24 h-36 rounded-xl shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

interface SearchSkeletonProps {
  count?: number;
}

export function SearchSkeleton({ count = 6 }: SearchSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <SearchResultRowSkeleton key={i} />
      ))}
    </div>
  );
}
