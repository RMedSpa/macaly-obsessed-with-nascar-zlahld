/**
 * Cup Series Chase / Playoffs desk.
 * Builds the provisional 16-driver field from the official points feed:
 * race winners lock in first, remaining spots fill by regular-season points.
 */

export const PLAYOFF_FIELD_SIZE = 16;
export const POINTS_FEED_URL = 'https://cf.nascar.com/cacher/2026/1/points-feed.json';

export type ChaseStatus =
  | 'locked-win'
  | 'inside-points'
  | 'cut-line'
  | 'bubble-out'
  | 'outside'
  | 'longshot';

export interface CupStandingRaw {
  position: number;
  car: string;
  driver: string;
  points: number;
  wins: number;
  stage1Wins: number;
  stage2Wins: number;
  stage3Wins: number;
  stagePoints: number;
  poles: number;
  top5: number;
  top10: number;
  deltaLeader: number;
  deltaNext: number;
  pointsEarned: number;
  starts: number;
  lapsLed: number;
  manufacturer: string;
  team?: string;
}

export interface ChaseDriver extends CupStandingRaw {
  /** Order inside the provisional 16 (1–16) or 0 if out */
  playoffSlot: number;
  status: ChaseStatus;
  /** Points above (+) or below (−) the last points-based slot / cut line */
  ptsToCut: number;
  /** Regular-season playoff points banked (est.): 5×wins + stage wins */
  bankedPlayoffPts: number;
  pathLabel: string;
  scenario: string;
}

export interface ChaseScenarioCard {
  id: string;
  tone: 'good' | 'warn' | 'danger' | 'info';
  title: string;
  body: string;
  drivers: string[];
}

export interface RemainingRace {
  name: string;
  track: string;
  dateLabel: string;
  tv: string;
  note: string;
}

export interface ChaseBoard {
  asOfLabel: string;
  source: 'live' | 'fallback';
  regularSeasonRacesLeft: number;
  remainingRaces: RemainingRace[];
  fieldSize: number;
  winnersIn: number;
  pointsSpotsOpen: number;
  cutLineDriver: string | null;
  cutLinePts: number | null;
  regularSeasonLeader: string;
  drivers: ChaseDriver[];
  inside: ChaseDriver[];
  outside: ChaseDriver[];
  scenarios: ChaseScenarioCard[];
  formatSteps: { title: string; body: string }[];
  roundRoadmap: { name: string; detail: string }[];
}

const TEAM_BY_CAR: Record<string, string> = {
  '1': 'Trackhouse Racing',
  '2': 'Team Penske',
  '3': 'Richard Childress Racing',
  '4': 'Front Row Motorsports',
  '5': 'Hendrick Motorsports',
  '6': 'RFK Racing',
  '7': 'Spire Motorsports',
  '8': 'Richard Childress Racing',
  '9': 'Hendrick Motorsports',
  '10': 'RFK Racing',
  '11': 'Joe Gibbs Racing',
  '12': 'Team Penske',
  '16': 'Kaulig Racing',
  '17': 'RFK Racing',
  '19': 'Joe Gibbs Racing',
  '20': 'Joe Gibbs Racing',
  '21': 'Wood Brothers Racing',
  '22': 'Team Penske',
  '23': '23XI Racing',
  '24': 'Hendrick Motorsports',
  '34': 'Front Row Motorsports',
  '38': 'Front Row Motorsports',
  '41': 'Haas Factory Team',
  '42': 'Legacy Motor Club',
  '43': 'Legacy Motor Club',
  '45': '23XI Racing',
  '47': 'HYAK Motorsports',
  '48': 'Hendrick Motorsports',
  '54': 'Joe Gibbs Racing',
  '60': 'RFK Racing',
  '71': 'Spire Motorsports',
  '77': 'Spire Motorsports',
  '88': 'Trackhouse Racing',
  '97': 'Trackhouse Racing',
  '99': 'Trackhouse Racing',
};

