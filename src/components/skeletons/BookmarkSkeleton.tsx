import React from 'react';
import { Skeleton, SkeletonText, SkeletonBadge } from './SkeletonBase';

/**
 * Skeleton loader for bookmark cards
 */
export function BookmarkSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-border bg-card animate-fadeIn hover-lift"
                    style={{ animationDelay: `${i * 100}ms` }}
                >
                    {/* Thumbnail skeleton */}
                    <Skeleton className="aspect-[16/9]" />

                    {/* Content skeleton */}
                    <div className="p-5 space-y-3">
                        {/* Title and year */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="h-5 bg-muted animate-shimmer rounded w-3/4" />
                            <SkeletonBadge width="w-12" />
                        </div>

                        {/* Description */}
                        <SkeletonText lines={2} />

                        {/* Tags */}
                        <div className="flex gap-2 pt-1">
                            <SkeletonBadge width="w-16" />
                            <SkeletonBadge width="w-20" />
                            <SkeletonBadge width="w-14" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
