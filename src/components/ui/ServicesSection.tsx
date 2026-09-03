import { promises as fs } from 'fs';
import path from 'path';
import { Globe, Network, Palette, Database, type LucideIcon } from 'lucide-react';
import { Reveal } from './Reveal';

interface Service {
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Network,
  Palette,
  Database,
};

async function getServices(): Promise<Service[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'services.json');
    const file = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(file);
  } catch {
    return [];
  }
}

export async function ServicesSection() {
  const services = await getServices();

  if (services.length === 0) return null;

  return (
    <section>
      <Reveal>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-sm font-medium text-muted-foreground">What I Do</h2>
          <div className="flex-1 h-px bg-border/30" />
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-2">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon] || Globe;
          return (
            <Reveal key={service.title} delay={index * 80}>
              <div className="group glass-card p-4 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-primary/8 text-primary shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={16} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-[13px]">{service.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
