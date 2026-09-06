export interface CupDriver {
  number: string;
  name: string;
}

export interface CupTeam {
  id: string;
  name: string;
  nickname?: string;
  founded: string;
  hq: string;
  blurb: string;
  color: 'red' | 'blue' | 'dark' | 'orange' | 'green';
  drivers: CupDriver[];
}

export type TrackType =
  | 'superspeedway'
  | 'intermediate'
  | 'short-track'
  | 'road-course'
  | 'street';

export interface CupTrack {
  id: string;
  name: string;
  location: string;
  type: TrackType;
  length: string;
  banking?: string;
  raceStyle: string;
  whyItMatters: string;
  fanTip: string;
}

export interface BasicsCard {
  id: string;
  title: string;
  icon: string;
  body: string;
  bullets?: string[];
}

export const BEGINNER_BASICS: BasicsCard[] = [
  {
    id: 'what-is-nascar',
    title: 'What is NASCAR?',
    icon: '🏁',
    body: 'NASCAR is America’s biggest stock-car racing series. Full-size cars race door-to-door at high speed on oval tracks, road courses, and a few street circuits. The top level is the Cup Series — the one most people mean when they say “NASCAR.”',
    bullets: [
      'Stock cars = purpose-built race cars that still look a bit like street brands (Chevy, Ford, Toyota)',
      'Most races are 200–500 miles long and take 2–4 hours',
      'Drivers earn points every week; the season finishes with a playoff and a champion',
    ],
  },
  {
    id: 'series-ladder',
    title: 'The series ladder',
    icon: '📈',
    body: 'Think of NASCAR like a pro sports system with farm clubs. Most stars climb this ladder before reaching Cup.',
    bullets: [
      'Cup Series — the big league (red badge on this site)',
      "O'Reilly Auto Parts Series — top developmental series (blue)",
      'Craftsman Truck Series — full-body trucks, often more aggressive racing (orange)',
      'ARCA Menards — entry-level national series (green)',
    ],
  },
  {
    id: 'race-weekend',
    title: 'How a race weekend works',
    icon: '🗓️',
    body: 'A typical Cup weekend builds from practice to the main event. TV guides list start times so you never miss green.',
    bullets: [
      'Practice — teams test speed and car setups',
      'Qualifying — single-lap or format races set the starting order',
      'Race — green flag drops; stages and pit strategy decide the winner',
      'Victory Lane — winner celebrates with the checkered flag and trophy',
    ],
  },
  {
    id: 'stages-cautions',
    title: 'Stages, cautions & pits',
    icon: '⚡',
    body: 'Modern Cup races are split into stages so mid-race drama matters. Yellow flags bunch the field back up — perfect moments for strategy.',
    bullets: [
      'Stages — the race is cut into 2–3 segments; stage winners earn bonus points',
      'Caution (yellow) — slower pace for crashes or debris; pit road often opens',
      'Pit stops — crews change tires and add fuel in under 12 seconds',
      'Green-flag pit cycles — when the race stays clean, leaders leapfrog through the field',
    ],
  },
  {
    id: 'points-playoffs',
    title: 'Points & The Chase (plain English)',
    icon: '🏆',
    body: 'Drivers score points for finishing position plus stage bonuses. A race win pays a big haul (~55 pts) but does not auto-qualify anyone. After 26 races, the top 16 in points enter a 10-race Chase decided on cumulative points — no elimination rounds.',
    bullets: [
      'Regular season — stack stage points, finishes, and wins for the points board',
      'Chase field — top 16 in points only (win-and-you’re-in is gone)',
      'Points reset — small seed from ~2,100 (1st) down to ~2,000 (16th)',
      '10-race Chase — highest total after race 36 wins the Cup; no Championship 4 shootout',
    ],
  },
  {
    id: 'how-to-watch',
    title: 'How to watch like a fan',
    icon: '📺',
    body: 'You don’t need to know every rule on day one. Pick a driver or team, watch the pack, and learn the rest as you go.',
    bullets: [
      'Follow one driver first — check our Driver Hub',
      'Use the TV Guide on the home page for times & channels',
      'Listen for “leader,” “caution,” and “pit road is open” on the broadcast',
      'Superspeedways are pack chaos; short tracks are bumping; road courses reward braking skill',
    ],
  },
];

