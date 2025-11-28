import React from 'react';
import Link from 'next/link';
import { Tooltip } from '@nextui-org/tooltip';
import { Github, Linkedin, Instagram, Rss } from 'lucide-react';

const socialLinks = [
  {
    name: 'github',
    href: 'https://github.com/fajarutamaa',
    icon: Github,
    label: 'GitHub Profile',
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/in/fajardwiutomo/',
    icon: Linkedin,
    label: 'LinkedIn Profile',
  },
  {
    name: 'instagram',
    href: 'https://www.instagram.com/fajar.utamaa/',
    icon: Instagram,
    label: 'Instagram Profile',
  },
  {
    name: 'medium',
    href: 'https://medium.com/@fajardwiutomo',
    icon: Rss,
    label: 'Medium Blog',
  },
];

const tooltipStyles = {
  base: ['before:bg-neutral-400 dark:before:bg-white'],
  content: [
    'py-2 px-4 shadow-sm',
    'font-medium text-sm',
    'rounded-lg',
    'text-black bg-gradient-to-br from-white to-neutral-400',
  ],
};

interface SocialLinksProps {
  className?: string;
  showLabel?: boolean;
}

export function SocialLinks({ className = '', showLabel = true }: SocialLinksProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {showLabel && (
        <h2 className="font-semibold text-sm text-muted-foreground mb-4">Connect with me</h2>
      )}

      <div className="flex gap-6">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <Tooltip
              key={social.name}
              classNames={tooltipStyles}
              content={social.label}
              showArrow={true}
              placement="bottom"
            >
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg transition-all duration-300 hover:bg-primary/10"
                aria-label={social.label}
              >
                <Icon
                  size={20}
                  className="transition-all duration-300 group-hover:scale-110 group-hover:text-primary"
                />

                {/* Animated ring on hover */}
                <span className="absolute inset-0 rounded-lg ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all duration-300" />
              </Link>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
