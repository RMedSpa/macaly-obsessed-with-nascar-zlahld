/**
 * Cup track desk — Chase 2026 venues.
 *
 * Winner lists are Cup Series points races only (no All-Star / Clash).
 * Compiled Sep 6, 2026 from Racing-Reference / NASCAR.com recaps /
 * Wikipedia race tables / track media notes. Never invent a winner —
 * if a race has not been run, it is omitted.
 *
 * Sources:
 * - https://www.racing-reference.info/
 * - https://nascar-reference.com/tracks/
 * - https://www.nascar.com/ (race recaps + winner galleries)
 * - https://en.wikipedia.org/wiki/2026_NASCAR_Cup_Series
 * - Track media: LVMS winner archive; Charlotte Motor Speedway (oval return)
 */

import { CUP_RACES_2026, type CupRace } from '@/lib/schedule';

export type TrackKind =
  | 'short'
  | 'intermediate'
  | 'superspeedway'
  | 'road'
  | 'street';

export type TrackLayout = 'oval' | 'roval' | 'dirt' | 'paperclip';

export type FunFact = {
  text: string;
  lore?: boolean;
};

export type CupWinner = {
  year: number;
  race: string;
  driver: string;
  car?: string;
  /** Layout / surface note when the track ran more than one config */
  note?: string;
};

export type TrackCalendarRace = {
  name: string;
  date: string;
  dateLabel: string;
  tv: string;
  chase: boolean;
  layout?: string;
  /** Race-day desk flag — do not invent a winner when live. */
  status?: 'upcoming' | 'live' | 'complete';
};

export type CupTrackProfile = {
  slug: string;
  name: string;
  nickname: string;
  location: string;
  kind: TrackKind;
  kindLabel: string;
  chaseOrder: number;
  length: string;
  banking?: string;
  surface: string;
  capacity?: string;
  firstCupYear?: number;
  turns: string;
  quirks: string[];
  history: string;
  winners: CupWinner[];
  winnersNote?: string;
  facts: FunFact[];
  calendar2026: TrackCalendarRace[];
  accent: 'red' | 'cyan' | 'yellow' | 'blue' | 'truck';
  shape: TrackShapeId;
};

export type TrackShapeId =
  | 'darlington'
  | 'gateway'
  | 'bristol'
  | 'kansas'
  | 'vegas'
  | 'charlotte'
  | 'phoenix'
  | 'talladega'
  | 'martinsville'
  | 'homestead';

export const TRACKS_SOURCES =
  'Cup winners compiled from Racing-Reference, NASCAR.com recaps, and Wikipedia race tables. Fan desk — not an official NASCAR stat book.';

