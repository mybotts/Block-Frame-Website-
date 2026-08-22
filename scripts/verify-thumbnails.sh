#!/usr/bin/env bash
# Verify thumbnails + OG images after path-handling fix (next start on :3462)
set -u
BASE="http://localhost:3462"

curl -s "$BASE/blogs" > /tmp/blogs-thumb2.html

cards=$(grep -o 'class="glass-card group block' /tmp/blogs-thumb2.html | wc -l)
imgs=$(grep -o '<img src="' /tmp/blogs-thumb2.html | wc -l)
fallbacks=$(grep -o '28px 28px' /tmp/blogs-thumb2.html | wc -l)
local_imgs=$(grep -o '<img src="/images/thumbnails/' /tmp/blogs-thumb2.html | wc -l)

echo "cards: $cards | real <img>: $imgs (local: $local_imgs) | fallback panels: $fallbacks"

echo ""
echo "=== OG image: post with stabilized local thumbnail ==="
curl -s "$BASE/blog/ai-agent-benchmarks-and-evaluation-2026" > /tmp/post-og2.html
grep -o '<meta property="og:image" content="[^"]*"' /tmp/post-og2.html | head -1 | cut -c1-140

echo ""
echo "=== OG image: post with wikimedia thumbnail ==="
curl -s "$BASE/blog/seo-for-ai-search-how-to-optimize-for-citations-instead-of-clicks" > /tmp/post-og3.html
grep -o '<meta property="og:image" content="[^"]*"' /tmp/post-og3.html | head -1 | cut -c1-140

echo ""
echo "=== local thumbnail asset serves ==="
TSRC=$(grep -o '<img src="/images/thumbnails/[^"]*"' /tmp/blogs-thumb2.html | head -1 | sed 's/<img src="//;s/"$//')
echo "asset path: $TSRC"
curl -s -o /dev/null -w "status %{http_code}, %{size_download} bytes\n" "$BASE$TSRC"
