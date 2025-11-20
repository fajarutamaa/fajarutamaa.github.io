import { getSkills } from '@/lib/notion/queries';
import { Skill } from '@/lib/notion/types';

const levelColors = {
    Beginner: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
    Intermediate: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
    Advanced: 'bg-green-500/20 text-green-700 dark:text-green-400',
    Expert: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
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
                        className="space-y-4 p-6 rounded-xl border border-border bg-card hover-lift"
                        style={{
                            animationDelay: `${idx * 100}ms`,
                        }}
                    >
                        <h3 className="font-semibold text-lg">{category}</h3>
                        <div className="space-y-3">
                            {categorySkills.map((skill) => (
                                <div key={skill.name} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{skill.name}</span>
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-full ${levelColors[skill.level as keyof typeof levelColors]
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
