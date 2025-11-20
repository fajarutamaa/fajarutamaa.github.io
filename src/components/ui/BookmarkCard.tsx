import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from '@/lib/notion/types';

interface BookmarkCardProps {
    bookmark: Bookmark;
    index?: number;
}

export function BookmarkCard({ bookmark, index = 0 }: BookmarkCardProps) {
    return (
        <Link
            href={bookmark.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block hover-lift rounded-xl overflow-hidden border border-foreground/5 bg-card transition-all duration-300 animate-fadeIn"
            style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both',
            }}
        >
            {/* Thumbnail */}
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Image
                    src={bookmark.thumbnail}
                    alt={bookmark.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                {/* Title and Year */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
                        {bookmark.name}
                    </h3>
                    <span className="text-xs text-muted-foreground font-medium shrink-0 px-2 py-1 rounded-md bg-muted/50">
                        {bookmark.year}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {bookmark.description}
                </p>

                {/* Stack/Tags */}
                {bookmark.stack && bookmark.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {bookmark.stack.map((tech) => (
                            <span
                                key={tech}
                                className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-medium transition-colors duration-200 hover:bg-primary/20"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Hover indicator */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                    <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
