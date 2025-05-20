import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
// import { notFound } from "next/navigation";

interface TagPageProps {
  params: {
    tag: string; // This will be URL-encoded
  };
}

async function getPostsByTag(tagParam: string) {
  const decodedTagName = decodeURIComponent(tagParam).toLowerCase(); // Compare in lowercase
  const filteredPosts = posts.filter(post =>
    post.published && post.tags?.some(tag => tag.toLowerCase() === decodedTagName)
  );
  // The 'posts' array from Velite is already sorted by date (newest first)
  return filteredPosts;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tagName = decodeURIComponent(params.tag);
  const title = `Posts tagged with: ${tagName}`;
  const description = `Browse blog posts tagged with "${tagName}" on ${siteConfig.name}.`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${siteConfig.url}/blog/tags/${params.tag}`, // Use encoded param for URL
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
    },
  };
}

export async function generateStaticParams(): Promise<TagPageProps["params"][]> {
  const uniqueTags = new Set<string>();
  posts.forEach(post => {
    if (post.published && post.tags) {
      post.tags.forEach(tag => uniqueTags.add(tag));
    }
  });

  return Array.from(uniqueTags).map(tag => ({
    // Ensure the tag parameter is URL-encoded for path generation
    tag: encodeURIComponent(tag)
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const tagName = decodeURIComponent(params.tag); // For display
  const displayPosts = await getPostsByTag(params.tag); // Pass encoded param

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Tag: {tagName}
          </h1>
          <p className="text-xl text-muted-foreground">
            Blog posts tagged with &quot;{tagName}&quot;.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {displayPosts.length > 0 ? (
        <ul className="flex flex-col">
          {displayPosts.map(post => (
            <li key={post.slug} className="first:border-t first:border-border">
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                categories={post.categories} // Pass categories if you want to display them here too
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found with the tag &quot;{tagName}&quot;.</p>
      )}
    </div>
  );
}