/** Seeded after Cook Out 400 (Richmond) — Aug 15, 2026 */
export const FALLBACK_STANDINGS: CupStandingRaw[] = [
  { position: 1, car: '11', driver: 'Denny Hamlin', points: 969, wins: 4, stage1Wins: 3, stage2Wins: 2, stage3Wins: 0, stagePoints: 196, poles: 5, top5: 14, top10: 16, deltaLeader: 0, deltaNext: 0, pointsEarned: 46, starts: 24, lapsLed: 880, manufacturer: 'Toyota' },
  { position: 2, car: '12', driver: 'Ryan Blaney', points: 854, wins: 2, stage1Wins: 5, stage2Wins: 1, stage3Wins: 0, stagePoints: 180, poles: 5, top5: 5, top10: 16, deltaLeader: -115, deltaNext: -115, pointsEarned: 41, starts: 24, lapsLed: 708, manufacturer: 'Ford' },
  { position: 3, car: '54', driver: 'Ty Gibbs', points: 842, wins: 2, stage1Wins: 3, stage2Wins: 2, stage3Wins: 0, stagePoints: 193, poles: 1, top5: 10, top10: 15, deltaLeader: -127, deltaNext: -12, pointsEarned: 22, starts: 24, lapsLed: 279, manufacturer: 'Toyota' },
  { position: 4, car: '45', driver: 'Tyler Reddick', points: 831, wins: 5, stage1Wins: 1, stage2Wins: 0, stage3Wins: 0, stagePoints: 154, poles: 6, top5: 10, top10: 14, deltaLeader: -138, deltaNext: -11, pointsEarned: 28, starts: 24, lapsLed: 444, manufacturer: 'Toyota' },
  { position: 5, car: '19', driver: 'Chase Briscoe', points: 715, wins: 1, stage1Wins: 0, stage2Wins: 0, stage3Wins: 0, stagePoints: 145, poles: 0, top5: 10, top10: 13, deltaLeader: -254, deltaNext: -116, pointsEarned: 52, starts: 24, lapsLed: 349, manufacturer: 'Toyota' },
  { position: 6, car: '9', driver: 'Chase Elliott', points: 695, wins: 2, stage1Wins: 0, stage2Wins: 2, stage3Wins: 0, stagePoints: 92, poles: 0, top5: 6, top10: 12, deltaLeader: -274, deltaNext: -20, pointsEarned: 38, starts: 24, lapsLed: 210, manufacturer: 'Chevrolet' },
  { position: 7, car: '20', driver: 'Christopher Bell', points: 695, wins: 0, stage1Wins: 1, stage2Wins: 2, stage3Wins: 1, stagePoints: 146, poles: 1, top5: 10, top10: 14, deltaLeader: -274, deltaNext: 0, pointsEarned: 36, starts: 24, lapsLed: 412, manufacturer: 'Toyota' },
  { position: 8, car: '5', driver: 'Kyle Larson', points: 660, wins: 0, stage1Wins: 2, stage2Wins: 2, stage3Wins: 0, stagePoints: 169, poles: 0, top5: 8, top10: 12, deltaLeader: -309, deltaNext: -35, pointsEarned: 31, starts: 24, lapsLed: 380, manufacturer: 'Chevrolet' },
  { position: 9, car: '22', driver: 'Joey Logano', points: 659, wins: 2, stage1Wins: 0, stage2Wins: 2, stage3Wins: 0, stagePoints: 130, poles: 1, top5: 5, top10: 10, deltaLeader: -310, deltaNext: -1, pointsEarned: 73, starts: 24, lapsLed: 290, manufacturer: 'Ford' },
  { position: 10, car: '17', driver: 'Chris Buescher', points: 653, wins: 0, stage1Wins: 0, stage2Wins: 0, stage3Wins: 0, stagePoints: 94, poles: 0, top5: 2, top10: 11, deltaLeader: -316, deltaNext: -6, pointsEarned: 16, starts: 24, lapsLed: 90, manufacturer: 'Ford' },
  { position: 11, car: '77', driver: 'Carson Hocevar', points: 645, wins: 1, stage1Wins: 0, stage2Wins: 0, stage3Wins: 0, stagePoints: 104, poles: 2, top5: 5, top10: 10, deltaLeader: -324, deltaNext: -8, pointsEarned: 1, starts: 24, lapsLed: 120, manufacturer: 'Chevrolet' },
  { position: 12, car: '24', driver: 'William Byron', points: 630, wins: 0, stage1Wins: 1, stage2Wins: 2, stage3Wins: 0, stagePoints: 109, poles: 0, top5: 4, top10: 10, deltaLeader: -339, deltaNext: -15, pointsEarned: 30, starts: 24, lapsLed: 200, manufacturer: 'Chevrolet' },
  { position: 13, car: '7', driver: 'Daniel Suárez', points: 618, wins: 1, stage1Wins: 0, stage2Wins: 1, stage3Wins: 0, stagePoints: 70, poles: 0, top5: 2, top10: 9, deltaLeader: -351, deltaNext: -12, pointsEarned: 21, starts: 24, lapsLed: 70, manufacturer: 'Chevrolet' },
  { position: 14, car: '23', driver: 'Bubba Wallace', points: 587, wins: 0, stage1Wins: 0, stage2Wins: 2, stage3Wins: 0, stagePoints: 104, poles: 0, top5: 3, top10: 8, deltaLeader: -382, deltaNext: -31, pointsEarned: 22, starts: 24, lapsLed: 95, manufacturer: 'Toyota' },
  { position: 15, car: '2', driver: 'Austin Cindric', points: 574, wins: 0, stage1Wins: 1, stage2Wins: 0, stage3Wins: 0, stagePoints: 112, poles: 0, top5: 2, top10: 7, deltaLeader: -395, deltaNext: -13, pointsEarned: 48, starts: 24, lapsLed: 85, manufacturer: 'Ford' },
  { position: 16, car: '97', driver: 'Shane Van Gisbergen', points: 567, wins: 2, stage1Wins: 0, stage2Wins: 1, stage3Wins: 0, stagePoints: 63, poles: 2, top5: 5, top10: 8, deltaLeader: -402, deltaNext: -7, pointsEarned: 23, starts: 24, lapsLed: 150, manufacturer: 'Chevrolet' },
  { position: 17, car: '60', driver: 'Ryan Preece', points: 517, wins: 0, stage1Wins: 1, stage2Wins: 1, stage3Wins: 0, stagePoints: 73, poles: 0, top5: 0, top10: 6, deltaLeader: -452, deltaNext: -50, pointsEarned: 20, starts: 24, lapsLed: 40, manufacturer: 'Ford' },
  { position: 18, car: '1', driver: 'Ross Chastain', points: 504, wins: 0, stage1Wins: 2, stage2Wins: 2, stage3Wins: 0, stagePoints: 69, poles: 0, top5: 1, top10: 5, deltaLeader: -465, deltaNext: -13, pointsEarned: 25, starts: 24, lapsLed: 60, manufacturer: 'Chevrolet' },
  { position: 19, car: '6', driver: 'Brad Keselowski', points: 489, wins: 0, stage1Wins: 1, stage2Wins: 1, stage3Wins: 0, stagePoints: 51, poles: 0, top5: 2, top10: 5, deltaLeader: -480, deltaNext: -15, pointsEarned: 11, starts: 24, lapsLed: 55, manufacturer: 'Ford' },
  { position: 20, car: '43', driver: 'Erik Jones', points: 486, wins: 0, stage1Wins: 1, stage2Wins: 0, stage3Wins: 0, stagePoints: 43, poles: 0, top5: 2, top10: 4, deltaLeader: -483, deltaNext: -3, pointsEarned: 10, starts: 24, lapsLed: 30, manufacturer: 'Toyota' },
  { position: 21, car: '71', driver: 'Michael McDowell', points: 463, wins: 0, stage1Wins: 0, stage2Wins: 0, stage3Wins: 0, stagePoints: 37, poles: 0, top5: 2, top10: 4, deltaLeader: -506, deltaNext: -23, pointsEarned: 9, starts: 24, lapsLed: 20, manufacturer: 'Chevrolet' },
  { position: 22, car: '16', driver: 'AJ Allmendinger', points: 442, wins: 0, stage1Wins: 1, stage2Wins: 0, stage3Wins: 0, stagePoints: 35, poles: 0, top5: 1, top10: 4, deltaLeader: -527, deltaNext: -21, pointsEarned: 4, starts: 24, lapsLed: 25, manufacturer: 'Chevrolet' },
  { position: 23, car: '34', driver: 'Todd Gilliland', points: 428, wins: 0, stage1Wins: 0, stage2Wins: 1, stage3Wins: 0, stagePoints: 30, poles: 0, top5: 0, top10: 3, deltaLeader: -541, deltaNext: -14, pointsEarned: 7, starts: 24, lapsLed: 15, manufacturer: 'Ford' },
  { position: 24, car: '38', driver: 'Zane Smith', points: 418, wins: 0, stage1Wins: 1, stage2Wins: 0, stage3Wins: 0, stagePoints: 28, poles: 0, top5: 2, top10: 3, deltaLeader: -551, deltaNext: -10, pointsEarned: 1, starts: 24, lapsLed: 10, manufacturer: 'Ford' },
];

