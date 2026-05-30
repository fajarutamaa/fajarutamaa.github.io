export function BlogPostSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-5 rounded-xl border border-border/50 bg-card">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="h-5 bg-muted rounded-full animate-shimmer w-16" />
              <div className="h-3 bg-muted rounded animate-shimmer w-20" />
              <div className="h-3 bg-muted rounded animate-shimmer w-12" />
            </div>
            <div className="h-5 bg-muted rounded animate-shimmer w-3/4" />
            <div className="h-3 bg-muted rounded animate-shimmer w-full" />
            <div className="h-3 bg-muted rounded animate-shimmer w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
