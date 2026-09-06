import RaceCountdown from '@/components/race-countdown';

export default function NascarHero() {
  return (
    <section className="relative overflow-hidden min-h-[360px] sm:min-h-[420px] flex items-center" style={{ backgroundColor: '#111111' }}>

      {/* ── Speed-line diagonal texture ── */}
      <div className="absolute inset-0 speed-lines-bg opacity-100 pointer-events-none" />

      {/* ── Animated speed streak lines ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="speed-line absolute top-0 h-full"
            style={{
              width: `${1 + (i % 3)}px`,
              left: `${5 + i * 9.5}%`,
              background: i % 3 === 0
                ? `rgba(225, 6, 0, ${0.08 + i * 0.01})`
                : `rgba(255, 255, 255, ${0.02 + i * 0.005})`,
              animationDuration: `${2.5 + i * 0.6}s`,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}
      </div>

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* ── Red left accent stripe ── */}
      <div className="absolute left-0 top-0 w-1 h-full bg-nascar-red" />

      {/* ── Checkered top-right watermark ── */}
      <div className="absolute top-0 right-0 w-40 sm:w-72 h-full checkered-bg pointer-events-none opacity-60 sm:opacity-100" />

      {/* ── Bottom red stripe ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-nascar-red via-white/40 to-nascar-blue" />

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 sm:gap-10 items-center">

          {/* Left: headline */}
          <div>
            <div className="inline-flex items-center gap-2 border border-strategy-yellow/50 rounded-full px-3 py-1 mb-4 sm:mb-5 bg-strategy-yellow/15">
              <span className="w-2 h-2 rounded-full bg-strategy-yellow flex-shrink-0 pulse-dot" />
              <span className="font-oswald font-600 tracking-[0.2em] text-strategy-yellow text-xs uppercase">
                Rain delay · Darlington
              </span>
            </div>

            {/* Main title */}
            <h1 className="font-archivo leading-[0.95] mb-3 sm:mb-4" style={{ fontSize: 'clamp(40px, 11vw, 96px)' }}>
              <span className="text-white uppercase">Obsessed</span>
              <br />
              <span className="text-white uppercase">With </span>
              <span className="gradient-accent uppercase">NASCAR</span>
            </h1>

            {/* Subtitle */}
            <p className="font-oswald text-white/50 text-xs sm:text-base tracking-[0.12em] sm:tracking-widest uppercase mb-3 sm:mb-4">
              Cup · O&apos;Reilly · Trucks · ARCA · NTT IndyCar
            </p>
            <p className="font-oswald text-white/80 text-sm sm:text-base tracking-wide mb-5 sm:mb-7">
              Cup qualifying canceled at Darlington. Tyler Reddick starts the Southern 500 from the metric pole. O&apos;Reilly: Carson Kvapil on pole for tonight&apos;s Fleetio 200.
            </p>

            {/* Series badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                { label: 'Cup Series', color: 'bg-series-cup' },
                { label: "O'Reilly", color: 'bg-series-xfinity' },
                { label: 'Trucks', color: 'bg-series-truck' },
                { label: 'ARCA', color: 'bg-series-arca' },
                { label: 'IndyCar', color: 'bg-series-indycar' },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className={`${badge.color} text-white font-oswald font-600 tracking-widest text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-sm uppercase`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: countdown card */}
          <div className="w-full max-w-md lg:max-w-none mx-auto lg:mx-0">
            <RaceCountdown />
          </div>

        </div>
      </div>
    </section>
  );
}
