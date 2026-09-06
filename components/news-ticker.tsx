const TICKER_SEGMENTS = [
  "CUP QUALIFYING CANCELED: Lightning at Darlington. Metric grid is posted.",
  "Southern 500 pole: Tyler Reddick #45 · Suárez P2 · Preece P3 · Hamlin P4",
  "O'REILLY QUALIFYING FINAL: Carson Kvapil #1 on pole for the Fleetio 200 — 30.424 / 161.636 mph",
  "Allgaier P2 · Brandon Jones P3 · Jesse Love P4 · Sam Mayer P5",
  "Fleetio 200 tonight 7:30 p.m. ET on The CW · 147 laps at the Lady in Black",
  "Southern 500 Sunday 5 p.m. ET on USA · 367 laps · Cup Chase opener",
  "CUP QUALIFYING CANCELED: Lightning at Darlington. Metric grid is posted.",
  "Southern 500 pole: Tyler Reddick #45 · Suárez P2 · Preece P3 · Hamlin P4",
  "O'REILLY QUALIFYING FINAL: Carson Kvapil #1 on pole for the Fleetio 200 — 30.424 / 161.636 mph",
  "Allgaier P2 · Brandon Jones P3 · Jesse Love P4 · Sam Mayer P5",
  "Fleetio 200 tonight 7:30 p.m. ET on The CW · 147 laps at the Lady in Black",
  "Southern 500 Sunday 5 p.m. ET on USA · 367 laps · Cup Chase opener",
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
          DELAY
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
