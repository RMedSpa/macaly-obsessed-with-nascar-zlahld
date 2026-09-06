import Link from 'next/link';
import { SCHEDULE_2027_HEADLINES } from '@/lib/schedule-2027';

export default function Schedule2027CTA() {
  return (
    <section
      id="schedule-2027"
      className="relative border-y border-border bg-card/40 overflow-hidden"
      aria-labelledby="schedule-2027-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0 speed-lines-bg opacity-40" />
      <div className="pointer-events-none absolute -left-20 top-0 h-full w-1/2 bg-gradient-to-r from-nascar-blue/10 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="font-oswald text-xs uppercase tracking-[0.2em] text-nascar-blue mb-2">
              2027 calendar · Rolling release
            </p>
            <h2
              id="schedule-2027-cta-heading"
              className="font-archivo text-3xl sm:text-4xl tracking-tight text-foreground"
            >
              Confirmed 2027 NASCAR dates
            </h2>
            <p className="mt-3 max-w-xl font-oswald text-base text-muted-foreground leading-relaxed">
              Daytona 500 is Feb. 21. San Diego’s street race is back Aug. 1. Homestead crowns the
              champs Nov. 14. Cup, O’Reilly, and Trucks — confirmed tracks only, no invented fill-ins.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/2027-schedule"
                className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg bg-nascar-red text-white hover:opacity-90 transition-opacity"
              >
                Open 2027 desk →
              </Link>
              <Link
                href="/2027-schedule#whats-new"
                className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg border border-border bg-background text-foreground hover:border-nascar-blue hover:text-nascar-blue transition-colors"
              >
                What’s new
              </Link>
            </div>
          </div>

          <ul className="flex flex-wrap gap-2 lg:justify-end" aria-label="2027 headlines">
            {SCHEDULE_2027_HEADLINES.slice(0, 4).map((item) => (
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
