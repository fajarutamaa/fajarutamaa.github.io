import { Client } from '@notionhq/client';

// Initialize the Notion client
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || '';
export const NOTION_BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID || '';
export const NOTION_SKILLS_DATABASE_ID = process.env.NOTION_SKILLS_DATABASE_ID || '';
export const NOTION_EXPERIENCE_DATABASE_ID = process.env.NOTION_EXPERIENCE_DATABASE_ID || '';
export const REVALIDATE_TIME = parseInt(process.env.REVALIDATE_TIME || '3600', 10);
