import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

async function getPostsByCategory(categoryParam: string, locale: string) {
  const decodedCategoryName = decodeURIComponent(categoryParam).toLowerCase();
  const filteredPosts = posts.filter(
    (post) =>
      post.published &&
      post.locale === locale &&
      post.categories?.some((cat) => cat.toLowerCase() === decodedCategoryName)
  );
  return filteredPosts;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: "blog" });
  const categoryName = decodeURIComponent(resolvedParams.category);
  const title = t("categoryTitle", { name: categoryName });
  const description = t("categorySubtitle", { name: categoryName });
  const categoryPath = `/blog/categories/${resolvedParams.category}`;

  return {
    title,
    description,
    alternates: {
      languages: {
        en: `/en${categoryPath}`,
        "zh-Hant": `/zh-TW${categoryPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${resolvedParams.locale}${categoryPath}`,
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
  { locale: string; category: string }[]
> {
  const params: { locale: string; category: string }[] = [];
  for (const locale of routing.locales) {
    const localePosts = posts.filter(
      (p) => p.published && p.locale === locale
    );
    const categories = [
      ...new Set(localePosts.flatMap((p) => p.categories ?? [])),
    ];
    for (const category of categories) {
      params.push({ locale, category: encodeURIComponent(category) });
    }
  }
  return params;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: "blog" });

  const categoryName = decodeURIComponent(resolvedParams.category);
  const displayPosts = await getPostsByCategory(
    resolvedParams.category,
    resolvedParams.locale
  );

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-center gap-4 text-center mb-8">
        <h1 className="inline-block font-black text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          {t("categoryTitle", { name: categoryName })}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t("categorySubtitle", { name: categoryName })}
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
          {t("categoryEmpty", { name: categoryName })}
        </p>
      )}
    </div>
  );
}
