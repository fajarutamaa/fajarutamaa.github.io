'use client';

import { useMemo } from 'react';
import { ActivityItem } from '@/lib/github/types';
import { Activity, GitCommit, GitPullRequest, FileText, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { isThisMonth, isSameMonth, subMonths } from 'date-fns';

interface ActivityStatsProps {
  activities: ActivityItem[];
}

export function ActivityStats({ activities }: ActivityStatsProps) {
  const stats = useMemo(() => {
    const now = new Date();
    const lastMonth = subMonths(now, 1);

    const getTrend = (type?: string) => {
      const currentMonthCount = activities.filter(
        (a) => (type ? a.type === type : true) && isThisMonth(new Date(a.date))
      ).length;

      const lastMonthCount = activities.filter(
        (a) => (type ? a.type === type : true) && isSameMonth(new Date(a.date), lastMonth)
      ).length;

      if (lastMonthCount === 0) return currentMonthCount > 0 ? 'New activity' : 'No change';

      const percentChange = Math.round(
        ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100
      );
      return `${percentChange > 0 ? '+' : ''}${percentChange}% vs last mo`;
    };

    return {
      total: activities.length,
      commits: activities.filter((a) => a.type === 'commit').length,
      prs: activities.filter((a) => a.type === 'pr').length,
      issues: activities.filter((a) => a.type === 'issue').length,
      blogs: activities.filter((a) => a.type === 'blog').length,
      releases: activities.filter((a) => a.type === 'release').length,
      trends: {
        total: getTrend(),
        commits: getTrend('commit'),
        prs: getTrend('pr'),
        blogs: getTrend('blog'),
      },
    };
  }, [activities]);

  const statCards = [
    {
      label: 'Total Activities',
      value: stats.total,
      icon: Activity,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
      iconColor: 'text-blue-500',
      ringColor: 'ring-blue-500/20',
      trend: stats.trends.total,
    },
    {
      label: 'Commits',
      value: stats.commits,
      icon: GitCommit,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10',
      iconColor: 'text-emerald-500',
      ringColor: 'ring-emerald-500/20',
      trend: stats.trends.commits,
    },
    {
      label: 'Pull Requests',
      value: stats.prs,
      icon: GitPullRequest,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
      iconColor: 'text-purple-500',
      ringColor: 'ring-purple-500/20',
      trend: stats.trends.prs,
    },
    {
      label: 'Blog Posts',
      value: stats.blogs,
      icon: FileText,
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'bg-gradient-to-br from-orange-500/10 to-amber-500/10',
      iconColor: 'text-orange-500',
      ringColor: 'ring-orange-500/20',
      trend: stats.trends.blogs,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={item}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
          >
            {/* Background gradient overlay */}
            <div
              className={`absolute inset-0 ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Content */}
            <div className="relative p-5">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-2.5 rounded-xl ${stat.bgGradient} ring-1 ${stat.ringColor} group-hover:scale-110 transition-transform duration-500`}
                >
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full bg-background/50 border border-border/50 text-muted-foreground">
                  <span>{stat.trend}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              <div className="space-y-1">
                <div
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 origin-left`}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
            </div>
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
    { id: 'all', label: 'All', count: counts.all, icon: Activity },
    { id: 'commit', label: 'Commits', count: counts.commit, icon: GitCommit },
    { id: 'pr', label: 'PRs', count: counts.pr, icon: GitPullRequest },
    { id: 'blog', label: 'Blog', count: counts.blog, icon: FileText },
  ];

  return (
    <div className="flex justify-center mb-10">
      <div className="inline-flex p-1.5 rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm relative">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 z-10 ${
                isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/25"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
                {filter.count > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                      isActive
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {filter.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
