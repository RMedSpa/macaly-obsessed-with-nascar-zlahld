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

export const DARLINGTON_WEEKEND = {
  id: "darlington-weekend",
  track: "Darlington Raceway",
  city: "Darlington, South Carolina",
  dateLabel: "Sat Sept 5 – Sun Sept 6, 2026",
  startIso: "2026-09-05T10:00:00-04:00",
  liveUntilIso: "2026-09-07T08:00:00-04:00",
  snapshotLabel: "Cup qualifying canceled · metric grid posted",
  sourceLabel: "Metric lineup after lightning canceled Cup qualifying · Sept 5, 2026",
  sourceUrl: "https://www.motorsport.com/nascar-cup/news/nascar-cup-darlington-southern-500-starting-lineup/10852786/",
  cup: {
    raceName: "Cook Out Southern 500",
    eventLabel: "Cup Series · Race 27 of 36 · Chase opener",
    distance: "367 laps · 501.32 miles",
    stages: "115 / 230 / 367",
    tvRace: "USA Network",
    tvPq: "TruTV / HBO Max",
    radio: "MRN · SiriusXM Ch. 90",
    greenFlagEt: "Sunday, 5:00 p.m. ET",
    greenFlagLocal: "Sunday, 3:00 p.m. MDT",
    practiceEt: "Saturday, 4:00 p.m. ET",
    qualifyingEt: "Saturday, 5:05 p.m. ET",
    status: "canceled" as const,
    runName: "Cup qualifying canceled",
    flagNote: "Lightning hold · no Cup laps · metric grid posted",
    headline: "Cup qualifying canceled. Reddick on the metric pole.",
    lede: "Lightning around Darlington wiped Saturday's Cup session. No rain on the oval. NASCAR set the Southern 500 grid by the metric: 70 percent last race, 30 percent owner points. Tyler Reddick starts first in the 23XI No. 45. Daniel Suárez starts second. Ryan Preece starts third.",
  },
  oreilly: {
    raceName: "Fleetio 200",
    eventLabel: "O'Reilly Auto Parts Series · Race 25 of 33 · Chase opener",
    distance: "147 laps · 200.8 miles",
    tvRace: "The CW",
    tvPq: "The CW App / ESPN Unlimited",
    greenFlagEt: "Saturday, 7:30 p.m. ET",
    greenFlagLocal: "Saturday, 5:30 p.m. MDT",
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
    headline: "Kvapil takes the Fleetio 200 pole",
    lede: "O'Reilly Auto Parts Series practice and qualifying got in before the storms. Carson Kvapil parked the JR Motorsports No. 1 on pole at 30.424 seconds (161.636 mph). Justin Allgaier starts second. The Fleetio 200 still goes green at 7:30 p.m. ET on The CW.",
  },
  delayNotes: [
    "Lightning around the track canceled Cup qualifying. The oval never took a Cup lap Saturday.",
    "Starting lineup is the metric: 70 percent last-race finish, 30 percent owner points.",
    "Pole: Tyler Reddick. Row 1: Daniel Suárez. Preece P3, Hamlin P4, McDowell P5.",
    "Lowest Chase cars: Hocevar 34th, Buescher 35th. Blaney 24th, Larson 25th, Gibbs 28th.",
    "O'Reilly Fleetio 200 qualifying stands: Kvapil pole, 7:30 p.m. ET on The CW.",
    "Southern 500 remains Sunday 5 p.m. ET on USA, 367 laps, stages 115 / 230 / 367.",
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
  note: "Cup qualifying canceled. Metric Southern 500 grid is posted. O'Reilly qualifying is final. Radio: MRN / SiriusXM Ch. 90.",
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
          session: "Race — Fleetio 200",
          channel: "The CW",
          isRace: true,
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
          session: "Race — Cook Out Southern 500",
          channel: "USA Network",
          isRace: true,
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
