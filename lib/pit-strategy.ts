export type TrackType = 'short' | 'flat' | 'intermediate' | 'superspeedway' | 'road';

export type TrackPreset = {
  id: string;
  name: string;
  trackType: TrackType;
  /** Typical green-flag race lap time in seconds (editorially tuned, not live telemetry) */
  lapTime: number;
  /** Tire degradation rate — lap-time increase per lap on current tires (sec/lap) */
  degRate: number;
  /** Time lost entering/exiting pits under green vs staying out (seconds) */
  pitLoss: number;
  /** Typical Cup race distance (laps) loaded with this preset */
  defaultLaps?: number;
  /** Green-flag fuel window (laps) when the track is fuel-limited */
  defaultLapsPerTank?: number;
};

export const TRACK_TYPES: { id: TrackType; label: string }[] = [
  { id: 'short', label: 'Short Track' },
  { id: 'flat', label: 'Flat Mile' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'superspeedway', label: 'Superspeedway' },
  { id: 'road', label: 'Road Course' },
];

/**
 * Per-track starters for the Pit Strategy Calculator.
 * Values are fan-facing editorial estimates from typical Cup green-flag ranges
 * (lap times, tire falloff, pit-road time loss, distance, fuel window) — not
 * team sims or live loop data. Every field stays editable in the UI.
 */
