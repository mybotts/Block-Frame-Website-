import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB_ID = process.env.NOTION_POSTS_DB_ID || "";

if (!DB_ID) throw new Error("Missing NOTION_POSTS_DB_ID");

const videoUrls = [
  "https://youtube.com/shorts/VBxkwMsVd7A?si=z8sZtTfIWyayl5KQ",
  "https://youtube.com/shorts/Qc_PUOT81GI?si=MvU290Ylg4r_rQZP",
  "https://youtube.com/shorts/Eri-DR1nIGI?si=Uh9mQv8gm0_AqzTB",
  "https://youtube.com/shorts/ITqCtDaZv3U?si=QwMs9IiI475vVsR3",
  "https://youtube.com/shorts/aVKSJhrlkFY?si=QW62z2a-Vtn6Lgjk",
  "https://youtube.com/shorts/Phb2NAA0CHc?si=g1Bl87s0A_nwx2qO",
  "https://youtube.com/shorts/pA8X8S-uHfQ?si=lqJ-ZpB0jB5jMfm_",
  "https://youtube.com/shorts/fAzw2dViVes?si=xD5i2oetqslyasYd",
  "https://youtube.com/shorts/SgRwfMyko54?si=9CTH_xPW2AP-q17h",
];

async function createVideoPost(url: string, index: number) {
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);
  const videoId = shortsMatch?.[1] || "unknown";
  const title = `YouTube Shorts: ${videoId}`;

  const blocks = [
    {
      type: "video",
      content: url,
      order: 0,
      id: `block-youtube-${index}`,
    },
  ];

  const contentJson = JSON.stringify(blocks);

  const page = await notion.pages.create({
    parent: { database_id: DB_ID },
    properties: {
      Title: {
        title: [{ text: { content: title } }],
      },
      Category: {
        select: { name: "Videos" },
      },
      Status: {
        select: { name: "approved" },
      },
      Excerpt: {
        rich_text: [{ text: { content: "YouTube Shorts video" } }],
      },
      Content: {
        rich_text: [{ text: { content: contentJson } }],
      },
      Author: {
        rich_text: [{ text: { content: "BlockFrameLabs" } }],
      },
    },
  });

  console.log(`✅ Created: ${title}`);
  return page.id;
}

async function main() {
  for (let i = 0; i < videoUrls.length; i++) {
    try {
      await createVideoPost(videoUrls[i], i);
    } catch (err: any) {
      console.error(`❌ Failed for ${videoUrls[i]}:`, err?.message || err);
    }
    // Small delay to avoid rate limiting
    if (i < videoUrls.length - 1) await new Promise(r => setTimeout(r, 500));
  }
}

main();
