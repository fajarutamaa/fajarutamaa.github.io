export interface Bookmark {
  id: string;
  name: string;
  description: string;
  website: string;
  logo: string;
  stack?: string[];
  thumbnail: string;
  year: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  date: string;
  readTime: string;
  category: string;
  tags?: string[];
  published: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools & Others';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon?: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  type: 'work' | 'education';
  current: boolean;
}

export interface NotionPage {
  id: string;
  properties: {
    // Common
    Name?: { title: Array<{ plain_text: string }> };
    Title?: { title: Array<{ plain_text: string }> }; // Blog uses Title
    Description?: { rich_text: Array<{ plain_text: string }> };
    Slug?: { rich_text: Array<{ plain_text: string }> };
    
    // Bookmark/Project
    Website?: { url: string };
    Logo?: { url: string };
    Stack?: { multi_select: Array<{ name: string }> };
    Thumbnail?: { files: Array<{ file?: { url: string }; external?: { url: string } }> };
    Year?: { select: { name: string } };
    
    // Blog
    Excerpt?: { rich_text: Array<{ plain_text: string }> };
    Cover?: { files: Array<{ file?: { url: string }; external?: { url: string } }> };
    Date?: { date: { start: string } };
    Category?: { select: { name: string } };
    Tags?: { multi_select: Array<{ name: string }> };
    Published?: { checkbox: boolean };
    ReadTime?: { number: number };
    
    // Skill
    Level?: { select: { name: string } };
    Icon?: { rich_text: Array<{ plain_text: string }> };
    
    // Experience
    Organization?: { rich_text: Array<{ plain_text: string }> };
    Location?: { rich_text: Array<{ plain_text: string }> };
    Period?: { rich_text: Array<{ plain_text: string }> };
    Type?: { select: { name: string } };
    Current?: { checkbox: boolean };
  };
  created_time: string;
  last_edited_time: string;
}

export interface NotionBlock {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