export const TRACK_PRESETS: TrackPreset[] = [
  // ── Short tracks — tire deg first ──────────────────────────────────────
  {
    id: 'richmond',
    name: 'Richmond Raceway',
    trackType: 'short',
    lapTime: 22.4,
    degRate: 0.088,
    pitLoss: 34,
    defaultLaps: 400,
    defaultLapsPerTank: 125,
  },
  {
    id: 'martinsville',
    name: 'Martinsville Speedway',
    trackType: 'short',
    lapTime: 20.1,
    degRate: 0.078,
    pitLoss: 28,
    defaultLaps: 400,
    defaultLapsPerTank: 140,
  },
  {
    id: 'bristol',
    name: 'Bristol Motor Speedway',
    trackType: 'short',
    lapTime: 15.2,
    degRate: 0.105,
    pitLoss: 27,
    defaultLaps: 500,
    defaultLapsPerTank: 155,
  },
  {
    id: 'north-wilkesboro',
    name: 'North Wilkesboro Speedway',
    trackType: 'short',
    lapTime: 18.6,
    degRate: 0.092,
    pitLoss: 30,
    defaultLaps: 400,
    defaultLapsPerTank: 130,
  },
  // ── Flat miles ─────────────────────────────────────────────────────────
  {
    id: 'phoenix',
    name: 'Phoenix Raceway',
    trackType: 'flat',
    lapTime: 27.2,
    degRate: 0.062,
    pitLoss: 37,
    defaultLaps: 312,
    defaultLapsPerTank: 95,
  },
  {
    // Magic Mile — next up after Richmond (Dollar Tree 301)
    id: 'new-hampshire',
    name: 'New Hampshire Motor Speedway',
    trackType: 'flat',
    lapTime: 29.8,
    degRate: 0.072,
    pitLoss: 38,
    defaultLaps: 301,
    defaultLapsPerTank: 88,
  },
  {
    id: 'dover',
    name: 'Dover Motor Speedway',
    trackType: 'flat',
    lapTime: 23.6,
    degRate: 0.07,
    pitLoss: 36,
    defaultLaps: 400,
    defaultLapsPerTank: 105,
  },
  // ── Intermediates / 1.5-mi + unique ovals ───────────────────────────────
  {
    id: 'charlotte',
    name: 'Charlotte Motor Speedway',
    trackType: 'intermediate',
    lapTime: 30.2,
    degRate: 0.048,
    pitLoss: 41,
    defaultLaps: 400,
    defaultLapsPerTank: 62,
  },
  {
    id: 'kansas',
    name: 'Kansas Speedway',
    trackType: 'intermediate',
    lapTime: 30.6,
    degRate: 0.046,
    pitLoss: 41,
    defaultLaps: 267,
    defaultLapsPerTank: 60,
  },
  {
    id: 'vegas',
    name: 'Las Vegas Motor Speedway',
    trackType: 'intermediate',
    lapTime: 30.4,
    degRate: 0.047,
    pitLoss: 41,
    defaultLaps: 267,
    defaultLapsPerTank: 60,
  },
  {
    id: 'texas',
    name: 'Texas Motor Speedway',
    trackType: 'intermediate',
    lapTime: 29.9,
    degRate: 0.044,
    pitLoss: 42,
    defaultLaps: 267,
    defaultLapsPerTank: 58,
  },
  {
    id: 'homestead',
    name: 'Homestead-Miami Speedway',
    trackType: 'intermediate',
    lapTime: 31.8,
    degRate: 0.05,
    pitLoss: 42,
    defaultLaps: 267,
    defaultLapsPerTank: 58,
  },
  {
    id: 'nashville',
    name: 'Nashville Superspeedway',
    trackType: 'intermediate',
    lapTime: 30.8,
    degRate: 0.045,
    pitLoss: 40,
    defaultLaps: 300,
    defaultLapsPerTank: 62,
  },
  {
    id: 'darlington',
    name: 'Darlington Raceway',
    trackType: 'intermediate',
    lapTime: 29.4,
    degRate: 0.068,
    pitLoss: 40,
    defaultLaps: 367,
    defaultLapsPerTank: 68,
  },
  {
    id: 'atlanta',
    name: 'Atlanta Motor Speedway',
    trackType: 'intermediate',
    // Draft-happy 1.54-mi — lower tire deg, fuel matters more
    lapTime: 30.5,
    degRate: 0.022,
    pitLoss: 42,
    defaultLaps: 260,
    defaultLapsPerTank: 55,
  },
  {
    id: 'michigan',
    name: 'Michigan International Speedway',
    trackType: 'intermediate',
    lapTime: 38.2,
    degRate: 0.028,
    pitLoss: 44,
    defaultLaps: 200,
    defaultLapsPerTank: 48,
  },
  {
    id: 'pocono',
    name: 'Pocono Raceway',
    trackType: 'intermediate',
    lapTime: 53.5,
    degRate: 0.032,
    pitLoss: 46,
    defaultLaps: 160,
    defaultLapsPerTank: 36,
  },
  {
    id: 'indianapolis',
    name: 'Indianapolis Motor Speedway',
    trackType: 'intermediate',
    lapTime: 50.8,
    degRate: 0.026,
    pitLoss: 45,
    defaultLaps: 160,
    defaultLapsPerTank: 38,
  },
  {
    id: 'gateway',
    name: 'World Wide Technology Raceway',
    trackType: 'intermediate',
    lapTime: 32.4,
    degRate: 0.052,
    pitLoss: 39,
    defaultLaps: 240,
    defaultLapsPerTank: 70,
  },
  {
    id: 'iowa',
    name: 'Iowa Speedway',
    trackType: 'intermediate',
    lapTime: 24.8,
    degRate: 0.058,
    pitLoss: 36,
    defaultLaps: 350,
    defaultLapsPerTank: 95,
  },
  // ── Superspeedways — fuel-window first ─────────────────────────────────
  {
    id: 'daytona',
    name: 'Daytona International Speedway',
    trackType: 'superspeedway',
    lapTime: 46.5,
    degRate: 0.008,
    pitLoss: 44,
    defaultLaps: 160,
    defaultLapsPerTank: 42,
  },
  {
    id: 'talladega',
    name: 'Talladega Superspeedway',
    trackType: 'superspeedway',
    lapTime: 49.8,
    degRate: 0.007,
    pitLoss: 45,
    defaultLaps: 188,
    defaultLapsPerTank: 40,
  },
  // ── Road courses ───────────────────────────────────────────────────────
  {
    id: 'cota',
    name: 'Circuit of the Americas',
    trackType: 'road',
    lapTime: 96.0,
    degRate: 0.04,
    pitLoss: 28,
    defaultLaps: 68,
    defaultLapsPerTank: 22,
  },
  {
    id: 'watkins-glen',
    name: 'Watkins Glen International',
    trackType: 'road',
    lapTime: 72.5,
    degRate: 0.045,
    pitLoss: 26,
    defaultLaps: 90,
    defaultLapsPerTank: 28,
  },
  {
    id: 'sonoma',
    name: 'Sonoma Raceway',
    trackType: 'road',
    lapTime: 78.0,
    degRate: 0.05,
    pitLoss: 27,
    defaultLaps: 110,
    defaultLapsPerTank: 32,
  },
  {
    id: 'chicago-street',
    name: 'Chicago Street Course',
    trackType: 'road',
    lapTime: 88.0,
    degRate: 0.055,
    pitLoss: 30,
    defaultLaps: 75,
    defaultLapsPerTank: 24,
  },
];

