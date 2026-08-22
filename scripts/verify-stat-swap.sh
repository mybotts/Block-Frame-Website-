#!/usr/bin/env bash
# Verify the 30/30 stat swap is live in production
set -u
BASE="https://www.blockframe.cloud"
curl -s "$BASE/" > /tmp/prod-home2.html

echo "new stat present: $(grep -c 'blogs in 30 days' /tmp/prod-home2.html)"
echo "blog-os card stats: $(grep -o '>30</p>\|>30<\|blogs' /tmp/prod-home2.html | sort | uniq -c | tr '\n' ' ')"
echo "old claim remnants (must be 0): $(grep -c 'posts in 90 days\|37' /tmp/prod-home2.html)"
