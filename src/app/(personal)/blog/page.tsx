import { Suspense } from 'react';
import { getBlogPosts } from '@/lib/notion/queries';
import { BlogSearch } from '@/components/ui/BlogSearch';
import { BlogPostSkeleton } from '@/components/skeletons';
import { PageIntro } from '@/components/layout/PageIntro';

export const metadata = {
  title: 'Blog - Fajar Dwi Utomo',
  description: 'Read my thoughts on software development, technology, and more.',
};

export const revalidate = 3600;

async function BlogPostsList() {
  const blogPosts = await getBlogPosts();
  return <BlogSearch posts={blogPosts} />;
}

async function BlogStats() {
  const posts = await getBlogPosts();
  const categories = new Set(posts.map((p) => p.category));
  const totalReadTime = posts.reduce((acc, p) => {
    const min = parseInt(p.readTime);
    return acc + (isNaN(min) ? 0 : min);
  }, 0);

  return (
    <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
      <span>
        {posts.length} {posts.length === 1 ? 'post' : 'posts'}
      </span>
      <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
      <span>
        {categories.size} {categories.size === 1 ? 'category' : 'categories'}
      </span>
      <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
      <span>~{totalReadTime} min read</span>
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="site-container space-y-8 py-10 sm:space-y-10 sm:py-14">
      <PageIntro
        label="Writing"
        title="Blog"
        description="Notes on software development, web technology, and what I learn while building."
      >
        <Suspense fallback={null}>
          <BlogStats />
        </Suspense>
      </PageIntro>

      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostsList />
      </Suspense>
    </div>
  );
}
