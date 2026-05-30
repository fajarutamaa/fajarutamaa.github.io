import { Suspense } from 'react';
import { getBookmarks } from '@/lib/notion/queries';
import { Hero } from '@/components/ui/Hero';
import { BookmarkCard } from '@/components/ui/BookmarkCard';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

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
    <div className="grid md:grid-cols-2 gap-5">
      {bookmarks.map((bookmark, index) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} index={index} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <main className="container max-w-[680px] lg:max-w-[900px] leading-relaxed antialiased py-12 pb-20 animate-pageEnter">
      <Hero />

      <p className="mt-6 text-foreground/70 leading-relaxed text-[15px]">
        I&apos;m a junior software engineer with a strong passion for creating meaningful and
        user-focused digital products. I enjoy turning ideas into reliable, well-crafted solutions
        that people genuinely love to use. Currently, I&apos;m learning and contributing to
        development at GPS.id, where I continue to sharpen my skills and explore new challenges in
        software engineering.
      </p>

      <section className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-base font-medium">Bookmarks</h2>
          <div className="flex-1 h-px bg-border/50" />
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