/** Defaulted to next Cup race weekend (Dollar Tree 301 @ Loudon). */
export const DEFAULT_PRESET_ID = 'new-hampshire';
/** Cup race distance at NHMS — Dollar Tree 301. */
export const DEFAULT_LAPS_REMAINING = 301;
/** Fallback tank window (only used when a preset doesn’t specify one). */
export const DEFAULT_LAPS_PER_TANK = 60;

/** Classic race-eng stint optimum: √(2 × pit loss ÷ deg rate) */
export function optimalStintLength(pitLoss: number, degRate: number): number {
  if (!(pitLoss > 0) || !(degRate > 0)) return 0;
  return Math.sqrt((2 * pitLoss) / degRate);
}

export function clampPositive(value: number, fallback: number): number {
  if (!Number.isFinite(value) || value <= 0) return fallback;
  return value;
}

export function roundStint(raw: number): number {
  if (!(raw > 0) || !Number.isFinite(raw)) return 1;
  return Math.max(1, Math.round(raw));
}

/**
 * Pit stop count for a fixed stint (or tank) length over L green-flag laps.
 * Fresh tires/fuel at the start of the window; no stop on the white/checkered if you finish on age 0.
 */
export function numberOfStops(lapsRemaining: number, stintLength: number): number {
  const L = Math.max(0, Math.floor(lapsRemaining));
  const S = Math.max(1, Math.floor(stintLength));
  if (L <= S) return 0;
  return Math.ceil(L / S) - 1;
}

/**
 * Recommended pit laps counting down from the race distance window.
 * e.g. L=250, S=50 → pit with 200, 150, 100, 50 to go (not 0).
 */
export function pitLapsCountdown(lapsRemaining: number, stintLength: number): number[] {
  const L = Math.max(0, Math.floor(lapsRemaining));
  const S = Math.max(1, Math.floor(stintLength));
  if (L <= S) return [];

  const pits: number[] = [];
  for (let remaining = L - S; remaining > 0; remaining -= S) {
    pits.push(remaining);
  }
  return pits;
}

/** Laps into the race window where a stop occurs (after completing that lap). */
export function pitLapNumbers(lapsRemaining: number, stintLength: number): number[] {
  const L = Math.max(0, Math.floor(lapsRemaining));
  const countdown = pitLapsCountdown(L, stintLength);
  return countdown.map((toGo) => L - toGo).sort((a, b) => a - b);
}

export type LapProjection = {
  lap: number;
  /** Lap time under primary strategy (seconds) */
  primary: number;
  /** Lap time under compare strategy (seconds); mirrors primary when compare off */
  compare: number;
  /** Tire/fuel age (0-based) after start of this lap — primary */
  agePrimary: number;
  ageCompare: number;
};

/**
 * Project green-flag lap times. Age resets after each planned pit.
 * Superspeedway / fuel mode: use degRate ≈ 0 so the line stays flat.
 */
export function projectLapTimes(args: {
  lapsRemaining: number;
  baseLapTime: number;
  degRate: number;
  primaryStint: number;
  compareStint: number;
}): LapProjection[] {
  const L = Math.max(0, Math.floor(args.lapsRemaining));
  const base = clampPositive(args.baseLapTime, 1);
  const deg = Math.max(0, args.degRate);
  const s1 = Math.max(1, Math.floor(args.primaryStint));
  const s2 = Math.max(1, Math.floor(args.compareStint));
  const points: LapProjection[] = [];

  for (let lap = 1; lap <= L; lap++) {
    const agePrimary = (lap - 1) % s1;
    const ageCompare = (lap - 1) % s2;
    points.push({
      lap,
      primary: base + agePrimary * deg,
      compare: base + ageCompare * deg,
      agePrimary,
      ageCompare,
    });
  }

  return points;
}

export function totalRaceTime(args: {
  lapsRemaining: number;
  baseLapTime: number;
  degRate: number;
  stintLength: number;
  pitLoss: number;
}): number {
  const points = projectLapTimes({
    lapsRemaining: args.lapsRemaining,
    baseLapTime: args.baseLapTime,
    degRate: args.degRate,
    primaryStint: args.stintLength,
    compareStint: args.stintLength,
  });
  const rolling = points.reduce((sum, p) => sum + p.primary, 0);
  const stops = numberOfStops(args.lapsRemaining, args.stintLength);
  return rolling + stops * Math.max(0, args.pitLoss);
}

