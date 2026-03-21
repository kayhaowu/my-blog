#!/usr/bin/env python3
"""Tech Digest Collector — fetches daily tech news from 6 sources."""

import argparse
import json
import os
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone

import requests
from bs4 import BeautifulSoup

# ── Config (hardcoded for MVP) ──────────────────────────────────────────────

GITHUB_TRENDING_COUNT = 10
HN_FETCH_COUNT = 50  # fetch more, filter later
HN_RESULT_COUNT = 15
HN_MIN_SCORE = 50
HF_PAPERS_COUNT = 5
CVE_MIN_SEVERITY = "HIGH"
CVE_COUNT = 10
CLAUDE_CODE_RELEASES_COUNT = 3
REQUEST_TIMEOUT = 30
USER_AGENT = "Mozilla/5.0 (compatible; TechDigest/1.0)"
INBOX_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "inbox.txt")


# ── GitHub Trending ─────────────────────────────────────────────────────────

def fetch_github_trending() -> list[dict]:
    """Scrape GitHub Trending page for top repos."""
    url = "https://github.com/trending"
    headers = {"User-Agent": USER_AGENT}
    resp = requests.get(url, headers=headers, timeout=REQUEST_TIMEOUT)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")
    articles = soup.select("article.Box-row")
    results = []

    for article in articles[:GITHUB_TRENDING_COUNT]:
        # Repo name and URL
        h2 = article.select_one("h2 a")
        if not h2:
            continue
        href = h2.get("href", "").strip()
        name = "/".join(p.strip() for p in href.split("/") if p.strip())
        repo_url = f"https://github.com/{name}"

        # Description
        desc_el = article.select_one("p")
        description = desc_el.get_text(strip=True) if desc_el else ""

        # Language
        lang_el = article.select_one("[itemprop='programmingLanguage']")
        language = lang_el.get_text(strip=True) if lang_el else None

        # Stars today — find text containing "stars today"
        stars_today = 0
        for span in article.select("span"):
            text = span.get_text(strip=True)
            if "stars today" in text:
                num_str = text.replace("stars today", "").replace(",", "").strip()
                try:
                    stars_today = int(num_str)
                except ValueError:
                    pass
                break

        results.append({
            "name": name,
            "description": description,
            "stars_today": stars_today,
            "language": language,
            "url": repo_url,
        })

    return results


# ── Hacker News ─────────────────────────────────────────────────────────────

def _fetch_hn_item(item_id: int) -> dict | None:
    """Fetch a single HN item by ID."""
    url = f"https://hacker-news.firebaseio.com/v0/item/{item_id}.json"
    try:
        resp = requests.get(url, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        data = resp.json()
        if not data or data.get("type") != "story":
            return None
        return data
    except Exception:
        return None


def fetch_hackernews() -> list[dict]:
    """Fetch top HN stories, filter by min score."""
    url = "https://hacker-news.firebaseio.com/v0/topstories.json"
    resp = requests.get(url, timeout=REQUEST_TIMEOUT)
    resp.raise_for_status()
    top_ids = resp.json()[:HN_FETCH_COUNT]

    # Parallel fetch
    items = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(_fetch_hn_item, sid): sid for sid in top_ids}
        for future in as_completed(futures):
            result = future.result()
            if result and result.get("score", 0) >= HN_MIN_SCORE:
                items.append(result)

    # Sort by score descending, take top N
    items.sort(key=lambda x: x.get("score", 0), reverse=True)
    results = []
    for item in items[:HN_RESULT_COUNT]:
        story_url = item.get("url") or f"https://news.ycombinator.com/item?id={item['id']}"
        results.append({
            "title": item.get("title", ""),
            "url": story_url,
            "hn_url": f"https://news.ycombinator.com/item?id={item['id']}",
            "score": item.get("score", 0),
            "comments": item.get("descendants", 0),
        })

    return results


# ── HuggingFace Daily Papers ────────────────────────────────────────────────

