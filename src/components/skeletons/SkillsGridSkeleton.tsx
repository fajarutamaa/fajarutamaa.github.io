export function SkillsGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-5 rounded-xl border border-border/50 bg-card">
          <div className="h-4 bg-muted rounded animate-shimmer w-24 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="flex items-center justify-between">
                <div className="h-3 bg-muted rounded animate-shimmer w-20" />
                <div className="w-1.5 h-1.5 rounded-full bg-muted animate-shimmer" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
