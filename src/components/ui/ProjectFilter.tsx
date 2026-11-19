'use client';

import { useMemo } from 'react';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { BookmarkCard } from './BookmarkCard';
import { ContentSearch, FilterChips, FilterSummary } from './ContentFilters';
import type { Bookmark } from '@/lib/notion/types';

interface ProjectFilterProps {
  projects: Bookmark[];
}

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const { filters, updateFilters } = useUrlFilters();
  const query = filters.get('q') ?? '';

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

  const stackParam = filters.get('stack');
  const yearParam = filters.get('year');
  const active = stackParam && allStacks.includes(stackParam) ? stackParam : null;
  const year = yearParam && allYears.includes(yearParam) ? yearParam : null;

  const filtered = useMemo(() => {
    let result = projects;

    if (active) {
      result = result.filter((p) => p.stack?.includes(active));
    }

    if (year) {
      result = result.filter((p) => p.year === year);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.stack?.some((s) => s.toLowerCase().includes(q))
      );
    }

    return result;
  }, [active, year, query, projects]);

  const hasFilters = Boolean(stackParam || yearParam || query);

  return (
    <div className="space-y-4">
      <ContentSearch label="Search projects" value={query} onChange={(q) => updateFilters({ q })} />
      <FilterChips
        label="Tech stack"
        options={allStacks}
        selected={active}
        onChange={(stack) => updateFilters({ stack })}
      />
      <FilterChips
        label="Year"
        options={allYears}
        selected={year}
        onChange={(year) => updateFilters({ year })}
      />
      <FilterSummary
        label="projects"
        count={filtered.length}
        total={projects.length}
        onReset={hasFilters ? () => updateFilters({ q: null, stack: null, year: null }) : undefined}
      />

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((project, index) => (
            <BookmarkCard key={project.id} bookmark={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-3">
          <p className="text-sm text-muted-foreground">
            {projects.length ? 'No projects match your filters.' : 'No projects yet.'}
          </p>
        </div>
      )}
    </div>
  );
}
