export interface LiveRunningRow {
  pos: number;
  car: string;
  driver: string;
  team: string;
  note?: string;
}

export interface LiveStageBoard {
  stage: 1 | 2 | 3;
  throughLap: number;
  status: "final" | "green";
  winner?: string;
  winnerCar?: string;
  top10?: string[];
  note: string;
}

export interface LiveIncident {
  lap: string;
  label: string;
  detail: string;
  tone: "caution" | "dnf" | "note";
}

export interface LivePitStop {
  lap: string;
  kind: "green" | "stage" | "caution";
  who: string;
  note: string;
  /** First Loudon stint was rain tires — skip tire-deg vs optimal. */
  rainTires?: boolean;
}

export interface LiveFeaturedDriver {
  name: string;
  shortName: string;
  car: string;
  team: string;
  manufacturer: string;
  profileHref: string;
  started: number;
  position: number;
  status: "running" | "out";
  interval: string;
  lapsLed: number;
  lastStopLap: string;
  stage1: string;
  stage2: string;
  headline: string;
  blurb: string;
  pits: LivePitStop[];
}

export interface LiveQualRow {
  pos: number;
  car: string;
  driver: string;
  speed: string;
}

export interface CupLiveDesk {
  raceName: string;
  track: string;
  eventLabel: string;
  dateLabel: string;
  tv: string;
  distance: string;
  startIso: string;
  liveUntilIso: string;
  status: "green" | "complete";
  snapshotLabel: string;
  sourceLabel: string;
  sourceUrl: string;
  lapNote: string;
  lapsRemaining: number;
  raceLaps: number;
  leader: {
    car: string;
    driver: string;
    team: string;
    manufacturer: string;
    lapsLed: string;
    headline: string;
    blurb: string;
  };
  running: LiveRunningRow[];
  stages: LiveStageBoard[];
  pole: {
    car: string;
    driver: string;
    team: string;
    time: string;
    speed: string;
    margin: string;
  };
  qualifying: LiveQualRow[];
  chaseNotes: string[];
  incidents: LiveIncident[];
  pitStops: LivePitStop[];
  featuredDriver?: LiveFeaturedDriver;
}

