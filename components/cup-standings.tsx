import Link from "next/link";

interface StandingRow {
  pos: number;
  driver: string;
  pts?: number;
  ptsLabel?: string;
  delta: string;
  team?: string;
}

// Updated after Coke Zero Sugar 400 at Daytona (Aug 29, 2026) — Chase reset
const CUP_STANDINGS: StandingRow[] = [
  { pos: 1,  driver: "Denny Hamlin",      pts: 2100, delta: "LEADER", team: "Joe Gibbs Racing" },
  { pos: 2,  driver: "Ryan Blaney",       pts: 2075, delta: "-25",    team: "Team Penske" },
  { pos: 3,  driver: "Tyler Reddick",     pts: 2065, delta: "-35",    team: "23XI Racing" },
  { pos: 4,  driver: "Ty Gibbs",          pts: 2060, delta: "-40",    team: "Joe Gibbs Racing" },
  { pos: 5,  driver: "Chase Briscoe",     pts: 2055, delta: "-45",    team: "Joe Gibbs Racing" },
  { pos: 6,  driver: "Christopher Bell",  pts: 2050, delta: "-50",    team: "Joe Gibbs Racing" },
  { pos: 7,  driver: "Kyle Larson",       pts: 2045, delta: "-55",    team: "Hendrick Motorsports" },
  { pos: 8,  driver: "Chase Elliott",     pts: 2040, delta: "-60",    team: "Hendrick Motorsports" },
  { pos: 9,  driver: "Joey Logano",       pts: 2035, delta: "-65",    team: "Team Penske" },
  { pos: 10, driver: "Chris Buescher",    pts: 2030, delta: "-70",    team: "RFK Racing" },
];

const XFINITY_STANDINGS: StandingRow[] = [
  { pos: 1, driver: "Justin Allgaier", ptsLabel: "—", delta: "LEADER" },
  { pos: 2, driver: "Sheldon Creed", ptsLabel: "—", delta: "~7" },
];

const TRUCK_STANDINGS: StandingRow[] = [
  { pos: 1,  driver: "Layne Riggs",       pts: 2065, delta: "LEADER" },
  { pos: 2,  driver: "Kaden Honeycutt",   pts: 2057, delta: "-8" },
  { pos: 3,  driver: "Tyler Ankrum",      pts: 2043, delta: "-22" },
  { pos: 4,  driver: "Stewart Friesen",   pts: 2036, delta: "-29" },
  { pos: 5,  driver: "Ty Majeski",        pts: 2025, delta: "-40" },
  { pos: 6,  driver: "Chandler Smith",    pts: 2018, delta: "-47" },
  { pos: 7,  driver: "Christian Eckes",   pts: 2015, delta: "-50" },
  { pos: 8,  driver: "Gio Ruggiero",      pts: 2012, delta: "-53" },
  { pos: 9,  driver: "Grant Enfinger",    pts: 2006, delta: "-59" },
  { pos: 10, driver: "Daniel Hemric",     pts: 2003, delta: "-62" },
];

interface StandingsTableProps {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  rows: StandingRow[];
  showTeam?: boolean;
  seriesColor: string;
  borderAccent: string;
}

