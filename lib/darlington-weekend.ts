export type DarlingtonQualRow = {
  pos: number;
  car: string;
  driver: string;
  team: string;
  make: string;
  time: string;
  speed: string;
};

export type DarlingtonStartRow = {
  pos: number;
  car: string;
  driver: string;
};

export type DarlingtonFinishRow = {
  pos: number;
  car: string;
  driver: string;
};

export const DARLINGTON_WEEKEND = {
  id: "darlington-weekend",
  track: "Darlington Raceway",
  city: "Darlington, South Carolina",
  dateLabel: "Sat Sept 5 – Sun Sept 6, 2026",
  startIso: "2026-09-05T10:00:00-04:00",
  liveUntilIso: "2026-09-07T08:00:00-04:00",
  snapshotLabel: "GREEN · LIVE · Chase opener",
  sourceLabel: "Race-day desk · Sept 6, 2026 · ~3:25 p.m. MDT",
  sourceUrl: "https://www.motorsport.com/nascar-cup/news/nascar-cup-darlington-southern-500-starting-lineup/10852786/",
  cup: {
    raceName: "Cook Out Southern 500",
    eventLabel: "Cup Series · Race 27 of 36 · Chase race 1 of 10",
    distance: "367 laps · 501.32 miles",
    stages: "115 / 230 / 367",
    tvRace: "USA Network / HBO Max",
    tvPq: "TruTV / HBO Max",
    radio: "MRN · SiriusXM Ch. 90",
    greenFlagEt: "Sunday, 5:00 p.m. ET",
    greenFlagLocal: "Sunday, 3:00 p.m. MDT",
    greenApprox: "Green ~5:10 p.m. ET per Jayski",
    practiceEt: "Saturday, 4:00 p.m. ET",
    qualifyingEt: "Saturday, 5:05 p.m. ET",
    status: "green" as const,
    runName: "Chase opener under green",
    flagNote: "GREEN / LIVE · metric grid · winner TBD after checkered",
    headline: "Southern 500 is LIVE. Chase opener under green.",
    lede: "Race day at the Lady in Black. The Cook Out Southern 500 is LIVE — Cup Series race 27 of 36, Chase race 1 of 10. Saturday qualifying was canceled by lightning; the field is the metric grid. Tyler Reddick starts first in the 23XI No. 45. Daniel Suárez starts second. Ryan Preece starts third. Denny Hamlin is fourth. This desk is not inventing a lap leader, caution count, or stage winner. Winner slot stays open until the checkered flag.",
    winner: null as string | null,
    winnerNote: "Winner TBD — follow-up desk after the Southern 500 checkered.",
  },
  oreilly: {
    raceName: "Fleetio 200",
    eventLabel: "O'Reilly Auto Parts Series · Race 25 of 33 · Chase opener",
    distance: "147 laps · ~200.8 miles",
    tvRace: "The CW",
    tvPq: "The CW App / ESPN Unlimited",
    greenFlagEt: "Saturday, 7:30 p.m. ET",
    greenFlagLocal: "Saturday, 5:30 p.m. MDT",
    status: "checkered" as const,
    pole: {
      car: "1",
      driver: "Carson Kvapil",
      team: "JR Motorsports",
      make: "Chevrolet",
      time: "30.424",
      speed: "161.636 mph",
    },
    practiceFast: {
      car: "99",
      driver: "Parker Retzlaff",
      time: "30.300",
      speed: "162.297 mph",
    },
    noTime: {
      car: "47",
      driver: "Dawson Cram",
      note: "No qualifying lap posted",
    },
    winner: {
      driver: "Sheldon Creed",
      car: "00",
      team: "Haas Factory Team",
      make: "Chevrolet",
      careerWin: 2,
      seasonWin: 2,
      note: "First non-superspeedway win",
    },
    headline: "Creed wins the Fleetio 200",
    lede: "Sheldon Creed checkered the Fleetio 200 in the Haas Factory Team No. 00 Chevrolet — his second career O'Reilly win, second of 2026, and first away from a superspeedway. 147 laps, about 200.8 miles. He led the final stretch (reports: last 53 laps; pit-crew jump for the restart with about 49 to go). Carson Kvapil started on pole — first career O'Reilly pole — led 20 laps, and finished 12th after tire strategy failed.",
    chaseNote: "Chase after Darlington · Creed 2nd, ~7 behind Allgaier · 8 races remaining",
    finishers: [
      { pos: 1, car: "00", driver: "Sheldon Creed" },
      { pos: 2, car: "17", driver: "Corey Day" },
      { pos: 3, car: "19", driver: "Brent Crews" },
      { pos: 4, car: "8", driver: "Sammy Smith" },
      { pos: 5, car: "21", driver: "Austin Hill" },
      { pos: 6, car: "96", driver: "Anthony Alfredo" },
      { pos: 7, car: "54", driver: "Taylor Gray" },
      { pos: 8, car: "41", driver: "Sam Mayer" },
      { pos: 9, car: "", driver: "Jeremy Clements" },
      { pos: 10, car: "20", driver: "Brandon Jones" },
    ] satisfies DarlingtonFinishRow[],
  },
  boothNotes: [
    "Southern 500 is LIVE. Chase race 1 of 10. Green about 5:10 p.m. ET. USA Network / HBO Max. Radio MRN / SiriusXM 90.",
    "Do not invent a lap leader, caution count, or stage winner on this desk. Winner slot stays open until checkered.",
    "Metric grid after Saturday lightning canceled Cup qualifying. Pole: Tyler Reddick. P2 Daniel Suárez. P3 Ryan Preece. P4 Denny Hamlin.",
    "Lowest Chase cars on the metric: Hocevar 34th, Buescher 35th. Blaney 24th, Larson 25th, Gibbs 28th.",
    "Fleetio 200 is CHECKERED. Sheldon Creed, Haas Factory Team No. 00 Chevrolet. Second career O'Reilly win, second of 2026, first non-superspeedway win.",
    "Fleetio top 10: Creed, Corey Day (#17), Brent Crews, Sammy Smith, Austin Hill, Anthony Alfredo (Stage 2 after staying out), Taylor Gray, Sam Mayer, Jeremy Clements, Brandon Jones.",
    "Kvapil pole, led 20, P12 after tire strategy failed. Allgaier won Stage 1 and finished 17th. Parker Retzlaff 21st. Rajah Caruth 26th (fuel pickup).",
    "O'Reilly Chase after Darlington: Creed vaulted to 2nd, about 7 points behind Justin Allgaier, with 8 races remaining. Official full totals not verified on this desk.",
  ],
  cupStarting: [
    { pos: 1, car: "45", driver: "Tyler Reddick" },
    { pos: 2, car: "7", driver: "Daniel Suárez" },
    { pos: 3, car: "60", driver: "Ryan Preece" },
    { pos: 4, car: "11", driver: "Denny Hamlin" },
    { pos: 5, car: "71", driver: "Michael McDowell" },
    { pos: 6, car: "2", driver: "Austin Cindric" },
    { pos: 7, car: "19", driver: "Chase Briscoe" },
    { pos: 8, car: "47", driver: "Ricky Stenhouse Jr." },
    { pos: 9, car: "3", driver: "Austin Dillon" },
    { pos: 10, car: "48", driver: "Alex Bowman" },
    { pos: 11, car: "20", driver: "Christopher Bell" },
    { pos: 12, car: "6", driver: "Brad Keselowski" },
    { pos: 13, car: "22", driver: "Joey Logano" },
    { pos: 14, car: "21", driver: "Josh Berry" },
    { pos: 15, car: "", driver: "Riley Herbst" },
    { pos: 16, car: "41", driver: "Cole Custer" },
    { pos: 17, car: "23", driver: "Bubba Wallace" },
    { pos: 18, car: "9", driver: "Chase Elliott" },
    { pos: 19, car: "", driver: "John Hunter Nemechek" },
    { pos: 20, car: "24", driver: "William Byron" },
    { pos: 21, car: "34", driver: "Todd Gilliland" },
    { pos: 22, car: "67", driver: "Corey Heim" },
    { pos: 23, car: "1", driver: "Ross Chastain" },
    { pos: 24, car: "12", driver: "Ryan Blaney" },
    { pos: 25, car: "5", driver: "Kyle Larson" },
    { pos: 26, car: "97", driver: "Shane van Gisbergen" },
    { pos: 27, car: "", driver: "Ty Dillon" },
    { pos: 28, car: "54", driver: "Ty Gibbs" },
    { pos: 29, car: "4", driver: "Noah Gragson" },
    { pos: 30, car: "16", driver: "AJ Allmendinger" },
    { pos: 31, car: "", driver: "Connor Zilisch" },
    { pos: 32, car: "", driver: "Austin Hill" },
    { pos: 33, car: "38", driver: "Zane Smith" },
    { pos: 34, car: "77", driver: "Carson Hocevar" },
    { pos: 35, car: "17", driver: "Chris Buescher" },
    { pos: 36, car: "43", driver: "Erik Jones" },
    { pos: 37, car: "", driver: "Cody Ware" },
    { pos: 38, car: "66", driver: "Chad Finchum" },
  ] satisfies DarlingtonStartRow[],
  qualifying: [
    { pos: 1, car: "1", driver: "Carson Kvapil", team: "JR Motorsports", make: "Chevrolet", time: "30.424", speed: "161.636" },
    { pos: 2, car: "7", driver: "Justin Allgaier", team: "JR Motorsports", make: "Chevrolet", time: "30.485", speed: "161.312" },
    { pos: 3, car: "20", driver: "Brandon Jones", team: "Joe Gibbs Racing", make: "Toyota", time: "30.619", speed: "160.606" },
    { pos: 4, car: "2", driver: "Jesse Love", team: "Richard Childress Racing", make: "Chevrolet", time: "30.622", speed: "160.590" },
    { pos: 5, car: "41", driver: "Sam Mayer", team: "Haas Factory Team", make: "Chevrolet", time: "30.626", speed: "160.569" },
    { pos: 6, car: "21", driver: "Austin Hill", team: "Richard Childress Racing", make: "Chevrolet", time: "30.745", speed: "159.948" },
    { pos: 7, car: "54", driver: "Taylor Gray", team: "Joe Gibbs Racing", make: "Toyota", time: "30.819", speed: "159.564" },
    { pos: 8, car: "19", driver: "Brent Crews", team: "Joe Gibbs Racing", make: "Toyota", time: "30.849", speed: "159.409" },
    { pos: 9, car: "88", driver: "Rajah Caruth", team: "JR Motorsports", make: "Chevrolet", time: "30.855", speed: "159.378" },
    { pos: 10, car: "99", driver: "Parker Retzlaff", team: "Viking Motorsports", make: "Chevrolet", time: "30.880", speed: "159.249" },
    { pos: 11, car: "8", driver: "Sammy Smith", team: "JR Motorsports", make: "Chevrolet", time: "30.925", speed: "159.017" },
    { pos: 12, car: "96", driver: "Anthony Alfredo", team: "Viking Motorsports", make: "Chevrolet", time: "30.950", speed: "158.889" },
  ] satisfies DarlingtonQualRow[],
};

