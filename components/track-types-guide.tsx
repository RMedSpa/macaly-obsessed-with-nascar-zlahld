import Link from 'next/link';
import TrackSizeCompare from '@/components/track-size-compare';
import {
  NEW_HAMPSHIRE_CALLOUT,
  PHOENIX_CALLOUT,
  TRACK_CATEGORIES,
  type TrackCategory,
} from '@/lib/track-types';

const ACCENT_BORDER: Record<TrackCategory['accent'], string> = {
  'nascar-red': 'border-t-nascar-red',
  'nascar-blue': 'border-t-nascar-blue',
  'series-truck': 'border-t-series-truck',
  'strategy-cyan': 'border-t-strategy-cyan',
  'series-arca': 'border-t-series-arca',
};

const ACCENT_TEXT: Record<TrackCategory['accent'], string> = {
  'nascar-red': 'text-nascar-red',
  'nascar-blue': 'text-nascar-blue',
  'series-truck': 'text-series-truck',
  'strategy-cyan': 'text-strategy-cyan',
  'series-arca': 'text-series-arca',
};

const ACCENT_DOT: Record<TrackCategory['accent'], string> = {
  'nascar-red': 'bg-nascar-red',
  'nascar-blue': 'bg-nascar-blue',
  'series-truck': 'bg-series-truck',
  'strategy-cyan': 'bg-strategy-cyan',
  'series-arca': 'bg-series-arca',
};

const ACCENT_CHIP: Record<TrackCategory['accent'], string> = {
  'nascar-red': 'bg-nascar-red/10 text-nascar-red border-nascar-red/25',
  'nascar-blue': 'bg-nascar-blue/10 text-nascar-blue border-nascar-blue/25',
  'series-truck': 'bg-series-truck/10 text-series-truck border-series-truck/25',
  'strategy-cyan': 'bg-strategy-cyan/10 text-strategy-cyan border-strategy-cyan/25',
  'series-arca': 'bg-series-arca/10 text-series-arca border-series-arca/25',
};

