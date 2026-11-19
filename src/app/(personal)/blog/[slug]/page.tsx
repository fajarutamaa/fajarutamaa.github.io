import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { getBlogPostBySlug, getPageBlocks, getBlogPosts } from '@/lib/notion/queries';
import {
  NotionBlockRenderer,
  ReadingProgressBar,
  RelatedPosts,
  ShareButtons,
  TableOfContents,
} from '@/components/blog';
import { SavePostButton } from '@/components/blog/SavePostButton';
import type { NotionBlock } from '@/lib/notion/types';
import type { Metadata } from 'next';

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fajarutamaa.github.io';

function resolveImageUrl(image: string): string | null {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  return `${SITE_URL}${image}`;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const url = `${SITE_URL}/blog/${slug}`;
  const image = resolveImageUrl(post.coverImage ?? '');

  return {
    title: `${post.title} - Fajar Dwi Utomo`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      siteName: 'Fajar Dwi Utomo',
      locale: 'en_US',
      publishedTime: post.date,
      authors: ['Fajar Dwi Utomo'],
      tags: post.tags,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: post.title,
      description: post.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractHeadings(blocks: NotionBlock[]) {
  return (
    blocks
      .filter((b) => b.type.startsWith('heading_'))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((b: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const text = b[b.type].rich_text.map((t: any) => t.plain_text).join('');
        return {
          id: slugify(text),
          text,
          level: Number(b.type.replace('heading_', '')),
        };
      })
  );
}

async function getPrevNext(slug: string) {
  const allPosts = await getBlogPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? allPosts[idx - 1] : null,
    next: idx < allPosts.length - 1 ? allPosts[idx + 1] : null,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blocks = await getPageBlocks(post.id);
  const headings = extractHeadings(blocks);
  const { prev, next } = await getPrevNext(slug);

  return (
    <>
      <ReadingProgressBar />

      <div className="site-container py-10 sm:py-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to blog
        </Link>

        <div className="flex gap-10 mt-6">
          <div className="flex-1 min-w-0 space-y-8">
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

              <h1 className="page-title">{post.title}</h1>

              <p className="text-[15px] text-muted-foreground leading-relaxed border-l-2 border-border pl-4">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <SavePostButton slug={post.slug} title={post.title} />
                <Link
                  href="/blog?view=saved"
                  className="rounded text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Reading list
                </Link>
              </div>
            </header>

            <hr className="border-border/50" />

            <article className="prose prose-neutral dark:prose-invert max-w-none">
              <NotionBlockRenderer blocks={blocks} />
            </article>

            <div className="space-y-8">
              {(prev || next) && (
                <nav className="flex gap-4 pt-4">
                  {prev ? (
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="flex-1 p-4 rounded-xl border border-border/50 bg-card hover:border-border transition-colors group"
                    >
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <ChevronLeft size={12} />
                        Previous
                      </div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                        {prev.title}
                      </p>
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                  {next ? (
                    <Link
                      href={`/blog/${next.slug}`}
                      className="flex-1 p-4 rounded-xl border border-border/50 bg-card hover:border-border transition-colors group text-right"
                    >
                      <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mb-1">
                        Next
                        <ChevronRight size={12} />
                      </div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                        {next.title}
                      </p>
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                </nav>
              )}

              <Suspense fallback={null}>
                <RelatedPosts currentSlug={slug} category={post.category} />
              </Suspense>

              <ShareButtons title={post.title} url={`/blog/${slug}`} />
            </div>
          </div>

          <TableOfContents items={headings} />
        </div>
      </div>
    </>
  );
}
