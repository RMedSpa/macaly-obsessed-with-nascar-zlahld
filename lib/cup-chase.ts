/**
 * Cup Series Chase desk — 2026 format.
 *
 * Top 16 in regular-season points make The Chase (no win-and-you’re-in).
 * A race win still pays a big points haul (~55) that helps the board, but does
 * not auto-lock a seat. After the field freezes, points reset/seed (~2100→2000)
 * and a 10-race cumulative Chase decides the champion — no elimination rounds,
 * no Championship 4 one-race shootout.
 */

export const PLAYOFF_FIELD_SIZE = 16;
export const POINTS_FEED_URL = 'https://cf.nascar.com/cacher/2026/1/points-feed.json';

export type ChaseStatus =
  | 'safe-inside'
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
  /** Order inside the provisional 16 (1–16) or 0 if out — pure points rank among eligible */
  playoffSlot: number;
  status: ChaseStatus;
  /** Points above (+) or below (−) P16 / the cut line */
  ptsToCut: number;
  /** Projected Chase start points if field froze today (2100…2000). 0 if outside. */
  projectedChasePts: number;
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
  /** How many drivers inside the current top 16 already have a win (informational) */
  winnersInTop16: number;
  /** Gap P16 − P17 in points */
  cutGap: number;
  cutLineDriver: string | null;
  cutLinePts: number | null;
  firstOutDriver: string | null;
  firstOutPts: number | null;
  regularSeasonLeader: string;
  drivers: ChaseDriver[];
  inside: ChaseDriver[];
  outside: ChaseDriver[];
  scenarios: ChaseScenarioCard[];
  formatSteps: { title: string; body: string }[];
  /** Post-field roadmap (10-race cumulative Chase) */
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

