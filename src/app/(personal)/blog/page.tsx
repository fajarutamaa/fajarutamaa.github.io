import { Suspense } from 'react';
import { getBlogPosts } from '@/lib/notion/queries';
import { BlogSearch } from '@/components/ui/BlogSearch';
import { BlogPostSkeleton } from '@/components/skeletons';

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
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
    <div className="container max-w-[680px] lg:max-w-[900px] py-12 space-y-10 animate-pageEnter">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
        <p className="text-sm text-muted-foreground">
          Thoughts on software development and technology.
        </p>
        <Suspense fallback={null}>
          <BlogStats />
        </Suspense>
      </section>

      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostsList />
      </Suspense>
    </div>
  );
}
