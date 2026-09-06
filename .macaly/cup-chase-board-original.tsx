import Link from 'next/link';
import type { ChaseBoard, ChaseDriver, ChaseScenarioCard, ChaseStatus } from '@/lib/cup-chase';

function statusStyles(status: ChaseStatus): {
  badge: string;
  row: string;
  pill: string;
} {
  switch (status) {
    case 'locked-win':
      return {
        badge: 'bg-nascar-red text-white',
        row: 'border-l-nascar-red bg-nascar-red/5',
        pill: 'text-nascar-red border-nascar-red/40',
      };
    case 'inside-points':
      return {
        badge: 'bg-nascar-blue text-white',
        row: 'border-l-nascar-blue bg-nascar-blue/5',
        pill: 'text-nascar-blue border-nascar-blue/40',
      };
    case 'cut-line':
      return {
        badge: 'bg-strategy-yellow text-background',
        row: 'border-l-strategy-yellow bg-strategy-yellow/10',
        pill: 'text-strategy-yellow border-strategy-yellow/50',
      };
    case 'bubble-out':
      return {
        badge: 'bg-foreground/80 text-background',
        row: 'border-l-foreground/40 bg-secondary/30',
        pill: 'text-foreground border-border',
      };
    case 'outside':
      return {
        badge: 'bg-muted text-muted-foreground',
        row: 'border-l-border bg-card/40',
        pill: 'text-muted-foreground border-border',
      };
    default:
      return {
        badge: 'bg-muted text-muted-foreground',
        row: 'border-l-border opacity-80',
        pill: 'text-muted-foreground border-border',
      };
  }
}

function toneStyles(tone: ChaseScenarioCard['tone']): string {
  switch (tone) {
    case 'good':
      return 'border-t-nascar-red';
    case 'warn':
      return 'border-t-strategy-yellow';
    case 'danger':
      return 'border-t-nascar-red';
    default:
      return 'border-t-nascar-blue';
  }
}

function ptsLabel(n: number, status?: ChaseStatus): string {
  if (status === 'locked-win') return n > 0 ? `+${n}` : 'IN';
  if (n === 0) return 'CUT';
  return n > 0 ? `+${n}` : `${n}`;
}

function DriverRow({
  driver,
  showSlot,
}: {
  driver: ChaseDriver;
  showSlot: boolean;
}) {
  const styles = statusStyles(driver.status);
  return (
    <article
      className={`relative border border-border border-l-4 rounded-xl overflow-hidden ${styles.row}`}
      data-status={driver.status}
    >
      <div className="grid grid-cols-[44px_minmax(0,1fr)_auto] sm:grid-cols-[56px_minmax(0,1.2fr)_88px_72px_72px] gap-2 sm:gap-3 items-center px-3 sm:px-4 py-3">
        <div className="text-center">
          {showSlot && driver.playoffSlot > 0 ? (
            <p className="font-archivo text-lg sm:text-xl text-foreground leading-none">
              {driver.playoffSlot}
            </p>
          ) : (
            <p className="font-archivo text-sm text-muted-foreground leading-none">
              P{driver.position}
            </p>
          )}
          <p className="font-oswald text-[9px] tracking-widest text-muted-foreground uppercase mt-1">
            #{driver.car}
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
            <h3 className="font-archivo text-sm sm:text-base text-foreground uppercase tracking-tight truncate">
              {driver.driver}
            </h3>
            <span
              className={`inline-flex font-oswald text-[9px] sm:text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded-sm ${styles.badge}`}
            >
              {driver.pathLabel}
            </span>
          </div>
          <p className="font-oswald text-[11px] sm:text-xs text-muted-foreground truncate">
            {driver.team ?? driver.manufacturer}
            {driver.wins > 0 ? ` · ${driver.wins} win${driver.wins === 1 ? '' : 's'}` : ' · 0 wins'}
            {driver.bankedPlayoffPts > 0 ? ` · ~${driver.bankedPlayoffPts} PO pts banked` : ''}
          </p>
          <p className="mt-1.5 font-oswald text-[11px] sm:text-xs text-foreground/75 leading-snug max-w-2xl">
            {driver.scenario}
          </p>
        </div>

        <div className="hidden sm:block text-right">
          <p className="font-oswald text-[10px] tracking-widest text-muted-foreground uppercase">
            Pts
          </p>
          <p className="font-archivo text-base text-foreground tabular-nums">
            {driver.points.toLocaleString()}
          </p>
        </div>

        <div className="hidden sm:block text-right">
          <p className="font-oswald text-[10px] tracking-widest text-muted-foreground uppercase">
            Vs cut
          </p>
          <p
            className={`font-archivo text-base tabular-nums ${
              driver.status === 'locked-win' || driver.ptsToCut > 0
                ? 'text-nascar-blue'
                : driver.ptsToCut === 0
                  ? 'text-strategy-yellow'
                  : 'text-nascar-red'
            }`}
          >
            {ptsLabel(driver.ptsToCut, driver.status)}
          </p>
        </div>

        <div className="text-right sm:hidden flex flex-col items-end gap-0.5">
          <span className="font-archivo text-sm tabular-nums text-foreground">
            {driver.points.toLocaleString()}
          </span>
          <span
            className={`font-oswald text-[11px] tabular-nums ${
              driver.status === 'locked-win' || driver.ptsToCut > 0
                ? 'text-nascar-blue'
                : driver.ptsToCut === 0
                  ? 'text-strategy-yellow'
                  : 'text-nascar-red'
            }`}
          >
            {ptsLabel(driver.ptsToCut, driver.status)}
          </span>
        </div>

        <div className="hidden sm:flex flex-col items-end gap-1">
          <span className={`font-oswald text-[10px] tracking-wider uppercase px-2 py-0.5 rounded border ${styles.pill}`}>
            {driver.wins > 0 ? `${driver.wins}W` : 'Pts path'}
          </span>
          <span className="font-oswald text-[10px] text-muted-foreground tabular-nums">
            {driver.top5} T5 · {driver.poles} poles
          </span>
        </div>
      </div>
    </article>
  );
}

