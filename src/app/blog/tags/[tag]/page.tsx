import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
// import { notFound } from "next/navigation";

interface TagPageProps {
  params: Promise<{
    tag: string; // This will be URL-encoded
  }>;
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
  const resolvedParams = await params;
  const tagName = decodeURIComponent(resolvedParams.tag);
  const title = `Posts tagged with: ${tagName}`;
  const description = `Browse blog posts tagged with "${tagName}" on ${siteConfig.name}.`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${siteConfig.url}/blog/tags/${resolvedParams.tag}`, // Use encoded param for URL
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

export async function generateStaticParams(): Promise<{ tag: string }[]> {
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
  const resolvedParams = await params;
  const tagName = decodeURIComponent(resolvedParams.tag); // For display
  const displayPosts = await getPostsByTag(resolvedParams.tag); // Pass encoded param

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-center gap-4 text-center mb-8">
        <h1 className="inline-block font-black text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Tag: {tagName}
        </h1>
        <p className="text-xl text-muted-foreground">
            Blog posts tagged with &quot;{tagName}&quot;.
        </p>
      </div>
      <hr className="my-8" />
      {displayPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map(post => (
            <div key={post.slug} className="h-full">
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                readingTime={post.readingTime}
                tags={post.tags}
                categories={post.categories} // Pass categories if you want to display them here too
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No posts found with the tag &quot;{tagName}&quot;.</p>
      )}
    </div>
  );
}
