'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, FileText, Briefcase, Activity, Mail } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Activity', href: '/activity', icon: Activity },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="safe-area-bottom fixed inset-x-0 bottom-0 z-40 border-t bg-card md:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-6 gap-0.5 px-1 py-1.5">
        {navigation.map((item) => {
          const isCurrent = pathname === item.href;
          const isActive = isCurrent || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-lg transition-colors ${
                isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              }`}
              aria-current={isCurrent ? 'page' : isActive ? 'location' : undefined}
            >
              <Icon size={17} strokeWidth={isActive ? 2.25 : 1.75} aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
