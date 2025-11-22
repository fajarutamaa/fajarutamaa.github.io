'use client';

import { useState, useMemo } from 'react';
import { TimelineGroup } from './TimelineGroup';
import { ActivityStats, ActivityFilter } from './ActivityStats';
import { ActivityItem } from '@/lib/github/types';
import { isToday, isThisWeek } from 'date-fns';

interface ActivityTimelineClientProps {
  githubActivities: ActivityItem[];
  blogActivities: ActivityItem[];
}

export function ActivityTimelineClient({
  githubActivities,
  blogActivities,
}: ActivityTimelineClientProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  // Combine all activities
  const allActivities = useMemo(() => {
    return [...githubActivities, ...blogActivities].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [githubActivities, blogActivities]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    if (activeFilter === 'all') return allActivities;
    return allActivities.filter((activity) => activity.type === activeFilter);
  }, [allActivities, activeFilter]);

  // Group by time
  const groupedActivities = useMemo(() => {
    const today: ActivityItem[] = [];
    const thisWeek: ActivityItem[] = [];
    const older: ActivityItem[] = [];

    filteredActivities.forEach((activity) => {
      const activityDate = new Date(activity.date);
      if (isToday(activityDate)) {
        today.push(activity);
      } else if (isThisWeek(activityDate, { weekStartsOn: 1 })) {
        thisWeek.push(activity);
      } else {
        older.push(activity);
      }
    });

    return { today, thisWeek, older };
  }, [filteredActivities]);

  // Count by type
  const counts = useMemo(() => {
    return {
      all: allActivities.length,
      commit: allActivities.filter((a) => a.type === 'commit').length,
      pr: allActivities.filter((a) => a.type === 'pr').length,
      blog: allActivities.filter((a) => a.type === 'blog').length,
      issue: allActivities.filter((a) => a.type === 'issue').length,
      release: allActivities.filter((a) => a.type === 'release').length,
    };
  }, [allActivities]);

  if (allActivities.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-xl font-medium mb-2">No activity yet</p>
        <p className="text-muted-foreground">Start creating content or contributing to projects!</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Statistics */}
      <ActivityStats activities={allActivities} />

      {/* Filters */}
      <ActivityFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />

      {/* Timeline Groups */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-12 rounded-lg border border-border bg-card">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-lg font-medium mb-1">No {activeFilter} activities found</p>
          <p className="text-sm text-muted-foreground">Try selecting a different filter</p>
        </div>
      ) : (
        <>
          <TimelineGroup title="Today" activities={groupedActivities.today} startIndex={0} />
          <TimelineGroup
            title="This Week"
            activities={groupedActivities.thisWeek}
            startIndex={groupedActivities.today.length}
          />
          <TimelineGroup
            title="Older"
            activities={groupedActivities.older}
            startIndex={groupedActivities.today.length + groupedActivities.thisWeek.length}
          />
        </>
      )}
    </div>
  );
}
