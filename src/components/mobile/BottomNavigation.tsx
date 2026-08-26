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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass safe-area-bottom">
      <div className="flex justify-around items-center px-1">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex flex-col items-center justify-center gap-0.5 py-2 px-2 min-w-[48px] transition-colors duration-200 ${
                isActive ? 'text-foreground' : 'text-muted-foreground/60'
              }`}
              aria-label={item.name}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-foreground rounded-full" />
              )}
              <Icon size={17} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[9px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
