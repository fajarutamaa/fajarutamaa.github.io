import Link from 'next/link';
import { Github, Linkedin, Instagram, Rss, Mail } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/fajarutamaa', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/fajardwiutomo/', icon: Linkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/fajar.utamaa/', icon: Instagram },
  { name: 'Medium', href: 'https://medium.com/@fajardwiutomo', icon: Rss },
  { name: 'Email', href: 'mailto:fajardwiutomo75@gmail.com', icon: Mail },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/30 mt-24">
      <div className="container max-w-[680px] lg:max-w-[900px] py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>&copy; {currentYear} Fajar Dwi Utomo</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  aria-label={social.name}
                >
                  <Icon size={16} />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground/60">
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Rss size={10} />
              RSS
            </Link>
          </div>
          <p>Built with Next.js & Notion</p>
        </div>
      </div>
    </footer>
  );
}
