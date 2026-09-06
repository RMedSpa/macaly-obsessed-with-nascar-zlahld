import Link from 'next/link';
import { tracksByChaseOrder } from '@/lib/tracks';

export default function TracksCta() {
  const names = tracksByChaseOrder()
    .map((t) => t.name.replace(' Motor Speedway', '').replace(' Raceway', '').replace(' Superspeedway', ''))
    .slice(0, 4);

  return (
    <section
      id="tracks-desk"
      className="relative border-y border-border bg-strategy-panel overflow-hidden"
      aria-labelledby="tracks-cta-heading"
      data-testid="tracks-cta"
    >
      <div className="pointer-events-none absolute inset-0 speed-lines-bg opacity-30" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-nascar-blue" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <p className="font-oswald text-xs uppercase tracking-[0.2em] text-strategy-cyan mb-2">
          Tracks · Chase 2026
        </p>
        <h2 id="tracks-cta-heading" className="font-archivo text-3xl sm:text-4xl text-white">
          Ten Chase tracks. One booth graphic each.
        </h2>
        <p className="mt-3 max-w-xl font-oswald text-base text-white/65 leading-relaxed">
          Darlington through Homestead — egg, paperclip, dogleg, Dega. Infographic, last 10 Cup
          winners. Darlington is LIVE today. {names.join(' · ')}…
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tracks"
            className="inline-flex rounded-lg bg-nascar-red px-5 py-3 font-oswald text-sm uppercase tracking-wider text-white hover:opacity-90"
          >
            Open Tracks desk →
          </Link>
          <Link
            href="/tracks/darlington"
            className="inline-flex rounded-lg border border-white/20 px-5 py-3 font-oswald text-sm uppercase tracking-wider text-white hover:bg-white/10"
          >
            Darlington first
          </Link>
        </div>
      </div>
    </section>
  );
}
