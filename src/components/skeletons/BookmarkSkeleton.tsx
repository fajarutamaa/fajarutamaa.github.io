export function BookmarkSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden border border-border/50 bg-card">
          <div className="aspect-[16/9] bg-muted animate-shimmer" />
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 bg-muted rounded animate-shimmer w-3/4" />
              <div className="h-3 bg-muted rounded animate-shimmer w-8" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 bg-muted rounded animate-shimmer w-full" />
              <div className="h-3 bg-muted rounded animate-shimmer w-5/6" />
            </div>
            <div className="flex gap-1.5 pt-1">
              <div className="h-5 bg-muted rounded-full animate-shimmer w-14" />
              <div className="h-5 bg-muted rounded-full animate-shimmer w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
