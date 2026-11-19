# Portfolio Website

A modern portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Notion as a headless CMS.

## Features

- **Notion CMS** — 4 databases (bookmarks, blog, skills, experience) with automatic JSON fallback
- **Dark/Light Mode** — System preference with manual toggle
- **ISR** — Incremental Static Regeneration for fast loads
- **SEO** — Dynamic sitemap.xml, robots.txt, RSS feed for blog
- **Reading List** — Save blog posts for later in your browser, without an account
- **Search Playground** — Experiment with filters and see how keywords affect ranking
- **Website Status** — Sampled availability, response times, and GitHub Pages deploy history
- **Accessible UI** — Keyboard navigation, clear focus states, and reduced-motion support
- **Activity Feed** — GitHub contribution timeline with heatmap
- **Contact Form** — Server-side proxy via Web3Forms with Zod validation
- **Cookie Consent** — Privacy banner for Umami analytics
- **Services Section** — Showcase offerings on the home page
- **Responsive** — Mobile-first with bottom navigation on small screens
- **Graceful Fallback** — All content works without Notion env vars

## Getting Started

### Prerequisites

- Node.js 22+ (matches CI and supports the built-in TypeScript test runner)
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
```

## Scripts

```bash
npm run dev          # dev server at localhost:3000
npm run build        # production build (static export via CI)
npm run start        # start production server
npm run lint         # ESLint
npm test             # unit tests
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
    (personal)/             # page routes: /, /about, /blog, /projects, /activity, /contact, /playground
    api/contact/            # contact form POST handler
    layout.tsx              # root layout + Umami + Google Search Console
    globals.css             # design tokens, animations, utilities
  components/
    ui/                     # Hero, BookmarkCard, ErrorBoundary, CookieConsent
    layout/                 # Header, Footer
    about/                  # SkillsGrid, Timeline
    blog/                   # NotionBlockRenderer, ShareButtons, ReadingProgressBar
    contact/                # ContactForm
    playground/             # Interactive search demo
    timeline/               # ActivityTimeline, ContributionHeatmap, TimelineItem
    mobile/                 # BottomNavigation
    skeletons/              # Shimmer loading states
  hooks/
    useUrlFilters.ts        # Shareable search and filter state
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

### Status monitoring

The **Monitor website status** GitHub Actions workflow checks the production homepage and
queries the Pages deployment workflow on the default branch. After merging to `main`, wait for
the next scheduled run or run it once manually from the Actions tab. The first successful run
creates the `status-data` branch and publishes a public `status.json` with seven days of checks
and the latest deployment summary. No additional secrets are needed; the workflow uses the
repository token and requires permission to push to `status-data`.

The static `/status` page reads that public snapshot and refreshes about once a minute while
visible. Actions aims to run every five minutes, but runs and raw-file updates can be delayed.
Availability describes successful samples (HTTP 2xx), not continuous uptime. The dashboard
flags the last measurement as stale after 20 minutes. A fork needs to update the production
URL in `scripts/collect-status.mjs` and the repository in `src/lib/status/snapshot.ts`.

## License

MIT