export function formatSeconds(total: number): string {
  if (!Number.isFinite(total)) return '—';
  const abs = Math.abs(total);
  const mins = Math.floor(abs / 60);
  const secs = abs - mins * 60;
  const sign = total < 0 ? '−' : '';
  if (mins <= 0) return `${sign}${secs.toFixed(1)}s`;
  return `${sign}${mins}m ${secs.toFixed(1)}s`;
}

export function formatDelta(seconds: number): string {
  if (!Number.isFinite(seconds) || Math.abs(seconds) < 0.05) return 'EVEN';
  const sign = seconds > 0 ? '+' : '−';
  return `${sign}${Math.abs(seconds).toFixed(1)}s`;
}

export function isFuelWindowMode(trackType: TrackType, degRate: number): boolean {
  // Superspeedways + road courses favor fuel windows; very-low deg also force fuel mode
  return trackType === 'superspeedway' || trackType === 'road' || degRate <= 0.015;
}

export type PitMarker = {
  lap: number;
  kind: 'green' | 'stage' | 'caution';
  note: string;
  rainTires?: boolean;
};

export type BuiltStint = {
  index: number;
  fromLap: number;
  toLap: number;
  laps: number;
  kind: 'green' | 'stage' | 'caution' | 'open';
  note: string;
  completed: boolean;
  rainTires: boolean;
};

/** Extra seconds piled on a stint of L laps from fade-only (½ · deg · L · (L−1)). */
export function stintDegSeconds(laps: number, degRate: number): number {
  const L = Math.max(0, laps);
  return Math.max(0, degRate) * (L * (L - 1)) / 2;
}

export function stintElapsedSeconds(
  laps: number,
  baseLap: number,
  degRate: number,
): number {
  return Math.max(0, laps) * Math.max(0, baseLap) + stintDegSeconds(laps, degRate);
}

export function buildStintsFromStops(
  stops: PitMarker[],
  currentLap: number,
): BuiltStint[] {
  const sorted = [...stops]
    .filter((s) => Number.isFinite(s.lap) && s.lap > 0)
    .sort((a, b) => a.lap - b.lap);

  const stints: BuiltStint[] = [];
  let from = 1;

  sorted.forEach((stop, i) => {
    if (stop.lap < from) return;
    stints.push({
      index: i + 1,
      fromLap: from,
      toLap: stop.lap,
      laps: stop.lap - from + 1,
      kind: stop.kind,
      note: stop.note,
      completed: true,
      rainTires: Boolean(stop.rainTires),
    });
    from = stop.lap + 1;
  });

  if (Number.isFinite(currentLap) && currentLap >= from) {
    stints.push({
      index: stints.length + 1,
      fromLap: from,
      toLap: Math.floor(currentLap),
      laps: Math.floor(currentLap) - from + 1,
      kind: 'open',
      note: 'On this set now.',
      completed: false,
      rainTires: false,
    });
  }

  return stints;
}

export type StintVsOptimal = {
  stint: BuiltStint;
  deltaLaps: number | null;
  extraDegSeconds: number | null;
  elapsedSeconds: number;
  comparable: boolean;
  skipReason?: string;
};

export function compareStintToOptimal(
  stint: BuiltStint,
  optimalLaps: number,
  baseLap: number,
  degRate: number,
): StintVsOptimal {
  const elapsedSeconds = stintElapsedSeconds(stint.laps, baseLap, degRate);
  if (stint.rainTires) {
    return {
      stint,
      deltaLaps: null,
      extraDegSeconds: null,
      elapsedSeconds,
      comparable: false,
      skipReason: 'Rain tires',
    };
  }
  if (!stint.completed) {
    return {
      stint,
      deltaLaps: null,
      extraDegSeconds: null,
      elapsedSeconds,
      comparable: false,
      skipReason: 'In progress',
    };
  }
  if (!(optimalLaps > 0)) {
    return {
      stint,
      deltaLaps: null,
      extraDegSeconds: null,
      elapsedSeconds,
      comparable: false,
      skipReason: 'No optimal',
    };
  }

  return {
    stint,
    deltaLaps: stint.laps - optimalLaps,
    extraDegSeconds:
      stintDegSeconds(stint.laps, degRate) - stintDegSeconds(optimalLaps, degRate),
    elapsedSeconds,
    comparable: true,
  };
}
