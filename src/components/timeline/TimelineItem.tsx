import { formatDistanceToNow } from 'date-fns';
import {
  GitCommit,
  GitPullRequest,
  GitMerge,
  FileText,
  Tag,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { ActivityItem } from '@/lib/github/types';

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
  },
  pr: {
    icon: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    ring: 'ring-purple-500/30',
    gradient: 'from-purple-500 to-pink-500',
    glow: 'group-hover:shadow-purple-500/20',
  },
  issue: {
    icon: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    ring: 'ring-blue-500/30',
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'group-hover:shadow-blue-500/20',
  },
  blog: {
    icon: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    ring: 'ring-orange-500/30',
    gradient: 'from-orange-500 to-amber-500',
    glow: 'group-hover:shadow-orange-500/20',
  },
  release: {
    icon: 'text-pink-500',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    ring: 'ring-pink-500/30',
    gradient: 'from-pink-500 to-rose-500',
    glow: 'group-hover:shadow-pink-500/20',
  },
};

const typeLabels = {
  commit: 'Commit',
  pr: 'Pull Request',
  issue: 'Issue',
  blog: 'Blog Post',
  release: 'Release',
};

export function TimelineItem({ activity }: TimelineItemProps) {
  const Icon = iconMap[activity.type];
  const colors = colorConfig[activity.type];

  return (
    <div className="relative pl-10 pb-10 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-border to-transparent" />

      {/* Icon circle */}
      <div
        className={`absolute left-0 top-0 p-3 rounded-xl ${colors.bg} ${colors.border} border-2 ring-4 ring-background ${colors.ring} backdrop-blur-sm group-hover:scale-110 transition-all duration-300 shadow-lg`}
      >
        <Icon className={`w-4 h-4 ${colors.icon}`} />
      </div>

      {/* Content card */}
      <a
        href={activity.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block ml-2 p-5 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${colors.glow} relative overflow-hidden`}
      >
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />

        <div className="relative">
          {/* Header with type badge and timestamp */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${colors.bg} ${colors.icon} border ${colors.border}`}
              >
                <Icon className="w-3 h-3" />
                {typeLabels[activity.type]}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 group-hover:text-foreground transition-colors">
              <Clock className="w-3 h-3" />
              <time>{formatDistanceToNow(new Date(activity.date), { addSuffix: true })}</time>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-relaxed">
            {activity.title}
          </h3>

          {/* Description */}
          {activity.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
              {activity.description}
            </p>
          )}

          {/* Footer with external link indicator */}
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors">
              <span className="font-medium">View details</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </a>
    </div>
  );
}
