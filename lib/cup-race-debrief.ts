/**
 * Latest Cup Series race debrief — refresh after every Cup weekend.
 * Source notes from official box scores + race reports; pit stop averages
 * marked editorial when NASCAR Loops data is not published yet.
 */

export type FinishRow = {
  pos: number;
  car: string;
  driver: string;
  team: string;
  start: number;
  status: string;
  gap: string;
  lapsLed?: number;
};

export type PitCrewRow = {
  driver: string;
  car: string;
  /** Average 4-tire stop in seconds (see pitNote for provenance) */
  avgStop: number;
  bestStop: number;
  stops: number;
  note?: string;
  isWinner?: boolean;
};

export type RaceIncident = {
  bin: "wreck" | "penalty" | "pit" | "mechanical" | "note";
  lap?: number;
  driver: string;
  car?: string;
  title: string;
  detail: string;
};

export type StageResult = {
  stage: 1 | 2 | 3;
  winner: string;
  runnerUp?: string;
  note?: string;
};

/** Single stop on the winner’s race card */
export type WinnerPitStop = {
  /** Approximate race lap of the stop */
  lap: number;
  /** When the stop happened */
  window: "green" | "caution" | "stage-break";
  /** What the crew did */
  service: string;
  /** Optional timed duration (sec) when known/editorial */
  durationSec?: number;
  /** Rough track position into the box */
  posIn?: string;
  /** Rough track position out of the box */
  posOut?: string;
  note: string;
  /** Highlight the race-deciding stop */
  decisive?: boolean;
};

export type WinnerPitStrategy = {
  /** One-line strategy label for the UI chip */
  label: string;
  /** How the win was won from a strategy view */
  summary: string;
  /** Total competitive box visits called out below */
  totalStops: number;
  avgStopSec: number;
  bestStopSec: number;
  stops: WinnerPitStop[];
  /** Short “why it worked” bullets under the win chart */
  keysToWin: string[];
  /** Provenance note */
  note: string;
};

export type CupRaceDebrief = {
  raceName: string;
  eventLabel: string;
  track: string;
  dateLabel: string;
  dateIso: string;
  tv: string;
  distance: string;
  winner: {
    driver: string;
    car: string;
    team: string;
    manufacturer: string;
    start: number;
    lapsLed: number;
    margin: string;
    careerWin: number;
    seasonWin: number;
    headline: string;
    blurb: string;
  };
  /** Winner-only pit chart + strategy call — shown under the winner hero */
  winnerPitStrategy: WinnerPitStrategy;
  stages: StageResult[];
  stats: {
    leadChanges: number;
    leaders: number;
    cautions: number;
    cautionLaps: number;
    avgSpeed: string;
    pole: string;
    poleTime: string;
    mostLapsLed: string;
    mostLapsLedCount: number;
    fastestLap: string;
  };
  finishers: FinishRow[];
  pitScoreboard: PitCrewRow[];
  /** Honest label for pit data quality */
  pitNote: string;
  incidents: RaceIncident[];
  takeaways: string[];
  nextRace: {
    name: string;
    track: string;
    when: string;
  };
};

