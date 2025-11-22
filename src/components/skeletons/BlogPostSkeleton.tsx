import React from 'react';
import { SkeletonCard, SkeletonText, SkeletonBadge } from './SkeletonBase';

/**
 * Skeleton loader for blog post cards
 */
export function BlogPostSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} delay={i * 100}>
          <div className="space-y-3">
            {/* Category & Date */}
            <div className="flex items-center gap-3">
              <SkeletonBadge width="w-20" />
              <SkeletonBadge width="w-24" />
              <SkeletonBadge width="w-16" />
            </div>

            {/* Title */}
            <div className="h-7 bg-muted animate-shimmer rounded w-3/4" />

            {/* Excerpt */}
            <SkeletonText lines={2} />

            {/* Read more link */}
            <div className="h-5 bg-muted animate-shimmer rounded w-24" />
          </div>
        </SkeletonCard>
      ))}
    </div>
  );
}