export const CUP_TEAMS: CupTeam[] = [
  {
    id: 'hendrick',
    name: 'Hendrick Motorsports',
    nickname: 'HMS',
    founded: '1984',
    hq: 'Concord, NC',
    blurb:
      'The gold standard of the modern Cup garage. Four full-time Chevrolets, deep engineering, and a trophy case that defines the sport.',
    color: 'blue',
    drivers: [
      { number: '5', name: 'Kyle Larson' },
      { number: '9', name: 'Chase Elliott' },
      { number: '24', name: 'William Byron' },
      { number: '48', name: 'Alex Bowman' },
    ],
  },
  {
    id: 'jgr',
    name: 'Joe Gibbs Racing',
    nickname: 'JGR',
    founded: '1992',
    hq: 'Huntersville, NC',
    blurb:
      'Toyota’s powerhouse. Coached by NFL legend Joe Gibbs, JGR teams are ruthless on intermediate ovals and deadly on short tracks.',
    color: 'red',
    drivers: [
      { number: '11', name: 'Denny Hamlin' },
      { number: '19', name: 'Chase Briscoe' },
      { number: '20', name: 'Christopher Bell' },
      { number: '54', name: 'Ty Gibbs' },
    ],
  },
  {
    id: 'penske',
    name: 'Team Penske',
    nickname: 'Penske',
    founded: '1972 (NASCAR)',
    hq: 'Mooresville, NC',
    blurb:
      'Roger Penske’s Fords race with military precision. Multiple champions, VIP polish, and always in the championship conversation.',
    color: 'dark',
    drivers: [
      { number: '2', name: 'Austin Cindric' },
      { number: '12', name: 'Ryan Blaney' },
      { number: '22', name: 'Joey Logano' },
    ],
  },
  {
    id: '23xi',
    name: '23XI Racing',
    nickname: '23XI',
    founded: '2021',
    hq: 'Denver, NC',
    blurb:
      'Co-owned by Michael Jordan and Denny Hamlin. A young Toyota organization known for speed, swagger, and big-stage moments.',
    color: 'red',
    drivers: [
      { number: '23', name: 'Bubba Wallace' },
      { number: '45', name: 'Tyler Reddick' },
    ],
  },
  {
    id: 'trackhouse',
    name: 'Trackhouse Racing',
    nickname: 'Trackhouse',
    founded: '2021',
    hq: 'Concord, NC',
    blurb:
      'Music-meets-motorsports energy. Aggressive Chevrolet racers who thrive when the field packs up and elbows get out.',
    color: 'blue',
    drivers: [
      { number: '1', name: 'Ross Chastain' },
      { number: '88', name: 'Connor Zilisch' },
      { number: '97', name: 'Shane van Gisbergen' },
      { number: '99', name: 'Daniel Suárez' },
    ],
  },
  {
    id: 'rcr',
    name: 'Richard Childress Racing',
    nickname: 'RCR',
    founded: '1969',
    hq: 'Welcome, NC',
    blurb:
      'Legacy Chevrolet team rooted in the Earnhardt era. Still known for hard racing and emotional fan loyalty.',
    color: 'dark',
    drivers: [
      { number: '3', name: 'Austin Dillon' },
      { number: '8', name: 'Kyle Busch' },
    ],
  },
  {
    id: 'rfk',
    name: 'RFK Racing',
    nickname: 'RFK',
    founded: '1969 (as Roush)',
    hq: 'Concord, NC',
    blurb:
      'Classic Ford team reborn with Brad Keselowski as co-owner. Strong on intermediate tracks and in the long game.',
    color: 'blue',
    drivers: [
      { number: '6', name: 'Brad Keselowski' },
      { number: '17', name: 'Chris Buescher' },
    ],
  },
  {
    id: 'spire',
    name: 'Spire Motorsports',
    nickname: 'Spire',
    founded: '2019',
    hq: 'Mooresville, NC',
    blurb:
      'Fast-growing Chevy program punching above its weight with young talent and opportunistic wins.',
    color: 'orange',
    drivers: [
      { number: '7', name: 'Justin Haley' },
      { number: '71', name: 'Michael McDowell' },
      { number: '77', name: 'Carson Hocevar' },
    ],
  },
  {
    id: 'front-row',
    name: 'Front Row Motorsports',
    nickname: 'FRM',
    founded: '2004',
    hq: 'Mooresville, NC',
    blurb:
      'Underdog Ford team famous for shock superspeedway wins and scrappy race craft.',
    color: 'blue',
    drivers: [
      { number: '4', name: 'Noah Gragson' },
      { number: '34', name: 'Todd Gilliland' },
      { number: '38', name: 'Zane Smith' },
    ],
  },
  {
    id: 'legacy',
    name: 'Legacy Motor Club',
    nickname: 'LMC',
    founded: '2023 (from Petty GMS)',
    hq: 'Statesville, NC',
    blurb:
      'Carries the Petty legacy into a new era with Toyota horsepower and a rebuilt technical ladder.',
    color: 'dark',
    drivers: [
      { number: '42', name: 'John Hunter Nemechek' },
      { number: '43', name: 'Erik Jones' },
    ],
  },
  {
    id: 'haas',
    name: 'Haas Factory Team',
    nickname: 'HFT',
    founded: '2025 (from Stewart-Haas)',
    hq: 'Kannapolis, NC',
    blurb:
      'The Ford successor to Stewart-Haas Racing — streamlined organization still fighting for weekly relevance.',
    color: 'red',
    drivers: [{ number: '41', name: 'Cole Custer' }],
  },
  {
    id: 'wood-brothers',
    name: 'Wood Brothers Racing',
    nickname: 'Wood Bros',
    founded: '1950',
    hq: 'Stuart, VA',
    blurb:
      'NASCAR’s oldest active team. One iconic Ford, huge history, and proud southern roots.',
    color: 'red',
    drivers: [{ number: '21', name: 'Josh Berry' }],
  },
  {
    id: 'kaulig',
    name: 'Kaulig Racing',
    nickname: 'Kaulig',
    founded: '2016',
    hq: 'Mooresville, NC',
    blurb:
      "Chevrolet team best known for road-course savvy and O'Reilly Series success spilling into Cup.",
    color: 'green',
    drivers: [
      { number: '10', name: 'Ty Dillon' },
      { number: '16', name: 'A.J. Allmendinger' },
    ],
  },
  {
    id: 'rick-ware',
    name: 'Rick Ware Racing',
    nickname: 'RWR',
    founded: '2018 (Cup focus)',
    hq: 'Concord, NC',
    blurb:
      'Field-filler turned regular competitor. Multiple Fords/Chevys often rotate drivers week to week.',
    color: 'dark',
    drivers: [
      { number: '15', name: 'Riley Herbst' },
      { number: '51', name: 'Cody Ware / rotating' },
    ],
  },
];

