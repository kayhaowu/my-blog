# KayBlog

Personal blog & portfolio built with Next.js 16, Velite, and Tailwind CSS.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Velite](https://img.shields.io/badge/Velite-0.1-orange)](https://velite.js.org/)

**Live:** [my-blog-six-blush.vercel.app](https://my-blog-six-blush.vercel.app)

---

## Tech Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Framework | Next.js 16 (App Router, Turbopack) | SSR / SSG / API routes |
| Content | Velite + MDX | Type-safe content pipeline from Markdown |
| Styling | Tailwind CSS + shadcn/ui | Utility-first CSS + Radix UI primitives |
| Typography | Fraunces / Plus Jakarta Sans / Fira Code | Display serif / body sans / monospace |
| 3D | Three.js + React Three Fiber | Animated hero section |
| Comments | Giscus | GitHub Discussions-powered comments |
| Math | KaTeX + remark-math | LaTeX equation rendering |
| Deployment | Vercel | Edge-optimized hosting |

## Getting Started

```bash
# Clone
git clone https://github.com/kayhaowu/my-blog.git
cd my-blog

# Install dependencies
pnpm install

# Start dev server (http://localhost:3000)
pnpm dev

# Production build
pnpm build && pnpm start
```

**Requirements:** Node.js 18+, pnpm

## Project Structure

```
├── content/
│   └── blog/                  # MDX blog posts (Velite source)
├── public/                    # Static assets (images, fonts)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         #   Root layout (fonts, providers, header/footer)
│   │   ├── page.tsx           #   Home page (3D hero + featured/latest posts)
│   │   ├── template.tsx       #   Page transition animation wrapper
│   │   ├── globals.css        #   CSS variables, animations, prose overrides
│   │   ├── about/             #   About / portfolio page
│   │   ├── blog/              #   Blog listing + dynamic post pages
│   │   │   ├── page.tsx       #     Editorial post list with pagination
│   │   │   ├── [...slug]/     #     Individual post viewer (MDX + Giscus)
│   │   │   ├── categories/    #     Filter by category
│   │   │   └── tags/          #     Filter by tag
│   │   └── api/
│   │       └── og/            #   Dynamic OG image generation (Edge)
│   ├── components/            # React components
│   │   ├── ui/                #   shadcn/ui (button, card, avatar, sheet, etc.)
│   │   ├── site-header.tsx    #   Sticky header with search + nav
│   │   ├── site-footer.tsx    #   Editorial footer
│   │   ├── post-item.tsx      #   Blog post card
│   │   ├── search-bar.tsx     #   Real-time post search (useMemo)
│   │   ├── mdx-components.tsx #   MDX runtime renderer + custom components
│   │   ├── three-hero.tsx     #   Three.js animated hero background
│   │   └── ...                #   Nav, pagination, icons, tables, etc.
│   ├── config/                # Site metadata + Giscus config
│   ├── lib/                   # Utility functions (cn, formatDate, sortPosts)
│   └── styles/
│       └── mdx.css            # Code block + syntax highlighting styles
├── velite.config.ts           # Content schema & MDX plugin pipeline
├── tailwind.config.ts         # Theme (colors, fonts, animations)
└── next.config.mjs            # Velite webpack plugin integration
```

## Architecture

### Content Pipeline

Blog posts are MDX files in `content/blog/`. [Velite](https://velite.js.org/) processes them at build time into type-safe data accessible via `#site/content`.

```
content/blog/*.mdx
       │
       ▼
  ┌──────────┐     remark-math        rehype-slug
  │  Velite   │ ──► rehype-katex   ──► rehype-pretty-code ──► rehype-autolink
  └──────────┘     (LaTeX)            (syntax highlight)      (anchor links)
       │
       ▼
  .velite/         ← TypeScript types + compiled MDX
  public/static/   ← Processed images/assets
```

Each post has a schema-validated frontmatter:

```yaml
title: "Post Title"
description: "Optional description"
date: 2024-01-15
published: true
featured: false
categories: ["DevOps"]
tags: ["Kubernetes", "Docker"]
```

Velite computes `readingTime`, `wordCount`, and `slugAsParams` automatically.

### App Router Structure

All pages use React Server Components by default. Client components (`"use client"`) are limited to interactive elements: search bar, navigation, theme toggle, Three.js hero, and Giscus comments.

- **Static pages** (`/`, `/about`, `/blog`) — pre-rendered at build time
- **SSG pages** (`/blog/[slug]`, `/blog/categories/[cat]`, `/blog/tags/[tag]`) — generated via `generateStaticParams()`
- **Dynamic routes** (`/api/og`) — Edge Runtime for OG image generation

### Design System — "Warm Ink"

An editorial theme with warm tones and serif display typography.

**Fonts:**
- **Display:** Fraunces (soft serif for headings)
- **Body:** Plus Jakarta Sans (geometric sans)
- **Mono:** Fira Code (code blocks + metadata)

**Colors (CSS variables in `globals.css`):**
- Light mode: warm ivory `#faf7f2` background, near-black text
- Dark mode: near-black `#0a0a0a` background, warm off-white text
- Accent: terracotta copper `hsl(25 72% 59%)`
- Tags: sage green `hsl(145 20% 52%)`

**Components:** Built on [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind). Button, Card, Avatar, Sheet, Dropdown, Pagination, and Input.

## Writing a New Post

1. Create a new `.mdx` file in `content/blog/`:

```bash
touch content/blog/my-new-post.mdx
```

2. Add frontmatter:

```mdx
---
title: "My New Post"
description: "A short description for SEO and previews"
date: 2024-03-19
published: true
featured: false
categories: ["DevOps"]
tags: ["Kubernetes"]
---

Your content here. Supports **Markdown**, `code blocks`,
LaTeX math ($E = mc^2$), and custom components like:

<Callout type="warning">
  This is a warning callout.
</Callout>
```

3. Run `pnpm dev` — Velite auto-rebuilds and the post appears on the site.

**Available MDX components:** `Callout`, `CustomImage`, `ComparisonTable`, `IPv6AddressTable`, `IPv6ConfigTable`, `IEEE80211Table`

## Deployment

The site is deployed on [Vercel](https://vercel.com/). Push to `main` triggers automatic deployment.

**Environment variables** (set in Vercel dashboard):
- `NEXT_PUBLIC_APP_URL` — Production URL for metadata

**One-click deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kayhaowu/my-blog)

## License

MIT
