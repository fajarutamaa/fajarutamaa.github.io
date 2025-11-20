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
    { name: 'Contact', href: '/contact' },
];

export function Header() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [isClient, setIsClient] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container max-w-[680px] lg:max-w-[900px] flex h-16 items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center space-x-2 font-bold text-lg hover:text-primary transition-colors"
                >
                    <span className="gradient-text">Fajar Dwi Utomo</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/' && pathname?.startsWith(item.href));

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-colors hover:text-primary relative group ${isActive ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                {item.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`} />
                            </Link>
                        );
                    })}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    {isClient && (
                        <button
                            type="button"
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            className="group relative p-2 rounded-lg transition-all duration-300 hover:bg-primary/10"
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'dark' ? (
                                <SunIcon
                                    size={18}
                                    className="transition-all duration-300 group-hover:rotate-90 group-hover:text-primary"
                                />
                            ) : (
                                <MoonIcon
                                    size={18}
                                    className="transition-all duration-300 group-hover:-rotate-12 group-hover:text-primary"
                                />
                            )}
                            <span className="absolute inset-0 rounded-lg ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all duration-300" />
                        </button>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur animate-slideDown">
                    <div className="container max-w-[680px] py-4 space-y-3">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== '/' && pathname?.startsWith(item.href));

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