export const DARLINGTON_WEEKEND_TV = {
  weekend: "Darlington Raceway · September 5–6, 2026 · All times Mountain (MDT)",
  note: "Saturday sessions are final. Fleetio 200 is CHECKERED (Creed). Sunday Cup is LIVE — Southern 500, Chase race 1 of 10. Radio: MRN / SiriusXM Ch. 90.",
  days: [
    {
      day: "Saturday",
      date: "Sep 5",
      sessions: [
        {
          time: "11:30 AM",
          series: "O'Reilly",
          session: "Practice — FINAL",
          channel: "CW App / ESPN Unlimited",
          seriesColor: "bg-series-xfinity",
        },
        {
          time: "12:35 PM",
          series: "O'Reilly",
          session: "Qualifying — FINAL · Kvapil pole",
          channel: "CW App / ESPN Unlimited",
          seriesColor: "bg-series-xfinity",
        },
        {
          time: "2:00 PM",
          series: "Cup",
          session: "Practice — CANCELED",
          channel: "TruTV / HBO Max",
          seriesColor: "bg-series-cup",
        },
        {
          time: "3:05 PM",
          series: "Cup",
          session: "Qualifying — CANCELED · Reddick pole",
          channel: "TruTV / HBO Max",
          seriesColor: "bg-series-cup",
        },
        {
          time: "5:30 PM",
          series: "O'Reilly",
          session: "Race — Fleetio 200 — CHECKERED · Creed",
          channel: "The CW",
          isFinal: true,
          seriesColor: "bg-series-xfinity",
        },
      ],
    },
    {
      day: "Sunday",
      date: "Sep 6",
      sessions: [
        {
          time: "3:00 PM",
          series: "Cup",
          session: "Race — Cook Out Southern 500 — LIVE",
          channel: "USA Network / HBO Max",
          isRace: true,
          isLive: true,
          seriesColor: "bg-series-cup",
        },
      ],
    },
  ],
};

export function isDarlingtonWeekendLive(now: Date = new Date()): boolean {
  const t = now.getTime();
  const start = new Date(DARLINGTON_WEEKEND.startIso).getTime();
  const until = new Date(DARLINGTON_WEEKEND.liveUntilIso).getTime();
  return t >= start && t < until;
}
