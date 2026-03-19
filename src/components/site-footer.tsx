import { siteConfig } from "@/config/site";
import { Mail } from "lucide-react";
import { Icons } from "./icons";

export function SiteFooter() {
  return (
    <footer className="mt-24">
      <div className="container max-w-6xl py-8">
        <hr className="mb-12" />
        <div className="flex flex-col gap-6">
          {/* Top row: site name + social icons */}
          <div className="flex items-center justify-between">
            <span className="font-display italic text-lg tracking-tight">
              Kay Wu
            </span>
            <div className="flex items-center space-x-4">
              <a
                target="_blank"
                rel="noreferrer"
                href={`mailto:${siteConfig.links.email}`}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                <span className="sr-only">Mail</span>
                <Mail className="h-5 w-5" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={siteConfig.links.twitter}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                <span className="sr-only">Twitter</span>
                <Icons.twitter className="h-5 w-5" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={siteConfig.links.github}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                <span className="sr-only">GitHub</span>
                <Icons.gitHub className="h-5 w-5" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={siteConfig.links.linkedin}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                <span className="sr-only">Linkedin</span>
                <Icons.linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Bottom row: copyright */}
          <div className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href={siteConfig.links.personalSite}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors duration-200"
            >
              {siteConfig.author}
            </a>
            . All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
