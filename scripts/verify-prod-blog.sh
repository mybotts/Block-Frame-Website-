#!/usr/bin/env bash
# Production verification after Vercel deploy
set -u
BASE="https://www.blockframe.cloud"
SLUG="how-to-hack-an-ai-with-words-prompt-injection-explained"

echo "=== prod /blogs ==="
curl -s "$BASE/blogs" > /tmp/prod-blogs.html
echo "status links: $(grep -o 'href="/blog/[^"]*"' /tmp/prod-blogs.html | sort -u | wc -l)"
grep -o "Blockframe Labs Content Team" /tmp/prod-blogs.html | head -1
echo "category pills: $(grep -o 'href="/blogs/category/[^"]*"' /tmp/prod-blogs.html | sort -u | wc -l)"

echo ""
echo "=== prod post page ==="
curl -s -o /dev/null -w "/blog/$SLUG -> %{http_code}\n" "$BASE/blog/$SLUG"
curl -s "$BASE/blog/$SLUG" > /tmp/prod-post.html
grep -o '<link rel="canonical" href="[^"]*"' /tmp/prod-post.html
echo "byline: $(grep -c 'Blockframe Labs Content Team' /tmp/prod-post.html)"

echo ""
echo "=== prod markdown mirror ==="
curl -s -o /dev/null -w "/api/posts/$SLUG/markdown -> %{http_code}\n" "$BASE/api/posts/$SLUG/markdown"

echo ""
echo "=== prod llms.txt ==="
curl -s "$BASE/llms.txt" | wc -c

echo ""
echo "=== prod legacy redirect ==="
UUID="3c493bb0-cb5b-8193-b91a-c97cd71d4d10"
curl -s -o /dev/null -w "/post/$UUID -> %{http_code} %{redirect_url}\n" "$BASE/post/$UUID"

echo ""
echo "=== prod category page ==="
curl -s -o /dev/null -w "/blogs/category/guides -> %{http_code}\n" "$BASE/blogs/category/guides"

echo ""
echo "=== prod sitemap ==="
curl -s "$BASE/sitemap.xml" > /tmp/prod-sm.xml
echo "/blog/ urls: $(grep -c '/blog/' /tmp/prod-sm.xml)"
echo "category urls: $(grep -c 'blogs/category/' /tmp/prod-sm.xml)"