function CategoryCard({ cat, index }: { cat: TrackCategory; index: number }) {
  return (
    <article
      id={cat.id}
      className={`scroll-mt-24 bg-card border border-border border-t-4 ${ACCENT_BORDER[cat.accent]} rounded-xl p-5 sm:p-7 card-lift`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-oswald text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Category {String(index + 1).padStart(2, '0')}
          </p>
          <h2 className="font-archivo text-2xl sm:text-3xl uppercase tracking-tight text-foreground mt-1">
            {cat.label}
          </h2>
          <p className={`font-oswald text-sm sm:text-base mt-1 ${ACCENT_TEXT[cat.accent]}`}>
            {cat.tagline}
          </p>
        </div>
        <span
          className={`font-oswald text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${ACCENT_CHIP[cat.accent]}`}
        >
          {cat.lengthRange}
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h3 className="font-oswald text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-1.5">
              Banking & layout
            </h3>
            <p className="font-oswald text-sm sm:text-[15px] text-foreground/85 leading-relaxed">
              {cat.bankingStyle}
            </p>
          </div>
          <div>
            <h3 className="font-oswald text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-1.5">
              What the racing looks like
            </h3>
            <p className="font-oswald text-sm sm:text-[15px] text-foreground/85 leading-relaxed">
              {cat.racingStyle}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/40 p-4">
            <h3 className="font-oswald text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-1.5">
              Pit strategy difference
            </h3>
            <p className="font-oswald text-sm text-foreground/85 leading-relaxed mb-3">
              {cat.pitStrategy}
            </p>
            <Link
              href={cat.pitStrategyHref}
              className={`inline-flex items-center gap-2 font-oswald text-xs sm:text-sm uppercase tracking-[0.18em] ${ACCENT_TEXT[cat.accent]} hover:underline underline-offset-4`}
            >
              Open Pit Strategy Calculator
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-oswald text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            Example tracks
          </h3>
          <ul className="space-y-2.5">
            {cat.examples.map((ex) => (
              <li
                key={ex.name}
                className="flex items-start gap-3 rounded-lg border border-border bg-background/80 px-3.5 py-3"
              >
                <span
                  className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${ACCENT_DOT[cat.accent]}`}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <p className="font-archivo text-sm sm:text-base uppercase tracking-wide text-foreground">
                      {ex.name}
                    </p>
                    <p className="font-oswald text-xs tabular-nums text-muted-foreground tracking-wider">
                      {ex.lengthMi} mi
                    </p>
                  </div>
                  {ex.note ? (
                    <p className="font-oswald text-xs text-muted-foreground mt-0.5">{ex.note}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function TrackTypesGuide() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border px-3 sm:px-4 py-10 sm:py-14">
        <div className="absolute inset-0 pointer-events-none speed-lines-bg opacity-70" aria-hidden />
        <div
          className="absolute -right-16 -top-20 w-72 h-72 rounded-full blur-3xl opacity-30 bg-nascar-blue"
          aria-hidden
        />
        <div
          className="absolute -left-10 bottom-0 w-64 h-64 rounded-full blur-3xl opacity-25 bg-nascar-red"
          aria-hidden
        />

        <div className="relative max-w-5xl mx-auto">
          <p className="font-oswald tracking-[0.25em] text-muted-foreground text-xs sm:text-sm uppercase mb-2">
            Field guide · Cup circuit geography
          </p>
          <h1 className="font-archivo text-4xl sm:text-5xl md:text-7xl tracking-tight text-foreground leading-[0.95] mb-4">
            TRACK
            <span className="relative inline-block ml-2 sm:ml-3">
              <span
                className="absolute inset-0 bg-nascar-red"
                style={{ transform: 'skewX(-8deg)', borderRadius: '2px' }}
              />
              <span className="relative text-white px-2 sm:px-3">TYPES</span>
            </span>
          </h1>
          <p className="font-oswald text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Not every oval races the same. Short tracks reward elbows; intermediates reward clean air;
            superspeedways reward the draft; road courses reward brakes and bravery. Here’s how each
            category is built — and how pit strategy changes with the asphalt.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {TRACK_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="font-oswald text-sm tracking-wider uppercase px-4 py-2.5 rounded-lg border border-border bg-card hover:border-nascar-red hover:text-nascar-red transition-colors"
              >
                {cat.label}
              </a>
            ))}
            <Link
              href="/pit-strategy"
              className="font-oswald text-sm tracking-wider uppercase px-4 py-2.5 rounded-lg bg-nascar-red text-white hover:opacity-90 transition-opacity"
            >
              Pit Strategy Calc →
            </Link>
          </div>
        </div>
      </section>

      {/* Size comparison */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-12">
        <TrackSizeCompare />
      </section>

      {/* Next race + flat-mile callouts */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 pb-4 space-y-3">
        <div
          role="note"
          className="rounded-xl border border-nascar-red/35 bg-nascar-red/5 px-4 sm:px-5 py-4 flex gap-3"
        >
          <span className="font-archivo text-nascar-red text-lg leading-none mt-0.5" aria-hidden>
            ★
          </span>
          <div>
            <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-nascar-red mb-1">
              Next up · Magic Mile
            </p>
            <p className="font-oswald text-sm sm:text-[15px] text-foreground/85 leading-relaxed">
              {NEW_HAMPSHIRE_CALLOUT}
            </p>
          </div>
        </div>
        <div
          role="note"
          className="rounded-xl border border-nascar-blue/30 bg-nascar-blue/5 px-4 sm:px-5 py-4 flex gap-3"
        >
          <span className="font-archivo text-nascar-blue text-lg leading-none mt-0.5" aria-hidden>
            ★
          </span>
          <div>
            <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-nascar-blue mb-1">
              Phoenix caveat
            </p>
            <p className="font-oswald text-sm sm:text-[15px] text-foreground/85 leading-relaxed">
              {PHOENIX_CALLOUT}
            </p>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {TRACK_CATEGORIES.map((cat, i) => (
          <CategoryCard key={cat.id} cat={cat} index={i} />
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border bg-secondary/40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="font-oswald text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Next lap
            </p>
            <h2 className="font-archivo text-2xl sm:text-3xl uppercase tracking-tight text-foreground mt-1">
              Put the theory on a stint board
            </h2>
            <p className="font-oswald text-sm text-muted-foreground mt-2 max-w-xl leading-relaxed">
              Load a track preset, scrub tire deg vs. pit loss, or flip into fuel-window mode for Daytona
              and Talladega.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pit-strategy"
              className="font-oswald text-sm tracking-wider uppercase px-5 py-3 rounded-lg bg-nascar-red text-white hover:opacity-90 transition-opacity"
            >
              Pit Strategy Calculator →
            </Link>
            <Link
              href="/beginners"
              className="font-oswald text-sm tracking-wider uppercase px-5 py-3 rounded-lg border border-border bg-card hover:border-nascar-blue hover:text-nascar-blue transition-colors"
            >
              NASCAR for Beginners
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
