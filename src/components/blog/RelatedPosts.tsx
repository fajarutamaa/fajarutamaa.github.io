import Link from 'next/link';
import { getBlogPosts } from '@/lib/notion/queries';

interface RelatedPostsProps {
  currentSlug: string;
  category: string;
}

export async function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const allPosts = await getBlogPosts();
  const related = allPosts
    .filter((p) => p.category === category && p.slug !== currentSlug)
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground">Related Posts</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {related.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <article className="p-4 rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-border hover:shadow-sm h-full">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                </div>
                <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-muted-foreground/70 line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
