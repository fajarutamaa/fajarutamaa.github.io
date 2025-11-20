import React from 'react';

export function LoadingState() {
    return (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-border bg-card animate-fadeIn"
                    style={{
                        animationDelay: `${i * 100}ms`,
                        animationFillMode: 'both',
                    }}
                >
                    {/* Thumbnail skeleton */}
                    <div className="aspect-[16/9] bg-muted animate-shimmer" />

                    {/* Content skeleton */}
                    <div className="p-5 space-y-3">
                        {/* Title and year */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="h-5 bg-muted rounded animate-shimmer w-3/4" />
                            <div className="h-6 bg-muted rounded animate-shimmer w-12" />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded animate-shimmer w-full" />
                            <div className="h-4 bg-muted rounded animate-shimmer w-5/6" />
                        </div>

                        {/* Tags */}
                        <div className="flex gap-2 pt-1">
                            <div className="h-6 bg-muted rounded animate-shimmer w-16" />
                            <div className="h-6 bg-muted rounded animate-shimmer w-20" />
                            <div className="h-6 bg-muted rounded animate-shimmer w-14" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LoadingState;
