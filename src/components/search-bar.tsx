"use client";

import { useState, useEffect } from "react";
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
  const [results, setResults] = useState<Post[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (query.length > 1) {
      const searchResults = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.description?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (postSlug: string) => {
    router.push(`/${postSlug}`);
    setQuery("");
    setResults([]);
    // setIsFocused(false); // Let onBlur handle closing the dropdown
  };

  return (
    <div className="relative w-full max-w-xs">
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Increased delay
        placeholder="Search posts..."
        className="w-full"
      />
      {isFocused && results.length > 0 && (
        <div className="absolute z-10 top-full mt-1 w-full bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul>
            {results.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${post.slug}`} // Keep href for accessibility and context
                  className="block px-4 py-2 hover:bg-muted"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent default Link behavior
                    handleResultClick(post.slug);
                  }}
                >
                  <div className="font-medium">{post.title}</div>
                  {post.description && (
                    <p className="text-sm text-muted-foreground truncate">
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
         <div className="absolute z-10 top-full mt-1 w-full bg-background border border-border rounded-md shadow-lg p-4 text-sm text-muted-foreground">
          No results found for &quot;{query}&quot;.
        </div>
      )}
    </div>
  );
}
