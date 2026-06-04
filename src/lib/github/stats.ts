const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'fajarutamaa';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  following: number;
  topLanguages: { name: string; count: number; color: string }[];
}

const langColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572a5',
  Go: '#00add8',
  Rust: '#dea584',
  Java: '#b07219',
  Kotlin: '#a97bff',
  Swift: '#f05138',
  PHP: '#777bb4',
  Ruby: '#701516',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Lua: '#000080',
  Scala: '#c22d40',
  Dart: '#00b4ab',
};

export async function getGitHubStats(): Promise<GitHubStats | null> {
  const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }
  const base = `https://api.github.com/users/${GITHUB_USERNAME}`;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(base, { headers, next: { revalidate: 3600 } }),
      fetch(`${base}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: 3600 } }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error('Failed to fetch GitHub stats');
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    const totalStars = repos.reduce(
      (sum: number, r: { stargazers_count: number }) => sum + r.stargazers_count,
      0
    );
    const totalForks = repos.reduce(
      (sum: number, r: { forks_count: number }) => sum + r.forks_count,
      0
    );

    const langMap = new Map<string, number>();
    for (const repo of repos) {
      if (repo.language) {
        langMap.set(repo.language, (langMap.get(repo.language) || 0) + 1);
      }
    }
    const totalLangs = Array.from(langMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const topLanguages = totalLangs.map(([name, count]) => ({
      name,
      count,
      color: langColors[name] || '#6b7280',
    }));

    return {
      publicRepos: user.public_repos,
      totalStars,
      totalForks,
      followers: user.followers,
      following: user.following,
      topLanguages,
    };
  } catch (error) {
    console.error('GitHub stats error:', error);
    return null;
  }
}
