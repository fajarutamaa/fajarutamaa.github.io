import { Suspense } from 'react';
import { Activity, TrendingUp } from 'lucide-react';
import { ActivityTimeline } from '@/components/timeline';
import { TimelineSkeleton } from '@/components/skeletons';

export const metadata = {
  title: 'Activity - Fajar Dwi Utomo',
  description:
    'Recent activity including GitHub commits, pull requests, issues, and blog posts. Track my development journey and content creation.',
  keywords: ['activity', 'github', 'commits', 'blog', 'developer activity'],
};

export const revalidate = 3600; // Revalidate every hour

export default function ActivityPage() {
  return (
    <div className="container max-w-[900px] py-12 space-y-12">
      {/* Header */}
      <section className="space-y-6 text-center animate-fadeIn">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
          <Activity size={32} className="text-primary" />
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Activity Timeline
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A real-time feed of my development journey - from code commits and pull requests to blog
            posts and project releases
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <TrendingUp size={16} />
          <span>Live updates from GitHub & Blog</span>
        </div>
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
