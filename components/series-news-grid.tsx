import Link from 'next/link';
import { SeriesInfo } from '@/lib/news';

const COLOR_MAP: Record<string, { border: string; text: string; bg: string; badge: string; hover: string }> = {
  'series-cup': {
    border: 'border-series-cup/40',
    text: 'text-series-cup',
    bg: 'bg-series-cup/10',
    badge: 'bg-series-cup',
    hover: 'hover:text-series-cup',
  },
  'series-xfinity': {
    border: 'border-series-xfinity/40',
    text: 'text-series-xfinity',
    bg: 'bg-series-xfinity/10',
    badge: 'bg-series-xfinity',
    hover: 'hover:text-series-xfinity',
  },
  'series-truck': {
    border: 'border-series-truck/40',
    text: 'text-series-truck',
    bg: 'bg-series-truck/10',
    badge: 'bg-series-truck',
    hover: 'hover:text-series-truck',
  },
  'series-arca': {
    border: 'border-series-arca/40',
    text: 'text-series-arca',
    bg: 'bg-series-arca/10',
    badge: 'bg-series-arca',
    hover: 'hover:text-series-arca',
  },
  'series-indycar': {
    border: 'border-series-indycar/40',
    text: 'text-series-indycar',
    bg: 'bg-series-indycar/10',
    badge: 'bg-series-indycar',
    hover: 'hover:text-series-indycar',
  },
};

interface SeriesNewsGridProps {
  seriesNews: SeriesInfo[];
}

export default function SeriesNewsGrid({ seriesNews }: SeriesNewsGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      {/* Section header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="h-px flex-1 bg-border" />
        <h2 className="font-archivo text-lg sm:text-2xl tracking-wide text-foreground uppercase whitespace-nowrap">
          Latest Race News
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {seriesNews.map((series) => {
          const colors = COLOR_MAP[series.color] || COLOR_MAP['series-cup'];
          return (
            <div
              key={series.key}
              id={series.key}
              className={`card-lift bg-card rounded-xl border border-t-4 ${colors.border} overflow-hidden`}
              style={{ borderColor: undefined }}
            >
              {/* Card header */}
              <div className={`${colors.bg} px-3 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-2 border-b border-border`}>
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-2 h-2 rounded-full ${colors.badge} flex-shrink-0`} />
                  <span className={`font-oswald font-700 text-xs sm:text-sm tracking-widest uppercase ${colors.text} truncate`}>
                    {series.label}
                  </span>
                </div>
                <Link
                  href={`https://news.google.com/search?q=${encodeURIComponent(series.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-oswald text-xs tracking-widest ${colors.text} hover:opacity-70 transition-opacity uppercase flex-shrink-0`}
                >
                  All →
                </Link>
              </div>

              {/* News items */}
              <div className="divide-y divide-border/50">
                {series.items.length === 0 ? (
                  <div className="px-3 sm:px-5 py-8 text-center text-muted-foreground font-oswald text-sm">
                    Loading latest headlines...
                  </div>
                ) : (
                  series.items.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 sm:px-5 py-3 transition-colors hover:bg-secondary/60 group"
                    >
                      <p className="font-oswald font-400 text-sm text-foreground/90 group-hover:text-nascar-red transition-colors leading-snug mb-1">
                        {item.title}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground font-oswald">
                        {item.source && (
                          <>
                            <span className={`${colors.text} opacity-70`}>{item.source}</span>
                            <span>·</span>
                          </>
                        )}
                        <span>{item.pubDate}</span>
                      </div>
                    </Link>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-3 sm:px-5 py-3 border-t border-border/50 bg-secondary/20">
                <Link
                  href={`https://news.google.com/search?q=${encodeURIComponent(series.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-oswald font-600 tracking-widest text-xs ${colors.text} hover:opacity-70 transition-opacity uppercase`}
                >
                  More {series.shortName} News →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