/** Seeded after Coke Zero Sugar 400 (Daytona) — Aug 29, 2026. Chase field reset. */
export const FALLBACK_STANDINGS: CupStandingRaw[] = [
  { position: 1, car: '11', driver: 'Denny Hamlin', points: 2100, wins: 4, stage1Wins: 3, stage2Wins: 2, stage3Wins: 0, stagePoints: 198, poles: 5, top5: 14, top10: 17, deltaLeader: 0, deltaNext: 0, pointsEarned: 26, starts: 26, lapsLed: 880, manufacturer: 'Toyota' },
  { position: 2, car: '12', driver: 'Ryan Blaney', points: 2075, wins: 3, stage1Wins: 5, stage2Wins: 3, stage3Wins: 0, stagePoints: 205, poles: 5, top5: 6, top10: 17, deltaLeader: -25, deltaNext: -25, pointsEarned: 14, starts: 26, lapsLed: 828, manufacturer: 'Ford' },
  { position: 3, car: '45', driver: 'Tyler Reddick', points: 2065, wins: 5, stage1Wins: 1, stage2Wins: 0, stage3Wins: 0, stagePoints: 154, poles: 7, top5: 11, top10: 16, deltaLeader: -35, deltaNext: -10, pointsEarned: 34, starts: 26, lapsLed: 449, manufacturer: 'Toyota' },
  { position: 4, car: '54', driver: 'Ty Gibbs', points: 2060, wins: 2, stage1Wins: 3, stage2Wins: 2, stage3Wins: 0, stagePoints: 209, poles: 1, top5: 10, top10: 16, deltaLeader: -40, deltaNext: -5, pointsEarned: 12, starts: 26, lapsLed: 280, manufacturer: 'Toyota' },
  { position: 5, car: '19', driver: 'Chase Briscoe', points: 2055, wins: 1, stage1Wins: 0, stage2Wins: 0, stage3Wins: 0, stagePoints: 156, poles: 0, top5: 10, top10: 13, deltaLeader: -45, deltaNext: -5, pointsEarned: 34, starts: 26, lapsLed: 359, manufacturer: 'Toyota' },
  { position: 6, car: '20', driver: 'Christopher Bell', points: 2050, wins: 0, stage1Wins: 1, stage2Wins: 2, stage3Wins: 1, stagePoints: 156, poles: 1, top5: 11, top10: 13, deltaLeader: -50, deltaNext: -5, pointsEarned: 20, starts: 26, lapsLed: 559, manufacturer: 'Toyota' },
  { position: 7, car: '5', driver: 'Kyle Larson', points: 2045, wins: 0, stage1Wins: 3, stage2Wins: 2, stage3Wins: 0, stagePoints: 195, poles: 0, top5: 9, top10: 13, deltaLeader: -55, deltaNext: -5, pointsEarned: 16, starts: 26, lapsLed: 659, manufacturer: 'Chevrolet' },
  { position: 8, car: '9', driver: 'Chase Elliott', points: 2040, wins: 2, stage1Wins: 0, stage2Wins: 2, stage3Wins: 0, stagePoints: 94, poles: 0, top5: 6, top10: 9, deltaLeader: -60, deltaNext: -5, pointsEarned: 16, starts: 26, lapsLed: 317, manufacturer: 'Chevrolet' },
  { position: 9, car: '22', driver: 'Joey Logano', points: 2035, wins: 2, stage1Wins: 0, stage2Wins: 2, stage3Wins: 0, stagePoints: 138, poles: 1, top5: 5, top10: 9, deltaLeader: -65, deltaNext: -5, pointsEarned: 27, starts: 26, lapsLed: 536, manufacturer: 'Ford' },
  { position: 10, car: '17', driver: 'Chris Buescher', points: 2030, wins: 0, stage1Wins: 0, stage2Wins: 0, stage3Wins: 0, stagePoints: 98, poles: 0, top5: 2, top10: 10, deltaLeader: -70, deltaNext: -5, pointsEarned: 1, starts: 26, lapsLed: 81, manufacturer: 'Ford' },
  { position: 11, car: '7', driver: 'Daniel Suárez', points: 2025, wins: 1, stage1Wins: 0, stage2Wins: 1, stage3Wins: 0, stagePoints: 73, poles: 0, top5: 3, top10: 7, deltaLeader: -75, deltaNext: -5, pointsEarned: 38, starts: 26, lapsLed: 40, manufacturer: 'Chevrolet' },
  { position: 12, car: '77', driver: 'Carson Hocevar', points: 2020, wins: 1, stage1Wins: 0, stage2Wins: 0, stage3Wins: 0, stagePoints: 112, poles: 2, top5: 5, top10: 9, deltaLeader: -80, deltaNext: -5, pointsEarned: 1, starts: 26, lapsLed: 157, manufacturer: 'Chevrolet' },
  { position: 13, car: '24', driver: 'William Byron', points: 2015, wins: 0, stage1Wins: 1, stage2Wins: 2, stage3Wins: 0, stagePoints: 123, poles: 0, top5: 4, top10: 11, deltaLeader: -85, deltaNext: -5, pointsEarned: 22, starts: 26, lapsLed: 176, manufacturer: 'Chevrolet' },
  { position: 14, car: '23', driver: 'Bubba Wallace', points: 2010, wins: 0, stage1Wins: 0, stage2Wins: 2, stage3Wins: 0, stagePoints: 116, poles: 0, top5: 4, top10: 11, deltaLeader: -90, deltaNext: -5, pointsEarned: 21, starts: 26, lapsLed: 214, manufacturer: 'Toyota' },
  { position: 15, car: '2', driver: 'Austin Cindric', points: 2005, wins: 0, stage1Wins: 1, stage2Wins: 0, stage3Wins: 0, stagePoints: 113, poles: 0, top5: 2, top10: 6, deltaLeader: -95, deltaNext: -5, pointsEarned: 32, starts: 26, lapsLed: 51, manufacturer: 'Ford' },
  { position: 16, car: '60', driver: 'Ryan Preece', points: 2000, wins: 1, stage1Wins: 1, stage2Wins: 1, stage3Wins: 0, stagePoints: 95, poles: 0, top5: 1, top10: 7, deltaLeader: -100, deltaNext: -5, pointsEarned: 67, starts: 26, lapsLed: 55, manufacturer: 'Ford' },
  { position: 17, car: '97', driver: 'Shane Van Gisbergen', points: 605, wins: 2, stage1Wins: 1, stage2Wins: 1, stage3Wins: 0, stagePoints: 75, poles: 2, top5: 5, top10: 7, deltaLeader: -1495, deltaNext: -1395, pointsEarned: 19, starts: 26, lapsLed: 269, manufacturer: 'Chevrolet' },
  { position: 18, car: '6', driver: 'Brad Keselowski', points: 543, wins: 0, stage1Wins: 1, stage2Wins: 1, stage3Wins: 0, stagePoints: 56, poles: 0, top5: 2, top10: 6, deltaLeader: -1557, deltaNext: -62, pointsEarned: 23, starts: 26, lapsLed: 177, manufacturer: 'Ford' },
  { position: 19, car: '1', driver: 'Ross Chastain', points: 518, wins: 0, stage1Wins: 2, stage2Wins: 2, stage3Wins: 0, stagePoints: 69, poles: 1, top5: 1, top10: 5, deltaLeader: -1582, deltaNext: -25, pointsEarned: 13, starts: 26, lapsLed: 118, manufacturer: 'Chevrolet' },
  { position: 20, car: '71', driver: 'Michael McDowell', points: 517, wins: 0, stage1Wins: 0, stage2Wins: 0, stage3Wins: 0, stagePoints: 37, poles: 0, top5: 3, top10: 6, deltaLeader: -1583, deltaNext: -1, pointsEarned: 33, starts: 26, lapsLed: 24, manufacturer: 'Chevrolet' },
  { position: 21, car: '43', driver: 'Erik Jones', points: 498, wins: 0, stage1Wins: 1, stage2Wins: 0, stage3Wins: 0, stagePoints: 50, poles: 0, top5: 2, top10: 5, deltaLeader: -1602, deltaNext: -19, pointsEarned: 8, starts: 26, lapsLed: 17, manufacturer: 'Toyota' },
  { position: 22, car: '34', driver: 'Todd Gilliland', points: 468, wins: 0, stage1Wins: 0, stage2Wins: 1, stage3Wins: 0, stagePoints: 50, poles: 0, top5: 0, top10: 2, deltaLeader: -1632, deltaNext: -30, pointsEarned: 24, starts: 26, lapsLed: 16, manufacturer: 'Ford' },
  { position: 23, car: '16', driver: 'AJ Allmendinger', points: 463, wins: 0, stage1Wins: 1, stage2Wins: 0, stage3Wins: 0, stagePoints: 56, poles: 0, top5: 1, top10: 4, deltaLeader: -1637, deltaNext: -5, pointsEarned: 7, starts: 26, lapsLed: 9, manufacturer: 'Chevrolet' },
  { position: 24, car: '38', driver: 'Zane Smith', points: 455, wins: 0, stage1Wins: 1, stage2Wins: 0, stage3Wins: 0, stagePoints: 33, poles: 0, top5: 2, top10: 6, deltaLeader: -1645, deltaNext: -8, pointsEarned: 13, starts: 26, lapsLed: 77, manufacturer: 'Ford' },
];

