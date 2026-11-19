import { promises as fs } from 'fs';
import path from 'path';
import { Globe, Network, Palette, Database, type LucideIcon } from 'lucide-react';

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
    <section aria-labelledby="services-heading" className="space-y-5 border-t pt-10 sm:pt-12">
      <div>
        <p className="eyebrow accent-kicker">Capabilities</p>
        <h2 id="services-heading" className="section-title mt-1">
          What I do
        </h2>
      </div>
      <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Globe;
          return (
            <div key={service.title} className="flex items-start gap-3 bg-card p-4 sm:p-5">
              <div className="shrink-0 rounded-xl border border-primary/10 bg-accent p-2.5 text-accent-foreground">
                <Icon size={17} aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
