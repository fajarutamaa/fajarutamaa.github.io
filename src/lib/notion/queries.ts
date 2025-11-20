import { 
  notion, 
  NOTION_DATABASE_ID, 
  NOTION_BLOG_DATABASE_ID,
  NOTION_SKILLS_DATABASE_ID,
  NOTION_EXPERIENCE_DATABASE_ID,
  REVALIDATE_TIME 
} from './client';
import { 
  parseNotionPages, 
  parseNotionPage, 
  parseNotionBlogPost, 
  parseNotionSkill, 
  parseNotionExperience 
} from './parser';
import { Bookmark, NotionPage, BlogPost, Skill, Experience } from './types';
import { promises as fs } from 'fs';
import path from 'path';

// Helper to read JSON files
async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', filename);
    const file = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

/**
 * Fetch all bookmarks from Notion database
 */
export async function getBookmarks(): Promise<Bookmark[]> {
  try {
    if (!process.env.NOTION_API_KEY || !NOTION_DATABASE_ID) {
      return getBookmarksFromJSON();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (notion.databases as any).query({
      database_id: NOTION_DATABASE_ID,
      sorts: [{ property: 'Year', direction: 'descending' }],
    });

    return parseNotionPages(response.results as NotionPage[]);
  } catch (error) {
    console.error('Error fetching bookmarks from Notion:', error);
    return getBookmarksFromJSON();
  }
}

/**
 * Fetch blog posts from Notion
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!process.env.NOTION_API_KEY || !NOTION_BLOG_DATABASE_ID) {
      return readJsonFile<BlogPost>('blog.json');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (notion.databases as any).query({
      database_id: NOTION_BLOG_DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: { equals: true },
      },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

    return (response.results as NotionPage[]).map(parseNotionBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts from Notion:', error);
    return readJsonFile<BlogPost>('blog.json');
  }
}

/**
 * Fetch skills from Notion
 */
export async function getSkills(): Promise<Skill[]> {
  try {
    if (!process.env.NOTION_API_KEY || !NOTION_SKILLS_DATABASE_ID) {
      return readJsonFile<Skill>('skills.json');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (notion.databases as any).query({
      database_id: NOTION_SKILLS_DATABASE_ID,
      sorts: [{ property: 'Name', direction: 'ascending' }],
    });

    return (response.results as NotionPage[]).map(parseNotionSkill);
  } catch (error) {
    console.error('Error fetching skills from Notion:', error);
    return readJsonFile<Skill>('skills.json');
  }
}

/**
 * Fetch experience from Notion
 */
export async function getExperience(): Promise<Experience[]> {
  try {
    if (!process.env.NOTION_API_KEY || !NOTION_EXPERIENCE_DATABASE_ID) {
      return readJsonFile<Experience>('experience.json');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (notion.databases as any).query({
      database_id: NOTION_EXPERIENCE_DATABASE_ID,
      sorts: [{ property: 'Period', direction: 'descending' }],
    });

    return (response.results as NotionPage[]).map(parseNotionExperience);
  } catch (error) {
    console.error('Error fetching experience from Notion:', error);
    return readJsonFile<Experience>('experience.json');
  }
}

/**
 * Fetch a single bookmark by slug
 */
export async function getBookmarkBySlug(slug: string): Promise<Bookmark | null> {
  try {
    if (!process.env.NOTION_API_KEY || !NOTION_DATABASE_ID) {
      const bookmarks = await getBookmarksFromJSON();
      return bookmarks.find((b) => b.slug === slug) || null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (notion.databases as any).query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: { equals: slug },
      },
    });

    if (response.results.length === 0) return null;
    return parseNotionPage(response.results[0] as NotionPage);
  } catch (error) {
    console.error('Error fetching bookmark by slug:', error);
    return null;
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    if (!process.env.NOTION_API_KEY || !NOTION_BLOG_DATABASE_ID) {
      const posts = await readJsonFile<BlogPost>('blog.json');
      return posts.find((p) => p.slug === slug) || null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (notion.databases as any).query({
      database_id: NOTION_BLOG_DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: { equals: slug },
      },
    });

    if (response.results.length === 0) return null;
    return parseNotionBlogPost(response.results[0] as NotionPage);
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}

/**
 * Fetch blocks from a Notion page
 */
export async function getPageBlocks(pageId: string) {
  try {
    if (!process.env.NOTION_API_KEY) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (notion.blocks.children as any).list({
      block_id: pageId,
    });

    return response.results;
  } catch (error) {
    console.error('Error fetching page blocks:', error);
    return [];
  }
}

/**
 * Fallback function to read bookmarks from local JSON file
 */
async function getBookmarksFromJSON(): Promise<Bookmark[]> {
  try {
    const bookmarks = await readJsonFile<Bookmark>('bookmarks.json');
    return bookmarks.map((bookmark) => ({
      ...bookmark,
      id: bookmark.name.toLowerCase().replace(/\s+/g, '-'),
      slug: bookmark.slug || bookmark.name.toLowerCase().replace(/\s+/g, '-'),
    }));
  } catch (error) {
    console.error('Error reading bookmarks.json:', error);
    return [];
  }
}

export { REVALIDATE_TIME };
