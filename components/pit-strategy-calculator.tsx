'use client';

import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  DEFAULT_LAPS_PER_TANK,
  DEFAULT_LAPS_REMAINING,
  DEFAULT_PRESET_ID,
  TRACK_PRESETS,
  TRACK_TYPES,
  type TrackType,
  clampPositive,
  formatDelta,
  formatSeconds,
  isFuelWindowMode,
  numberOfStops,
  optimalStintLength,
  pitLapNumbers,
  pitLapsCountdown,
  projectLapTimes,
  roundStint,
  totalRaceTime,
} from '@/lib/pit-strategy';
import { getLiveCupRace } from '@/lib/nhms-live';
import { BerryActualPits, BerryVsOptimal } from '@/components/berry-vs-optimal';
import LarsonLiveTracker from '@/components/larson-live-tracker';
import PitStrategyLiveBoard from '@/components/pit-strategy-live-board';

const CYAN = 'hsl(var(--strategy-cyan))';
const YELLOW = 'hsl(var(--strategy-yellow))';
const GRID = 'hsla(199, 80%, 55%, 0.12)';
const AXIS = 'hsla(0, 0%, 100%, 0.45)';

function parseNum(raw: string, fallback: number): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  // Kill binary float noise so inputs don't show 0.08500000089…
  return Math.round(n * 1e6) / 1e6;
}

function displayNum(value: number): string | number {
  if (!Number.isFinite(value)) return '';
  return Math.round(value * 1e6) / 1e6;
}

function StatBlock({
  label,
  value,
  unit,
  accent = 'cyan',
}: {
  label: string;
  value: string;
  unit?: string;
  accent?: 'cyan' | 'yellow' | 'red';
}) {
  const accentCls =
    accent === 'yellow'
      ? 'text-strategy-yellow'
      : accent === 'red'
        ? 'text-nascar-red'
        : 'text-strategy-cyan';

  return (
    <div className="relative overflow-hidden rounded-md border border-white/10 bg-black/40 px-3 py-3 sm:px-4">
      <div
        className={`absolute left-0 top-0 h-full w-[3px] ${
          accent === 'yellow'
            ? 'bg-strategy-yellow'
            : accent === 'red'
              ? 'bg-nascar-red'
              : 'bg-strategy-cyan'
        }`}
      />
      <p className="font-oswald text-[10px] uppercase tracking-[0.22em] text-white/45">{label}</p>
      <p className={`mt-1 font-archivo text-3xl sm:text-4xl leading-none tabular-nums ${accentCls}`}>
        {value}
      </p>
      {unit ? (
        <p className="mt-1 font-oswald text-[11px] uppercase tracking-[0.18em] text-white/40">{unit}</p>
      ) : null}
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  step = 'any',
  min,
  suffix,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: string;
  min?: number;
  suffix?: string;
  hint?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="font-oswald text-[10px] uppercase tracking-[0.2em] text-white/50">{label}</span>
      <div className="mt-1.5 flex items-center gap-2 rounded border border-white/15 bg-black/50 focus-within:border-strategy-cyan/70">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          value={displayNum(value)}
          onChange={(e) => onChange(parseNum(e.target.value, value))}
          className="w-full bg-transparent px-3 py-2.5 font-oswald text-lg tabular-nums text-white outline-none"
        />
        {suffix ? (
          <span className="pr-3 font-oswald text-xs uppercase tracking-widest text-white/35">{suffix}</span>
        ) : null}
      </div>
      {hint ? <p className="mt-1 font-oswald text-[10px] text-white/35">{hint}</p> : null}
    </label>
  );
}

