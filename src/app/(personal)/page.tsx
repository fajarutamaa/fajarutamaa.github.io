import { Suspense } from 'react';
import { getBookmarks } from '@/lib/notion/queries';
import { Hero } from '@/components/ui/Hero';
import { BookmarkCard } from '@/components/ui/BookmarkCard';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

// Enable ISR (Incremental Static Regeneration) - revalidate every hour
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
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
      {bookmarks.map((bookmark, index) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} index={index} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <main className="container max-w-[680px] lg:max-w-[900px] leading-relaxed antialiased py-12 pb-20">
      {/* Hero Section */}
      <Hero />

      {/* Introduction */}
      <p
        className="mt-6 text-foreground/80 leading-relaxed animate-fadeIn"
        style={{ animationDelay: '100ms' }}
      >
        I&apos;m a junior software engineer with a strong passion for creating meaningful and
        user-focused digital products. I enjoy turning ideas into reliable, well-crafted solutions
        that people genuinely love to use. Currently, I&apos;m learning and contributing to
        development at GPS.id, where I continue to sharpen my skills and explore new challenges in
        software engineering.
      </p>

      {/* Bookmarks Section */}
      <section className="mt-16">
        <div
          className="flex items-center justify-between mb-8 animate-fadeIn"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-xl font-semibold">Bookmarks</h2>
          <div className="h-px flex-1 ml-4 bg-gradient-to-r from-border to-transparent" />
        </div>

        <ErrorBoundary>
          <Suspense fallback={<LoadingState />}>
            <BookmarksSection />
          </Suspense>
        </ErrorBoundary>
      </section>
    </main>
  );
}
