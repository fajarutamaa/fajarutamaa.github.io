import Link from 'next/link';
import { Github, Linkedin, Instagram, Rss, Mail } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/fajarutamaa', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/fajardwiutomo/', icon: Linkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/fajar.utamaa/', icon: Instagram },
  { name: 'Medium', href: 'https://medium.com/@fajardwiutomo', icon: Rss },
  { name: 'Email', href: 'mailto:fajardwiutomo75@gmail.com', icon: Mail },
  { name: 'RSS feed', href: '/rss.xml', icon: Rss },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="site-container flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Fajar Dwi Utomo</p>
          <Link
            href="/playground"
            className="rounded underline-offset-4 hover:text-primary hover:underline"
          >
            Playground
          </Link>
          <Link
            href="/status"
            className="rounded underline-offset-4 hover:text-primary hover:underline"
          >
            Status
          </Link>
        </div>
        <nav aria-label="Social links and RSS" className="flex flex-wrap">
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              target={href.startsWith('https://') ? '_blank' : undefined}
              rel={href.startsWith('https://') ? 'noopener noreferrer' : undefined}
              className="grid size-11 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={name}
              title={name}
            >
              <Icon size={16} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