export default function PitStrategyCalculator() {
  const defaultPreset = TRACK_PRESETS.find((t) => t.id === DEFAULT_PRESET_ID) ?? TRACK_PRESETS[0];
  const live = getLiveCupRace();
  const liveLaps =
    live && defaultPreset.id === 'new-hampshire' ? live.lapsRemaining : DEFAULT_LAPS_REMAINING;
  console.log('[pit-strategy] window', live ? `${live.leader.driver} ${live.lapsRemaining} to go` : 'idle');

  const [trackType, setTrackType] = useState<TrackType>(defaultPreset.trackType);
  const [presetId, setPresetId] = useState(defaultPreset.id);
  const [lapTime, setLapTime] = useState(Math.round(defaultPreset.lapTime * 1e6) / 1e6);
  const [degRate, setDegRate] = useState(Math.round(defaultPreset.degRate * 1e6) / 1e6);
  const [pitLoss, setPitLoss] = useState(Math.round(defaultPreset.pitLoss * 1e6) / 1e6);
  const [lapsRemaining, setLapsRemaining] = useState(liveLaps);
  const [lapsPerTank, setLapsPerTank] = useState(
    defaultPreset.defaultLapsPerTank && defaultPreset.defaultLapsPerTank > 0
      ? defaultPreset.defaultLapsPerTank
      : DEFAULT_LAPS_PER_TANK,
  );
  const [compareOn, setCompareOn] = useState(false);
  const [compareStintManual, setCompareStintManual] = useState<number | null>(null);

  const presetsForType = useMemo(
    () => TRACK_PRESETS.filter((t) => t.trackType === trackType),
    [trackType],
  );
  const activePreset = TRACK_PRESETS.find((t) => t.id === presetId) ?? defaultPreset;

  const fuelMode = isFuelWindowMode(trackType, degRate);

  const applyPreset = (id: string) => {
    const preset = TRACK_PRESETS.find((t) => t.id === id);
    if (!preset) return;
    console.log('[pit-strategy] applying preset', preset.name);
    setPresetId(preset.id);
    setTrackType(preset.trackType);
    setLapTime(Math.round(preset.lapTime * 1e6) / 1e6);
    setDegRate(Math.round(preset.degRate * 1e6) / 1e6);
    setPitLoss(Math.round(preset.pitLoss * 1e6) / 1e6);
    if (preset.id === 'new-hampshire' && live) {
      setLapsRemaining(live.lapsRemaining);
    } else if (preset.defaultLaps && preset.defaultLaps > 0) {
      setLapsRemaining(preset.defaultLaps);
    }
    // Always refresh tank window so a previous track’s value doesn’t leak
    setLapsPerTank(
      preset.defaultLapsPerTank && preset.defaultLapsPerTank > 0
        ? preset.defaultLapsPerTank
        : DEFAULT_LAPS_PER_TANK,
    );
    setCompareStintManual(null);
  };

  const onTrackTypeChange = (next: TrackType) => {
    setTrackType(next);
    const first = TRACK_PRESETS.find((t) => t.trackType === next);
    if (first) applyPreset(first.id);
  };

  const L = Math.max(1, Math.floor(clampPositive(lapsRemaining, DEFAULT_LAPS_REMAINING)));
  const baseLap = clampPositive(lapTime, 1);
  const deg = Math.max(0, degRate);
  const loss = Math.max(0, pitLoss);

  const rawOptimal = fuelMode
    ? clampPositive(lapsPerTank, DEFAULT_LAPS_PER_TANK)
    : optimalStintLength(loss, deg);
  const primaryStint = fuelMode
    ? Math.max(1, Math.round(clampPositive(lapsPerTank, DEFAULT_LAPS_PER_TANK)))
    : roundStint(rawOptimal);

  const compareStint = Math.max(
    1,
    Math.floor(
      compareStintManual && compareStintManual > 0
        ? compareStintManual
        : Math.max(1, primaryStint + Math.round(primaryStint * 0.15)),
    ),
  );

  const stopsPrimary = numberOfStops(L, primaryStint);
  const stopsCompare = numberOfStops(L, compareStint);
  const pitsCountdown = pitLapsCountdown(L, primaryStint);
  const pitLaps = pitLapNumbers(L, primaryStint);
  const comparePitLaps = pitLapNumbers(L, compareStint);

  const totalPrimary = totalRaceTime({
    lapsRemaining: L,
    baseLapTime: baseLap,
    degRate: fuelMode ? 0 : deg,
    stintLength: primaryStint,
    pitLoss: loss,
  });
  const totalCompare = totalRaceTime({
    lapsRemaining: L,
    baseLapTime: baseLap,
    degRate: fuelMode ? 0 : deg,
    stintLength: compareStint,
    pitLoss: loss,
  });
  // positive delta = compare is slower (costs time)
  const delta = totalCompare - totalPrimary;

  const chartData = useMemo(() => {
    // Downsample long races so the chart stays snappy
    const full = projectLapTimes({
      lapsRemaining: L,
      baseLapTime: baseLap,
      degRate: fuelMode ? 0 : deg,
      primaryStint,
      compareStint,
    });
    const stride = L > 180 ? 2 : 1;
    if (stride === 1) return full;
    const pitSet = new Set([...pitLaps, ...(compareOn ? comparePitLaps : [])]);
    return full.filter((p) => p.lap === 1 || p.lap === L || p.lap % stride === 0 || pitSet.has(p.lap));
  }, [L, baseLap, deg, fuelMode, primaryStint, compareStint, pitLaps, comparePitLaps, compareOn]);

  const yDomain = useMemo(() => {
    if (chartData.length === 0) return [0, 1] as [number, number];
    let min = Infinity;
    let max = -Infinity;
    for (const p of chartData) {
      min = Math.min(min, p.primary, compareOn ? p.compare : p.primary);
      max = Math.max(max, p.primary, compareOn ? p.compare : p.primary);
    }
    const pad = Math.max(0.15, (max - min) * 0.25);
    return [Math.max(0, min - pad), max + pad] as [number, number];
  }, [chartData, compareOn]);

  return (
    <div className="bg-background text-foreground">
      {/* Broadcast header band */}
      <section className="relative overflow-hidden border-b border-white/10 bg-strategy-panel">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-18deg, transparent, transparent 22px, hsla(199,100%,55%,0.04) 22px, hsla(199,100%,55%,0.04) 23px)',
          }}
        />
        <div className="pointer-events-none absolute -right-16 top-0 h-full w-1/2 bg-gradient-to-l from-strategy-cyan/10 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-sm bg-nascar-red px-2 py-1 font-oswald text-[10px] font-600 uppercase tracking-[0.25em] text-white">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-white" />
              Strategy Desk
            </span>
            <span className="font-oswald text-[10px] uppercase tracking-[0.3em] text-strategy-cyan">
              Green-flag model · educational
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl font-archivo text-4xl uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
            Pit Strategy
            <span className="block text-strategy-cyan">Calculator</span>
          </h1>
          <p className="mt-4 max-w-2xl font-oswald text-sm leading-relaxed text-white/60 sm:text-base">
            {live
              ? `Loudon is green. The model opens on ${live.leader.driver}’s Stage 3 run — ${live.lapsRemaining} laps to the checkers, Magic Mile tire deg, and the Stage 2 pit log already loaded. Scrub any input or swap tracks.`
              : 'Every preset is tuned per track — green-flag lap time, tire falloff, pit-road time loss, race distance, and fuel window. Scrub the inputs, compare stints, or drop into fuel-window mode on superspeedways and road courses. Educational model — not team telemetry.'}
          </p>
          {live ? (
            <p
              data-testid="live-race-chip"
              className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-sm border border-nascar-red/40 bg-nascar-red/15 px-3 py-1.5 font-oswald text-[11px] uppercase tracking-[0.18em] text-white"
            >
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-nascar-red" />
              Live · #{live.leader.car} {live.leader.driver} leads · {live.lapNote}
            </p>
          ) : (
            <p className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-sm border border-strategy-cyan/30 bg-strategy-cyan/10 px-3 py-1.5 font-oswald text-[11px] uppercase tracking-[0.18em] text-strategy-cyan">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-strategy-cyan" />
              Next race loaded · New Hampshire Motor Speedway · Dollar Tree 301 · 301 laps
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-10">
        {live ? (
          <>
            <LarsonLiveTracker live={live} />
            <PitStrategyLiveBoard
              live={live}
              tankLaps={lapsPerTank}
              onUseLiveLaps={
                lapsRemaining !== live.lapsRemaining
                  ? () => {
                      console.log('[pit-strategy] sync live laps', live.lapsRemaining);
                      setLapsRemaining(live.lapsRemaining);
                    }
                  : undefined
              }
            />
          </>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          {/* Controls */}
          <aside className="space-y-4 rounded-lg border border-white/10 bg-strategy-panel p-4 shadow-2xl sm:p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="font-archivo text-lg uppercase tracking-wide text-white">Inputs</h2>
              <span className="font-oswald text-[10px] uppercase tracking-[0.25em] text-white/35">
                Live model
              </span>
            </div>

            <label className="block">
              <span className="font-oswald text-[10px] uppercase tracking-[0.2em] text-white/50">
                Track type
              </span>
              <select
                data-testid="track-type"
                value={trackType}
                onChange={(e) => onTrackTypeChange(e.target.value as TrackType)}
                className="mt-1.5 w-full appearance-none rounded border border-white/15 bg-black/50 px-3 py-2.5 font-oswald text-base text-white outline-none focus:border-strategy-cyan/70"
              >
                {TRACK_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="font-oswald text-[10px] uppercase tracking-[0.2em] text-white/50">
                Track preset
              </span>
              <select
                value={presetId}
                onChange={(e) => applyPreset(e.target.value)}
                className="mt-1.5 w-full appearance-none rounded border border-white/15 bg-black/50 px-3 py-2.5 font-oswald text-base text-white outline-none focus:border-strategy-cyan/70"
              >
                {presetsForType.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 font-oswald text-[10px] text-white/35">
                Loads that track’s typical pace, deg, pit loss, distance, and tank window — all editable.
              </p>
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <NumberField
                id="lap-time"
                label="Base lap time"
                value={lapTime}
                onChange={setLapTime}
                step="0.1"
                min={1}
                suffix="sec"
              />
              <NumberField
                id="deg-rate"
                label="Tire deg rate"
                value={degRate}
                onChange={setDegRate}
                step="0.001"
                min={0}
                suffix="s/lap"
                hint="Lap-time increase each lap on the same tires"
              />
              <NumberField
                id="pit-loss"
                label="Pit loss"
                value={pitLoss}
                onChange={setPitLoss}
                step="0.5"
                min={0}
                suffix="sec"
                hint="Time lost vs staying out (entry + service + exit)"
              />
              <NumberField
                id="laps-remaining"
                label="Laps remaining"
                value={lapsRemaining}
                onChange={setLapsRemaining}
                step="1"
                min={1}
                suffix="laps"
                hint={
                  live && presetId === 'new-hampshire'
                    ? `Live Loudon snapshot: ${live.lapsRemaining} to go in Stage 3. Editable.`
                    : `Full distance for ${activePreset.name} is ${activePreset.defaultLaps ?? '—'} laps`
                }
              />
              {fuelMode ? (
                <NumberField
                  id="laps-per-tank"
                  label="Laps per tank"
                  value={lapsPerTank}
                  onChange={setLapsPerTank}
                  step="1"
                  min={1}
                  suffix="laps"
                  hint="Green-flag fuel window for this track’s preset"
                />
              ) : null}
            </div>

            {/* Compare toggle */}
            <div className="rounded border border-strategy-yellow/30 bg-strategy-yellow/5 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-oswald text-xs uppercase tracking-[0.18em] text-strategy-yellow">
                    Compare strategies
                  </p>
                  <p className="mt-0.5 font-oswald text-[11px] text-white/45">
                    Overlay a second stint length and see the finish delta
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  data-testid="compare-toggle"
                  aria-checked={compareOn}
                  onClick={() => {
                    console.log('[pit-strategy] compare toggle', !compareOn);
                    setCompareOn((v) => !v);
                  }}
                  className={`relative h-7 w-12 flex-shrink-0 rounded-full border transition-colors ${
                    compareOn
                      ? 'border-strategy-yellow bg-strategy-yellow/30'
                      : 'border-white/20 bg-black/40'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full transition-transform ${
                      compareOn
                        ? 'translate-x-6 bg-strategy-yellow'
                        : 'translate-x-0.5 bg-white/50'
                    }`}
                  />
                  <span className="sr-only">Toggle compare strategies</span>
                </button>
              </div>

              {compareOn ? (
                <div className="mt-3">
                  <NumberField
                    id="compare-stint"
                    label="Compare stint length"
                    value={compareStint}
                    onChange={(n) => setCompareStintManual(Math.max(1, Math.round(n)))}
                    step="1"
                    min={1}
                    suffix="laps"
                  />
                </div>
              ) : null}
            </div>
          </aside>

          {/* Output panel */}
          <div className="space-y-4">
            {fuelMode ? (
              <div
                role="status"
                data-testid="fuel-window-banner"
                className="relative flex gap-3 overflow-hidden rounded-md border border-white/15 bg-black/70 px-4 py-3 shadow-inner"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-strategy-yellow" aria-hidden />
                <span
                  className="mt-0.5 pl-1 font-archivo text-lg text-strategy-yellow"
                  aria-hidden
                >
                  ⛽
                </span>
                <div className="min-w-0">
                  <p className="font-oswald text-xs uppercase tracking-[0.2em] text-strategy-yellow">
                    Fuel-window mode
                  </p>
                  <p className="mt-1 font-oswald text-sm leading-relaxed text-white/90">
                    On superspeedways, tire deg is tiny and the limiting factor is the tank. Stops are
                    timed off <strong className="font-600 text-white">laps per tank</strong> instead of
                    the √(2 × pit loss ÷ deg) tire formula. Drafting, cautions, and stage breaks still
                    rewrite the plan on race day.
                  </p>
                </div>
              </div>
            ) : null}

            {/* Big stats */}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatBlock
                label={fuelMode ? 'Tank window' : 'Optimal stint'}
                value={String(primaryStint)}
                unit="laps"
                accent="cyan"
              />
              <StatBlock label="Pit stops" value={String(stopsPrimary)} unit="stops" accent="cyan" />
              <StatBlock
                label="Projected total"
                value={formatSeconds(totalPrimary)}
                accent="cyan"
              />
              {compareOn ? (
                <StatBlock
                  label="Δ at finish"
                  value={formatDelta(delta)}
                  unit={delta > 0.05 ? 'compare slower' : delta < -0.05 ? 'compare faster' : ''}
                  accent={delta < -0.05 ? 'yellow' : delta > 0.05 ? 'red' : 'yellow'}
                />
              ) : (
                <StatBlock
                  label="Raw optimum"
                  value={fuelMode ? String(primaryStint) : rawOptimal.toFixed(1)}
                  unit={fuelMode ? 'laps' : 'laps≈'}
                  accent="yellow"
                />
              )}
            </div>

            {presetId === 'new-hampshire' ? (
              <BerryVsOptimal
                optimalLaps={primaryStint}
                rawOptimal={rawOptimal}
                baseLap={baseLap}
                degRate={deg}
              />
            ) : null}

            {/* Pit schedule */}
            <div className="rounded-lg border border-white/10 bg-strategy-panel p-4 sm:p-5">
              <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                <h2 className="font-archivo text-lg uppercase tracking-wide text-white">
                  Recommended pit laps
                </h2>
                <p className="font-oswald text-[10px] uppercase tracking-[0.22em] text-white/40">
                  Counting down · {L} to go
                </p>
              </div>

              {pitsCountdown.length === 0 ? (
                <p className="font-oswald text-sm text-white/55">
                  No stop required — stint covers the full remaining distance.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {pitsCountdown.map((toGo, i) => (
                    <div
                      key={`pit-${toGo}-${i}`}
                      className="min-w-[4.5rem] rounded border border-strategy-cyan/30 bg-black/40 px-3 py-2 text-center"
                    >
                      <p className="font-oswald text-[9px] uppercase tracking-[0.2em] text-white/40">
                        Stop {i + 1}
                      </p>
                      <p className="font-archivo text-2xl tabular-nums text-strategy-cyan">{toGo}</p>
                      <p className="font-oswald text-[10px] uppercase tracking-widest text-white/35">
                        to go
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {presetId === 'new-hampshire' ? <BerryActualPits /> : null}

              {compareOn ? (
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="mb-2 font-oswald text-[10px] uppercase tracking-[0.22em] text-strategy-yellow">
                    Compare pits · {compareStint}-lap stints · {stopsCompare} stops
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pitLapsCountdown(L, compareStint).map((toGo, i) => (
                      <div
                        key={`cmp-${toGo}-${i}`}
                        className="min-w-[4.5rem] rounded border border-strategy-yellow/30 bg-black/40 px-3 py-2 text-center"
                      >
                        <p className="font-archivo text-xl tabular-nums text-strategy-yellow">{toGo}</p>
                        <p className="font-oswald text-[10px] uppercase tracking-widest text-white/35">
                          to go
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 font-oswald text-sm text-white/65">
                    Finish delta (compare − primary):{' '}
                    <span
                      className={
                        delta < -0.05
                          ? 'text-strategy-yellow'
                          : delta > 0.05
                            ? 'text-nascar-red'
                            : 'text-white'
                      }
                    >
                      {formatDelta(delta)}
                    </span>
                    {delta < -0.05
                      ? ' — compare finishes ahead on pure green-flag time.'
                      : delta > 0.05
                        ? ' — primary is faster over the window.'
                        : ' — essentially even.'}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Chart */}
            <div className="rounded-lg border border-white/10 bg-strategy-panel p-3 sm:p-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-1">
                <h2 className="font-archivo text-lg uppercase tracking-wide text-white">
                  Projected lap time
                </h2>
                <div className="flex flex-wrap items-center gap-3 font-oswald text-[10px] uppercase tracking-[0.18em]">
                  <span className="inline-flex items-center gap-1.5 text-strategy-cyan">
                    <span className="h-0.5 w-4 bg-strategy-cyan" /> Primary
                  </span>
                  {compareOn ? (
                    <span className="inline-flex items-center gap-1.5 text-strategy-yellow">
                      <span className="h-0.5 w-4 bg-strategy-yellow" /> Compare
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5 text-white/40">
                    <span className="h-3 w-px bg-white/40" /> Pit marker
                  </span>
                </div>
              </div>

              <div className="h-[300px] w-full sm:h-[360px]" data-testid="pit-strategy-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
                    <CartesianGrid stroke={GRID} strokeDasharray="3 6" />
                    <XAxis
                      dataKey="lap"
                      stroke={AXIS}
                      tick={{ fill: AXIS, fontSize: 11, fontFamily: 'var(--font-oswald)' }}
                      tickLine={false}
                      label={{
                        value: 'Lap',
                        position: 'insideBottomRight',
                        offset: -4,
                        fill: AXIS,
                        fontSize: 11,
                      }}
                    />
                    <YAxis
                      domain={yDomain}
                      stroke={AXIS}
                      tick={{ fill: AXIS, fontSize: 11, fontFamily: 'var(--font-oswald)' }}
                      tickLine={false}
                      width={48}
                      tickFormatter={(v: number) => v.toFixed(1)}
                      label={{
                        value: 'sec',
                        angle: -90,
                        position: 'insideLeft',
                        fill: AXIS,
                        fontSize: 11,
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'hsl(var(--strategy-panel))',
                        border: '1px solid hsla(0,0%,100%,0.12)',
                        borderRadius: 6,
                        fontFamily: 'var(--font-oswald)',
                        fontSize: 12,
                      }}
                      labelStyle={{ color: 'hsla(0,0%,100%,0.55)', textTransform: 'uppercase' }}
                      formatter={(value: number, name: string) => [
                        `${Number(value).toFixed(3)}s`,
                        name === 'primary' ? 'Primary' : 'Compare',
                      ]}
                      labelFormatter={(label) => `Lap ${label}`}
                    />
                    <Legend
                      wrapperStyle={{
                        fontFamily: 'var(--font-oswald)',
                        fontSize: 11,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                      }}
                    />

                    {pitLaps.map((lap) => (
                      <ReferenceLine
                        key={`p-ref-${lap}`}
                        x={lap}
                        stroke={CYAN}
                        strokeDasharray="4 4"
                        strokeOpacity={0.55}
                      />
                    ))}
                    {compareOn
                      ? comparePitLaps.map((lap) => (
                          <ReferenceLine
                            key={`c-ref-${lap}`}
                            x={lap}
                            stroke={YELLOW}
                            strokeDasharray="2 6"
                            strokeOpacity={0.45}
                          />
                        ))
                      : null}

                    <Line
                      type="monotone"
                      dataKey="primary"
                      name="Primary"
                      stroke={CYAN}
                      strokeWidth={2.5}
                      dot={false}
                      isAnimationActive={false}
                    />
                    {compareOn ? (
                      <Line
                        type="monotone"
                        dataKey="compare"
                        name="Compare"
                        stroke={YELLOW}
                        strokeWidth={2.5}
                        dot={false}
                        isAnimationActive={false}
                      />
                    ) : null}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Math explainer */}
            <div className="rounded-lg border border-white/10 bg-black/30 p-4 sm:p-5">
              <h2 className="font-archivo text-base uppercase tracking-wide text-white">
                How the math works
              </h2>
              <div className="mt-3 space-y-2 font-oswald text-sm leading-relaxed text-white/65">
                <p>
                  <span className="text-strategy-cyan">Tire mode:</span> each lap on the same set
                  costs a little more time (deg rate). Pitting costs a fixed chunk of wall time (pit
                  loss). The green-flag stint that balances those over a long run is
                </p>
                <p className="rounded border border-strategy-cyan/20 bg-strategy-cyan/5 px-3 py-2 font-archivo text-sm tracking-wide text-strategy-cyan sm:text-base">
                  optimal stint ≈ √(2 × pit loss ÷ deg rate)
                </p>
                <p>
                  We round that to a whole lap count, schedule stops every stint until the checkers,
                  and rebuild lap times as a sawtooth: fresh tires pull the line down, deg walks it
                  up, a vertical marker is a pit.
                </p>
                <p>
                  <span className="text-strategy-yellow">Fuel / superspeedway mode:</span> deg is
                  effectively noise, so stops follow the tank (laps per tank) instead of the tire
                  square-root. Compare mode keeps the same base lap and pit loss — only stint length
                  changes — then reports the total-time delta at the finish.
                </p>
                <p className="text-white/40">
                  Model assumes clean green-flag running, equal service every stop, and no tire fall-off
                  cliff past a wear threshold. Real races add weather, track evolution, stages, and
                  the guy who jumps you on a caution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
