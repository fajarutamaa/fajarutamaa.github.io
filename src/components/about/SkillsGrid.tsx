import { getSkills } from '@/lib/notion/queries';
import { Skill } from '@/lib/notion/types';

const levelConfig: Record<string, { width: string; color: string; label: string }> = {
  Beginner: { width: '25%', color: 'bg-amber-400', label: 'Beginner' },
  Intermediate: { width: '50%', color: 'bg-blue-400', label: 'Intermediate' },
  Advanced: { width: '75%', color: 'bg-emerald-400', label: 'Advanced' },
  Expert: { width: '100%', color: 'bg-purple-400', label: 'Expert' },
};

export async function SkillsGrid() {
  const skills = await getSkills();

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  const categories = ['Frontend', 'Backend', 'Tools & Others'];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {categories.map((category) => {
        const categorySkills = groupedSkills[category];
        if (!categorySkills || categorySkills.length === 0) return null;

        return (
          <div key={category} className="p-5 rounded-xl border border-border/50 bg-card">
            <h3 className="font-medium text-sm text-muted-foreground mb-4">{category}</h3>
            <div className="space-y-4">
              {categorySkills.map((skill) => {
                const level = levelConfig[skill.level] || levelConfig.Intermediate;
                return (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{level.label}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${level.color} transition-all duration-700`}
                        style={{ width: level.width }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
