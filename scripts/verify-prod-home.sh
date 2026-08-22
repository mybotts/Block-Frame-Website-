#!/usr/bin/env bash
# Production check of the noir homepage after Vercel deploy
set -u
BASE="https://www.blockframe.cloud"

curl -s "$BASE/" > /tmp/prod-home.html

echo "=== key content ==="
for needle in "Practical Intelligence" "Systems running in production" \
  "Deployable Systems" "Audit. Productize. Deploy." \
  "Voice Agent: 24/7" "Blog OS Automated Notion CMS" "manual edits: 0" \
  "Submit Project Request"; do
  count=$(grep -o "$needle" /tmp/prod-home.html | wc -l)
  if [ "$count" -gt 0 ]; then echo "OK: $needle"; else echo "MISSING: $needle"; fi
done

echo ""
echo "=== product links ==="
grep -o 'href="/marketplace/products/[a-z0-9-]*"' /tmp/prod-home.html | sort -u

echo ""
echo "=== em dashes (must be 0) ==="
grep -c "—" /tmp/prod-home.html || true
