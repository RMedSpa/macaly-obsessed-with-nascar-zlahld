import Image from "next/image";
import Link from "next/link";
import { TOP10_CUP_CARDS } from "@/lib/cup-top10-drivers";

export default function Top10CupDrivers() {
  console.log("[top10-cup-drivers] render", TOP10_CUP_CARDS.length);

  return (
    <section
      id="top10-cup"
      className="scroll-mt-28 border-b border-border bg-background px-3 sm:px-4 py-8 sm:py-10"
      data-testid="top10-cup-drivers"
    >
      <div className="max-w-5xl mx-auto">
        <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-nascar-red mb-2">
          After Loudon · Dollar Tree 301
        </p>
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <h2
            className="font-archivo uppercase text-foreground leading-none"
            style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
          >
            Top 10 <span className="text-nascar-red">Cup</span> Driver
          </h2>
          <p className="font-oswald text-sm text-muted-foreground max-w-md">
            Full bios for the 2026 Cup top 10 — childhood, family, hometown, and the car they take to Daytona.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TOP10_CUP_CARDS.map((card) => (
            <li key={card.slug}>
              <Link
                href={card.href}
                className="group card-lift flex flex-col overflow-hidden rounded-lg border border-border bg-card hover:border-nascar-red/60 h-full"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-strategy-panel">
                  <Image
                    src={card.portrait.src}
                    alt={card.portrait.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-2 left-2 rounded-sm bg-nascar-red px-2 py-1 font-oswald text-[11px] font-semibold tracking-[0.16em] uppercase text-white">
                    P{card.rank}
                  </span>
                  <span className="absolute top-2 right-2 rounded-sm border border-white/20 bg-black/60 px-2 py-1 font-oswald text-[11px] tracking-[0.14em] uppercase text-white">
                    #{card.car}
                  </span>
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <p className="font-archivo uppercase text-foreground leading-tight">{card.name}</p>
                  <p className="font-oswald text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                    {card.team}
                  </p>
                  <p className="font-oswald text-[11px] text-muted-foreground mt-auto pt-2">
                    {card.hometown} · {card.points.toLocaleString()} pts
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
