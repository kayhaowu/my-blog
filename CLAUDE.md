# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` - Runs Next.js development server on http://localhost:3000
- **Build**: `pnpm build` - Creates production build
- **Start production**: `pnpm start` - Starts production server
- **Lint**: `pnpm lint` - Runs ESLint checks
- **Test**: `pnpm test` - Runs Vitest tests (note: limited test coverage currently)

## Architecture Overview

This is a Next.js 14 blog using the App Router pattern with the following key technologies:

### Content Management
- **Velite**: Transforms MDX files in `content/blog/` into type-safe data
- Content is processed during build time via a custom Webpack plugin in `next.config.mjs`
- Schema defined in `velite.config.ts` with posts supporting title, description, date, categories, tags
- Generated content types available via `#site/content` import alias

### Key Directories
- `src/app/`: Next.js App Router pages and API routes
- `src/components/`: Reusable React components including shadcn/ui components
- `src/config/`: Site configuration (site.ts contains metadata, URLs, author info)
- `content/blog/`: MDX blog posts processed by Velite
- `public/static/`: Generated static assets from Velite

### Styling & UI
- **Tailwind CSS** with shadcn/ui components
- Configuration in `components.json` points to `@/components` and `@/lib/utils`
- Global styles in `src/app/globals.css`
- Custom MDX styles in `src/styles/mdx.css`

### TypeScript Configuration
- Path aliases: `@/*` → `src/*` and `#site/content` → `.velite`
- Strict mode enabled
- Velite generates TypeScript definitions for content

### Blog Features
- Dynamic routing: `/blog/[...slug]` for individual posts
- Category pages: `/blog/categories/[category]`
- Tag pages: `/blog/tags/[tag]`
- Search functionality via search-bar component
- Pagination support
- Giscus comments integration

### Database & Authentication
- MySQL2 dependency suggests database usage
- SAML authentication setup in `src/app/api/auth/[...saml]/`
- Stock API routes in `src/app/api/stock/`

## Important Notes

- Content changes require Velite to regenerate during development
- Package manager is pnpm (evidenced by pnpm-lock.yaml)
- Site configuration in `src/config/site.ts` contains author and social links
- No comprehensive test suite currently exists despite Vitest being configured