import Link from "next/link";
import { DARLINGTON_WEEKEND } from "@/lib/darlington-weekend";

export default function DarlingtonWeekendDesk() {
  const desk = DARLINGTON_WEEKEND;
  const pole = desk.oreilly.pole;

  console.log(
    "[darlington-weekend-desk] render",
    desk.cup.status,
    desk.oreilly.pole.driver,
  );

  return (
    <section
      id="darlington-weekend"
      aria-labelledby="darlington-weekend-heading"
      className="relative overflow-hidden border-y border-white/10"
      style={{ backgroundColor: "hsl(var(--strategy-panel))" }}
      data-testid="darlington-weekend-desk"
      data-state="ready"
    >
      <div className="absolute inset-0 speed-lines-bg opacity-30 pointer-events-none" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 0% 0%, hsl(var(--strategy-yellow) / 0.22), transparent 55%), radial-gradient(ellipse 45% 40% at 100% 100%, hsl(var(--nascar-blue) / 0.16), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-strategy-yellow" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-11">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-strategy-yellow px-2.5 py-1 font-oswald text-[10px] sm:text-[11px] font-600 tracking-[0.2em] uppercase text-black">
            <span className="w-1.5 h-1.5 rounded-full bg-black pulse-dot" aria-hidden />
            Qualifying canceled
          </span>
          <span className="font-oswald text-[11px] sm:text-xs tracking-[0.16em] text-white/50 uppercase">
            {desk.track} · {desk.dateLabel}
          </span>
        </div>

        <p className="font-oswald text-xs tracking-[0.22em] text-strategy-yellow uppercase mb-2">
          Lady in Black · Chase weekend
        </p>
        <h2
          id="darlington-weekend-heading"
          className="font-archivo uppercase leading-[0.92] text-white mb-3"
          style={{ fontSize: "clamp(28px, 6vw, 52px)" }}
        >
          Lightning canceled Cup qualifying.{" "}
          <span className="text-strategy-yellow">Metric grid is up.</span>
        </h2>
        <p className="font-oswald text-sm sm:text-[15px] text-white/70 leading-relaxed max-w-3xl mb-7">
          {desk.cup.lede} {desk.oreilly.lede}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-8">
          <article
            className="rounded-xl border border-strategy-yellow/35 bg-black/35 p-4 sm:p-5"
            data-testid="cup-starting-grid"
          >
            <p className="font-oswald text-[10px] tracking-[0.2em] text-strategy-yellow uppercase mb-2">
              Cup Series · {desk.cup.eventLabel.split("·")[1]?.trim()}
            </p>
            <h3 className="font-archivo text-white uppercase text-xl sm:text-2xl leading-tight mb-1">
              {desk.cup.raceName}
            </h3>
            <p className="font-oswald text-strategy-yellow text-sm uppercase tracking-wide mb-3">
              {desk.cup.headline}
            </p>
            <p className="font-oswald text-white/65 text-sm leading-relaxed mb-4">
              {desk.cup.flagNote}. {desk.cup.runName}. Front row: #{desk.cupStarting[0].car} {desk.cupStarting[0].driver} and #{desk.cupStarting[1].car} {desk.cupStarting[1].driver}.
            </p>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10">
              {[
                { label: "Practice", value: "Canceled" },
                { label: "Qualifying", value: "Canceled" },
                { label: "Pole", value: `#${desk.cupStarting[0].car} Reddick` },
                { label: "P2", value: `#${desk.cupStarting[1].car} Suárez` },
                { label: "Race TV", value: desk.cup.tvRace },
                { label: "Sunday", value: desk.cup.greenFlagEt.replace("Sunday, ", "") },
              ].map((fact) => (
                <div key={fact.label} className="bg-black/50 px-3 py-3">
                  <dt className="font-oswald text-[10px] uppercase tracking-[0.14em] text-white/40">
                    {fact.label}
                  </dt>
                  <dd className="font-archivo uppercase text-white mt-1 text-sm leading-tight">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>

          <article
            className="rounded-xl border border-series-xfinity/40 bg-black/35 p-4 sm:p-5"
            data-testid="oreilly-qualifying"
          >
            <p className="font-oswald text-[10px] tracking-[0.2em] text-series-xfinity uppercase mb-2">
              O&apos;Reilly · {desk.oreilly.eventLabel.split("·")[1]?.trim()}
            </p>
            <h3 className="font-archivo text-white uppercase text-xl sm:text-2xl leading-tight mb-1">
              {desk.oreilly.raceName}
            </h3>
            <p className="font-oswald text-series-xfinity text-sm uppercase tracking-wide mb-3">
              Qualifying complete · #{pole.car} {pole.driver} pole
            </p>
            <p className="font-oswald text-white/65 text-sm leading-relaxed mb-4">
              {pole.time} sec · {pole.speed} · {pole.team} {pole.make}. Practice fast:
              #{desk.oreilly.practiceFast.car} {desk.oreilly.practiceFast.driver}{" "}
              {desk.oreilly.practiceFast.time}. Green flag {desk.oreilly.greenFlagEt} on {desk.oreilly.tvRace}.
            </p>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10">
              {[
                { label: "Pole", value: `#${pole.car} Kvapil` },
                { label: "Row 1", value: "Allgaier P2" },
                { label: "TV", value: desk.oreilly.tvRace },
                { label: "Tonight", value: "7:30 p.m. ET" },
              ].map((fact) => (
                <div key={fact.label} className="bg-black/50 px-3 py-3">
                  <dt className="font-oswald text-[10px] uppercase tracking-[0.14em] text-white/40">
                    {fact.label}
                  </dt>
                  <dd className="font-archivo uppercase text-white mt-1 text-sm leading-tight">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </div>

        <div className="mb-8" data-testid="cup-starting-field">
          <div className="flex items-end justify-between gap-3 mb-3">
            <h3 className="font-archivo uppercase text-white text-lg sm:text-xl">
              Southern 500 starting field
            </h3>
            <p className="font-oswald text-[10px] tracking-[0.16em] text-white/40 uppercase">
              Metric · qualifying canceled
            </p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {desk.cupStarting.map((row) => (
              <li
                key={`${row.pos}-${row.driver}`}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-black/30 px-3 py-2.5"
                data-testid={`cup-start-${row.pos}`}
              >
                <span className="font-archivo text-strategy-yellow w-7 text-right tabular-nums">
                  {row.pos}
                </span>
                <p className="font-oswald text-white text-sm uppercase truncate">
                  {row.car ? `#${row.car} ${row.driver}` : row.driver}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mb-8">
          <div className="flex items-end justify-between gap-3 mb-3">
            <h3 className="font-archivo uppercase text-white text-lg sm:text-xl">
              Fleetio 200 starting 12
            </h3>
            <p className="font-oswald text-[10px] tracking-[0.16em] text-white/40 uppercase">
              Single-car · one lap
            </p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {desk.qualifying.map((row) => (
              <li
                key={row.car + row.pos}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-black/30 px-3 py-2.5"
                data-testid={`oreilly-qualy-${row.car}`}
              >
                <span className="font-archivo text-strategy-yellow w-7 text-right tabular-nums">
                  {row.pos}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-oswald text-white text-sm uppercase truncate">
                    #{row.car} {row.driver}
                  </p>
                  <p className="font-oswald text-[11px] text-white/45 uppercase truncate">
                    {row.team}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-oswald text-white text-xs tabular-nums">{row.time}</p>
                  <p className="font-oswald text-[10px] text-white/40 tabular-nums">{row.speed}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="font-oswald text-[11px] text-white/40 mt-3">
            No time: #{desk.oreilly.noTime.car} {desk.oreilly.noTime.driver}. {desk.oreilly.noTime.note}.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="font-archivo uppercase text-white text-lg mb-3">Booth notes</h3>
          <ul className="space-y-2">
            {desk.delayNotes.map((note) => (
              <li
                key={note}
                className="font-oswald text-sm text-white/70 leading-relaxed border-l-2 border-strategy-yellow/50 pl-3"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/#tv-guide"
            className="font-oswald text-xs tracking-[0.16em] uppercase text-strategy-yellow hover:text-white transition-colors"
          >
            TV guide →
          </Link>
          <Link
            href="/chase"
            className="font-oswald text-xs tracking-[0.16em] uppercase text-nascar-blue hover:text-white transition-colors"
          >
            Cup Chase desk →
          </Link>
          <p className="font-oswald text-[11px] text-white/35 uppercase tracking-wide">
            {desk.sourceLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
