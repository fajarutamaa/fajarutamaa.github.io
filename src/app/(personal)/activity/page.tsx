import { Suspense } from 'react';
import { Activity } from 'lucide-react';
import { ActivityTimeline } from '@/components/timeline';
import { TimelineSkeleton } from '@/components/skeletons';

export const metadata = {
  title: 'Activity - Fajar Dwi Utomo',
  description: 'Recent activity including GitHub commits, pull requests, and blog posts.',
};

export const revalidate = 3600; // Revalidate every hour

export default function ActivityPage() {
  return (
    <div className="container max-w-[680px] lg:max-w-[900px] py-12 space-y-12">
      {/* Header */}
      <section className="space-y-4 text-center animate-fadeIn">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Activity size={32} className="text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Activity Timeline</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          A timeline of my recent activity including GitHub commits, pull requests, and blog posts.
        </p>
      </section>

      {/* Timeline */}
      <section className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
        <Suspense fallback={<TimelineSkeleton />}>
          <ActivityTimeline />
        </Suspense>
      </section>
    </div>
  );
}
