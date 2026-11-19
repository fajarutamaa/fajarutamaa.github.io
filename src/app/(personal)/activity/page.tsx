import { Suspense } from 'react';
import { ActivityTimeline } from '@/components/timeline/ActivityTimeline';
import { TimelineSkeleton } from '@/components/skeletons';
import { PageIntro } from '@/components/layout/PageIntro';

export const metadata = {
  title: 'Activity - Fajar Dwi Utomo',
  description: 'Recent activity including GitHub commits, pull requests, issues, and blog posts.',
  keywords: ['activity', 'github', 'commits', 'blog', 'developer activity'],
};

export const revalidate = 3600;

export default function ActivityPage() {
  return (
    <div className="site-container space-y-8 py-10 sm:space-y-10 sm:py-14">
      <PageIntro
        label="What’s new"
        title="Activity"
        description="Recent commits, pull requests, releases, and new articles in one timeline."
      />

      <section>
        <Suspense fallback={<TimelineSkeleton />}>
          <ActivityTimeline />
        </Suspense>
      </section>
    </div>
  );
}
