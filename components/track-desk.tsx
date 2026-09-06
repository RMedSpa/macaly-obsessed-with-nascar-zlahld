import Link from 'next/link';
import TrackInfographic from '@/components/track-infographic';
import {
  TRACKS,
  TRACKS_SOURCES,
  getNextCalendarRace,
  type CupTrackProfile,
} from '@/lib/tracks';

const ACCENT_TEXT: Record<CupTrackProfile['accent'], string> = {
  red: 'text-nascar-red',
  cyan: 'text-strategy-cyan',
  yellow: 'text-strategy-yellow',
  blue: 'text-nascar-blue',
  truck: 'text-series-truck',
};

const ACCENT_CHIP: Record<CupTrackProfile['accent'], string> = {
  red: 'border-nascar-red/40 bg-nascar-red/10 text-nascar-red',
  cyan: 'border-strategy-cyan/40 bg-strategy-cyan/10 text-strategy-cyan',
  yellow: 'border-strategy-yellow/40 bg-strategy-yellow/10 text-strategy-yellow',
  blue: 'border-nascar-blue/40 bg-nascar-blue/10 text-nascar-blue',
  truck: 'border-series-truck/40 bg-series-truck/10 text-series-truck',
};

const ACCENT_BAR: Record<CupTrackProfile['accent'], string> = {
  red: 'bg-nascar-red',
  cyan: 'bg-strategy-cyan',
  yellow: 'bg-strategy-yellow',
  blue: 'bg-nascar-blue',
  truck: 'bg-series-truck',
};

function Spec({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === '') return null;
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
      <p className="font-oswald text-[10px] uppercase tracking-[0.2em] text-white/45">{label}</p>
      <p className="font-oswald text-sm sm:text-base text-white mt-0.5">{value}</p>
    </div>
  );
}

type Props = {
  track: CupTrackProfile;
};

