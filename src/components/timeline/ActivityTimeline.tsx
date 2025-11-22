import { getGitHubEvents, parseGitHubEvents } from '@/lib/github/api';
import { getBlogPosts } from '@/lib/notion/queries';
import { TimelineItem } from './TimelineItem';
import { ActivityItem } from '@/lib/github/types';

export async function ActivityTimeline() {
  // Fetch GitHub events
  const githubEvents = await getGitHubEvents(20);
  const githubActivities = parseGitHubEvents(githubEvents);

  // Fetch blog posts
  const blogPosts = await getBlogPosts();
  const blogActivities: ActivityItem[] = blogPosts.slice(0, 5).map((post) => ({
    id: post.id,
    type: 'blog' as const,
    title: post.title,
    description: post.excerpt,
    url: `/blog/${post.slug}`,
    date: post.date,
  }));

  // Combine and sort by date
  const allActivities = [...githubActivities, ...blogActivities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (allActivities.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No recent activity found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {allActivities.map((activity, index) => (
        <TimelineItem key={activity.id} activity={activity} index={index} />
      ))}
    </div>
  );
}
