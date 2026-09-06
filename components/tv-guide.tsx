import { DARLINGTON_WEEKEND_TV } from '@/lib/darlington-weekend';

interface Session {
  time: string;
  series: string;
  session: string;
  channel: string;
  isRace?: boolean;
  seriesColor?: string; // Tailwind bg class
}

interface DayBlock {
  day: string;
  date: string;
  sessions: Session[];
}

const SCHEDULE: DayBlock[] = DARLINGTON_WEEKEND_TV.days;

function SeriesBadge({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <span className={`inline-block ${colorClass} text-white font-oswald text-[10px] font-600 tracking-widest uppercase px-2 py-0.5 rounded-sm`}>
      {label}
    </span>
  );
}

export default function TvGuide() {
  return (
    <section id="tv-guide" className="py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-archivo text-lg sm:text-2xl tracking-wide text-foreground uppercase text-center whitespace-nowrap">
            📺 This Weekend on TV
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Subtitle */}
        <p className="text-center font-oswald text-xs sm:text-sm tracking-wide sm:tracking-widest text-muted-foreground uppercase mb-1 px-1">
          {DARLINGTON_WEEKEND_TV.weekend}
        </p>

        {/* Note line */}
        <p className="text-center font-oswald text-xs text-foreground/50 tracking-wide mb-6 sm:mb-8 px-1">
          {DARLINGTON_WEEKEND_TV.note}
        </p>

        {/* Day blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {SCHEDULE.map((block) => (
            <div
              key={block.day}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              {/* Day header */}
              <div className="bg-gradient-to-r from-nascar-red/80 via-nascar-red/60 to-transparent px-4 sm:px-5 py-2.5 flex items-baseline gap-3">
                <span className="font-archivo text-white text-base uppercase tracking-wide">
                  {block.day}
                </span>
                <span className="font-oswald text-white/60 text-xs tracking-widest uppercase">
                  {block.date}
                </span>
              </div>

              {/* Column headers — desktop/tablet */}
              <div className="hidden sm:grid grid-cols-[68px_1fr_minmax(72px,0.85fr)] gap-x-3 px-4 py-2 bg-secondary/50 border-b border-border">
                <span className="font-oswald text-[10px] tracking-widest text-muted-foreground uppercase">Time</span>
                <span className="font-oswald text-[10px] tracking-widest text-muted-foreground uppercase">Session</span>
                <span className="font-oswald text-[10px] tracking-widest text-muted-foreground uppercase">Channel</span>
              </div>

              {/* Rows */}
              <div>
                {block.sessions.map((s, idx) => (
                  <div
                    key={idx}
                    className={`relative border-b border-border last:border-0 transition-colors
                      ${s.isRace
                        ? 'bg-nascar-red/8 hover:bg-nascar-red/12'
                        : 'hover:bg-secondary/40'
                      }`}
                  >
                    {/* Race row: red left accent stripe */}
                    {s.isRace && (
                      <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-nascar-red to-nascar-blue" />
                    )}

                    {/* Mobile stacked layout */}
                    <div className="sm:hidden px-3 py-3 pl-4 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-oswald text-xs whitespace-nowrap ${s.isRace ? 'text-foreground font-600' : 'text-muted-foreground'}`}>
                          {s.time}
                        </span>
                        <span className={`font-oswald text-[11px] text-right leading-snug ${s.isRace ? 'text-nascar-blue font-600' : 'text-muted-foreground'}`}>
                          {s.channel}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                        <SeriesBadge label={s.series} colorClass={s.seriesColor ?? 'bg-muted'} />
                        <span className={`font-oswald text-xs leading-snug break-words ${s.isRace ? 'text-foreground font-600' : 'text-foreground/80'}`}>
                          {s.session}
                          {s.isRace && (
                            <span className="ml-1.5 inline-flex items-center align-middle">
                              <span className="w-1.5 h-1.5 rounded-full bg-nascar-red pulse-dot" />
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* sm+ grid layout */}
                    <div className="hidden sm:grid grid-cols-[68px_1fr_minmax(72px,0.85fr)] gap-x-3 items-start px-4 py-3">
                      <span className={`font-oswald text-xs leading-tight pt-0.5
                        ${s.isRace ? 'text-foreground font-600' : 'text-muted-foreground'}`}>
                        {s.time}
                      </span>

                      <div className="flex flex-col gap-1 min-w-0">
                        <SeriesBadge label={s.series} colorClass={s.seriesColor ?? 'bg-muted'} />
                        <span className={`font-oswald text-xs leading-tight
                          ${s.isRace ? 'text-foreground font-600' : 'text-foreground/80'}`}>
                          {s.session}
                          {s.isRace && (
                            <span className="ml-1.5 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-nascar-red pulse-dot" />
                            </span>
                          )}
                        </span>
                      </div>

                      <span className={`font-oswald text-xs leading-snug break-words
                        ${s.isRace ? 'text-nascar-blue font-600' : 'text-muted-foreground'}`}>
                        {s.channel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center font-oswald text-xs text-foreground/35 tracking-wide mt-5">
          Broadcast schedule subject to change · Check local listings
        </p>

      </div>
    </section>
  );
}