export const TRACK_TYPE_LABELS: Record<TrackType, string> = {
  superspeedway: 'Superspeedway',
  intermediate: 'Intermediate',
  'short-track': 'Short Track',
  'road-course': 'Road Course',
  street: 'Street Course',
};

export const CUP_TRACKS: CupTrack[] = [
  {
    id: 'daytona',
    name: 'Daytona International Speedway',
    location: 'Daytona Beach, FL',
    type: 'superspeedway',
    length: '2.5 miles',
    banking: '31° turns',
    raceStyle: 'Pack racing & huge drafts',
    whyItMatters: 'Home of the Daytona 500 — the Super Bowl of stock car racing.',
    fanTip: 'Expect “The Big One.” Wrecks can collect half the field in one moment.',
  },
  {
    id: 'talladega',
    name: 'Talladega Superspeedway',
    location: 'Lincoln, AL',
    type: 'superspeedway',
    length: '2.66 miles',
    banking: '33° turns',
    raceStyle: 'Wildest pack racing of the year',
    whyItMatters: 'NASCAR’s biggest oval — draft lines and last-lap chaos.',
    fanTip: 'Anyone can win. Longshots love this place.',
  },
  {
    id: 'atlanta',
    name: 'EchoPark Speedway (Atlanta)',
    location: 'Hampton, GA',
    type: 'superspeedway',
    length: '1.54 miles',
    banking: '28° turns',
    raceStyle: 'High-banked pack style after the rebuild',
    whyItMatters: 'A mini-superspeedway closer to a weekly mini-Daytona vibe.',
    fanTip: 'Think side-by-side lanes and sudden multi-car crashes.',
  },
  {
    id: 'charlotte',
    name: 'Charlotte Motor Speedway',
    location: 'Concord, NC',
    type: 'intermediate',
    length: '1.5 miles',
    banking: '24° turns',
    raceStyle: 'Tire wear + long-run speed',
    whyItMatters: 'Capital of NASCAR country and home of the All-Star Race / 600-mile classic.',
    fanTip: 'The Coca-Cola 600 is the longest race of the year — strategies flip after dark.',
  },
  {
    id: 'las-vegas',
    name: 'Las Vegas Motor Speedway',
    location: 'Las Vegas, NV',
    type: 'intermediate',
    length: '1.5 miles',
    banking: '20° turns',
    raceStyle: 'Clean air + aero package races',
    whyItMatters: 'A classic 1.5-mile “cookie cutter” where top teams show roadside speed.',
    fanTip: 'Leaders prefer clean air out front — restarts matter a ton.',
  },
  {
    id: 'texas',
    name: 'Texas Motor Speedway',
    location: 'Fort Worth, TX',
    type: 'intermediate',
    length: '1.5 miles',
    banking: '20° / 24° turns',
    raceStyle: 'Wide racing groove & restarts',
    whyItMatters: 'Southwest staple with a big fan base and playoff history.',
    fanTip: 'Watch the outside lane come alive on green-flag runs.',
  },
  {
    id: 'kansas',
    name: 'Kansas Speedway',
    location: 'Kansas City, KS',
    type: 'intermediate',
    length: '1.5 miles',
    banking: '15–20° progressive',
    raceStyle: 'Grip-dependent intermediate racing',
    whyItMatters: 'Often a barometer for who has a true championship car.',
    fanTip: 'Track “comes in” late — night races get faster as the surface cools.',
  },
  {
    id: 'homestead',
    name: 'Homestead-Miami Speedway',
    location: 'Homestead, FL',
    type: 'intermediate',
    length: '1.5 miles',
    banking: '18–20° progressive',
    raceStyle: 'Multiple grooves & tire management',
    whyItMatters: 'Former championship host with smooth, technical 1.5-mile racing.',
    fanTip: 'Drivers love moving up the banking — look for wide-lane battles.',
  },
  {
    id: 'michigan',
    name: 'Michigan International Speedway',
    location: 'Brooklyn, MI',
    type: 'intermediate',
    length: '2.0 miles',
    banking: '18° turns',
    raceStyle: 'High-speed drafting on a wide oval',
    whyItMatters: 'Biggest pure speedway that isn’t a restrictor-style pack track.',
    fanTip: 'Second-place drafts can slingshot to the lead on the long straights.',
  },
  {
    id: 'pocono',
    name: 'Pocono Raceway',
    location: 'Long Pond, PA',
    type: 'intermediate',
    length: '2.5 miles',
    banking: 'Varying (each turn different)',
    raceStyle: 'Three unique corners — “The Tricky Triangle”',
    whyItMatters: 'No other oval drives like it; setup is a puzzle every week.',
    fanTip: 'Each turn needs a different line. Mistakes equal huge time loss.',
  },
  {
    id: 'indianapolis',
    name: 'Indianapolis Motor Speedway',
    location: 'Speedway, IN',
    type: 'intermediate',
    length: '2.5 miles (oval)',
    banking: '9° turns (flat for NASCAR)',
    raceStyle: 'Flat, historic Brickyard racing',
    whyItMatters: 'The Brickyard 400 is NASCAR on hallowed Indy ground.',
    fanTip: 'Respect the yard of bricks — winners still kiss them.',
  },
  {
    id: 'iowa',
    name: 'Iowa Speedway',
    location: 'Newton, IA',
    type: 'short-track',
    length: '0.875 mile',
    banking: '12–14° progressive',
    raceStyle: 'Technical short-track with multiple grooves',
    whyItMatters: 'Modern addition that rewards car feel and late-race aggression.',
    fanTip: 'Short tracks = contact. Bumper taps are part of the show.',
  },
  {
    id: 'bristol',
    name: 'Bristol Motor Speedway',
    location: 'Bristol, TN',
    type: 'short-track',
    length: '0.533 mile',
    banking: '24–28° (varies by config)',
    raceStyle: 'Thunder valley — loud, tight, physical',
    whyItMatters: 'The most intense weekly atmosphere in NASCAR.',
    fanTip: 'Bring ear protection in person. On TV, watch the top vs bottom groove war.',
  },
  {
    id: 'martinsville',
    name: 'Martinsville Speedway',
    location: 'Ridgeway, VA',
    type: 'short-track',
    length: '0.526 mile',
    banking: '12° turns',
    raceStyle: 'Paper-clip short track, bumper fighting',
    whyItMatters: 'Oldest NASCAR track still hosting Cup — pure skill and nerve.',
    fanTip: 'The “clock” trophy is unique. Expect pushing into Turn 1 / Turn 3.',
  },
  {
    id: 'richmond',
    name: 'Richmond Raceway',
    location: 'Richmond, VA',
    type: 'short-track',
    length: '0.75 mile',
    banking: '14° turns',
    raceStyle: 'Night short-track rhythm racing',
    whyItMatters: 'A “thinker’s” short track — strategy and restarts decide it.',
    fanTip: 'Late cautions shuffle the deck. Track position is king.',
  },
  {
    id: 'phoenix',
    name: 'Phoenix Raceway',
    location: 'Avondale, AZ',
    type: 'short-track',
    length: '1.0 mile',
    banking: '10–11° turns',
    raceStyle: 'Dogleg mile with clutch restarts',
    whyItMatters: 'Regular-season opener vibes and frequent championship host.',
    fanTip: 'The dogleg entry is where passes and wrecks begin.',
  },
  {
    id: 'north-wilkesboro',
    name: 'North Wilkesboro Speedway',
    location: 'North Wilkesboro, NC',
    type: 'short-track',
    length: '0.625 mile',
    banking: '14° turns',
    raceStyle: 'Old-school short-track throwback',
    whyItMatters: 'Historic track revived for modern Cup — pure nostalgia racing.',
    fanTip: 'Expect vintage vibes and grinding tire fall-off.',
  },
  {
    id: 'darlington',
    name: 'Darlington Raceway',
    location: 'Darlington, SC',
    type: 'intermediate',
    length: '1.366 miles',
    banking: 'Asymmetric oval',
    raceStyle: '“Too Tough to Tame” wall-riding',
    whyItMatters: 'NASCAR’s original superspeedway — the throwback race icon.',
    fanTip: '“Darlington stripe” = painting the wall. Survival equals glory.',
  },
  {
    id: 'dover',
    name: 'Dover Motor Speedway',
    location: 'Dover, DE',
    type: 'intermediate',
    length: '1.0 mile',
    banking: '24° turns',
    raceStyle: 'High-banked “Monster Mile”',
    whyItMatters: 'A unique concrete mile that punishes loose cars.',
    fanTip: 'Concrete bites. Small mistakes become big wrecks.',
  },
  {
    id: 'new-hampshire',
    name: 'New Hampshire Motor Speedway',
    location: 'Loudon, NH',
    type: 'intermediate',
    length: '1.058 miles',
    banking: '2–7° turns · ~1° straights (flat “Magic Mile”)',
    raceStyle: 'Flat abrasive mile — mechanical grip & track position',
    whyItMatters:
      'New England’s Cup home and a regular-season finale pair with Daytona. The Dollar Tree 301 (301 laps) decides Chase cut-line drama before the plate race.',
    fanTip:
      'Hard to pass; clean air wins. Watch right-front tire wear on long greens and pit-road undercuts under yellow.',
  },
  {
    id: 'nashville',
    name: 'Nashville Superspeedway',
    location: 'Lebanon, TN',
    type: 'intermediate',
    length: '1.333 miles',
    banking: '14° turns',
    raceStyle: 'Concrete intermediate with music-city energy',
    whyItMatters: 'Newer staple on the schedule with growing fan culture.',
    fanTip: 'Concrete heats up — tire strategy swings late.',
  },
  {
    id: 'sonoma',
    name: 'Sonoma Raceway',
    location: 'Sonoma, CA',
    type: 'road-course',
    length: '~2.4 miles',
    raceStyle: 'Rolling hills, elevation, braking zones',
    whyItMatters: 'West Coast road-course classic with wine-country views.',
    fanTip: 'Road-course ringers and Cup stars can both shine here.',
  },
  {
    id: 'watkins-glen',
    name: 'Watkins Glen International',
    location: 'Watkins Glen, NY',
    type: 'road-course',
    length: '2.45 miles',
    raceStyle: 'Fast esses + the bus stop chicane',
    whyItMatters: 'The most famous natural road course on the Cup calendar.',
    fanTip: 'Watch the Esses — small bobbles become big spinouts.',
  },
  {
    id: 'cota',
    name: 'Circuit of the Americas',
    location: 'Austin, TX',
    type: 'road-course',
    length: '3.41 miles',
    raceStyle: 'Modern F1-style layout, long elevation climb',
    whyItMatters: 'Longest road course Cup visits — pure road-racing craft.',
    fanTip: 'Turn 1 uphill is a pass hotspot on restarts.',
  },
  {
    id: 'chicago-street',
    name: 'Chicago Street Course',
    location: 'Chicago, IL',
    type: 'street',
    length: '~2.2 miles',
    raceStyle: 'Tight city walls, wet-weather drama',
    whyItMatters: 'Proves Cup can race downtown like IndyCar-style circuits.',
    fanTip: 'Rain flips everything. Patience beats hero moves into barriers.',
  },
  {
    id: 'san-diego',
    name: 'San Diego Street Course',
    location: 'San Diego, CA',
    type: 'street',
    length: 'Street layout (varies)',
    raceStyle: 'Coastal street racing — precision over power',
    whyItMatters: 'Newer street-course stop expanding Cup’s city footprint.',
    fanTip: 'Walls punish insult. Clean laps beat all-or-nothing dives.',
  },
];

