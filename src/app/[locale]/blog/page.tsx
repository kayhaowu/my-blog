import { posts } from "#site/content";
import { QueryPagination } from "@/components/query-pagination";
import { formatDate, sortPosts } from "@/lib/utils";
import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: { en: "/en/blog", "zh-Hant": "/zh-TW/blog" },
    },
  };
}

const POSTS_PRE_PAGE = 5;

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const sortedPosts = sortPosts(
    posts.filter((post) => post.published && post.locale === locale)
  );
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PRE_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PRE_PAGE * (currentPage - 1),
    POSTS_PRE_PAGE * currentPage
  );

  return (
    <div className="container max-w-4xl py-10 lg:py-16">
      <header className="mb-12">
        <h1 className="font-display text-4xl md:text-6xl tracking-tight text-foreground">
          {t("title")}
        </h1>
        <div className="w-16 h-px bg-accent mt-4" />
        <p className="text-muted-foreground text-lg mt-4">
          {t("subtitle")}
        </p>
      </header>

      {displayPosts?.length > 0 ? (
        <div className="divide-y divide-border">
          {displayPosts.map((post, index) => {
            const { slug, date, title, description, readingTime, categories, tags } = post;
            return (
              <article
                key={slug}
                className="py-8 animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <Link href={`/blog/${post.slugAsParams}`} className="group flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <div className="min-w-[100px] shrink-0">
                    <time
                      dateTime={date}
                      className="text-sm font-mono text-muted-foreground"
                    >
                      {formatDate(date, locale)}
                    </time>
                    {readingTime && (
                      <p className="text-xs font-mono text-muted-foreground mt-1">
                        {readingTime} {t("minRead")}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <h2 className="font-display text-xl md:text-2xl tracking-tight group-hover:text-accent transition-colors">
                      {title}
                    </h2>
                    {description && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {categories && categories.length > 0 &&
                        categories.map((category) => (
                          <span
                            key={category}
                            className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
                          >
                            {category}
                          </span>
                        ))}
                      {tags && tags.length > 0 &&
                        tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-sage/10 text-sage"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          {t("noResults")}
        </p>
      )}

      <Suspense>
        <QueryPagination totalPages={totalPages} className="justify-center mt-12" />
      </Suspense>
    </div>
  );
}
