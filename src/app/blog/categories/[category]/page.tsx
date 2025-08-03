import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
// import { notFound } from "next/navigation"; // notFound() can be used if category is truly invalid

interface CategoryPageProps {
  params: {
    category: string; // This will be URL-encoded
  };
}

async function getPostsByCategory(categoryParam: string) {
  const decodedCategoryName = decodeURIComponent(categoryParam).toLowerCase(); // Compare in lowercase
  const filteredPosts = posts.filter(post =>
    post.published && post.categories?.some(cat => cat.toLowerCase() === decodedCategoryName)
  );
  // The 'posts' array from Velite is already sorted by date (newest first)
  // as per velite.config.ts settings.
  return filteredPosts;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryName = decodeURIComponent(params.category);
  const title = `Posts in category: ${categoryName}`;
  const description = `Browse blog posts categorized under "${categoryName}" on ${siteConfig.name}.`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${siteConfig.url}/blog/categories/${params.category}`, // Use encoded param for URL
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

export async function generateStaticParams(): Promise<CategoryPageProps["params"][]> {
  const uniqueCategories = new Set<string>();
  posts.forEach(post => {
    if (post.published && post.categories) {
      post.categories.forEach(cat => uniqueCategories.add(cat));
    }
  });

  return Array.from(uniqueCategories).map(category => ({
    // Ensure the category parameter is URL-encoded for path generation
    category: encodeURIComponent(category)
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = decodeURIComponent(params.category); // For display
  const displayPosts = await getPostsByCategory(params.category); // Pass encoded param

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Category: {categoryName}
          </h1>
          <p className="text-xl text-muted-foreground">
            Blog posts categorized under &quot;{categoryName}&quot;.
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
                readingTime={post.readingTime}
                tags={post.tags}
                categories={post.categories}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found in the category &quot;{categoryName}&quot;.</p>
      )}
    </div>
  );
}
