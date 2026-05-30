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

const colorMap: Record<string, string> = {
  commit: 'text-emerald-600 dark:text-emerald-400',
  pr: 'text-purple-600 dark:text-purple-400',
  issue: 'text-blue-600 dark:text-blue-400',
  blog: 'text-orange-600 dark:text-orange-400',
  release: 'text-pink-600 dark:text-pink-400',
};

const typeLabels: Record<string, string> = {
  commit: 'Commit',
  pr: 'Pull Request',
  issue: 'Issue',
  blog: 'Blog Post',
  release: 'Release',
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.4, ease: [0.45, 0, 0.1, 1] as const },
  }),
};

export function TimelineItem({ activity, index }: TimelineItemProps) {
  const Icon = iconMap[activity.type];
  const color = colorMap[activity.type];

  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="relative pl-8 pb-8 last:pb-0"
    >
      <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />

      <div className="absolute left-0 top-1 p-1.5 rounded-full bg-background border border-border">
        <Icon size={12} className={color} />
      </div>

      <a
        href={activity.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block ml-4 p-4 rounded-lg border border-border/50 bg-card hover:border-border transition-all duration-300"
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className={`text-[10px] font-medium uppercase tracking-wider ${color}`}>
            {typeLabels[activity.type]}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
            <Clock size={10} />
            <time>{formatDistanceToNow(new Date(activity.date), { addSuffix: true })}</time>
          </span>
        </div>

        <h3 className="text-sm font-medium text-foreground mb-1 line-clamp-2 leading-snug">
          {activity.title}
        </h3>

        {activity.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
            {activity.description}
          </p>
        )}

        <div className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
          <span>View details</span>
          <ArrowRight size={10} />
        </div>
      </a>
    </motion.div>
  );
}
