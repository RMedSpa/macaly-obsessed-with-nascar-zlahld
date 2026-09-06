import Link from 'next/link';

interface Race {
  date: string;
  name: string;
  track: string;
  tv: string;
  status: 'completed' | 'upcoming' | 'next';
  winner?: string;
}

const NASCAR_2026: Race[] = [
  { date: 'Jun 7',  name: 'FireKeepers Casino 400',    track: 'Michigan Int\'l Speedway',       tv: 'USA',       status: 'completed', winner: 'Denny Hamlin' },
  { date: 'Jun 14', name: 'Great American Getaway 400', track: 'Pocono Raceway',                 tv: 'Prime',     status: 'completed', winner: 'Denny Hamlin' },
  { date: 'Jun 21', name: 'Anduril 250',                track: 'San Diego Street Course',        tv: 'USA',       status: 'completed', winner: 'Corey Heim' },
  { date: 'Jun 28', name: 'Toyota/Save Mart 350',       track: 'Sonoma Raceway',                 tv: 'USA',       status: 'completed', winner: 'S. van Gisbergen' },
  { date: 'Jul 5',  name: 'eero 400',                   track: 'Chicagoland Speedway',           tv: 'TNT',       status: 'completed', winner: 'Chase Briscoe' },
  { date: 'Jul 12', name: 'Quaker State 400',            track: 'EchoPark Speedway (Atlanta)',    tv: 'TNT',       status: 'completed', winner: 'Ryan Blaney' },
  { date: 'Jul 19', name: 'Window World 450',            track: 'North Wilkesboro Speedway',      tv: 'TNT',       status: 'completed', winner: 'Joey Logano' },
  { date: 'Jul 26', name: 'Brickyard 400',               track: 'Indianapolis Motor Speedway',    tv: 'TNT',       status: 'completed', winner: 'Corey Heim' },
  { date: 'Aug 9',  name: 'Iowa Corn 350',               track: 'Iowa Speedway',                  tv: 'USA',       status: 'completed', winner: 'Ty Gibbs' },
  { date: 'Aug 15', name: 'Cook Out 400',                track: 'Richmond Raceway',               tv: 'USA',       status: 'completed', winner: 'Joey Logano' },
  { date: 'Aug 23', name: 'Dollar Tree 301',             track: 'New Hampshire Motor Speedway',   tv: 'USA',       status: 'next' },
  { date: 'Aug 29', name: 'Coke Zero Sugar 400',         track: 'Daytona International Speedway', tv: 'NBC',       status: 'upcoming' },
];

const INDYCAR_2026: Race[] = [
  { date: 'May 24', name: '110th Indianapolis 500',           track: 'Indianapolis Motor Speedway',     tv: 'FOX', status: 'completed', winner: 'Felix Rosenqvist' },
  { date: 'May 31', name: 'Chevrolet Detroit GP',             track: 'Streets of Detroit',              tv: 'FOX', status: 'completed', winner: 'Alex Palou' },
  { date: 'Jun 7',  name: 'Bommarito Automotive Group 500',  track: 'World Wide Technology Raceway',  tv: 'FOX', status: 'completed', winner: 'Josef Newgarden' },
  { date: 'Jun 21', name: 'XPEL Grand Prix',                  track: 'Road America, Elkhart Lake',      tv: 'FOX', status: 'completed', winner: 'C. Lundgaard' },
  { date: 'Jul 5',  name: 'Honda Indy 200',                   track: 'Mid-Ohio Sports Car Course',      tv: 'FOX', status: 'completed', winner: "Pato O'Ward" },
  { date: 'Jul 20', name: 'Borchetta Bourbon Music City GP',  track: 'Nashville Superspeedway',         tv: 'FOX', status: 'completed', winner: 'Alex Palou' },
  { date: 'Aug 9',  name: 'OnlyBulls GP of Portland',         track: 'Portland International Raceway',  tv: 'FOX', status: 'completed', winner: 'Alex Palou' },
  { date: 'Aug 16', name: 'Ontario Honda Dealers Indy',       track: 'Streets of Markham, Ontario',     tv: 'FOX', status: 'completed', winner: 'Marcus Ericsson' },
  { date: 'Aug 23', name: 'Freedom 250 Grand Prix',           track: 'Streets of Washington, D.C.',     tv: 'FOX', status: 'next' },
  { date: 'Aug 29', name: 'Snap-on Makers and Fixers 250',    track: 'Milwaukee Mile',                  tv: 'FOX', status: 'upcoming' },
  { date: 'Aug 30', name: 'Snap-on Milwaukee Mile 250',       track: 'Milwaukee Mile',                  tv: 'FOX', status: 'upcoming' },
  { date: 'Sep 6',  name: 'Grand Prix of Monterey',           track: 'WeatherTech Raceway Laguna Seca', tv: 'FOX', status: 'upcoming' },
];

