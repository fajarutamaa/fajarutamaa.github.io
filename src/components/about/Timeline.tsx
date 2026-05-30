import { Briefcase, GraduationCap } from 'lucide-react';
import { getExperience } from '@/lib/notion/queries';

export async function Timeline() {
  const timelineData = await getExperience();

  return (
    <div className="space-y-6">
      {timelineData.map((item) => (
        <div key={item.id} className="relative pl-6 pb-6 border-l border-border last:pb-0">
          <div className="absolute -left-[9px] top-0.5 w-[18px] h-[18px] rounded-full bg-background border-2 border-border flex items-center justify-center">
            {item.type === 'work' ? (
              <Briefcase size={8} className="text-muted-foreground" />
            ) : (
              <GraduationCap size={8} className="text-muted-foreground" />
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-[15px] text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.organization} &middot; {item.location}
                </p>
              </div>
              <span
                className={`text-xs shrink-0 px-2.5 py-1 rounded-full border ${
                  item.current
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : 'bg-muted/50 text-muted-foreground border-border/50'
                }`}
              >
                {item.period}
              </span>
            </div>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
