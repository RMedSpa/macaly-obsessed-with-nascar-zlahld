'use client';

import { useMemo } from 'react';
import { BERRY_LOUDON, NHMS_LIVE } from '@/lib/nhms-live';
import {
  buildStintsFromStops,
  compareStintToOptimal,
  formatDelta,
  formatSeconds,
  type PitMarker,
} from '@/lib/pit-strategy';

function berryMarkers(): PitMarker[] {
  return BERRY_LOUDON.pits.map((p) => {
    const lap = Number.parseInt(p.lap, 10);
    return {
      lap,
      kind: p.kind,
      note: p.note,
      rainTires: p.rainTires,
    };
  });
}

const KIND_CLASS: Record<string, string> = {
  green: 'border-strategy-cyan/50 bg-strategy-cyan/15 text-strategy-cyan',
  stage: 'border-strategy-yellow/50 bg-strategy-yellow/15 text-strategy-yellow',
  caution: 'border-nascar-red/50 bg-nascar-red/15 text-nascar-red',
  open: 'border-white/20 bg-white/5 text-white/55',
};

function signedLaps(delta: number): string {
  if (delta === 0) return 'even';
  const sign = delta > 0 ? '+' : '−';
  return `${sign}${Math.abs(delta)}`;
}

export function BerryVsOptimal({
  optimalLaps,
  rawOptimal,
  baseLap,
  degRate,
}: {
  optimalLaps: number;
  rawOptimal: number;
  baseLap: number;
  degRate: number;
}) {
  const currentLap = NHMS_LIVE.raceLaps - NHMS_LIVE.lapsRemaining;

  const rows = useMemo(() => {
    const stints = buildStintsFromStops(berryMarkers(), currentLap);
    const compared = stints.map((s) =>
      compareStintToOptimal(s, optimalLaps, baseLap, degRate),
    );
    console.log('[pit-strategy] berry vs optimal', {
      currentLap,
      optimalLaps,
      stints: compared.map((r) => ({
        to: r.stint.toLap,
        laps: r.stint.laps,
        kind: r.stint.kind,
        deltaLaps: r.deltaLaps,
        extraDeg: r.extraDegSeconds,
      })),
    });
    return compared;
  }, [optimalLaps, baseLap, degRate, currentLap]);

  const lastComparable = [...rows].reverse().find((r) => r.comparable);
  const greenFlag = rows.find((r) => r.stint.kind === 'green' && r.comparable);
  const barMax = Math.max(
    optimalLaps,
    ...rows.map((r) => r.stint.laps),
    1,
  );

  return (
    <section
      data-testid="berry-vs-optimal"
      aria-labelledby="berry-vs-optimal-heading"
      className="relative overflow-hidden rounded-lg border border-strategy-yellow/35 bg-strategy-panel"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-strategy-yellow"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-strategy-yellow/10 blur-3xl" aria-hidden />

      <div className="relative space-y-4 p-4 sm:p-5">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-oswald text-[10px] uppercase tracking-[0.26em] text-strategy-yellow">
              #{BERRY_LOUDON.car} · {BERRY_LOUDON.team}
            </p>
            <h2
              id="berry-vs-optimal-heading"
              className="mt-1 font-archivo text-xl uppercase leading-none tracking-wide text-white sm:text-2xl"
            >
              Berry vs Optimal stint
            </h2>
            <p className="mt-1 font-oswald text-xs uppercase tracking-[0.16em] text-white/45">
              {BERRY_LOUDON.race} · last stop lap {BERRY_LOUDON.lastStopLap} · now lap {currentLap}
            </p>
          </div>
          <p className="rounded border border-white/10 bg-black/40 px-2.5 py-1 font-oswald text-[10px] uppercase tracking-[0.18em] text-white/50">
            No official pit clocks
          </p>
        </header>

        {lastComparable ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-strategy-yellow/25 bg-black/40 p-4">
              <p className="font-oswald text-[10px] uppercase tracking-[0.22em] text-strategy-yellow">
                Berry last completed
              </p>
              <p className="mt-1 font-archivo text-5xl tabular-nums leading-none text-strategy-yellow">
                {lastComparable.stint.laps}
              </p>
              <p className="mt-1 font-oswald text-xs uppercase tracking-widest text-white/45">
                laps · stop {lastComparable.stint.toLap} · {lastComparable.stint.kind}
              </p>
            </div>
            <div className="rounded-md border border-strategy-cyan/25 bg-black/40 p-4">
              <p className="font-oswald text-[10px] uppercase tracking-[0.22em] text-strategy-cyan">
                Calculator optimal
              </p>
              <p className="mt-1 font-archivo text-5xl tabular-nums leading-none text-strategy-cyan">
                {optimalLaps}
              </p>
              <p className="mt-1 font-oswald text-xs uppercase tracking-widest text-white/45">
                laps · raw {rawOptimal.toFixed(1)}
              </p>
            </div>
          </div>
        ) : null}

        {lastComparable?.deltaLaps != null ? (
          <p className="font-oswald text-sm text-white/80">
            Last dry stint ran{' '}
            <span className="text-strategy-yellow">
              {signedLaps(lastComparable.deltaLaps)} laps
            </span>{' '}
            {lastComparable.deltaLaps > 0 ? 'long' : lastComparable.deltaLaps < 0 ? 'short' : 'even'}{' '}
            vs Optimal Stint
            {lastComparable.extraDegSeconds != null ? (
              <>
                {' '}
                · extra tire fade{' '}
                <span className="text-strategy-yellow">
                  {formatDelta(lastComparable.extraDegSeconds)}
                </span>
              </>
            ) : null}
            . Est. stint wall time {formatSeconds(lastComparable.elapsedSeconds)}.
          </p>
        ) : null}

        <div className="space-y-2" aria-hidden={false}>
          <div className="flex items-center gap-3">
            <span className="w-16 shrink-0 font-oswald text-[10px] uppercase tracking-[0.18em] text-strategy-cyan">
              Optimal
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-strategy-cyan"
                style={{ width: `${Math.max(8, (optimalLaps / barMax) * 100)}%` }}
              />
            </div>
            <span className="w-10 text-right font-archivo text-sm tabular-nums text-strategy-cyan">
              {optimalLaps}
            </span>
          </div>
          {lastComparable ? (
            <div className="flex items-center gap-3">
              <span className="w-16 shrink-0 font-oswald text-[10px] uppercase tracking-[0.18em] text-strategy-yellow">
                Last
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-strategy-yellow"
                  style={{ width: `${Math.max(8, (lastComparable.stint.laps / barMax) * 100)}%` }}
                />
              </div>
              <span className="w-10 text-right font-archivo text-sm tabular-nums text-strategy-yellow">
                {lastComparable.stint.laps}
              </span>
            </div>
          ) : null}
          {greenFlag ? (
            <div className="flex items-center gap-3">
              <span className="w-16 shrink-0 font-oswald text-[10px] uppercase tracking-[0.18em] text-white/55">
                Green
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white/50"
                  style={{ width: `${Math.max(8, (greenFlag.stint.laps / barMax) * 100)}%` }}
                />
              </div>
              <span className="w-10 text-right font-archivo text-sm tabular-nums text-white/70">
                {greenFlag.stint.laps}
              </span>
            </div>
          ) : null}
        </div>

        {greenFlag?.deltaLaps != null ? (
          <p className="font-oswald text-xs text-white/50">
            His only green-flag stop (lap {greenFlag.stint.toLap}) was a {greenFlag.stint.laps}-lap
            stretch — {signedLaps(greenFlag.deltaLaps)} vs optimal
            {greenFlag.extraDegSeconds != null
              ? `, ${formatDelta(greenFlag.extraDegSeconds)} extra fade`
              : ''}
            . Stages and cautions forced the other stops.
          </p>
        ) : null}

        <div className="-mx-1 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-separate border-spacing-y-1 text-left">
            <caption className="sr-only">
              Josh Berry pit stops versus the calculator Optimal Stint
            </caption>
            <thead>
              <tr className="font-oswald text-[10px] uppercase tracking-[0.2em] text-white/40">
                <th className="px-2 py-1 font-normal">Stop</th>
                <th className="px-2 py-1 font-normal">Kind</th>
                <th className="px-2 py-1 font-normal">Stint</th>
                <th className="px-2 py-1 font-normal">vs opt</th>
                <th className="px-2 py-1 font-normal">Est. time</th>
                <th className="px-2 py-1 font-normal">Fade vs opt</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const { stint } = row;
                return (
                  <tr
                    key={`${stint.kind}-${stint.toLap}`}
                    className="bg-black/35"
                    data-testid={`berry-stint-${stint.toLap}`}
                  >
                    <td className="px-2 py-2 align-top">
                      <p className="font-archivo text-lg tabular-nums leading-none text-white">
                        {stint.completed ? stint.toLap : `${stint.toLap}+`}
                      </p>
                      <p className="mt-0.5 font-oswald text-[10px] uppercase tracking-widest text-white/35">
                        {stint.fromLap}–{stint.toLap}
                      </p>
                    </td>
                    <td className="px-2 py-2 align-top">
                      <span
                        className={`inline-block rounded border px-1.5 py-0.5 font-oswald text-[10px] uppercase tracking-[0.16em] ${KIND_CLASS[stint.kind]}`}
                      >
                        {stint.kind}
                      </span>
                    </td>
                    <td className="px-2 py-2 align-top font-archivo text-lg tabular-nums text-white">
                      {stint.laps}
                      {!stint.completed ? (
                        <span className="ml-1 font-oswald text-[10px] uppercase text-white/40">
                          so far
                        </span>
                      ) : null}
                    </td>
                    <td className="px-2 py-2 align-top font-archivo text-sm tabular-nums">
                      {row.comparable && row.deltaLaps != null ? (
                        <span
                          className={
                            row.deltaLaps > 0
                              ? 'text-strategy-yellow'
                              : row.deltaLaps < 0
                                ? 'text-strategy-cyan'
                                : 'text-white/70'
                          }
                        >
                          {signedLaps(row.deltaLaps)}
                        </span>
                      ) : (
                        <span className="font-oswald text-[11px] uppercase tracking-widest text-white/40">
                          {row.skipReason ?? '—'}
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-2 align-top font-oswald text-sm tabular-nums text-white/75">
                      {formatSeconds(row.elapsedSeconds)}
                    </td>
                    <td className="max-w-[12rem] px-2 py-2 align-top">
                      <p className="font-oswald text-sm tabular-nums text-white/75">
                        {row.comparable && row.extraDegSeconds != null
                          ? formatDelta(row.extraDegSeconds)
                          : '—'}
                      </p>
                      <p className="mt-0.5 font-oswald text-[11px] leading-snug text-white/40">
                        {stint.note}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="font-oswald text-[11px] leading-relaxed text-white/40">
          {BERRY_LOUDON.source} Change lap time or deg rate above and these times update with the
          Optimal Stint number.
        </p>
      </div>
    </section>
  );
}

export function BerryActualPits() {
  return (
    <div
      data-testid="berry-actual-pits"
      className="mt-4 border-t border-white/10 pt-4"
    >
      <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
        <p className="font-oswald text-[10px] uppercase tracking-[0.22em] text-strategy-yellow">
          Berry actually stopped
        </p>
        <p className="font-oswald text-[10px] uppercase tracking-[0.18em] text-white/35">
          Race laps · {BERRY_LOUDON.race}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {BERRY_LOUDON.pits.map((stop, i) => (
          <div
            key={`berry-pit-${stop.lap}`}
            className="min-w-[4.5rem] rounded border border-strategy-yellow/30 bg-black/40 px-3 py-2 text-center"
          >
            <p className="font-oswald text-[9px] uppercase tracking-[0.2em] text-white/40">
              Stop {i + 1} · {stop.kind}
            </p>
            <p className="font-archivo text-2xl tabular-nums text-strategy-yellow">{stop.lap}</p>
            <p className="font-oswald text-[10px] uppercase tracking-widest text-white/35">
              {stop.rainTires ? 'wets' : 'race lap'}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 font-oswald text-sm text-white/55">
        Model chips above are laps-to-go from here. Berry&apos;s chips are the actual stop laps
        already in the books — compared to Optimal Stint in the card above.
      </p>
    </div>
  );
}
