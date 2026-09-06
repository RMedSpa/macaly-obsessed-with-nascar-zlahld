import Link from 'next/link';
import type { ChaseBoard, ChaseDriver, ChaseScenarioCard, ChaseStatus } from '@/lib/cup-chase';

const STATUS_STYLES: Record<
  ChaseStatus,
  { label: string; className: string; row: string }
> = {
  'safe-inside': {
    label: 'Inside',
    className: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    row: 'border-l-emerald-500',
  },
  'cut-line': {
    label: 'Cut line',
    className: 'bg-strategy-yellow/15 text-strategy-yellow border-strategy-yellow/50',
    row: 'border-l-strategy-yellow',
  },
  'bubble-out': {
    label: 'Bubble',
    className: 'bg-orange-500/15 text-orange-300 border-orange-500/40',
    row: 'border-l-orange-500',
  },
  outside: {
    label: 'Outside',
    className: 'bg-muted text-muted-foreground border-border',
    row: 'border-l-muted-foreground/40',
  },
  longshot: {
    label: 'Long shot',
    className: 'bg-secondary text-muted-foreground border-border',
    row: 'border-l-border',
  },
};

function ptsLabel(n: number): string {
  if (n > 0) return `+${n}`;
  if (n === 0) return 'EVEN';
  return String(n);
}

function ptsClass(n: number): string {
  if (n > 0) return 'text-emerald-300';
  if (n === 0) return 'text-strategy-yellow';
  return 'text-nascar-red';
}

