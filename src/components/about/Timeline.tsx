import { Briefcase, GraduationCap } from 'lucide-react';
import { getExperience } from '@/lib/notion/queries';

export async function Timeline() {
  const timelineData = await getExperience();

  return (
    <div className="space-y-8">
      {timelineData.map((item, idx) => (
        <div
          key={item.id}
          className="relative pl-8 pb-8 border-l-2 border-border last:pb-0 animate-fadeIn group"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          {/* Icon */}
          <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
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
                <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.organization} • {item.location}
                </p>
              </div>
              <span
                className={`text-xs px-3 py-1.5 rounded-full shrink-0 font-medium border ${
                  item.current
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                    : 'bg-muted text-muted-foreground border-border'
                }`}
              >
                {item.period}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
