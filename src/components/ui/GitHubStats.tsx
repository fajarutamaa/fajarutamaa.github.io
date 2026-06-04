import { Star, GitFork, BookOpen, Users, UserPlus, Code2 } from 'lucide-react';
import { getGitHubStats } from '@/lib/github/stats';
import { Reveal } from './Reveal';

export async function GitHubStats() {
  const stats = await getGitHubStats();

  if (!stats) return null;

  const items = [
    { label: 'Repositories', value: stats.publicRepos, icon: BookOpen },
    { label: 'Stars', value: stats.totalStars, icon: Star },
    { label: 'Forks', value: stats.totalForks, icon: GitFork },
    { label: 'Followers', value: stats.followers, icon: Users },
    { label: 'Following', value: stats.following, icon: UserPlus },
  ];

  return (
    <section>
      <Reveal>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-base font-medium">GitHub Stats</h2>
          <div className="flex-1 h-px bg-border/50" />
        </div>
      </Reveal>

      <div className="grid grid-cols-5 gap-3 mb-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.label} delay={index * 60}>
              <div className="p-3 md:p-4 rounded-xl border border-border/50 bg-card text-center transition-all duration-300 hover:border-border hover:shadow-sm hover-lift">
                <Icon size={16} className="mx-auto text-muted-foreground mb-1.5" />
                <p className="text-lg md:text-xl font-semibold tabular-nums">{item.value}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{item.label}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {stats.topLanguages.length > 0 && (
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <Code2 size={13} />
            {stats.topLanguages.map((lang) => (
              <span key={lang.name} className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                {lang.name}
              </span>
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
}
