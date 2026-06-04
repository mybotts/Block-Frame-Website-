#!/usr/bin/env python3
"""Create a new Leads database in Notion using the existing site integration token."""

import os, sys, requests

def load_env():
    paths = [
        "/data/workspace/hermes-agents/daniel/workspace/site/.env.local",
        os.path.expanduser("~/.hermes/profiles/daniel/.env"),
    ]
    for path in paths:
        if not os.path.exists(path):
            continue
        with open(path, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    value = value.strip("'\"")
                    if key not in os.environ:
                        os.environ[key] = value

load_env()

token = os.environ.get("NOTION_TOKEN")
if not token:
    print("Missing env: NOTION_TOKEN")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {token}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
}

# Reuse the same parent page where Posts/Products live.
parent_page_id = "32d93bb0cb5b80bd9325cb30ab732cb0"

properties = {
    "Name": {"title": {}},
    "Email": {"rich_text": {}},
    "Workspace": {"rich_text": {}},
    "Contact": {"rich_text": {}},
    "Project description": {"rich_text": {}},
    "Date": {"date": {}},
    "Source": {
        "select": {
            "options": [
                {"name": "Website", "color": "blue"},
                {"name": "Calendly", "color": "green"},
                {"name": "Referral", "color": "yellow"},
                {"name": "Social", "color": "orange"},
                {"name": "Other", "color": "gray"},
            ]
        }
    },
    "Status": {
        "select": {
            "options": [
                {"name": "New", "color": "green"},
                {"name": "Contacted", "color": "yellow"},
                {"name": "Qualified", "color": "orange"},
                {"name": "Closed-Won", "color": "blue"},
                {"name": "Closed-Lost", "color": "red"},
                {"name": "Archived", "color": "gray"},
            ]
        }
    },
    "Owner": {"rich_text": {}},
    "Tags": {
        "multi_select": {
            "options": [
                {"name": "Prospect", "color": "blue"},
                {"name": "Hot Lead", "color": "red"},
                {"name": "Cold Lead", "color": "gray"},
                {"name": "Partner", "color": "green"},
            ]
        }
    },
}

payload = {
    "parent": {"page_id": parent_page_id},
    "icon": {"type": "emoji", "emoji": "🧲"},
    "title": [{"type": "text", "text": {"content": "Leads"}}],
    "properties": properties,
}

r = requests.post(
    "https://api.notion.com/v1/databases",
    headers=headers,
    json=payload,
)

print("status:", r.status_code)
print(r.text)