const REMAINING_RACES: RemainingRace[] = [
  {
    name: 'Dollar Tree 301',
    track: 'New Hampshire Motor Speedway',
    dateLabel: 'Sun Aug 23 · 1:00 PM MDT',
    tv: 'USA Network',
    note: 'Flat mile — track position & long-run pace decide who pads the cut line.',
  },
  {
    name: 'Coke Zero Sugar 400',
    track: 'Daytona International Speedway',
    dateLabel: 'Sat Aug 29 · 5:30 PM MDT',
    tv: 'NBC',
    note: 'Regular-season finale. Plate chaos can mint new winners and scramble the final spots.',
  },
];

function withTeam(row: CupStandingRaw): CupStandingRaw {
  return {
    ...row,
    team: row.team ?? TEAM_BY_CAR[row.car] ?? undefined,
  };
}

function bankedPoints(row: CupStandingRaw): number {
  // Official banked playoff pts: +5 race win, +1 each Stage 1/2 win (Stage 3 = race)
  return row.wins * 5 + row.stage1Wins + row.stage2Wins;
}

/** Championship-eligible contenders only (part-timers with 0 pts / few starts excluded). */
export function eligibleDrivers(rows: CupStandingRaw[]): CupStandingRaw[] {
  const maxStarts = Math.max(0, ...rows.map((r) => r.starts));
  const minStarts = Math.max(8, Math.floor(maxStarts * 0.5));
  return rows
    .filter((r) => r.points > 0 && r.starts >= minStarts)
    .map(withTeam)
    .sort((a, b) => a.position - b.position);
}

