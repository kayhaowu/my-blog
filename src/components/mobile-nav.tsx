"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center"
        >
          <span className="font-display italic text-2xl tracking-tight">
            Kay Wu
          </span>
        </MobileLink>
        <div className="flex flex-col mt-6">
          <MobileLink
            onOpenChange={setOpen}
            href="/blog"
            className={cn(
              "font-display text-lg py-3 border-b border-border transition-colors duration-200",
              pathname === "/blog" ? "text-accent" : "text-foreground"
            )}
          >
            {t("blog")}
          </MobileLink>
          <MobileLink
            onOpenChange={setOpen}
            href="/about"
            className={cn(
              "font-display text-lg py-3 border-b border-border transition-colors duration-200",
              pathname === "/about" ? "text-accent" : "text-foreground"
            )}
          >
            {t("about")}
          </MobileLink>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className="font-display text-lg py-3 border-b border-border text-foreground transition-colors duration-200 hover:text-accent"
          >
            GitHub
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.twitter}
            className="font-display text-lg py-3 border-b border-border text-foreground transition-colors duration-200 hover:text-accent"
          >
            Twitter
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.linkedin}
            className="font-display text-lg py-3 border-b border-border text-foreground transition-colors duration-200 hover:text-accent"
          >
            Linkedin
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  href: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href);
        onOpenChange?.(false);
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
