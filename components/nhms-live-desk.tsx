import Link from "next/link";
import LarsonLiveTracker from "@/components/larson-live-tracker";
import { NHMS_LIVE, type LiveIncident } from "@/lib/nhms-live";

function incidentTone(tone: LiveIncident["tone"]) {
  if (tone === "dnf") return "border-nascar-red/50 bg-nascar-red/10 text-nascar-red";
  if (tone === "caution") return "border-strategy-yellow/40 bg-strategy-yellow/10 text-strategy-yellow";
  return "border-strategy-cyan/30 bg-strategy-cyan/10 text-strategy-cyan";
}

export default function NhmsLiveDesk() {
  const race = NHMS_LIVE;
  const completed = race.raceLaps - race.lapsRemaining;
  const progressPct = Math.round((completed / race.raceLaps) * 100);

  console.log("Rendering NHMS live desk:", race.raceName, race.leader.driver, race.lapNote);

  return (
    <section
      id="live-race"
      aria-labelledby="nhms-live-heading"
      className="relative overflow-hidden border-y border-white/10"
      style={{ backgroundColor: "hsl(var(--strategy-panel))" }}
      data-testid="nhms-live-desk"
    >
      <div className="absolute inset-0 speed-lines-bg opacity-30 pointer-events-none" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 0% 0%, hsl(var(--nascar-red) / 0.28), transparent 55%), radial-gradient(ellipse 45% 40% at 100% 100%, hsl(var(--strategy-yellow) / 0.08), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-nascar-red" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-11">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-nascar-red px-2.5 py-1 font-oswald text-[10px] sm:text-[11px] font-600 tracking-[0.2em] uppercase text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot" aria-hidden />
            Live · Stage 3
          </span>
          <span className="font-oswald text-[11px] sm:text-xs tracking-[0.16em] text-white/50 uppercase">
            {race.eventLabel}
          </span>
          <span className="hidden sm:inline text-white/20">·</span>
          <span className="font-oswald text-[11px] sm:text-xs tracking-[0.14em] text-white/50 uppercase">
            {race.dateLabel} · {race.tv}
          </span>
        </div>

        <LarsonLiveTracker live={race} />

        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-6 sm:gap-8 mb-7 sm:mb-9 items-end">
          <div>
            <p className="font-oswald text-xs tracking-[0.22em] text-strategy-cyan uppercase mb-2">
              {race.raceName} · {race.track}
            </p>
            <h2
              id="nhms-live-heading"
              className="font-archivo uppercase leading-[0.92] text-white mb-3"
              style={{ fontSize: "clamp(28px, 6vw, 52px)" }}
            >
              <span className="text-nascar-red">#{race.leader.car}</span> {race.leader.driver}
            </h2>
            <p className="font-oswald text-base sm:text-lg text-strategy-yellow tracking-wide uppercase mb-3">
              {race.leader.headline}
            </p>
            <p className="font-oswald text-sm sm:text-[15px] text-white/65 leading-relaxed max-w-2xl">
              {race.leader.blurb}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 font-oswald text-[11px] tracking-wider text-white/80 uppercase">
                {race.leader.team} · {race.leader.manufacturer}
              </span>
              <span className="rounded-sm border border-strategy-yellow/40 bg-strategy-yellow/10 px-2.5 py-1 font-oswald text-[11px] tracking-wider text-strategy-yellow uppercase">
                {race.lapNote}
              </span>
              <span className="rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 font-oswald text-[11px] tracking-wider text-white/80 uppercase">
                Led {race.leader.lapsLed}
              </span>
              <span className="rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 font-oswald text-[11px] tracking-wider text-white/80 uppercase">
                Pole · #{race.pole.car} {race.pole.driver.split(" ").slice(-1)[0]} {race.pole.speed}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between gap-3 mb-2">
              <p className="font-oswald text-[10px] tracking-[0.18em] text-white/40 uppercase">
                Race progress
              </p>
              <p className="font-archivo text-xl text-white tabular-nums leading-none">
                ~{completed}
                <span className="text-white/35 text-sm">/{race.raceLaps}</span>
              </p>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-4" aria-hidden>
              <div
                className="h-full rounded-full bg-gradient-to-r from-nascar-red to-strategy-yellow"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="font-oswald text-[11px] text-white/45 uppercase tracking-wider mb-3">
              {race.distance} · {progressPct}% in
            </p>
            <ol className="space-y-1.5" data-testid="nhms-running-order">
              {race.running.map((row) => (
                <li
                  key={row.pos}
                  className="flex items-start gap-3 rounded-md border border-white/10 bg-black/35 px-3 py-2"
                >
                  <span
                    className={`font-archivo text-sm w-6 shrink-0 ${
                      row.pos === 1 ? "text-strategy-yellow" : "text-white/40"
                    }`}
                  >
                    {row.pos}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-oswald text-sm text-white truncate">
                      <span className="text-white/40 mr-1.5">#{row.car}</span>
                      {row.driver}
                    </p>
                    <p className="font-oswald text-[11px] text-white/40 truncate">{row.note ?? row.team}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-7 sm:mb-9" data-testid="nhms-stages">
          {race.stages.map((s) => (
            <div
              key={s.stage}
              className={`rounded-lg border px-3 py-3 ${
                s.status === "green"
                  ? "border-nascar-red/40 bg-nascar-red/10"
                  : "border-white/10 bg-black/35"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <p className="font-oswald text-[10px] tracking-[0.18em] text-white/40 uppercase">
                  Stage {s.stage} · Lap {s.throughLap}
                </p>
                {s.status === "green" ? (
                  <span className="inline-flex items-center gap-1 font-oswald text-[10px] tracking-widest uppercase text-nascar-red">
                    <span className="w-1.5 h-1.5 rounded-full bg-nascar-red pulse-dot" aria-hidden />
                    Green
                  </span>
                ) : (
                  <span className="font-oswald text-[10px] tracking-widest uppercase text-white/35">
                    Final
                  </span>
                )}
              </div>
              {s.winner ? (
                <>
                  <p className="font-archivo text-base uppercase text-white leading-tight">
                    {s.winner.split(" ").slice(-1)[0]}
                  </p>
                  <p className="font-oswald text-[12px] text-white/60 mt-0.5">
                    #{s.winnerCar} {s.winner}
                  </p>
                </>
              ) : (
                <p className="font-archivo text-base uppercase text-strategy-yellow leading-tight">
                  Berry leads
                </p>
              )}
              <p className="font-oswald text-[11px] text-white/40 mt-2 leading-snug">{s.note}</p>
              {s.top10 && (
                <p className="font-oswald text-[10px] text-white/30 mt-2 leading-snug">
                  Top 10: {s.top10.join(" · ")}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 mb-7">
          <div className="lg:col-span-5 rounded-xl border border-white/10 bg-black/30 overflow-hidden">
            <div className="px-3.5 sm:px-4 py-3 border-b border-white/10">
              <p className="font-oswald text-[10px] tracking-[0.2em] text-strategy-cyan uppercase">
                Starting grid · Busch Light Pole
              </p>
              <p className="font-archivo text-sm text-white uppercase mt-1">
                #{race.pole.car} {race.pole.driver} · {race.pole.speed}
              </p>
              <p className="font-oswald text-[11px] text-white/45 mt-0.5">
                {race.pole.time}s · {race.pole.margin}
              </p>
            </div>
            <ol className="divide-y divide-white/5" data-testid="nhms-qualifying">
              {race.qualifying.map((row) => (
                <li key={row.car} className="flex items-center gap-3 px-3.5 sm:px-4 py-1.5">
                  <span className="font-archivo text-xs text-white/35 w-5">{row.pos}</span>
                  <span className="font-oswald text-sm text-white flex-1 min-w-0 truncate">
                    <span className="text-white/40 mr-1.5">#{row.car}</span>
                    {row.driver}
                  </span>
                  <span className="font-oswald text-[11px] text-white/40 tabular-nums">{row.speed}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-xl border border-white/10 bg-black/30 px-3.5 sm:px-4 py-3.5">
              <p className="font-oswald text-[10px] tracking-[0.2em] text-strategy-yellow uppercase mb-3">
                Chase bubble · two races left
              </p>
              <ul className="space-y-2">
                {race.chaseNotes.map((note) => (
                  <li key={note} className="flex gap-2 font-oswald text-sm text-white/70 leading-snug">
                    <span className="text-strategy-yellow shrink-0">▸</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/chase"
                className="inline-flex mt-4 font-oswald text-xs tracking-[0.16em] uppercase text-strategy-cyan hover:text-white transition-colors"
              >
                Open Chase desk →
              </Link>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 px-3.5 sm:px-4 py-3.5">
              <p className="font-oswald text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3">
                Race log
              </p>
              <ul className="space-y-2.5" data-testid="nhms-incidents">
                {race.incidents.map((item) => (
                  <li key={`${item.lap}-${item.label}`} className="flex gap-3">
                    <span
                      className={`shrink-0 mt-0.5 rounded-sm border px-1.5 py-0.5 font-oswald text-[10px] tracking-wider uppercase ${incidentTone(
                        item.tone
                      )}`}
                    >
                      {item.lap}
                    </span>
                    <div className="min-w-0">
                      <p className="font-oswald text-sm text-white">{item.label}</p>
                      <p className="font-oswald text-[12px] text-white/45 leading-snug">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="font-oswald text-[11px] text-white/35 leading-relaxed">
          {race.snapshotLabel}. Editorial running order from{" "}
          <a
            href={race.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 underline underline-offset-2 hover:text-white"
          >
            {race.sourceLabel}
          </a>
          , confirmed with FOX RaceTrax (Berry P1). Not official NASCAR scoring. Last week’s recap stays
          below.
        </p>
      </div>
    </section>
  );
}
