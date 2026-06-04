'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, FileText } from 'lucide-react';
import type { BlogPost } from '@/lib/notion/types';

interface BlogSearchProps {
  posts: BlogPost[];
}

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);

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
  };

  const hasFilters = query || category;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border/50 bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-border transition-colors"
          />
        </div>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(category === cat ? null : cat)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                category === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border/50 hover:border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="group p-5 rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-border hover:shadow-sm">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-medium group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read more
                    <span>&rarr;</span>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <FileText size={40} className="mx-auto text-muted-foreground/50" />
          <p className="text-muted-foreground">
            {hasFilters ? 'No posts match your filters.' : 'No blog posts yet. Check back soon!'}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
