import Link from 'next/link';

export default function DriverHubCTA() {
  return (
    <section className="px-3 sm:px-4 py-4 sm:py-6 max-w-7xl mx-auto">
      <Link
        href="/drivers"
        className="group relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card hover:bg-secondary border border-border hover:border-nascar-red/60 rounded-xl px-4 sm:px-6 py-4 sm:py-5 transition-all overflow-hidden card-lift"
      >
        {/* Red left accent */}
        <div className="absolute left-0 top-0 h-full w-1 bg-nascar-red" style={{ borderRadius: '8px 0 0 8px' }} />

        {/* Watermark */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-archivo leading-none select-none pointer-events-none text-nascar-red pr-4 hidden sm:block"
          style={{ fontSize: '110px', opacity: 0.04 }}
          aria-hidden="true"
        >
          #1
        </div>

        <div className="flex items-start sm:items-center gap-3 sm:gap-4 pl-2 sm:pl-3 min-w-0">
          <div className="text-2xl sm:text-3xl flex-shrink-0" aria-hidden="true">🏁</div>
          <div className="min-w-0">
            <p className="font-archivo text-base sm:text-lg uppercase text-foreground tracking-wide">
              Find Your Driver
            </p>
            <p className="font-oswald text-sm text-muted-foreground tracking-wide">
              Personalized news, videos &amp; social posts for any NASCAR driver
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center justify-center gap-2 bg-nascar-red group-hover:bg-nascar-red/80 text-white rounded-lg px-4 py-3 sm:py-2.5 transition-colors w-full sm:w-auto">
          <span className="font-oswald font-600 tracking-wider text-sm uppercase">Driver Hub</span>
          <span className="text-sm group-hover:translate-x-0.5 transition-transform">→</span>
        </div>
      </Link>
    </section>
  );
}
