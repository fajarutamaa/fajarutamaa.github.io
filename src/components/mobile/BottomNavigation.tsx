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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-t border-border shadow-lg">
      <div className="flex justify-around items-center px-2 py-2">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px] min-h-[60px] ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              aria-label={item.name}
            >
              <Icon size={20} className="shrink-0" />
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
