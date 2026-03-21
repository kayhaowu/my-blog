#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "🔧 Setting up Tech Digest Collector..."

# Create Python venv
if [ ! -d "$SCRIPT_DIR/.venv" ]; then
  echo "Creating Python virtual environment..."
  python3 -m venv "$SCRIPT_DIR/.venv"
else
  echo "venv already exists, skipping..."
fi

# Install dependencies
echo "Installing Python dependencies..."
"$SCRIPT_DIR/.venv/bin/pip" install -q -r "$SCRIPT_DIR/requirements.txt"

# Create runtime directories
mkdir -p "$SCRIPT_DIR/.cache" "$SCRIPT_DIR/logs" "$PROJECT_DIR/digests"

echo ""
echo "✅ Setup complete!"
echo ""
echo "Usage:"
echo "  bash scripts/digest/digest.sh              # Run full pipeline"
echo "  bash scripts/digest/digest.sh               # Daily digest"
echo ""
echo "Test individual sources:"
echo "  .venv/bin/python collect.py --dry-run --sources github"
echo "  .venv/bin/python collect.py --dry-run --sources hn"
echo "  .venv/bin/python collect.py --dry-run --sources papers"
echo "  .venv/bin/python collect.py --dry-run --sources cve"
