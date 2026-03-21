#!/bin/bash
set -euo pipefail

# ── Paths ───────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
VENV_PYTHON="$SCRIPT_DIR/.venv/bin/python"
CACHE_DIR="$SCRIPT_DIR/.cache"
LOG_DIR="$SCRIPT_DIR/logs"
DIGEST_DIR="$PROJECT_DIR/digests"
TODAY=$(date +%Y-%m-%d)

# ── Setup dirs ──────────────────────────────────────────────────────────────
mkdir -p "$CACHE_DIR" "$DIGEST_DIR" "$LOG_DIR"

# ── Check venv ──────────────────────────────────────────────────────────────
if [ ! -f "$VENV_PYTHON" ]; then
  echo "ERROR: venv not found. Run: bash scripts/digest/setup.sh"
  exit 1
fi

# ── Check claude CLI ────────────────────────────────────────────────────────
CLAUDE_BIN=$(which claude 2>/dev/null || echo "")
if [ -z "$CLAUDE_BIN" ]; then
  echo "ERROR: claude CLI not found in PATH"
  exit 1
fi

# ── Step 1: Collect ─────────────────────────────────────────────────────────
echo "📡 Collecting data..."
RAW_FILE="$CACHE_DIR/raw-$TODAY.json"

if ! $VENV_PYTHON "$SCRIPT_DIR/collect.py" \
  --output "$RAW_FILE" \
  2>"$LOG_DIR/collect-$TODAY.err"; then
  echo "ERROR: collect.py failed. See $LOG_DIR/collect-$TODAY.err"
  exit 1
fi

# ── Check if any source succeeded ───────────────────────────────────────────
SUCCESS_COUNT=$($VENV_PYTHON -c "
import json, sys
with open('$RAW_FILE') as f:
    d = json.load(f)
print(sum(1 for s in d['sources'].values() if s['status'] == 'success'))
")

if [ "$SUCCESS_COUNT" -eq 0 ]; then
  echo "ERROR: All sources failed. Skipping summarization."
  echo "Check $LOG_DIR/collect-$TODAY.err for details."
  exit 1
fi

echo "✓ Collected from $SUCCESS_COUNT source(s)"

# ── Step 2: Summarize with claude -p ────────────────────────────────────────
echo "🤖 Generating digest with Claude..."
SYSTEM_PROMPT=$(cat "$SCRIPT_DIR/system-prompt.txt")
DIGEST_FILE="$DIGEST_DIR/$TODAY.md"

if [ -f "$DIGEST_FILE" ]; then
  echo "WARN: Digest for $TODAY already exists. Overwriting."
fi

if ! cat "$RAW_FILE" | $CLAUDE_BIN -p \
  --model sonnet \
  --no-session-persistence \
  --system-prompt "$SYSTEM_PROMPT" \
  "Below is the raw JSON data collected today. Produce the daily tech digest following the format in your system instructions." \
  > "$DIGEST_FILE" 2>"$LOG_DIR/claude-$TODAY.err"; then
  echo "ERROR: claude -p failed. See $LOG_DIR/claude-$TODAY.err"
  exit 1
fi

# ── Step 3: Validate output ─────────────────────────────────────────────────
if [ ! -s "$DIGEST_FILE" ]; then
  echo "ERROR: Digest file is empty"
  exit 1
fi

DIGEST_SIZE=$(wc -c < "$DIGEST_FILE" | tr -d ' ')
if [ "$DIGEST_SIZE" -lt 500 ]; then
  echo "WARN: Digest seems unusually short ($DIGEST_SIZE bytes)"
fi

echo "✓ Digest saved: $DIGEST_FILE ($DIGEST_SIZE bytes)"

# ── Step 4: Clean old cache (keep 7 days) ───────────────────────────────────
find "$CACHE_DIR" -name "raw-*.json" -mtime +7 -delete 2>/dev/null || true
find "$LOG_DIR" -name "*.err" -mtime +7 -delete 2>/dev/null || true

echo "✅ Done! Open: $DIGEST_FILE"
