import Link from 'next/link';
import { Github, Linkedin, Instagram, Rss, Mail, Heart } from 'lucide-react';

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/fajarutamaa',
        icon: Github,
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/fajardwiutomo/',
        icon: Linkedin,
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/fajar.utamaa/',
        icon: Instagram,
    },
    {
        name: 'Medium',
        href: 'https://medium.com/@fajardwiutomo',
        icon: Rss,
    },
    {
        name: 'Email',
        href: 'mailto:fajardwiutomo75@gmail.com',
        icon: Mail,
    },
];

const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/40 bg-muted/30 mt-20">
            <div className="container max-w-[680px] lg:max-w-[900px] py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="font-bold text-xl gradient-text">
                                Fajar Dwi Utomo
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Junior Software Engineer passionate about building things people love.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">Quick Links</h3>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">Connect</h3>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                                        aria-label={social.name}
                                    >
                                        <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/40">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <p className="flex items-center gap-1">
                            © {currentYear} Fajar Dwi Utomo. Made with{' '}
                            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
                        </p>
                        <p>
                            Built with{' '}
                            <Link
                                href="https://nextjs.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                            >
                                Next.js
                            </Link>
                            {' & '}
                            <Link
                                href="https://notion.so"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors"
                            >
                                Notion
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
