"use client";

import { Calendar, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  readingTime?: number;
  categories?: string[];
  tags?: string[];
}

export function PostItem({
  slug,
  title,
  description,
  date,
  readingTime,
  categories,
  tags,
}: PostItemProps) {
  const t = useTranslations("blog");
  const locale = useLocale();

  return (
    <Card className="h-full flex flex-col rounded-lg border border-border bg-card hover:border-accent/50 hover:translate-y-[-2px] transition-all duration-300 shadow-none">
      <CardHeader>
        <CardTitle className="font-display text-xl tracking-tight">
          <Link href={`/blog/${slug}`} className="hover:text-accent transition-colors">
            {title}
          </Link>
        </CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
          {categories && categories.length > 0 &&
            categories.map((category) => (
              <Link
                key={category}
                href={`/blog/categories/${category.toLowerCase()}`}
                className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              >
                {category}
              </Link>
            ))}
          {tags && tags.length > 0 &&
            tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${tag.toLowerCase()}`}
                className="text-xs px-2 py-0.5 rounded-full bg-sage/10 text-sage hover:bg-sage/20 transition-colors"
              >
                {tag}
              </Link>
            ))}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="text-base line-clamp-3">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={date}>{formatDate(date, locale)}</time>
          </div>
          {readingTime && (
            <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{readingTime} {t("minRead")}</span>
            </div>
          )}
        </div>
        <Link
          href={`/blog/${slug}`}
          className="text-accent text-sm hover:underline underline-offset-4 transition-colors"
        >
          {t("readMore")} &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
}
