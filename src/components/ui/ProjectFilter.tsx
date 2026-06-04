'use client';

import { useState, useMemo } from 'react';
import { BookmarkCard } from './BookmarkCard';
import type { Bookmark } from '@/lib/notion/types';

interface ProjectFilterProps {
  projects: Bookmark[];
}

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [active, setActive] = useState<string | null>(null);

  const allStacks = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.stack?.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    if (!active) return projects;
    return projects.filter((p) => p.stack?.includes(active));
  }, [active, projects]);

  return (
    <div className="space-y-5">
      {allStacks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive(null)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              !active
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border/50 hover:border-border'
            }`}
          >
            All
          </button>
          {allStacks.map((stack) => (
            <button
              key={stack}
              type="button"
              onClick={() => setActive(stack)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                active === stack
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border/50 hover:border-border'
              }`}
            >
              {stack}
            </button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((project) => (
          <BookmarkCard key={project.id} bookmark={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No projects match this filter.</p>
        </div>
      )}
    </div>
  );
}
