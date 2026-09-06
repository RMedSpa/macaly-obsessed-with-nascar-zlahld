export type TrackCategoryId =
  | 'short'
  | 'flat'
  | 'intermediate'
  | 'superspeedway'
  | 'road';

export type ExampleTrack = {
  name: string;
  lengthMi: number;
  note?: string;
};

export type TrackCategory = {
  id: TrackCategoryId;
  label: string;
  tagline: string;
  /** Accent utility suffix, e.g. nascar-red */
  accent: 'nascar-red' | 'nascar-blue' | 'series-truck' | 'strategy-cyan' | 'series-arca';
  lengthRange: string;
  bankingStyle: string;
  racingStyle: string;
  pitStrategy: string;
  /** Anchor for #short etc. */
  pitStrategyHref: string;
  examples: ExampleTrack[];
  /** Relative scale used by the size comparison graphic (mi) */
  scaleMi: number;
  shape: 'oval' | 'dogleg' | 'trioval' | 'super' | 'road';
};

export const TRACK_CATEGORIES: TrackCategory[] = [
  {
    id: 'short',
    label: 'Short Tracks',
    tagline: 'Beating and banging under the lights',
    accent: 'nascar-red',
    lengthRange: 'About 0.5 – 0.75 miles',
    bankingStyle:
      'Can be flat and paper-clipped (Martinsville) or steep and washing-machine violent (Bristol). Richmond sits in the middle — a 0.75-mile “paperclip” with progressive banking.',
    racingStyle:
      'Door-to-door contact is part of the language. Tracks are tight, restarts shuffle the deck, long runs reward tire management, and one bad shove can put you in the fence. Drivers work the bottom, middle, and top lanes as the surface gums up or cools off.',
    pitStrategy:
      'Tire-deg driven. Soft surfaces and high loads shred right-sides; the square-root stint math in the Pit Strategy Calculator was basically built for these places. Long green runs force you off sequence if you dig too deep early.',
    pitStrategyHref: '/pit-strategy',
    examples: [
      { name: 'Richmond Raceway', lengthMi: 0.75, note: 'D-shaped short track' },
      { name: 'Martinsville Speedway', lengthMi: 0.526, note: 'Paperclip · concrete corners' },
      { name: 'Bristol Motor Speedway', lengthMi: 0.533, note: 'High banks · “The Last Great Colosseum”' },
    ],
    scaleMi: 0.6,
    shape: 'oval',
  },
  {
    id: 'flat',
    label: 'Flat Miles',
    tagline: 'One mile of mechanical grip — Magic Mile & dogleg',
    accent: 'nascar-blue',
    lengthRange: 'Roughly 1.0 – 1.06 miles',
    bankingStyle:
      'Low banking and long straights put the load on chassis balance more than sheer grip from the banking. New Hampshire’s “Magic Mile” corners build from about 2–7° with nearly flat straights; Phoenix’s trademark dogleg bends the backstretch into a unique line few other ovals offer.',
    racingStyle:
      'More about precision than pure aggression. Track position is gold — passing is hard on flat miles, so clean air and a balanced car mean everything. At Loudon, long tight corners and an abrasive surface punish over-driving entry; at Phoenix, who rotates through the dogleg separates heavy hitters from the pack. TV often groups these with “short tracks” because the racing is tight and physical — even though a full mile is larger than Bristol or Martinsville.',
    pitStrategy:
      'Still tire-deg first, with a melt between short-track violence and intermediate calm. Right-front heat builds on long green runs at Loudon; restart zones and late cycles reward clean pit road and frozen track position. Model New Hampshire (Dollar Tree 301 — 301 laps) or Phoenix under Flat Mile presets in the calculator.',
    pitStrategyHref: '/pit-strategy',
    examples: [
      {
        name: 'New Hampshire Motor Speedway',
        lengthMi: 1.058,
        note: '“Magic Mile” · Loudon, NH · Dollar Tree 301 checkered Aug 23',
      },
      {
        name: 'Phoenix Raceway',
        lengthMi: 1.0,
        note: 'Unique dogleg · often called a short track on TV',
      },
    ],
    scaleMi: 1.05,
    shape: 'oval',
  },
  {
    id: 'intermediate',
    label: 'Intermediates',
    tagline: '1.5-mile aero chess',
    accent: 'series-truck',
    lengthRange: 'Typically 1.5 miles (a few stretch longer)',
    bankingStyle:
      'Moderate-to-high banking on wide, multi-groove ovals. The classic “cookie cutter” 1.5-mile shape (Charlotte, Kansas, Las Vegas, Texas, Homestead-Miami) dominates the schedule.',
    racingStyle:
      'Aero racing rules the conversation — clean air is gold, dirty air kills the nose, and long runs sort cars by speed more than scrap. When the surface grips up, multiple lanes open; when it doesn’t, it’s single-file survival for second.',
    pitStrategy:
      'Track position is everything. Teams leach for stages, undercut on caution, and often chase “kilometer” green-flag cycles where being first off pit road beats a slightly longer run. Tire deg still exists, but less violently than short tracks.',
    pitStrategyHref: '/pit-strategy',
    examples: [
      { name: 'Charlotte Motor Speedway', lengthMi: 1.5 },
      { name: 'Kansas Speedway', lengthMi: 1.5 },
      { name: 'Las Vegas Motor Speedway', lengthMi: 1.5 },
      { name: 'Texas Motor Speedway', lengthMi: 1.5 },
      { name: 'Homestead-Miami Speedway', lengthMi: 1.5 },
    ],
    scaleMi: 1.5,
    shape: 'oval',
  },
  {
    id: 'superspeedway',
    label: 'Superspeedways',
    tagline: 'Pack drafting at 200 mph',
    accent: 'strategy-cyan',
    lengthRange: '2.5 – 2.66+ miles',
    bankingStyle:
      'Massive, high-banked tri-ovals. Daytona (2.5 mi) and Talladega (2.66 mi) tower over the rest of the circuit — acres of asphalt and nothing but momentum.',
    racingStyle:
      'Pack drafting. Restrictor-era / tapered-spacer racing keeps cars bunched; the draft pulls trains forward and shoves wrecks into multi-car “Big Ones.” Winning is as much about allies and timing the last push as pure car speed.',
    pitStrategy:
      'Fuel-window first. Tire deg is tiny; the tank (and stage breaks / cautions) set the stop count. Flip the Pit Strategy Calculator to Superspeedway for fuel-window mode and a laps-per-tank board.',
    pitStrategyHref: '/pit-strategy',
    examples: [
      { name: 'Daytona International Speedway', lengthMi: 2.5, note: '2.5-mile tri-oval' },
      { name: 'Talladega Superspeedway', lengthMi: 2.66, note: 'Longest oval in NASCAR' },
    ],
    scaleMi: 2.6,
    shape: 'super',
  },
  {
    id: 'road',
    label: 'Road Courses',
    tagline: 'Brakes, gears, and right turns',
    accent: 'series-arca',
    lengthRange: 'About 2.0 – 3.4 miles of twists',
    bankingStyle:
      'Not about banking — elevation, curbing, and corner complexes. Permanent road courses with left and right turns, heavy braking zones, and long flowing sweeper sections.',
    racingStyle:
      'Road-course specialists shine. Passing happens into slow corners after long straights; mistakes on curbs spit you into gravel. Strategy mixes hard tire picks, short-fill calls, and sometimes overtime chaos under lights or weather.',
    pitStrategy:
      'Tires still matter (especially how the right-sides / left-sides wear on clockwise vs. counter-clockwise layouts), but fuel windows, undercuts, and scrambling for clean air after a slow pit stall often matter more than pure oval stint math. Use the calculator as a starting point, then layer road-course stage timing.',
    pitStrategyHref: '/pit-strategy',
    examples: [
      { name: 'Circuit of the Americas (COTA)', lengthMi: 3.41, note: 'Austin · F1-style layout' },
      { name: 'Watkins Glen International', lengthMi: 2.45, note: 'The Glen' },
      { name: 'Sonoma Raceway', lengthMi: 1.99, note: 'Natural terrain · wine country' },
    ],
    scaleMi: 2.2,
    shape: 'road',
  },
];

export const PHOENIX_CALLOUT =
  'Phoenix Raceway is often labeled a short track on broadcasts because the racing is tight and physical — but at a full mile with a dogleg, it drives like its own category. On this site we list it under Flat Miles while calling out the short-track nickname so both mental models stick.';

export const NEW_HAMPSHIRE_CALLOUT =
  'New Hampshire Motor Speedway — the “Magic Mile” in Loudon — is a 1.058-mile flat oval with progressive corner banking (about 2–7°) and nearly flat 1,500-ft straights. Cup races 301 laps here (Dollar Tree 301). Passing is tough, track position rules, and long green runs chew the right-front. Model it under Flat Mile in the Pit Strategy Calculator.';
