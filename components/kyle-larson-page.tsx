import Image from "next/image";
import Link from "next/link";
import LarsonLiveTracker from "@/components/larson-live-tracker";
import {
  LARSON_CAREER,
  LARSON_CHILDHOOD,
  LARSON_DIRT,
  LARSON_FACTS,
  LARSON_IMAGES,
  LARSON_PROFILE,
  LARSON_TROPHIES,
} from "@/lib/kyle-larson";
import { getLiveCupRace } from "@/lib/nhms-live";

export default function KyleLarsonPage() {
  const live = getLiveCupRace();
  console.log("[kyle-larson-page] render", live ? live.lapNote : "no-live");

  return (
    <div className="bg-background text-foreground">
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
            Kyle Larson
          </p>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-end">
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-strategy-panel">
              <Image
                src={LARSON_IMAGES.hero.src}
                alt={LARSON_IMAGES.hero.alt}
                width={960}
                height={1200}
                className="h-full w-full object-cover object-top min-h-[320px] max-h-[560px]"
                priority
              />
              <p className="absolute bottom-0 left-0 right-0 bg-black/65 px-3 py-1.5 font-oswald text-[10px] uppercase tracking-wider text-white/55">
                {LARSON_IMAGES.hero.credit}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-sm bg-nascar-red px-2.5 py-1 font-oswald text-[11px] font-600 tracking-[0.18em] uppercase text-white">
                  #{LARSON_PROFILE.car} · Hendrick
                </span>
                <span className="rounded-sm border border-border bg-muted px-2.5 py-1 font-oswald text-[11px] tracking-[0.16em] uppercase text-foreground">
                  2021 · 2025 Cup champion
                </span>
              </div>
              <h1
                className="font-archivo uppercase leading-[0.9] text-foreground mb-3"
                style={{ fontSize: "clamp(36px, 8vw, 72px)" }}
              >
                Kyle <span className="text-nascar-red">Larson</span>
              </h1>
              <p className="font-oswald text-base sm:text-lg text-nascar-red uppercase tracking-wide mb-3">
                Elk Grove dirt kid. Two-time Cup champion. Still the one they watch on clay.
              </p>
              <p className="font-oswald text-sm sm:text-[15px] text-foreground/80 leading-relaxed max-w-2xl">
                Born {LARSON_PROFILE.born} in Sacramento and raised in Elk Grove, California.
                Kyle Miyata Larson drives the No. {LARSON_PROFILE.car} Chevrolet for{" "}
                {LARSON_PROFILE.team} — 32 Cup wins, two championships, and a dirt-track résumé
                that most oval stars never touch.
              </p>
              <p className="mt-3 font-oswald text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                Also known as {LARSON_PROFILE.nicknames.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8">
        {live ? <LarsonLiveTracker live={live} compact /> : null}

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 mb-10">
          {LARSON_FACTS.map((fact) => (
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

        <section id="zbb-car" className="mb-14" data-testid="larson-zbb-car">
          <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-strategy-yellow mb-2">
            The ride · special
          </p>
          <h2 className="font-archivo uppercase text-foreground mb-5" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
            Zac Brown Band
          </h2>
          <figure className="relative overflow-hidden rounded-lg border border-white/10 bg-strategy-panel">
            <div className="relative aspect-[16/10] sm:aspect-[16/8] min-h-[240px]">
              <Image
                src={LARSON_IMAGES.zbb.src}
                alt={LARSON_IMAGES.zbb.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-[center_62%]"
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
                <span className="rounded-sm bg-strategy-yellow px-2.5 py-1 font-oswald text-[10px] font-600 tracking-[0.18em] uppercase text-nascar-dark">
                  #5 · Hendrick
                </span>
                <span className="rounded-sm border border-white/20 bg-black/55 px-2.5 py-1 font-oswald text-[10px] tracking-[0.16em] uppercase text-white">
                  Live at Sphere
                </span>
                <span className="rounded-sm border border-white/20 bg-black/55 px-2.5 py-1 font-oswald text-[10px] tracking-[0.16em] uppercase text-white">
                  Vegas · 2025
                </span>
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-4 sm:pb-5 pt-8">
                <p className="font-oswald text-[11px] uppercase tracking-[0.2em] text-strategy-yellow mb-1">
                  HendrickCars.com · matte black &amp; gold
                </p>
                <p className="font-archivo uppercase text-white leading-[0.9] mb-2" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
                  Zac Brown <span className="text-strategy-yellow">Band</span>
                </p>
                <p className="font-oswald text-[13px] sm:text-[15px] text-white/75 leading-relaxed max-w-2xl">
                  Larson rolled the No. 5 in the band&apos;s stone-skull scheme for the 2025 Las Vegas
                  playoff race — a HendrickCars.com collab for ZBB&apos;s Sphere residency. Matte black,
                  gold leaf, skull on the hood.
                </p>
              </figcaption>
            </div>
            <p className="px-4 py-2 font-oswald text-[10px] uppercase tracking-wider text-white/35">
              {LARSON_IMAGES.zbb.credit}
            </p>
          </figure>
        </section>

        <section id="childhood" className="grid gap-8 lg:grid-cols-2 mb-14 items-center">
          <div>
            <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-strategy-cyan mb-2">
              Childhood
            </p>
            <h2 className="font-archivo uppercase text-foreground mb-4" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
              Raised in the shop
            </h2>
            <div className="space-y-4">
              {LARSON_CHILDHOOD.map((para) => (
                <p key={para.slice(0, 32)} className="font-oswald text-[15px] text-foreground/80 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
          <figure className="space-y-3">
            <div className="overflow-hidden rounded-lg border border-white/10">
              <Image
                src={LARSON_IMAGES.california.src}
                alt={LARSON_IMAGES.california.alt}
                width={1600}
                height={1066}
                className="h-56 sm:h-72 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg border border-white/10">
              <Image
                src={LARSON_IMAGES.dirtYoung.src}
                alt={LARSON_IMAGES.dirtYoung.alt}
                width={1280}
                height={853}
                className="h-56 sm:h-64 w-full object-cover object-center"
              />
            </div>
            <figcaption className="font-oswald text-[10px] uppercase tracking-wider text-muted-foreground">
              {LARSON_IMAGES.california.credit} · {LARSON_IMAGES.dirtYoung.credit}
            </figcaption>
          </figure>
        </section>

        <section id="family" className="mb-14 rounded-lg border border-white/10 bg-strategy-panel p-5 sm:p-8">
          <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-strategy-yellow mb-2">
            Family
          </p>
          <h2 className="font-archivo uppercase text-white mb-4" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
            The Sweet-Larson crew
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="font-oswald text-[15px] text-white/70 leading-relaxed">
                Parents: {LARSON_PROFILE.parents}. {LARSON_PROFILE.heritage}
              </p>
              <p className="font-oswald text-[15px] text-white/70 leading-relaxed">
                Married {LARSON_PROFILE.spouse} on {LARSON_PROFILE.married}. {LARSON_PROFILE.spouseNote}
              </p>
            </div>
            <ul className="space-y-2">
              {LARSON_PROFILE.children.map((child) => (
                <li
                  key={child.name}
                  className="flex items-baseline justify-between gap-3 border-b border-white/8 pb-2"
                >
                  <span className="font-archivo uppercase text-white text-sm">{child.name}</span>
                  <span className="font-oswald text-[11px] uppercase tracking-wider text-white/40">
                    Born {child.born}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="hometown" className="mb-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-nascar-red mb-2">
              Hometown & home
            </p>
            <h2 className="font-archivo uppercase text-foreground mb-4" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
              Elk Grove on the license. North Carolina in season.
            </h2>
            <p className="font-oswald text-[15px] text-foreground/80 leading-relaxed mb-4">
              Hometown is Elk Grove — the Sacramento suburb where the karts, the USAC nights, and
              the first Chili Bowl run all started. {LARSON_PROFILE.residence}
            </p>
            <p className="font-oswald text-[15px] text-foreground/80 leading-relaxed">
              Hendrick Motorsports is based in Concord, North Carolina. That is the shop, the
              simulator, and the weekday grind. California is still the origin story every time
              he climbs into a sprint car on a week off.
            </p>
          </div>
          <aside className="rounded-lg border border-border bg-card p-5">
            <p className="font-oswald text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Snapshot
            </p>
            <ul className="space-y-3 font-oswald text-sm text-foreground">
              <li>
                <span className="text-muted-foreground uppercase tracking-wider text-[11px] block">Born</span>
                {LARSON_PROFILE.birthplace} · {LARSON_PROFILE.born}
              </li>
              <li>
                <span className="text-muted-foreground uppercase tracking-wider text-[11px] block">Hometown</span>
                {LARSON_PROFILE.hometown}
              </li>
              <li>
                <span className="text-muted-foreground uppercase tracking-wider text-[11px] block">Season home</span>
                Concord / Charlotte area · Hendrick
              </li>
              <li>
                <span className="text-muted-foreground uppercase tracking-wider text-[11px] block">Off-week roots</span>
                Northern California, including Grass Valley
              </li>
            </ul>
          </aside>
        </section>

        <section id="career" className="mb-14">
          <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-strategy-cyan mb-2">
            Racing career
          </p>
          <h2 className="font-archivo uppercase text-foreground mb-6" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
            From midgets to the No. 5
          </h2>
          <ol className="space-y-0 border-l border-border ml-2">
            {LARSON_CAREER.map((chapter) => (
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

        <section id="dirt" className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <figure>
            <div className="overflow-hidden rounded-lg border border-white/10">
              <Image
                src={LARSON_IMAGES.dirtNight.src}
                alt={LARSON_IMAGES.dirtNight.alt}
                width={1600}
                height={1066}
                className="h-64 sm:h-80 w-full object-cover"
              />
            </div>
            <figcaption className="mt-2 font-oswald text-[10px] uppercase tracking-wider text-muted-foreground">
              {LARSON_IMAGES.dirtNight.credit}
            </figcaption>
          </figure>
          <div>
            <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-nascar-red mb-2">
              Dirt-track résumé
            </p>
            <h2 className="font-archivo uppercase text-foreground mb-4" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
              The weeknights that made him
            </h2>
            <p className="font-oswald text-[15px] text-foreground/80 leading-relaxed mb-5">
              Most Cup drivers treat dirt as a hobby. Larson treats it like a second series.
              Chili Bowl. Kings Royal. Knoxville. If the clay is packed and the purse is real,
              the No. 5 Cup guy is often already in the car.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {LARSON_DIRT.map((item) => (
                <li key={item.name} className="rounded-md border border-border bg-card px-3 py-3">
                  <p className="font-archivo uppercase text-foreground text-sm">{item.name}</p>
                  <p className="font-oswald text-xs text-muted-foreground mt-1">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="hardware" className="mb-14">
          <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-nascar-red mb-2">
            Cup hardware
          </p>
          <h2 className="font-archivo uppercase text-foreground mb-6" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>
            What the pavement paid
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {LARSON_TROPHIES.map((item) => (
              <div key={item.name} className="rounded-lg border border-white/10 bg-strategy-panel p-4">
                <p className="font-archivo uppercase text-white">{item.name}</p>
                <p className="font-oswald text-sm text-strategy-cyan mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-oswald text-xs uppercase tracking-wider text-muted-foreground">
            Cup line {LARSON_PROFILE.statsThrough}: {LARSON_PROFILE.cupStats.starts} starts ·{" "}
            {LARSON_PROFILE.cupStats.wins} wins · {LARSON_PROFILE.cupStats.top5s} top 5s ·{" "}
            {LARSON_PROFILE.cupStats.poles} poles · 2026 so far {LARSON_PROFILE.cupStats.season2026}
          </p>
        </section>

        <figure className="mb-10 overflow-hidden rounded-lg border border-white/10">
          <Image
            src={LARSON_IMAGES.roadCourse.src}
            alt={LARSON_IMAGES.roadCourse.alt}
            width={1600}
            height={900}
            className="h-56 sm:h-80 w-full object-cover object-center"
          />
          <figcaption className="bg-strategy-panel px-4 py-2 font-oswald text-[10px] uppercase tracking-wider text-white/40">
            {LARSON_IMAGES.roadCourse.credit}
          </figcaption>
        </figure>

        <p className="font-oswald text-xs text-muted-foreground leading-relaxed max-w-3xl">
          Sources for this desk: public biographical records, NASCAR Cup statistical summaries
          heading into Loudon, and the live Dollar Tree 301 notes used on the homepage board.
          Images: Wikimedia Commons portraits and race photos; Pexels stock for California hills
          and night dirt racing; editorial illustration of the 2025 Zac Brown Band Vegas scheme.
          Fan site — not affiliated with NASCAR or Hendrick Motorsports.
        </p>
      </div>
    </div>
  );
}
