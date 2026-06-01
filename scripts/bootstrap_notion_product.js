require("dotenv").config({ path: ".env.local" });
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_PRODUCTS_DB_ID;

async function main() {
  const page = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Title: { title: [{ text: { content: "Proposal-Led Agentic Outreach System" } }] },
      Status: { select: { name: "approved" } },
      Description: {
        rich_text: [
          {
            text: {
              content:
                "A custom implementation that researches qualified prospects, creates personalized sample assets, publishes private proposal pages, and prepares controlled outreach through your existing CRM and mailbox.",
            },
          },
        ],
      },
      Category: { rich_text: [{ text: { content: "Growth Automation" } }] },
      Price: { rich_text: [{ text: { content: "Starting at $1,250" } }] },
      Image: {
        url: "https://www.blockframe.cloud/images/agentic-outreach-engine.png",
      },
      Gradient: { rich_text: [{ text: { content: "from-teal-500/30 via-slate-900/40 to-amber-700/30" } }] },
    },
  });

  console.log(JSON.stringify({ id: page.id, url: page.url }, null, 2));
}

main().catch((error) => {
  console.error(error && error.code ? { code: error.code, message: error.message } : String(error));
  process.exit(1);
});
