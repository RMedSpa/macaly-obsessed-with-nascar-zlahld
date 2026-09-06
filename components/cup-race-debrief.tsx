"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  getIncidentTone,
  getPitLeaderboard,
  lastName,
  pickLatestCupDebrief,
  type CupRaceDebrief,
  type RaceIncident,
  type WinnerPitStop,
  type WinnerPitStrategy,
} from "@/lib/cup-race-debrief";

const HOCEVAR_LOUDON_WRECK = {
  src: "https://assets.macaly-user-data.dev/zfxjomb7h9cexyly4mnji66x/zlahlda8syqym2rz8towcqh8/Y64fSh3JvdEeiMUHI0AmN/generated-98H3issU.jpeg",
  alt: "The No. 77 Chevrolet sideways in Turn 4 at New Hampshire Motor Speedway, white tire smoke boiling off the rear tires.",
};

function isLoudonRecap(race: Pick<CupRaceDebrief, "raceName" | "track">) {
  return /new hampshire|loudon|dollar tree/i.test(`${race.raceName} ${race.track}`);
}

function pitWindowLabel(window: WinnerPitStop["window"]) {
  switch (window) {
    case "green":
      return "GREEN";
    case "caution":
      return "CAUTION";
    case "stage-break":
      return "STAGE";
  }
}

function pitWindowClass(window: WinnerPitStop["window"]) {
  switch (window) {
    case "green":
      return "bg-strategy-cyan text-nascar-dark";
    case "caution":
      return "bg-strategy-yellow text-nascar-dark";
    case "stage-break":
      return "bg-white/15 text-white";
  }
}

