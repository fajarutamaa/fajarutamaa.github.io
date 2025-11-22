export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: {
    commits?: Array<{
      sha: string;
      message: string;
      url: string;
    }>;
    ref?: string;
    ref_type?: string;
    action?: string;
    pull_request?: {
      title: string;
      html_url: string;
    };
    issue?: {
      title: string;
      html_url: string;
    };
  };
  created_at: string;
}

export interface ActivityItem {
  id: string;
  type: 'commit' | 'blog' | 'pr' | 'issue' | 'release';
  title: string;
  description?: string;
  url: string;
  date: string;
  icon?: string;
}