const REMAINING_RACES: RemainingRace[] = [];

const SAFE_CUSHION = 80;
const BUBBLE_GAP = 80;

function withTeam(row: CupStandingRaw): CupStandingRaw {
  return {
    ...row,
    team: row.team ?? TEAM_BY_CAR[row.car] ?? undefined,
  };
}

/** 2026 Chase seed: P1 ≈ 2100, then −5 each slot down to P16 ≈ 2000 */
export function projectedChaseSeedPoints(seed: number): number {
  if (seed < 1 || seed > PLAYOFF_FIELD_SIZE) return 0;
  return 2100 - (seed - 1) * 5;
}

/** Championship-eligible contenders only (part-timers with 0 pts / few starts excluded). */
export function eligibleDrivers(rows: CupStandingRaw[]): CupStandingRaw[] {
  const maxStarts = Math.max(0, ...rows.map((r) => r.starts));
  const minStarts = Math.max(8, Math.floor(maxStarts * 0.5));
  return rows
    .filter((r) => r.points > 0 && r.starts >= minStarts)
    .map(withTeam)
    .sort((a, b) => b.points - a.points || b.wins - a.wins || a.position - b.position);
}

/** Build provisional 16: pure points order (2026 — no win locks). */
export function buildProvisionalField(eligible: CupStandingRaw[]): {
  inside: CupStandingRaw[];
  outside: CupStandingRaw[];
} {
  const ordered = [...eligible].sort(
    (a, b) => b.points - a.points || b.wins - a.wins || a.position - b.position
  );
  return {
    inside: ordered.slice(0, PLAYOFF_FIELD_SIZE),
    outside: ordered.slice(PLAYOFF_FIELD_SIZE),
  };
}

