import React from 'react';
import { SkeletonText, SkeletonBadge } from './SkeletonBase';

/**
 * Skeleton loader for timeline items
 */
export function TimelineSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative pl-8 pb-8 border-l-2 border-border last:pb-0 animate-fadeIn"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Icon */}
          <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-muted border-4 border-background animate-shimmer" />

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                {/* Title */}
                <div className="h-6 bg-muted animate-shimmer rounded w-48" />
                {/* Organization */}
                <div className="h-4 bg-muted animate-shimmer rounded w-64" />
              </div>
              {/* Period badge */}
              <SkeletonBadge width="w-24" />
            </div>
            {/* Description */}
            <SkeletonText lines={2} />
          </div>
        </div>
      ))}
    </div>
  );
}