/** Build provisional 16: winners first, then points among non-winners. */
export function buildProvisionalField(eligible: CupStandingRaw[]): {
  inside: CupStandingRaw[];
  winners: CupStandingRaw[];
  pointsDrivers: CupStandingRaw[];
} {
  const winners = eligible
    .filter((d) => d.wins > 0)
    .sort((a, b) => b.points - a.points || a.position - b.position);

  if (winners.length >= PLAYOFF_FIELD_SIZE) {
    return {
      inside: winners.slice(0, PLAYOFF_FIELD_SIZE),
      winners: winners.slice(0, PLAYOFF_FIELD_SIZE),
      pointsDrivers: [],
    };
  }

  const need = PLAYOFF_FIELD_SIZE - winners.length;
  const pointsDrivers = eligible
    .filter((d) => d.wins === 0)
    .sort((a, b) => b.points - a.points || a.position - b.position)
    .slice(0, need);

  // Display order: all winners by pts, then points locks by pts
  const inside = [...winners, ...pointsDrivers];
  return { inside, winners, pointsDrivers };
}

function statusFor(
  driver: CupStandingRaw,
  insideIds: Set<string>,
  pointsIds: Set<string>,
  cutLineDriver: CupStandingRaw | null,
  ptsToCut: number
): ChaseStatus {
  if (driver.wins > 0 && insideIds.has(driver.driver)) return 'locked-win';
  if (pointsIds.has(driver.driver) && cutLineDriver?.driver === driver.driver) return 'cut-line';
  if (pointsIds.has(driver.driver)) return 'inside-points';
  if (ptsToCut >= -80 && ptsToCut < 0) return 'bubble-out';
  if (ptsToCut >= -160) return 'outside';
  return 'longshot';
}