function RaceRow({ race }: { race: Race }) {
  const isNext = race.status === 'next';
  const isDone = race.status === 'completed';

  return (
    <div
      className={`flex items-start sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border/50 last:border-0 transition-colors
        ${isNext ? 'bg-nascar-red/10 border-l-2 border-l-nascar-red' : ''}
        ${isDone ? 'opacity-50' : isNext ? '' : 'hover:bg-secondary/50'}
      `}
    >
      <div className={`w-12 sm:w-14 flex-shrink-0 font-oswald text-[11px] sm:text-xs tracking-wide pt-0.5 ${isDone ? 'text-muted-foreground' : isNext ? 'text-nascar-blue' : 'text-foreground/80'}`}>
        {race.date}
      </div>

      <div className="flex-1 min-w-0">
        <p className={`font-oswald font-500 text-xs sm:text-sm leading-tight ${isDone ? 'text-muted-foreground' : isNext ? 'text-foreground font-semibold' : 'text-foreground/90'}`}>
          {race.name}
        </p>
        <p className="font-oswald text-[11px] sm:text-xs text-muted-foreground truncate">{race.track}</p>
        <div className="sm:hidden flex items-center gap-2 mt-1">
          <span className="font-oswald text-[10px] tracking-wider text-muted-foreground uppercase">
            {race.tv}
          </span>
          {isNext && (
            <span className="font-oswald font-700 tracking-wider text-[10px] bg-nascar-red text-white px-1.5 py-0.5 rounded-sm uppercase">
              NEXT
            </span>
          )}
          {isDone && race.winner && (
            <span className="font-oswald text-[10px] text-nascar-blue/80 truncate">
              🏆 {race.winner}
            </span>
          )}
        </div>
      </div>

      <span className="hidden sm:block font-oswald text-xs tracking-wider text-muted-foreground w-12 text-center flex-shrink-0">
        {race.tv}
      </span>

      <div className="hidden sm:block flex-shrink-0 min-w-[64px] text-right">
        {isNext && (
          <span className="font-oswald font-700 tracking-wider text-xs bg-nascar-red text-white px-2 py-0.5 rounded-sm uppercase">
            NEXT
          </span>
        )}
        {isDone && race.winner && (
          <span className="font-oswald text-xs text-nascar-blue/70 truncate max-w-[90px] block text-right">
            🏆 {race.winner}
          </span>
        )}
        {race.status === 'upcoming' && (
          <span className="font-oswald text-xs text-muted-foreground/40">—</span>
        )}
      </div>
    </div>
  );
}

function ScheduleCard({
  title,
  accentClass,
  icon,
  races,
  id,
}: {
  title: string;
  accentClass: string;
  icon: string;
  races: Race[];
  id: string;
}) {
  return (
    <div id={id} className={`bg-card border border-border border-t-4 ${accentClass} rounded-xl overflow-hidden`}>
      <div className="px-4 py-3 border-b border-border/50 bg-secondary/30">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <h3 className="font-archivo text-sm uppercase tracking-wide text-foreground">{title}</h3>
          <span className="ml-auto font-oswald text-xs tracking-widest text-muted-foreground uppercase">2026</span>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-2 border-b border-border/30 bg-secondary/10">
        <span className="w-14 font-oswald text-[10px] tracking-widest text-muted-foreground uppercase">Date</span>
        <span className="flex-1 font-oswald text-[10px] tracking-widest text-muted-foreground uppercase">Race · Track</span>
        <span className="hidden sm:block font-oswald text-[10px] tracking-widest text-muted-foreground uppercase w-12 text-center">TV</span>
        <span className="font-oswald text-[10px] tracking-widest text-muted-foreground uppercase min-w-[64px] text-right">Result</span>
      </div>

      <div>
        {races.map((race, i) => <RaceRow key={i} race={race} />)}
      </div>
    </div>
  );
}

export default function RaceSchedule() {
  return (
    <section id="schedule" className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="h-px flex-1 bg-border" />
        <h2 className="font-archivo text-lg sm:text-2xl tracking-wide text-foreground uppercase whitespace-nowrap">
          🗓️ Race Schedule
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ScheduleCard
          id="nascar-schedule"
          title="NASCAR Cup Series"
          accentClass="border-t-series-cup"
          icon="🏆"
          races={NASCAR_2026}
        />
        <ScheduleCard
          id="indycar-schedule"
          title="NTT IndyCar Series"
          accentClass="border-t-series-indycar"
          icon="🔵"
          races={INDYCAR_2026}
        />
      </div>

      <p className="text-center font-oswald text-xs text-muted-foreground mt-4 tracking-wide">
        2026 remaining weekends · Dates subject to change · TV listings may vary
      </p>
      <p className="text-center mt-3">
        <Link
          href="/2027-schedule"
          className="font-oswald text-xs uppercase tracking-[0.16em] text-nascar-red hover:underline"
        >
          Confirmed 2027 dates →
        </Link>
      </p>
    </section>
  );
}
