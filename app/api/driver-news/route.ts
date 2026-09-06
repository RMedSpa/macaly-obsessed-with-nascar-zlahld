import { NextRequest, NextResponse } from 'next/server';

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

function parseRSS(xml: string, limit = 8) {
  const itemMatches = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g));
  return itemMatches.slice(0, limit).map(([, content]) => {
    const extract = (tag: string): string => {
      const cdata = content.match(
        new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`)
      );
      if (cdata) return cdata[1].trim();
      const regular = content.match(
        new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)
      );
      return regular ? regular[1].trim() : '';
    };

    const rawTitle = extract('title');
    const title = rawTitle
      .replace(/ - [^-]+$/, '')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    const link = extract('link') || extract('guid');
    const pubDateRaw = extract('pubDate');
    const source = extract('source');

    const date = pubDateRaw ? new Date(pubDateRaw) : null;
    const pubDate = date && !isNaN(date.getTime()) ? formatTimeAgo(date) : '';

    return { title, link, pubDate, source };
  });
}

export async function GET(req: NextRequest) {
  const driver = req.nextUrl.searchParams.get('driver');
  if (!driver) {
    return NextResponse.json({ items: [] });
  }

  const query = `"${driver}" NASCAR`;
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;

  console.log(`Fetching driver news for: ${driver}`);

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NascarNewsBot/1.0)',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items = parseRSS(xml, 8);
    console.log(`Driver news for ${driver}: found ${items.length} items`);
    return NextResponse.json({ items });
  } catch (err) {
    console.error(`Failed to fetch driver news for ${driver}:`, err);
    return NextResponse.json({ items: [], error: 'Failed to fetch news' });
  }
}
