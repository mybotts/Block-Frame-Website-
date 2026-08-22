#!/usr/bin/env bash
# Local smoke test of the new blog surface (run against next start on :3458)
set -u
BASE="http://localhost:3458"
SLUG="how-to-hack-an-ai-with-words-prompt-injection-explained"

echo "=== /blogs SSR check ==="
curl -s "$BASE/blogs" > /tmp/blogs.html
echo "slug links on index: $(grep -c 'href="/blog/' /tmp/blogs.html)"
grep -o "AI News ([0-9]*)" /tmp/blogs.html | head -1
grep -o "Blockframe Labs Content Team" /tmp/blogs.html | head -1

echo ""
echo "=== post page: /blog/$SLUG ==="
curl -s "$BASE/blog/$SLUG" > /tmp/post.html
echo "byline count: $(grep -c 'Blockframe Labs Content Team' /tmp/post.html)"
grep -o '<link rel="canonical" href="[^"]*"' /tmp/post.html
grep -o '"dateModified":"[^"]*"' /tmp/post.html | head -1
grep -o '"wordCount":[0-9]*' /tmp/post.html | head -1
echo "toc present (0/1): $(grep -c 'On this page' /tmp/post.html)"
echo "bio box present (0/1): $(grep -c 'About the author' /tmp/post.html)"
echo "work-with-us CTA (0/1): $(grep -c 'See Blog OS' /tmp/post.html)"

echo ""
echo "=== legacy UUID redirect ==="
UUID=$(curl -s "$BASE/api/posts" | python3 -c "import json,sys; print(json.load(sys.stdin)['posts'][0]['id'])")
echo "uuid: $UUID"
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" "$BASE/post/$UUID"

echo ""
echo "=== markdown mirror ==="
curl -s "$BASE/api/posts/$SLUG/markdown" > /tmp/post.md
head -9 /tmp/post.md
echo "... ($(wc -l < /tmp/post.md) lines total)"

echo ""
echo "=== llms.txt ==="
curl -s "$BASE/llms.txt" > /tmp/llms.txt
wc -c < /tmp/llms.txt
head -12 /tmp/llms.txt

echo ""
echo "=== feeds ==="
curl -s "$BASE/rss.xml" | grep -o "<guid isPermaLink=\"true\">[^<]*</guid>" | head -2
curl -s "$BASE/feed.json" > /tmp/feed.json
python3 -c "
import json
d = json.load(open('/tmp/feed.json'))
print('jsonfeed items:', len(d['items']))
print('first url:', d['items'][0]['url'])
print('authors:', d['items'][0]['authors'])
"
curl -s "$BASE/sitemap.xml" > /tmp/sm.xml
grep -o "<loc>[^<]*blog/[^<]*</loc>" /tmp/sm.xml | head -2
echo "category urls in sitemap: $(grep -c 'blogs/category/' /tmp/sm.xml)"

echo ""
echo "=== category page ==="
curl -s "$BASE/blogs/category/guides" > /tmp/cat.html
grep -o '<title>[^<]*</title>' /tmp/cat.html
echo "cards on category page: $(grep -c 'href="/blog/' /tmp/cat.html)"

echo ""
echo "=== legacy category redirects ==="
curl -s -o /dev/null -w "/guides %{http_code} -> %{redirect_url}\n" "$BASE/guides"
curl -s -o /dev/null -w "/ai-news %{http_code} -> %{redirect_url}\n" "$BASE/ai-news"
