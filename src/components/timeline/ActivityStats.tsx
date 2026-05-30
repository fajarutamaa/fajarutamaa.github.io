'use client';

import { useMemo } from 'react';
import { ActivityItem } from '@/lib/github/types';
import { Activity, GitCommit, GitPullRequest, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

interface ActivityStatsProps {
  activities: ActivityItem[];
}

export function ActivityStats({ activities }: ActivityStatsProps) {
  const stats = useMemo(
    () => ({
      total: activities.length,
      commits: activities.filter((a) => a.type === 'commit').length,
      prs: activities.filter((a) => a.type === 'pr').length,
      blogs: activities.filter((a) => a.type === 'blog').length,
    }),
    [activities]
  );

  const statCards = [
    { label: 'Total', value: stats.total, icon: Activity },
    { label: 'Commits', value: stats.commits, icon: GitCommit },
    { label: 'PRs', value: stats.prs, icon: GitPullRequest },
    { label: 'Blog', value: stats.blogs, icon: FileText },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-3"
    >
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="p-4 rounded-xl border border-border/50 bg-card"
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
          </motion.div>
        );
      })}
    </motion.div>
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
  ];

  return (
    <div className="flex flex-wrap gap-1.5 mb-6">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors duration-200 ${
              isActive
                ? 'bg-foreground text-background border-foreground'
                : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
            }`}
          >
            {filter.label}
            {filter.count > 0 && (
              <span
                className={`ml-1.5 ${isActive ? 'text-background/70' : 'text-muted-foreground'}`}
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
