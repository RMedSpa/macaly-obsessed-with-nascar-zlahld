export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export interface SeriesInfo {
  key: SeriesKey;
  name: string;
  shortName: string;
  color: string;
  label: string;
  items: NewsItem[];
}

export const SERIES_CONFIG = {
  cup: {
    name: 'NASCAR Cup Series',
    shortName: 'Cup Series',
    query: 'NASCAR Cup Series 2025',
    color: 'series-cup',
    label: '🏆 CUP SERIES',
    borderColor: 'border-series-cup',
  },
  xfinity: {
    name: "NASCAR O'Reilly Auto Parts Series",
    shortName: "O'Reilly Series",
    query: "NASCAR O'Reilly Auto Parts Series 2026",
    color: 'series-xfinity',
    label: "⚡ O'REILLY SERIES",
    borderColor: 'border-series-xfinity',
  },
  truck: {
    name: 'NASCAR Craftsman Truck Series',
    shortName: 'Truck Series',
    query: 'NASCAR Craftsman Truck Series 2025',
    color: 'series-truck',
    label: '🚛 TRUCK SERIES',
    borderColor: 'border-series-truck',
  },
  arca: {
    name: 'ARCA Menards Series',
    shortName: 'ARCA Series',
    query: 'ARCA Menards Series 2025',
    color: 'series-arca',
    label: '🏁 ARCA MENARDS',
    borderColor: 'border-series-arca',
  },
  indycar: {
    name: 'NTT IndyCar Series',
    shortName: 'IndyCar',
    query: 'NTT IndyCar Series 2026',
    color: 'series-indycar',
    label: '🔵 NTT INDYCAR',
    borderColor: 'border-series-indycar',
  },
} as const;

export type SeriesKey = keyof typeof SERIES_CONFIG;

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

function parseRSS(xml: string, limit = 6): NewsItem[] {
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
    // Google News appends "- Source Name" to titles — strip it
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

export async function fetchSeriesNews(
  series: SeriesKey,
  limit = 6
): Promise<NewsItem[]> {
  const config = SERIES_CONFIG[series];
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(
    config.query
  )}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; NascarNewsBot/1.0)',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    console.log(`Fetched ${series} news, XML length: ${xml.length}`);
    return parseRSS(xml, limit);
  } catch (err) {
    console.error(`Failed to fetch news for ${series}:`, err);
    return [];
  }
}
