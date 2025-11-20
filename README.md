# Portfolio Website with Notion CMS

A modern, scalable portfolio website built with Next.js 15, featuring Notion as a flexible CMS for content management.

## ✨ Features

- 🎨 **Modern UI/UX**: Beautiful design with smooth animations and micro-interactions
- 📝 **Notion CMS**: Manage content easily through Notion database
- 🌓 **Dark/Light Mode**: Seamless theme switching with persistent preferences
- ⚡ **Performance Optimized**: ISR (Incremental Static Regeneration) for fast loading
- 📱 **Fully Responsive**: Works perfectly on all devices
- ♿ **Accessible**: WCAG compliant with keyboard navigation support
- 🎭 **Graceful Fallback**: Automatically falls back to JSON if Notion is unavailable

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Notion account (for CMS features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fajarutamaa.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your Notion credentials:
   ```env
   NOTION_API_KEY=your_notion_integration_token
   NOTION_DATABASE_ID=your_notion_database_id
   REVALIDATE_TIME=3600
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Notion CMS Setup

To use Notion as your CMS, follow the detailed setup guide:

👉 **[Notion Setup Guide](./docs/NOTION_SETUP.md)**

### Quick Setup Summary

1. Create a Notion integration at [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Create a database in Notion with required properties (Name, Description, Website, Thumbnail, Year)
3. Share the database with your integration
4. Copy the integration token and database ID to `.env.local`
5. Add content to your Notion database

## 🏗️ Project Structure

```
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (personal)/        # Personal portfolio pages
│   │   ├── components/        # Shared components (Navbar)
│   │   └── globals.css        # Global styles and design system
│   ├── components/
│   │   └── ui/                # Reusable UI components
│   │       ├── BookmarkCard.tsx
│   │       ├── Hero.tsx
│   │       ├── SocialLinks.tsx
│   │       ├── LoadingState.tsx
│   │       └── ErrorBoundary.tsx
│   └── lib/
│       └── notion/            # Notion integration
│           ├── client.ts      # Notion client setup
│           ├── queries.ts     # Data fetching functions
│           ├── parser.ts      # Response parsers
│           └── types.ts       # TypeScript types
├── data/
│   └── bookmarks.json         # Fallback data (used if Notion fails)
├── docs/
│   └── NOTION_SETUP.md        # Notion setup guide
└── public/                    # Static assets
```

## 🎨 Design System

The project includes a comprehensive design system with:

- **CSS Variables**: Easily customizable colors and spacing
- **Animations**: fadeIn, slideUp, scaleIn, shimmer, float, gradient, wave
- **Utility Classes**: glass, gradient-text, hover-lift
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Focus states, ARIA labels, keyboard navigation

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Notion API
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **UI Components**: NextUI (Tooltip)
- **Notifications**: Sonner

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
   - `REVALIDATE_TIME`
4. Deploy!

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Railway
- Render

## 🔄 Content Management

### Using Notion (Recommended)

1. Open your Notion database
2. Add/edit/delete entries
3. Changes will appear on your site after the revalidation period (default: 1 hour)
4. For immediate updates, trigger a revalidation or redeploy

### Using JSON (Fallback)

If you prefer not to use Notion, you can edit `data/bookmarks.json` directly:

```json
[
  {
    "name": "Project Name",
    "description": "Project description",
    "website": "https://example.com",
    "thumbnail": "/img/thumbnail.webp",
    "year": "2024",
    "stack": ["React", "Node.js"],
    "logo": "/logo.png"
  }
]
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Notion](https://www.notion.so/) - All-in-one workspace
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Contact

- **GitHub**: [@fajarutamaa](https://github.com/fajarutamaa)
- **LinkedIn**: [Fajar Dwi Utomo](https://www.linkedin.com/in/fajardwiutomo/)
- **Medium**: [@fajardwiutomo](https://medium.com/@fajardwiutomo)

---

Made with ❤️ by [Fajar Dwi Utomo](https://github.com/fajarutamaa)