function statusFor(pos: number, ptsToCut: number): ChaseStatus {
  if (pos <= PLAYOFF_FIELD_SIZE) {
    if (pos === PLAYOFF_FIELD_SIZE) return 'cut-line';
    return 'safe-inside';
  }
  if (ptsToCut >= -BUBBLE_GAP) return 'bubble-out';
  if (ptsToCut >= -BUBBLE_GAP * 2.5) return 'outside';
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
  const winNote =
    driver.wins > 0
      ? ` Already has ${driver.wins} win${driver.wins === 1 ? '' : 's'} (big points nights, not an auto-berth).`
      : '';

  if (racesLeft === 0) {
    if (status === 'cut-line') {
      return {
        pathLabel: 'Last seed',
        scenario: `Locked the 16th Chase seed after Daytona. Reset to ${driver.points} pts. The 10-race Chase is on.${winNote}`,
      };
    }
    if (status === 'safe-inside') {
      return {
        pathLabel: 'Chase locked',
        scenario: `In The Chase. Seed sits at ${driver.points} after the Daytona reset. Ten races, no eliminations — highest total wins the Cup.${winNote}`,
      };
    }
    return {
      pathLabel: 'Missed the Chase',
      scenario: `Finished outside the top 16 after the Coke Zero Sugar 400. The title chase is closed.${winNote}`,
    };
  }

  if (status === 'cut-line') {
    return {
      pathLabel: 'On the cut',
      scenario: `Holds the last Chase seat at ${driver.points} pts. Any strong run from a hunter behind flips P16 — protect it over the final ${racesLeft} race${racesLeft === 1 ? '' : 's'}.${winNote}`,
    };
  }

  if (status === 'safe-inside') {
    const cushion = ptsToCut;
    return {
      pathLabel: cushion >= SAFE_CUSHION ? 'Solid on points' : 'Inside on points',
      scenario:
        cushion >= SAFE_CUSHION
          ? `Inside the top 16 with a +${cushion} cushion on ${cut}. Keep banking stage points and finishes — no win-lock safety net if it slips.${winNote}`
          : `Inside by +${cushion} on ${cut}. One messy superspeedway night can erase it — survive Daytona (or cash a ~55-pt win to pad).${winNote}`,
    };
  }

  if (status === 'bubble-out') {
    const need = Math.abs(ptsToCut);
    return {
      pathLabel: 'Hunting the cut',
      scenario: `${need} pts behind ${cut}. Over ${racesLeft} race${racesLeft === 1 ? '' : 's'}, that’s roughly ${Math.ceil(need / Math.max(1, racesLeft))} pts/race of swing — or one big win night (~55 pts) plus stages to leap the bubble.${winNote}`,
    };
  }

  if (status === 'outside') {
    return {
      pathLabel: 'Must climb',
      scenario: `${Math.abs(ptsToCut)} pts outside the 16. Needs a heater plus trouble ahead at the cut. A win helps a ton on points — it no longer punches a ticket by itself.${winNote}`,
    };
  }

  return {
    pathLabel: 'Long shot',
    scenario: `Deep outside (${Math.abs(ptsToCut)} back). Realistically needs a miracle stretch of finishes and chaos ahead — wins alone don’t auto-qualify anymore.${winNote}`,
  };
}

