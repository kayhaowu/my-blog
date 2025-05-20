import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { toString } from "mdast-util-to-string";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";

const computeFilelds = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

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
      categories: s.array(s.string()).optional(),
      tags: s.array(s.string()).optional(),
      body: s.mdx(), // This is the raw MDX string
      // readingTime: s.number().optional(), // This will be calculated in transform
    })
    .transform((data) => {
      // Parse the MDX content to an AST
      const tree = unified()
        .use(remarkParse)
        .use(remarkMdx)
        .parse(data.body);
      // Convert the AST to plain text
      const textContent = toString(tree);
      const wordCount = textContent.split(/\s+/).filter(Boolean).length;
      const minutes = Math.ceil(wordCount / 200); // Average reading speed: 200 WPM
      return {
        ...computeFilelds(data),
        // body: data.body, // Ensure body is still part of the transformed data if needed by other parts
        readingTime: minutes,
      };
    }),
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