function scenarioFor(
  driver: CupStandingRaw,
  status: ChaseStatus,
  ptsToCut: number,
  racesLeft: number,
  cutName: string | null
): { pathLabel: string; scenario: string } {
  const cut = cutName ?? 'the cut line';

  if (status === 'locked-win') {
    return {
      pathLabel: 'Win locked',
      scenario: `${driver.wins} regular-season win${driver.wins === 1 ? '' : 's'} — already in the 16. Chase goal: bank stage points and stack playoff points before the reset.`,
    };
  }

  if (status === 'cut-line') {
    return {
      pathLabel: 'On the cut',
      scenario: `Occupies the last points slot at ${driver.points} pts. Any good finish from a hunter behind flips the position — protect it over the final ${racesLeft} race${racesLeft === 1 ? '' : 's'}, or bolt a win for peace of mind.`,
    };
  }

  if (status === 'inside-points') {
    const cushion = ptsToCut;
    return {
      pathLabel: cushion >= 40 ? 'Safe on points' : 'Points seat',
      scenario:
        cushion >= 40
          ? `Inside on points with a +${cushion} cushion on ${cut}. Stay clean at Loudon & Daytona; a win would convert this into a locked berth.`
          : `Inside on points by +${cushion} on ${cut}. One bad superspeedway night can erase it — finishing both races (or winning) is the job.`,
    };
  }

  if (status === 'bubble-out') {
    const need = Math.abs(ptsToCut);
    return {
      pathLabel: 'Hunting the cut',
      scenario: `${need} pts behind ${cut}. Over ${racesLeft} race${racesLeft === 1 ? '' : 's'}, that is roughly ${Math.ceil(need / Math.max(1, racesLeft))} pts/race average swing — or one trip to Victory Lane locks the berth instantly.`,
    };
  }

  if (status === 'outside') {
    return {
      pathLabel: 'Must rise',
      scenario: `${Math.abs(ptsToCut)} pts outside. A win is the clean path in; without one, needs a massive points day plus trouble ahead at the cut.`,
    };
  }

  return {
    pathLabel: 'Win-and-in',
    scenario: `Long shot on points (${Math.abs(ptsToCut)} back). Realistically this is win-and-in territory at New Hampshire or Daytona — plate racing is the wildcard.`,
  };
}

function buildScenarios(
  inside: ChaseDriver[],
  outside: ChaseDriver[],
  winnersIn: number,
  pointsSpots: number,
  cut: ChaseDriver | null,
  racesLeft: number
): ChaseScenarioCard[] {
  const cards: ChaseScenarioCard[] = [];

  const locked = inside.filter((d) => d.status === 'locked-win');
  cards.push({
    id: 'locked',
    tone: 'good',
    title: `${locked.length} drivers locked on wins`,
    body: `Race winners punch their ticket first. ${pointsSpots} of the 16 spots still fill strictly by points among winless drivers. Two races remain in the regular season.`,
    drivers: locked.slice(0, 8).map((d) => d.driver),
  });

  const pointsIn = inside.filter((d) => d.status === 'inside-points' || d.status === 'cut-line');
  if (pointsIn.length) {
    cards.push({
      id: 'points-in',
      tone: 'info',
      title: 'Inside without a win',
      body: `These ${pointsIn.length} drivers hold the remaining Chase seats on points alone. A win by someone outside knocks the cut-line driver out unless the field already has 16 winners.`,
      drivers: pointsIn.map((d) => d.driver),
    });
  }

  if (cut) {
    cards.push({
      id: 'cut',
      tone: 'warn',
      title: `Cut line · ${cut.driver}`,
      body: `${cut.driver} sits last in the provisional 16 at ${cut.points} pts. Anyone behind needs to erase that gap (or win) before the Daytona checkered flag freezes the field.`,
      drivers: [cut.driver],
    });
  }

  const bubble = outside.filter((d) => d.status === 'bubble-out').slice(0, 4);
  if (bubble.length) {
    cards.push({
      id: 'bubble',
      tone: 'danger',
      title: 'First ones knocking',
      body: `Closest hunters outside the 16. With ${racesLeft} races left, each is a strong finish or Loudon mega-day away — Daytona can rewrite all of this in one pack scramble.`,
      drivers: bubble.map((d) => `${d.driver} (${d.ptsToCut})`),
    });
  }

  const winAndIn = outside.filter((d) => d.status === 'longshot' || d.status === 'outside').slice(0, 5);
  if (winAndIn.length && winnersIn < PLAYOFF_FIELD_SIZE) {
    cards.push({
      id: 'win-in',
      tone: 'info',
      title: 'Win-and-in still open',
      body: 'Any championship-eligible winless driver who wins New Hampshire or Daytona jumps the queue for a locked berth and bootstraps the current cut-line points seat.',
      drivers: winAndIn.map((d) => d.driver),
    });
  }

  return cards;
}

