import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { getBookmarks } from '@/lib/notion/queries';
import { Hero } from '@/components/ui/Hero';
import { BookmarkCard } from '@/components/ui/BookmarkCard';
import { BookmarkSkeleton } from '@/components/skeletons';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { ServicesSection } from '@/components/ui/ServicesSection';
import { GitHubStats } from '@/components/ui/GitHubStats';

export const revalidate = 3600;

async function BookmarksSection() {
  const bookmarks = await getBookmarks();

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No bookmarks found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {bookmarks.slice(0, 4).map((bookmark, index) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} index={index} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="site-container space-y-12 py-10 sm:space-y-16 sm:py-16">
      <Hero />

      <Link
        href="/playground"
        className="interactive-card group flex items-center gap-3 rounded-2xl border bg-card p-4 sm:gap-4 sm:p-5"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <FlaskConical size={21} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="eyebrow block text-[10px]">Interactive demo</span>
          <span className="block font-semibold tracking-tight">Search Playground</span>
          <span className="mt-0.5 block text-sm text-muted-foreground">
            See what makes one search result rank above another.
          </span>
        </span>
        <ArrowRight
          size={17}
          aria-hidden="true"
          className="shrink-0 text-primary motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
        />
      </Link>

      <section aria-labelledby="bookmarks-heading" className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <div>
            <p className="eyebrow accent-kicker">Worth a look</p>
            <h2 id="bookmarks-heading" className="section-title mt-1">
              Featured bookmarks
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-primary transition-colors hover:bg-accent"
          >
            Browse all
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <ErrorBoundary>
          <Suspense fallback={<BookmarkSkeleton />}>
            <BookmarksSection />
          </Suspense>
        </ErrorBoundary>
      </section>

      <Suspense fallback={null}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={null}>
        <GitHubStats />
      </Suspense>
    </div>
  );
}
