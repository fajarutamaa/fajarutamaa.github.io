import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Bookmark } from '@/lib/notion/types';

interface BookmarkCardProps {
  bookmark: Bookmark;
  index?: number;
}

export const BookmarkCard = memo(function BookmarkCard({ bookmark, index }: BookmarkCardProps) {
  return (
    <Link
      href={bookmark.website}
      target="_blank"
      rel="noopener noreferrer"
      className="interactive-card group block overflow-hidden rounded-2xl border bg-card"
    >
      <div className="relative aspect-[2/1] overflow-hidden border-b bg-muted">
        {bookmark.thumbnail ? (
          <Image
            src={bookmark.thumbnail}
            alt=""
            fill
            className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.025]"
            quality={80}
            sizes="(max-width: 639px) 100vw, (max-width: 960px) 50vw, 440px"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <ArrowUpRight size={18} />
          </div>
        )}
      </div>

      <div className="space-y-2.5 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="pt-1 text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
            {bookmark.name}
          </h3>
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:bg-primary group-focus-visible:text-primary-foreground"
          >
            <ArrowUpRight size={16} />
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {bookmark.description}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="mr-1 font-mono text-xs text-muted-foreground">{bookmark.year}</span>
          {bookmark.stack?.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
});
