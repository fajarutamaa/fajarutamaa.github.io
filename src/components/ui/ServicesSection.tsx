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
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-base font-medium">What I Do</h2>
          <div className="flex-1 h-px bg-border/50" />
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon] || Globe;
          return (
            <Reveal key={service.title} delay={index * 100}>
              <div className="group p-4 md:p-5 rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-border hover:shadow-sm hover-lift">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-medium text-sm">{service.title}</h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
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
