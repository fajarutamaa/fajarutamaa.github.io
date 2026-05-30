import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getBlogPostBySlug, getPageBlocks, getBlogPosts } from '@/lib/notion/queries';
import { NotionBlockRenderer, ReadingProgressBar, ShareButtons } from '@/components/blog';

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Fajar Dwi Utomo`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blocks = await getPageBlocks(post.id);

  return (
    <>
      <ReadingProgressBar />

      <div className="container max-w-[680px] lg:max-w-[900px] py-12 space-y-8 animate-pageEnter">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
              <Tag size={12} />
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-[15px] text-muted-foreground leading-relaxed border-l-2 border-border pl-4">
            {post.excerpt}
          </p>
        </header>

        <hr className="border-border/50" />

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <NotionBlockRenderer blocks={blocks} />
        </article>

        <div>
          <ShareButtons title={post.title} url={`/blog/${slug}`} />
        </div>
      </div>
    </>
  );
}
