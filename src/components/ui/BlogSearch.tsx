'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, FileText, Loader2 } from 'lucide-react';
import type { BlogPost } from '@/lib/notion/types';

interface BlogSearchProps {
  posts: BlogPost[];
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 6;

export function BlogSearch({ posts, pageSize = DEFAULT_PAGE_SIZE }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [query, category, posts]);

  const clearFilters = () => {
    setQuery('');
    setCategory(null);
    setVisibleCount(pageSize);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setVisibleCount(pageSize);
  };

  const handleCategory = (cat: string | null) => {
    setCategory(cat);
    setVisibleCount(pageSize);
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    // Simulate a tick to avoid visual jank for large lists
    await new Promise((resolve) => setTimeout(resolve, 300));
    setVisibleCount((prev) => prev + pageSize);
    setIsLoadingMore(false);
  };

  const hasFilters = query || category;
  const filteredVisible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl glass-subtle text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/20 transition-all duration-200"
          />
        </div>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategory(category === cat ? null : cat)}
              className={`text-[11px] px-2.5 py-1 rounded-full transition-all duration-200 ${
                category === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-subtle text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <>
          <div className="space-y-3">
            {filteredVisible.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="group glass-card p-4 rounded-2xl">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground/60">
                      <span className="px-2 py-0.5 rounded-full bg-primary/8 text-primary font-medium">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                      <span>&middot;</span>
                      <span>{post.readTime}</span>
                    </div>
                    {post.coverImage && (
                      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <h2 className="text-[15px] font-medium group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </h2>
                    <p className="text-[13px] text-muted-foreground/70 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[13px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Read more
                      <span>&rarr;</span>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={loadMore}
                disabled={isLoadingMore}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium glass-card rounded-full transition-all duration-300 hover:bg-foreground hover:text-background disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Loading
                  </>
                ) : (
                  <>
                    Load more
                    <span className="text-xs text-muted-foreground">
                      ({filtered.length - visibleCount} remaining)
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 space-y-3">
          <FileText size={36} className="mx-auto text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground/60">
            {hasFilters ? 'No posts match your filters.' : 'No blog posts yet. Check back soon!'}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-[13px] text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
