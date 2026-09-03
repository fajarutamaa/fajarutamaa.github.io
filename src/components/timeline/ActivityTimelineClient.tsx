'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { TimelineGroup } from './TimelineGroup';
import { ActivityStats, ActivityFilter } from './ActivityStats';
import { ContributionHeatmap } from './ContributionHeatmap';
import { ActivityItem } from '@/lib/github/types';
import { isToday, isThisWeek } from 'date-fns';

interface ActivityTimelineClientProps {
  githubActivities: ActivityItem[];
  blogActivities: ActivityItem[];
}

const OLDER_PAGE_SIZE = 10;

export function ActivityTimelineClient({
  githubActivities,
  blogActivities,
}: ActivityTimelineClientProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [olderVisible, setOlderVisible] = useState(OLDER_PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setOlderVisible(OLDER_PAGE_SIZE);
  };

  const loadMoreOlder = async () => {
    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setOlderVisible((prev) => prev + OLDER_PAGE_SIZE);
    setIsLoadingMore(false);
  };

  const visibleOlder = groupedActivities.older.slice(0, olderVisible);
  const hasMoreOlder = groupedActivities.older.length > olderVisible;

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
          onFilterChange={handleFilterChange}
          counts={counts}
        />

        {filteredActivities.length === 0 ? (
          <div key="empty" className="text-center py-12 animate-fadeIn">
            <p className="text-sm text-muted-foreground">No {activeFilter} activities found.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-3 text-sm text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              Show all
            </button>
          </div>
        ) : (
          <div key="results" className="animate-fadeIn">
            <TimelineGroup title="Today" activities={groupedActivities.today} startIndex={0} />
            <TimelineGroup
              title="This Week"
              activities={groupedActivities.thisWeek}
              startIndex={groupedActivities.today.length}
            />
            <TimelineGroup
              title="Older"
              activities={visibleOlder}
              startIndex={groupedActivities.today.length + groupedActivities.thisWeek.length}
            />

            {hasMoreOlder && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={loadMoreOlder}
                  disabled={isLoadingMore}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium glass-card rounded-full transition-all duration-300 hover:bg-foreground hover:text-background disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Loading
                    </>
                  ) : (
                    <>
                      Load more
                      <span className="text-xs text-muted-foreground">
                        ({groupedActivities.older.length - olderVisible} remaining)
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
