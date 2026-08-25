#!/usr/bin/env bash
# Rebuild the five templates from the original bundled .html files.
#   ./scripts/build-templates.sh "/path/to/Lift Flow"
set -euo pipefail
SRC="${1:-/Users/macbook/Desktop/Personal/Lift Flow}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
build() {
  slug="$1"; file="$2"
  python3 "$ROOT/scripts/unbundle.py" "$SRC/$file" "$TMP/$slug" "/templates/$slug/assets"
  rm -rf "$ROOT/public/templates/$slug"
  mkdir -p "$ROOT/public/templates/$slug/assets"
  # runtime + react UMD bundles are not needed — Vite provides React
  find "$TMP/$slug/assets" -type f ! -name '*.js' -exec cp {} "$ROOT/public/templates/$slug/assets/" \;
  python3 "$ROOT/scripts/convert.py" "$TMP/$slug" "$slug" "$ROOT/src/templates/$slug/Page.tsx"
}
build liftflow-global-website "Liftflow Global Website.html"
build liftflow-global         "LiftFlow Global.html"
build liftflow-home           "LiftFlow Home (offline).html"
build liftflow-website        "Liftflow Website.html"
build liftflow-website1       "LiftFlow Website1.html"
rm -rf "$TMP"
