'use client';

import { formatDistanceToNow } from 'date-fns';
import {
  GitCommit,
  GitPullRequest,
  GitMerge,
  FileText,
  Tag,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { ActivityItem } from '@/lib/github/types';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  activity: ActivityItem;
  index: number;
}

const iconMap = {
  commit: GitCommit,
  pr: GitPullRequest,
  issue: GitMerge,
  blog: FileText,
  release: Tag,
};

const colorConfig = {
  commit: {
    icon: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    ring: 'ring-emerald-500/30',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'group-hover:shadow-emerald-500/20',
    line: 'from-emerald-500/50',
  },
  pr: {
    icon: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    ring: 'ring-purple-500/30',
    gradient: 'from-purple-500 to-pink-500',
    glow: 'group-hover:shadow-purple-500/20',
    line: 'from-purple-500/50',
  },
  issue: {
    icon: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    ring: 'ring-blue-500/30',
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'group-hover:shadow-blue-500/20',
    line: 'from-blue-500/50',
  },
  blog: {
    icon: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    ring: 'ring-orange-500/30',
    gradient: 'from-orange-500 to-amber-500',
    glow: 'group-hover:shadow-orange-500/20',
    line: 'from-orange-500/50',
  },
  release: {
    icon: 'text-pink-500',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    ring: 'ring-pink-500/30',
    gradient: 'from-pink-500 to-rose-500',
    glow: 'group-hover:shadow-pink-500/20',
    line: 'from-pink-500/50',
  },
};

const typeLabels = {
  commit: 'Commit',
  pr: 'Pull Request',
  issue: 'Issue',
  blog: 'Blog Post',
  release: 'Release',
};

export function TimelineItem({ activity, index }: TimelineItemProps) {
  const Icon = iconMap[activity.type];
  const colors = colorConfig[activity.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative pl-8 pb-12 last:pb-0 group"
    >
      {/* Timeline line */}
      <div
        className={`absolute left-[11px] top-8 bottom-0 w-[2px] bg-gradient-to-b ${colors.line} to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Icon circle */}
      <div
        className={`absolute left-0 top-0 p-2.5 rounded-full ${colors.bg} ${colors.border} border ring-4 ring-background ${colors.ring} backdrop-blur-sm group-hover:scale-110 transition-all duration-300 shadow-lg z-10`}
      >
        <Icon className={`w-4 h-4 ${colors.icon}`} />
      </div>

      {/* Content card */}
      <a
        href={activity.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block ml-4 p-5 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${colors.glow} relative overflow-hidden group/card`}
      >
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover/card:opacity-5 transition-opacity duration-300`}
        />

        <div className="relative">
          {/* Header with type badge and timestamp */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.icon} border ${colors.border}`}
              >
                {typeLabels[activity.type]}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 group-hover/card:text-foreground transition-colors">
              <Clock className="w-3 h-3" />
              <time>{formatDistanceToNow(new Date(activity.date), { addSuffix: true })}</time>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover/card:text-primary transition-colors leading-relaxed text-base">
            {activity.title}
          </h3>

          {/* Description */}
          {activity.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {activity.description}
            </p>
          )}

          {/* Footer with external link indicator */}
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover/card:text-primary transition-colors">
              <span>View details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover/card:translate-x-full transition-transform duration-1000" />
        </div>
      </a>
    </motion.div>
  );
}
