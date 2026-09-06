import type {
  CareerChapter,
  DriverImage,
  FactPair,
  HardwareItem,
} from "@/lib/cup-top10-drivers";

export type LegendDriverProfile = {
  slug: string;
  name: string;
  legalName: string;
  nickname: string;
  car: string;
  team: string;
  manufacturer: "Chevrolet" | "Ford" | "Toyota";
  era: string;
  born: string;
  birthDateISO: string;
  died?: string;
  deathDateISO?: string;
  birthplace: string;
  hometown: string;
  twitter?: string;
  wikipedia: string;
  headline: string;
  lede: string;
  facts: FactPair[];
  family: FactPair[];
  familyNote: string;
  childhoodHeading: string;
  childhood: string[];
  hometownHeading: string;
  hometownBody: string[];
  hometownSnapshot: FactPair[];
  raceCarHeading: string;
  raceCarBody: string;
  extraKicker: string;
  extraHeading: string;
  extraBody: string;
  extraItems: HardwareItem[];
  career: CareerChapter[];
  trophies: HardwareItem[];
  statsLine: string;
  images: {
    hero: DriverImage;
    hometown: DriverImage;
    raceCar: DriverImage;
  };
  metaTitle: string;
  metaDescription: string;
};

const WIKI = "https://upload.wikimedia.org/wikipedia/commons";

