import Link from "next/link";
import { DARLINGTON_WEEKEND } from "@/lib/darlington-weekend";

export default function DarlingtonWeekendDesk() {
  const desk = DARLINGTON_WEEKEND;
  const winner = desk.oreilly.winner;

  console.log(
    "[darlington-weekend-desk] render",
    desk.cup.status,
    desk.oreilly.status,
    winner.driver,
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
            "radial-gradient(ellipse 70% 55% at 0% 0%, hsl(var(--nascar-red) / 0.22), transparent 55%), radial-gradient(ellipse 45% 40% at 100% 100%, hsl(var(--nascar-blue) / 0.16), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-nascar-red" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-11">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-nascar-red px-2.5 py-1 font-oswald text-[10px] sm:text-[11px] font-600 tracking-[0.2em] uppercase text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot" aria-hidden />
            LIVE · Green
          </span>
          <span className="inline-flex items-center rounded-sm border border-white/20 bg-white/5 px-2.5 py-1 font-oswald text-[10px] sm:text-[11px] font-600 tracking-[0.16em] uppercase text-white/80">
            Chase race 1 of 10
          </span>
          <span className="font-oswald text-[11px] sm:text-xs tracking-[0.16em] text-white/50 uppercase">
            {desk.track} · {desk.dateLabel}
          </span>
        </div>

        <p className="font-oswald text-xs tracking-[0.22em] text-strategy-yellow uppercase mb-2">
          Lady in Black · Race day
        </p>
        <h2
          id="darlington-weekend-heading"
          className="font-archivo uppercase leading-[0.92] text-white mb-3"
          style={{ fontSize: "clamp(28px, 6vw, 52px)" }}
        >
          Southern 500 is LIVE.{" "}
          <span className="text-nascar-red">Chase opener under green.</span>
        </h2>
        <p className="font-oswald text-sm sm:text-[15px] text-white/70 leading-relaxed max-w-3xl mb-7">
          {desk.cup.lede} {desk.oreilly.lede}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-8">
          <article
            className="rounded-xl border border-nascar-red/40 bg-black/35 p-4 sm:p-5"
            data-testid="cup-starting-grid"
          >
            <p className="font-oswald text-[10px] tracking-[0.2em] text-nascar-red uppercase mb-2">
              Cup Series · Chase race 1 of 10
            </p>
            <h3 className="font-archivo text-white uppercase text-xl sm:text-2xl leading-tight mb-1">
              {desk.cup.raceName}
            </h3>
            <p className="font-oswald text-strategy-yellow text-sm uppercase tracking-wide mb-3">
              {desk.cup.headline}
            </p>
            <p className="font-oswald text-white/65 text-sm leading-relaxed mb-4">
              {desk.cup.flagNote}. Metric pole #{desk.cupStarting[0].car} {desk.cupStarting[0].driver}.
              Front row: #{desk.cupStarting[1].car} {desk.cupStarting[1].driver}. {desk.cup.greenApprox}.
            </p>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10">
              {[
                { label: "Status", value: "GREEN / LIVE" },
                { label: "Winner", value: desk.cup.winner ?? "TBD after checkered" },
                { label: "Pole", value: `#${desk.cupStarting[0].car} Reddick` },
                { label: "P2", value: `#${desk.cupStarting[1].car} Suárez` },
                { label: "Race TV", value: desk.cup.tvRace },
                { label: "Green", value: "5:00 p.m. ET / 3:00 MDT" },
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
            <p className="font-oswald text-[11px] text-white/40 mt-3 uppercase tracking-wide">
              {desk.cup.winnerNote}
            </p>
          </article>

          <article
            className="rounded-xl border border-series-xfinity/40 bg-black/35 p-4 sm:p-5"
            data-testid="oreilly-result"
          >
            <p className="font-oswald text-[10px] tracking-[0.2em] text-series-xfinity uppercase mb-2">
              O&apos;Reilly · Chase opener · CHECKERED
            </p>
            <h3 className="font-archivo text-white uppercase text-xl sm:text-2xl leading-tight mb-1">
              {desk.oreilly.raceName}
            </h3>
            <p className="font-oswald text-series-xfinity text-sm uppercase tracking-wide mb-3">
              #{winner.car} {winner.driver} wins
            </p>
            <p className="font-oswald text-white/65 text-sm leading-relaxed mb-4">
              {winner.team} {winner.make}. {winner.careerWin}nd career O&apos;Reilly win, {winner.seasonWin}nd of
              2026, first non-superspeedway win. {desk.oreilly.distance}. {desk.oreilly.chaseNote}.
            </p>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10">
              {[
                { label: "Winner", value: `#${winner.car} Creed` },
                { label: "P2", value: "#17 Corey Day" },
                { label: "Stage 1", value: "Allgaier · P17" },
                { label: "Stage 2", value: "Alfredo" },
                { label: "Pole", value: "#1 Kvapil · P12" },
                { label: "TV", value: desk.oreilly.tvRace },
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
              Fleetio 200 · top 10
            </h3>
            <p className="font-oswald text-[10px] tracking-[0.16em] text-white/40 uppercase">
              Checkered · Sat Sep 5
            </p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {desk.oreilly.finishers.map((row) => (
              <li
                key={`${row.pos}-${row.driver}`}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-black/30 px-3 py-2.5"
                data-testid={`oreilly-finish-${row.pos}`}
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
          <p className="font-oswald text-[11px] text-white/40 mt-3">
            Kvapil 12th after tire strategy failed. Allgaier 17th. Retzlaff 21st. Caruth 26th (fuel pickup).
          </p>
        </div>

        <div className="mb-8">
          <h3 className="font-archivo uppercase text-white text-lg mb-3">Booth notes</h3>
          <ul className="space-y-2">
            {desk.boothNotes.map((note) => (
              <li
                key={note}
                className="font-oswald text-sm text-white/70 leading-relaxed border-l-2 border-nascar-red/50 pl-3"
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
          <Link
            href="/tracks/darlington"
            className="font-oswald text-xs tracking-[0.16em] uppercase text-white/70 hover:text-white transition-colors"
          >
            Darlington track desk →
          </Link>
          <p className="font-oswald text-[11px] text-white/35 uppercase tracking-wide">
            {desk.sourceLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
