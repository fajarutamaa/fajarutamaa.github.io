import { getSkills } from '@/lib/notion/queries';
import { Skill } from '@/lib/notion/types';

const levelColors = {
    Beginner: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    Intermediate: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    Advanced: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    Expert: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
};

export async function SkillsGrid() {
    const skills = await getSkills();

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    // Define category order
    const categories = ['Frontend', 'Backend', 'Tools & Others'];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, idx) => {
                const categorySkills = groupedSkills[category];
                if (!categorySkills || categorySkills.length === 0) return null;

                return (
                    <div
                        key={category}
                        className="space-y-4 p-6 rounded-xl border border-border bg-card hover-lift transition-all duration-300"
                        style={{
                            animationDelay: `${idx * 100}ms`,
                        }}
                    >
                        <h3 className="font-semibold text-lg text-foreground">{category}</h3>
                        <div className="space-y-3">
                            {categorySkills.map((skill) => (
                                <div key={skill.name} className="space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                                        <span
                                            className={`text-xs px-2.5 py-1 rounded-full border ${levelColors[skill.level as keyof typeof levelColors]
                                                }`}
                                        >
                                            {skill.level}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
