"use client";

import Link from "next/link";
import type { CupLiveDesk } from "@/lib/nhms-live";

function pitKindClass(kind: CupLiveDesk["pitStops"][number]["kind"]) {
  if (kind === "caution") return "border-strategy-yellow/40 bg-strategy-yellow/10 text-strategy-yellow";
  if (kind === "stage") return "border-strategy-cyan/40 bg-strategy-cyan/10 text-strategy-cyan";
  return "border-white/20 bg-white/5 text-white/80";
}

export default function PitStrategyLiveBoard({
  live,
  tankLaps,
  onUseLiveLaps,
}: {
  live: CupLiveDesk;
  tankLaps: number;
  onUseLiveLaps?: () => void;
}) {
  const completed = live.raceLaps - live.lapsRemaining;
  const progressPct = Math.round((completed / live.raceLaps) * 100);
  const lastPit = live.pitStops[live.pitStops.length - 1];
  const lastPitLap = Number.parseInt(lastPit?.lap ?? "", 10);
  const lapsOnSet =
    Number.isFinite(lastPitLap) && lastPitLap > 0 ? Math.max(0, completed - lastPitLap) : null;
  const fuelGap = live.lapsRemaining - tankLaps;
  const needsFuelStop = fuelGap > 0;
  const stage3 = live.stages.find((s) => s.stage === 3);

  console.log("[pit-strategy] live board", live.leader.driver, live.lapsRemaining, lastPit?.who);

  return (
    <section
      data-testid="pit-strategy-live-board"
      className="mb-6 overflow-hidden rounded-lg border border-nascar-red/35 bg-strategy-panel"
      aria-labelledby="live-strategy-heading"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-nascar-red px-2 py-1 font-oswald text-[10px] font-600 uppercase tracking-[0.22em] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white pulse-dot" aria-hidden />
            Live · Stage 3
          </span>
          <p className="font-oswald text-[11px] uppercase tracking-[0.16em] text-white/50">
            {live.raceName} · {live.snapshotLabel}
          </p>
        </div>
        <Link
          href="/#live-race"
          className="font-oswald text-[11px] uppercase tracking-[0.16em] text-strategy-cyan hover:text-white"
        >
          Full live desk →
        </Link>
      </div>

      <div className="grid gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="font-oswald text-[10px] uppercase tracking-[0.2em] text-white/40">Current leader</p>
          <h2
            id="live-strategy-heading"
            className="mt-1 font-archivo text-3xl uppercase leading-none tracking-tight text-white sm:text-4xl"
          >
            <span className="text-nascar-red">#{live.leader.car}</span> {live.leader.driver}
          </h2>
          <p className="mt-2 font-oswald text-sm uppercase tracking-wide text-strategy-yellow">
            {live.leader.headline}
          </p>
          <p className="mt-2 max-w-xl font-oswald text-sm leading-relaxed text-white/60">
            {stage3?.note ?? `${live.lapNote}.`} Last cycle: lap {lastPit?.lap} — {lastPit?.who} first
            off. About {lapsOnSet ?? "—"} laps on this set.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {onUseLiveLaps ? (
              <button
                type="button"
                data-testid="use-live-laps"
                onClick={onUseLiveLaps}
                className="rounded-sm border border-strategy-cyan/40 bg-strategy-cyan/10 px-2.5 py-1 font-oswald text-[11px] uppercase tracking-wider text-strategy-cyan hover:bg-strategy-cyan/20"
              >
                Model {live.lapsRemaining} to go
              </button>
            ) : (
              <span className="rounded-sm border border-strategy-cyan/40 bg-strategy-cyan/10 px-2.5 py-1 font-oswald text-[11px] uppercase tracking-wider text-strategy-cyan">
                Modeling {live.lapsRemaining} to go
              </span>
            )}
            <span className="rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 font-oswald text-[11px] uppercase tracking-wider text-white/75">
              {live.leader.team}
            </span>
            <span className="rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 font-oswald text-[11px] uppercase tracking-wider text-white/75">
              Led {live.leader.lapsLed}
            </span>
          </div>

          <div className="mt-5">
            <div className="mb-1.5 flex items-end justify-between gap-3">
              <p className="font-oswald text-[10px] uppercase tracking-[0.18em] text-white/40">Race progress</p>
              <p className="font-archivo text-lg tabular-nums leading-none text-white">
                ~{completed}
                <span className="text-sm text-white/35">/{live.raceLaps}</span>
              </p>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
              <div
                className="h-full rounded-full bg-gradient-to-r from-nascar-red to-strategy-yellow"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="mt-2 font-oswald text-[11px] uppercase tracking-wider text-white/40">
              {live.lapNote} · {progressPct}% in
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <ol className="space-y-1.5" data-testid="live-strategy-order">
            {live.running.map((row) => (
              <li
                key={row.pos}
                className="flex items-start gap-3 rounded-md border border-white/10 bg-black/35 px-3 py-2"
              >
                <span
                  className={`w-5 shrink-0 font-archivo text-sm ${
                    row.pos === 1 ? "text-strategy-yellow" : "text-white/40"
                  }`}
                >
                  {row.pos}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-oswald text-sm text-white">
                    <span className="mr-1.5 text-white/40">#{row.car}</span>
                    {row.driver}
                  </p>
                  <p className="truncate font-oswald text-[11px] text-white/40">{row.note ?? row.team}</p>
                </div>
              </li>
            ))}
          </ol>

          <div
            className={`rounded-md border px-3 py-2.5 ${
              needsFuelStop
                ? "border-strategy-yellow/40 bg-strategy-yellow/10"
                : "border-white/10 bg-black/35"
            }`}
            data-testid="live-fuel-call"
          >
            <p className="font-oswald text-[10px] uppercase tracking-[0.18em] text-strategy-yellow">
              Fuel vs {tankLaps}-lap tank
            </p>
            <p className="mt-1 font-oswald text-sm leading-snug text-white/80">
              {needsFuelStop
                ? `${live.lapsRemaining} to go is ${fuelGap} laps past a full NHMS tank. After the lap-${lastPit?.lap} stage-break stop, the field still needs at least one more splash.`
                : `${live.lapsRemaining} to go fits inside a ${tankLaps}-lap tank — fuel is optional unless you short-pit for tires.`}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 sm:px-5">
        <p className="mb-2 font-oswald text-[10px] uppercase tracking-[0.2em] text-white/40">Pit log</p>
        <ul className="grid gap-2 sm:grid-cols-2" data-testid="live-pit-log">
          {live.pitStops.map((stop) => (
            <li key={`${stop.lap}-${stop.who}`} className="flex gap-2.5">
              <span
                className={`mt-0.5 h-fit shrink-0 rounded-sm border px-1.5 py-0.5 font-oswald text-[10px] uppercase tracking-wider ${pitKindClass(
                  stop.kind,
                )}`}
              >
                Lap {stop.lap}
              </span>
              <div className="min-w-0">
                <p className="font-oswald text-sm text-white">{stop.who}</p>
                <p className="font-oswald text-[12px] leading-snug text-white/45">{stop.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