def fetch_hf_papers() -> list[dict]:
    """Fetch top papers from HuggingFace Daily Papers."""
    url = "https://huggingface.co/api/daily_papers"
    headers = {"User-Agent": USER_AGENT}
    resp = requests.get(url, headers=headers, timeout=REQUEST_TIMEOUT)
    resp.raise_for_status()
    data = resp.json()

    # Sort by upvotes (nested in paper object)
    data.sort(key=lambda x: x.get("paper", {}).get("upvotes", 0), reverse=True)

    results = []
    for entry in data[:HF_PAPERS_COUNT]:
        paper = entry.get("paper", {})
        paper_id = paper.get("id", "")
        results.append({
            "title": entry.get("title", paper.get("title", "")),
            "summary": entry.get("summary", ""),
            "url": f"https://arxiv.org/abs/{paper_id}" if paper_id else "",
            "hf_url": f"https://huggingface.co/papers/{paper_id}" if paper_id else "",
            "upvotes": paper.get("upvotes", 0),
        })

    return results


# ── NVD CVE ─────────────────────────────────────────────────────────────────

def fetch_cve() -> list[dict]:
    """Fetch recent high-severity CVEs from NVD."""
    now = datetime.now(timezone.utc)
    yesterday = now - timedelta(days=1)

    params = {
        "cvssV3Severity": CVE_MIN_SEVERITY,
        "pubStartDate": yesterday.strftime("%Y-%m-%dT00:00:00.000"),
        "pubEndDate": now.strftime("%Y-%m-%dT23:59:59.999"),
    }
    url = "https://services.nvd.nist.gov/rest/json/cves/2.0"
    headers = {"User-Agent": USER_AGENT}
    resp = requests.get(url, params=params, headers=headers, timeout=REQUEST_TIMEOUT)

    if resp.status_code == 403:
        raise RuntimeError("NVD API rate limited (403)")
    resp.raise_for_status()

    data = resp.json()
    vulnerabilities = data.get("vulnerabilities", [])

    results = []
    for vuln in vulnerabilities[:CVE_COUNT]:
        cve = vuln.get("cve", {})
        cve_id = cve.get("id", "")

        # Get description (English)
        descriptions = cve.get("descriptions", [])
        description = ""
        for desc in descriptions:
            if desc.get("lang") == "en":
                description = desc.get("value", "")
                break

        # Get CVSS score — try v3.1, then v3.0
        metrics = cve.get("metrics", {})
        cvss_score = None
        severity = None
        for key in ("cvssMetricV31", "cvssMetricV30"):
            metric_list = metrics.get(key, [])
            if metric_list:
                cvss_data = metric_list[0].get("cvssData", {})
                cvss_score = cvss_data.get("baseScore")
                severity = cvss_data.get("baseSeverity")
                break

        results.append({
            "cve_id": cve_id,
            "description": description,
            "cvss_score": cvss_score,
            "severity": severity,
            "url": f"https://nvd.nist.gov/vuln/detail/{cve_id}",
        })

    return results


# ── Claude Code Releases ────────────────────────────────────────────────────

def fetch_claude_code_releases() -> list[dict]:
    """Fetch recent Claude Code releases from GitHub API."""
    url = "https://api.github.com/repos/anthropics/claude-code/releases"
    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "application/vnd.github.v3+json",
    }
    resp = requests.get(url, headers=headers, timeout=REQUEST_TIMEOUT)
    resp.raise_for_status()
    releases = resp.json()

    # Only include releases from the last 7 days
    cutoff = datetime.now(timezone.utc) - timedelta(days=7)
    results = []

    for release in releases[:CLAUDE_CODE_RELEASES_COUNT * 2]:  # fetch extra in case some are old
        published = release.get("published_at", "")
        if published:
            release_date = datetime.fromisoformat(published.replace("Z", "+00:00"))
            if release_date < cutoff:
                continue

        tag = release.get("tag_name", "")
        body = release.get("body", "")
        # Truncate body to first 2000 chars to keep raw.json manageable
        if len(body) > 2000:
            body = body[:2000] + "\n...(truncated)"

        results.append({
            "version": tag,
            "name": release.get("name", tag),
            "date": published[:10] if published else "",
            "body": body,
            "url": release.get("html_url", ""),
        })

        if len(results) >= CLAUDE_CODE_RELEASES_COUNT:
            break

    return results


