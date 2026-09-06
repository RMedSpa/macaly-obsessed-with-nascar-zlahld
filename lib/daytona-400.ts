export type DaytonaFact = {
  label: string;
  value: string;
};

export type DaytonaBeat = {
  kicker: string;
  title: string;
  body: string;
};

export const DAYTONA_400 = {
  id: "daytona-400",
  fanName: "Daytona 400",
  officialName: "Coke Zero Sugar 400",
  series: "NASCAR Cup Series",
  track: "Daytona International Speedway",
  city: "Daytona Beach, Florida",
  dateLabel: "Saturday, August 29, 2026",
  nightLabel: "Checkered",
  greenFlagEt: "7:30 p.m. ET",
  preRaceEt: "7:00 p.m. ET",
  greenFlagLocal: "5:30 p.m. Arizona / MDT",
  qualifyingEt: "Friday, 5:00 p.m. ET",
  tv: "NBC",
  stream: "Peacock",
  radio: "MRN · SiriusXM NASCAR Radio Ch. 90",
  booth: "Leigh Diffey, Jeff Burton, Steve Letarte",
  distance: "166 laps · 415 miles (OT from 160)",
  trackLength: "2.5-mile superspeedway",
  headline: "Preece wins Daytona. Chase field frozen.",
  lede: "Ryan Preece won the Coke Zero Sugar 400 in overtime for his first career Cup victory. The RFK No. 60 beat Daniel Suárez by 0.024 seconds after 166 laps. That win locked the last Chase seed. Shane van Gisbergen missed the 16.",
  sourceLabel: "Official NASCAR points feed · Aug 29, 2026",
  sourceUrl: "https://cf.nascar.com/cacher/2026/1/points-feed.json",
  facts: [
    { label: "Winner", value: "Ryan Preece #60" },
    { label: "Margin", value: "0.024 sec OT" },
    { label: "Distance", value: "166 laps · 415 miles" },
    { label: "TV", value: "NBC · Peacock" },
    { label: "Chase", value: "16 locked · Preece 16th" },
    { label: "SVG", value: "27th · missed the 16" },
  ] satisfies DaytonaFact[],
  beats: [
    {
      kicker: "The result",
      title: "First career win in overtime",
      body: "Preece led 5 laps and stole the Daytona 400 at the line, 0.024 seconds ahead of Suárez. Tyler Reddick, Michael McDowell, and Ricky Stenhouse Jr. completed the top five. Official distance: 166 laps, 415 miles, up from the scheduled 160.",
    },
    {
      kicker: "The lock",
      title: "Preece in. SVG out.",
      body: "2026 is still points-only. Two wins did not auto-qualify Shane van Gisbergen. He finished 27th, scored 19 points, and ended 17th at 605. Preece’s 67-point night jumped him onto the last seed. Chase points now reset 2,100 (Hamlin) down to 2,000 (Preece).",
    },
    {
      kicker: "What’s next",
      title: "10-race Chase, no eliminations",
      body: "The regular season is closed. All 16 race the next 10 weeks. No Round of 16 cuts. No Championship 4 one-race shootout. Highest total after race 36 wins the Cup.",
    },
  ] satisfies DaytonaBeat[],
};

export const DAYTONA_400_TV = {
  weekend: "Daytona International Speedway · August 28–29, 2026 · All times Mountain (MDT)",
  note: "Arizona matches MDT in August. Radio: MRN (Cup) / SiriusXM Ch. 90.",
  days: [
    {
      day: "Friday",
      date: "Aug 28",
      sessions: [
        {
          time: "3:00 PM",
          series: "Cup",
          session: "Qualifying",
          channel: "Check listings",
          seriesColor: "bg-series-cup",
        },
      ],
    },
    {
      day: "Saturday",
      date: "Aug 29",
      sessions: [
        {
          time: "5:00 PM",
          series: "Cup",
          session: "Pre-Race Show — Daytona 400",
          channel: "NBC / Peacock",
          seriesColor: "bg-series-cup",
        },
        {
          time: "5:30 PM",
          series: "Cup",
          session: "Race — Coke Zero Sugar 400",
          channel: "NBC / Peacock",
          seriesColor: "bg-series-cup",
          isRace: true,
        },
      ],
    },
  ],
};
