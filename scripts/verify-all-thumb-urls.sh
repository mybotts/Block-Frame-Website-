#!/usr/bin/env bash
# Verify every thumbnail <img> on the local blog index actually loads (HTTP 200 + image type)
set -u
BASE="http://localhost:3463"

curl -s "$BASE/blogs" > /tmp/blogs-final.html

# extract all img srcs
grep -o '<img src="[^"]*"' /tmp/blogs-final.html | sed 's/<img src="//;s/"$//' | sort -u > /tmp/thumb-srcs.txt

total=0; ok=0; fail=0
while IFS= read -r src; do
  total=$((total+1))
  if [[ "$src" == http* ]]; then
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 "$src")
    ctype=$(curl -s -o /dev/null -w "%{content_type}" --max-time 5 "$src" 2>/dev/null || echo "?")
  else
    code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$src")
    ctype=$(curl -s -o /dev/null -w "%{content_type}" "$BASE$src")
  fi
  case "$code" in
    200) ok=$((ok+1));;
    *) fail=$((fail+1)); echo "FAIL $code $ctype $src";;
  esac
done < /tmp/thumb-srcs.txt

echo ""
echo "unique thumbnail srcs: $total | loading OK: $ok | failing: $fail"
