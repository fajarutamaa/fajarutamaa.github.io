export function TimelineSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative pl-8 pb-6">
          <div className="absolute left-[11px] top-5 bottom-0 w-px bg-border" />
          <div className="absolute left-0 top-1 p-1.5 rounded-full bg-background border border-border">
            <div className="w-3 h-3 rounded-full bg-muted animate-shimmer" />
          </div>
          <div className="ml-4 p-4 rounded-lg border border-border/50 bg-card space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="h-3 bg-muted rounded animate-shimmer w-16" />
              <div className="h-3 bg-muted rounded animate-shimmer w-20" />
            </div>
            <div className="h-4 bg-muted rounded animate-shimmer w-3/4" />
            <div className="h-3 bg-muted rounded animate-shimmer w-full" />
            <div className="h-3 bg-muted rounded animate-shimmer w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
