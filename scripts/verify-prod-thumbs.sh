#!/usr/bin/env bash
# Production check: thumbnails live after deploy
curl -s "https://www.blockframe.cloud/blogs" > /tmp/prod-blogs2.html
echo "real imgs: $(grep -o '<img src="' /tmp/prod-blogs2.html | wc -l)"
echo "fallback panels: $(grep -o '28px 28px' /tmp/prod-blogs2.html | wc -l)"
grep -o '<img src="[^"]*"' /tmp/prod-blogs2.html | head -4
echo ""
echo "local asset check:"
curl -s -o /dev/null -w "%{http_code} %{size_download}b\n" "https://www.blockframe.cloud/images/thumbnails/3c293bb0-cb5b-81d2-bce6-d18b2243608e.png"
echo ""
echo "OG image on stabilized post:"
curl -s "https://www.blockframe.cloud/blog/ai-agent-benchmarks-and-evaluation-2026" | grep -o '<meta property="og:image" content="[^"]*"' | head -1 | cut -c1-120
