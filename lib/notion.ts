import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

let notion: Client | null = null;
let n2m: NotionToMarkdown | null = null;

export function getNotionClient() {
  if (!notion) {
    const apiKey = process.env.NOTION_API_KEY || process.env.NEXT_PUBLIC_NOTION_API_KEY;
    if (!apiKey) {
      throw new Error('NOTION_API_KEY is not set');
    }
    notion = new Client({ auth: apiKey });
    n2m = new NotionToMarkdown({ notionClient: notion });
  }
  return { notion, n2m };
}

export async function getPageData(pageId: string) {
  const { notion } = getNotionClient();

  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    return page;
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
}

export async function getPageBlocks(pageId: string) {
  const { notion } = getNotionClient();

  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });
    return blocks.results;
  } catch (error) {
    console.error('Error fetching blocks:', error);
    throw error;
  }
}

export async function getPageMarkdown(pageId: string) {
  const { n2m } = getNotionClient();

  if (!n2m) {
    throw new Error('NotionToMarkdown is not initialized');
  }

  try {
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString.parent;
  } catch (error) {
    console.error('Error converting to markdown:', error);
    throw error;
  }
}

export function extractPageId(input: string): string {
  // Remove whitespace
  input = input.trim();

  // If it's already a clean ID (32 characters, alphanumeric and dashes)
  if (/^[a-f0-9]{32}$/i.test(input.replace(/-/g, ''))) {
    return input.replace(/-/g, '');
  }

  // Extract from Notion URL
  const urlMatch = input.match(/notion\.so\/(?:.*-)?([a-f0-9]{32})/i);
  if (urlMatch) {
    return urlMatch[1];
  }

  // Extract last 32 characters if they look like an ID
  const lastPart = input.split('/').pop() || '';
  const idMatch = lastPart.match(/([a-f0-9]{32})/i);
  if (idMatch) {
    return idMatch[1];
  }

  return input;
}
