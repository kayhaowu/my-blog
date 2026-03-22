import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import GiscusComments from "@/components/giscus-comments";
import "katex/dist/katex.min.css";
import { cache, Suspense } from "react";
import { notFound } from "next/navigation";
import { giscusConfig } from "@/config/giscus";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";
import { PostLanguageToggle } from "@/components/post-language-toggle";

interface PostPageProps {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
}

const getPostFromParams = cache(async (params: PostPageProps["params"]) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.join("/");
  const locale = resolvedParams?.locale;
  const post = posts.find(
    (post) => post.slugAsParams === slug && post.locale === locale
  );

  return post;
});

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  // Build alternates only if a paired post exists in the other locale
  const pairedPost = posts.find(
    (p) =>
      p.slugAsParams === post.slugAsParams &&
      p.locale !== post.locale &&
      p.published
  );
  const alternates = pairedPost
    ? {
        languages: {
          en: `/en/blog/${post.slugAsParams}`,
          "zh-Hant": `/zh-TW/blog/${post.slugAsParams}`,
        },
      }
    : undefined;

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    alternates,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  { locale: string; slug: string[] }[]
> {
  return posts.map((post) => ({
    locale: post.locale,
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-12 md:py-20 px-4">
      <h1 className="mb-2 font-display text-3xl md:text-5xl tracking-tight text-foreground">
        {post.title}
      </h1>
      {post.description ? (
        <p className="text-lg text-muted-foreground font-light mt-4">{post.description}</p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        {post.categories?.map((category) => (
          <Link
            key={category}
            href={`/blog/categories/${category}`}
            className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 no-underline transition-colors hover:bg-accent/20"
          >
            {category}
          </Link>
        ))}
        {post.tags?.map((tag) => (
          <Link
            key={tag}
            href={`/blog/tags/${tag}`}
            className="text-xs px-3 py-1 rounded-full no-underline transition-colors"
            style={{ color: 'hsl(145 20% 52%)', backgroundColor: 'hsl(145 20% 52% / 0.1)', borderColor: 'hsl(145 20% 52% / 0.2)', borderWidth: '1px', borderStyle: 'solid' }}
          >
            {tag}
          </Link>
        ))}
      </div>
      <div className="mt-4">
        <PostLanguageToggle slugAsParams={post.slugAsParams} locale={resolvedParams.locale} />
      </div>
      <div className="w-16 h-px bg-accent mt-8 mb-12" />
      <div className="prose dark:prose-invert prose-editorial">
        <MDXContent code={post.body} />
      </div>
      <div className="w-16 h-px bg-accent mt-12 mb-8" />
      <Suspense fallback={<div className="h-48 animate-pulse bg-muted rounded" />}>
        <GiscusComments
          repo={giscusConfig.repo}
          repoId={giscusConfig.repoId}
          category={giscusConfig.category}
          categoryId={giscusConfig.categoryId}
          mapping={giscusConfig.mapping}
          reactionsEnabled={giscusConfig.reactionsEnabled}
          emitMetadata={giscusConfig.emitMetadata}
          inputPosition={giscusConfig.inputPosition}
          lang={resolvedParams.locale === "zh-TW" ? "zh-TW" : "en"}
        />
      </Suspense>
    </article>
  );
}
