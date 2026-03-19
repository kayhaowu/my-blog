import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts, formatDate } from "@/lib/utils";
import { posts } from "#site/content"; // Content from Velite
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import type { Metadata } from "next"; // Added for Metadata
import { ThreeHeroLazy } from "@/components/three-hero-lazy";

// Metadata for the Home page
export const metadata: Metadata = {
  title: "Home", // This will combine with title.template in layout.tsx
  description: "Welcome to my blog template. Built using tailwind, shadcn, velite and Nextjs 16.",
};

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  const featuredPosts = sortPosts(posts.filter(post => post.featured)).slice(0, 3);
  return (
    <>
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <ThreeHeroLazy />
        <div className="container flex flex-col items-center text-center relative z-10">
          <div className="w-12 h-px bg-accent mb-8 animate-fade-in" />
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] tracking-[-0.04em] text-foreground text-balance animate-fade-in-up">
            Hello, I&apos;m Kay
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-lg mx-auto mt-6 animate-fade-in-up stagger-2">
            Welcome to my blog template. Built using tailwind, shadcn, velite
            and Nextjs 16.
          </p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row mt-10 animate-fade-in-up stagger-4">
            <Link
              href="/blog"
              className={cn(buttonVariants({ size: "lg" }),
              "w-full sm:w-fit bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg transition-all duration-300")}
            >
              View my blog
            </Link>
            {/* GitHub Button */}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-fit hover:shadow-lg transition-all duration-300"
              )}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="container max-w-6xl py-6 lg:py-10 flex flex-col space-y-6">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-5xl tracking-tight text-foreground">
              Featured Posts
            </h2>
            <div className="w-16 h-px bg-accent mt-4 mx-auto" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostItem
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                readingTime={post.readingTime}
                categories={post.categories}
                tags={post.tags}
              />
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts Section — Editorial List */}
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-12">
        <div>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-foreground">
            Latest Posts
          </h2>
          <div className="w-16 h-px bg-accent mt-4" />
        </div>
        <div className="flex flex-col">
          {latestPosts.map((post) => (
            <article key={post.slug} className="group py-8 border-b border-border">
              <Link href={post.slug} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                <time dateTime={post.date} className="text-sm text-muted-foreground font-mono w-28 shrink-0 pt-1">
                  {formatDate(post.date)}
                </time>
                <div className="flex-1">
                  <h3 className="text-xl font-display group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-muted-foreground mt-1 line-clamp-2">
                      {post.description}
                    </p>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
        <div className="pt-4">
          <Link href="/blog" className="text-accent hover:underline underline-offset-4 transition-colors">
            View all posts &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
