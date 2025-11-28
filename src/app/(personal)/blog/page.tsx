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
    <section className="space-y-8">
      {blogPosts.length > 0 ? (
        blogPosts.map((post) => (
          <article
            key={post.id}
            className="group p-6 rounded-xl border border-border hover:border-primary/50 bg-card transition-all duration-300 hover-lift"
          >
            <div className="space-y-3">
              {/* Category & Date */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

              {/* Read More */}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                Read more
                <span>→</span>
              </Link>
            </div>
          </article>
        ))
      ) : (
        <div className="text-center py-20 space-y-4">
          <FileText size={48} className="mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </section>
  );
}

export default function BlogPage() {
  return (
    <div className="container max-w-[680px] lg:max-w-[900px] py-12 space-y-12">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Thoughts, tutorials, and insights on software development and technology.
        </p>
      </section>

      {/* Blog Posts with Suspense */}
      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostsList />
      </Suspense>
    </div>
  );
}
