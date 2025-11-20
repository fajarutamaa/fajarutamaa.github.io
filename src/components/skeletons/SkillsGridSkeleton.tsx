import React from 'react';
import { SkeletonCard, SkeletonBadge } from './SkeletonBase';

/**
 * Skeleton loader for skills grid
 */
export function SkillsGridSkeleton() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} delay={i * 100}>
                    {/* Category title */}
                    <div className="h-6 bg-muted animate-shimmer rounded w-32 mb-4" />

                    {/* Skills list */}
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((j) => (
                            <div key={j} className="flex items-center justify-between">
                                <div className="h-4 bg-muted animate-shimmer rounded w-24" />
                                <SkeletonBadge width="w-20" />
                            </div>
                        ))}
                    </div>
                </SkeletonCard>
            ))}
        </div>
    );
}
