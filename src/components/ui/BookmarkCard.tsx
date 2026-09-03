import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
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
      className="group relative block rounded-2xl overflow-hidden glass-card"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {bookmark.thumbnail ? (
          <Image
            src={bookmark.thumbnail}
            alt={bookmark.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            quality={80}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <ArrowUpRight size={18} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 p-1.5 rounded-full glass opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <ArrowUpRight size={13} className="text-foreground" />
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-[13px] text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {bookmark.name}
          </h3>
          <span className="text-[10px] text-muted-foreground shrink-0">{bookmark.year}</span>
        </div>

        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
          {bookmark.description}
        </p>

        {bookmark.stack && bookmark.stack.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {bookmark.stack.map((tech) => (
              <span
                key={tech}
                className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted/60 text-muted-foreground"
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
