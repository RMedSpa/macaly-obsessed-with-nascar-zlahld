import Link from 'next/link';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-nascar-red mt-8 sm:mt-12" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          {/* Logo → Home */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Obsessed with NASCAR — Home">
            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" aria-hidden="true">
              <rect x="0" y="0" width="2" height="24" fill="#666" rx="1" />
              {[0,1,2].map(row =>
                [0,1,2,3].map(col => (
                  <rect
                    key={`${row}-${col}`}
                    x={2 + col * 6.5}
                    y={row * 8}
                    width="6.5"
                    height="8"
                    fill={(row + col) % 2 === 0 ? '#fff' : '#111'}
                    stroke="#333"
                    strokeWidth="0.3"
                  />
                ))
              )}
              <rect x="2" y="22" width="26" height="2" fill="#e10600" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-oswald tracking-widest text-white/40 uppercase group-hover:text-white/60 transition-colors" style={{ fontSize: '9px' }}>
                Obsessed With
              </span>
              <div className="relative inline-flex items-center">
                <div className="absolute inset-0 bg-nascar-red" style={{ transform: 'skewX(-8deg)', borderRadius: '1px' }} />
                <span className="relative font-archivo text-white px-2 leading-none" style={{ fontSize: '17px' }}>NASCAR</span>
              </div>
            </div>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {[
              { label: 'Home', href: '/', external: false },
              { label: 'Race Recap', href: '/#last-race', external: false },
              { label: 'Chase', href: '/chase', external: false },
              { label: 'Love Garage', href: '/garage', external: false },
              { label: 'Trivia Night', href: '/trivia', external: false },
              { label: '2027 Schedule', href: '/2027-schedule', external: false },
              { label: 'Beginners', href: '/beginners', external: false },
              { label: 'iRacing Tips', href: '/iracing', external: false },
              { label: 'Track Types', href: '/track-types', external: false },
              { label: 'Pit Strategy', href: '/pit-strategy', external: false },
              { label: 'Driver Hub', href: '/drivers', external: false },
              { label: 'Top 10 Cup', href: '/drivers#top10-cup', external: false },
              { label: 'Kyle Larson', href: '/drivers/kyle-larson', external: false },
              { label: 'NASCAR.com', href: 'https://www.nascar.com', external: true },
              { label: 'NASCAR YouTube', href: 'https://www.youtube.com/@NASCAR', external: true },
              { label: 'Standings', href: 'https://www.nascar.com/standings', external: true },
              { label: 'NASCAR on X', href: 'https://twitter.com/NASCAR', external: true },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="font-oswald text-xs text-muted-foreground hover:text-nascar-red transition-colors tracking-widest uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center space-y-1">
            <p className="font-oswald text-xs text-muted-foreground tracking-wide">
              © {year} Obsessed with NASCAR · Fan site · Not affiliated with NASCAR or IndyCar
            </p>
            <p className="font-oswald text-[11px] text-muted-foreground/80 tracking-wide max-w-sm mx-auto">
              Fan game on nascarlove.org. Not affiliated with NASCAR, its teams, or its drivers.
            </p>
            <p className="font-oswald text-[11px] text-muted-foreground/80 tracking-wide max-w-sm mx-auto">
              Fan quiz on nascarlove.org. Not affiliated with NASCAR, its teams, or its drivers.
            </p>
          </div>
        </div>

        {/* Multi-series bottom stripe */}
        <div className="flex mt-8 h-[3px] gap-px rounded-full overflow-hidden">
          <div className="flex-1 bg-series-cup" />
          <div className="flex-1 bg-series-xfinity" />
          <div className="flex-1 bg-series-truck" />
          <div className="flex-1 bg-series-arca" />
          <div className="flex-1 bg-series-indycar" />
        </div>
      </div>
    </footer>
  );
}