export default function TrackDesk({ track }: Props) {
  const next = getNextCalendarRace(track);
  const others = TRACKS.filter((t) => t.slug !== track.slug).sort((a, b) => a.chaseOrder - b.chaseOrder);

  return (
    <div className="bg-background text-foreground" data-testid={`track-desk-${track.slug}`}>
      <section className="relative overflow-hidden border-b border-white/10" style={{ backgroundColor: '#0a0e14' }}>
        <div className="absolute inset-0 speed-lines-bg opacity-20 pointer-events-none" aria-hidden />
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${ACCENT_BAR[track.accent]}`} aria-hidden />

        <div className="relative mx-auto max-w-6xl px-3 sm:px-4 py-8 sm:py-12">
          <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-white/45 mb-3">
            <Link href="/tracks" className="hover:text-white">
              Tracks
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <span>Chase {String(track.chaseOrder).padStart(2, '0')}</span>
            <span className="mx-2 text-white/20">/</span>
            {track.name}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`rounded-full border px-2.5 py-1 font-oswald text-[10px] uppercase tracking-[0.18em] ${ACCENT_CHIP[track.accent]}`}>
              {track.kindLabel}
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-oswald text-[10px] uppercase tracking-[0.18em] text-white/70">
              Chase race {track.chaseOrder} of 10
            </span>
            {next?.chase && (
              <span className="rounded-full border border-strategy-yellow/40 bg-strategy-yellow/10 px-2.5 py-1 font-oswald text-[10px] uppercase tracking-[0.18em] text-strategy-yellow">
                Next on the calendar · {next.dateLabel}
              </span>
            )}
          </div>

          <h1 className="font-archivo text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none">
            {track.name}
          </h1>
          <p className={`mt-2 font-oswald text-lg sm:text-xl ${ACCENT_TEXT[track.accent]}`}>
            {track.nickname}
          </p>
          <p className="mt-1 font-oswald text-sm text-white/55">{track.location}</p>

          {next && (
            <p className="mt-4 max-w-2xl font-oswald text-sm text-white/70 leading-relaxed">
              {next.chase ? '2026 Chase date' : '2026 Cup date'}: {next.name}
              {next.layout ? ` · ${next.layout}` : ''} · {next.dateLabel} · {next.tv}
            </p>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <TrackInfographic track={track} />
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Layout quirks">
          {track.quirks.map((q) => (
            <li
              key={q}
              className="rounded-full border border-border bg-card px-3 py-1 font-oswald text-[11px] uppercase tracking-wider text-muted-foreground"
            >
              {q}
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-6xl mx-auto px-3 sm:px-4 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <Spec label="Length" value={track.length} />
          <Spec label="Banking" value={track.banking} />
          <Spec label="Surface" value={track.surface} />
          <Spec label="Turns" value={track.turns} />
          <Spec label="First Cup year" value={track.firstCupYear} />
          <Spec label="Capacity" value={track.capacity} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <h2 className="font-archivo text-xl sm:text-2xl uppercase tracking-tight text-foreground mb-3">
          Booth notes
        </h2>
        <p className="font-oswald text-sm sm:text-[15px] text-foreground/85 leading-relaxed max-w-3xl">
          {track.history}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
          <div>
            <h2 className="font-archivo text-xl sm:text-2xl uppercase tracking-tight text-foreground">
              Last 10 Cup winners
            </h2>
            <p className="font-oswald text-xs text-muted-foreground mt-1 uppercase tracking-wider">
              Cup Series points races only
            </p>
          </div>
        </div>
        {track.winnersNote && (
          <p className="font-oswald text-sm text-muted-foreground mb-4 leading-relaxed">{track.winnersNote}</p>
        )}
        <ol className="divide-y divide-border rounded-xl border border-border bg-card overflow-hidden">
          {track.winners.map((w, i) => (
            <li
              key={`${w.year}-${w.race}-${w.driver}`}
              className="grid grid-cols-[auto_1fr] sm:grid-cols-[2rem_4.5rem_1fr_auto] gap-x-3 gap-y-1 items-baseline px-3 sm:px-4 py-3"
            >
              <span className="font-oswald text-[11px] text-muted-foreground tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-archivo text-sm text-foreground">{w.year}</span>
              <div className="col-span-2 sm:col-span-1 min-w-0">
                <p className="font-oswald text-sm text-foreground">
                  {w.driver}
                  {w.car ? <span className="text-muted-foreground"> · #{w.car}</span> : null}
                </p>
                <p className="font-oswald text-xs text-muted-foreground">{w.race}</p>
              </div>
              {w.note && (
                <span className="font-oswald text-[10px] uppercase tracking-wider text-strategy-yellow sm:text-right">
                  {w.note}
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <h2 className="font-archivo text-xl sm:text-2xl uppercase tracking-tight text-foreground mb-4">
          Fun facts
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {track.facts.map((f) => (
            <li key={f.text} className="rounded-xl border border-border bg-card p-4">
              {f.lore && (
                <p className="font-oswald text-[10px] uppercase tracking-[0.2em] text-strategy-yellow mb-1">Lore</p>
              )}
              <p className="font-oswald text-sm text-foreground/90 leading-relaxed">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
        <p className="font-oswald text-[11px] text-muted-foreground leading-relaxed">{TRACKS_SOURCES}</p>
        <p className="font-oswald text-[11px] text-muted-foreground mt-2">
          Fan desk on nascarlove.org. Not affiliated with NASCAR, its teams, or its drivers.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tracks"
            className="inline-flex items-center font-oswald text-sm uppercase tracking-wider px-4 py-2.5 rounded-lg bg-nascar-red text-white hover:opacity-90"
          >
            ← All Chase tracks
          </Link>
          <Link
            href="/track-types"
            className="inline-flex items-center font-oswald text-sm uppercase tracking-wider px-4 py-2.5 rounded-lg border border-border bg-card hover:border-nascar-blue hover:text-nascar-blue"
          >
            Track types guide
          </Link>
          <Link
            href="/chase"
            className="inline-flex items-center font-oswald text-sm uppercase tracking-wider px-4 py-2.5 rounded-lg border border-border bg-card hover:border-strategy-yellow hover:text-strategy-yellow"
          >
            Chase desk
          </Link>
        </div>
      </section>

      <nav className="max-w-6xl mx-auto px-3 sm:px-4 pb-12" aria-label="Other Chase tracks">
        <p className="font-oswald text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Rest of the Chase map
        </p>
        <ul className="flex flex-wrap gap-2">
          {others.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/tracks/${t.slug}`}
                className="inline-flex font-oswald text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border border-border bg-card hover:border-nascar-red hover:text-nascar-red"
              >
                {t.chaseOrder}. {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