/** ── Current debrief: Coke Zero Sugar 400 · Daytona · Aug 29, 2026 ── */
export const LATEST_CUP_RACE: CupRaceDebrief = {
  raceName: "Coke Zero Sugar 400",
  eventLabel: "Cup Series Race 26 of 36 · Regular-season finale",
  track: "Daytona International Speedway",
  dateLabel: "Sat · Aug 29, 2026",
  dateIso: "2026-08-29",
  tv: "NBC",
  distance: "166 laps · 415 miles (OT from 160)",
  winner: {
    driver: "Ryan Preece",
    car: "60",
    team: "RFK Racing",
    manufacturer: "Ford",
    start: 0,
    lapsLed: 5,
    margin: "0.024 sec",
    careerWin: 1,
    seasonWin: 1,
    headline: "Preece wins Daytona in overtime — first Cup win locks the Chase",
    blurb:
      "Ryan Preece stole the Coke Zero Sugar 400 in overtime for his first career Cup win. The #60 RFK Ford beat Daniel Suárez by 0.024 seconds after 166 laps (415 miles) on the 2.5-mile plate. The 55-point haul plus stages bumped him onto the last Chase seed. Shane van Gisbergen finished 27th at 19 points on the night and missed the 16.",
  },
  winnerPitStrategy: {
    label: "Overtime steal",
    summary:
      "Plate racing, not a short-track stop chart. Preece led 5 laps, timed the last push, and beat Suárez to the line by 0.024 seconds in overtime. Official four-tire stall clocks were not posted on this desk.",
    totalStops: 0,
    avgStopSec: 0,
    bestStopSec: 0,
    stops: [],
    keysToWin: [
      "First career Cup win for Preece in the RFK Racing No. 60 Ford.",
      "Overtime extra laps: 166 completed, 415 miles, from a scheduled 160 / 400.",
      "The win paid a ~55-point haul plus stages (67 points on the night) and locked the last Chase seed.",
      "Beat Daniel Suárez by 0.024 seconds. Reddick, McDowell, and Stenhouse rounded out the top five.",
    ],
    note: "Superspeedway draft race. Stall clocks and a lap-by-lap pit chart are not on this editorial board. Result and Chase math from the official NASCAR points feed plus the live finishing order.",
  },
  stages: [],
  stats: {
    leadChanges: 0,
    leaders: 0,
    cautions: 0,
    cautionLaps: 0,
    avgSpeed: "154.69 mph",
    pole: "Ross Chastain",
    poleTime: "48.808 sec",
    mostLapsLed: "Austin Hill (ineligible)",
    mostLapsLedCount: 27,
    fastestLap: "Noah Gragson 45.353",
  },
  finishers: [
    { pos: 1, car: "60", driver: "Ryan Preece", team: "RFK Racing", start: 0, status: "running", gap: "—", lapsLed: 5 },
    { pos: 2, car: "7", driver: "Daniel Suárez", team: "Spire Motorsports", start: 0, status: "running", gap: "0.024" },
    { pos: 3, car: "45", driver: "Tyler Reddick", team: "23XI Racing", start: 0, status: "running", gap: "0.641" },
    { pos: 4, car: "71", driver: "Michael McDowell", team: "Spire Motorsports", start: 0, status: "running", gap: "0.642" },
    { pos: 5, car: "47", driver: "Ricky Stenhouse Jr.", team: "HYAK Motorsports", start: 0, status: "running", gap: "1.362" },
    { pos: 6, car: "2", driver: "Austin Cindric", team: "Team Penske", start: 0, status: "running", gap: "—" },
    { pos: 7, car: "3", driver: "Austin Dillon", team: "Richard Childress Racing", start: 0, status: "running", gap: "—" },
    { pos: 8, car: "48", driver: "Alex Bowman", team: "Hendrick Motorsports", start: 0, status: "running", gap: "—" },
    { pos: 9, car: "21", driver: "Josh Berry", team: "Wood Brothers Racing", start: 0, status: "running", gap: "—" },
    { pos: 10, car: "41", driver: "Cole Custer", team: "Haas Factory Team", start: 0, status: "running", gap: "—" },
  ],
  pitScoreboard: [],
  pitNote: "Restrictor-plate night. No competitive 4-tire stall board posted here. Lead-change and caution totals still pending official loop data.",
  incidents: [
    {
      bin: "note",
      lap: 160,
      driver: "Ryan Preece",
      car: "60",
      title: "Overtime finish",
      detail: "Scheduled 160 laps went extra. Checkers fell after 166 laps / 415 miles. Preece beat Suárez by 0.024 seconds.",
    },
    {
      bin: "note",
      lap: 166,
      driver: "Shane van Gisbergen",
      car: "97",
      title: "SVG misses the Chase",
      detail: "Van Gisbergen finished 27th, scored 19 points, and ended the regular season 17th. Two wins did not auto-lock a seat under the 2026 points-only Chase. Preece took the last seed.",
    },
  ],
  takeaways: [
    "Ryan Preece’s first Cup win in the No. 60 locked him in as the 16th Chase seed after the reset (2,000 pts).",
    "Shane van Gisbergen (#97) missed The Chase. He sits 17th at 605 regular-season points with 2 wins. First man out.",
    "Chase field is frozen: Hamlin seeded 1st at 2,100, then Blaney, Reddick, Gibbs, Briscoe through Preece at 2,000.",
    "Ross Chastain sat on the pole (48.808). Austin Hill led a race-high 27 laps in the ineligible RCR No. 33.",
    "The 10-race Chase is next. No elimination rounds. Highest total after race 36 wins the Cup.",
  ],
  nextRace: {
    name: "Cook Out Southern 500",
    track: "Darlington Raceway",
    when: "Sun · Sep 6, 2026",
  },
};

function lastToken(value?: string | null): string {
  if (typeof value !== "string" || !value.trim()) return "—";
  return value.trim().split(/\s+/).pop() ?? "—";
}

/** Last name / last word for stat chips. Never throws on missing text. */
export function lastName(value?: string | null): string {
  return lastToken(value);
}

type LooseCupDebrief = Partial<CupRaceDebrief> & {
  date?: string;
  top10?: FinishRow[];
  pole?: string | { driver?: string; time?: string };
};

