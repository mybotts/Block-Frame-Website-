const { Client } = require('@notionhq/client');
const fs = require('fs');

/**
 * Enhanced Notion Publisher that handles large documents via batching
 */
class NotionPublisherEnhanced {
  constructor(config) {
    this.secret = config.secret;
    this.parentPageId = config.parentPageId;
    this.client = new Client({ auth: this.secret });
  }

  async initialize() {
    try {
      const page = await this.client.pages.retrieve({ page_id: this.parentPageId });
      const title = page.properties?.title?.title?.[0]?.plain_text || '(Untitled)';
      console.log(`✅ Connected to Notion parent: "${title}"`);
      return page;
    } catch (error) {
      console.error('❌ Failed to connect to Notion:', error.message);
      throw error;
    }
  }

  markdownToBlocks(markdown) {
    const blocks = [];
    const lines = markdown.split('\n');
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();
      
      if (!trimmed) {
        i++;
        continue;
      }
      
      if (trimmed.startsWith('# ')) {
        blocks.push(this.createHeading(trimmed.slice(2), 'heading_1'));
        i++;
        continue;
      }
      if (trimmed.startsWith('## ')) {
        blocks.push(this.createHeading(trimmed.slice(3), 'heading_2'));
        i++;
        continue;
      }
      if (trimmed.startsWith('### ')) {
        blocks.push(this.createHeading(trimmed.slice(4), 'heading_3'));
        i++;
        continue;
      }
      
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const listItems = this.collectListItems(lines, i, '- ');
        i += listItems.length;
        blocks.push(...listItems);
        continue;
      }
      
      if (/^\d+\.\s+/.test(trimmed)) {
        const listItems = this.collectNumberedListItems(lines, i);
        i += listItems.length;
        blocks.push(...listItems);
        continue;
      }
      
      if (trimmed.startsWith('> ')) {
        blocks.push({
          object: 'block',
          type: 'quote',
          quote: {
            rich_text: this.richTextArray(trimmed.slice(2)),
            children: []
          }
        });
        i++;
        continue;
      }
      
      if (trimmed.startsWith('```')) {
        const codeBlock = this.collectCodeBlock(lines, i);
        i = codeBlock.endLine;
        blocks.push(codeBlock.block);
        continue;
      }
      
      if (trimmed.includes('|') && lines[i+1]?.includes('|---')) {
        const tableBlock = this.collectTable(lines, i);
        i = tableBlock.endLine;
        blocks.push(tableBlock.block);
        continue;
      }
      
