import { ActivityItem } from '@/lib/github/types';
import { TimelineItem } from './TimelineItem';

interface TimelineGroupProps {
  title: string;
  activities: ActivityItem[];
  startIndex: number;
}

export function TimelineGroup({ title, activities, startIndex }: TimelineGroupProps) {
  if (activities.length === 0) return null;

  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        <div className="flex-1 h-px bg-border/50" />
        <span className="text-xs text-muted-foreground/60">
          {activities.length} {activities.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div>
        {activities.map((activity, index) => (
          <TimelineItem key={activity.id} activity={activity} index={startIndex + index} />
        ))}
      </div>
    </div>
  );
}
