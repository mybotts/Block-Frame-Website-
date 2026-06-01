#!/usr/bin/env python3
"""Direct Notion REST audit for Videos rows: dedupe by YouTube ID, keep only 200+ views."""

import os, sys, json, re, time, requests
from datetime import datetime, timezone

def load_env():
    for path in [
        "/data/workspace/hermes-agents/daniel/workspace/site/.env.local",
        os.path.expanduser("~/.hermes/profiles/daniel/.env"),
    ]:
        if not os.path.exists(path):
            continue
        with open(path, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    value = value.strip("\"'")
                    if key not in os.environ:
                        os.environ[key] = value

load_env()

token = os.environ.get("NOTION_TOKEN")
db_id = os.environ.get("NOTION_POSTS_DB_ID")
yt_key = os.environ.get("YOUTUBE_API_KEY")
channel_id = os.environ.get("YT_CHANNEL_ID", "UCBjmMx3gBUHaOGqUH3ZZyhQ")

if not all([token, db_id, yt_key]):
    print("Missing env:", [k for k in ["NOTION_TOKEN","NOTION_POSTS_DB_ID","YOUTUBE_API_KEY"] if not os.environ.get(k)])
    sys.exit(1)

headers = {"Authorization": f"Bearer {token}", "Notion-Version": "2022-06-28", "Content-Type": "application/json"}


def get_prop(props, name):
    p = props.get(name)
    if not p:
        return ""
    t = p.get("type")
    if t == "title":
        return "".join(x.get("plain_text", "") for x in p.get("title", []))
    if t == "rich_text":
        return "".join(x.get("plain_text", "") for x in p.get("rich_text", []))
    if t == "select":
        return p.get("select", {}).get("name", "")
    if t == "date":
        return (p.get("date") or {}).get("start", "")
    return ""

def parse_yt_id(url: str):
    if not url:
        return None
    m = re.search(r"(?:youtube\.com/(?:watch\?v=|shorts/)|youtu\.be/)([A-Za-z0-9_-]{11})", url)
    if m:
        return m.group(1)
    return None

def query_all_videos():
    pages = []
    body = {"filter": {"property": "Category", "select": {"equals": "Videos"}}, "page_size": 100}
    cursor = None
    while True:
        payload = dict(body)
        if cursor:
            payload["start_cursor"] = cursor
        r = requests.post(
            f"https://api.notion.com/v1/databases/{db_id}/query",
            headers=headers,
            json=payload,
        )
        r.raise_for_status()
        data = r.json()
        pages.extend(data.get("results", []))
        if not data.get("has_more"):
            break
        cursor = data.get("next_cursor")
    return pages

def extract_youtube_id(page_id: str) -> str | None:
    # Prefer explicit YouTube ID property
    page = requests.get(f"https://api.notion.com/v1/pages/{page_id}", headers=headers).json()
    props = page.get("properties", {})
    explicit = get_prop(props, "YouTube ID") or ""
    if explicit:
        # Could be a full URL or raw id; treat first 11-char id found as the id
        m = re.search(r"[A-Za-z0-9_-]{11}", explicit)
        if m:
            return m.group(0)
    # Parse Content JSON or child blocks
    c = props.get("Content")
    raw = ""
    if c and c.get("rich_text"):
        raw = "".join(x.get("plain_text", "") for x in c["rich_text"])
    if raw:
        try:
            blocks = json.loads(raw)
            for b in blocks:
                vid = parse_yt_id(b.get("content", ""))
                if vid:
                    return vid
        except Exception:
            pass
    # Fallback to child video blocks
    children = requests.get(
        f"https://api.notion.com/v1/blocks/{page_id}/children",
        headers=headers,
        params={"page_size": 100},
    ).json()
    for b in children.get("results", []):
        if b.get("type") == "video":
            v = b["video"]
            url = v.get("external", {}).get("url") or v.get("file", {}).get("url") or ""
            vid = parse_yt_id(url)
            if vid:
                return vid
    return None

def yt_view_count(video_id: str) -> int:
    r = requests.get(
        "https://www.googleapis.com/youtube/v3/videos",
        params={"part": "statistics", "id": video_id, "key": yt_key},
        timeout=30,
    )
    r.raise_for_status()
    items = r.json().get("items") or []
    if not items:
        return 0
    return int((items[0].get("statistics") or {}).get("viewCount") or 0)

def archive_page(page_id: str):
    requests.patch(
        f"https://api.notion.com/v1/pages/{page_id}",
        headers=headers,
        json={"archived": True},
    ).raise_for_status()

# ---------------------- main ----------------------

pages = query_all_videos()
print(f"Fetched {len(pages)} Notion Video rows")

records = []
for p in pages:
    pid = p["id"]
    title = get_prop(p["properties"], "Title")
    yt_id = extract_youtube_id(pid) or ""
    created_time = p.get("created_time", "")
    records.append({"notion_id": pid, "title": title, "yt_id": yt_id, "created_time": created_time})

# Throttled view count lookup
yt_stats = {}
for rec in records:
    if rec["yt_id"] and rec["yt_id"] not in yt_stats:
        yt_stats[rec["yt_id"]] = yt_view_count(rec["yt_id"])
        time.sleep(0.05)

from collections import defaultdict

# Dedup
by_yt = defaultdict(list)
for rec in records:
    if rec["yt_id"]:
        by_yt[rec["yt_id"]].append(rec)

for yt_id, recs in by_yt.items():
    recs_sorted = sorted(recs, key=lambda x: x["created_time"] or "", reverse=True)
    keep = recs_sorted[0]
    views = yt_stats.get(yt_id, 0)
    print(f"Keep {keep['notion_id']} views={views} title={keep['title']!r}")
    for dup in recs_sorted[1:]:
        print(f"Archive duplicate {dup['notion_id']} title={dup['title']!r}")
        archive_page(dup["notion_id"])

# <200 views enforcement
for rec in records:
    if not rec["yt_id"]:
        continue
    # if it survived dedupe or was unrelated, enforce threshold
    views = yt_stats.get(rec["yt_id"], 0)
    if views < 200:
        print(f"Archive low-views {rec['notion_id']} views={views} title={rec['title']!r}")
        archive_page(rec["notion_id"])

print("Done.")
