'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MoonIcon, SunIcon, Menu, X } from 'lucide-react';
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

const linkClasses =
  'text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300';

const activeLinkClasses = 'text-foreground font-semibold';

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/30 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <nav className="container max-w-[680px] lg:max-w-[900px] flex h-14 items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 font-semibold text-base tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="gradient-text">Fajar Dwi Utomo</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${linkClasses} ${isActive ? activeLinkClasses : ''} relative py-1`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-foreground rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div suppressHydrationWarning>
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-lg hover:bg-muted transition-colors duration-300"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'dark' ? (
                  <SunIcon size={16} className="text-foreground" />
                ) : (
                  <MoonIcon size={16} className="text-foreground" />
                )}
              </button>
            )}
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/30 bg-background/80 backdrop-blur-xl animate-slideDown">
          <div className="container max-w-[680px] py-3 space-y-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