// Snapshot from USA TODAY live desk (updated Aug 23, 2026, 5:23 p.m. ET)
// plus FOX RaceTrax running confirmation (Berry P1, start 2).
export const NHMS_LIVE: CupLiveDesk = {
  raceName: "Dollar Tree 301",
  track: "New Hampshire Motor Speedway",
  eventLabel: "Cup Series · Race 25 of 36 · Loudon",
  dateLabel: "Sun Aug 23, 2026",
  tv: "USA Network / HBO Max",
  distance: "301 laps · 1.058-mile flat",
  startIso: "2026-08-23T14:00:00-04:00",
  liveUntilIso: "2026-08-24T10:00:00-04:00",
  status: "complete",
  snapshotLabel: "Final · Blaney wins by 0.586s",
  sourceLabel: "NASCAR official results",
  sourceUrl:
    "https://www.nascar.com/results/racecenter/2026/nascar-cup-series/dollar-tree-301/ncs/race/",
  lapNote: "Checkered · 301 of 301",
  lapsRemaining: 0,
  raceLaps: 301,
  leader: {
    car: "12",
    driver: "Ryan Blaney",
    team: "Team Penske",
    manufacturer: "Ford",
    lapsLed: "115",
    headline: "Blaney wins the Dollar Tree 301",
    blurb:
      "Berry restarted second after Stage 2, cleared Bubba Wallace, and is out front with Ryan Preece third. He’s chasing a first 2026 win — and a fourth straight top 10 — in what is currently his last season in the No. 21.",
  },
  running: [
    { pos: 1, car: "21", driver: "Josh Berry", team: "Wood Brothers", note: "Cleared Wallace early in Stage 3" },
    { pos: 2, car: "23", driver: "Bubba Wallace", team: "23XI", note: "Won the race off pit road after Stage 2" },
    { pos: 3, car: "60", driver: "Ryan Preece", team: "RFK", note: "Chase hunter — stayed out to lead Stage 2" },
    {
      pos: 4,
      car: "5",
      driver: "Kyle Larson",
      team: "Hendrick",
      note: "Stage 1 winner · 1 lap down · 18 laps led",
    },
  ],
  stages: [
    {
      stage: 1,
      throughLap: 70,
      status: "final",
      winner: "Kyle Larson",
      winnerCar: "5",
      top10: [
        "Larson",
        "Bell",
        "Hocevar",
        "Byron",
        "Berry",
        "Blaney",
        "Ty Gibbs",
        "Preece",
        "van Gisbergen",
        "Briscoe",
      ],
      note: "Larson’s 5th stage win of 2026 after the field went slick.",
    },
    {
      stage: 2,
      throughLap: 185,
      status: "final",
      winner: "Ryan Blaney",
      winnerCar: "12",
      top10: [
        "Blaney",
        "Berry",
        "Wallace",
        "Preece",
        "Larson",
        "Keselowski",
        "Buescher",
        "Ty Gibbs",
        "Hamlin",
        "Bell",
      ],
      note: "Season-high 7th stage win. Pit trouble drops him to 14th for Stage 3.",
    },
    {
      stage: 3,
      throughLap: 301,
      status: "green",
      note: "Wallace led the restart; Berry passed him. ~102 laps remain.",
    },
  ],
  pole: {
    car: "45",
    driver: "Tyler Reddick",
    team: "23XI Racing",
    time: "29.054",
    speed: "131.094 mph",
    margin: "0.015s over Berry",
  },
  qualifying: [
    { pos: 1, car: "45", driver: "Tyler Reddick", speed: "131.094" },
    { pos: 2, car: "21", driver: "Josh Berry", speed: "131.026" },
    { pos: 3, car: "24", driver: "William Byron", speed: "130.981" },
    { pos: 4, car: "11", driver: "Denny Hamlin", speed: "130.972" },
    { pos: 5, car: "97", driver: "Shane van Gisbergen", speed: "130.860" },
    { pos: 6, car: "20", driver: "Christopher Bell", speed: "130.555" },
    { pos: 7, car: "54", driver: "Ty Gibbs", speed: "130.496" },
    { pos: 8, car: "12", driver: "Ryan Blaney", speed: "130.447" },
    { pos: 9, car: "5", driver: "Kyle Larson", speed: "130.443" },
    { pos: 10, car: "48", driver: "Alex Bowman", speed: "130.420" },
  ],
  chaseNotes: [
    "Two races left to set the 16-driver Chase field — Loudon today, Daytona next Saturday.",
    "Ross Chastain (#1) is done with drivetrain trouble and is mathematically out of the Chase.",
    "Shane van Gisbergen led 30 wet-weather laps, then faded to 9th in Stage 1 when the track dried.",
    "Ryan Preece cut the SVG gap to 41 points after Stage 2 while running up front.",
    "Bubble names watching every lap: Wallace, Cindric, SVG hold; Preece, Keselowski, Jones hunt.",
  ],
  incidents: [
    {
      lap: "1–40",
      label: "Wet to slick",
      detail:
        "Race started on rain tires. NASCAR threw a competition caution at lap 40 to change to slicks. SVG built a 7.7s lead in the wet.",
      tone: "note",
    },
    {
      lap: "52",
      label: "Stenhouse wall",
      detail: "Ricky Stenhouse Jr. spun the No. 47 into the Turn 4 wall shortly after going back green on slicks.",
      tone: "caution",
    },
    {
      lap: "~40",
      label: "Chastain DNF",
      detail: "No. 1 Chevrolet to the garage with a drivetrain / power smell. Chase hopes are over.",
      tone: "dnf",
    },
    {
      lap: "84",
      label: "Front-stretch stack",
      detail:
        "Carson Hocevar and Joey Logano spun; Connor Zilisch and Austin Dillon were collected. Hocevar took heavy damage; Logano pitted for steering.",
      tone: "caution",
    },
    {
      lap: "185",
      label: "Stage 2 pits",
      detail: "Wallace won the race off pit road. Blaney had trouble and restarted 14th for the final stage.",
      tone: "note",
    },
  ],
  pitStops: [
    {
      lap: "40",
      kind: "caution",
      who: "Field",
      note: "Competition caution — wet Goodyears swapped for slicks.",
    },
    {
      lap: "70",
      kind: "stage",
      who: "Kyle Larson",
      note: "Wins Stage 1, then pits with the field for four tires and fuel.",
    },
    {
      lap: "84",
      kind: "caution",
      who: "Kyle Larson",
      note: "Pits from the lead after the frontstretch stack. Preece stays out and inherits P1.",
    },
    {
      lap: "132",
      kind: "green",
      who: "Josh Berry",
      note: "Leader green-flag stop. Blaney, Wallace, Preece cycle behind him.",
    },
    {
      lap: "185",
      kind: "stage",
      who: "Bubba Wallace",
      note: "Wins Stage 2 pit road. Blaney hits trouble and restarts 14th.",
    },
  ],
  featuredDriver: {
    name: "Kyle Larson",
    shortName: "Larson",
    car: "5",
    team: "Hendrick Motorsports",
    manufacturer: "Chevrolet",
    profileHref: "/drivers/kyle-larson",
    started: 9,
    position: 4,
    status: "running",
    interval: "1 lap down",
    lapsLed: 18,
    lastStopLap: "185",
    stage1: "Won Stage 1",
    stage2: "P5",
    headline: "P4 after banking Stage 1 — one lap down, still in the hunt",
    blurb:
      "Larson started 9th, won Stage 1, then lost the lead under the lap-84 yellow when he pitted and Preece stayed out. He finished Stage 2 fifth and is running 4th with ~102 laps left.",
    pits: [
      {
        lap: "40",
        kind: "caution",
        who: "Kyle Larson",
        note: "Competition caution — swapped rain tires for slicks with the field.",
      },
      {
        lap: "70",
        kind: "stage",
        who: "Kyle Larson",
        note: "Won Stage 1, then a four-tire + fuel stop.",
      },
      {
        lap: "84",
        kind: "caution",
        who: "Kyle Larson",
        note: "Pitted from the lead after the frontstretch stack. Preece stayed out and inherited P1.",
      },
      {
        lap: "185",
        kind: "stage",
        who: "Kyle Larson",
        note: "Stage 2 P5. Four tires + fuel with the leaders.",
      },
    ],
  },
};

