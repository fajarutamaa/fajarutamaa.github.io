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
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-primary">{title}</span>
        <span className="text-sm font-normal text-muted-foreground">
          ({activities.length} {activities.length === 1 ? 'activity' : 'activities'})
        </span>
      </h3>
      <div>
        {activities.map((activity, index) => (
          <TimelineItem key={activity.id} activity={activity} index={startIndex + index} />
        ))}
      </div>
    </div>
  );
}
