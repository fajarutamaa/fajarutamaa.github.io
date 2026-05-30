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

const cellVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.2 },
  }),
};

export function ContributionHeatmap({ activities, days = 60 }: ContributionHeatmapProps) {
  const dates = useMemo(() => {
    const end = endOfDay(new Date());
    const start = startOfDay(subDays(end, days - 1));
    return eachDayOfInterval({ start, end });
  }, [days]);

  const heatmapData = useMemo(() => {
    return dates.map((date) => {
      const dayActivities = activities.filter((activity) =>
        isSameDay(new Date(activity.date), date)
      );
      const count = dayActivities.length;
      let level = 0;
      if (count > 0) level = 1;
      if (count > 2) level = 2;
      if (count > 5) level = 3;
      if (count > 8) level = 4;
      return { date, count, level };
    });
  }, [dates, activities]);

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
    if (currentWeek.length > 0) weeksArray.push(currentWeek);
    return weeksArray;
  }, [heatmapData]);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-muted/30';
      case 1:
        return 'bg-emerald-500/20';
      case 2:
        return 'bg-emerald-500/40';
      case 3:
        return 'bg-emerald-500/60';
      case 4:
        return 'bg-emerald-500/80';
      default:
        return 'bg-muted/30';
    }
  };

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="min-w-max">
        <div className="flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <Tooltip
                  key={day.date.toISOString()}
                  content={
                    <div className="px-2 py-1">
                      <div className="text-xs font-medium">{format(day.date, 'MMM d, yyyy')}</div>
                      <div className="text-xs text-muted-foreground">
                        {day.count} {day.count === 1 ? 'activity' : 'activities'}
                      </div>
                    </div>
                  }
                  delay={0}
                  closeDelay={0}
                  className="bg-popover text-popover-foreground border border-border shadow-sm rounded-md"
                >
                  <motion.div
                    custom={(weekIndex * 7 + dayIndex) * 0.004}
                    variants={cellVariants}
                    initial="hidden"
                    animate="visible"
                    className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} transition-colors duration-300 cursor-help`}
                  />
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`w-2.5 h-2.5 rounded-sm ${getLevelColor(level)}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
