import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  readingTime?: number;
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
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
          {readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          )}
        </div>
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