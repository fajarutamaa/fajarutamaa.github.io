export function BookmarkSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border bg-card">
          <div className="aspect-[2/1] animate-shimmer bg-muted" />
          <div className="space-y-3 p-4 sm:p-5">
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
