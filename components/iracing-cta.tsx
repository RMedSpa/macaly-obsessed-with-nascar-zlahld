import Link from 'next/link';
import { IRACING_HIGHLIGHTS, IRACING_TIPS } from '@/lib/iracing-tips';

export default function IracingCTA() {
  return (
    <section
      id="iracing"
      className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8"
      aria-labelledby="iracing-cta-heading"
      data-testid="iracing-cta"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border border-l-4 border-l-strategy-cyan bg-card">
        <div className="absolute inset-0 speed-lines-bg opacity-40 pointer-events-none" aria-hidden />
        <div
          className="absolute -right-10 top-0 bottom-0 w-2/5 opacity-25 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent, hsl(var(--strategy-cyan) / 0.35), hsl(var(--nascar-red) / 0.2))',
          }}
          aria-hidden
        />

        {/* subtle telemetry grid */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--strategy-cyan)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--strategy-cyan)) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden
        />

        <div className="relative px-4 sm:px-8 py-6 sm:py-8 flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-center gap-5 sm:gap-8">
            <div className="flex-1 min-w-0">
              <p className="font-oswald text-[11px] sm:text-xs tracking-[0.22em] text-strategy-cyan uppercase mb-2">
                Sim racing desk · {IRACING_TIPS.length} tips
              </p>
              <h2
                id="iracing-cta-heading"
                className="font-archivo text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-foreground leading-none mb-2"
              >
                iRacing tips for NASCAR fans
              </h2>
              <p className="font-oswald text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                Oval lines, draft etiquette, restart launches, fuel windows, FOV, and a clean climb from
                Rookie Legends toward Cup — race craft you can use tonight.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-3 flex-shrink-0">
              <Link
                href="/iracing"
                className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg bg-strategy-cyan text-background hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Open tip book →
              </Link>
              <Link
                href="/iracing#ladder"
                className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg border border-border bg-background text-foreground hover:border-strategy-cyan hover:text-strategy-cyan transition-colors whitespace-nowrap"
              >
                Series ladder
              </Link>
            </div>
          </div>

          <ul className="flex flex-wrap gap-2" aria-label="Tip highlights">
            {IRACING_HIGHLIGHTS.map((item) => (
              <li
                key={item}
                className="font-oswald text-[11px] sm:text-xs tracking-wider uppercase px-3 py-1.5 rounded-full border border-border bg-background/80 text-foreground/80"
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
