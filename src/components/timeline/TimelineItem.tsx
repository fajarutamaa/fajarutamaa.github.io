import { formatDistanceToNow } from 'date-fns';
import { GitCommit, GitPullRequest, GitMerge, FileText, Tag } from 'lucide-react';
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

const colorMap = {
  commit: 'text-blue-500 bg-blue-500/10',
  pr: 'text-purple-500 bg-purple-500/10',
  issue: 'text-green-500 bg-green-500/10',
  blog: 'text-orange-500 bg-orange-500/10',
  release: 'text-pink-500 bg-pink-500/10',
};

export function TimelineItem({ activity, index }: TimelineItemProps) {
  const Icon = iconMap[activity.type];
  const colorClass = colorMap[activity.type];

  return (
    <div
      className="relative pl-8 pb-8 animate-fadeIn hover-lift"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Timeline line */}
      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />

      {/* Icon */}
      <div
        className={`absolute left-0 top-0 p-2 rounded-full ${colorClass} border-4 border-background`}
      >
        <Icon size={14} />
      </div>

      {/* Content */}
      <a
        href={activity.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground line-clamp-2 mb-1">{activity.title}</h3>
            {activity.description && (
              <p className="text-sm text-muted-foreground line-clamp-1">{activity.description}</p>
            )}
          </div>
          <time className="text-xs text-muted-foreground shrink-0">
            {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
          </time>
        </div>
      </a>
    </div>
  );
}
