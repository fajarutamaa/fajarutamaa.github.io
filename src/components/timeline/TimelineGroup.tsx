import { ActivityItem } from '@/lib/github/types';
import { TimelineItem } from './TimelineItem';
import { Calendar, Sparkles } from 'lucide-react';

interface TimelineGroupProps {
  title: string;
  activities: ActivityItem[];
  startIndex: number;
}

export function TimelineGroup({ title, activities, startIndex }: TimelineGroupProps) {
  if (activities.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border/50">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Calendar className="w-4 h-4" />
        </div>
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">{title}</h3>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-sm font-semibold text-muted-foreground">
            {activities.length} {activities.length === 1 ? 'activity' : 'activities'}
          </span>
        </div>
      </div>
      <div>
        {activities.map((activity, index) => (
          <TimelineItem key={activity.id} activity={activity} index={startIndex + index} />
        ))}
      </div>
    </div>
  );
}
