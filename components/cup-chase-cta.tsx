import Link from 'next/link';
import { CHASE_HIGHLIGHTS } from '@/lib/cup-chase';

export default function CupChaseCTA() {
  return (
    <section
      id="chase"
      className="relative border-y border-border bg-card/40 overflow-hidden"
      aria-labelledby="chase-cta-heading"
      data-testid="cup-chase-cta"
    >
      <div className="pointer-events-none absolute inset-0 speed-lines-bg opacity-40" />
      <div className="pointer-events-none absolute -right-20 top-0 h-full w-1/2 bg-gradient-to-l from-nascar-red/10 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="font-oswald text-xs uppercase tracking-[0.2em] text-strategy-yellow mb-2">
              Cup Chase · 2026 · Top 16
            </p>
            <h2
              id="chase-cta-heading"
              className="font-archivo text-3xl sm:text-4xl tracking-tight text-foreground"
            >
              Chase field locked
            </h2>
            <p className="mt-3 max-w-xl font-oswald text-base text-muted-foreground leading-relaxed">
              Daytona froze the 16. Ryan Preece locked the last seed with his first career win.
              Shane van Gisbergen missed despite two victories. See the reset board and the 10-race Chase.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/chase"
                className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg bg-nascar-red text-white hover:opacity-90 transition-opacity"
              >
                Open Chase desk →
              </Link>
              <Link
                href="/chase#bubble"
                className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg border border-border bg-background text-foreground hover:border-strategy-yellow hover:text-strategy-yellow transition-colors"
              >
                Bubble board
              </Link>
            </div>
          </div>

          <ul className="flex flex-wrap gap-2 lg:justify-end" aria-label="Chase highlights">
            {CHASE_HIGHLIGHTS.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-background/80 px-3 py-1.5 font-oswald text-xs uppercase tracking-wider text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
