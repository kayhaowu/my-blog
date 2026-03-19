"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QueryPaginationProps {
  totalPages: number;
  className?: string;
}

export function QueryPagination({
  totalPages,
  className,
}: QueryPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams?.get("page")) || 1;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams || undefined);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex items-center gap-2", className)}
    >
      {prevPage >= 1 ? (
        <Link
          href={createPageURL(prevPage)}
          className="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground hover:text-accent transition-colors px-3 py-2"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground/40 px-3 py-2 cursor-not-allowed">
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </span>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = currentPage === page;
          return (
            <Link
              key={`page-${page}`}
              href={createPageURL(page)}
              className={cn(
                "inline-flex items-center justify-center font-mono text-sm w-9 h-9 rounded-md transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {nextPage <= totalPages ? (
        <Link
          href={createPageURL(nextPage)}
          className="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground hover:text-accent transition-colors px-3 py-2"
          aria-label="Go to next page"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground/40 px-3 py-2 cursor-not-allowed">
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
