#!/usr/bin/env bash
# Production final check: no external image deps, all thumbs local
sleep 5
curl -s "https://www.blockframe.cloud/blogs" > /tmp/prod-final.html
echo "total imgs: $(grep -o '<img src="' /tmp/prod-final.html | wc -l)"
echo "external wikimedia: $(grep -o 'src="https://upload.wikimedia[^"]*"' /tmp/prod-final.html | wc -l)"
echo "local thumbnails: $(grep -o 'src="/images/thumbnails/[^"]*"' /tmp/prod-final.html | wc -l)"
# sample a few local assets over prod
for f in $(grep -o 'src="/images/thumbnails/[^"]*"' /tmp/prod-final.html | head -3 | sed 's/src="//;s/"//'); do
  curl -s -o /dev/null -w "$f -> %{http_code}\n" "https://www.blockframe.cloud$f"
done
