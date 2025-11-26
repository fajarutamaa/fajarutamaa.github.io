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
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 ring-4 ring-primary/10 mb-4 backdrop-blur-sm">
          <Activity size={36} className="text-primary animate-float" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
            Activity Timeline
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A real-time feed of my development journey — from code commits and pull requests to blog
            posts and project releases
          </p>
        </div>

        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-primary text-sm font-semibold backdrop-blur-sm">
          <TrendingUp size={18} className="animate-pulse" />
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
