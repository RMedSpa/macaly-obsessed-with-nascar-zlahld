import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import type { CupDriverProfile } from "@/lib/cup-top10-drivers";
import { TOP10_CUP_CARDS } from "@/lib/cup-top10-drivers";

function compactHeroSrc(src: string, width = 800) {
  const commons = "https://upload.wikimedia.org/wikipedia/commons/";
  if (!src.startsWith(commons) || src.includes("/thumb/")) return src;
  const rest = src.slice(commons.length);
  const file = rest.split("/").pop() ?? "";
  return `${commons}thumb/${rest}/${width}px-${file}`;
}

type Props = {
  driver: CupDriverProfile;
};

function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  const last = parts.pop() ?? name;
  const first = parts.join(" ");
  return { first, last };
}

export default function CupDriverProfilePage({ driver }: Props) {
  const { first, last } = splitName(driver.name);
  const others = TOP10_CUP_CARDS.filter((card) => card.slug !== driver.slug);
  const heroSrc = compactHeroSrc(driver.images.hero.src, 800);
  preload(heroSrc, { as: "image" });

  console.log("[cup-driver-profile] render", driver.slug, "P" + driver.rank);

  return (
    <div className="bg-background text-foreground" data-testid="cup-driver-profile">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 speed-lines-bg opacity-25 pointer-events-none" aria-hidden />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 8% 0%, hsl(var(--nascar-red) / 0.32), transparent 55%), radial-gradient(ellipse 45% 40% at 100% 100%, hsl(var(--strategy-cyan) / 0.08), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-nascar-red" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-12">
          <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            <Link href="/drivers" className="hover:text-foreground">
              Driver Hub
            </Link>
            <span className="mx-2 text-border">/</span>
            <Link href="/drivers#top10-cup" className="hover:text-foreground">
              Top 10 Cup
            </Link>
            <span className="mx-2 text-border">/</span>
            {driver.name}
          </p>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-end">
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-strategy-panel">
              <Image
                src={heroSrc}
                alt={driver.images.hero.alt}
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 92vw, 420px"
                className="h-full w-full object-cover object-top min-h-[260px] max-h-[420px]"
                priority
              />
              <p className="absolute bottom-0 left-0 right-0 bg-black/65 px-3 py-1.5 font-oswald text-[10px] uppercase tracking-wider text-white/55">
                {driver.images.hero.credit}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-sm bg-nascar-red px-2.5 py-1 font-oswald text-[11px] font-semibold tracking-[0.18em] uppercase text-white">
                  #{driver.car} · {driver.team}
                </span>
                <span className="rounded-sm border border-border bg-muted px-2.5 py-1 font-oswald text-[11px] tracking-[0.16em] uppercase text-foreground">
                  P{driver.rank} · {driver.points.toLocaleString()} pts
                </span>
                <span className="rounded-sm border border-border bg-muted px-2.5 py-1 font-oswald text-[11px] tracking-[0.16em] uppercase text-foreground">
                  {driver.manufacturer}
                </span>
              </div>
              <h1
                className="font-archivo uppercase leading-[0.9] text-foreground mb-3"
                style={{ fontSize: "clamp(36px, 8vw, 72px)" }}
              >
                {first} <span className="text-nascar-red">{last}</span>
              </h1>
              <p className="font-oswald text-base sm:text-lg text-nascar-red uppercase tracking-wide mb-3">
                {driver.headline}
              </p>
              <p className="font-oswald text-sm sm:text-[15px] text-foreground/80 leading-relaxed max-w-2xl">
                {driver.lede}
              </p>
              {driver.twitter ? (
                <p className="mt-3 font-oswald text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                  <Link
                    href={`https://twitter.com/${driver.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    @{driver.twitter}
                  </Link>
                  <span className="mx-2 text-border">·</span>
                  {driver.statsLine}
                </p>
              ) : (
                <p className="mt-3 font-oswald text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                  {driver.statsLine}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8">
        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 mb-10">
          {driver.facts.map((fact) => (
            <div key={fact.label} className="bg-strategy-panel px-4 py-4">
              <dt className="font-oswald text-[10px] uppercase tracking-[0.16em] text-white/40">
                {fact.label}
              </dt>
              <dd className="font-archivo uppercase text-white mt-1 leading-tight" style={{ fontSize: 16 }}>
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <section id="race-car" className="mb-14" data-testid="cup-driver-car">
          <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-strategy-yellow mb-2">
            The ride
          </p>
          <h2 className="font-archivo uppercase text-foreground mb-5" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
            {driver.raceCarHeading}
          </h2>
          <figure className="relative overflow-hidden rounded-lg border border-white/10 bg-strategy-panel">
            <div className="relative aspect-[16/10] sm:aspect-[16/8] min-h-[240px]">
              <Image
                src={driver.images.raceCar.src}
                alt={driver.images.raceCar.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-[center_55%]"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, hsl(var(--strategy-panel) / 0.92) 0%, hsl(var(--strategy-panel) / 0.35) 38%, transparent 62%)",
                }}
                aria-hidden
              />
              <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                <span className="rounded-sm bg-strategy-yellow px-2.5 py-1 font-oswald text-[10px] font-semibold tracking-[0.18em] uppercase text-nascar-dark">
                  #{driver.car} · {driver.manufacturer}
                </span>
                <span className="rounded-sm border border-white/20 bg-black/55 px-2.5 py-1 font-oswald text-[10px] tracking-[0.16em] uppercase text-white">
                  {driver.team}
                </span>
                <span className="rounded-sm border border-white/20 bg-black/55 px-2.5 py-1 font-oswald text-[10px] tracking-[0.16em] uppercase text-white">
                  Vegas · 2026
                </span>
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-4 sm:pb-5 pt-8">
                <p className="font-oswald text-[11px] uppercase tracking-[0.2em] text-strategy-yellow mb-1">
                  2026 Cup · Las Vegas spring
                </p>
                <p className="font-archivo uppercase text-white leading-[0.9] mb-2" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
                  No. <span className="text-strategy-yellow">{driver.car}</span>
                </p>
                <p className="font-oswald text-[13px] sm:text-[15px] text-white/75 leading-relaxed max-w-2xl">
                  {driver.raceCarBody}
                </p>
              </figcaption>
            </div>
            <p className="px-4 py-2 font-oswald text-[10px] uppercase tracking-wider text-white/35">
              {driver.images.raceCar.credit}
            </p>
          </figure>
        </section>

        <section id="childhood" className="grid gap-8 lg:grid-cols-2 mb-14 items-center">
          <div>
            <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-strategy-cyan mb-2">
              Childhood
            </p>
            <h2 className="font-archivo uppercase text-foreground mb-4" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
              {driver.childhoodHeading}
            </h2>
            <div className="space-y-4">
              {driver.childhood.map((para) => (
                <p key={para.slice(0, 40)} className="font-oswald text-[15px] text-foreground/80 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
          <figure>
            <div className="overflow-hidden rounded-lg border border-white/10">
              <Image
                src={driver.images.hometown.src}
                alt={driver.images.hometown.alt}
                width={1600}
                height={1066}
                className="h-56 sm:h-80 w-full object-cover"
              />
            </div>
            <figcaption className="mt-2 font-oswald text-[10px] uppercase tracking-wider text-muted-foreground">
              {driver.images.hometown.credit}
            </figcaption>
          </figure>
        </section>

        <section id="family" className="mb-14 rounded-lg border border-white/10 bg-strategy-panel p-5 sm:p-8">
          <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-strategy-yellow mb-2">
            Family
          </p>
          <h2 className="font-archivo uppercase text-white mb-4" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
            Off the clock
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <p className="font-oswald text-[15px] text-white/70 leading-relaxed">{driver.familyNote}</p>
            <ul className="space-y-2">
              {driver.family.map((row) => (
                <li
                  key={row.label}
                  className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2"
                >
                  <span className="font-oswald text-[11px] uppercase tracking-wider text-white/40">
                    {row.label}
                  </span>
                  <span className="font-archivo uppercase text-white text-sm text-right">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="hometown" className="mb-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-nascar-red mb-2">
              Hometown &amp; home
            </p>
            <h2 className="font-archivo uppercase text-foreground mb-4" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
              {driver.hometownHeading}
            </h2>
            {driver.hometownBody.map((para) => (
              <p
                key={para.slice(0, 40)}
                className="font-oswald text-[15px] text-foreground/80 leading-relaxed mb-4 last:mb-0"
              >
                {para}
              </p>
            ))}
          </div>
          <aside className="rounded-lg border border-border bg-card p-5">
            <p className="font-oswald text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Snapshot
            </p>
            <ul className="space-y-3 font-oswald text-sm text-foreground">
              {driver.hometownSnapshot.map((row) => (
                <li key={row.label}>
                  <span className="text-muted-foreground uppercase tracking-wider text-[11px] block">
                    {row.label}
                  </span>
                  {row.value}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section id="career" className="mb-14">
          <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-strategy-cyan mb-2">
            Racing career
          </p>
          <h2 className="font-archivo uppercase text-foreground mb-6" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
            From hometown nights to the No. {driver.car}
          </h2>
          <ol className="space-y-0 border-l border-border ml-2">
            {driver.career.map((chapter) => (
              <li key={chapter.years} className="relative pl-6 pb-8 last:pb-0">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-nascar-red" aria-hidden />
                <p className="font-oswald text-[11px] uppercase tracking-[0.18em] text-nascar-red mb-1">
                  {chapter.years}
                </p>
                <h3 className="font-archivo uppercase text-foreground text-xl mb-2">{chapter.title}</h3>
                <p className="font-oswald text-[15px] text-foreground/80 leading-relaxed max-w-3xl">{chapter.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="signature" className="mb-14">
          <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-nascar-red mb-2">
            {driver.extraKicker}
          </p>
          <h2 className="font-archivo uppercase text-foreground mb-4" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
            {driver.extraHeading}
          </h2>
          <p className="font-oswald text-[15px] text-foreground/80 leading-relaxed mb-5 max-w-3xl">
            {driver.extraBody}
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {driver.extraItems.map((item) => (
              <li key={item.name} className="rounded-md border border-border bg-card px-3 py-3">
                <p className="font-archivo uppercase text-foreground text-sm">{item.name}</p>
                <p className="font-oswald text-xs text-muted-foreground mt-1">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="hardware" className="mb-14">
          <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-nascar-red mb-2">
            Hardware
          </p>
          <h2 className="font-archivo uppercase text-foreground mb-6" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
            What the résumé paid
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {driver.trophies.map((item) => (
              <div key={item.name} className="rounded-lg border border-white/10 bg-strategy-panel p-4">
                <p className="font-archivo uppercase text-white">{item.name}</p>
                <p className="font-oswald text-sm text-strategy-cyan mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-oswald text-xs uppercase tracking-wider text-muted-foreground">
            {driver.statsLine}
          </p>
        </section>

        <nav aria-label="Other Top 10 Cup drivers" className="mb-12">
          <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            The rest of the top 10
          </p>
          <ul className="flex flex-wrap gap-2">
            {others.map((card) => (
              <li key={card.slug}>
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 hover:border-nascar-red/60 transition-colors"
                >
                  <span className="font-oswald text-[10px] uppercase tracking-wider text-nascar-red">
                    P{card.rank}
                  </span>
                  <span className="font-archivo uppercase text-sm text-foreground">{card.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="font-oswald text-xs text-muted-foreground leading-relaxed max-w-3xl">
          Sources for this desk: public biographical records and 2026 Cup points through the Dollar Tree 301
          at Loudon. Images: Wikimedia Commons portraits, hometown photos, and Las Vegas spring Cup car
          shots. Fan site — not affiliated with NASCAR, {driver.team}, or {driver.manufacturer}.
        </p>
      </div>
    </div>
  );
}
