"use client";

import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          src="/white.png"
          alt="Logo"
          width={24} 
          height={24}
        />
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <Link
        href="/blog"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/blog" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Blog
      </Link>
      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        About
      </Link>
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Stock
      </Link>
    </nav>
  );
}