function StandingsTable({
  id, icon, title, subtitle, rows, showTeam = false, borderAccent,
}: StandingsTableProps) {
    const maxPts = rows.find((r) => typeof r.pts === 'number')?.pts ?? 1;
    const gridClass = showTeam
      ? 'grid-cols-[28px_minmax(0,1fr)_56px_48px] sm:grid-cols-[36px_minmax(0,1fr)_72px_64px] md:grid-cols-[40px_1fr_140px_90px_80px]'
      : 'grid-cols-[28px_minmax(0,1fr)_56px_48px] sm:grid-cols-[36px_minmax(0,1fr)_72px_64px]';

  return (
    <section id={id} className="max-w-7xl mx-auto px-3 sm:px-4 pb-8 sm:pb-10">
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
        <div className="h-px flex-1 bg-border" />
        <h2 className="font-archivo text-base sm:text-2xl tracking-wide text-foreground uppercase text-center">
          {icon} {title}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className={`bg-card border border-border border-t-4 ${borderAccent} rounded-xl overflow-hidden`}>
        <div className={`grid gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3 bg-secondary/60 border-b border-border ${gridClass}`}>
          <span className="font-oswald text-[10px] sm:text-xs tracking-widest text-muted-foreground uppercase text-center">#</span>
          <span className="font-oswald text-[10px] sm:text-xs tracking-widest text-muted-foreground uppercase">Driver</span>
          {showTeam && (
            <span className="font-oswald text-xs tracking-widest text-muted-foreground uppercase hidden md:block">Team</span>
          )}
          <span className="font-oswald text-[10px] sm:text-xs tracking-widest text-muted-foreground uppercase text-right">Pts</span>
          <span className="font-oswald text-[10px] sm:text-xs tracking-widest text-muted-foreground uppercase text-right">Gap</span>
        </div>

        {rows.map((row) => {
          const isLeader = row.pos === 1;
          const barWidth = typeof row.pts === 'number' ? Math.round((row.pts / maxPts) * 100) : 0;

          return (
            <div
              key={row.pos}
              className={`relative group border-b border-border last:border-0 transition-colors
                ${isLeader ? "bg-nascar-blue/8 hover:bg-nascar-blue/12" : "hover:bg-secondary/40"}`}
            >
              <div
                className={`absolute bottom-0 left-0 h-0.5 transition-all duration-500
                  ${isLeader
                    ? "bg-gradient-to-r from-nascar-red via-white/60 to-nascar-blue"
                    : "bg-nascar-red/30"
                  }`}
                style={{ width: `${barWidth}%` }}
                aria-hidden
              />

              <div className={`grid gap-2 sm:gap-3 items-center px-3 sm:px-5 py-3 sm:py-3.5 ${gridClass}`}>
                <span className={`font-archivo text-sm sm:text-base text-center leading-none
                  ${isLeader ? "text-nascar-blue" : "text-muted-foreground"}`}>
                  {isLeader ? "★" : row.pos}
                </span>

                <div className="min-w-0">
                  <p className={`font-archivo text-xs sm:text-sm leading-tight break-words
                    ${isLeader ? "text-foreground font-bold" : "text-foreground"}`}>
                    {row.driver}
                    {isLeader && (
                      <span className="ml-1.5 sm:ml-2 inline-block font-oswald text-[9px] sm:text-[10px] tracking-widest uppercase bg-nascar-blue text-white px-1.5 py-0.5 rounded-sm align-middle">
                        Leader
                      </span>
                    )}
                  </p>
                  {showTeam && row.team && (
                    <p className="md:hidden font-oswald text-[10px] text-muted-foreground truncate mt-0.5">
                      {row.team}
                    </p>
                  )}
                </div>

                {showTeam && (
                  <p className="hidden md:block font-oswald text-xs text-muted-foreground truncate">
                    {row.team ?? ""}
                  </p>
                )}

                <span className={`font-oswald font-600 text-xs sm:text-sm text-right tabular-nums
                  ${isLeader ? "text-nascar-red" : "text-foreground"}`}>
                  {row.ptsLabel ?? (typeof row.pts === 'number' ? row.pts.toLocaleString() : '—')}
                </span>

                <span className={`font-oswald text-[10px] sm:text-xs text-right tabular-nums
                  ${isLeader ? "text-nascar-blue font-600" : "text-muted-foreground"}`}>
                  {row.delta}
                </span>
              </div>
            </div>
          );
        })}

        <div className="px-3 sm:px-5 py-3 sm:py-3.5 bg-secondary/30 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-oswald text-xs text-muted-foreground tracking-wide leading-snug">{subtitle}</p>
          <Link
            href="https://www.nascar.com/standings"
            target="_blank"
            rel="noopener noreferrer"
            className="font-oswald font-600 text-xs tracking-widest text-nascar-red hover:text-nascar-blue transition-colors uppercase whitespace-nowrap"
          >
            Full Standings →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function CupStandings() {
  return (
    <div id="standings">
      <StandingsTable
        id="cup-standings"
        icon="🏆"
        title="Cup Series Standings"
        subtitle="Chase reset after Daytona · Southern 500 LIVE (race 1 of 10) · points update after checkered"
        rows={CUP_STANDINGS}
        showTeam
        seriesColor="text-series-cup"
        borderAccent="border-t-series-cup"
      />
      <StandingsTable
        id="xfinity-standings"
        icon="⚡"
        title="O'Reilly Series Standings"
        subtitle="Chase after Darlington · Creed wins Fleetio 200 · 2nd, ~7 behind Allgaier · official point totals not verified on this desk"
        rows={XFINITY_STANDINGS}
        seriesColor="text-series-xfinity"
        borderAccent="border-t-series-xfinity"
      />
      <StandingsTable
        id="truck-standings"
        icon="🚛"
        title="Truck Series Standings"
        subtitle="After Richmond (Black's Tire 250) · August 15, 2026"
        rows={TRUCK_STANDINGS}
        seriesColor="text-series-truck"
        borderAccent="border-t-series-truck"
      />
    </div>
  );
}
