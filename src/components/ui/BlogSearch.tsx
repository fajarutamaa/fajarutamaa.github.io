'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Bookmark, FileText } from 'lucide-react';
import { SavePostButton } from '@/components/blog/SavePostButton';
import { useSavedPosts } from '@/hooks/useSavedPosts';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import type { BlogPost } from '@/lib/notion/types';
import { ContentSearch, FilterChips, FilterSummary } from './ContentFilters';

interface BlogSearchProps {
  posts: BlogPost[];
}

const PAGE_SIZE = 6;

export function BlogSearch({ posts }: BlogSearchProps) {
  const { filters, updateFilters } = useUrlFilters();
  const query = filters.get('q') ?? '';
  const categoryParam = filters.get('category');
  const savedOnly = filters.get('view') === 'saved';
  const { savedPosts, ready } = useSavedPosts();
  const [pagination, setPagination] = useState<{ filters: string; count: number }>();

  const readingList = useMemo(
    () => posts.filter((post) => savedPosts.has(post.slug)),
    [posts, savedPosts]
  );
  const visiblePosts = savedOnly ? readingList : posts;

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return Array.from(set).sort();
  }, [posts]);

  const category = categoryParam && categories.includes(categoryParam) ? categoryParam : null;
  const filterKey = JSON.stringify([query, category, savedOnly]);
  const visibleCount = pagination?.filters === filterKey ? pagination.count : PAGE_SIZE;

  const filtered = useMemo(() => {
    let result = visiblePosts;

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [query, category, visiblePosts]);

  const changeFilters = (updates: {
    q?: string | null;
    category?: string | null;
    view?: string | null;
  }) => {
    setPagination(undefined);
    updateFilters(updates);
  };

  const hasFilters = Boolean(query || categoryParam);
  const filteredVisible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <div className="space-y-4">
      <div role="group" aria-label="Post view" className="flex flex-wrap gap-2">
        {([false, true] as const).map((savedView) => (
          <button
            key={String(savedView)}
            type="button"
            aria-pressed={savedOnly === savedView}
            onClick={() => changeFilters({ view: savedView ? 'saved' : null })}
            className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              savedOnly === savedView
                ? 'bg-accent text-accent-foreground'
                : 'control-surface text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {savedView ? (
              <>
                <Bookmark size={14} aria-hidden="true" />
                Saved{ready && ` (${readingList.length})`}
              </>
            ) : (
              'All posts'
            )}
          </button>
        ))}
      </div>
      <ContentSearch label="Search posts" value={query} onChange={(q) => changeFilters({ q })} />
      <FilterChips
        label="Category"
        options={categories}
        selected={category}
        onChange={(category) => changeFilters({ category })}
      />
      <FilterSummary
        label={savedOnly ? 'saved posts' : 'posts'}
        count={filtered.length}
        total={visiblePosts.length}
        onReset={hasFilters ? () => changeFilters({ q: null, category: null }) : undefined}
      />

      {filtered.length > 0 ? (
        <>
          <div className="space-y-3">
            {filteredVisible.map((post) => (
              <article
                key={post.id}
                className="interactive-card relative rounded-2xl border bg-card"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-5"
                >
                  <div className="space-y-2">
                    <div className="flex min-h-8 flex-wrap items-center gap-2 pr-12 text-xs text-muted-foreground">
                      <span className="rounded-full bg-muted px-2 py-0.5 font-medium">
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
                    <h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[13px] text-primary font-medium">
                      Read more
                      <span>&rarr;</span>
                    </span>
                  </div>
                </Link>
                <div className="absolute right-3 top-2.5 sm:right-4 sm:top-3.5">
                  <SavePostButton slug={post.slug} title={post.title} compact />
                </div>
              </article>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() =>
                  setPagination({ filters: filterKey, count: visibleCount + PAGE_SIZE })
                }
                className="action-link border bg-card hover:bg-muted"
              >
                Load more
                <span className="text-xs text-muted-foreground">
                  ({filtered.length - visibleCount} remaining)
                </span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 space-y-3">
          {savedOnly && readingList.length === 0 ? (
            <>
              <Bookmark size={36} aria-hidden="true" className="mx-auto text-muted-foreground/40" />
              <p className="text-sm font-medium">Your reading list is empty</p>
              <p className="text-sm text-muted-foreground">
                Use the bookmark button on any post to save it in this browser.
              </p>
              <button
                type="button"
                onClick={() => changeFilters({ view: null, q: null, category: null })}
                className="min-h-10 rounded text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Browse all posts
              </button>
            </>
          ) : (
            <>
              <FileText size={36} aria-hidden="true" className="mx-auto text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                {visiblePosts.length
                  ? 'No posts match your filters.'
                  : 'No blog posts yet. Check back soon!'}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
