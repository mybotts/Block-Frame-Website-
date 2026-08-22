#!/usr/bin/env bash
# Content verification of the noir homepage (next start on :3459)
set -u
BASE="http://localhost:3459"

curl -s "$BASE/" > /tmp/home.html

echo "=== key content present ==="
for needle in "Engineering" "Practical Intelligence" "Systems running in production" \
  "Start a Project" "Book a Call" "blog-os // daily run" "manual edits: 0" \
  "Deployable Systems" "Audit. Productize. Deploy." "The Audit" \
  "Voice Agent: 24/7" "Blog OS Automated Notion CMS" "Social Agent: AI Multi-Platform" \
  "Proposal Led Agentic Outreach" "Tell us what you need" \
  "posts in 90 days" "platforms reached"; do
  count=$(grep -o "$needle" /tmp/home.html | wc -l)
  if [ "$count" -gt 0 ]; then echo "OK ($count): $needle"; else echo "MISSING: $needle"; fi
done

echo ""
echo "=== product links ==="
grep -o 'href="/marketplace/products/[a-z0-9-]*"' /tmp/home.html | sort -u
echo "=== proof strip links ==="
grep -o 'href="/blogs"\|href="/videos"\|href="/marketplace/products"' /tmp/home.html | sort | uniq -c

echo ""
echo "=== em dash check (must be 0) ==="
grep -c "—" /tmp/home.html || true

echo ""
echo "=== noir scoping ==="
grep -c "noir-home" /tmp/home.html