export const TEAM_COLOR_CLASSES: Record<
  CupTeam['color'],
  { border: string; badge: string; soft: string }
> = {
  red: {
    border: 'border-t-nascar-red',
    badge: 'bg-nascar-red text-white',
    soft: 'bg-nascar-red/10 text-nascar-red',
  },
  blue: {
    border: 'border-t-nascar-blue',
    badge: 'bg-nascar-blue text-white',
    soft: 'bg-nascar-blue/10 text-nascar-blue',
  },
  dark: {
    border: 'border-t-foreground',
    badge: 'bg-foreground text-background',
    soft: 'bg-secondary text-foreground',
  },
  orange: {
    border: 'border-t-series-truck',
    badge: 'bg-series-truck text-white',
    soft: 'bg-series-truck/10 text-series-truck',
  },
  green: {
    border: 'border-t-series-arca',
    badge: 'bg-series-arca text-white',
    soft: 'bg-series-arca/10 text-series-arca',
  },
};

export const TRACK_TYPE_BADGE: Record<TrackType, string> = {
  superspeedway: 'bg-nascar-red/15 text-nascar-red border-nascar-red/30',
  intermediate: 'bg-nascar-blue/15 text-nascar-blue border-nascar-blue/30',
  'short-track': 'bg-series-truck/15 text-series-truck border-series-truck/30',
  'road-course': 'bg-series-arca/15 text-series-arca border-series-arca/30',
  street: 'bg-series-indycar/15 text-series-indycar border-series-indycar/30',
};
