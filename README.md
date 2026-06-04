# Portfolio Website

A modern portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Notion as a headless CMS.

## Features

- **Notion CMS** — 4 databases (bookmarks, blog, skills, experience) with automatic JSON fallback
- **Dark/Light Mode** — System preference with manual toggle
- **ISR** — Incremental Static Regeneration for fast loads
- **SEO** — Dynamic sitemap.xml, robots.txt, RSS feed for blog
- **Animations** — Scroll reveal, page transitions, floating orbs
- **Activity Feed** — GitHub contribution timeline with heatmap
- **Contact Form** — Server-side proxy via Web3Forms with Zod validation
- **Floating CTA** — "Let's Talk" button appears on scroll
- **Cookie Consent** — Privacy banner for Umami analytics
- **Services Section** — Showcase offerings on the home page
- **Responsive** — Mobile-first with bottom navigation on small screens
- **Graceful Fallback** — All content works without Notion env vars

## Getting Started

### Prerequisites

- Node.js 18+
- Optional: Notion account (site works without it)

### Installation

```bash
git clone <repo-url>
cd fajarutamaa.github.io
npm install
cp .env.example .env.local
npm run dev
```

### Environment Variables

All variables are optional — without them, the site uses JSON fallback data.

```env
NOTION_API_KEY=                     # Notion integration token
NOTION_DATABASE_ID=                 # Bookmarks database
NOTION_BLOG_DATABASE_ID=            # Blog posts database
NOTION_SKILLS_DATABASE_ID=          # Skills database
NOTION_EXPERIENCE_DATABASE_ID=      # Experience database
NEXT_PUBLIC_WEB3FORMS_KEY=          # Contact form (Web3Forms)
NEXT_PUBLIC_GITHUB_USERNAME=        # GitHub activity feed
GITHUB_TOKEN=                       # Higher rate limit for GitHub API
REVALIDATE_TIME=3600                # ISR revalidation interval
```

## Scripts

```bash
npm run dev          # dev server at localhost:3000
npm run build        # production build (static export via CI)
npm run start        # start production server
npm run lint         # ESLint
npm run format       # Prettier write
npm run format:check # Prettier check
```

## Project Structure

```
src/
  app/
    sitemap.ts              # auto-generated sitemap.xml
    robots.ts               # robots.txt
    rss.xml/route.ts        # RSS feed
    (personal)/             # page routes: /, /about, /blog, /projects, /activity, /contact
    api/contact/            # contact form POST handler
    layout.tsx              # root layout + Umami + Google Search Console
    globals.css             # design tokens, animations, utilities
  components/
    ui/                     # Hero, BookmarkCard, ErrorBoundary, Reveal, FloatingCTA, CookieConsent
    layout/                 # Header, Footer
    about/                  # SkillsGrid, Timeline
    blog/                   # NotionBlockRenderer, ShareButtons, ReadingProgressBar
    contact/                # ContactForm
    activity/               # ActivityTimeline, ContributionHeatmap, TimelineItem
    mobile/                 # BottomNavigation
    skeletons/              # Shimmer loading states
  hooks/
    useReveal.ts            # IntersectionObserver scroll reveal hook
  lib/
    notion/                 # Notion client, queries, parser, types
    github/                 # GitHub activity API
    validations/contact.ts  # Zod schema
data/                       # JSON fallback files (bookmarks, blog, skills, experience, services)
```

## Notion CMS

Each section (bookmarks, blog, skills, experience) queries a Notion database and falls back to a JSON file in `data/` if env vars are missing.

👉 **[Setup Guide](./docs/NOTION_SETUP.md)**

## Deployment

**Primary**: GitHub Actions pushes to `main` → static export → GitHub Pages. Also runs on a 5-minute CRON.

**Alternative**: Vercel (connect repo, add env vars, deploy).

## License

MIT

