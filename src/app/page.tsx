import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content"; // Content from Velite
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import type { Metadata } from "next"; // Added for Metadata

// Metadata for the Home page
export const metadata: Metadata = {
  title: "Home", // This will combine with title.template in layout.tsx
  description: "Welcome to my blog template. Built using tailwind, shadcn, velite and Nextjs 14.",
};

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      {/* Hero Section with Gradient Background */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32 bg-gradient-to-r from-blue-400 to-purple-400 text-white">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            Hello, I&apos;m Kay
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Welcome to my blog template. Built using tailwind, shadcn, velite
            and Nextjs 14.
          </p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: "outline",size: "lg" }),
              "w-full sm:w-fit hover:shadow-lg hover:border-blue-500 hover:bg-white hover:text-blue-500",
              "bg-transparent text-white border-white ")}
            >
              View my blog
            </Link>
            {/* 修改 GitHub 按鈕的 hover 效果 */}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-fit hover:shadow-lg hover:border-blue-500 hover:bg-white hover:text-blue-500",
              "bg-transparent text-white border-white"
              )} // 初始為透明底白字白邊，hover 時變白底藍字藍邊
            >
              Github
            </Link>
          </div>
        </div>
      </section>
      {/* Latest Posts Section */}
      {/* Reduced top margin from mt-60 to mt-24 for better spacing */}
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-24">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            // Added hover effect to list items
            <li key={post.slug} className="first:border-t first:border-border border-b border-border py-4 hover:bg-muted/50 transition-colors">
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description} // Ensure PostItem uses this
                date={post.date}
                categories={post.categories} // Pass categories to PostItem
                tags={post.tags} // Pass tags to PostItem
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
