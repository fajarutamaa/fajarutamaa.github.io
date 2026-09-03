import Link from 'next/link';
import { User, FileText, Briefcase, Activity, Mail, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

const links = [
  {
    name: 'About',
    href: '/about',
    description: 'Learn about me',
    icon: User,
  },
  {
    name: 'Blog',
    href: '/blog',
    description: 'Tech thoughts',
    icon: FileText,
  },
  {
    name: 'Projects',
    href: '/projects',
    description: 'Things I built',
    icon: Briefcase,
  },
  {
    name: 'Activity',
    href: '/activity',
    description: 'Recent work',
    icon: Activity,
  },
  {
    name: 'Contact',
    href: '/contact',
    description: 'Get in touch',
    icon: Mail,
  },
];

export function QuickLinks() {
  return (
    <section>
      <Reveal>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-sm font-medium text-muted-foreground">Explore</h2>
          <div className="flex-1 h-px bg-border/30" />
        </div>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <Reveal key={link.name} delay={index * 50}>
              <Link
                href={link.href}
                className="group glass-card flex flex-col items-center gap-2.5 p-4 rounded-2xl text-center"
              >
                <div className="p-2 rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={17} />
                </div>
                <div>
                  <span className="text-[13px] font-medium flex items-center justify-center gap-1">
                    {link.name}
                    <ArrowUpRight
                      size={11}
                      className="opacity-0 -translate-x-0.5 translate-y-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    />
                  </span>
                  <span className="text-xs text-muted-foreground block mt-0.5">
                    {link.description}
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
