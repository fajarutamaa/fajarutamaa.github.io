import { isFullBlock } from '@notionhq/client';
import {
  notion,
  NOTION_DATABASE_ID,
  NOTION_BLOG_DATABASE_ID,
  NOTION_SKILLS_DATABASE_ID,
  NOTION_EXPERIENCE_DATABASE_ID,
} from './client';
import {
  parseNotionPage,
  parseNotionBlogPost,
  parseNotionSkill,
  parseNotionExperience,
} from './parser';
import type { Bookmark, NotionPage, BlogPost, Skill, Experience } from './types';
import { promises as fs } from 'fs';
import path from 'path';
import { getCached, CACHE_TTL } from '@/lib/cache';

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

type NotionQuery = Parameters<typeof notion.databases.query>[0];

function queryNotion<T>(
  key: 'bookmarks' | 'blogPosts' | 'skills' | 'experience',
  query: NotionQuery,
  parse: (page: NotionPage) => T,
  fallback: () => Promise<T[]>
): Promise<T[]> {
  return getCached(key, CACHE_TTL[key], async () => {
    if (process.env.NOTION_API_KEY && query.database_id) {
      try {
        const { results } = await notion.databases.query(query);
        return results.map((page) => parse(page as NotionPage));
      } catch (error) {
        console.error(`Error fetching ${key} from Notion:`, error);
      }
    }

    return fallback();
  });
}

export function getBookmarks(): Promise<Bookmark[]> {
  return queryNotion(
    'bookmarks',
    {
      database_id: NOTION_DATABASE_ID,
      sorts: [{ property: 'Year', direction: 'descending' }],
    },
    parseNotionPage,
    async () => {
      try {
        const bookmarks = await readJsonFile<Omit<Bookmark, 'id'>>('bookmarks.json');
        return bookmarks.map((bookmark) => {
          const id = bookmark.name.toLowerCase().replace(/\s+/g, '-');
          return { ...bookmark, id, slug: bookmark.slug || id };
        });
      } catch (error) {
        console.error('Error reading bookmarks.json:', error);
        return [];
      }
    }
  );
}

export function getBlogPosts(): Promise<BlogPost[]> {
  return queryNotion(
    'blogPosts',
    {
      database_id: NOTION_BLOG_DATABASE_ID,
      filter: { property: 'Published', checkbox: { equals: true } },
      sorts: [{ property: 'Date', direction: 'descending' }],
    },
    parseNotionBlogPost,
    () => readJsonFile('blog.json')
  );
}

export function getSkills(): Promise<Skill[]> {
  return queryNotion(
    'skills',
    {
      database_id: NOTION_SKILLS_DATABASE_ID,
      sorts: [{ property: 'Name', direction: 'ascending' }],
    },
    parseNotionSkill,
    () => readJsonFile('skills.json')
  );
}

export function getExperience(): Promise<Experience[]> {
  return queryNotion(
    'experience',
    {
      database_id: NOTION_EXPERIENCE_DATABASE_ID,
      sorts: [{ property: 'Period', direction: 'descending' }],
    },
    parseNotionExperience,
    () => readJsonFile('experience.json')
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getPageBlocks(pageId: string) {
  return getCached(`blocks:${pageId}`, CACHE_TTL.blogPosts, async () => {
    try {
      if (!process.env.NOTION_API_KEY) {
        return [];
      }

      const response = await notion.blocks.children.list({
        block_id: pageId,
      });

      return response.results.filter(isFullBlock);
    } catch (error) {
      console.error('Error fetching page blocks:', error);
      return [];
    }
  });
}
