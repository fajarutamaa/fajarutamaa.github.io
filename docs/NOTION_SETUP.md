# Notion CMS Setup Guide

This guide will walk you through setting up Notion as a CMS for your portfolio website.

## Prerequisites

- A Notion account (free or paid)
- Access to your Notion workspace

## Step 1: Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Fill in the integration details:
   - **Name**: Portfolio CMS (or any name you prefer)
   - **Associated workspace**: Select your workspace
   - **Type**: Internal integration
4. Click **"Submit"**
5. Copy the **"Internal Integration Token"** - you'll need this later

## Step 2: Create a Notion Database

1. In your Notion workspace, create a new page
2. Add a **Database - Table** to the page
3. Name it "Bookmarks" or "Projects"
4. Add the following properties to your database:

### Required Properties

| Property Name | Property Type | Description |
|--------------|---------------|-------------|
| `Name` | Title | The name/title of the bookmark |
| `Description` | Text | A brief description |
| `Website` | URL | The URL to the project/bookmark |
| `Thumbnail` | Files & media | Main image/screenshot |
| `Year` | Select | Year of the project (e.g., 2024, 2023) |

### Optional Properties

| Property Name | Property Type | Description |
|--------------|---------------|-------------|
| `Logo` | URL | URL to a logo image |
| `Stack` | Multi-select | Technologies used (e.g., React, Node.js) |
| `Slug` | Text | URL-friendly identifier |

## Step 3: Create Additional Databases

To fully power the portfolio, you need to create three more databases. You can duplicate the structure below or create them manually.

### A. Blog Database
Used for the `/blog` page.

**Properties:**
- **Name** (Title): Title of the blog post
- **Slug** (Text): URL-friendly identifier (e.g., `getting-started-nextjs`)
- **Date** (Date): Publication date
- **Category** (Select): e.g., `Tutorial`, `Development`, `Life`
- **Excerpt** (Text): Short summary of the post
- **ReadTime** (Text): e.g., `5 min read`
- **Published** (Checkbox): Check to show on the site

### B. Skills Database
Used for the `/about` page skills section.

**Properties:**
- **Name** (Title): Name of the skill (e.g., `React`, `TypeScript`)
- **Category** (Select): Must be one of: `Frontend`, `Backend`, `Tools & Others`
- **Level** (Select): Must be one of: `Beginner`, `Intermediate`, `Advanced`, `Expert`

### C. Experience Database
Used for the `/about` page timeline section.

**Properties:**
- **Title** (Title): Job title or Degree (e.g., `Senior Frontend Engineer`)
- **Organization** (Text): Company or University name
- **Location** (Text): e.g., `Remote`, `Jakarta, Indonesia`
- **Period** (Text): e.g., `2023 - Present`, `2019 - 2023`
- **Type** (Select): Must be `work` or `education`
- **Description** (Text): Brief description of responsibilities or achievements
- **Current** (Checkbox): Check if this is your current role

## Step 4: Connect Databases to Integration

For **EACH** of the 4 databases (Bookmarks, Blog, Skills, Experience):
1. Open the database page.
2. Click `...` (three dots) at the top right.
3. Scroll down to `Connections`.
4. Select your integration (`Portfolio CMS`).

## Step 5: Get Database IDs

For each database, get the ID from the URL:
`https://www.notion.so/myworkspace/DATABASE_ID?v=...`

Update your `.env.local` file:

```env
NOTION_API_KEY=your_integration_token_here
NOTION_DATABASE_ID=...            # Bookmarks
NOTION_BLOG_DATABASE_ID=...       # Blog
NOTION_SKILLS_DATABASE_ID=...     # Skills
NOTION_EXPERIENCE_DATABASE_ID=... # Experience
REVALIDATE_TIME=3600
```

Replace:
- `your_integration_token_here` with the token from Step 1
- `NOTION_DATABASE_ID` with the ID from your Bookmarks database
- `NOTION_BLOG_DATABASE_ID` with the ID from your Blog database
- `NOTION_SKILLS_DATABASE_ID` with the ID from your Skills database
- `NOTION_EXPERIENCE_DATABASE_ID` with the ID from your Experience database

## Step 6: Add Content

1. Go to your Notion database
2. Click **"+ New"** to add a new entry
3. Fill in all the required fields:
   - **Name**: Project name
   - **Description**: Brief description
   - **Website**: Full URL (including https://)
   - **Thumbnail**: Upload an image or paste an image URL
   - **Year**: Select or create a year option
   - **Stack** (optional): Add technology tags
   - **Logo** (optional): Paste a logo URL
   - **Slug** (optional): URL-friendly name (auto-generated if empty)

## Step 7: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. Your bookmarks should now be loaded from Notion!

## Troubleshooting

### "No bookmarks found"
- Check that your database has entries
- Verify the database is shared with your integration
- Ensure all required fields are filled

### "Error fetching from Notion"
- Verify your `NOTION_API_KEY` is correct
- Check that `NOTION_DATABASE_ID` matches your database
- Ensure the integration has access to the database

### Fallback to JSON
If Notion fails, the app will automatically fall back to `/data/bookmarks.json`. This ensures your site always works, even if Notion is unavailable.

## Database Schema Example

Here's an example of how your database should look:

| Name | Description | Website | Thumbnail | Year | Stack | Logo | Slug |
|------|-------------|---------|-----------|------|-------|------|------|
| Google Style Guides | Style guides for google-originated open-source projects | https://google.github.io/styleguide/ | [image] | 2024 | google, open-source | [url] | google-style-guides |
| Node.js Best Practices | The Node.js best practices list | https://github.com/goldbergyoni/nodebestpractices | [image] | 2024 | best-practices, node-js | [url] | nodejs-best-practices |

## Benefits of Using Notion CMS

✅ **Easy Content Management**: Update content directly in Notion without touching code  
✅ **Rich Editing**: Use Notion's powerful editor for descriptions  
✅ **Collaboration**: Share database with team members  
✅ **Version History**: Notion tracks all changes  
✅ **Automatic Sync**: Changes appear on your site after revalidation  
✅ **Fallback Support**: Site works even if Notion is down  

## Next Steps

- Add more entries to your database
- Customize the database properties to fit your needs
- Set up automatic deployments to see changes live
- Consider adding more content types (blog posts, testimonials, etc.)

## Support

If you encounter any issues, check:
1. [Notion API Documentation](https://developers.notion.com/)
2. [Next.js ISR Documentation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
3. Your project's GitHub issues
