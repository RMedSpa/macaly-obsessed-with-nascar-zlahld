import Link from 'next/link';

export default function BeginnersCTA() {
  return (
    <section
      id="beginners"
      className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8"
      aria-labelledby="beginners-cta-heading"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border border-l-4 border-l-nascar-red bg-card">
        <div className="absolute inset-0 speed-lines-bg opacity-40 pointer-events-none" aria-hidden />
        <div
          className="absolute -right-8 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent, hsl(var(--nascar-red) / 0.35), hsl(var(--nascar-blue) / 0.25))',
          }}
          aria-hidden
        />

        <div className="relative px-4 sm:px-8 py-6 sm:py-8 flex flex-col md:flex-row md:items-center gap-5 sm:gap-8">
          <div className="flex-1 min-w-0">
            <p className="font-oswald text-[11px] sm:text-xs tracking-[0.22em] text-nascar-red uppercase mb-2">
              New to the sport?
            </p>
            <h2
              id="beginners-cta-heading"
              className="font-archivo text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-foreground leading-none mb-2"
            >
              NASCAR for Beginners
            </h2>
            <p className="font-oswald text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
              How races work, every major Cup team and their drivers, plus a plain-English guide to the
              tracks they race — all in one place.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-3 flex-shrink-0">
            <Link
              href="/beginners"
              className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg bg-nascar-red text-white hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Start learning →
            </Link>
            <Link
              href="/beginners#teams"
              className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg border border-border bg-background text-foreground hover:border-nascar-blue hover:text-nascar-blue transition-colors whitespace-nowrap"
            >
              Cup teams
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
