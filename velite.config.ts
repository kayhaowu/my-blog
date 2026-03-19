import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const computeFields = <T extends { slug: string; body: string }>(data: T) => {
  // Calculate reading time (average 200 words per minute)
  const wordsPerMinute = 200;
  const wordCount = data.body.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return {
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
    readingTime: readingTime,
    wordCount: wordCount,
  };
};

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      featured: s.boolean().default(false),
      categories: s.array(s.string()).optional(), 
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
    })
    .transform(computeFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark" }],
      rehypeKatex,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [remarkMath],
  },
});