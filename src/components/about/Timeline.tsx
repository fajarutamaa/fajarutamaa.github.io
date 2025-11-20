import { Briefcase, GraduationCap } from 'lucide-react';
import { getExperience } from '@/lib/notion/queries';

export async function Timeline() {
    const timelineData = await getExperience();

    return (
        <div className="space-y-8">
            {timelineData.map((item, idx) => (
                <div
                    key={item.id}
                    className="relative pl-8 pb-8 border-l-2 border-border last:pb-0 animate-fadeIn"
                    style={{ animationDelay: `${idx * 100}ms` }}
                >
                    {/* Icon */}
                    <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center">
                        {item.type === 'work' ? (
                            <Briefcase size={14} className="text-primary" />
                        ) : (
                            <GraduationCap size={14} className="text-primary" />
                        )}
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {item.organization} • {item.location}
                                </p>
                            </div>
                            <span
                                className={`text-xs px-3 py-1 rounded-full shrink-0 ${item.current
                                        ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                                        : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                {item.period}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
