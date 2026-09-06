const TICKER_SEGMENTS = [
  "LIVE: Cook Out Southern 500 · Chase race 1 of 10 · Darlington",
  "GREEN / LIVE · metric grid · Reddick #45 pole · Suárez P2 · Preece P3 · Hamlin P4",
  "Winner TBD after checkered — this desk is not inventing a lap leader",
  "CHECKERED: Sheldon Creed wins the Fleetio 200 · Haas Factory #00 Chevrolet",
  "Creed — 2nd career O'Reilly win · 2nd of 2026 · first non-superspeedway win",
  "Chase after Darlington · Creed 2nd, ~7 behind Allgaier · 8 races left",
  "LIVE: Cook Out Southern 500 · Chase race 1 of 10 · Darlington",
  "GREEN / LIVE · metric grid · Reddick #45 pole · Suárez P2 · Preece P3 · Hamlin P4",
  "Winner TBD after checkered — this desk is not inventing a lap leader",
  "CHECKERED: Sheldon Creed wins the Fleetio 200 · Haas Factory #00 Chevrolet",
  "Creed — 2nd career O'Reilly win · 2nd of 2026 · first non-superspeedway win",
  "Chase after Darlington · Creed 2nd, ~7 behind Allgaier · 8 races left",
];

export default function NewsTicker() {
  return (
    <div
      className="w-full overflow-hidden bg-nascar-red h-8 flex items-center z-50 relative select-none"
      aria-label="Live news ticker"
    >
      {/* Red-to-dark gradient edges */}
      <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-nascar-red to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-nascar-red to-transparent z-10 pointer-events-none" />

      {/* Label pill */}
      <div className="absolute left-0 top-0 h-full flex items-center bg-black/50 px-2 sm:px-3 z-20 border-r border-white/20">
        <span className="font-oswald font-700 text-white text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
          LIVE
        </span>
      </div>

      {/* Scrolling content — pure CSS animation, no client JS */}
      <div className="ticker-scroll pl-12 sm:pl-28">
        {TICKER_SEGMENTS.map((seg, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-oswald font-400 text-white text-[11px] sm:text-xs tracking-wide">
              {seg}
            </span>
            <span className="mx-6 text-nascar-blue opacity-60" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
