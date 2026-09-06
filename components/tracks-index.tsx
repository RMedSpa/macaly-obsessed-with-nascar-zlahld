import Link from 'next/link';
import TrackInfographic from '@/components/track-infographic';
import { TRACKS_SOURCES, calendarRaceChip, getNextCalendarRace, tracksByChaseOrder } from '@/lib/tracks';

const KIND_CHIP: Record<string, string> = {
  short: 'border-series-truck/40 bg-series-truck/10 text-series-truck',
  intermediate: 'border-nascar-blue/40 bg-nascar-blue/10 text-nascar-blue',
  superspeedway: 'border-strategy-cyan/40 bg-strategy-cyan/10 text-strategy-cyan',
  road: 'border-series-arca/40 bg-series-arca/10 text-series-arca',
  street: 'border-nascar-red/40 bg-nascar-red/10 text-nascar-red',
};

export default function TracksIndex() {
  const tracks = tracksByChaseOrder();

  return (
    <div className="bg-background text-foreground" data-testid="tracks-index">
      <section className="relative overflow-hidden border-b border-white/10" style={{ backgroundColor: '#0a0e14' }}>
        <div className="absolute inset-0 speed-lines-bg opacity-25 pointer-events-none" aria-hidden />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-nascar-red" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-3 sm:px-4 py-10 sm:py-14">
          <p className="font-oswald text-xs uppercase tracking-[0.22em] text-strategy-yellow mb-2">
            Cup Chase · 2026 · 10 tracks
          </p>
          <h1 className="font-archivo text-3xl sm:text-5xl uppercase tracking-tight text-white">
            Tracks desk
          </h1>
          <p className="mt-3 max-w-2xl font-oswald text-base text-white/65 leading-relaxed">
            Per-track booth cards for the 10-race Chase — layout graphic, specs, a short history,
            last 10 Cup winners, and today’s LIVE Southern 500 plus the rest of the Chase map.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/track-types"
              className="inline-flex font-oswald text-sm uppercase tracking-wider px-4 py-2.5 rounded-lg border border-white/15 text-white hover:bg-white/10"
            >
              Track types 101
            </Link>
            <Link
              href="/chase"
              className="inline-flex font-oswald text-sm uppercase tracking-wider px-4 py-2.5 rounded-lg bg-nascar-red text-white hover:opacity-90"
            >
              Open Chase desk
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tracks.map((track) => {
            const next = getNextCalendarRace(track);
            const chip = calendarRaceChip(next);
            return (
              <article
                key={track.slug}
                className="rounded-xl border border-border bg-card overflow-hidden card-lift flex flex-col"
              >
                <div className="px-4 pt-4">
                  <TrackInfographic track={track} />
                </div>
                <div className="px-4 py-4 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-oswald text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Chase {String(track.chaseOrder).padStart(2, '0')}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 font-oswald text-[10px] uppercase tracking-wider ${KIND_CHIP[track.kind]}`}
                    >
                      {track.kindLabel}
                    </span>
                  </div>
                  <h2 className="font-archivo text-xl uppercase tracking-tight text-foreground leading-tight">
                    <Link href={`/tracks/${track.slug}`} className="hover:text-nascar-red">
                      {track.name}
                    </Link>
                  </h2>
                  <p className="font-oswald text-sm text-muted-foreground mt-1">
                    {track.nickname} · {track.location}
                  </p>
                  {chip && (
                    <p className={`mt-3 font-oswald text-xs uppercase tracking-wider ${chip.live ? 'text-nascar-red' : 'text-strategy-yellow'}`}>
                      {chip.kicker} · {chip.detail}
                    </p>
                  )}
                  <Link
                    href={`/tracks/${track.slug}`}
                    className="mt-4 inline-flex font-oswald text-sm uppercase tracking-wider text-nascar-red hover:underline"
                  >
                    Open track desk →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-3 sm:px-4 pb-12">
        <p className="font-oswald text-[11px] text-muted-foreground leading-relaxed">{TRACKS_SOURCES}</p>
        <p className="font-oswald text-[11px] text-muted-foreground mt-2">
          Fan desk on nascarlove.org. Not affiliated with NASCAR, its teams, or its drivers.
        </p>
      </section>
    </div>
  );
}
