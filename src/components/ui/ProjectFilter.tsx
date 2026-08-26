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
    <div className="space-y-4">
      {allStacks.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setActive(null)}
            className={`text-[11px] px-2.5 py-1 rounded-full transition-all duration-200 ${
              !active
                ? 'bg-primary text-primary-foreground'
                : 'glass-subtle text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          {allStacks.map((stack) => (
            <button
              key={stack}
              type="button"
              onClick={() => setActive(stack)}
              className={`text-[11px] px-2.5 py-1 rounded-full transition-all duration-200 ${
                active === stack
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-subtle text-muted-foreground hover:text-foreground'
              }`}
            >
              {stack}
            </button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((project) => (
          <BookmarkCard key={project.id} bookmark={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-muted-foreground/60">No projects match this filter.</p>
        </div>
      )}
    </div>
  );
}