function ScenarioCard({ card }: { card: ChaseScenarioCard }) {
  return (
    <div
      className={`rounded-xl border border-border border-t-4 ${toneStyles(card.tone)} bg-card p-4 sm:p-5 h-full`}
    >
      <h3 className="font-archivo text-sm sm:text-base uppercase tracking-tight text-foreground mb-2">
        {card.title}
      </h3>
      <p className="font-oswald text-sm text-muted-foreground leading-relaxed mb-3">
        {card.body}
      </p>
      {card.drivers.length > 0 && (
        <ul className="flex flex-wrap gap-1.5" aria-label="Drivers in this scenario">
          {card.drivers.map((name) => (
            <li
              key={name}
              className="font-oswald text-[10px] sm:text-[11px] tracking-wide uppercase px-2 py-1 rounded-full border border-border bg-background text-foreground/85"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CupChaseBoard({ board }: { board: ChaseBoard }) {
  const bubbleWatch = board.outside.filter((d) => d.status === 'bubble-out' || d.status === 'outside').slice(0, 8);
  const longshots = board.outside.filter((d) => d.status === 'longshot').slice(0, 6);

  return (
    <div className="min-h-screen bg-background" data-testid="cup-chase-board">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 speed-lines-bg opacity-30 pointer-events-none" aria-hidden />
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 10% 0%, hsl(var(--nascar-red) / 0.35), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 20%, hsl(var(--nascar-blue) / 0.3), transparent 50%)',
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 pt-8 sm:pt-12 pb-8 sm:pb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 font-oswald text-[10px] sm:text-xs tracking-[0.2em] uppercase text-strategy-yellow border border-strategy-yellow/40 bg-strategy-yellow/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-strategy-yellow pulse-dot" aria-hidden />
              Cup Chase desk
            </span>
            <span className="font-oswald text-[10px] sm:text-xs tracking-widest uppercase text-muted-foreground border border-border px-2.5 py-1 rounded-full">
              {board.source === 'live' ? 'Live points feed' : 'Cached standings'}
            </span>
          </div>

          <h1 className="font-archivo text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-foreground leading-[0.95] max-w-3xl mb-3">
            The Chase
            <span className="block text-transparent bg-clip-text gradient-accent">
              16 to the title
            </span>
          </h1>
          <p className="font-oswald text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-6">
            Provisional NASCAR Cup playoff field, cut-line bubble, and plain-English scenarios —
            who is locked on wins, who is hanging onto a points seat, and who still needs magic
            before Daytona freezes the 16.
          </p>

          <p className="font-oswald text-xs tracking-wide text-muted-foreground mb-6">
            {board.asOfLabel}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Field size', value: String(board.fieldSize) },
              { label: 'Win locked', value: String(board.winnersIn) },
              { label: 'Points seats', value: String(board.pointsSpotsOpen) },
              { label: 'Races left', value: String(board.regularSeasonRacesLeft) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card/80 backdrop-blur-sm px-3 sm:px-4 py-3"
              >
                <p className="font-oswald text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className="font-archivo text-2xl sm:text-3xl text-foreground leading-none">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {board.cutLineDriver && (
            <div className="mt-4 rounded-xl border border-strategy-yellow/40 bg-strategy-yellow/10 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="font-oswald text-sm text-foreground">
                <span className="text-strategy-yellow tracking-widest uppercase text-xs mr-2">
                  Cut line
                </span>
                <span className="font-archivo uppercase">{board.cutLineDriver}</span>
                {board.cutLinePts != null && (
                  <span className="text-muted-foreground"> · {board.cutLinePts} pts</span>
                )}
              </p>
              <p className="font-oswald text-xs text-muted-foreground">
                RS leader: <span className="text-foreground">{board.regularSeasonLeader}</span>
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-10 space-y-10 sm:space-y-12">
        {/* How it works + remaining */}
        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6">
          <section className="lg:col-span-3" aria-labelledby="how-chase-works">
            <h2
              id="how-chase-works"
              className="font-archivo text-xl sm:text-2xl uppercase tracking-tight text-foreground mb-4"
            >
              How the Chase works
            </h2>
            <ol className="grid sm:grid-cols-2 gap-3">
              {board.formatSteps.map((step) => (
                <li
                  key={step.title}
                  className="rounded-xl border border-border bg-card p-4 border-l-4 border-l-nascar-red"
                >
                  <p className="font-archivo text-sm uppercase text-foreground mb-1">{step.title}</p>
                  <p className="font-oswald text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="lg:col-span-2" aria-labelledby="races-left-heading">
            <h2
              id="races-left-heading"
              className="font-archivo text-xl sm:text-2xl uppercase tracking-tight text-foreground mb-4"
            >
              Road to the field
            </h2>
            <div className="space-y-3">
              {board.remainingRaces.map((race, i) => (
                <div
                  key={race.name}
                  className="rounded-xl border border-border bg-card p-4 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 font-archivo text-5xl text-foreground/5 leading-none pr-2 pt-1 select-none"
                    aria-hidden
                  >
                    {i + 1}
                  </div>
                  <p className="font-oswald text-[10px] tracking-[0.2em] uppercase text-nascar-red mb-1">
                    {race.dateLabel} · {race.tv}
                  </p>
                  <p className="font-archivo text-base uppercase text-foreground">{race.name}</p>
                  <p className="font-oswald text-xs text-muted-foreground mb-2">{race.track}</p>
                  <p className="font-oswald text-sm text-foreground/80 leading-snug">{race.note}</p>
                </div>
              ))}
              <div className="rounded-xl border border-dashed border-border bg-secondary/20 p-4">
                <p className="font-oswald text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Then the tournament
                </p>
                <ul className="space-y-1.5">
                  {board.roundRoadmap.map((r) => (
                    <li key={r.name} className="flex gap-2 font-oswald text-sm">
                      <span className="text-nascar-blue shrink-0">▸</span>
                      <span>
                        <span className="text-foreground">{r.name}</span>
                        <span className="text-muted-foreground"> — {r.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Scenarios */}
        <section aria-labelledby="scenarios-heading">
          <div className="flex items-end justify-between gap-3 mb-4">
            <div>
              <h2
                id="scenarios-heading"
                className="font-archivo text-xl sm:text-2xl uppercase tracking-tight text-foreground"
              >
                Bubble scenarios
              </h2>
              <p className="font-oswald text-sm text-muted-foreground mt-1">
                Snapshot math for the final stretch — not a full Monte Carlo, just the desk board.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {board.scenarios.map((card) => (
              <ScenarioCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        {/* Inside 16 */}
        <section aria-labelledby="inside-16-heading" id="field">
          <div className="flex flex-wrap items-end justify-between gap-2 mb-4">
            <div>
              <h2
                id="inside-16-heading"
                className="font-archivo text-xl sm:text-2xl uppercase tracking-tight text-foreground"
              >
                Provisional Chase field
              </h2>
              <p className="font-oswald text-sm text-muted-foreground mt-1">
                {board.winnersIn} win locks · {board.pointsSpotsOpen} points seats · ordered winners
                first, then points
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="font-oswald text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-nascar-red text-white">
                Win locked
              </span>
              <span className="font-oswald text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-nascar-blue text-white">
                Points seat
              </span>
              <span className="font-oswald text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-strategy-yellow text-background">
                Cut line
              </span>
            </div>
          </div>
          <div className="space-y-2.5">
            {board.inside.map((d) => (
              <DriverRow key={d.driver} driver={d} showSlot />
            ))}
          </div>
        </section>

        {/* Outside */}
        <section aria-labelledby="outside-heading" id="bubble">
          <h2
            id="outside-heading"
            className="font-archivo text-xl sm:text-2xl uppercase tracking-tight text-foreground mb-1"
          >
            Looking in
          </h2>
          <p className="font-oswald text-sm text-muted-foreground mb-4">
            Closest hunters and win-and-in candidates still outside the 16.
          </p>
          <div className="space-y-2.5">
            {bubbleWatch.map((d) => (
              <DriverRow key={d.driver} driver={d} showSlot={false} />
            ))}
          </div>
          {longshots.length > 0 && (
            <div className="mt-6">
              <h3 className="font-archivo text-sm uppercase tracking-wide text-muted-foreground mb-3">
                Deep board · win-and-in long shots
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {longshots.map((d) => (
                  <div
                    key={d.driver}
                    className="rounded-lg border border-border bg-card px-3 py-2.5 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="font-archivo text-sm uppercase truncate text-foreground">
                        {d.driver}
                      </p>
                      <p className="font-oswald text-[11px] text-muted-foreground">
                        P{d.position} · {d.points} pts · {ptsLabel(d.ptsToCut)} cut
                      </p>
                    </div>
                    <span className="font-oswald text-[10px] tracking-widest uppercase text-nascar-red whitespace-nowrap">
                      Need W
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Full points table compact */}
        <section aria-labelledby="full-points-heading" id="points">
          <h2
            id="full-points-heading"
            className="font-archivo text-xl sm:text-2xl uppercase tracking-tight text-foreground mb-4"
          >
            Regular-season points
          </h2>
          <div className="rounded-xl border border-border overflow-hidden bg-card">
            <div className="grid grid-cols-[36px_minmax(0,1fr)_56px_48px_52px_64px] sm:grid-cols-[44px_minmax(0,1fr)_80px_64px_72px_88px] gap-2 px-3 sm:px-4 py-2.5 bg-secondary/50 border-b border-border">
              {['#', 'Driver', 'Pts', 'Wins', 'Banked', 'Vs cut'].map((h) => (
                <span
                  key={h}
                  className={`font-oswald text-[10px] sm:text-xs tracking-widest text-muted-foreground uppercase ${
                    h !== 'Driver' && h !== '#' ? 'text-right' : h === '#' ? 'text-center' : ''
                  }`}
                >
                  {h}
                </span>
              ))}
            </div>
            {board.drivers.slice(0, 24).map((d) => {
              const inField = d.playoffSlot > 0 || board.inside.some((i) => i.driver === d.driver);
              return (
                <div
                  key={d.driver}
                  className={`grid grid-cols-[36px_minmax(0,1fr)_56px_48px_52px_64px] sm:grid-cols-[44px_minmax(0,1fr)_80px_64px_72px_88px] gap-2 items-center px-3 sm:px-4 py-2.5 border-b border-border last:border-0 ${
                    inField ? 'bg-nascar-blue/5' : ''
                  } ${d.status === 'cut-line' ? 'bg-strategy-yellow/10' : ''}`}
                >
                  <span className="font-archivo text-sm text-center text-muted-foreground">
                    {d.position}
                  </span>
                  <div className="min-w-0">
                    <p className="font-archivo text-xs sm:text-sm uppercase truncate text-foreground">
                      {d.driver}
                    </p>
                    <p className="font-oswald text-[10px] text-muted-foreground truncate sm:hidden">
                      #{d.car}
                    </p>
                  </div>
                  <span className="font-oswald text-xs sm:text-sm text-right tabular-nums text-foreground">
                    {d.points.toLocaleString()}
                  </span>
                  <span className="font-oswald text-xs sm:text-sm text-right tabular-nums text-foreground">
                    {d.wins}
                  </span>
                  <span className="font-oswald text-xs sm:text-sm text-right tabular-nums text-muted-foreground">
                    {d.bankedPlayoffPts}
                  </span>
                  <span
                    className={`font-oswald text-xs sm:text-sm text-right tabular-nums ${
                      d.status === 'locked-win' || d.ptsToCut > 0
                        ? 'text-nascar-blue'
                        : d.ptsToCut === 0
                          ? 'text-strategy-yellow'
                          : 'text-nascar-red'
                    }`}
                  >
                    {ptsLabel(d.ptsToCut, d.status)}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 font-oswald text-xs text-muted-foreground">
            Banked PO pts are an estimate (+5 race win, +1 Stage 1/2 win) carried into the playoffs
            after the regular-season reset. Official totals publish with NASCAR when the field locks.
          </p>
        </section>

        {/* CTA footer */}
        <section className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex-1">
              <p className="font-oswald text-[11px] tracking-[0.2em] uppercase text-nascar-red mb-1">
                Keep watching the desk
              </p>
              <h2 className="font-archivo text-2xl uppercase tracking-tight text-foreground mb-2">
                Race recaps & standings live here
              </h2>
              <p className="font-oswald text-sm text-muted-foreground max-w-xl">
                After each Cup race we rebuild the weekly debrief and this Chase board follows the
                official points feed automatically.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <Link
                href="/#last-race"
                className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg bg-nascar-red text-white hover:opacity-90 transition-opacity"
              >
                Latest race recap
              </Link>
              <Link
                href="/#standings"
                className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg border border-border bg-background text-foreground hover:border-nascar-blue hover:text-nascar-blue transition-colors"
              >
                Full standings
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
