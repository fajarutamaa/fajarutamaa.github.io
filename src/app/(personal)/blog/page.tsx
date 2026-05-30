import { Suspense } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { getBlogPosts } from '@/lib/notion/queries';
import { BlogPostSkeleton } from '@/components/skeletons';

export const metadata = {
  title: 'Blog - Fajar Dwi Utomo',
  description: 'Read my thoughts on software development, technology, and more.',
};

export const revalidate = 3600;

async function BlogPostsList() {
  const blogPosts = await getBlogPosts();

  return (
    <section className="space-y-5">
      {blogPosts.length > 0 ? (
        blogPosts.map((post) => (
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
        ))
      ) : (
        <div className="text-center py-20 space-y-4">
          <FileText size={40} className="mx-auto text-muted-foreground/50" />
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </section>
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
      </section>

      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostsList />
      </Suspense>
    </div>
  );
}
