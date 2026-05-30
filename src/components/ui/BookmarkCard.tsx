import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { Bookmark } from '@/lib/notion/types';

interface BookmarkCardProps {
  bookmark: Bookmark;
  index?: number;
}

export const BookmarkCard = memo(function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <Link
      href={bookmark.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-xl overflow-hidden border border-border/50 bg-card transition-all duration-500 hover:border-border hover:shadow-sm"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={bookmark.thumbnail}
          alt={bookmark.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {bookmark.name}
          </h3>
          <span className="text-xs text-muted-foreground shrink-0">{bookmark.year}</span>
        </div>

        <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
          {bookmark.description}
        </p>

        {bookmark.stack && bookmark.stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {bookmark.stack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
});
