import { getSkills } from '@/lib/notion/queries';
import { Skill } from '@/lib/notion/types';

const levelDots: Record<string, string> = {
  Beginner: 'bg-amber-400',
  Intermediate: 'bg-blue-400',
  Advanced: 'bg-emerald-400',
  Expert: 'bg-purple-400',
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
            <div className="space-y-3">
              {categorySkills.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between gap-2">
                  <span className="text-sm text-foreground">{skill.name}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${levelDots[skill.level] || 'bg-muted-foreground'}`}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
