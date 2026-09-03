'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { BookmarkCard } from './BookmarkCard';
import type { Bookmark } from '@/lib/notion/types';

interface ProjectFilterProps {
  projects: Bookmark[];
}

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [year, setYear] = useState<string | null>(null);

  const allStacks = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.stack?.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [projects]);

  const allYears = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.year && set.add(p.year));
    return Array.from(set).sort().reverse();
  }, [projects]);

  const filtered = useMemo(() => {
    let result = projects;

    if (active) {
      result = result.filter((p) => p.stack?.includes(active));
    }

    if (year) {
      result = result.filter((p) => p.year === year);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.stack?.some((s) => s.toLowerCase().includes(q))
      );
    }

    return result;
  }, [active, year, query, projects]);

  const hasFilters = active || year || query;

  const clearFilters = () => {
    setActive(null);
    setYear(null);
    setQuery('');
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl glass-subtle text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/20 transition-all duration-200"
        />
      </div>

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
              onClick={() => setActive(active === stack ? null : stack)}
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

      {allYears.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-muted-foreground/60">Year:</span>
          <button
            type="button"
            onClick={() => setYear(null)}
            className={`text-[11px] px-2.5 py-1 rounded-full transition-all duration-200 ${
              !year
                ? 'bg-primary text-primary-foreground'
                : 'glass-subtle text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          {allYears.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(year === y ? null : y)}
              className={`text-[11px] px-2.5 py-1 rounded-full transition-all duration-200 ${
                year === y
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-subtle text-muted-foreground hover:text-foreground'
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-3">
          {filtered.map((project) => (
            <BookmarkCard key={project.id} bookmark={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-3">
          <p className="text-sm text-muted-foreground/60">No projects match your filters.</p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-[13px] text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