export const TRACKS: CupTrackProfile[] = [
  {
    slug: 'darlington',
    name: 'Darlington Raceway',
    nickname: 'The Lady in Black',
    location: 'Darlington, South Carolina',
    kind: 'intermediate',
    kindLabel: 'Intermediate',
    chaseOrder: 1,
    length: '1.366 miles',
    banking: 'T1–T2 25° · T3–T4 23°',
    surface: 'Asphalt',
    firstCupYear: 1950,
    turns: '4 · egg-shaped oval',
    quirks: ['Egg layout', 'Darlington stripe', 'Throwback weekend'],
    history:
      'Darlington opened the paved-superspeedway era with the first Southern 500 in 1950, and the egg still does not drive like anything else on the board. Turns 1 and 2 pinch tighter and steeper than 3 and 4, so a car that is planted on one end can be a handful on the other. The wall writes the story — the Darlington stripe is a paint job you earn, not a souvenir you buy. Labor Day used to own this race; now the Southern 500 opens the 10-race Chase, still 367 laps under the lights. From Mountain Time that is a Sunday afternoon green. Too Tough to Tame is not marketing copy. It is the lap-time tax for missing your mark by a foot.',
    winners: [
      { year: 2026, race: 'Goodyear 400', driver: 'Tyler Reddick', car: '45' },
      { year: 2025, race: 'Cook Out Southern 500', driver: 'Chase Briscoe', car: '19' },
      { year: 2025, race: 'Goodyear 400', driver: 'Denny Hamlin', car: '11' },
      { year: 2024, race: 'Cook Out Southern 500', driver: 'Chase Briscoe', car: '14' },
      { year: 2024, race: 'Goodyear 400', driver: 'Brad Keselowski', car: '6' },
      { year: 2023, race: 'Cook Out Southern 500', driver: 'Kyle Larson', car: '5' },
      { year: 2023, race: 'Goodyear 400', driver: 'William Byron', car: '24' },
      { year: 2022, race: 'Cook Out Southern 500', driver: 'Erik Jones', car: '43' },
      { year: 2022, race: 'Goodyear 400', driver: 'Joey Logano', car: '22' },
      { year: 2021, race: 'Cook Out Southern 500', driver: 'Denny Hamlin', car: '11' },
    ],
    winnersNote:
      'Two Cup dates most years (spring Goodyear 400 + Southern 500). The 2026 Southern 500 is Chase race 1 and is not listed until the checkered flag.',
    facts: [
      { text: 'Asymmetric egg: Turns 1–2 are tighter and steeper than 3–4. One setup has to live in two different corners.' },
      { text: 'The Darlington stripe is the pink scrape you leave on the outside wall when you use every inch — and then one more.' },
      { text: 'First Cup race: 1950 Southern 500. This is the original 500-mile paved stock-car classic.' },
      { text: 'Throwback weekend paints the field in old schemes. The track does the same job it did in 1950.' },
      { text: 'Lady in Black / Too Tough to Tame are booth nicknames that stuck because the wall keeps proving them.', lore: true },
      { text: 'Chase Briscoe went back-to-back in the Southern 500 (2024–25) — #14 Stewart-Haas, then #19 Gibbs.' },
    ],
    calendar2026: [
      {
        name: 'Cook Out Southern 500',
        date: '2026-09-06T15:00:00',
        dateLabel: 'Sun Sep 6, 3:00 PM MDT',
        tv: 'USA Network',
        chase: true,
        status: 'live',
      },
    ],
    accent: 'red',
    shape: 'darlington',
  },
  {
    slug: 'gateway',
    name: 'World Wide Technology Raceway',
    nickname: 'Gateway',
    location: 'Madison, Illinois (St. Louis)',
    kind: 'intermediate',
    kindLabel: 'Intermediate',
    chaseOrder: 2,
    length: '1.250 miles',
    banking: 'Asymmetric egg · modest banks',
    surface: 'Asphalt',
    firstCupYear: 2022,
    turns: '4 · egg-shaped oval',
    quirks: ['1.25-mile egg', 'Midwest date', 'Cup newcomer'],
    history:
      'Gateway sat across the river from St. Louis for years as a Truck and IndyCar house before Cup finally showed up in 2022. The 1.25-mile egg is not a cookie-cutter 1.5 — one end sweeps, the other pinches, and the place drives more like a big short track than Kansas. Joey Logano won the first one. Kyle Busch, Austin Cindric, and Denny Hamlin have the other three trophies. That is the entire Cup book through 2025. The 2026 Chase parks the Enjoy Illinois 300 here on Sept. 13 — first time this track has hosted a postseason race. Mountain clocks: Sunday, 1 p.m. MDT.',
    winners: [
      { year: 2025, race: 'Enjoy Illinois 300', driver: 'Denny Hamlin', car: '11' },
      { year: 2024, race: 'Enjoy Illinois 300', driver: 'Austin Cindric', car: '2' },
      { year: 2023, race: 'Enjoy Illinois 300', driver: 'Kyle Busch', car: '8' },
      { year: 2022, race: 'Enjoy Illinois 300 presented by TicketSmarter', driver: 'Joey Logano', car: '22' },
    ],
    winnersNote:
      'Cup has only four points races here (2022–2025). The 2026 Chase race is the fifth and is not listed until it is official.',
    facts: [
      { text: 'Cup debuted here in 2022, taking a date that had been a second Pocono race.' },
      { text: 'Four Cup winners, four different drivers. Nobody has gone back-to-back — yet.' },
      { text: 'Madison, Illinois, not Missouri. The grandstands look at St. Louis across the Mississippi.' },
      { text: 'The egg is tighter than a 1.5-mile intermediate and meaner than the length suggests.' },
      { text: '2026 is the first Chase weekend at Gateway. New track, old pressure.' },
    ],
    calendar2026: [
      {
        name: 'Enjoy Illinois 300',
        date: '2026-09-13T13:00:00',
        dateLabel: 'Sun Sep 13, 1:00 PM MDT',
        tv: 'USA Network',
        chase: true,
      },
    ],
    accent: 'cyan',
    shape: 'gateway',
  },
  {
    slug: 'bristol',
    name: 'Bristol Motor Speedway',
    nickname: 'Thunder Valley',
    location: 'Bristol, Tennessee',
    kind: 'short',
    kindLabel: 'Short track',
    chaseOrder: 3,
    length: '0.533 mile',
    banking: 'About 24–28°',
    surface: 'Concrete',
    firstCupYear: 1961,
    turns: '4 · high-banked oval',
    quirks: ['Concrete bowl', 'Night race', 'Dirt spring 2021–23'],
    history:
      'Bristol is a half-mile concrete bowl that sounds like a jet engine in a parking garage. The Night Race is the one people fly in for — Saturday lights, bumper tags, and a crowd that never sits down. Spring used to be the same show on a different afternoon; from 2021 through 2023 that date ran on dirt, then Cup poured the concrete back in for 2024. Ty Gibbs took the 2026 Food City 500 in overtime. The Chase date is the Bass Pro Shops Night Race on Saturday, Sept. 19 — 5:30 p.m. Mountain, which is prime time in the hollow. Bring earplugs in person. On TV, watch the top groove come in and the bottom get greedy.',
    winners: [
      { year: 2026, race: 'Food City 500', driver: 'Ty Gibbs', car: '54', note: 'concrete' },
      { year: 2025, race: 'Bass Pro Shops Night Race', driver: 'Christopher Bell', car: '20' },
      { year: 2025, race: 'Food City 500', driver: 'Kyle Larson', car: '5' },
      { year: 2024, race: 'Bass Pro Shops Night Race', driver: 'Kyle Larson', car: '5' },
      { year: 2024, race: 'Food City 500', driver: 'Denny Hamlin', car: '11' },
      { year: 2023, race: 'Bass Pro Shops Night Race', driver: 'Denny Hamlin', car: '11' },
      { year: 2023, race: 'Food City 500', driver: 'Christopher Bell', car: '20', note: 'dirt' },
      { year: 2022, race: 'Bass Pro Shops Night Race', driver: 'Chris Buescher', car: '17' },
      { year: 2022, race: 'Food City Dirt Race', driver: 'Kyle Busch', car: '18', note: 'dirt' },
      { year: 2021, race: 'Bass Pro Shops Night Race', driver: 'Kyle Larson', car: '5' },
    ],
    winnersNote:
      'Spring 2021–2023 ran on a dirt surface (Food City Dirt Race). 2021 spring winner Joey Logano sits just outside this 10-race window.',
    facts: [
      { text: 'Concrete, not asphalt. The surface bites and the walls are close enough to read the numbers.' },
      { text: 'Spring 2021–23 was a dirt experiment. Concrete returned for the 2024 Food City 500.' },
      { text: 'The Night Race is the Saturday-night crown jewel — Chase race 3 in 2026.' },
      { text: 'Last Great Colosseum is the booth name for a bowl that still feels like a stadium, not a speedway.', lore: true },
      { text: 'Ty Gibbs’ 2026 Food City 500 win was his first Cup trophy at Bristol, in overtime (505 laps).' },
    ],
    calendar2026: [
      {
        name: 'Bass Pro Shops Night Race',
        date: '2026-09-19T17:30:00',
        dateLabel: 'Sat Sep 19, 5:30 PM MDT',
        tv: 'USA Network',
        chase: true,
      },
    ],
    accent: 'yellow',
    shape: 'bristol',
  },
  {
    slug: 'kansas',
    name: 'Kansas Speedway',
    nickname: 'The 1.5 in Kansas City',
    location: 'Kansas City, Kansas',
    kind: 'intermediate',
    kindLabel: 'Intermediate',
    chaseOrder: 4,
    length: '1.500 miles',
    banking: '17–20° progressive',
    surface: 'Asphalt',
    firstCupYear: 2001,
    turns: '4 · tri-oval',
    quirks: ['Progressive banks', 'Night grip', 'Aero chess'],
    history:
      'Kansas is the Midwest 1.5 that tells you who has a championship car when the sun drops and the surface comes in. Progressive banking lets drivers climb from the bottom to the fence if the tires are right — and parks them in dirty air if they are not. Tyler Reddick won the 2026 AdventHealth 400 in overtime. The Chase date is the Hollywood Casino 400 on Sept. 27, 1 p.m. Mountain. Long greens sort speed. Restarts shuffle the deck. This is not Bristol. It is a clean-air exam with a late-race temperature drop that can add a tenth if you are still on the wheel.',
    winners: [
      { year: 2026, race: 'AdventHealth 400', driver: 'Tyler Reddick', car: '45' },
      { year: 2025, race: 'Hollywood Casino 400', driver: 'Chase Elliott', car: '9' },
      { year: 2025, race: 'AdventHealth 400', driver: 'Kyle Larson', car: '5' },
      { year: 2024, race: 'Hollywood Casino 400', driver: 'Ross Chastain', car: '1' },
      { year: 2024, race: 'AdventHealth 400', driver: 'Kyle Larson', car: '5' },
      { year: 2023, race: 'Hollywood Casino 400', driver: 'Tyler Reddick', car: '45' },
      { year: 2023, race: 'AdventHealth 400', driver: 'Denny Hamlin', car: '11' },
      { year: 2022, race: 'Hollywood Casino 400', driver: 'Bubba Wallace', car: '23' },
      { year: 2022, race: 'AdventHealth 400', driver: 'Kurt Busch', car: '45' },
      { year: 2021, race: 'Hollywood Casino 400', driver: 'Kyle Larson', car: '5' },
    ],
    facts: [
      { text: 'Opened 2001. Cup has been here from the first season the lights went on.' },
      { text: 'Kyle Larson’s 2024 AdventHealth 400 win was 0.001 seconds — listed as the closest finish in Cup history.' },
      { text: 'Progressive banking (about 17–20°) lets a second lane live when the surface grips up at night.' },
      { text: 'Bubba Wallace’s 2022 Hollywood Casino 400 was his second career Cup win, in the 23XI #23.' },
      { text: 'Two dates most years: spring AdventHealth 400, fall Hollywood Casino 400 (the 2026 Chase race).' },
    ],
    calendar2026: [
      {
        name: 'Hollywood Casino 400',
        date: '2026-09-27T13:00:00',
        dateLabel: 'Sun Sep 27, 1:00 PM MDT',
        tv: 'USA Network',
        chase: true,
      },
    ],
    accent: 'blue',
    shape: 'kansas',
  },
  {
    slug: 'las-vegas',
    name: 'Las Vegas Motor Speedway',
    nickname: 'The 1.5 in the desert',
    location: 'Las Vegas, Nevada',
    kind: 'intermediate',
    kindLabel: 'Intermediate',
    chaseOrder: 5,
    length: '1.500 miles',
    banking: '20° turns · 9° straights',
    surface: 'Asphalt',
    firstCupYear: 1998,
    turns: '4 · D-shaped oval',
    quirks: ['Clean air', '20° banks', 'Desert night'],
    history:
      'Vegas is the desert 1.5 — 20 degrees in the corners, a D-shape, and a long enough straight that dirty air still wrecks a nose. Denny Hamlin took the 2026 Pennzoil 400 after a pit-road speeding penalty, leading 134 of 267. The Chase date is the South Point 400 on Oct. 4, 3:30 p.m. Mountain — still Saturday-night energy on a Sunday clock if you are watching from the West. Track position pays. Restarts pay more. If you are fifth and the leader is in clean air, you are in a different race.',
    winners: [
      { year: 2026, race: 'Pennzoil 400 presented by Jiffy Lube', driver: 'Denny Hamlin', car: '11' },
      { year: 2025, race: 'South Point 400', driver: 'Denny Hamlin', car: '11' },
      { year: 2025, race: 'Pennzoil 400 presented by Jiffy Lube', driver: 'Josh Berry', car: '21' },
      { year: 2024, race: 'South Point 400', driver: 'Joey Logano', car: '22' },
      { year: 2024, race: 'Pennzoil 400 presented by Jiffy Lube', driver: 'Kyle Larson', car: '5' },
      { year: 2023, race: 'South Point 400', driver: 'Kyle Larson', car: '5' },
      { year: 2023, race: 'Pennzoil 400 presented by Jiffy Lube', driver: 'William Byron', car: '24' },
      { year: 2022, race: 'South Point 400', driver: 'Joey Logano', car: '22' },
      { year: 2022, race: 'Pennzoil 400 presented by Jiffy Lube', driver: 'Alex Bowman', car: '48' },
      { year: 2021, race: 'South Point 400', driver: 'Denny Hamlin', car: '11' },
    ],
    facts: [
      { text: 'First Cup race: 1998. The 1.5-mile oval replaced the old 1-mile layout before Cup arrived.' },
      { text: 'Hamlin’s 2026 Pennzoil 400 was his third Vegas Cup win after the 2021 and 2025 fall dates.' },
      { text: 'Josh Berry’s 2025 Pennzoil 400 put the Wood Brothers #21 in Victory Lane in the desert.' },
      { text: '20° corner banking is steeper than Kansas, flatter than Bristol — a classic intermediate package.' },
      { text: 'Joey Logano has multiple South Point 400 trophies in this window (2022, 2024).' },
    ],
    calendar2026: [
      {
        name: 'South Point 400',
        date: '2026-10-04T15:30:00',
        dateLabel: 'Sun Oct 4, 3:30 PM MDT',
        tv: 'USA Network',
        chase: true,
      },
    ],
    accent: 'yellow',
    shape: 'vegas',
  },
  {
    slug: 'charlotte',
    name: 'Charlotte Motor Speedway',
    nickname: 'The home office',
    location: 'Concord, North Carolina',
    kind: 'intermediate',
    kindLabel: 'Intermediate (oval)',
    chaseOrder: 6,
    length: '1.500 miles (oval)',
    banking: '24° turns · 5° straights',
    surface: 'Asphalt',
    firstCupYear: 1960,
    turns: '4 on the oval · 17 on the Roval',
    quirks: ['2026 Chase is the oval', 'Roval 2018–25', 'Coca-Cola 600'],
    history:
      'Call this one carefully. The 2026 Chase race is not the Roval. On Feb. 3, 2026, Charlotte Motor Speedway announced the Bank of America 400 returns to the 1.5-mile quad-oval — first fall oval since 2017, after eight Roval years (2018–2025). Shane van Gisbergen won the last Roval Cup race in 2025. Daniel Suárez won the 2026 Coca-Cola 600 on the oval under caution. The 600 is still Memorial Day’s 400-lap grind. The Chase date is Oct. 11, 1 p.m. Mountain, 267 laps on the 24-degree banks. Infield road-course ghosts stay on the graphic so you remember what the playoff used to be.',
    winners: [
      { year: 2026, race: 'Coca-Cola 600', driver: 'Daniel Suárez', car: '7', note: 'oval' },
      { year: 2025, race: 'Bank of America Roval 400', driver: 'Shane van Gisbergen', car: '88', note: 'Roval' },
      { year: 2025, race: 'Coca-Cola 600', driver: 'Ross Chastain', car: '1', note: 'oval' },
      { year: 2024, race: 'Bank of America Roval 400', driver: 'Kyle Larson', car: '5', note: 'Roval' },
      { year: 2024, race: 'Coca-Cola 600', driver: 'Christopher Bell', car: '20', note: 'oval · rain-shortened' },
      { year: 2023, race: 'Bank of America Roval 400', driver: 'AJ Allmendinger', car: '16', note: 'Roval' },
      { year: 2023, race: 'Coca-Cola 600', driver: 'Ryan Blaney', car: '12', note: 'oval' },
      { year: 2022, race: 'Bank of America Roval 400', driver: 'Christopher Bell', car: '20', note: 'Roval' },
      { year: 2022, race: 'Coca-Cola 600', driver: 'Denny Hamlin', car: '11', note: 'oval' },
      { year: 2021, race: 'Bank of America Roval 400', driver: 'Kyle Larson', car: '5', note: 'Roval' },
    ],
    winnersNote:
      'Last 10 Cup points races at the facility, oval and Roval labeled. The 2026 Bank of America 400 (Chase) is scheduled on the 1.5-mile oval — not the Roval. Exhibition All-Star races are omitted.',
    facts: [
      { text: '2026 Chase race is the Bank of America 400 on the 1.5-mile oval — confirmed by the speedway on Feb. 3, 2026.' },
      { text: 'The Roval hosted the fall Cup race from 2018 through 2025. SVG won the last one.' },
      { text: 'Coca-Cola 600 remains the longest points race on the calendar (400 laps / 600 miles when it goes the distance).' },
      { text: '2024 600 was rain-shortened. Christopher Bell was declared the winner after 249 laps.' },
      { text: 'Most Cup shops sit in the Charlotte metro. This is the home office with 24° banks.' },
      { text: 'Roval length ran about 2.28 miles, then ~2.32 after a 2024 tweak. The Chase graphic this year is the oval.' },
    ],
    calendar2026: [
      {
        name: 'Bank of America 400',
        date: '2026-10-11T13:00:00',
        dateLabel: 'Sun Oct 11, 1:00 PM MDT',
        tv: 'USA Network',
        chase: true,
        layout: '1.5-mile oval (not the Roval)',
      },
    ],
    accent: 'red',
    shape: 'charlotte',
  },
  {
    slug: 'phoenix',
    name: 'Phoenix Raceway',
    nickname: 'The dogleg mile',
    location: 'Avondale, Arizona',
    kind: 'short',
    kindLabel: 'Short track · flat mile',
    chaseOrder: 7,
    length: '1.000 mile',
    banking: '10–11° turns · 9° dogleg',
    surface: 'Asphalt',
    firstCupYear: 1988,
    turns: '4 + dogleg',
    quirks: ['Dogleg', 'Flat mile', 'Not the 2026 finale'],
    history:
      'Phoenix is a full mile with a dogleg that turns the backstretch into a passing lane and a wrecking yard. TV still calls it a short track. The car calls it a flat mile. Ryan Blaney won the 2026 Straight Talk Wireless 500 in March. From 2020 through 2025 this desert mile also hosted Championship Weekend — that job moves to Homestead in 2026. The Chase date here is the Freeway Insurance 500 on Oct. 18, mid-Chase, not the title fight. Arizona does not do daylight time; 3 p.m. Eastern is noon in Avondale, 1 p.m. on a Mountain DST clock. Restart the dogleg. That is the whole show.',
    winners: [
      { year: 2026, race: 'Straight Talk Wireless 500', driver: 'Ryan Blaney', car: '12' },
      { year: 2025, race: 'Cup Series Championship Race', driver: 'Ryan Blaney', car: '12' },
      { year: 2025, race: "Shriners Children's 500", driver: 'Christopher Bell', car: '20' },
      { year: 2024, race: 'Cup Series Championship Race', driver: 'Joey Logano', car: '22' },
      { year: 2024, race: "Shriners Children's 500", driver: 'Christopher Bell', car: '20' },
      { year: 2023, race: 'Cup Series Championship Race', driver: 'Ross Chastain', car: '1' },
      { year: 2023, race: 'United Rentals Work United 500', driver: 'William Byron', car: '24' },
      { year: 2022, race: 'Cup Series Championship Race', driver: 'Joey Logano', car: '22' },
      { year: 2022, race: 'Ruoff Mortgage 500', driver: 'Chase Briscoe', car: '14' },
      { year: 2021, race: 'Cup Series Championship Race', driver: 'Kyle Larson', car: '5' },
    ],
    winnersNote:
      '2020–2025 fall races were Championship Weekend. 2026’s title race is at Homestead; Phoenix’s Chase date is Oct. 18, not the finale.',
    facts: [
      { text: 'The dogleg kinks the backstretch. Passes and wrecks start there more than in the numbered turns.' },
      { text: 'This desk files Phoenix as a flat mile / short-track hybrid — 1.0 mile, low banks, physical racing.' },
      { text: 'Championship host 2020–2025. In 2026 the finale rotates to Homestead-Miami.' },
      { text: 'First Cup race: 1988. Alan Kulwicki is the lore name from that November afternoon.', lore: true },
      { text: 'Christopher Bell swept the 2024 and 2025 spring dates before Blaney took March 2026.' },
    ],
    calendar2026: [
      {
        name: 'Freeway Insurance 500',
        date: '2026-10-18T13:00:00',
        dateLabel: 'Sun Oct 18, 1:00 PM MDT · noon in Avondale',
        tv: 'USA Network',
        chase: true,
      },
    ],
    accent: 'blue',
    shape: 'phoenix',
  },
  {
    slug: 'talladega',
    name: 'Talladega Superspeedway',
    nickname: 'Dega',
    location: 'Lincoln, Alabama',
    kind: 'superspeedway',
    kindLabel: 'Superspeedway',
    chaseOrder: 8,
    length: '2.660 miles',
    banking: '33° turns · 16.5° tri-oval',
    surface: 'Asphalt',
    firstCupYear: 1969,
    turns: '4 · tri-oval',
    quirks: ['Longest oval', 'Pack draft', 'The Big One'],
    history:
      'Talladega is the longest oval Cup races — 2.66 miles, 33-degree banks, and a draft that turns 30 cars into one organism. Strategy is fuel, allies, and when to pull the trigger. Carson Hocevar took the 2026 Jack Link’s 500 for his first Cup win after a 26-car pileup in Stage 2. The Chase date is the YellaWood 500 on Oct. 25, noon Mountain, NBC. Nobody is safe. Longshots love this place. The Big One is not folklore; it is a weekly planning assumption. If you are leading at the white flag, check your mirrors twice.',
    winners: [
      { year: 2026, race: "Jack Link's 500", driver: 'Carson Hocevar', car: '77' },
      { year: 2025, race: 'YellaWood 500', driver: 'Chase Briscoe', car: '19' },
      { year: 2025, race: "Jack Link's 500", driver: 'Austin Cindric', car: '2' },
      { year: 2024, race: 'YellaWood 500', driver: 'Ricky Stenhouse Jr.', car: '47' },
      { year: 2024, race: 'GEICO 500', driver: 'Tyler Reddick', car: '45' },
      { year: 2023, race: 'YellaWood 500', driver: 'Ryan Blaney', car: '12' },
      { year: 2023, race: 'GEICO 500', driver: 'Kyle Busch', car: '8' },
      { year: 2022, race: 'YellaWood 500', driver: 'Chase Elliott', car: '9' },
      { year: 2022, race: 'GEICO 500', driver: 'Ross Chastain', car: '1' },
      { year: 2021, race: 'YellaWood 500', driver: 'Bubba Wallace', car: '23', note: 'rain-shortened' },
    ],
    facts: [
      { text: 'Longest oval on the Cup calendar at 2.66 miles. Daytona is 2.5.' },
      { text: '33° turns. The banking does the turning; the draft does the passing.' },
      { text: 'Hocevar’s April 2026 win was his first in Cup. Stenhouse’s 2024 fall win was 0.006 seconds.' },
      { text: 'Bubba Wallace’s first Cup win (Oct. 2021) was rain-shortened after 117 of 188 laps.' },
      { text: 'The Big One is the multi-car wreck the draft invents when someone flinches.', lore: true },
      { text: 'First Cup race: 1969 Talladega 500. Richard Brickhouse won after most stars, led by Petty, boycotted over tires.' },
    ],
    calendar2026: [
      {
        name: 'YellaWood 500',
        date: '2026-10-25T12:00:00',
        dateLabel: 'Sun Oct 25, 12:00 PM MDT',
        tv: 'NBC',
        chase: true,
      },
    ],
    accent: 'cyan',
    shape: 'talladega',
  },
  {
    slug: 'martinsville',
    name: 'Martinsville Speedway',
    nickname: 'The paperclip',
    location: 'Ridgeway, Virginia',
    kind: 'short',
    kindLabel: 'Short track',
    chaseOrder: 9,
    length: '0.526 mile',
    banking: '12° turns',
    surface: 'Asphalt straights · concrete corners',
    firstCupYear: 1949,
    turns: '4 · paperclip',
    quirks: ['Paperclip', 'Concrete corners', 'Grandfather clock'],
    history:
      'Martinsville is the oldest Cup track still on the board — a 0.526-mile paperclip with concrete corners, 12 degrees of banking, and a bumper language all its own. Chase Elliott won the 2026 Cook Out 400 after Denny Hamlin led most of the day. The Chase date is the Xfinity 500 on Nov. 1, noon Mountain — penultimate race, still all 16 cars in it under the 2026 cumulative format. You do not pass people here so much as you convince them. The clock trophy is real. The fence is closer than it looks. If you leave without a mark on the right-front, you were not in the fight.',
    winners: [
      { year: 2026, race: 'Cook Out 400', driver: 'Chase Elliott', car: '9' },
      { year: 2025, race: 'Xfinity 500', driver: 'William Byron', car: '24' },
      { year: 2025, race: 'Cook Out 400', driver: 'Denny Hamlin', car: '11' },
      { year: 2024, race: 'Xfinity 500', driver: 'Ryan Blaney', car: '12' },
      { year: 2024, race: 'Cook Out 400', driver: 'William Byron', car: '24' },
      { year: 2023, race: 'Xfinity 500', driver: 'Ryan Blaney', car: '12' },
      { year: 2023, race: 'NOCO 400', driver: 'Kyle Larson', car: '5' },
      { year: 2022, race: 'Xfinity 500', driver: 'Christopher Bell', car: '20' },
      { year: 2022, race: 'Blue-Emu Maximum Pain Relief 400', driver: 'William Byron', car: '24' },
      { year: 2021, race: 'Xfinity 500', driver: 'Alex Bowman', car: '48' },
    ],
    facts: [
      { text: 'Oldest NASCAR track still hosting Cup. First Cup race: 1949.' },
      { text: 'Paperclip: two long straights, hairpin ends, concrete in the corners, asphalt on the straights.' },
      { text: 'Winners still get a grandfather clock. That trophy is unique on the Cup trail.' },
      { text: 'Ryan Blaney went back-to-back in the fall Xfinity 500 (2023–24).' },
      { text: 'Elliott’s March 2026 win was his first Martinsville Cup trophy since the 2020 fall playoff race.' },
      { text: '“The paperclip” is booth shorthand. It looks like one from the blimp.', lore: true },
    ],
    calendar2026: [
      {
        name: 'Xfinity 500',
        date: '2026-11-01T12:00:00',
        dateLabel: 'Sun Nov 1, 12:00 PM MST',
        tv: 'NBC',
        chase: true,
      },
    ],
    accent: 'truck',
    shape: 'martinsville',
  },
  {
    slug: 'homestead-miami',
    name: 'Homestead-Miami Speedway',
    nickname: 'The championship oval',
    location: 'Homestead, Florida',
    kind: 'intermediate',
    kindLabel: 'Intermediate',
    chaseOrder: 10,
    length: '1.500 miles',
    banking: '18–20° progressive',
    surface: 'Asphalt',
    firstCupYear: 1999,
    turns: '4 · oval',
    quirks: ['Progressive banks', 'Multi-groove', '2026 finale'],
    history:
      'Homestead is a 1.5-mile oval with progressive banking that actually lets you move up — a driver’s track when the championship is on the line. Cup first raced here in 1999. From 2002 through 2019 it hosted Championship Weekend, then Phoenix took the finale (2020–2025). 2026 brings the title fight back: the Straight Talk Wireless 400 on Nov. 8, 1 p.m. Mountain, last of the 10 Chase races, no Championship 4 reset. Kyle Larson won the 2025 spring date. The groove is wide. The banks climb. If you can run the fence and still rotate, you can win a championship the old Homestead way — by being fastest, not by surviving a one-race shootout.',
    winners: [
      { year: 2025, race: 'Straight Talk Wireless 400', driver: 'Kyle Larson', car: '5' },
      { year: 2024, race: 'Straight Talk Wireless 400', driver: 'Tyler Reddick', car: '45' },
      { year: 2023, race: '4EVER 400 Presented by Mobil 1', driver: 'Christopher Bell', car: '20' },
      { year: 2022, race: 'Dixie Vodka 400', driver: 'Kyle Larson', car: '5' },
      { year: 2021, race: 'Dixie Vodka 400', driver: 'William Byron', car: '24' },
      { year: 2020, race: 'Dixie Vodka 400', driver: 'Denny Hamlin', car: '11' },
      { year: 2019, race: 'Ford EcoBoost 400', driver: 'Kyle Busch', car: '18', note: 'championship race' },
      { year: 2018, race: 'Ford EcoBoost 400', driver: 'Joey Logano', car: '22', note: 'championship race' },
      { year: 2017, race: 'Ford EcoBoost 400', driver: 'Martin Truex Jr.', car: '78', note: 'championship race' },
      { year: 2016, race: 'Ford EcoBoost 400', driver: 'Jimmie Johnson', car: '48', note: 'championship race' },
    ],
    winnersNote:
      'One Cup points race most years. 2002–2019 (including 2016–19 on this list) were Championship Weekend. 2020–2025 were not the finale. 2026 returns the title race here.',
    facts: [
      { text: 'Championship host 2002–2019. Phoenix took 2020–2025. Homestead gets the 2026 finale.' },
      { text: 'Progressive 18–20° banking is why drivers talk about “moving up the fence.”' },
      { text: 'Jimmie Johnson’s 2016 win here was his seventh Cup title — last points race of that season.' },
      { text: 'First Cup race: 1999. The oval was rebuilt with variable banking after the original flat 1.5.' },
      { text: '2026 Chase: no elimination rounds. Highest 10-race total after this race is the champion.' },
    ],
    calendar2026: [
      {
        name: 'Straight Talk Wireless 400',
        date: '2026-11-08T13:00:00',
        dateLabel: 'Sun Nov 8, 1:00 PM MST',
        tv: 'NBC',
        chase: true,
        layout: 'Championship race',
      },
    ],
    accent: 'cyan',
    shape: 'homestead',
  },
];

