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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-border/30">
      <div className="flex justify-around items-center">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 transition-colors duration-200 ${
                isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/70'
              }`}
              aria-label={item.name}
            >
              <Icon size={18} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
