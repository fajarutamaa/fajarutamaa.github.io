import { Star, GitFork, BookOpen, Users, UserPlus, Code2 } from 'lucide-react';
import { getGitHubStats } from '@/lib/github/stats';
import { Reveal } from './Reveal';

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
    <section>
      <Reveal>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-sm font-medium text-muted-foreground">GitHub Stats</h2>
          <div className="flex-1 h-px bg-border/30" />
        </div>
      </Reveal>

      <div className="grid grid-cols-5 gap-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.label} delay={index * 50}>
              <div className="glass-card p-3 rounded-2xl text-center">
                <Icon size={13} className="mx-auto text-muted-foreground/60 mb-1" />
                <p className="text-sm md:text-base font-semibold tabular-nums">{item.value}</p>
                <p className="text-[9px] text-muted-foreground/50 mt-0.5">{item.label}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {stats.topLanguages.length > 0 && (
        <Reveal>
          <div className="flex flex-wrap items-center gap-2 mt-3 text-[10px] text-muted-foreground/60">
            <Code2 size={11} />
            {stats.topLanguages.map((lang) => (
              <span key={lang.name} className="inline-flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
                {lang.name}
              </span>
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
}