export const NASCAR_LEGEND_PROFILES: LegendDriverProfile[] = [
  {
    slug: "dale-earnhardt",
    name: "Dale Earnhardt",
    legalName: "Ralph Dale Earnhardt",
    nickname: "The Intimidator",
    car: "3",
    team: "Richard Childress Racing",
    manufacturer: "Chevrolet",
    era: "1951 – 2001",
    born: "April 29, 1951",
    birthDateISO: "1951-04-29",
    died: "February 18, 2001",
    deathDateISO: "2001-02-18",
    birthplace: "Kannapolis, North Carolina",
    hometown: "Kannapolis, North Carolina",
    wikipedia: "https://en.wikipedia.org/wiki/Dale_Earnhardt",
    headline: "The man in black who made the third groove a warning",
    lede: "Seven Cup titles. 76 wins. One Daytona 500 that took twenty years. Ralph Dale Earnhardt turned a mill-town kid into the most feared number in stock car racing.",
    facts: [
      { label: "Car", value: "#3 Chevrolet" },
      { label: "Team", value: "Richard Childress Racing" },
      { label: "Born", value: "April 29, 1951" },
      { label: "Hometown", value: "Kannapolis, N.C." },
      { label: "Cup titles", value: "7" },
      { label: "Cup wins", value: "76" },
    ],
    family: [
      { label: "Father", value: "Ralph Earnhardt" },
      { label: "Spouse", value: "Teresa Earnhardt" },
      { label: "Kids", value: "Kerry, Kelley, Dale Jr., Taylor" },
      { label: "Nickname", value: "The Intimidator · Ironhead" },
    ],
    familyNote:
      "Dale was Ralph Earnhardt's boy from the Kannapolis short-track dirt. Kerry, Kelley, and Dale Jr. all raced. Taylor came later with Teresa. The No. 3 became a family crest the sport never put down.",
    childhoodHeading: "Kannapolis mill kid. Dirt under the fingernails.",
    childhood: [
      "Ralph Dale Earnhardt was born April 29, 1951 in Kannapolis, a mill town north of Charlotte. His father Ralph was already a North Carolina short-track name. The shop, the dirt, and the mill whistle were the whole map.",
      "Dale quit school early, worked, and raced whatever he could keep running. The lesson was not pretty: if the car is still together, you find a hole and take it. Kannapolis called that toughness. The rest of America would call it The Intimidator.",
      "By the mid-1970s the hobby was a job. Cup was next. Nobody in that mill neighborhood was planning seven championships.",
    ],
    hometownHeading: "Kannapolis on the birth certificate. Childress on race week.",
    hometownBody: [
      "Hometown stays Kannapolis. The mill, the dirt tracks, and the people who watched a skinny kid copy Ralph's line are still the origin story.",
      "The office that mattered later was Richard Childress Racing in Welcome, North Carolina. The black GM Goodwrench Chevrolet was the weekday religion. The No. 3 was the Sunday one.",
    ],
    hometownSnapshot: [
      { label: "Born", value: "Kannapolis, N.C. · April 29, 1951" },
      { label: "Hometown", value: "Kannapolis, North Carolina" },
      { label: "Shop", value: "Welcome · Richard Childress Racing" },
      { label: "Last race", value: "2001 Daytona 500" },
    ],
    raceCarHeading: "The black No. 3",
    raceCarBody:
      "Most fans met him in the GM Goodwrench Chevrolet: black paint, silver 3, Childress underneath. The 1998 Daytona 500 car is the one that finally paid the Super Bowl of stock cars. Twenty years of coming close, then a burnout in the grass.",
    extraKicker: "Why the sport still whispers 3",
    extraHeading: "Fear as a race craft",
    extraBody:
      "Earnhardt did not invent aggressive Cup racing. He made it a brand. Bumper to bumper on the last restart, the third groove at Daytona, the stare through the sunglasses. Rivals planned for the black car first.",
    extraItems: [
      { name: "Seven Cup titles", detail: "1980, 1986, 1987, 1990, 1991, 1993, 1994. Only Petty matches the count." },
      { name: "76 Cup wins", detail: "Including the 1998 Daytona 500, the Brickyard, and a stack of restrictor-plate master classes." },
      { name: "The Intimidator", detail: "Man in Black, Ironhead. The nicknames were scouting reports." },
      { name: "Hall of Fame", detail: "Inaugural NASCAR Hall of Fame class, 2010." },
    ],
    career: [
      {
        years: "1951 – 1978",
        title: "Ralph's boy gets a Cup ride",
        body: "Kannapolis dirt, short-track nights, then a Cup debut in 1975. The résumé was not polished. The right foot was. By 1979 he was a full-time Winston Cup rookie who won, wrecked, and made people remember the name.",
      },
      {
        years: "1979 – 1981",
        title: "Rookie, then a title, then Childress",
        body: "Rookie of the Year in 1979. First Cup championship in 1980 with Rod Osterlund. When the owner sold, Earnhardt landed at Richard Childress Racing. The partnership later rewired the sport.",
      },
      {
        years: "1986 – 1994",
        title: "The dynasty in black",
        body: "Six more titles in eight seasons. Restrictor-plate yards, short-track nights, and a presence in the garage that changed how drivers talked about the finish. The 3 was the car you moved for, or didn't, and paid for later.",
      },
      {
        years: "1998",
        title: "The Daytona 500 that finally landed",
        body: "Twenty years of heartbreak on the biggest Sunday. In 1998 he won it. The entire pit road climbed the wall. For a driver who already had six titles, that one race was still the hole in the trophy case.",
      },
      {
        years: "February 18, 2001",
        title: "Last lap at Daytona",
        body: "Earnhardt died in a last-lap crash at the 2001 Daytona 500 while blocking for his teammates. He was 49. The sport changed its cars, its walls, and its memory. The No. 3 still rides as unfinished business.",
      },
    ],
    trophies: [
      { name: "7 Cup championships", detail: "Tied with Richard Petty and Jimmie Johnson" },
      { name: "76 Cup wins", detail: "Seventh on the all-time list" },
      { name: "1998 Daytona 500", detail: "The one that took two decades" },
      { name: "NASCAR Hall of Fame", detail: "Inaugural class, 2010" },
    ],
    statsLine: "7 Cup titles · 76 Cup wins · 1998 Daytona 500 · RCR No. 3 Chevrolet",
    images: {
      hero: {
        src: `${WIKI}/3/3f/Dale_Earnhardt_visits_Langley_AFB.jpg`,
        alt: "Dale Earnhardt at Langley Air Force Base in his black GM Goodwrench firesuit",
        credit: "U.S. Air Force · TSGT Jack Braden · Langley AFB",
      },
      hometown: {
        src: `${WIKI}/e/e7/Dale_Earnhardt_-_NASCAR_Photography_By_Darryl_Moran.jpg`,
        alt: "Dale Earnhardt in sunglasses and black firesuit",
        credit: "Wikimedia Commons · Darryl Moran",
      },
      raceCar: {
        src: `${WIKI}/4/44/Dale_Earnhardt_1998_Daytona_500_Car.jpg`,
        alt: "Dale Earnhardt's black No. 3 Chevrolet, the 1998 Daytona 500 winner",
        credit: "Wikimedia Commons · Chris Short / Flickr · 1998 Daytona 500",
      },
    },
    metaTitle: "Dale Earnhardt | 7-Time Cup Champion",
    metaDescription:
      "Dale Earnhardt bio: Kannapolis roots, 7 Cup titles, 76 wins, the 1998 Daytona 500, and the black No. 3 Chevrolet.",
  },
  {
    slug: "kyle-busch",
    name: "Kyle Busch",
    legalName: "Kyle Thomas Busch",
    nickname: "Rowdy",
    car: "8",
    team: "Richard Childress Racing",
    manufacturer: "Chevrolet",
    era: "1985 – 2026",
    born: "May 2, 1985",
    birthDateISO: "1985-05-02",
    died: "May 21, 2026",
    deathDateISO: "2026-05-21",
    birthplace: "Las Vegas, Nevada",
    hometown: "Las Vegas, Nevada",
    twitter: "KyleBusch",
    wikipedia: "https://en.wikipedia.org/wiki/Kyle_Busch",
    headline: "Rowdy, the desert kid who won everywhere",
    lede: "Two Cup titles. 63 Cup wins. 234 victories across NASCAR's three national series, more than anyone. Las Vegas made him. Joe Gibbs made him a champion. The Richard Childress Racing No. 8 was his last full-time ride.",
    facts: [
      { label: "Car", value: "#8 Chevrolet" },
      { label: "Last team", value: "Richard Childress Racing" },
      { label: "Born", value: "May 2, 1985" },
      { label: "Hometown", value: "Las Vegas, Nevada" },
      { label: "Cup titles", value: "2 · 2015, 2019" },
      { label: "National wins", value: "234" },
    ],
    family: [
      { label: "Spouse", value: "Samantha Busch" },
      { label: "Kids", value: "Brexton Locke and Lennix Key" },
      { label: "Brother", value: "Kurt Busch · 2004 Cup champion" },
      { label: "Nickname", value: "Rowdy" },
    ],
    familyNote:
      "Kyle married Samantha Sarcinella on New Year's Eve 2010. They have a son, Brexton Locke (2015), and a daughter, Lennix Key (2022). Kurt was the older brother who made Las Vegas a Cup last name before Rowdy tried to out-win him.",
    childhoodHeading: "Vegas short tracks. Kurt's little brother.",
    childhood: [
      "Kyle Thomas Busch was born May 2, 1985 in Las Vegas. The family business was racing. Kurt got there first. Kyle showed up with a temper, a right foot, and a habit of winning the class he was supposed to be learning.",
      "Legends cars, late models, then NASCAR's national ladder while still a teenager. Hendrick Motorsports put him in the system. The desert did not raise a cautious driver.",
      "The nickname Rowdy stuck because it was accurate. He raced like someone who thought second place was a rumor.",
    ],
    hometownHeading: "Las Vegas on the license. Mooresville on race week.",
    hometownBody: [
      "Hometown is Las Vegas: heat, short-track nights, and the first people who watched Kurt's little brother go even faster.",
      "The shops that actually built his cars were in North Carolina. Hendrick first, then Joe Gibbs Racing in Huntersville for the championship years, then Richard Childress Racing in Welcome. The No. 8 Chevrolet is now parked for the family.",
    ],
    hometownSnapshot: [
      { label: "Born", value: "Las Vegas, Nevada · May 2, 1985" },
      { label: "Hometown", value: "Las Vegas, Nevada" },
      { label: "Championship shop", value: "Huntersville · Joe Gibbs Racing" },
      { label: "Last ride", value: "RCR No. 8 · Welcome, N.C." },
    ],
    raceCarHeading: "The No. 18, then the No. 8",
    raceCarBody:
      "Most of the legends were written in Joe Gibbs Racing M&M's Toyota: the No. 18 that won him Homestead twice. In 2023 he moved to Richard Childress Racing and the No. 8 Chevrolet, the last number he took into a full Cup season.",
    extraKicker: "The win column nobody else owns",
    extraHeading: "Cup, O'Reilly, Trucks. All of it.",
    extraBody:
      "Busch is the all-time leader in combined wins across NASCAR's three national series. 63 in Cup. 102 in what is now the O'Reilly Auto Parts Series. 69 in Trucks. 234 total. He also owned Kyle Busch Motorsports, which fed the Truck Series a pipeline of kids who learned by losing to him first.",
    extraItems: [
      { name: "2015 Cup title", detail: "Won the championship at Homestead after missing the first 11 races with a broken leg." },
      { name: "2019 Cup title", detail: "Second title, still in the No. 18 Gibbs Toyota." },
      { name: "2009 Nationwide title", detail: "The second-tier championship that previewed the triple-threat years." },
      { name: "234 national wins", detail: "63 Cup, 102 O'Reilly / Xfinity, 69 Trucks. The combined record." },
    ],
    career: [
      {
        years: "1985 – 2007",
        title: "Hendrick, then the first Cup wins",
        body: "Las Vegas to Hendrick Motorsports. A Cup debut as a teenager. The No. 5 Chevrolet years made him famous, controversial, and impossible to ignore. Hendrick eventually let him walk so both sides could breathe.",
      },
      {
        years: "2008 – 2015",
        title: "Joe Gibbs, the 18, and a title on one good leg",
        body: "The M&M's Toyota years. He piled up wins in Cup, Nationwide, and Trucks, often on the same weekend. In 2015 a Daytona crash broke his leg and cost him the first third of the season. He came back, made the Chase, and won the title at Homestead.",
      },
      {
        years: "2016 – 2022",
        title: "Second championship, then the door at Gibbs",
        body: "The 2019 Cup title was the encore, clinched again at Homestead. Toyota, M&M's, and the No. 18 stayed until after 2022. When Gibbs moved on, Rowdy did too.",
      },
      {
        years: "2023 – 2026",
        title: "Richard Childress and the No. 8",
        body: "RCR signed him for the No. 8 Chevrolet. The 2026 deal was already in place. Then the season stopped. He died May 21, 2026 at 41 after severe pneumonia progressed into sepsis. The family, RCR, and NASCAR announced it together.",
      },
      {
        years: "After May 21, 2026",
        title: "The 8 stays in the family",
        body: "Richard Childress Racing retired the No. 8 until Kyle's son Brexton is ready to take it. The memorial decals showed up on other cars. The win record is still sitting there, waiting for someone who probably will not catch it.",
      },
    ],
    trophies: [
      { name: "2 Cup championships", detail: "2015 and 2019 · Joe Gibbs Racing" },
      { name: "63 Cup wins", detail: "Ninth all-time in the premier series" },
      { name: "234 national wins", detail: "All-time leader across Cup, O'Reilly, Trucks" },
      { name: "RCR No. 8", detail: "Retired until Brexton Busch is ready" },
    ],
    statsLine: "2 Cup titles · 63 Cup wins · 234 national-series wins · RCR No. 8 Chevrolet",
    images: {
      hero: {
        src: `${WIKI}/e/eb/NASCAR_driver_Kyle_Busch_comes_to_Dover_AFB_%287%29_%28cropped%29.jpg`,
        alt: "Kyle Busch in Richard Childress Racing firesuit at Dover Air Force Base",
        credit: "U.S. Air Force · Roland Balik · Dover AFB",
      },
      hometown: {
        src: `${WIKI}/3/34/Kyle_Busch_51_Truck_Sonoma_2022.jpg`,
        alt: "Kyle Busch in the No. 51 Kyle Busch Motorsports truck at Sonoma Raceway in 2022",
        credit: "Wikimedia Commons · TaurusEmerald · Sonoma 2022",
      },
      raceCar: {
        src: `${WIKI}/a/a2/Kyle_Busch_Sonoma_Win_2008.jpg`,
        alt: "Kyle Busch celebrating a 2008 NASCAR win at Sonoma Raceway",
        credit: "Wikimedia Commons · Brian Shamblen / Flickr · Sonoma 2008",
      },
    },
    metaTitle: "Kyle Busch | Rowdy, 2-Time Cup Champion",
    metaDescription:
      "Kyle Busch bio: Las Vegas, 2 Cup titles, 234 national wins. Died May 21, 2026. RCR retired the No. 8.",
  },
];

export const NASCAR_LEGEND_CARDS = NASCAR_LEGEND_PROFILES.map((driver) => ({
  slug: driver.slug,
  href: `/drivers/${driver.slug}`,
  name: driver.name,
  nickname: driver.nickname,
  car: driver.car,
  team: driver.team,
  era: driver.era,
  hometown: driver.hometown,
  statsLine: driver.statsLine,
  portrait: driver.images.hero,
}));

export function getLegendDriver(slug: string): LegendDriverProfile | undefined {
  return NASCAR_LEGEND_PROFILES.find((driver) => driver.slug === slug);
}

export function legendDriverSlugs(): string[] {
  return NASCAR_LEGEND_PROFILES.map((driver) => driver.slug);
}