function buildScenarios(
  inside: ChaseDriver[],
  outside: ChaseDriver[],
  cut: ChaseDriver | null,
  racesLeft: number
): ChaseScenarioCard[] {
  const cards: ChaseScenarioCard[] = [];

  cards.push({
    id: 'format-2026',
    tone: 'info',
    title: '2026 rule: points only',
    body: 'Win-and-you’re-in is gone. The Chase field is the top 16 in regular-season points after 26 races. A Cup win still pays a massive haul (~55 pts) that can vault the board — it just doesn’t lock a berth by itself.',
    drivers: [],
  });

  const winnersIn = inside.filter((d) => d.wins > 0);
  const winlessIn = inside.filter((d) => d.wins === 0);
  if (winlessIn.length) {
    cards.push({
      id: 'winless-in',
      tone: 'good',
      title: `${winlessIn.length} inside without a win`,
      body: 'Consistency still pays. These drivers hold Chase seats on points alone — proof the 2026 field is a standings race, not a winners-only club.',
      drivers: winlessIn.map((d) => d.driver),
    });
  }

  if (winnersIn.length) {
    cards.push({
      id: 'winners-in',
      tone: 'info',
      title: `${winnersIn.length} winners already in the 16`,
      body: 'Wins padded their points totals. Under 2026 rules that’s the whole benefit until the Chase reset — no automatic lock, no old-style banked playoff-point ladder for eliminations.',
      drivers: winnersIn.slice(0, 8).map((d) => d.driver),
    });
  }

  if (cut) {
    const firstOut = outside[0];
    const gap = firstOut ? cut.points - firstOut.points : 0;
    cards.push({
      id: 'cut',
      tone: racesLeft === 0 ? 'info' : gap <= 40 ? 'danger' : 'warn',
      title: racesLeft === 0 ? `Last seed · ${cut.driver}` : `Cut line · ${cut.driver}`,
      body:
        racesLeft === 0
          ? firstOut
            ? `Field frozen. ${cut.driver} is the 16th seed at ${cut.points} after the Daytona reset. ${firstOut.driver} is first out (${firstOut.points}).`
            : `${cut.driver} holds the last Chase seed at ${cut.points} pts.`
          : firstOut
            ? `${cut.driver} sits P16 at ${cut.points} pts — ${gap} clear of ${firstOut.driver} (${firstOut.points}). Anyone behind needs that gap erased (or a huge points day) before the field freezes.`
            : `${cut.driver} holds the last seat at ${cut.points} pts.`,
      drivers: firstOut ? [cut.driver, firstOut.driver] : [cut.driver],
    });
  }

  const bubble = outside.filter((d) => d.status === 'bubble-out').slice(0, 4);
  if (bubble.length && racesLeft > 0) {
    cards.push({
      id: 'bubble',
      tone: 'danger',
      title: 'First ones knocking',
      body: `Closest hunters outside the 16. With ${racesLeft} race${racesLeft === 1 ? '' : 's'} left, each is a strong finish / stage day away.`,
      drivers: bubble.map((d) => `${d.driver} (${d.ptsToCut})`),
    });
  }

  const winnersOutside = outside.filter((d) => d.wins > 0).slice(0, 4);
  if (winnersOutside.length) {
    cards.push({
      id: 'winners-out',
      tone: 'warn',
      title: racesLeft === 0 ? 'Won before — still missed' : 'Won before — still outside',
      body:
        racesLeft === 0
          ? 'Trophy nights did not auto-qualify in 2026. Shane van Gisbergen had two wins and still finished 17th after Daytona.'
          : 'Trophy nights used to mean automatic entry. Not in 2026. These drivers must climb the points board like everyone else.',
      drivers: winnersOutside.map((d) => `${d.driver} (−${Math.abs(d.ptsToCut)})`),
    });
  }

  cards.push({
    id: 'chase-once-set',
    tone: 'info',
    title: 'Once the 16 is set',
    body: 'Points reset with a small seed (~2,100 for the regular-season leader down to ~2,000 for 16th). Then 10 races of cumulative scoring decide the champion — no Round of 16/12/8 cuts, no Championship 4 one-race shootout.',
    drivers: [],
  });

  return cards;
}

