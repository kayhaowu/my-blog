"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();
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
        Blog
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
        About
      </Link>
    </nav>
  );
}
