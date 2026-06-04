'use client';

import { useEffect, useState } from 'react';
import { ListOrdered } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-24 w-56 shrink-0 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <ListOrdered size={12} />
          On this page
        </div>

        <div className="space-y-1 border-l border-border/50">
          {items.map(({ id, text, level }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`block text-xs py-1 transition-colors ${level === 2 ? 'pl-3' : 'pl-6'} ${
                activeId === id
                  ? 'text-primary font-medium border-l border-primary -ml-px'
                  : 'text-muted-foreground/70 hover:text-foreground'
              }`}
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
