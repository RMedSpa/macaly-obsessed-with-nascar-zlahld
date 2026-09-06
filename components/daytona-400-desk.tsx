import Link from "next/link";
import { DAYTONA_400 } from "@/lib/daytona-400";

export default function Daytona400Desk() {
  const race = DAYTONA_400;
  console.log("[daytona-400-desk] render", race.officialName);

  return (
    <section
      id="daytona-400"
      className="relative overflow-hidden border-b border-border bg-strategy-panel"
      aria-labelledby="daytona-400-heading"
      data-testid="daytona-400-desk"
      data-state="ready"
    >
      <div className="pointer-events-none absolute inset-0 speed-lines-bg opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 0% 0%, hsl(var(--nascar-red) / 0.28), transparent 55%), radial-gradient(ellipse 50% 50% at 100% 100%, hsl(var(--strategy-yellow) / 0.12), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-strategy-yellow" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-12">
        <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-strategy-yellow mb-2">
          {race.nightLabel} · {race.dateLabel}
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2
              id="daytona-400-heading"
              className="font-archivo uppercase text-white leading-[0.9]"
              style={{ fontSize: "clamp(32px, 6vw, 56px)" }}
            >
              {race.fanName.split(" ")[0]}{" "}
              <span className="text-strategy-yellow">{race.fanName.split(" ")[1]}</span>
            </h2>
            <p className="font-oswald text-sm sm:text-base text-white/70 mt-2 max-w-2xl">{race.officialName}</p>
          </div>
          <p className="font-oswald text-[12px] uppercase tracking-[0.16em] text-white/50 max-w-sm">
            Checkered · Preece #60 · Chase locked
          </p>
        </div>

        <p className="font-oswald text-[15px] text-white/80 leading-relaxed max-w-3xl mb-8">{race.lede}</p>

        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 mb-8">
          {race.facts.map((fact) => (
            <div key={fact.label} className="bg-black/40 px-4 py-4">
              <dt className="font-oswald text-[10px] uppercase tracking-[0.16em] text-white/40">{fact.label}</dt>
              <dd className="font-archivo uppercase text-white mt-1 leading-tight" style={{ fontSize: 15 }}>
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="grid gap-4 md:grid-cols-3 mb-8">
          {race.beats.map((beat) => (
            <li key={beat.title} className="rounded-lg border border-white/10 bg-black/35 p-4 sm:p-5">
              <p className="font-oswald text-[11px] uppercase tracking-[0.2em] text-strategy-yellow mb-1">
                {beat.kicker}
              </p>
              <h3 className="font-archivo uppercase text-white text-lg mb-2">{beat.title}</h3>
              <p className="font-oswald text-sm text-white/70 leading-relaxed">{beat.body}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/chase"
            className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg bg-nascar-red text-white hover:opacity-90 transition-opacity"
          >
            Chase desk →
          </Link>
          <Link
            href="#tv-guide"
            className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg border border-white/20 text-white hover:border-strategy-yellow hover:text-strategy-yellow transition-colors"
          >
            TV listings
          </Link>
          <Link
            href="/track-types"
            className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg border border-white/20 text-white hover:border-strategy-yellow hover:text-strategy-yellow transition-colors"
          >
            Superspeedway 101
          </Link>
        </div>

        <p className="mt-6 font-oswald text-[10px] uppercase tracking-wider text-white/35">
          {race.sourceLabel} · Booth: {race.booth}. Fan desk, not affiliated with NASCAR or NBC.
        </p>
      </div>
    </section>
  );
}