/** Fill missing debrief fields so the homepage recap can never crash on .split. */
export function normalizeCupDebrief(raw?: LooseCupDebrief | null): CupRaceDebrief {
  const seed = LATEST_CUP_RACE;
  if (!raw || typeof raw !== "object") return seed;

  const poleField = raw.pole;
  const poleDriver =
    raw.stats?.pole ||
    (typeof poleField === "string" ? poleField : poleField?.driver) ||
    "—";
  const poleTime =
    raw.stats?.poleTime ||
    (typeof poleField === "object" ? poleField?.time : undefined) ||
    "—";
  const finishers =
    raw.finishers?.length ? raw.finishers : raw.top10?.length ? raw.top10 : [];

  return {
    raceName: raw.raceName || seed.raceName,
    eventLabel: raw.eventLabel || seed.eventLabel,
    track: raw.track || seed.track,
    dateLabel: raw.dateLabel || seed.dateLabel,
    dateIso: raw.dateIso || raw.date || seed.dateIso,
    tv: raw.tv || "—",
    distance: raw.distance || "—",
    winner: {
      ...seed.winner,
      ...(raw.winner ?? {}),
    },
    winnerPitStrategy: raw.winnerPitStrategy
      ? {
          ...seed.winnerPitStrategy,
          ...raw.winnerPitStrategy,
          stops: raw.winnerPitStrategy.stops ?? [],
          keysToWin: raw.winnerPitStrategy.keysToWin ?? [],
        }
      : seed.winnerPitStrategy,
    stages: raw.stages ?? [],
    stats: {
      leadChanges: raw.stats?.leadChanges ?? 0,
      leaders: raw.stats?.leaders ?? 0,
      cautions: raw.stats?.cautions ?? 0,
      cautionLaps: raw.stats?.cautionLaps ?? 0,
      avgSpeed: raw.stats?.avgSpeed || "—",
      pole: poleDriver,
      poleTime,
      mostLapsLed: raw.stats?.mostLapsLed || "—",
      mostLapsLedCount: raw.stats?.mostLapsLedCount ?? 0,
      fastestLap: raw.stats?.fastestLap || "—",
    },
    finishers,
    pitScoreboard: raw.pitScoreboard ?? [],
    pitNote: raw.pitNote || "",
    incidents: raw.incidents ?? [],
    takeaways: raw.takeaways ?? [],
    nextRace: {
      name: raw.nextRace?.name || "Next race",
      track: raw.nextRace?.track || "",
      when: raw.nextRace?.when || "",
    },
  };
}

export function pickLatestCupDebrief(live?: LooseCupDebrief | null): {
  race: CupRaceDebrief;
  fromConvex: boolean;
} {
  const liveIso = live?.dateIso || live?.date;
  if (liveIso && liveIso >= LATEST_CUP_RACE.dateIso) {
    return { race: normalizeCupDebrief(live), fromConvex: true };
  }
  return { race: LATEST_CUP_RACE, fromConvex: false };
}

/** Dedupe by car, always keep the race winner, then top-N by avg stall (lower = better). */
export function getPitLeaderboard(debrief: CupRaceDebrief, limit = 8): PitCrewRow[] {
  const seen = new Set<string>();
  const rows: PitCrewRow[] = [];
  const winnerCar = (debrief.winner?.car ?? "").replace("*", "");

  for (const row of debrief.pitScoreboard ?? []) {
    const key = (row.car ?? "").replace("*", "");
    if (!key || seen.has(key)) continue;
    seen.add(key);
    rows.push({
      ...row,
      car: key,
      isWinner: row.isWinner || key === winnerCar,
    });
  }

  // Live feed sometimes ranks machines outside top finishers as "fastest stall"
  // averages — inject the winner from the winner pit chart if they got dropped.
  const hasWinner = rows.some((r) => r.isWinner || r.car === winnerCar);
  if (!hasWinner && (debrief.winnerPitStrategy?.totalStops ?? 0) > 0) {
    rows.push({
      driver: debrief.winner.driver,
      car: winnerCar,
      avgStop: debrief.winnerPitStrategy.avgStopSec,
      bestStop: debrief.winnerPitStrategy.bestStopSec,
      stops: debrief.winnerPitStrategy.totalStops,
      isWinner: true,
      note: "Race winner",
    });
  } else {
    for (const row of rows) {
      if (row.car === winnerCar) row.isWinner = true;
    }
  }

  rows.sort((a, b) => a.avgStop - b.avgStop);

  if (rows.length <= limit) return rows;

  const top = rows.slice(0, limit);
  if (top.some((r) => r.isWinner)) return top;

  const winnerRow = rows.find((r) => r.isWinner);
  if (!winnerRow) return top;

  // Swap slowest non-winner in the window for the race winner so #22 always shows.
  const withoutLast = top.slice(0, limit - 1);
  return [...withoutLast, winnerRow].sort((a, b) => a.avgStop - b.avgStop);
}

export function getIncidentTone(bin: RaceIncident["bin"]): {
  label: string;
  className: string;
} {
  switch (bin) {
    case "wreck":
      return { label: "WRECK", className: "bg-nascar-red text-white" };
    case "penalty":
      return { label: "PENALTY", className: "bg-strategy-yellow text-nascar-dark" };
    case "pit":
      return { label: "PIT", className: "bg-strategy-cyan text-nascar-dark" };
    case "mechanical":
      return { label: "MECH", className: "bg-secondary text-foreground border border-border" };
    default:
      return { label: "NOTE", className: "bg-muted text-foreground" };
  }
}
