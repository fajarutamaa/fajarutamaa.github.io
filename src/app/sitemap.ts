import { getBlogPosts } from '@/lib/notion/queries';

export const dynamic = 'force-static';
export const revalidate = 3600;

const BASE_URL = 'https://fajarutamaa.github.io';

const staticRoutes = [
  { url: '/', priority: 1.0 },
  { url: '/about', priority: 0.9 },
  { url: '/blog', priority: 0.9 },
  { url: '/projects', priority: 0.8 },
  { url: '/activity', priority: 0.7 },
  { url: '/contact', priority: 0.8 },
];

export default async function sitemap() {
  const blogPosts = await getBlogPosts();

  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    priority: 0.6,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route.url}`,
      lastModified: new Date().toISOString(),
      priority: route.priority,
    })),
    ...blogRoutes,
  ];
}