# ── Inbox (manual links) ───────────────────────────────────────────────────

def fetch_inbox() -> list[dict]:
    """Read manually curated links from inbox.txt."""
    if not os.path.exists(INBOX_FILE):
        return []

    with open(INBOX_FILE, "r") as f:
        lines = f.readlines()

    results = []
    for line in lines:
        url = line.strip()
        if not url or url.startswith("#"):
            continue
        results.append({
            "url": url,
            "note": "",  # Claude will summarize based on the URL
        })

    # Clear inbox after reading
    if results:
        with open(INBOX_FILE, "w") as f:
            f.write("# Paste links here (one per line). They will be cleared after each digest run.\n")
        print(f"  ↳ Cleared {len(results)} link(s) from inbox.txt", file=sys.stderr)

    return results


# ── Main ────────────────────────────────────────────────────────────────────

SOURCES = {
    "github_trending": ("GitHub Trending", fetch_github_trending),
    "hackernews": ("Hacker News", fetch_hackernews),
    "hf_papers": ("HuggingFace Daily Papers", fetch_hf_papers),
    "cve": ("NVD CVE", fetch_cve),
    "claude_code": ("Claude Code Releases", fetch_claude_code_releases),
    "inbox": ("Inbox (Manual Links)", fetch_inbox),
}


def collect(source_filter: list[str] | None = None) -> dict:
    """Collect data from all sources. Returns structured dict."""
    today = datetime.now().strftime("%Y-%m-%d")
    result = {"date": today, "sources": {}}

    for key, (name, fetcher) in SOURCES.items():
        if source_filter and key not in source_filter:
            continue

        try:
            items = fetcher()
            result["sources"][key] = {
                "name": name,
                "status": "success",
                "count": len(items),
                "items": items,
            }
            print(f"✓ {name}: {len(items)} items", file=sys.stderr)
        except Exception as e:
            result["sources"][key] = {
                "name": name,
                "status": "error",
                "error": str(e),
                "items": [],
            }
            print(f"✗ {name}: {e}", file=sys.stderr)

    return result


def main():
    parser = argparse.ArgumentParser(description="Tech Digest Collector")
    parser.add_argument("--output", "-o", help="Output JSON file path (required unless --dry-run)")
    parser.add_argument("--sources", "-s", help="Comma-separated source filter (e.g., github,hn)")
    parser.add_argument("--dry-run", action="store_true", help="Print results without writing file")
    args = parser.parse_args()

    # Parse source filter
    source_filter = None
    if args.sources:
        alias_map = {
            "github": "github_trending",
            "hn": "hackernews",
            "papers": "hf_papers",
            "cve": "cve",
            "claude": "claude_code",
            "inbox": "inbox",
        }
        source_filter = [alias_map.get(s.strip(), s.strip()) for s in args.sources.split(",")]

    data = collect(source_filter)

    if args.dry_run:
        print(json.dumps(data, indent=2, ensure_ascii=False))
        return

    if not args.output:
        print("ERROR: --output is required unless --dry-run", file=sys.stderr)
        sys.exit(1)

    # Atomic write
    output_dir = os.path.dirname(args.output)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)

    with tempfile.NamedTemporaryFile(
        mode="w", dir=output_dir or ".", suffix=".tmp", delete=False
    ) as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        tmp_path = f.name

    os.rename(tmp_path, args.output)
    print(f"✓ Saved to {args.output}", file=sys.stderr)


if __name__ == "__main__":
    main()