export function trackSlugs(): string[] {
  return TRACKS.map((t) => t.slug);
}

export function getTrack(slug: string): CupTrackProfile | undefined {
  return TRACKS.find((t) => t.slug === slug);
}

export function tracksByChaseOrder(): CupTrackProfile[] {
  return [...TRACKS].sort((a, b) => a.chaseOrder - b.chaseOrder);
}

export function getNextCalendarRace(
  track: CupTrackProfile,
  now: Date = new Date()
): TrackCalendarRace | null {
  const upcoming = track.calendar2026.find((r) => new Date(r.date) > now);
  if (upcoming) return upcoming;
  return (
    track.calendar2026.find((r) => {
      const d = new Date(r.date);
      return (
        r.status === 'live' ||
        (d.getFullYear() === now.getFullYear() &&
          d.getMonth() === now.getMonth() &&
          d.getDate() === now.getDate())
      );
    }) ?? null
  );
}

export function calendarRaceChip(race: TrackCalendarRace | null): {
  kicker: string;
  detail: string;
  live: boolean;
} | null {
  if (!race) return null;
  if (race.status === 'live') {
    return {
      kicker: 'LIVE · race day',
      detail: `${race.name} · ${race.dateLabel}`,
      live: true,
    };
  }
  return {
    kicker: 'Next',
    detail: `${race.name} · ${race.dateLabel}`,
    live: false,
  };
}

/** Match a schedule row to a track desk when names overlap. */
export function scheduleRacesForTrack(
  track: CupTrackProfile,
  now: Date = new Date()
): CupRace | null {
  const names = [track.name, track.nickname];
  return (
    CUP_RACES_2026.find(
      (r) =>
        new Date(r.date) > now &&
        names.some((n) => r.track.toLowerCase().includes(n.toLowerCase().split(' ')[0]))
    ) ?? null
  );
}

export const KIND_LABELS: Record<TrackKind, string> = {
  short: 'Short track',
  intermediate: 'Intermediate',
  superspeedway: 'Superspeedway',
  road: 'Road course',
  street: 'Street',
};

/** Beginners guide track ids → Chase desk slugs (only when a desk exists). */
export const BEGINNER_TRACK_DESK: Record<string, string> = {
  darlington: 'darlington',
  gateway: 'gateway',
  bristol: 'bristol',
  kansas: 'kansas',
  'las-vegas': 'las-vegas',
  charlotte: 'charlotte',
  phoenix: 'phoenix',
  talladega: 'talladega',
  martinsville: 'martinsville',
  homestead: 'homestead-miami',
};
