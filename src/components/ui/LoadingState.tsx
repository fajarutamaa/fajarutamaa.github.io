export function LoadingState() {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-2xl overflow-hidden glass-card">
          <div className="aspect-[16/9] bg-muted/50 animate-shimmer" />
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="h-3.5 bg-muted/50 rounded animate-shimmer w-3/4" />
              <div className="h-2.5 bg-muted/50 rounded animate-shimmer w-8" />
            </div>
            <div className="space-y-1.5">
              <div className="h-2.5 bg-muted/50 rounded animate-shimmer w-full" />
              <div className="h-2.5 bg-muted/50 rounded animate-shimmer w-5/6" />
            </div>
            <div className="flex gap-1 pt-1">
              <div className="h-4 bg-muted/50 rounded-full animate-shimmer w-12" />
              <div className="h-4 bg-muted/50 rounded-full animate-shimmer w-14" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
