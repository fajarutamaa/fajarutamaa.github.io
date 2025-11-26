'use client';

import { ActivityItem } from '@/lib/github/types';
import { Activity, GitCommit, GitPullRequest, FileText, Flame } from 'lucide-react';

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
    {
      label: 'Total Activities',
      value: stats.total,
      icon: Activity,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
      iconColor: 'text-blue-500',
      ringColor: 'ring-blue-500/20',
    },
    {
      label: 'Commits',
      value: stats.commits,
      icon: GitCommit,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10',
      iconColor: 'text-emerald-500',
      ringColor: 'ring-emerald-500/20',
    },
    {
      label: 'Pull Requests',
      value: stats.prs,
      icon: GitPullRequest,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
      iconColor: 'text-purple-500',
      ringColor: 'ring-purple-500/20',
    },
    {
      label: 'Blog Posts',
      value: stats.blogs,
      icon: FileText,
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'bg-gradient-to-br from-orange-500/10 to-amber-500/10',
      iconColor: 'text-orange-500',
      ringColor: 'ring-orange-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 animate-fadeIn"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            {/* Background gradient overlay */}
            <div
              className={`absolute inset-0 ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Content */}
            <div className="relative p-5">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`p-2.5 rounded-lg ${stat.bgGradient} ring-1 ${stat.ringColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                {stat.value > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <Flame className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block`}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </div>
        );
      })}
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
    { id: 'all', label: 'All', count: counts.all, icon: Activity },
    { id: 'commit', label: 'Commits', count: counts.commit, icon: GitCommit },
    { id: 'pr', label: 'PRs', count: counts.pr, icon: GitPullRequest },
    { id: 'blog', label: 'Blog', count: counts.blog, icon: FileText },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.id;

        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-md hover:shadow-lg'
                : 'bg-card border border-border hover:border-primary/50 text-foreground hover:bg-muted'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{filter.label}</span>
            {filter.count > 0 && (
              <span
                className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isActive
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {filter.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
