import Image from "next/image";
import Link from "next/link";
import { NASCAR_LEGEND_CARDS } from "@/lib/nascar-legends";

export default function NascarLegends() {
  console.log("[nascar-legends] render", NASCAR_LEGEND_CARDS.length);

  return (
    <section
      id="nascar-legends"
      className="scroll-mt-28 border-b border-border bg-background px-3 sm:px-4 py-8 sm:py-10"
      data-testid="nascar-legends"
      data-state="ready"
    >
      <div className="max-w-5xl mx-auto">
        <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-strategy-yellow mb-2">
          Hall of Fame wing
        </p>
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <h2
            className="font-archivo uppercase text-foreground leading-none"
            style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
          >
            NASCAR <span className="text-strategy-yellow">Legends</span>
          </h2>
          <p className="font-oswald text-sm text-muted-foreground max-w-md">
            Full stories for Dale Earnhardt and Kyle Busch. Childhood, family, the cars, and the years that still echo.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NASCAR_LEGEND_CARDS.map((card) => (
            <li key={card.slug}>
              <Link
                href={card.href}
                className="group card-lift flex h-full overflow-hidden rounded-lg border border-border bg-card hover:border-strategy-yellow/70"
                data-testid={`legend-card-${card.slug}`}
              >
                <div className="relative w-[42%] min-h-[220px] overflow-hidden bg-strategy-panel">
                  <Image
                    src={card.portrait.src}
                    alt={card.portrait.alt}
                    fill
                    sizes="(max-width: 768px) 45vw, 280px"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-2 left-2 rounded-sm bg-strategy-yellow px-2 py-1 font-oswald text-[11px] font-semibold tracking-[0.16em] uppercase text-nascar-dark">
                    #{card.car}
                  </span>
                </div>
                <div className="flex-1 p-4 sm:p-5 flex flex-col">
                  <p className="font-oswald text-[11px] uppercase tracking-[0.2em] text-strategy-yellow">
                    {card.nickname}
                  </p>
                  <p className="font-archivo uppercase text-foreground leading-tight mt-1" style={{ fontSize: 22 }}>
                    {card.name}
                  </p>
                  <p className="font-oswald text-[12px] uppercase tracking-wider text-muted-foreground mt-1">
                    {card.team}
                  </p>
                  <p className="font-oswald text-sm text-foreground/75 mt-3 leading-snug">{card.statsLine}</p>
                  <p className="font-oswald text-[11px] uppercase tracking-wider text-muted-foreground mt-auto pt-4">
                    {card.hometown} · {card.era}
                  </p>
                  <p className="font-oswald text-[12px] uppercase tracking-[0.16em] text-nascar-red mt-3 group-hover:translate-x-0.5 transition-transform">
                    Read the story →
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
