import { describe, it, expect } from "vitest";
import { formatDate, sortPosts } from "./utils";

describe("formatDate", () => {
  it("formats ISO date strings", () => {
    expect(formatDate("2024-01-02")).toBe("January 2, 2024");
  });
});

describe("sortPosts", () => {
  it("sorts posts by descending date", () => {
    const posts = [
      { date: "2024-01-01" },
      { date: "2024-02-01" },
      { date: "2023-12-31" },
    ];

    const sorted = sortPosts(posts as any);

    expect(sorted[0].date).toBe("2024-02-01");
    expect(sorted[1].date).toBe("2024-01-01");
    expect(sorted[2].date).toBe("2023-12-31");
  });
});

