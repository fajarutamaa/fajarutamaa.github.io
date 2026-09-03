import { Suspense } from 'react';
import { Activity } from 'lucide-react';
import { ActivityTimeline } from '@/components/timeline';
import { TimelineSkeleton } from '@/components/skeletons';

export const metadata = {
  title: 'Activity - Fajar Dwi Utomo',
  description: 'Recent activity including GitHub commits, pull requests, issues, and blog posts.',
  keywords: ['activity', 'github', 'commits', 'blog', 'developer activity'],
};

export const revalidate = 3600;

export default function ActivityPage() {
  return (
    <div className="container max-w-[680px] lg:max-w-[900px] py-12 space-y-10 animate-pageEnter">
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity size={16} />
          <span>Activity Timeline</span>
        </div>
        <p className="text-sm text-muted-foreground max-w-lg">
          A feed of my development journey — code commits, pull requests, blog posts, and releases.
        </p>
      </section>

      <section>
        <Suspense fallback={<TimelineSkeleton />}>
          <ActivityTimeline />
        </Suspense>
      </section>
    </div>
  );
}
