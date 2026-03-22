"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function MainNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="font-display italic text-xl tracking-tight">
          Kay Wu
        </span>
      </Link>
      <Link
        href="/blog"
        className={cn(
          "text-sm tracking-wide uppercase transition-colors duration-200 hover:text-foreground hidden sm:inline-block",
          pathname === "/blog"
            ? "text-foreground font-semibold"
            : "text-muted-foreground"
        )}
      >
        {t("blog")}
      </Link>
      <Link
        href="/about"
        className={cn(
          "text-sm tracking-wide uppercase transition-colors duration-200 hover:text-foreground hidden sm:inline-block",
          pathname === "/about"
            ? "text-foreground font-semibold"
            : "text-muted-foreground"
        )}
      >
        {t("about")}
      </Link>
    </nav>
  );
}
