import Link from 'next/link';
import {
  SCHEDULE_2027_HEADLINES,
  SCHEDULE_2027_SOURCE,
  SCHEDULE_2027_UPDATED,
  SCHEDULE_2027_WHATS_NEW,
  SERIES_2027,
  countPoints,
  groupRacesByMonth,
  type Race2027,
  type Series2027,
} from '@/lib/schedule-2027';

function tagClass(tag: string): string {
  if (tag === 'Championship' || tag === 'Crown jewel') {
    return 'border-nascar-red/40 bg-nascar-red/10 text-nascar-red';
  }
  if (tag === 'Chase opener' || tag === 'Chase' || tag === 'Penultimate') {
    return 'border-strategy-yellow/40 bg-strategy-yellow/10 text-strategy-yellow';
  }
  if (tag === 'Exhibition' || tag === 'Date TBA') {
    return 'border-white/20 bg-white/10 text-white/80';
  }
  return 'border-border bg-background text-muted-foreground';
}

function RaceRow({ race }: { race: Race2027 }) {
  const isChampion = race.tags?.includes('Championship');
  const isChase =
    race.tags?.includes('Chase') ||
    race.tags?.includes('Chase opener') ||
    race.tags?.includes('Penultimate');
  const isExhibition = race.kind === 'exhibition';

  const rowTone = isChampion
    ? 'border-l-nascar-red bg-nascar-red/5'
    : isChase
      ? 'border-l-strategy-yellow bg-strategy-yellow/5'
      : isExhibition
        ? 'border-l-muted-foreground/40 bg-muted/40'
        : 'border-l-border bg-card';

  return (
    <article
      className={`grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6.5rem_1fr_9rem] gap-x-3 gap-y-1 border border-border border-l-4 rounded-md px-3 py-3 ${rowTone}`}
    >
      <div className="flex flex-col leading-none">
        <span className="font-archivo text-sm sm:text-base tracking-wide text-foreground">
          {race.dateLabel}
        </span>
        {race.weekday && (
          <span className="font-oswald text-[10px] uppercase tracking-[0.16em] text-muted-foreground mt-1">
            {race.weekday}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <h4 className="font-oswald font-semibold text-sm sm:text-base leading-snug text-foreground">
          {race.name}
        </h4>
        <p className="font-oswald text-xs text-muted-foreground mt-0.5">{race.track}</p>
        {race.tags && race.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1 mt-2" aria-label="Race notes">
            {race.tags.map((tag) => (
              <li
                key={tag}
                className={`rounded-full border px-2 py-0.5 font-oswald text-[10px] uppercase tracking-wider ${tagClass(tag)}`}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="col-span-2 sm:col-span-1 font-oswald text-[11px] sm:text-xs uppercase tracking-wider sm:text-right text-muted-foreground">
        {race.tv}
        {race.window ? (
          <span className="block font-normal normal-case tracking-normal mt-0.5">{race.window}</span>
        ) : null}
      </p>
    </article>
  );
}

function SeriesBlock({ series }: { series: Series2027 }) {
  const months = groupRacesByMonth(series.races);
  const points = countPoints(series.races);
  const exhibitions = series.races.length - points;

  return (
    <section id={series.key} className="scroll-mt-24" aria-labelledby={`${series.key}-heading`}>
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <p className={`font-oswald text-xs uppercase tracking-[0.2em] ${series.accentClass}`}>
            {series.shortName}
          </p>
          <h2
            id={`${series.key}-heading`}
            className="font-archivo text-2xl sm:text-3xl tracking-tight text-foreground"
          >
            {series.name}
          </h2>
        </div>
        <p className="font-oswald text-xs uppercase tracking-wider text-muted-foreground text-right shrink-0">
          {points} points
          {exhibitions > 0 ? ` · ${exhibitions} exhibition` : ''}
        </p>
      </div>
      <p className="font-oswald text-sm text-muted-foreground leading-relaxed mb-5 max-w-3xl">
        {series.note}
      </p>

      <div className="space-y-6">
        {months.map((group) => (
          <div key={`${series.key}-${group.month}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className={`h-2 w-8 rounded-full ${series.barClass}`} aria-hidden />
              <h3 className="font-archivo text-sm tracking-[0.18em] uppercase text-foreground">
                {group.label}
              </h3>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-2">
              {group.races.map((race) => (
                <RaceRow key={race.id} race={race} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Schedule2027Desk() {
  const cupPoints = countPoints(SERIES_2027[0].races);
  const oreillyPoints = countPoints(SERIES_2027[1].races);
  const truckPoints = countPoints(SERIES_2027[2].races);

  return (
    <div className="bg-background">
      <header className="relative overflow-hidden bg-strategy-panel text-white border-b-4 border-nascar-red">
        <div className="pointer-events-none absolute inset-0 speed-lines-bg opacity-30" />
        <div className="pointer-events-none absolute -right-16 top-0 h-full w-1/2 bg-gradient-to-l from-nascar-red/25 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 py-10 sm:py-14">
          <p className="font-oswald text-xs uppercase tracking-[0.22em] text-strategy-yellow mb-3">
            Rolling release · Confirmed {SCHEDULE_2027_UPDATED}
          </p>
          <h1 className="font-archivo text-4xl sm:text-6xl tracking-tight leading-none">
            2027 NASCAR
            <span className="block text-nascar-red">schedule desk</span>
          </h1>
          <p className="mt-4 max-w-2xl font-oswald text-base sm:text-lg text-white/75 leading-relaxed">
            Confirmed dates, tracks, and TV partners for Cup, O’Reilly, and Craftsman Trucks. This is
            not the finished 36-race Cup grid — NASCAR is still filling venues (Watkins Glen is
            September TBD). 2026 racing stays on the homepage.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 max-w-xl">
            {[
              { label: 'Cup points', value: String(cupPoints), tone: 'text-series-cup' },
              { label: "O'Reilly", value: String(oreillyPoints), tone: 'text-series-xfinity' },
              { label: 'Trucks', value: String(truckPoints), tone: 'text-series-truck' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-center"
              >
                <dt className="font-oswald text-[10px] uppercase tracking-[0.16em] text-white/50">
                  {stat.label}
                </dt>
                <dd className={`font-archivo text-2xl sm:text-3xl mt-1 ${stat.tone}`}>{stat.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="2027 headlines">
            {SCHEDULE_2027_HEADLINES.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-oswald text-[11px] uppercase tracking-wider text-white/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <nav
        className="sticky top-20 z-30 border-b border-border bg-background/95 backdrop-blur"
        aria-label="Jump to series"
      >
        <div className="max-w-6xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto">
          {SERIES_2027.map((series) => (
            <a
              key={series.key}
              href={`#${series.key}`}
              className={`inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-oswald text-xs uppercase tracking-wider text-foreground hover:border-foreground transition-colors`}
            >
              <span className={`h-2 w-2 rounded-full ${series.barClass}`} aria-hidden />
              {series.shortName}
            </a>
          ))}
          <a
            href="#whats-new"
            className="inline-flex items-center rounded-full border border-border px-3 py-1.5 font-oswald text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            What’s new
          </a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12 space-y-14">
        <section id="whats-new" className="scroll-mt-24" aria-labelledby="whats-new-heading">
          <h2 id="whats-new-heading" className="font-archivo text-2xl sm:text-3xl tracking-tight text-foreground">
            What’s new vs 2026
          </h2>
          <p className="mt-2 font-oswald text-sm text-muted-foreground max-w-2xl">
            Biggest confirmed moves so far. Cup still has holes versus a 36-race points season — we
            are not filling those in.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SCHEDULE_2027_WHATS_NEW.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-border bg-card p-4 card-lift"
              >
                <h3 className="font-archivo text-sm tracking-wide uppercase text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 font-oswald text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {SERIES_2027.map((series) => (
          <SeriesBlock key={series.key} series={series} />
        ))}

        <p className="font-oswald text-xs text-muted-foreground leading-relaxed border-t border-border pt-6">
          Confirmed windows collected {SCHEDULE_2027_UPDATED} from NASCAR’s rolling 2027 tracker.
          TV windows are broadcast blocks, not green-flag times. Start times and leftover Cup venues
          will move.{' '}
          <Link
            href={SCHEDULE_2027_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-nascar-red hover:underline"
          >
            Official NASCAR tracker
          </Link>
          {' · '}
          <Link href="/#schedule" className="text-nascar-red hover:underline">
            2026 remaining schedule
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
