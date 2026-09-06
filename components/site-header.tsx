"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '/', color: 'hover:text-white' },
  { label: 'Live', href: '/#darlington-weekend', color: 'hover:text-nascar-red' },
  { label: 'Race Recap', href: '/#last-race', color: 'hover:text-strategy-yellow' },
  { label: 'Chase', href: '/chase', color: 'hover:text-strategy-yellow' },
  { label: 'Love Garage', href: '/garage', color: 'hover:text-strategy-yellow' },
  { label: 'Trivia', href: '/trivia', color: 'hover:text-strategy-cyan' },
  { label: 'Beginners', href: '/beginners', color: 'hover:text-nascar-red' },
  { label: 'iRacing', href: '/iracing', color: 'hover:text-strategy-cyan' },
  { label: 'Tracks', href: '/tracks', color: 'hover:text-nascar-blue' },
  { label: 'Pit Strat', href: '/pit-strategy', color: 'hover:text-strategy-cyan' },
  { label: 'TV Guide', href: '/#tv-guide', color: 'hover:text-nascar-red' },
  { label: 'Schedule', href: '/#schedule', color: 'hover:text-nascar-blue' },
  { label: '2027', href: '/2027-schedule', color: 'hover:text-nascar-red' },
  { label: 'Standings', href: '/#standings', color: 'hover:text-nascar-blue' },
  { label: 'Cup', href: '/#cup', color: 'hover:text-series-cup' },
  { label: "O'Reilly", href: '/#xfinity', color: 'hover:text-series-xfinity' },
  { label: 'Trucks', href: '/#truck', color: 'hover:text-series-truck' },
  { label: 'IndyCar', href: '/#indycar', color: 'hover:text-series-indycar' },
  { label: 'Driver Hub', href: '/drivers', color: 'hover:text-nascar-red' },
  { label: 'Larson', href: '/drivers/kyle-larson', color: 'hover:text-strategy-yellow' },
];

function CheckeredFlagIcon() {
  const cols = 5;
  const rows = 4;
  const size = 9;
  const poleW = 2.5;
  const poleH = rows * size;

  return (
    <svg
      width="44"
      height={poleH + 1}
      viewBox={`0 0 ${poleW + cols * size + 1} ${poleH + 1}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="sm:w-[56px]"
    >
      <rect x="0" y="0" width={poleW} height={poleH} fill="#666" rx="1" />
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => {
          const isWhite = (row + col) % 2 === 0;
          return (
            <rect
              key={`${row}-${col}`}
              x={poleW + col * size}
              y={row * size}
              width={size}
              height={size}
              fill={isWhite ? '#ffffff' : '#111111'}
              stroke="#333"
              strokeWidth="0.4"
            />
          );
        })
      )}
      <rect x={poleW} y={poleH - 2} width={cols * size} height="2" fill="#e10600" />
    </svg>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-nascar-red shadow-lg" style={{ backgroundColor: '#111111' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between h-12 sm:h-14">
        {/* Logo + always-visible Home */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group min-w-0"
            onClick={closeMenu}
            aria-label="Obsessed with NASCAR — Home"
          >
            <div className="flex-shrink-0 group-hover:scale-105 transition-transform">
              <CheckeredFlagIcon />
            </div>
            <div className="flex flex-col leading-none min-w-0">
              <span
                className="font-oswald tracking-[0.18em] sm:tracking-[0.2em] text-white/50 uppercase"
                style={{ fontSize: '9px' }}
              >
                Obsessed With
              </span>
              <div className="relative inline-flex items-center mt-[2px]">
                <div
                  className="absolute inset-0 bg-nascar-red"
                  style={{ transform: 'skewX(-8deg)', borderRadius: '2px' }}
                />
                <span
                  className="relative font-archivo text-white px-1.5 sm:px-2 py-0 leading-none text-[18px] sm:text-[22px]"
                >
                  NASCAR
                </span>
              </div>
            </div>
          </Link>
          <Link
            href="/"
            onClick={closeMenu}
            className="inline-flex items-center rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 font-oswald text-[10px] sm:text-[11px] font-600 tracking-[0.18em] uppercase text-white/80 hover:bg-nascar-red hover:border-nascar-red hover:text-white transition-colors"
          >
            Home
          </Link>
        </div>

        {/* Desktop / tablet nav — scroll when crowded */}
        <nav
          className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-5 flex-1 min-w-0 justify-start overflow-x-auto scrollbar-none ml-3"
          aria-label="Main navigation"
        >
          {NAV_LINKS.filter((link) => link.href !== '/').map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-oswald font-500 tracking-wider text-[11px] lg:text-xs uppercase text-white/60 transition-colors whitespace-nowrap shrink-0 ${link.color}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile / narrow menu button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/15 text-white hover:bg-white/10 transition-colors ml-2"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-white/10"
          style={{ backgroundColor: '#111111' }}
        >
          <nav className="max-w-7xl mx-auto px-3 py-3 grid grid-cols-2 gap-2" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`font-oswald font-600 tracking-wider text-sm uppercase text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-3 text-center transition-colors ${
                  link.href === '/'
                    ? 'col-span-2 bg-nascar-red/90 text-white border-nascar-red hover:bg-nascar-red'
                    : link.color
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
