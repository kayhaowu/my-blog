"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { posts } from "#site/content";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface Post {
  title: string;
  slug: string;
  description?: string;
}

/**
 * SearchBar component for searching blog posts.
 * 
 * This component provides a search input that filters blog posts in real-time as the user types.
 * It displays matching results in a dropdown, showing both the post title and description.
 * When a result is clicked, the user is navigated to that post's page.
 * 
 * Features:
 * - Real-time filtering of posts based on title and description
 * - Dropdown display of matching results
 * - "No results" message when no matches are found
 * - Navigation to selected post
 * - Focuses and blurs management to control dropdown visibility
 * 
 * @example
 * ```tsx
 * <SearchBar />
 * ```
 * 
 * @returns A search input with dynamic results dropdown
 */
export function SearchBar() {
  const router = useRouter(); // Get router instance
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(() => {
    if (query.length <= 1) return [];
    const q = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description?.toLowerCase().includes(q)
    );
  }, [query]);

  const handleResultClick = (postSlug: string) => {
    router.push(`/${postSlug}`);
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-xs">
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder="Search posts..."
        className="w-full bg-secondary border-border/50 focus:border-accent focus:ring-accent/20 rounded-md text-sm"
      />
      {isFocused && results.length > 0 && (
        <div className="absolute z-10 top-full mt-2 w-full bg-card border border-border/50 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          <ul>
            {results.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${post.slug}`}
                  className="block px-4 py-3 hover:bg-accent/5 transition-colors"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleResultClick(post.slug);
                  }}
                >
                  <div className="font-medium">{post.title}</div>
                  {post.description && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {post.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isFocused && query.length > 1 && results.length === 0 && (
        <div className="absolute z-10 top-full mt-2 w-full bg-card border border-border/50 rounded-lg shadow-xl p-4 text-xs text-muted-foreground text-center">
          No results found for &quot;{query}&quot;.
        </div>
      )}
    </div>
  );
}
