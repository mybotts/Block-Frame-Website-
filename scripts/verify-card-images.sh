#!/usr/bin/env bash
# How many blog cards render with vs without a thumbnail?
curl -s "https://www.blockframe.cloud/blogs" > /tmp/blogs-check.html
total_cards=$(grep -o 'class="glass-card group block' /tmp/blogs-check.html | wc -l)
with_img=$(grep -o 'bg-cover bg-center' /tmp/blogs-check.html | wc -l)
echo "cards total: $total_cards"
echo "cards with thumbnail: $with_img"
echo "cards without: $((total_cards - with_img))"
