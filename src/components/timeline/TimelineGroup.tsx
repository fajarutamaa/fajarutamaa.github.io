import { ActivityItem } from '@/lib/github/types';
import { TimelineItem } from './TimelineItem';
import { Calendar } from 'lucide-react';

interface TimelineGroupProps {
  title: string;
  activities: ActivityItem[];
  startIndex: number;
}

export function TimelineGroup({ title, activities, startIndex }: TimelineGroupProps) {
  if (activities.length === 0) return null;

  return (
    <div className="mb-12 last:mb-0">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
          <Calendar className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{title}</h3>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-xs font-medium text-muted-foreground">
            {activities.length} {activities.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="space-y-2">
        {activities.map((activity, index) => (
          <TimelineItem key={activity.id} activity={activity} index={startIndex + index} />
        ))}
      </div>
    </div>
  );
}
