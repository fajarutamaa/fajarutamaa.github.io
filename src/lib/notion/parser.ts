import { NotionPage, Bookmark, BlogPost, Skill, Experience } from './types';

/**
 * Parse a Notion page into a Bookmark object
 */
export function parseNotionPage(page: NotionPage): Bookmark {
  const properties = page.properties;
  const name = properties.Name?.title?.[0]?.plain_text || '';
  const description = properties.Description?.rich_text?.[0]?.plain_text || '';
  const website = properties.Website?.url || '';
  const logo = properties.Logo?.url || '/google.png';
  const stack = properties.Stack?.multi_select?.map((item) => item.name) || [];
  
  let thumbnail = '/img/placeholder.webp';
  if (properties.Thumbnail?.files?.[0]) {
    const file = properties.Thumbnail.files[0];
    thumbnail = file.file?.url || file.external?.url || thumbnail;
  }

  const year = properties.Year?.select?.name || new Date().getFullYear().toString();
  const slug = properties.Slug?.rich_text?.[0]?.plain_text || name.toLowerCase().replace(/\s+/g, '-');

  return {
    id: page.id,
    name,
    description,
    website,
    logo,
    stack,
    thumbnail,
    year,
    slug,
    createdAt: page.created_time,
    updatedAt: page.last_edited_time,
  };
}

export function parseNotionBlogPost(page: NotionPage): BlogPost {
  const properties = page.properties;
  const title = properties.Name?.title?.[0]?.plain_text || properties.Title?.title?.[0]?.plain_text || 'Untitled';
  const slug = properties.Slug?.rich_text?.[0]?.plain_text || title.toLowerCase().replace(/\s+/g, '-');
  const excerpt = properties.Excerpt?.rich_text?.[0]?.plain_text || properties.Description?.rich_text?.[0]?.plain_text || '';
  const date = properties.Date?.date?.start || page.created_time;
  const category = properties.Category?.select?.name || 'Uncategorized';
  const tags = properties.Tags?.multi_select?.map((item) => item.name) || [];
  const published = properties.Published?.checkbox ?? true;
  const readTime = properties.ReadTime?.number ? `${properties.ReadTime.number} min read` : '5 min read';

  let coverImage = '/img/placeholder.webp';
  if (properties.Cover?.files?.[0]) {
    const file = properties.Cover.files[0];
    coverImage = file.file?.url || file.external?.url || coverImage;
  } else if (properties.Thumbnail?.files?.[0]) {
    const file = properties.Thumbnail.files[0];
    coverImage = file.file?.url || file.external?.url || coverImage;
  }

  return {
    id: page.id,
    title,
    slug,
    excerpt,
    coverImage,
    date,
    readTime,
    category,
    tags,
    published,
  };
}

export function parseNotionSkill(page: NotionPage): Skill {
  const properties = page.properties;
  const name = properties.Name?.title?.[0]?.plain_text || '';
  const category = (properties.Category?.select?.name as Skill['category']) || 'Tools & Others';
  const level = (properties.Level?.select?.name as Skill['level']) || 'Beginner';
  const icon = properties.Icon?.rich_text?.[0]?.plain_text || '';

  return {
    id: page.id,
    name,
    category,
    level,
    icon,
  };
}

export function parseNotionExperience(page: NotionPage): Experience {
  const properties = page.properties;
  const title = properties.Name?.title?.[0]?.plain_text || ''; // Role/Title
  const organization = properties.Organization?.rich_text?.[0]?.plain_text || '';
  const location = properties.Location?.rich_text?.[0]?.plain_text || '';
  const period = properties.Period?.rich_text?.[0]?.plain_text || '';
  const description = properties.Description?.rich_text?.[0]?.plain_text || '';
  const type = (properties.Type?.select?.name?.toLowerCase() as Experience['type']) || 'work';
  const current = properties.Current?.checkbox || false;

  return {
    id: page.id,
    title,
    organization,
    location,
    period,
    description,
    type,
    current,
  };
}

export function parseNotionPages(pages: NotionPage[]): Bookmark[] {
  return pages.map(parseNotionPage);
}
