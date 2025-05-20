import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  readingTime?: number; // Added readingTime prop
  categories?: string[]; // Added categories prop
  tags?: string[]; // Refined tags prop type
}

export function PostItem({ slug, title, description, date, readingTime, categories, tags }: PostItemProps) {
  return (
    <article className="flex flex-col gap-2 border-border border-b py-3">
      <div>
        <h2 className="text-2xl font-bold">
          <Link href={slug}>{title}</Link>
        </h2>
      </div>
      <div className="max-w-none text-muted-foreground">{description}</div>
      
      {/* Display Categories if they exist */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map((category) => (
            <Link key={category} href={`/blog/categories/${category.toLowerCase()}`} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md hover:bg-primary/20 transition-colors">
              {category}
            </Link>
          ))}
        </div>
      )}

      {/* Display Tags if they exist */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
            <Link key={tag} href={`/blog/tags/${tag.toLowerCase()}`} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md hover:bg-muted/80 transition-colors">
              {tag}
            </Link>
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center mt-2">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
            {readingTime && <span>· {readingTime} min read</span>} {/* Display reading time if it exists */}
          </dd>
        </dl>
        <Link
          href={slug}
          className={cn(buttonVariants({ variant: "link" }), "py-0")}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}