      const paraLines = this.collectParagraph(lines, i);
      i += paraLines.length;
      const paragraph = paraLines.join(' ').trim();
      if (paragraph) {
        blocks.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: this.richTextArray(paragraph),
            children: []
          }
        });
      }
    }
    
    return blocks;
  }

  richTextArray(content) {
    return [{ type: 'text', text: { content: String(content) } }];
  }

  createHeading(text, type) {
    return {
      object: 'block',
      type,
      [type]: {
        rich_text: this.richTextArray(text),
        children: []
      }
    };
  }

  collectListItems(lines, startIdx, marker) {
    const items = [];
    let i = startIdx;
    
    while (i < lines.length) {
      const trimmed = lines[i].trim();
      if (!trimmed || !trimmed.startsWith(marker)) break;
      
      const content = trimmed.slice(marker.length).trim();
      items.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: this.richTextArray(content),
          children: []
        }
      });
      i++;
    }
    
    return items;
  }

  collectNumberedListItems(lines, startIdx) {
    const items = [];
    let i = startIdx;
    
    while (i < lines.length) {
      const trimmed = lines[i].trim();
      if (!/^\d+\.\s+/.test(trimmed)) break;
      
      const content = trimmed.replace(/^\d+\.\s+/, '').trim();
      items.push({
        object: 'block',
        type: 'numbered_list_item',
        numbered_list_item: {
          rich_text: this.richTextArray(content),
          children: []
        }
      });
      i++;
    }
    
    return items;
  }

  collectCodeBlock(lines, startIdx) {
    const match = lines[startIdx].trim().match(/^```(\w*)$/);
    const language = match ? match[1] : '';
    const codeLines = [];
    let i = startIdx + 1;
    
    while (i < lines.length && !lines[i].trim().startsWith('```')) {
      codeLines.push(lines[i]);
      i++;
    }
    
    return {
      block: {
        object: 'block',
        type: 'code',
        code: {
          rich_text: [{ type: 'text', text: { content: codeLines.join('\n') } }],
          language: language || 'plain text'
        }
      },
      endLine: i + 1
    };
  }

  collectTable(lines, startIdx) {
    const rows = [];
    let i = startIdx;
    
    while (i < lines.length && lines[i]?.includes('|')) {
      const cells = lines[i]
        .split('|')
        .map(c => c.trim())
        .filter(c => c.length > 0 || c === '');
      if (cells.length > 0) rows.push(cells);
      i++;
    }
    
    if (i < lines.length && lines[i]?.includes('|---')) {
      i++;
    }
    
    const width = Math.min(...rows.map(r => r.length));
    
    return {
      block: {
        object: 'block',
        type: 'table',
        table: {
          table_width: width,
          has_column_header: true,
          has_row_header: false,
          children: rows.map(row => ({
            object: 'block',
            type: 'table_row',
            table_row: {
              cells: row.map(cell => this.richTextArray(cell))
            }
          }))
        }
      },
      endLine: i
    };
  }

  collectParagraph(lines, startIdx) {
    const paragraphs = [];
    let i = startIdx;
    
    while (i < lines.length) {
      const trimmed = lines[i].trim();
      if (!trimmed ||
          trimmed.startsWith('#') ||
          trimmed.startsWith('-') ||
          trimmed.startsWith('*') ||
          trimmed.startsWith('>') ||
          trimmed.startsWith('```') ||
          trimmed === '---' ||
          trimmed === '***' ||
          /^\d+\.\s+/.test(trimmed)) {
        break;
      }
      paragraphs.push(lines[i]);
      i++;
    }
    
    return paragraphs;
  }

  generateTitle(content, customTitle) {
    const today = new Date().toISOString().split('T')[0];
    if (customTitle) {
      const clean = customTitle.replace(/[^\w\s\-]/g, '').trim().substring(0, 100);
      return `${today} - ${clean}`;
    }
    const firstLine = content.split('\n')[0].trim();
    const headingMatch = content.match(/^#+\s+(.+)$/m);
    const extracted = headingMatch 
      ? headingMatch[1].substring(0, 100)
      : firstLine.replace(/[^\w\s\-]/g, '').substring(0, 80);
    return `${today} - ${extracted || 'Untitled'}`;
  }

  isSubstantive(content) {
    if (!content || typeof content !== 'string') return false;
    const trimmed = content.trim();
    if (trimmed.length === 0) return false;
    const minWords = 50;
    const minChars = 200;
    const hasMarkdown = /[#*_`>\-]/.test(trimmed);
    const words = trimmed.split(/\s+/).length;
    const chars = trimmed.length;
    return (words >= minWords && chars >= minChars) || hasMarkdown;
  }

  /**
   * Publish content with proper batching for large documents
   */
  async publish(content, options = {}) {
    if (!this.isSubstantive(content)) {
      console.log('⏭️  Content not substantive, skipping publish');
      return null;
    }

    const title = this.generateTitle(content, options.title);
    const blocks = this.markdownToBlocks(content);
    
    console.log(`📄 Publishing "${title}"`);
    console.log(`   Total blocks to upload: ${blocks.length}`);
    
    try {
      // Step 1: Create the page with title
      console.log('   Creating page...');
      const page = await this.client.pages.create({
        parent: { page_id: this.parentPageId },
        properties: {
          title: {
            title: [{ text: { content: title } }]
          }
        }
        // Don't add children yet; we'll append in batches
      });
      
      console.log(`   Page created: ${page.id}`);
      
      // Step 2: Append blocks in batches of 100 (Notion limit)
      const batchSize = 100;
      const totalBatches = Math.ceil(blocks.length / batchSize);
      
      for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        const start = batchIndex * batchSize;
        const end = Math.min(start + batchSize, blocks.length);
        const batch = blocks.slice(start, end);
        
        console.log(`   Uploading batch ${batchIndex + 1}/${totalBatches} (blocks ${start + 1}-${end})...`);
        
        await this.client.blocks.children.append({
          block_id: page.id,
          children: batch
        });
        
        // Small delay to avoid rate limiting
        if (batchIndex < totalBatches - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
      
      const url = `https://www.notion.so/${page.id.replace(/-/g, '')}`;
      console.log(`✅ Published successfully!`);
      console.log(`   URL: ${url}`);
      
      return {
        success: true,
        pageId: page.id,
        url,
        title,
        blockCount: blocks.length,
        batches: totalBatches
      };
      
    } catch (error) {
      console.error('❌ Publish failed:', error.message);
      if (error.response) {
        console.error('   Status:', error.response.status);
        console.error('   Body:', JSON.stringify(error.response.body, null, 2));
      }
      throw error;
    }
  }
}

// Main execution
async function main() {
  const content = fs.readFileSync('/data/workspace/workers/daniel/openclaw-complete-guide-blog-post-restructured.md', 'utf8');
  
  const publisher = new NotionPublisherEnhanced({
    parentPageId: '32d93bb0cb5b80bd9325cb30ab732cb0',
    workspace: 'Openclaw Docs'
  });

  try {
    await publisher.initialize();
    const result = await publisher.publish(content, { 
      title: 'OpenClaw Complete Guide | Self-Hosted AI Agents (Restructured)' 
    });
    
    if (result) {
      console.log('\n🎉 PUBLISH RESULT:');
      console.log('   URL:', result.url);
      console.log('   Blocks:', result.blockCount);
      console.log('   Batches:', result.batches);
    } else {
      console.error('Publish returned null');
      process.exit(1);
    }
  } catch (err) {
    console.error('FATAL ERROR:', err);
    process.exit(1);
  }
}

main();
