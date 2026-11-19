import { Star, GitFork, BookOpen, Users, UserPlus, Code2 } from 'lucide-react';
import { getGitHubStats } from '@/lib/github/stats';

export async function GitHubStats() {
  const stats = await getGitHubStats();

  if (!stats) return null;

  const items = [
    { label: 'Repos', value: stats.publicRepos, icon: BookOpen },
    { label: 'Stars', value: stats.totalStars, icon: Star },
    { label: 'Forks', value: stats.totalForks, icon: GitFork },
    { label: 'Followers', value: stats.followers, icon: Users },
    { label: 'Following', value: stats.following, icon: UserPlus },
  ];

  return (
    <section aria-labelledby="github-heading" className="space-y-4 border-t pt-10 sm:pt-12">
      <h2 id="github-heading" className="section-title">
        GitHub stats
      </h2>
      <dl className="flex flex-wrap gap-2">
        {items.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="min-w-[5.75rem] flex-1 space-y-1 rounded-xl border bg-card p-3 sm:p-4"
          >
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon size={13} aria-hidden="true" />
              {label}
            </dt>
            <dd className="text-xl font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>

      {stats.topLanguages.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <Code2 size={11} />
          {stats.topLanguages.map((lang) => (
            <span key={lang.name} className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lang.color }} />
              {lang.name}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