function WinnerPitStrategyPanel({ strategy }: { strategy: WinnerPitStrategy }) {
  return (
    <div
      className="mb-8 sm:mb-10 rounded-xl border border-white/10 bg-black/30 overflow-hidden"
      data-testid="winner-pit-strategy"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3.5 sm:px-5 py-3.5 border-b border-white/10 bg-white/[0.03]">
        <div className="min-w-0">
          <p className="font-oswald text-[10px] sm:text-[11px] tracking-[0.2em] text-strategy-cyan uppercase mb-1">
            Winner · Pit chart & strategy
          </p>
          <h3 className="font-archivo text-base sm:text-lg uppercase tracking-wide text-white leading-tight">
            {strategy.label}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <span className="rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 font-oswald text-[11px] tracking-wider text-white/75 uppercase">
            {strategy.totalStops ?? 0} stops
          </span>
          <span className="rounded-sm border border-strategy-cyan/40 bg-strategy-cyan/10 px-2.5 py-1 font-oswald text-[11px] tracking-wider text-strategy-cyan uppercase">
            Avg {(strategy.avgStopSec ?? 0).toFixed(2)}s
          </span>
          <span className="rounded-sm border border-strategy-yellow/40 bg-strategy-yellow/10 px-2.5 py-1 font-oswald text-[11px] tracking-wider text-strategy-yellow uppercase">
            Best {(strategy.bestStopSec ?? 0).toFixed(2)}s
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x divide-white/10">
        <div className="lg:col-span-8 p-3.5 sm:p-5">
          <p className="font-oswald text-sm text-white/70 leading-relaxed mb-4 sm:mb-5">
            {strategy.summary}
          </p>

          <ol className="relative space-y-0" data-testid="winner-pit-stops">
            {/* vertical timeline rail */}
            <div
              className="absolute left-[15px] sm:left-[17px] top-2 bottom-2 w-px bg-white/10"
              aria-hidden
            />
            {(strategy.stops ?? []).map((stop, i, stops) => (
              <li
                key={`${stop.lap}-${i}`}
                className={`relative pl-10 sm:pl-12 py-3 ${
                  i < stops.length - 1 ? "border-b border-white/5" : ""
                } ${stop.decisive ? "bg-strategy-yellow/5 -mx-1 px-1 sm:px-2 rounded-lg" : ""}`}
                data-testid={`winner-pit-stop-${stop.lap}`}
              >
                <span
                  className={`absolute left-1.5 sm:left-2 top-3.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border text-[10px] font-archivo ${
                    stop.decisive
                      ? "border-strategy-yellow bg-strategy-yellow text-nascar-dark"
                      : "border-white/20 bg-strategy-panel text-white/70"
                  }`}
                  aria-hidden
                >
                  {i + 1}
                </span>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                  <span className="font-archivo text-sm sm:text-base text-white uppercase tracking-wide">
                    Lap {stop.lap}
                  </span>
                  <span
                    className={`font-oswald text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded-sm ${pitWindowClass(stop.window)}`}
                  >
                    {pitWindowLabel(stop.window)}
                  </span>
                  <span className="font-oswald text-[11px] tracking-wider text-white/50 uppercase">
                    {stop.service}
                  </span>
                  {stop.durationSec != null && (
                    <span className="font-oswald text-[11px] tabular-nums text-strategy-cyan">
                      {stop.durationSec.toFixed(2)}s
                    </span>
                  )}
                  {stop.decisive && (
                    <span className="font-oswald text-[10px] tracking-widest uppercase text-strategy-yellow">
                      Decisive
                    </span>
                  )}
                </div>

                {(stop.posIn || stop.posOut) && (
                  <p className="font-oswald text-[11px] sm:text-xs tracking-wide text-white/45 uppercase mb-1">
                    {stop.posIn && <span>In {stop.posIn}</span>}
                    {stop.posIn && stop.posOut && <span className="mx-1.5 text-white/25">→</span>}
                    {stop.posOut && <span>Out {stop.posOut}</span>}
                  </p>
                )}
                <p className="font-oswald text-xs sm:text-sm text-white/70 leading-relaxed">
                  {stop.note}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-4 p-3.5 sm:p-5 border-t lg:border-t-0 border-white/10 bg-white/[0.02]">
          <p className="font-oswald text-[10px] tracking-[0.18em] text-white/40 uppercase mb-3">
            Why the strategy won
          </p>
          <ul className="space-y-2.5 mb-5">
            {(strategy.keysToWin ?? []).map((key) => (
              <li key={key} className="flex gap-2 items-start">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-nascar-red shrink-0" aria-hidden />
                <span className="font-oswald text-xs sm:text-sm text-white/80 leading-relaxed">
                  {key}
                </span>
              </li>
            ))}
          </ul>
          <p className="font-oswald text-[10px] sm:text-[11px] text-white/35 leading-relaxed border-t border-white/10 pt-3">
            {strategy.note}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "red" | "cyan" | "yellow";
}) {
  const valueClass =
    accent === "red"
      ? "text-nascar-red"
      : accent === "cyan"
        ? "text-strategy-cyan"
        : accent === "yellow"
          ? "text-strategy-yellow"
          : "text-white";

  return (
    <div className="min-w-0 rounded-md border border-white/10 bg-white/5 px-3 py-2.5">
      <p className="font-oswald text-[10px] tracking-[0.18em] text-white/45 uppercase mb-0.5">
        {label}
      </p>
      <p className={`font-archivo text-sm sm:text-base uppercase tracking-wide leading-none ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

function IncidentCard({ item }: { item: RaceIncident }) {
  const tone = getIncidentTone(item.bin);
  return (
    <article
      className="rounded-lg border border-white/10 bg-black/30 p-3 sm:p-3.5"
      data-testid={`incident-${item.bin}-${(item.driver ?? "unknown").replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={`mt-0.5 shrink-0 font-oswald text-[10px] font-600 tracking-widest uppercase px-1.5 py-0.5 rounded-sm ${tone.className}`}
        >
          {tone.label}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
            <h4 className="font-archivo text-sm sm:text-[15px] uppercase tracking-wide text-white leading-none">
              {item.title}
            </h4>
            {item.lap != null && (
              <span className="font-oswald text-[11px] tracking-wider text-white/40 uppercase">
                Lap {item.lap}
              </span>
            )}
          </div>
          <p className="font-oswald text-xs sm:text-sm text-white/70 leading-relaxed">
            <span className="text-white font-600">
              {item.car ? `#${item.car} ` : ""}
              {item.driver}
            </span>
            {" — "}
            {item.detail}
          </p>
        </div>
      </div>
    </article>
  );
}

function PitBars({ debrief }: { debrief: CupRaceDebrief }) {
  const rows = getPitLeaderboard(debrief, 8);
  if (rows.length === 0) {
    return (
      <p className="font-oswald text-sm text-white/45">
        Pit stall times not available yet for this race.
      </p>
    );
  }
  const slowest = Math.max(...rows.map((r) => r.avgStop));
  const fastest = Math.min(...rows.map((r) => r.avgStop));
  // Invert: faster (lower) = longer bar to the right towards "best"
  const span = Math.max(slowest - fastest, 0.4);

  return (
    <div className="space-y-2.5" data-testid="pit-scoreboard">
      {rows.map((row, i) => {
        // Relative speed score 0–100 (100 = fastest)
        const score = Math.round(((slowest - row.avgStop) / span) * 100);
        const barPct = Math.max(18, Math.min(100, score));
        return (
          <div key={row.car} className="grid grid-cols-[auto_1fr_auto] gap-2 sm:gap-3 items-center">
            <div className="w-7 sm:w-8 text-center">
              <span
                className={`font-archivo text-xs sm:text-sm ${
                  row.isWinner ? "text-strategy-yellow" : "text-white/50"
                }`}
              >
                {i + 1}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <p className="font-oswald text-xs sm:text-sm text-white truncate">
                  <span className="text-white/40 mr-1.5">#{row.car}</span>
                  {row.driver}
                  {row.isWinner && (
                    <span className="ml-1.5 font-oswald text-[10px] tracking-widest uppercase text-strategy-yellow">
                      WINNER
                    </span>
                  )}
                </p>
                <p className="font-archivo text-xs sm:text-sm text-strategy-cyan tabular-nums shrink-0">
                  {(row.avgStop ?? 0).toFixed(2)}s
                </p>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    row.isWinner
                      ? "bg-gradient-to-r from-nascar-red to-strategy-yellow"
                      : "bg-strategy-cyan/80"
                  }`}
                  style={{ width: `${barPct}%` }}
                />
              </div>
              {row.note && (
                <p className="font-oswald text-[10px] sm:text-[11px] text-white/40 mt-1 leading-snug">
                  Best {(row.bestStop ?? 0).toFixed(2)}s · {row.note}
                </p>
              )}
            </div>
            <div className="hidden sm:block w-10 text-right">
              <span className="font-oswald text-[10px] tracking-wider text-white/35 uppercase">
                {row.stops}x
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CupRaceDebrief() {
  const live = useQuery(api.raceUpdates.getLatestCupDebrief);
  const latestRun = useQuery(api.raceUpdates.getLatestRun);

  const picked = pickLatestCupDebrief(live?.debrief as CupRaceDebrief | undefined);
  const race = picked.race;
  const winner = race.winner;
  const provenance =
    picked.fromConvex
      ? (live?.provenance ?? "convex auto desk")
      : "static seed · Loudon recap";
  const isLive = picked.fromConvex;

  console.log(
    "Rendering Cup race debrief:",
    race.raceName,
    winner.driver,
    isLive ? "convex" : "static-fallback",
    latestRun?.status ?? "no-run",
  );

  return (
    <section
      id="last-race"
      aria-labelledby="cup-debrief-heading"
      className="relative overflow-hidden border-y border-white/10"
      style={{ backgroundColor: "hsl(var(--strategy-panel))" }}
      data-testid="cup-race-debrief"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 speed-lines-bg opacity-30 pointer-events-none" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 0% 0%, hsl(var(--nascar-red) / 0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, hsl(var(--strategy-cyan) / 0.08), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-nascar-red" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-11">
        {/* Kicker */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-nascar-red px-2.5 py-1 font-oswald text-[10px] sm:text-[11px] font-600 tracking-[0.2em] uppercase text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot" aria-hidden />
            Previous checkered
          </span>
          <span className="font-oswald text-[11px] sm:text-xs tracking-[0.16em] text-white/50 uppercase">
            {race.eventLabel}
          </span>
          <span className="hidden sm:inline text-white/20">·</span>
          <span className="font-oswald text-[11px] sm:text-xs tracking-[0.14em] text-white/50 uppercase">
            {race.dateLabel} · {race.tv}
          </span>
          {isLive && (
            <span
              className="inline-flex items-center gap-1.5 rounded-sm border border-strategy-cyan/40 bg-strategy-cyan/10 px-2 py-0.5 font-oswald text-[10px] tracking-[0.16em] uppercase text-strategy-cyan"
              title={provenance}
              data-testid="debrief-live-badge"
            >
              Auto desk
            </span>
          )}
        </div>

        {/* Winner hero row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-5 sm:gap-8 mb-7 sm:mb-9 items-end">
          <div>
            <p className="font-oswald text-xs tracking-[0.22em] text-strategy-cyan uppercase mb-2">
              {race.raceName} · {race.track}
            </p>
            <h2
              id="cup-debrief-heading"
              className="font-archivo uppercase leading-[0.92] text-white mb-3"
              style={{ fontSize: "clamp(28px, 6vw, 52px)" }}
            >
              <span className="text-nascar-red">#{winner.car}</span>{" "}
              {winner.driver}
            </h2>
            <p className="font-oswald text-base sm:text-lg text-strategy-yellow tracking-wide uppercase mb-3">
              {winner.headline}
            </p>
            <p className="font-oswald text-sm sm:text-[15px] text-white/65 leading-relaxed max-w-2xl">
              {winner.blurb}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 font-oswald text-[11px] tracking-wider text-white/80 uppercase">
                {winner.team} · {winner.manufacturer}
              </span>
              <span className="rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 font-oswald text-[11px] tracking-wider text-white/80 uppercase">
                P{winner.start} → P1
              </span>
              <span className="rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 font-oswald text-[11px] tracking-wider text-white/80 uppercase">
                Led {winner.lapsLed} laps
              </span>
              <span className="rounded-sm border border-strategy-yellow/40 bg-strategy-yellow/10 px-2.5 py-1 font-oswald text-[11px] tracking-wider text-strategy-yellow uppercase">
                Win by {winner.margin}
              </span>
              {(winner.seasonWin > 0 || winner.careerWin > 0) && (
                <span className="rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 font-oswald text-[11px] tracking-wider text-white/80 uppercase">
                  {winner.seasonWin > 0
                    ? `Season win #${winner.seasonWin}`
                    : "Season win TBD"}
                  {winner.careerWin > 0 ? ` · Career #${winner.careerWin}` : ""}
                </span>
              )}
            </div>
          </div>

          {/* Stage strip */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3" data-testid="stage-results">
            {(race.stages ?? []).map((s) => (
              <div
                key={s.stage}
                className="rounded-lg border border-white/10 bg-black/35 px-2.5 sm:px-3 py-3"
              >
                <p className="font-oswald text-[10px] tracking-[0.18em] text-white/40 uppercase mb-1.5">
                  Stage {s.stage}
                </p>
                <p className="font-archivo text-sm sm:text-base uppercase text-white leading-tight">
                  {lastName(s.winner)}
                </p>
                <p className="font-oswald text-[11px] text-white/55 mt-0.5 truncate">
                  {s.winner}
                </p>
                {s.runnerUp && (
                  <p className="font-oswald text-[10px] text-white/35 mt-1 truncate">
                    2nd {s.runnerUp}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Winner pit stops + strategy — directly under winner hero */}
        {race.winnerPitStrategy ? (
          <WinnerPitStrategyPanel strategy={race.winnerPitStrategy} />
        ) : null}

        {/* Race control stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8 sm:mb-10">
          <StatPill label="Lead changes" value={`${race.stats?.leadChanges ?? 0}`} accent="cyan" />
          <StatPill label="Cautions" value={`${race.stats?.cautions ?? 0} / ${race.stats?.cautionLaps ?? 0} laps`} accent="yellow" />
          <StatPill label="Avg speed" value={race.stats?.avgSpeed || "—"} />
          <StatPill label="Pole" value={lastName(race.stats?.pole)} />
          <StatPill
            label="Most laps led"
            value={`${lastName(race.stats?.mostLapsLed)} · ${race.stats?.mostLapsLedCount ?? 0}`}
            accent="red"
          />
          <StatPill
            label="Distance"
            value={(race.distance ?? "—").split("·")[0]?.trim() || "—"}
          />
        </div>

        {isLoudonRecap(race) && (
          <figure
            className="relative mb-8 sm:mb-10 overflow-hidden rounded-xl border border-white/10 bg-black/40"
            data-testid="oopsie-carsone"
          >
            <div className="relative aspect-[16/11] sm:aspect-[21/9]">
              <Image
                src={HOCEVAR_LOUDON_WRECK.src}
                alt={HOCEVAR_LOUDON_WRECK.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-[center_62%]"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--strategy-panel) / 0.88) 0%, hsl(var(--strategy-panel) / 0.45) 42%, transparent 68%), linear-gradient(0deg, hsl(var(--strategy-panel) / 0.72) 0%, transparent 46%)",
                }}
                aria-hidden
              />
              <div className="absolute left-3 top-3 sm:left-5 sm:top-4 flex flex-wrap items-center gap-2">
                <span className="rounded-sm bg-strategy-yellow px-2 py-0.5 font-oswald text-[10px] tracking-[0.2em] uppercase text-nascar-dark">
                  Caution tape
                </span>
                <span className="rounded-sm border border-white/20 bg-black/45 px-2 py-0.5 font-oswald text-[10px] tracking-[0.16em] uppercase text-white/80">
                  #77 · 2 yellows
                </span>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-3.5 sm:p-6 max-w-xl">
                <p className="font-oswald text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-strategy-yellow mb-1.5">
                  Magic Mile · Turn 4 · Lap 204
                </p>
                <p
                  className="font-archivo uppercase leading-[0.88] text-white mb-2 sm:mb-3 -rotate-1 origin-left"
                  style={{ fontSize: "clamp(34px, 7vw, 64px)" }}
                >
                  Oopsie{" "}
                  <span className="text-nascar-red">Carsone</span>
                </p>
                <p className="font-oswald text-sm sm:text-[15px] text-white/80 leading-relaxed max-w-md">
                  Hocevar smoked the #77 and cooked a yellow of his own. Frontstretch stack on lap 85, then this Turn 4 spin late. Loudon did not go well.
                </p>
              </figcaption>
            </div>
          </figure>
        )}

        {/* Main 3-column body on large */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-8">
          {/* Finish order */}
          <div className="lg:col-span-4 rounded-xl border border-white/10 bg-black/25 overflow-hidden">
            <div className="flex items-center justify-between gap-2 px-3.5 sm:px-4 py-3 border-b border-white/10">
              <h3 className="font-archivo text-sm sm:text-base uppercase tracking-wide text-white">
                Top 10 finish
              </h3>
              <span className="font-oswald text-[10px] tracking-widest text-white/40 uppercase">
                Start → Finish
              </span>
            </div>
            <ol className="divide-y divide-white/8" data-testid="finish-order">
              {(race.finishers ?? []).map((f) => {
                const gained = f.start - f.pos;
                return (
                  <li
                    key={f.pos}
                    className={`grid grid-cols-[28px_1fr_auto] sm:grid-cols-[32px_1fr_auto_auto] gap-2 items-center px-3.5 sm:px-4 py-2.5 ${
                      f.pos === 1 ? "bg-nascar-red/15" : ""
                    }`}
                  >
                    <span
                      className={`font-archivo text-sm text-center ${
                        f.pos === 1 ? "text-strategy-yellow" : "text-white/45"
                      }`}
                    >
                      {f.pos}
                    </span>
                    <div className="min-w-0">
                      <p className="font-oswald text-sm text-white truncate">
                        <span className="text-white/40 mr-1">#{f.car}</span>
                        {f.driver}
                      </p>
                      <p className="font-oswald text-[10px] text-white/35 truncate uppercase tracking-wide">
                        {f.team}
                      </p>
                    </div>
                    <span className="font-oswald text-[11px] text-white/50 tabular-nums">
                      P{f.start}
                      {gained !== 0 && (
                        <span
                          className={`ml-1 ${
                            gained > 0 ? "text-strategy-cyan" : "text-nascar-red"
                          }`}
                        >
                          {gained > 0 ? `+${gained}` : gained}
                        </span>
                      )}
                    </span>
                    <span className="hidden sm:block font-oswald text-[11px] text-white/40 tabular-nums w-14 text-right">
                      {f.gap === "—" ? "Winner" : `+${f.gap}`}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Pit scoreboard */}
          <div className="lg:col-span-4 rounded-xl border border-white/10 bg-black/25 p-3.5 sm:p-4">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="font-archivo text-sm sm:text-base uppercase tracking-wide text-white mb-1">
                  Pit stop scoreboard
                </h3>
                <p className="font-oswald text-[11px] text-white/40 leading-snug">
                  Avg pit stall · lower is better
                </p>
              </div>
              <span className="shrink-0 rounded-sm bg-strategy-cyan/15 border border-strategy-cyan/30 px-2 py-0.5 font-oswald text-[10px] tracking-widest uppercase text-strategy-cyan">
                Crew vs crew
              </span>
            </div>
            <PitBars debrief={race} />
            <p className="mt-4 font-oswald text-[10px] sm:text-[11px] text-white/35 leading-relaxed border-t border-white/10 pt-3">
              {race.pitNote}
            </p>
          </div>

          {/* Incidents */}
          <div className="lg:col-span-4 rounded-xl border border-white/10 bg-black/25 p-3.5 sm:p-4">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h3 className="font-archivo text-sm sm:text-base uppercase tracking-wide text-white">
                Penalties · wrecks · bad stops
              </h3>
              <span className="font-oswald text-[10px] tracking-widest text-white/40 uppercase">
                {(race.incidents ?? []).length} notes
              </span>
            </div>
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1" data-testid="incident-feed">
              {(race.incidents ?? []).length === 0 ? (
                <p className="font-oswald text-sm text-white/45">
                  No penalty/wreck notes tagged yet for this race.
                </p>
              ) : (
                (race.incidents ?? []).map((item, idx) => (
                  <IncidentCard key={`${item.bin}-${item.driver}-${idx}`} item={item} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Takeaways + next */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-4 sm:gap-5">
          <div className="rounded-xl border border-white/10 bg-black/25 p-4 sm:p-5">
            <h3 className="font-archivo text-sm sm:text-base uppercase tracking-wide text-white mb-3">
              Race takeaways
            </h3>
            <ul className="space-y-2.5">
              {(race.takeaways ?? []).map((t, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-nascar-red shrink-0" aria-hidden />
                  <p className="font-oswald text-sm text-white/70 leading-relaxed">{t}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-nascar-red/40 bg-nascar-red/10 p-4 sm:p-5 flex flex-col justify-between gap-4">
            <div>
              <p className="font-oswald text-[10px] tracking-[0.2em] text-nascar-red uppercase mb-2">
                {/LIVE/i.test(race.nextRace.when) ? 'Now LIVE' : 'Next up'}
              </p>
              <p className="font-archivo text-xl sm:text-2xl uppercase text-white leading-none mb-2">
                {race.nextRace.name}
              </p>
              <p className="font-oswald text-sm text-white/65 mb-1">{race.nextRace.track}</p>
              <p className="font-oswald text-xs tracking-wide text-white/45 uppercase">
                {race.nextRace.when}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
              <Link
                href="/#tv-guide"
                className="inline-flex items-center justify-center rounded-md bg-nascar-red px-4 py-2.5 font-oswald text-xs tracking-[0.16em] uppercase text-white hover:bg-nascar-red/90 transition-colors"
              >
                TV Guide →
              </Link>
              <Link
                href="/pit-strategy"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-4 py-2.5 font-oswald text-xs tracking-[0.16em] uppercase text-white hover:bg-white/10 transition-colors"
              >
                Pit Strategy →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
