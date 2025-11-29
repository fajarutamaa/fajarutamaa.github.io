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
      <div className="text-center py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
            <div className="text-5xl animate-float">📊</div>
          </div>
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            No Activity Yet
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Start creating content or contributing to projects to see your activity timeline here!
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 font-medium"
            >
              Write a Blog Post
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300 font-medium"
            >
              Start Coding
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Statistics Cards */}
      <section>
        <ActivityStats activities={allActivities} />
      </section>

      {/* Contribution Heatmap */}
      <section className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Activity Intensity</h3>
          <span className="text-xs text-muted-foreground">Last 60 Days</span>
        </div>
        <ContributionHeatmap activities={allActivities} />
      </section>

      {/* Timeline Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Timeline</h2>
        </div>

        {/* Filters */}
        <ActivityFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
        />

        {/* Timeline Groups */}
        <AnimatePresence mode="wait">
          {filteredActivities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16 px-4 rounded-2xl border-2 border-dashed border-border bg-card/30 backdrop-blur-sm"
            >
              <div className="max-w-sm mx-auto">
                <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-muted/50 flex items-center justify-center">
                  <div className="text-4xl">🔍</div>
                </div>
                <h3 className="text-lg font-bold mb-2">No {activeFilter} Activities Found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try selecting a different filter to see more activities
                </p>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium"
                >
                  Show All Activities
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
