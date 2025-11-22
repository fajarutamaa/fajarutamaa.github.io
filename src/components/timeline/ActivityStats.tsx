'use client';

import { ActivityItem } from '@/lib/github/types';

interface ActivityStatsProps {
  activities: ActivityItem[];
}

export function ActivityStats({ activities }: ActivityStatsProps) {
  const stats = {
    total: activities.length,
    commits: activities.filter((a) => a.type === 'commit').length,
    prs: activities.filter((a) => a.type === 'pr').length,
    issues: activities.filter((a) => a.type === 'issue').length,
    blogs: activities.filter((a) => a.type === 'blog').length,
    releases: activities.filter((a) => a.type === 'release').length,
  };

  const statCards = [
    { label: 'Total', value: stats.total, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Commits', value: stats.commits, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Pull Requests', value: stats.prs, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Blog Posts', value: stats.blogs, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={stat.label}
          className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300 animate-fadeIn"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="text-2xl font-bold mb-1">
            <span className={stat.color}>{stat.value}</span>
          </div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

interface ActivityFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>;
}

export function ActivityFilter({ activeFilter, onFilterChange, counts }: ActivityFilterProps) {
  const filters = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'commit', label: 'Commits', count: counts.commit },
    { id: 'pr', label: 'PRs', count: counts.pr },
    { id: 'blog', label: 'Blog', count: counts.blog },
    { id: 'issue', label: 'Issues', count: counts.issue },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeFilter === filter.id
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-card border border-border hover:border-primary/50 text-foreground'
          }`}
        >
          {filter.label}
          {filter.count > 0 && (
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeFilter === filter.id
                  ? 'bg-primary-foreground/20'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {filter.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
