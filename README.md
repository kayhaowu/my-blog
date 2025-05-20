# My Next.js Blog

This is a personal blog built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Velite](https://velite.js.org/) for content management. It's designed to be a space for sharing thoughts and learnings on web development and other technical topics.

## Features

- **Blog Posts**: Content is written in MDX and managed by Velite.
- **Categories & Tags**: Posts can be organized and browsed by categories and tags.
- **Site Search**: Real-time search functionality to find posts by title or description.
- **Responsive Design**: Optimized for various screen sizes.
- **Syntax Highlighting**: Code blocks are styled for readability.
- **(More features to come!)**

## Getting Started

First, ensure you have Node.js and pnpm (or your preferred package manager) installed.

1. **Clone the repository (if you haven't already):**

   ```bash
   git clone <your-repository-url>
   cd my-blog
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content Management

Blog posts are located in the `content/blog` directory as `.mdx` files. Velite processes these files, and you can define the schema for your posts (including frontmatter like title, description, date, categories, and tags) in `velite.config.ts`.

When you add or modify content, Velite will automatically update the data available to your application during development.

## Key Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Velite**: Tool for transforming local content (like MDX/JSON/YAML) into type-safe data layers.
- **MDX**: Markdown with JSX capabilities, allowing for rich content creation.
- **Shadcn/ui**: Re-usable components built using Radix UI and Tailwind CSS.

## Project Structure Highlights

- `src/app/`: Main application routes (App Router).
  - `src/app/blog/`: Blog listing and individual post pages.
  - `src/app/blog/categories/[category]/`: Dynamic pages for categories.
  - `src/app/blog/tags/[tag]/`: Dynamic pages for tags.
- `src/components/`: Reusable React components.
- `src/config/`: Site configuration files (e.g., `site.ts`).
- `src/lib/`: Utility functions.
- `content/blog/`: Location of your MDX blog posts.
- `velite.config.ts`: Configuration for Velite, defining content schemas.
- `public/`: Static assets.

## Learn More

To learn more about the core technologies, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Velite Documentation](https://velite.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

_This README was last updated on 2025年5月20日._