export function buildChaseBoard(
  standings: CupStandingRaw[],
  opts?: { source?: 'live' | 'fallback'; asOfLabel?: string }
): ChaseBoard {
  const source = opts?.source ?? 'fallback';
  const asOfLabel =
    opts?.asOfLabel ??
    'After Richmond (Cook Out 400) · Aug 15, 2026';

  const eligible = eligibleDrivers(standings);
  const { inside: rawInside, winners, pointsDrivers } = buildProvisionalField(eligible);
  const insideIds = new Set(rawInside.map((d) => d.driver));
  const pointsIds = new Set(pointsDrivers.map((d) => d.driver));
  const cutLineDriver = pointsDrivers.length
    ? pointsDrivers[pointsDrivers.length - 1]
    : rawInside[rawInside.length - 1] ?? null;
  const cutPts = cutLineDriver?.points ?? null;

  const racesLeft = REMAINING_RACES.length;
  const slotByDriver = new Map(rawInside.map((d, i) => [d.driver, i + 1]));

  const drivers: ChaseDriver[] = eligible.map((d) => {
    const rawPtsToCut = cutPts == null ? 0 : d.points - cutPts;
    // Win-locked drivers are in regardless of points rank — don't show a
    // misleading negative vs the points cut (e.g. SVG below Cindric pts).
    const isWinInside = d.wins > 0 && insideIds.has(d.driver);
    const ptsToCut = isWinInside ? Math.max(0, rawPtsToCut) : rawPtsToCut;
    const status = statusFor(d, insideIds, pointsIds, cutLineDriver, rawPtsToCut);
    const { pathLabel, scenario } = scenarioFor(
      d,
      status,
      ptsToCut,
      racesLeft,
      cutLineDriver?.driver ?? null
    );
    return {
      ...d,
      playoffSlot: slotByDriver.get(d.driver) ?? 0,
      status,
      ptsToCut,
      bankedPlayoffPts: bankedPoints(d),
      pathLabel,
      scenario,
    };
  });

  // Inside ordered: winners by pts then points seats by pts
  const inside = [
    ...drivers.filter((d) => d.status === 'locked-win').sort((a, b) => b.points - a.points),
    ...drivers
      .filter((d) => d.status === 'inside-points' || d.status === 'cut-line')
      .sort((a, b) => b.points - a.points),
  ].map((d, i) => ({ ...d, playoffSlot: i + 1 }));

  const outside = drivers
    .filter((d) => !insideIds.has(d.driver))
    .sort((a, b) => b.points - a.points);

  const scenarios = buildScenarios(
    inside,
    outside,
    winners.length,
    PLAYOFF_FIELD_SIZE - winners.length,
    inside.find((d) => d.status === 'cut-line') ?? null,
    racesLeft
  );

  return {
    asOfLabel,
    source,
    regularSeasonRacesLeft: racesLeft,
    remainingRaces: REMAINING_RACES,
    fieldSize: PLAYOFF_FIELD_SIZE,
    winnersIn: winners.length,
    pointsSpotsOpen: Math.max(0, PLAYOFF_FIELD_SIZE - winners.length),
    cutLineDriver: cutLineDriver?.driver ?? null,
    cutLinePts: cutPts,
    regularSeasonLeader: eligible[0]?.driver ?? '—',
    drivers,
    inside,
    outside,
    scenarios,
    formatSteps: [
      {
        title: '1 · Regular season',
        body: 'Stack stage points, race points, and wins. The regular-season champ (most points after the finale) gets a separate trophy and bonus playoff points.',
      },
      {
        title: '2 · Lock the 16',
        body: 'Race winners are in first. If fewer than 16 winners, the rest of the field fills by points among those without a win. More than 16 winners? Highest points among winners take the berths.',
      },
      {
        title: '3 · Round of 16 → 12 → 8',
        body: 'Each round spans three races. Win a playoff race and you advance. Everyone else needs to finish the round inside the cut on reset playoff points.',
      },
      {
        title: '4 · Championship 4',
        body: 'Four drivers enter the season finale even on points. Highest finisher among those four wins the Cup — plain and brutal.',
      },
    ],
    roundRoadmap: [
      { name: 'Round of 16', detail: '16 drivers · 3 races · cut to 12' },
      { name: 'Round of 12', detail: '12 drivers · 3 races · cut to 8' },
      { name: 'Round of 8', detail: '8 drivers · 3 races · cut to Championship 4' },
      { name: 'Championship 4', detail: 'Finale · best finisher among the final four is champion' },
    ],
  };
}