function StatusBadge({ status }: { status: ChaseStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center font-oswald text-[10px] sm:text-xs tracking-widest uppercase px-2 py-0.5 rounded border ${s.className}`}
    >
      {s.label}
    </span>
  );
}

function ScenarioCard({ card }: { card: ChaseScenarioCard }) {
  const toneBorder =
    card.tone === 'good'
      ? 'border-emerald-500/40'
      : card.tone === 'warn'
        ? 'border-strategy-yellow/40'
        : card.tone === 'danger'
          ? 'border-nascar-red/50'
          : 'border-nascar-blue/40';
  const toneBar =
    card.tone === 'good'
      ? 'bg-emerald-500'
      : card.tone === 'warn'
        ? 'bg-strategy-yellow'
        : card.tone === 'danger'
          ? 'bg-nascar-red'
          : 'bg-nascar-blue';

  return (
    <article
      className={`relative overflow-hidden rounded-xl border bg-card p-4 sm:p-5 ${toneBorder}`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${toneBar}`} aria-hidden />
      <h3 className="font-archivo text-base sm:text-lg uppercase tracking-tight text-foreground mb-2 pl-2">
        {card.title}
      </h3>
      <p className="font-oswald text-sm text-muted-foreground leading-relaxed pl-2 mb-3">
        {card.body}
      </p>
      {card.drivers.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 pl-2">
          {card.drivers.map((d) => (
            <li
              key={d}
              className="font-oswald text-xs tracking-wide uppercase text-foreground/90 bg-secondary/60 border border-border px-2 py-0.5 rounded"
            >
              {d}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function DriverRow({
  driver,
  showSeed,
}: {
  driver: ChaseDriver;
  showSeed?: boolean;
}) {
  const style = STATUS_STYLES[driver.status];
  return (
    <li
      className={`rounded-xl border border-border bg-card border-l-4 ${style.row} p-3 sm:p-4 card-lift`}
      data-testid={`chase-driver-${driver.car}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="shrink-0 w-10 text-center">
            {driver.playoffSlot > 0 ? (
              <span className="font-archivo text-xl text-foreground leading-none">
                {driver.playoffSlot}
              </span>
            ) : (
              <span className="font-oswald text-sm text-muted-foreground">
                P{driver.position}
              </span>
            )}
            <p className="font-oswald text-[9px] tracking-widest uppercase text-muted-foreground mt-0.5">
              #{driver.car}
            </p>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="font-archivo text-base sm:text-lg uppercase tracking-tight text-foreground truncate">
                {driver.driver}
              </h3>
              <StatusBadge status={driver.status} />
            </div>
            <p className="font-oswald text-xs text-muted-foreground truncate mb-1.5">
              {driver.team ?? '—'} · {driver.manufacturer || '—'}
              {driver.wins > 0 && (
                <span className="text-foreground/70">
                  {' '}
                  · {driver.wins} win{driver.wins === 1 ? '' : 's'}
                </span>
              )}
            </p>
            <p className="font-oswald text-sm text-foreground/85 leading-snug">
              <span className="text-nascar-blue tracking-wide uppercase text-xs mr-1.5">
                {driver.pathLabel}
              </span>
              {driver.scenario}
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-1 shrink-0 sm:w-28">
          <div className="text-right">
            <p className="font-archivo text-xl sm:text-2xl text-foreground leading-none tabular-nums">
              {driver.points}
            </p>
            <p className="font-oswald text-[10px] tracking-widest uppercase text-muted-foreground">
              points
            </p>
          </div>
          <div className="text-right">
            <p className={`font-archivo text-base leading-none tabular-nums ${ptsClass(driver.ptsToCut)}`}>
              {ptsLabel(driver.ptsToCut)}
            </p>
            <p className="font-oswald text-[10px] tracking-widest uppercase text-muted-foreground">
              vs cut
            </p>
          </div>
          {showSeed && driver.projectedChasePts > 0 && (
            <div className="text-right hidden sm:block">
              <p className="font-oswald text-sm text-foreground/80 tabular-nums">
                ~{driver.projectedChasePts}
              </p>
              <p className="font-oswald text-[10px] tracking-widest uppercase text-muted-foreground">
                Chase seed
              </p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default function CupChaseBoard({ board }: { board: ChaseBoard }) {
  const fieldLocked = board.regularSeasonRacesLeft === 0;
  const bubbleWatch = fieldLocked
    ? board.outside.slice(0, 8)
    : board.outside
        .filter((d) => d.status === 'bubble-out' || d.status === 'outside')
        .slice(0, 8);
  const longshots = fieldLocked
    ? []
    : board.outside.filter((d) => d.status === 'longshot').slice(0, 6);

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
              Cup Chase desk · 2026 format
            </span>
            <span className="font-oswald text-[10px] sm:text-xs tracking-widest uppercase text-muted-foreground border border-border px-2.5 py-1 rounded-full">
              {board.source === 'live' ? 'Live points feed' : 'Cached standings'}
            </span>
          </div>

          <h1 className="font-archivo text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-foreground leading-[0.95] max-w-3xl mb-3">
            The Chase
            <span className="block text-transparent bg-clip-text gradient-accent">
              Top 16 by points
            </span>
          </h1>
          <p className="font-oswald text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-6">
            The 16 is locked after Daytona. 2026 stayed points-only — no win-and-you&apos;re-in.
            Ryan Preece took the last seed. Shane van Gisbergen missed despite two wins.
            Ten Chase races decide the Cup, no elimination rounds.
          </p>

          <p className="font-oswald text-xs tracking-wide text-muted-foreground mb-6">
            {board.asOfLabel}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Field size', value: String(board.fieldSize) },
              { label: 'Cut gap (P16−P17)', value: String(board.cutGap) },
              {
                label: 'Winners in 16',
                value: String(board.winnersInTop16),
              },
              { label: fieldLocked ? 'Reg. season left' : 'Races left', value: String(board.regularSeasonRacesLeft) },
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
                {board.firstOutDriver && (
                  <span className="text-muted-foreground">
                    {' '}
                    · first out: {board.firstOutDriver}
                    {board.firstOutPts != null ? ` (${board.firstOutPts})` : ''}
                  </span>
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
              How the 2026 Chase works
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
              {fieldLocked ? 'The Chase is on' : 'Road to the field'}
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
                  Then The Chase
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
                Snapshot math for the final stretch — pure points race into a 10-race Chase.
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
                Top 16 in regular-season points. Chase seed shown if the field froze today.
              </p>
            </div>
            <a
              href="#bubble"
              className="font-oswald text-xs tracking-widest uppercase text-nascar-blue hover:text-foreground transition-colors"
            >
              Jump to bubble →
            </a>
          </div>
          <ol className="space-y-2 sm:space-y-3">
            {board.inside.map((d) => (
              <DriverRow key={d.driver} driver={d} showSeed />
            ))}
          </ol>
        </section>

        {/* Bubble / outside */}
        <section aria-labelledby="bubble-heading" id="bubble">
          <div className="mb-4">
            <h2
              id="bubble-heading"
              className="font-archivo text-xl sm:text-2xl uppercase tracking-tight text-foreground"
            >
              {fieldLocked ? 'First ones out' : 'Outside looking in'}
            </h2>
            <p className="font-oswald text-sm text-muted-foreground mt-1">
              {fieldLocked
                ? 'Shane van Gisbergen is first out at 17th. Two wins did not auto-lock a Chase seat in 2026.'
                : 'Closest hunters first. Wins help pad the points — they do not auto-qualify.'}
            </p>
          </div>
          <ol className="space-y-2 sm:space-y-3 mb-6">
            {bubbleWatch.map((d) => (
              <DriverRow key={d.driver} driver={d} />
            ))}
          </ol>
          {longshots.length > 0 && (
            <>
              <h3 className="font-archivo text-base uppercase tracking-tight text-muted-foreground mb-3">
                Long shots
              </h3>
              <ol className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                {longshots.map((d) => (
                  <DriverRow key={d.driver} driver={d} />
                ))}
              </ol>
            </>
          )}
        </section>

        {/* Footer nav */}
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-archivo text-lg uppercase text-foreground mb-1">
              Keep digging
            </p>
            <p className="font-oswald text-sm text-muted-foreground">
              Standings bars, race debrief, and the rest of the desk.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/#standings"
              className="inline-flex items-center font-oswald text-xs tracking-widest uppercase px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Full standings
            </Link>
            <Link
              href="/#last-race"
              className="inline-flex items-center font-oswald text-xs tracking-widest uppercase px-4 py-2.5 rounded-lg border border-border bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
            >
              Last race
            </Link>
            <Link
              href="/"
              className="inline-flex items-center font-oswald text-xs tracking-widest uppercase px-4 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
