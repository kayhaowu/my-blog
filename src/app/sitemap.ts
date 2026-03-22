import { posts } from "#site/content";
import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const locales = ["en", "zh-TW"];
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = ["", "/about", "/blog"];
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            "zh-Hant": `${baseUrl}/zh-TW${page}`,
          },
        },
      });
    }
  }

  // Blog posts
  const publishedPosts = posts.filter((p) => p.published);
  for (const post of publishedPosts) {
    const pair = publishedPosts.find(
      (p) => p.slugAsParams === post.slugAsParams && p.locale !== post.locale
    );
    entries.push({
      url: `${baseUrl}/${post.locale}/blog/${post.slugAsParams}`,
      lastModified: post.date,
      alternates: pair
        ? {
            languages: {
              en: `${baseUrl}/en/blog/${post.slugAsParams}`,
              "zh-Hant": `${baseUrl}/zh-TW/blog/${post.slugAsParams}`,
            },
          }
        : undefined,
    });
  }

  return entries;
}
