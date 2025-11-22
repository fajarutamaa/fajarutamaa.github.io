import { GitHubEvent, ActivityItem } from './types';

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'fajarutamaa';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional, for higher rate limits

export async function getGitHubEvents(limit = 10): Promise<GitHubEvent[]> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=${limit}`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub events');
    }

    return response.json();
  } catch (error) {
    console.error('GitHub API error:', error);
    return [];
  }
}

export function parseGitHubEvents(events: GitHubEvent[]): ActivityItem[] {
  const activities: ActivityItem[] = [];

  events.forEach((event) => {
    switch (event.type) {
      case 'PushEvent':
        if (event.payload.commits && event.payload.commits.length > 0) {
          event.payload.commits.slice(0, 3).forEach((commit) => {
            activities.push({
              id: `${event.id}-${commit.sha}`,
              type: 'commit',
              title: commit.message.split('\n')[0],
              description: event.repo.name,
              url: commit.url
                .replace('api.github.com/repos', 'github.com')
                .replace('/commits/', '/commit/'),
              date: event.created_at,
            });
          });
        }
        break;

      case 'PullRequestEvent':
        if (event.payload.pull_request) {
          activities.push({
            id: event.id,
            type: 'pr',
            title: event.payload.pull_request.title,
            description: `${event.payload.action} pull request in ${event.repo.name}`,
            url: event.payload.pull_request.html_url,
            date: event.created_at,
          });
        }
        break;

      case 'IssuesEvent':
        if (event.payload.issue) {
          activities.push({
            id: event.id,
            type: 'issue',
            title: event.payload.issue.title,
            description: `${event.payload.action} issue in ${event.repo.name}`,
            url: event.payload.issue.html_url,
            date: event.created_at,
          });
        }
        break;

      case 'CreateEvent':
        if (event.payload.ref_type === 'tag') {
          activities.push({
            id: event.id,
            type: 'release',
            title: `Released ${event.payload.ref}`,
            description: event.repo.name,
            url: `https://github.com/${event.repo.name}`,
            date: event.created_at,
          });
        }
        break;
    }
  });

  return activities;
}