type FeedRow = {
  position?: number;
  car_no?: string | number;
  driver_name?: string;
  points?: number;
  wins?: number;
  stage_1_wins?: number;
  stage_2_wins?: number;
  stage_3_wins?: number;
  stage_points?: number;
  poles?: number;
  top_5?: number;
  top_10?: number;
  delta_leader?: number;
  delta_next?: number;
  points_earned?: number;
  starts?: number;
  laps_led?: number;
  manufacturer?: string;
};

function mapFeedRow(row: FeedRow): CupStandingRaw | null {
  const driver = row.driver_name?.trim();
  const position = Number(row.position ?? 0);
  if (!driver || !position) return null;
  const car = String(row.car_no ?? '').trim();
  return withTeam({
    position,
    car,
    driver,
    points: Number(row.points ?? 0),
    wins: Number(row.wins ?? 0),
    stage1Wins: Number(row.stage_1_wins ?? 0),
    stage2Wins: Number(row.stage_2_wins ?? 0),
    stage3Wins: Number(row.stage_3_wins ?? 0),
    stagePoints: Number(row.stage_points ?? 0),
    poles: Number(row.poles ?? 0),
    top5: Number(row.top_5 ?? 0),
    top10: Number(row.top_10 ?? 0),
    deltaLeader: Number(row.delta_leader ?? 0),
    deltaNext: Number(row.delta_next ?? 0),
    pointsEarned: Number(row.points_earned ?? 0),
    starts: Number(row.starts ?? 0),
    lapsLed: Number(row.laps_led ?? 0),
    manufacturer: String(row.manufacturer ?? ''),
  });
}

export async function fetchCupChaseBoard(): Promise<ChaseBoard> {
  try {
    console.log('fetchCupChaseBoard: requesting points feed');
    const res = await fetch(POINTS_FEED_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      console.log('fetchCupChaseBoard: feed status', res.status);
      return buildChaseBoard(FALLBACK_STANDINGS, {
        source: 'fallback',
        asOfLabel: 'After Richmond (Cook Out 400) · Aug 15, 2026 · cached desk',
      });
    }
    const json = (await res.json()) as FeedRow[];
    const mapped = json
      .map(mapFeedRow)
      .filter((r): r is CupStandingRaw => Boolean(r))
      .sort((a, b) => a.position - b.position);

    if (mapped.filter((m) => m.points > 0).length < 10) {
      console.log('fetchCupChaseBoard: sparse feed, using fallback');
      return buildChaseBoard(FALLBACK_STANDINGS, { source: 'fallback' });
    }

    console.log('fetchCupChaseBoard: live rows', mapped.length);
    return buildChaseBoard(mapped, {
      source: 'live',
      asOfLabel: 'Live NASCAR points feed · refreshed hourly',
    });
  } catch (err) {
    console.log('fetchCupChaseBoard: error', err);
    return buildChaseBoard(FALLBACK_STANDINGS, {
      source: 'fallback',
      asOfLabel: 'After Richmond (Cook Out 400) · Aug 15, 2026 · offline desk',
    });
  }
}

export const CHASE_HIGHLIGHTS = [
  '16-driver field',
  'Win locked first',
  'Cut-line tracker',
  'Bubble scenarios',
];
