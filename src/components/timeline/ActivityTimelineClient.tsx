'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TimelineGroup } from './TimelineGroup';
import { ActivityStats, ActivityFilter } from './ActivityStats';
import { ContributionHeatmap } from './ContributionHeatmap';
import { ActivityItem } from '@/lib/github/types';
import { isToday, isThisWeek } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface ActivityTimelineClientProps {
  githubActivities: ActivityItem[];
  blogActivities: ActivityItem[];
}

export function ActivityTimelineClient({
  githubActivities,
  blogActivities,
}: ActivityTimelineClientProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const allActivities = useMemo(() => {
    return [...githubActivities, ...blogActivities].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [githubActivities, blogActivities]);

  const filteredActivities = useMemo(() => {
    if (activeFilter === 'all') return allActivities;
    return allActivities.filter((activity) => activity.type === activeFilter);
  }, [allActivities, activeFilter]);

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
      <div className="text-center py-16 px-4">
        <div className="max-w-sm mx-auto space-y-4">
          <p className="text-sm text-muted-foreground">No activity yet.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog"
              className="px-4 py-2 text-sm rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity font-medium"
            >
              Write a Blog Post
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm rounded-lg border border-border hover:border-foreground/30 transition-colors"
            >
              Start Coding
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ActivityStats activities={allActivities} />

      <section className="p-5 rounded-xl border border-border/50 bg-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Activity Intensity</h3>
          <span className="text-xs text-muted-foreground">Last 60 Days</span>
        </div>
        <ContributionHeatmap activities={allActivities} />
      </section>

      <section>
        <ActivityFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
        />

        <AnimatePresence mode="wait">
          {filteredActivities.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-sm text-muted-foreground">No {activeFilter} activities found.</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-3 text-sm text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Show all
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
