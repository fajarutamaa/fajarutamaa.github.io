'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'Activity', href: '/activity' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="site-container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5 rounded-lg text-sm font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-lg border border-primary/15 bg-accent font-mono text-sm text-accent-foreground"
          >
            F
          </span>
          <span>
            Fajar Dwi Utomo<span className="text-primary">.</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const isCurrent = pathname === item.href;
              const isActive = isCurrent || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isCurrent ? 'page' : isActive ? 'location' : undefined}
                  className={`rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="grid size-11 place-items-center">
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="grid size-11 place-items-center rounded-lg border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <Sun size={17} aria-hidden="true" />
                ) : (
                  <Moon size={17} aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
