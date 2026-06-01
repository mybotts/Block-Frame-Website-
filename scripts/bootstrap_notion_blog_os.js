require("dotenv").config({ path: ".env.local" });
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_PRODUCTS_DB_ID;

async function main() {
  const page = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Title: { title: [{ text: { content: "Blog OS — Automated Notion-CMS Blog Publishing System" } }] },
      Status: { select: { name: "approved" } },
      Description: {
        rich_text: [
          {
            text: {
              content:
                "A production-ready blog operating system built around a Notion CMS. It researches relevant topics, drafts editorial content, manages approval workflows, and publishes finished posts to your website automatically. Designed for teams that want consistent publishing without manual copy-paste or scattered tools.",
            },
          },
        ],
      },
      Category: { rich_text: [{ text: { content: "Content Systems" } }] },
      Price: { rich_text: [{ text: { content: "Starting at $1,950" } }] },
      Image: {
        url: "https://www.blockframe.cloud/images/blog-os-system.png",
      },
      Gradient: { rich_text: [{ text: { content: "from-indigo-500/30 via-slate-900/40 to-emerald-600/30" } }] },
    },
  });

  console.log(JSON.stringify({ id: page.id, url: page.url }, null, 2));
}

main().catch((error) => {
  console.error(error && error.code ? { code: error.code, message: error.message } : String(error));
  process.exit(1);
});
