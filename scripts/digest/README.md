# Tech Digest Collector

Local tool that collects daily tech news from 6 sources, summarizes with `claude -p`, and outputs a markdown digest.

## How It Works

```
macOS cron / manual run
    │
    ▼
collect.py           ← Python: fetch 6 sources → raw.json
    │
    ▼
claude -p            ← Summarize into Chinese digest (uses Max subscription)
    │
    ▼
digests/2026-03-20.md  ← Daily markdown digest
```

## Quick Start

```bash
# One-time setup
bash scripts/digest/setup.sh

# Run the full pipeline
bash scripts/digest/digest.sh
```

Output is saved to `digests/YYYY-MM-DD.md` at the project root.

## Sources

| Source | API | What it collects |
|--------|-----|-----------------|
| GitHub Trending | HTML scrape | Top 10 trending repos (name, stars, language) |
| Hacker News | Firebase API | Top 15 stories with score >= 50 |
| HuggingFace Papers | REST API | Top 5 daily papers by upvotes |
| NVD CVE | REST API | High-severity CVEs from last 24 hours |
| Claude Code Releases | GitHub API | Recent releases with changelog (last 7 days) |
| Inbox (Manual) | Local file | Links you paste into `inbox.txt` |

## Inbox — Manual Link Collection

Paste any interesting links (Threads, Facebook, articles, etc.) into `scripts/digest/inbox.txt`, one per line:

```
https://www.threads.net/@some_account/post/xxx
https://www.facebook.com/some.page/posts/12345
https://interesting-article.com/post
```

When `digest.sh` runs, these links are included in the digest and the file is automatically cleared.

## Development

Test individual sources without running Claude:

```bash
cd scripts/digest

# Dry run — prints JSON to stdout
.venv/bin/python collect.py --dry-run --sources github
.venv/bin/python collect.py --dry-run --sources hn
.venv/bin/python collect.py --dry-run --sources papers
.venv/bin/python collect.py --dry-run --sources cve
.venv/bin/python collect.py --dry-run --sources claude
.venv/bin/python collect.py --dry-run --sources inbox

# Collect all sources to file
.venv/bin/python collect.py --output .cache/test.json
```

## Automation (Optional)

Create a macOS `launchd` plist to run daily at 08:00:

```bash
cat > ~/Library/LaunchAgents/com.kayblog.digest.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.kayblog.digest</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>/Users/wuzhenhao/Desktop/JS/next/my-blog/scripts/digest/digest.sh</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>8</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    <key>StandardOutPath</key>
    <string>/tmp/digest-stdout.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/digest-stderr.log</string>
</dict>
</plist>
EOF

launchctl load ~/Library/LaunchAgents/com.kayblog.digest.plist
```

Unload: `launchctl unload ~/Library/LaunchAgents/com.kayblog.digest.plist`

## File Structure

```
scripts/digest/
├── collect.py          # Data collection (6 sources)
├── digest.sh           # Entry point: collect → claude -p → save
├── setup.sh            # One-time venv + directory setup
├── system-prompt.txt   # Claude system prompt template
├── inbox.txt           # Paste links here for manual collection
├── requirements.txt    # Python deps (requests, beautifulsoup4)
├── README.md           # This file
├── .venv/              # Python venv (gitignored)
├── .cache/             # Raw JSON intermediates (gitignored)
└── logs/               # Execution logs (gitignored)
```

## Requirements

- Python 3.11+
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) with Max subscription
- Internet connection
