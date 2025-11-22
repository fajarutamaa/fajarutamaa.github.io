import { getGitHubEvents, parseGitHubEvents } from '@/lib/github/api';
import { getBlogPosts } from '@/lib/notion/queries';
import { ActivityItem } from '@/lib/github/types';
import { ActivityTimelineClient } from './ActivityTimelineClient';

export async function ActivityTimeline() {
  // Fetch GitHub events
  const githubEvents = await getGitHubEvents(30);
  const githubActivities = parseGitHubEvents(githubEvents);

  // Fetch blog posts
  const blogPosts = await getBlogPosts();
  const blogActivities: ActivityItem[] = blogPosts.slice(0, 10).map((post) => ({
    id: post.id,
    type: 'blog' as const,
    title: post.title,
    description: post.excerpt,
    url: `/blog/${post.slug}`,
    date: post.date,
  }));

  return (
    <ActivityTimelineClient githubActivities={githubActivities} blogActivities={blogActivities} />
  );
}
