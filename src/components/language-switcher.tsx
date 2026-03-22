"use client";
import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "zh-TW" : "en";
  const label = locale === "en" ? "中文" : "EN";

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      className="text-xs font-mono text-muted-foreground hover:text-accent transition-colors border border-border rounded-md px-2 py-1"
    >
      {label}
    </Link>
  );
}
