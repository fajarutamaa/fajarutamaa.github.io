import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getBlogPostBySlug, getPageBlocks, getBlogPosts } from '@/lib/notion/queries';
import { NotionBlockRenderer } from '@/components/blog/NotionBlockRenderer';

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

    // Fetch blocks
    const blocks = await getPageBlocks(post.id);

    return (
        <div className="container max-w-[680px] lg:max-w-[900px] py-12 space-y-8">
            {/* Back Link */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
                <ArrowLeft size={20} />
                <span>Back to Blog</span>
            </Link>

            {/* Header */}
            <header className="space-y-6 animate-fadeIn">
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            <Tag size={14} />
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        {post.title}
                    </h1>
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-6">
                    {post.excerpt}
                </p>
            </header>

            <hr className="border-border" />

            {/* Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none animate-fadeIn" style={{ animationDelay: '100ms' }}>
                <NotionBlockRenderer blocks={blocks} />
            </div>
        </div>
    );
}
