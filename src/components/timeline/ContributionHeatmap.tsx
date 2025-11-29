'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ActivityItem } from '@/lib/github/types';
import { subDays, format, isSameDay, eachDayOfInterval, startOfDay, endOfDay } from 'date-fns';
import { Tooltip } from '@nextui-org/tooltip';

interface ContributionHeatmapProps {
  activities: ActivityItem[];
  days?: number;
}

export function ContributionHeatmap({ activities, days = 60 }: ContributionHeatmapProps) {
  // Generate array of dates for the last n days
  const dates = useMemo(() => {
    const end = endOfDay(new Date());
    const start = startOfDay(subDays(end, days - 1));
    return eachDayOfInterval({ start, end });
  }, [days]);

  // Calculate intensity for each day
  const heatmapData = useMemo(() => {
    return dates.map((date) => {
      const dayActivities = activities.filter((activity) =>
        isSameDay(new Date(activity.date), date)
      );

      const count = dayActivities.length;

      // Determine intensity level (0-4)
      let level = 0;
      if (count > 0) level = 1;
      if (count > 2) level = 2;
      if (count > 5) level = 3;
      if (count > 8) level = 4;

      return {
        date,
        count,
        level,
      };
    });
  }, [dates, activities]);

  // Group by weeks for grid layout
  const weeks = useMemo(() => {
    const weeksArray: (typeof heatmapData)[] = [];
    let currentWeek: typeof heatmapData = [];

    heatmapData.forEach((day, index) => {
      if (index % 7 === 0 && currentWeek.length > 0) {
        weeksArray.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    });
    if (currentWeek.length > 0) {
      weeksArray.push(currentWeek);
    }
    return weeksArray;
  }, [heatmapData]);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-muted/30 border-transparent';
      case 1:
        return 'bg-emerald-500/20 border-emerald-500/30';
      case 2:
        return 'bg-emerald-500/40 border-emerald-500/50';
      case 3:
        return 'bg-emerald-500/60 border-emerald-500/70';
      case 4:
        return 'bg-emerald-500/80 border-emerald-500/90';
      default:
        return 'bg-muted/30 border-transparent';
    }
  };

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="min-w-max">
        <div className="flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <Tooltip
                  key={day.date.toISOString()}
                  content={
                    <div className="px-2 py-1">
                      <div className="text-xs font-semibold">{format(day.date, 'MMM d, yyyy')}</div>
                      <div className="text-xs text-muted-foreground">
                        {day.count} {day.count === 1 ? 'activity' : 'activities'}
                      </div>
                    </div>
                  }
                  delay={0}
                  closeDelay={0}
                  className="bg-popover text-popover-foreground border border-border shadow-xl rounded-lg"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (weekIndex * 7 + dayIndex) * 0.005,
                      duration: 0.2,
                    }}
                    className={`w-3 h-3 rounded-sm border ${getLevelColor(
                      day.level
                    )} transition-colors duration-300 hover:ring-2 hover:ring-ring hover:ring-offset-1 hover:ring-offset-background cursor-help`}
                  />
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-end gap-2 text-[10px] text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-2.5 h-2.5 rounded-sm border ${getLevelColor(level)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
