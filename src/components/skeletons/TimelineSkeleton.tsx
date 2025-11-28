import React from 'react';

/**
 * Skeleton loader for timeline items - matches new design
 */
export function TimelineSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative pl-10 pb-10">
          {/* Timeline line */}
          <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-border to-transparent" />

          {/* Icon circle skeleton */}
          <div className="absolute left-0 top-0 w-12 h-12 rounded-xl bg-muted/50 animate-shimmer border-2 border-border" />

          {/* Content card skeleton */}
          <div className="ml-2 p-5 rounded-xl border border-border bg-card/50 backdrop-blur-sm space-y-4">
            {/* Header with badge and timestamp */}
            <div className="flex items-start justify-between gap-4">
              <div className="h-6 w-24 bg-muted animate-shimmer rounded-lg" />
              <div className="h-4 w-20 bg-muted animate-shimmer rounded" />
            </div>

            {/* Title */}
            <div className="h-6 bg-muted animate-shimmer rounded w-3/4" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-muted animate-shimmer rounded w-full" />
              <div className="h-4 bg-muted animate-shimmer rounded w-5/6" />
            </div>

            {/* Footer */}
            <div className="flex justify-end">
              <div className="h-4 w-24 bg-muted animate-shimmer rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
