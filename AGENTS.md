# AGENTS.md

## Commands

```bash
npm run dev          # dev server (localhost:3000)
npm run build        # production build (static export via CI)
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
npm run format       # Prettier (singleQuote, trailingComma es5, printWidth 100)
npm run format:check # Prettier check only
```

Pre-commit runs `lint-staged` (Prettier + ESLint on staged `*.{js,jsx,ts,tsx}`). Commit messages must follow conventional commits (`npx --no -- commitlint --edit $1`).

## Architecture

- **Next.js 15** App Router, TypeScript, Tailwind CSS (`class` dark mode), `@/*` → `./src/*`
- **Notion CMS** with 4 databases (bookmarks, blog, skills, experience). Each query function falls back to a local JSON file in `data/` if Notion env vars are missing or the API call fails.
- **ISR** everywhere: `export const revalidate = 3600`
- **Static export** via CI (GitHub Actions → GitHub Pages). The workflow at `.github/workflows/nextjs.yml` uses `actions/configure-pages` which auto-injects `basePath` and disables image optimization — do NOT add `output: 'export'` manually to `next.config.ts`.
- **`reactStrictMode: false`** in `next.config.ts`
- **Contact form** uses Web3Forms (server-side proxy at `src/app/api/contact/route.ts`). In dev mode without `NEXT_PUBLIC_WEB3FORMS_KEY`, messages are logged but not sent.

## Required env vars (`.env.local`)

```env
NOTION_API_KEY=...
NOTION_DATABASE_ID=...        # bookmarks
NOTION_BLOG_DATABASE_ID=...   # blog posts
NOTION_SKILLS_DATABASE_ID=... # skills
NOTION_EXPERIENCE_DATABASE_ID=...
NEXT_PUBLIC_WEB3FORMS_KEY=... # contact form
NEXT_PUBLIC_GITHUB_USERNAME=  # activity page (public API; optional GITHUB_TOKEN for higher rate limits)
REVALIDATE_TIME=3600
```

All env vars are optional — without them, the site uses JSON fallback data from `data/`.

## Structure

```
src/
  app/(personal)/        # page routes: home(/), about, blog/[slug], projects, contact, activity
  app/api/contact/       # contact form handler (POST)
  app/provider.tsx       # ThemeProvider + QueryClientProvider
  components/            # ui/, layout/, about/, blog/, contact/, activity/, home/, projects/, mobile/, skeletons/, timeline/
  lib/
    notion/              # client.ts, queries.ts, parser.ts, types.ts
    github/              # api.ts, types.ts (GitHub activity feed)
    validations/contact.ts  # Zod schema for contact form
  app/globals.css        # CSS custom properties for light/dark themes + utility classes
```

## Deployment

- CI pushes to `main` trigger build + deploy to GitHub Pages (`./out`)
- Also runs on a cron every 5 minutes (so Notion content updates propagate quickly)
- Vercel deploy is also supported

## Notes

- `next.config.ts` has `images.remotePatterns` for notion.so, s3, dev.to, medium.com
- `next.config.ts` has `reactStrictMode: false`
- Blog uses `generateStaticParams` for static generation of post pages