/**
 * Josh Berry's Dollar Tree 301 stop chart.
 * Green-flag lap 132 is confirmed by the USA TODAY live desk.
 * Laps 40 / 70 / 185 follow the published field sequence
 * (rain-to-slick, Stage 1 P5, Stage 2 restart P2).
 * Official pit-stall clocks were not published.
 */
export const BERRY_LOUDON = {
  name: "Josh Berry",
  car: "21",
  team: "Wood Brothers Racing",
  race: "Dollar Tree 301",
  lastStopLap: 185,
  source:
    "USA TODAY live desk + field sequence. Official pit-stall clocks were not published — times on the calculator are this model’s estimates.",
  pits: [
    {
      lap: "40",
      kind: "caution" as const,
      who: "Josh Berry",
      note: "Competition caution — swapped rain tires for slicks with the field.",
      rainTires: true,
    },
    {
      lap: "70",
      kind: "stage" as const,
      who: "Josh Berry",
      note: "Stage 1 P5. Four tires + fuel with the field.",
    },
    {
      lap: "132",
      kind: "green" as const,
      who: "Josh Berry",
      note: "Green-flag stop as the leader. Charged back to the front.",
    },
    {
      lap: "185",
      kind: "stage" as const,
      who: "Josh Berry",
      note: "Stage 2 service. Lost the race off pit road to Wallace — restarted 2nd.",
    },
  ] satisfies LivePitStop[],
};

export function getLiveCupRace(now: Date = new Date()): CupLiveDesk | null {
  if (NHMS_LIVE.status !== "green") return null;
  const start = new Date(NHMS_LIVE.startIso).getTime();
  const until = new Date(NHMS_LIVE.liveUntilIso).getTime();
  const t = now.getTime();
  if (t < start || t >= until) return null;
  return NHMS_LIVE;
}
