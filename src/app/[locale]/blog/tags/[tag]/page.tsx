import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

interface TagPageProps {
  params: Promise<{
    locale: string;
    tag: string;
  }>;
}

async function getPostsByTag(tagParam: string, locale: string) {
  const decodedTagName = decodeURIComponent(tagParam).toLowerCase();
  const filteredPosts = posts.filter(
    (post) =>
      post.published &&
      post.locale === locale &&
      post.tags?.some((tag) => tag.toLowerCase() === decodedTagName)
  );
  return filteredPosts;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: "blog" });
  const tagName = decodeURIComponent(resolvedParams.tag);
  const title = t("tagTitle", { name: tagName });
  const description = t("tagSubtitle", { name: tagName });
  const tagPath = `/blog/tags/${resolvedParams.tag}`;

  return {
    title,
    description,
    alternates: {
      languages: {
        en: `/en${tagPath}`,
        "zh-Hant": `/zh-TW${tagPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${resolvedParams.locale}${tagPath}`,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export async function generateStaticParams(): Promise<
  { locale: string; tag: string }[]
> {
  const params: { locale: string; tag: string }[] = [];
  for (const locale of routing.locales) {
    const localePosts = posts.filter(
      (p) => p.published && p.locale === locale
    );
    const tags = [...new Set(localePosts.flatMap((p) => p.tags ?? []))];
    for (const tag of tags) {
      params.push({ locale, tag: encodeURIComponent(tag) });
    }
  }
  return params;
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: "blog" });

  const tagName = decodeURIComponent(resolvedParams.tag);
  const displayPosts = await getPostsByTag(
    resolvedParams.tag,
    resolvedParams.locale
  );

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-center gap-4 text-center mb-8">
        <h1 className="inline-block font-black text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          {t("tagTitle", { name: tagName })}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t("tagSubtitle", { name: tagName })}
        </p>
      </div>
      <hr className="my-8" />
      {displayPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <div key={post.slug} className="h-full">
              <PostItem
                slug={post.slugAsParams}
                title={post.title}
                description={post.description}
                date={post.date}
                readingTime={post.readingTime}
                tags={post.tags}
                categories={post.categories}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          {t("tagEmpty", { name: tagName })}
        </p>
      )}
    </div>
  );
}
