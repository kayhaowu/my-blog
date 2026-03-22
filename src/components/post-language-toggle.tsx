import { posts } from "#site/content";
import { Link } from "@/i18n/navigation";

interface PostLanguageToggleProps {
  slugAsParams: string;
  locale: string;
}

export function PostLanguageToggle({ slugAsParams, locale }: PostLanguageToggleProps) {
  const pair = posts.find(
    (p) => p.slugAsParams === slugAsParams && p.locale !== locale && p.published
  );
  if (!pair) return null;

  const label = locale === "en" ? "閱讀中文版" : "Read in English";

  return (
    <Link
      href={`/blog/${pair.slugAsParams}`}
      locale={pair.locale}
      className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline underline-offset-4"
    >
      {label}
    </Link>
  );
}
