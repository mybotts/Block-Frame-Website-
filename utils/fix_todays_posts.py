import json, urllib.request, time

with open('.env.local') as f:
    env = {}
    for line in f:
        line = line.strip()
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            env[k] = v

headers = {
    'Authorization': 'Bearer ' + env['NOTION_TOKEN'],
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
}

def req(url, method='GET', payload=None):
    data = json.dumps(payload).encode() if payload else None
    r = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(r) as resp:
        return json.load(resp)

api_page = '37393bb0-cb5b-8121-9d15-fe3a008e1338'
mcp_page = '37293bb0-cb5b-81ab-adda-c32a29246cb7'

# 1) Update API post excerpt (no em-dash)
api_excerpt = "APIs are the connective tissue of modern software. This guide explains what APIs are, how they work, why they show up everywhere, and how you can design and use them like a seasoned engineer."
excerpt_payload = {
    'properties': {
        'Excerpt': {
            'rich_text': [{
                'type': 'text',
                'text': {'content': api_excerpt}
            }]
        }
    }
}
r1 = req(f'https://api.notion.com/v1/pages/{api_page}', 'PATCH', excerpt_payload)
print('updated excerpt api', r1.get('id') == api_page)

# 2) Verify image
def check_image(url):
    try:
        rq = urllib.request.Request(url, method='HEAD')
        with urllib.request.urlopen(rq, timeout=10) as r:
            return r.status == 200 and (r.headers.get('Content-Type','').startswith('image'))
    except Exception:
        return False

api_image = 'https://cdn-icons-png.flaticon.com/512/1067/1067566.png'
ok = check_image(api_image)
print('api_image_ok', ok)
assert ok, 'Selected API image not reachable'

# 3) Append image block + URL property to API post
image_block = {
    'type': 'image',
    'image': {
        'external': {'url': api_image},
        'caption': [{
            'type': 'text',
            'text': {'content': 'A basic API concept: apps exchange structured requests and responses through shared interfaces.'},
            'plain_text': 'A basic API concept: apps exchange structured requests and responses through shared interfaces.',
            'href': None
        }]
    }
}
append = req(f'https://api.notion.com/v1/blocks/{api_page}/children', 'PATCH', {'children': [image_block]})
print('appended api image', any(b.get('type') == 'image' for b in append.get('results', [])))

# 4) MCP post: update title and remove bloat
mcp_title = 'MCP Is the USB-C for AI'
mcp_excerpt = 'MCP standardizes how AI systems connect to data sources and tools, removing brittle custom integrations and shrinking multi-agent setups to simple, reusable connectors.'
mcp_content = """
# Why AI needed a universal connector

Every major LLM provider once shipped its own tool-calling format. That forced developers to rewrite integrations every time they switched models or added a new tool. It sounds minor until you realize integration sprawl is one of the main reasons AI projects stall in production.

MCP fixes that by introducing one shared protocol for models, clients, and external servers. Think of it like the shift from dozens of wall chargers to one USB-C port: one interface, many capabilities, and real compatibility.

# Core concepts

- Server: Any service exposing tools, files, or context through MCP
- Client: The runtime that discovers servers and negotiates capabilities
- Capability: A discrete action or data access the server offers
- Context: The dynamic list of tools and resources currently visible to the model

Servers advertise capabilities, and the client negotiates which ones the current model can safely use. That keeps risk bounded.

# Protocol flow in plain English

A user asks the model a question. The client checks which servers are active. The model requests the relevant context or tool call, the client executes it, and the result is returned. Everything is typed, logged, and inspectable. This makes debugging easier than open-ended shell access.

# When to use MCP

Use MCP when you need multiple data sources, tools, or models to share one contract. It especially helps in multi-agent systems where each agent needs a consistent way to retrieve context.

Avoid it for tiny one-off scripts where adding another dependency is overhead. Simple direct calls are often clearer when the blast radius is small.

# Limitations and cautions

- Treat MCP as a boundary layer, not a security boundary by itself. Defense in depth still matters.
- Inventory what each server exposes before promoting it to production.
- Version interactions explicitly. MCP will evolve, and silent upgrades will break clients.

# Bottom line

MCP is useful when it reduces integration complexity and enforces consistency across AI systems. If your current pain is rewriting tool connectors for every model or service, start there. A working MCP layer is usually more valuable than another model benchmark.
""".strip()

# Update excerpt
excerpt_mcp = req(f'https://api.notion.com/v1/pages/{mcp_page}', 'PATCH', {
    'properties': {
        'Excerpt': {
            'rich_text': [{
                'type': 'text',
                'text': {'content': mcp_excerpt}
            }]
        },
        'title': {
            'title': [{
                'type': 'text',
                'text': {'content': 'MCP Is the USB-C for AI'}
            }]
        }
    }
})
print('updated title/excerpt mcp', excerpt_mcp.get('id') == mcp_page)

# Clear content
r_del = req(f'https://api.notion.com/v1/blocks/{mcp_page}/children', 'DELETE')
time.sleep(0.4)
print('cleared mcp children', r_del.get('archived', True))

# Build content blocks
blocks = []

def paragraph(text):
    if not text:
        return {'type': 'paragraph', 'paragraph': {'rich_text': []}}
    return {
        'type': 'paragraph',
        'paragraph': {
            'rich_text': [{'type': 'text', 'text': {'content': text}}]
        }
    }

for section in mcp_content.split('\n\n'):
    section = section.strip()
    if section.startswith('# '):
        blocks.append({'type': 'heading_1', 'heading_1': {'rich_text': [{'type': 'text', 'text': {'content': section[2:]}}]}})
    elif section.startswith('- '):
        for line in section.splitlines():
            if line.startswith('- '):
                blocks.append({'type': 'bulleted_list_item', 'bulleted_list_item': {'rich_text': [{'type': 'text', 'text': {'content': line[2:]}}]}})
            else:
                blocks.append(paragraph(line))
    else:
        blocks.append(paragraph(section))
    blocks.append({'type': 'divider', 'divider': {}})

# Remove trailing empty divider
while blocks and blocks[-1].get('type') == 'divider':
    blocks.pop()

# Insert via batch 25
inserted = 0
for start in range(0, len(blocks), 25):
    batch = blocks[start:start+25]
    res = req(f'https://api.notion.com/v1/blocks/{mcp_page}/children', 'PATCH', {'children': batch})
    inserted += len([b for b in res.get('results', []) if b.get('type') != 'child_page'])
    time.sleep(0.35)
print('inserted mcp blocks approx', inserted)

# 5) Update YT URL field in MCP page as well (already set, normalise exactly)
yt_mcp = 'https://www.youtube.com/watch?v=VBxkwMsVd7A'
yt_api = 'https://www.youtube.com/watch?v=Eri-DR1nIGI'
yt1 = req(f'https://api.notion.com/v1/pages/{mcp_page}', 'PATCH', {'properties': {'YouTube URL': {'url': yt_mcp}}})
yt2 = req(f'https://api.notion.com/v1/pages/{api_page}', 'PATCH', {'properties': {'YouTube URL': {'url': yt_api}}})
print('saved yt urls for both pages')

print('Done. API page:', api_page, 'MCP page:', mcp_page)