export function buildChaseBoard(
  standings: CupStandingRaw[],
  opts?: { source?: 'live' | 'fallback'; asOfLabel?: string }
): ChaseBoard {
  const source = opts?.source ?? 'fallback';
  const asOfLabel =
    opts?.asOfLabel ??
    'Chase race 1 of 10 · Southern 500 LIVE · points still after Daytona (Aug 29, 2026)';

  const eligible = eligibleDrivers(standings);
  const { inside: rawInside, outside: rawOutside } = buildProvisionalField(eligible);
  const insideIds = new Set(rawInside.map((d) => d.driver));
  const cutLineDriver = rawInside[rawInside.length - 1] ?? null;
  const cutPts = cutLineDriver?.points ?? null;
  const firstOut = rawOutside[0] ?? null;

  const racesLeft = REMAINING_RACES.length;
  const slotByDriver = new Map(rawInside.map((d, i) => [d.driver, i + 1]));

  // Position by points among eligible (1-based)
  const pointsRank = new Map(eligible.map((d, i) => [d.driver, i + 1]));

  const drivers: ChaseDriver[] = eligible.map((d) => {
    const ptsToCut = cutPts == null ? 0 : d.points - cutPts;
    const pos = pointsRank.get(d.driver) ?? 99;
    const status = statusFor(pos, ptsToCut);
    const slot = slotByDriver.get(d.driver) ?? 0;
    const { pathLabel, scenario } = scenarioFor(
      d,
      status,
      ptsToCut,
      racesLeft,
      cutLineDriver?.driver ?? null
    );
    return {
      ...d,
      playoffSlot: slot,
      status,
      ptsToCut,
      projectedChasePts: projectedChaseSeedPoints(slot),
      pathLabel,
      scenario,
    };
  });

  const inside = drivers
    .filter((d) => insideIds.has(d.driver))
    .sort((a, b) => b.points - a.points || b.wins - a.wins)
    .map((d, i) => ({ ...d, playoffSlot: i + 1, projectedChasePts: projectedChaseSeedPoints(i + 1) }));

  const outside = drivers
    .filter((d) => !insideIds.has(d.driver))
    .sort((a, b) => b.points - a.points);

  const scenarios = buildScenarios(
    inside,
    outside,
    inside.find((d) => d.status === 'cut-line') ?? inside[inside.length - 1] ?? null,
    racesLeft
  );

  const cutGap =
    cutPts != null && firstOut != null ? cutPts - firstOut.points : 0;

  return {
    asOfLabel,
    source,
    regularSeasonRacesLeft: racesLeft,
    remainingRaces: REMAINING_RACES,
    fieldSize: PLAYOFF_FIELD_SIZE,
    winnersInTop16: inside.filter((d) => d.wins > 0).length,
    cutGap,
    cutLineDriver: cutLineDriver?.driver ?? null,
    cutLinePts: cutPts,
    firstOutDriver: firstOut?.driver ?? null,
    firstOutPts: firstOut?.points ?? null,
    regularSeasonLeader: eligible[0]?.driver ?? '—',
    drivers,
    inside,
    outside,
    scenarios,
    formatSteps: [
      {
        title: '1 · Regular season (26 races)',
        body: 'Stack finishing points and stage bonuses. A race win is worth about 55 points — a huge haul — but it does not auto-qualify you. Only the top 16 in points after race 26 make The Chase.',
      },
      {
        title: '2 · Field freezes at 16',
        body: 'After the regular-season finale, the top 16 point-earners are in. No win-and-you’re-in. Everyone else is done for the title chase.',
      },
      {
        title: '3 · Points reset & seed',
        body: 'Chase points reset with a small seed: regular-season leader starts near 2,100 and 16th near 2,000 (about 5 points between each seed).',
      },
      {
        title: '4 · 10-race Chase · cumulative',
        body: 'Ten more races. No elimination rounds. No Championship 4 one-race shootout. Keep scoring — the highest point total after race 36 is the Cup champion.',
      },
    ],
    roundRoadmap: [
      { name: 'Chase races 1–10', detail: 'All 16 race every week · points accumulate' },
      { name: 'No eliminations', detail: 'Nobody is cut after 3-race rounds' },
      { name: 'No C4 reset', detail: 'Finale is just another points race for the title' },
      { name: 'Champion', detail: 'Highest Chase total after race 36 wins the Cup' },
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
    console.log('fetchCupChaseBoard: requesting points feed (2026 points-only Chase)');
    const res = await fetch(POINTS_FEED_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      console.log('fetchCupChaseBoard: feed status', res.status);
      return buildChaseBoard(FALLBACK_STANDINGS, {
        source: 'fallback',
        asOfLabel: 'After Daytona (Coke Zero Sugar 400) · Aug 29, 2026 · cached desk',
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

    const liveStarts = mapped[0]?.starts ?? 0;
    const fallbackStarts = FALLBACK_STANDINGS[0]?.starts ?? 0;
    if (liveStarts < fallbackStarts) {
      console.log('fetchCupChaseBoard: stale feed (starts', liveStarts, '<', fallbackStarts, '), using Loudon fallback');
      return buildChaseBoard(FALLBACK_STANDINGS, {
        source: 'fallback',
        asOfLabel: 'After Daytona (Coke Zero Sugar 400) · Aug 29, 2026 · official desk',
      });
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
      asOfLabel: 'After Daytona (Coke Zero Sugar 400) · Aug 29, 2026 · offline desk',
    });
  }
}

export const CHASE_HIGHLIGHTS = [
  'Chase underway · race 1 of 10',
  'Southern 500 LIVE · Darlington',
  'Preece 16th seed · SVG first out',
  'Highest total wins the title',
];
