export type Manufacturer = "Chevrolet" | "Ford" | "Toyota";

export type DriverImage = {
  src: string;
  alt: string;
  credit: string;
};

export type CareerChapter = {
  years: string;
  title: string;
  body: string;
};

export type FactPair = {
  label: string;
  value: string;
};

export type HardwareItem = {
  name: string;
  detail: string;
};

export type CupDriverProfile = {
  slug: string;
  rank: number;
  points: number;
  delta: string;
  name: string;
  legalName: string;
  car: string;
  team: string;
  manufacturer: Manufacturer;
  series: string;
  born: string;
  birthDateISO: string;
  birthplace: string;
  hometown: string;
  residence: string;
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

export type Top10Card = {
  slug: string;
  href: string;
  rank: number;
  name: string;
  car: string;
  team: string;
  manufacturer: Manufacturer;
  hometown: string;
  points: number;
  portrait: DriverImage;
};

const WIKI = "https://upload.wikimedia.org/wikipedia/commons";

const CREDIT_LV26 = "Wikimedia Commons · Las Vegas Motor Speedway, 2026";
const CREDIT_SONOMA26 = "Wikimedia Commons · Sonoma Raceway, 2026";

export const CUP_TOP10_PROFILES: CupDriverProfile[] = [
  {
    slug: "denny-hamlin",
    rank: 1,
    points: 1001,
    delta: "LEADER",
    name: "Denny Hamlin",
    legalName: "James Dennis Alan Hamlin",
    car: "11",
    team: "Joe Gibbs Racing",
    manufacturer: "Toyota",
    series: "NASCAR Cup Series",
    born: "November 18, 1980",
    birthDateISO: "1980-11-18",
    birthplace: "Tampa, Florida",
    hometown: "Chesterfield, Virginia",
    residence:
      "Races out of the Joe Gibbs Racing shop in Huntersville, North Carolina. Virginia is still the origin story.",
    twitter: "dennyhamlin",
    wikipedia: "https://en.wikipedia.org/wiki/Denny_Hamlin",
    headline: "The points leader who still wants the one that got away",
    lede: "64 Cup wins. Three Daytona 500s. A 23XI owner’s hat. And still hunting the championship that everyone swears he is owed.",
    facts: [
      { label: "Car", value: "#11 Toyota" },
      { label: "Team", value: "Joe Gibbs Racing" },
      { label: "Born", value: "November 18, 1980" },
      { label: "Hometown", value: "Chesterfield, Virginia" },
      { label: "Cup wins", value: "64" },
      { label: "2026 Cup", value: "1st · 1,001 pts" },
    ],
    family: [
      { label: "Spouse", value: "Jordan Fish Hamlin" },
      { label: "Kids", value: "Taylor, Jameson, and Drew" },
      { label: "Side hustle", value: "Co-owner, 23XI Racing" },
    ],
    familyNote:
      "Hamlin married Jordan Fish and is dad to two daughters and a son. Off the track he is also a team owner — 23XI Racing, the Michael Jordan shop that fields Tyler Reddick and Bubba Wallace.",
    childhoodHeading: "Chesterfield kid. Tampa birth certificate.",
    childhood: [
      "James Dennis Alan Hamlin was born November 18, 1980 in Tampa and grew up in Chesterfield County, Virginia — short-track country south of Richmond.",
      "The karts came first. Then late models. Then the kind of regional résumé that gets a Joe Gibbs scouting notebook opened. By 2004 he was in a JGR Busch car. By 2006 he was a full-time Cup rookie who finished third in points and won Rookie of the Year.",
      "Virginia still shows up in the way he talks about racing: work the long run, don’t donut the equipment, and never gift a restart.",
    ],
    hometownHeading: "Chesterfield on the license. Huntersville on race week.",
    hometownBody: [
      "Hometown is Chesterfield — courthouse grass, suburban short-track nights, and the first people who watched a skinny kid turn a kart into a career.",
      "Joe Gibbs Racing sits in Huntersville, north of Charlotte. That is the weekday shop, the simulator, and the No. 11 Toyota that currently sits first in Cup points.",
    ],
    hometownSnapshot: [
      { label: "Born", value: "Tampa, Florida · Nov 18, 1980" },
      { label: "Hometown", value: "Chesterfield, Virginia" },
      { label: "Season home", value: "Huntersville · Joe Gibbs Racing" },
      { label: "Owner desk", value: "23XI Racing with Michael Jordan" },
    ],
    raceCarHeading: "The No. 11 Camry",
    raceCarBody:
      "FedEx orange used to be the default. The 2026 spring Vegas scheme is still a Joe Gibbs Toyota — same No. 11, same long-run specialist in the seat. After Loudon he is the Cup points leader at 1,001.",
    extraKicker: "The résumé that still misses one trophy",
    extraHeading: "Daytona, Darlington, and the title hunt",
    extraBody:
      "Hamlin is widely called the greatest Cup driver never to win a championship. The win column does not care. Three Daytona 500s. Three Southern 500s. A Coca-Cola 600. Nineteen playoff berths in twenty tries.",
    extraItems: [
      { name: "Daytona 500", detail: "2016 · 2019 · 2020 — back-to-back with the last two" },
      { name: "Southern 500", detail: "2010 · 2017 · 2021" },
      { name: "Coca-Cola 600", detail: "2022 at Charlotte" },
      { name: "Cup wins", detail: "64 and counting — most ever without a title" },
    ],
    career: [
      {
        years: "2004–06",
        title: "JGR finds him",
        body: "Busch/Xfinity rides for Joe Gibbs, then a 2006 Cup rookie season that ended third in points. The sport learned the name in one year.",
      },
      {
        years: "2010–20",
        title: "Crown jewels",
        body: "Darlington, Daytona, the 600. He stacked the races that make a Hall of Fame case even if the championship trophy never moved.",
      },
      {
        years: "2020–now",
        title: "Driver and owner",
        body: "He and Michael Jordan launched 23XI. Hamlin still drives the No. 11 for Gibbs. After Loudon he leads the 2026 Cup standings.",
      },
    ],
    trophies: [
      { name: "Cup wins", detail: "64" },
      { name: "Daytona 500s", detail: "3" },
      { name: "Owner", detail: "23XI Racing" },
      { name: "2026 points", detail: "1st after Loudon" },
    ],
    statsLine: "2026 Cup through the Dollar Tree 301: 1st · 1,001 points · Joe Gibbs Racing No. 11",
    images: {
      hero: {
        src: `${WIKI}/2/26/Denny_Hamlin_Driver_Introductions_Las_Vegas_2026.jpg`,
        alt: "Denny Hamlin in Joe Gibbs Racing fire suit at Las Vegas driver introductions in 2026",
        credit: CREDIT_LV26,
      },
      hometown: {
        src: `${WIKI}/0/05/Chesterfield_Historic_Courthouse.jpg`,
        alt: "Historic courthouse in Chesterfield, Virginia",
        credit: "Wikimedia Commons · Chesterfield, Virginia",
      },
      raceCar: {
        src: `${WIKI}/8/86/Denny_Hamlin%2C_2026_Las_Vegas_Spring%2C_Cup.jpg`,
        alt: "Denny Hamlin’s No. 11 Joe Gibbs Racing Toyota on pit road at Las Vegas in 2026",
        credit: CREDIT_LV26,
      },
    },
    metaTitle: "Denny Hamlin | #11 JGR, 64 Wins, 2026 Points Leader",
    metaDescription:
      "Denny Hamlin bio: Chesterfield roots, family, 64 Cup wins, three Daytona 500s, 23XI owner. Leads 2026 Cup points after Loudon.",
  },
  {
    slug: "ryan-blaney",
    rank: 2,
    points: 924,
    delta: "-77",
    name: "Ryan Blaney",
    legalName: "Ryan Michael Blaney",
    car: "12",
    team: "Team Penske",
    manufacturer: "Ford",
    series: "NASCAR Cup Series",
    born: "December 31, 1993",
    birthDateISO: "1993-12-31",
    birthplace: "High Point, North Carolina",
    hometown: "High Point, North Carolina",
    residence:
      "A third-generation racer who still talks like the kid from a dirt-modified family, now parked at Team Penske’s Mooresville shop.",
    twitter: "Blaney",
    wikipedia: "https://en.wikipedia.org/wiki/Ryan_Blaney",
    headline: "The 2023 champ just stole Loudon",
    lede: "Lou Blaney’s grandson. Dave Blaney’s kid. The 2023 Cup champion. And the man who took the Dollar Tree 301 by 0.586 seconds.",
    facts: [
      { label: "Car", value: "#12 Ford" },
      { label: "Team", value: "Team Penske" },
      { label: "Born", value: "December 31, 1993" },
      { label: "Hometown", value: "High Point, North Carolina" },
      { label: "Cup title", value: "2023" },
      { label: "2026 Cup", value: "2nd · 924 pts" },
    ],
    family: [
      { label: "Father", value: "Dave Blaney — former Cup driver" },
      { label: "Grandfather", value: "Lou Blaney — dirt modified legend" },
      { label: "Spouse", value: "Gianna Blaney" },
    ],
    familyNote:
      "The Blaneys are a racing family first. Dave ran Cup. Lou packed Ohio dirt tracks. Ryan grew up in that garage — then married Gianna and built his own Penske chapter.",
    childhoodHeading: "A third-generation kid with a quarter-midget trophy",
    childhood: [
      "Ryan Michael Blaney was born New Year’s Eve 1993. The family tree is all race cars: grandfather Lou on the dirt, dad Dave in a Cup seat.",
      "He won his first quarter-midget race at nine. At fifteen he was already second in PASS late-model points and the series Rookie of the Year.",
      "Trucks came next — Brad Keselowski Racing, 2013 ROTY, then a 2014 title fight he lost to Matt Crafton by twenty points. Penske had already seen enough.",
    ],
    hometownHeading: "High Point roots. Penske weekdays.",
    hometownBody: [
      "Hometown is High Point, North Carolina — furniture-city downtown and a short hop from the dirt and late-model tracks that raised a third-generation driver.",
      "Team Penske’s Cup shop is in Mooresville. That is where the No. 12 Ford gets built, and where the 2023 champion plotted the last-stop steal that won Loudon.",
    ],
    hometownSnapshot: [
      { label: "Born", value: "High Point, North Carolina · Dec 31, 1993" },
      { label: "Hometown", value: "High Point, North Carolina" },
      { label: "Season home", value: "Mooresville · Team Penske" },
      { label: "Bloodline", value: "Lou + Dave Blaney" },
    ],
    raceCarHeading: "The No. 12 Mustang",
    raceCarBody:
      "Menards blue on a Penske Ford. Last Sunday it was the car that left New Hampshire with the Dollar Tree 301 trophy after a last-stop call on lap 226. Second in points, 77 back of Hamlin.",
    extraKicker: "Loudon, 2026",
    extraHeading: "He took the Magic Mile late",
    extraBody:
      "The Dollar Tree 301 was a track-position fight. Blaney’s last stop flipped the race. He beat Bubba Wallace to the line by 0.586 seconds and reminded the field why a Penske Ford still ships as a favorite on a flat mile.",
    extraItems: [
      { name: "2023 Cup champion", detail: "Title at Phoenix — first for the No. 12 group" },
      { name: "Dollar Tree 301", detail: "Loudon, Aug 23, 2026 — last-stop steal" },
      { name: "Bloodline", detail: "Third-generation — Lou and Dave Blaney" },
      { name: "Trucks near-miss", detail: "2nd in 2014, 20 points shy of Crafton" },
    ],
    career: [
      {
        years: "2011–14",
        title: "Trucks, then Penske notices",
        body: "Part-time Nationwide and Trucks, then a full BKR Truck season. ROTY in 2013. Title runner-up in 2014. Cup cameos in a Penske Ford.",
      },
      {
        years: "2015–22",
        title: "Wood Brothers to the 12",
        body: "A Wood Brothers Cup seat taught him intermediates. Then Team Penske parked him in the No. 12 and let the wins start stacking.",
      },
      {
        years: "2023–now",
        title: "Champion, then Loudon",
        body: "He closed 2023 as Cup champion. In 2026 he is second in points and the last man to leave New Hampshire with a trophy.",
      },
    ],
    trophies: [
      { name: "Cup championship", detail: "2023" },
      { name: "Dollar Tree 301", detail: "Loudon 2026" },
      { name: "Truck ROTY", detail: "2013" },
      { name: "2026 points", detail: "2nd after Loudon" },
    ],
    statsLine: "2026 Cup through the Dollar Tree 301: 2nd · 924 points · Loudon winner · Team Penske No. 12",
    images: {
      hero: {
        src: `${WIKI}/1/19/Ryan_Blaney_Driver_Introductions_Las_Vegas_2026.jpg`,
        alt: "Ryan Blaney in Team Penske fire suit at Las Vegas driver introductions in 2026",
        credit: CREDIT_LV26,
      },
      hometown: {
        src: `${WIKI}/0/05/Downtown_High_Point%2C_NC.jpg`,
        alt: "Downtown High Point, North Carolina",
        credit: "Wikimedia Commons · High Point, North Carolina",
      },
      raceCar: {
        src: `${WIKI}/0/0c/Ryan_Blaney%2C_2026_Las_Vegas_Spring%2C_Cup.jpg`,
        alt: "Ryan Blaney’s No. 12 Team Penske Ford on pit road at Las Vegas in 2026",
        credit: CREDIT_LV26,
      },
    },
    metaTitle: "Ryan Blaney | #12 Penske, 2023 Champ, Loudon Winner",
    metaDescription:
      "Ryan Blaney bio: High Point roots, Blaney racing family, 2023 Cup title, Penske No. 12. Winner of the 2026 Dollar Tree 301.",
  },
  {
    slug: "ty-gibbs",
    rank: 3,
    points: 880,
    delta: "-121",
    name: "Ty Gibbs",
    legalName: "Tyler Randall Gibbs",
    car: "54",
    team: "Joe Gibbs Racing",
    manufacturer: "Toyota",
    series: "NASCAR Cup Series",
    born: "October 4, 2002",
    birthDateISO: "2002-10-04",
    birthplace: "Charlotte, North Carolina",
    hometown: "Huntersville, North Carolina",
    residence:
      "A Gibbs — grandson of Joe, son of Coy — who lives and works inside the family shop in Huntersville.",
    twitter: "TyGibbs",
    wikipedia: "https://en.wikipedia.org/wiki/Ty_Gibbs",
    headline: "The youngest name in the top three",
    lede: "2021 ARCA champ. 2022 Xfinity champ. Owner of JGR’s No. 54 O’Reilly car. Third in Cup at 23 years old.",
    facts: [
      { label: "Car", value: "#54 Toyota" },
      { label: "Team", value: "Joe Gibbs Racing" },
      { label: "Born", value: "October 4, 2002" },
      { label: "Hometown", value: "Huntersville, North Carolina" },
      { label: "Titles", value: "ARCA 2021 · Xfinity 2022" },
      { label: "2026 Cup", value: "3rd · 880 pts" },
    ],
    family: [
      { label: "Grandfather", value: "Joe Gibbs — NFL Hall of Famer, JGR owner" },
      { label: "Father", value: "Coy Gibbs (1972–2022)" },
      { label: "Mother", value: "Heather Gibbs" },
    ],
    familyNote:
      "Ty is Joe Gibbs’s grandson and the son of Coy Gibbs, who died in November 2022. The family shop is still the weekday address. He also owns JGR’s No. 54 in the O’Reilly Auto Parts Series.",
    childhoodHeading: "Raised in the shop he now drives for",
    childhood: [
      "Tyler Randall Gibbs was born October 4, 2002 in the Charlotte area and grew up around Joe Gibbs Racing the way other kids grow up around a rec league.",
      "Late models and ARCA came early. In 2021 he won the ARCA Menards Series title. In 2022 he won the NASCAR Xfinity Series championship — now the O’Reilly Auto Parts Series — before he had a full Cup season on the résumé.",
      "Coy’s death in 2022 landed in the middle of that climb. The No. 54 Cup car is part tribute, part unfinished family business.",
    ],
    hometownHeading: "Huntersville is the hometown and the employer",
    hometownBody: [
      "Hometown is the same zip as the shop. Mooresville’s Main Street and Huntersville’s JGR campus are the weekday map — no cross-country origin story required.",
      "That is unusual in this garage. Most of the top 10 came from somewhere else. Ty was already in the building.",
    ],
    hometownSnapshot: [
      { label: "Born", value: "Charlotte area · Oct 4, 2002" },
      { label: "Hometown", value: "Huntersville, North Carolina" },
      { label: "Season home", value: "Joe Gibbs Racing campus" },
      { label: "Family shop", value: "JGR · grandfather Joe Gibbs" },
    ],
    raceCarHeading: "The No. 54 Camry",
    raceCarBody:
      "Monster energy and family red on a Joe Gibbs Toyota. After Loudon the kid who used to wander this shop is third in Cup points, 118 behind Hamlin.",
    extraKicker: "Already a champion — twice",
    extraHeading: "ARCA, Xfinity, then the Cup long game",
    extraBody:
      "Most drivers spend a decade collecting national-series hardware. Gibbs did ARCA and Xfinity before his 21st birthday, then climbed into the family Cup car and started stacking top 10s.",
    extraItems: [
      { name: "ARCA champion", detail: "2021 Menards Series" },
      { name: "Xfinity champion", detail: "2022 — now O’Reilly Auto Parts Series" },
      { name: "Team owner", detail: "JGR No. 54 in O’Reilly" },
      { name: "2026 Cup", detail: "3rd after Loudon, age 23" },
    ],
    career: [
      {
        years: "2019–21",
        title: "ARCA, then a title",
        body: "Late models into ARCA. The 2021 championship made the Cup conversation inevitable inside his own building.",
      },
      {
        years: "2021–22",
        title: "Xfinity in a hurry",
        body: "He won the 2022 Xfinity title in the family Toyota. The next step was never going to be anywhere but Joe Gibbs Racing.",
      },
      {
        years: "2023–now",
        title: "The No. 54 Cup seat",
        body: "Full-time Cup in the 54. After Loudon he sits third in 2026 points — the highest a driver this young has lived on this board all year.",
      },
    ],
    trophies: [
      { name: "ARCA title", detail: "2021" },
      { name: "Xfinity title", detail: "2022" },
      { name: "Owner", detail: "JGR No. 54 O’Reilly" },
      { name: "2026 points", detail: "3rd after Loudon" },
    ],
    statsLine: "2026 Cup through the Dollar Tree 301: 3rd · 880 points · Joe Gibbs Racing No. 54",
    images: {
      hero: {
        src: `${WIKI}/5/5a/Ty_Gibbs_Sonoma_2026.jpg`,
        alt: "Ty Gibbs in Joe Gibbs Racing fire suit at Sonoma Raceway in 2026",
        credit: CREDIT_SONOMA26,
      },
      hometown: {
        src: `${WIKI}/d/d7/Mooresville_Historic_District_%28Main_Street%29.jpg`,
        alt: "Main Street in the Mooresville Historic District, North Carolina",
        credit: "Wikimedia Commons · Mooresville, North Carolina",
      },
      raceCar: {
        src: `${WIKI}/6/61/Ty_Gibbs%2C_2026_Las_Vegas_Spring%2C_Cup.jpg`,
        alt: "Ty Gibbs’s No. 54 Joe Gibbs Racing Toyota on pit road at Las Vegas in 2026",
        credit: CREDIT_LV26,
      },
    },
    metaTitle: "Ty Gibbs | #54 JGR, ARCA & Xfinity Champ",
    metaDescription:
      "Ty Gibbs bio: Joe Gibbs’s grandson, 2021 ARCA champ, 2022 Xfinity champ, Huntersville roots. 3rd in 2026 Cup points after Loudon.",
  },
  {
    slug: "tyler-reddick",
    rank: 4,
    points: 860,
    delta: "-141",
    name: "Tyler Reddick",
    legalName: "Tyler George Reddick",
    car: "45",
    team: "23XI Racing",
    manufacturer: "Toyota",
    series: "NASCAR Cup Series",
    born: "January 11, 1996",
    birthDateISO: "1996-01-11",
    birthplace: "Corning, California",
    hometown: "Corning, California",
    residence:
      "A Northern California dirt kid who now works out of 23XI in North Carolina — Hamlin and Jordan’s shop.",
    twitter: "TylerReddick",
    wikipedia: "https://en.wikipedia.org/wiki/Tyler_Reddick",
    headline: "He won the first three of 2026 — including Daytona",
    lede: "Back-to-back Xfinity champ. Closest finish in NASCAR history. Then he opened 2026 by winning the first three Cup races, Daytona 500 included.",
    facts: [
      { label: "Car", value: "#45 Toyota" },
      { label: "Team", value: "23XI Racing" },
      { label: "Born", value: "January 11, 1996" },
      { label: "Hometown", value: "Corning, California" },
      { label: "Titles", value: "Xfinity 2018 · 2019" },
      { label: "2026 Cup", value: "4th · 860 pts" },
    ],
    family: [
      { label: "Partner", value: "Alexa DeLeon" },
      { label: "Kids", value: "Two sons" },
      { label: "Owners", value: "Denny Hamlin & Michael Jordan" },
    ],
    familyNote:
      "Reddick and Alexa DeLeon are raising two boys. The 23XI gig means his boss on race day is also the guy he is chasing in points — Hamlin.",
    childhoodHeading: "Corning, California — olive trees and dirt cars",
    childhood: [
      "Tyler George Reddick was born January 11, 1996 in Corning, a small Northern California town more famous for olives than superspeedways.",
      "He came up the dirt and late-model path, then hit NASCAR’s national series with a chip on his shoulder and a road-course brain.",
      "The Xfinity years made the name national: titles in 2018 and 2019, plus the closest finish in NASCAR history at Daytona — 0.0004 seconds.",
    ],
    hometownHeading: "Corning on the birth certificate. 23XI on the timing stand.",
    hometownBody: [
      "Downtown Corning is still the postcard — water tower, small-town storefronts, a long way from Charlotte.",
      "23XI Racing is the weekday address now. The No. 45 Toyota is the car that opened 2026 on a historic heater: first three Cup races, including the Daytona 500.",
    ],
    hometownSnapshot: [
      { label: "Born", value: "Corning, California · Jan 11, 1996" },
      { label: "Hometown", value: "Corning, California" },
      { label: "Season home", value: "North Carolina · 23XI Racing" },
      { label: "2026 start", value: "Won the first 3 Cup races" },
    ],
    raceCarHeading: "The No. 45 Camry",
    raceCarBody:
      "Jordan-branded 23XI Toyota. Road courses love him. Restrictor plates loved him in February. After Loudon he sits fourth, 139 out of first — the early-season heater now a long-game points fight.",
    extraKicker: "The 2026 launch",
    extraHeading: "Nobody had ever won the first three",
    extraBody:
      "In 2026 Reddick became the first driver in Cup history to win the opening three races of a season, and one of those was the Daytona 500. The rest of the year has been about converting that start into a Chase seat.",
    extraItems: [
      { name: "2026 Daytona 500", detail: "First 500 for Reddick and a 23XI statement" },
      { name: "Historic start", detail: "First driver to win Cup races 1, 2, and 3" },
      { name: "Xfinity titles", detail: "2018 and 2019 back-to-back" },
      { name: "Closest finish", detail: "0.0004 seconds at Daytona, 2018" },
    ],
    career: [
      {
        years: "2014–17",
        title: "Trucks, then a national seat",
        body: "He learned traffic in Trucks before the Xfinity door opened. The California dirt still showed up in how he attacked a corner.",
      },
      {
        years: "2018–19",
        title: "Two Xfinity titles",
        body: "Back-to-back championships, plus that photo-finish at Daytona. Cup teams started calling.",
      },
      {
        years: "2020–now",
        title: "Richard Childress, then 23XI",
        body: "Cup with RCR, then the jump to 23XI’s No. 45. The 2026 season-opening sweep put him on every recap in the country.",
      },
    ],
    trophies: [
      { name: "Daytona 500", detail: "2026" },
      { name: "Xfinity titles", detail: "2018 · 2019" },
      { name: "Season-open sweep", detail: "First 3 of 2026" },
      { name: "2026 points", detail: "4th after Loudon" },
    ],
    statsLine: "2026 Cup through the Dollar Tree 301: 4th · 860 points · 23XI Racing No. 45",
    images: {
      hero: {
        src: `${WIKI}/6/67/Tyler_Reddick_Driver_Introductions_Las_Vegas_2026.jpg`,
        alt: "Tyler Reddick in 23XI Racing fire suit at Las Vegas driver introductions in 2026",
        credit: CREDIT_LV26,
      },
      hometown: {
        src: `${WIKI}/9/93/Downtown_Corning_%282023%29-L1003469.jpg`,
        alt: "Downtown Corning, California",
        credit: "Wikimedia Commons · Corning, California",
      },
      raceCar: {
        src: `${WIKI}/f/f3/Tyler_Reddick%2C_2026_Las_Vegas_Spring%2C_Cup.jpg`,
        alt: "Tyler Reddick’s No. 45 23XI Racing Toyota on pit road at Las Vegas in 2026",
        credit: CREDIT_LV26,
      },
    },
    metaTitle: "Tyler Reddick | #45 23XI, 2026 Daytona 500 Winner",
    metaDescription:
      "Tyler Reddick bio: Corning, California roots, two Xfinity titles, 2026 Daytona 500, first three Cup wins of the year. 4th in points.",
  },
  {
    slug: "christopher-bell",
    rank: 5,
    points: 738,
    delta: "-263",
    name: "Christopher Bell",
    legalName: "Christopher David Bell",
    car: "20",
    team: "Joe Gibbs Racing",
    manufacturer: "Toyota",
    series: "NASCAR Cup Series",
    born: "December 16, 1994",
    birthDateISO: "1994-12-16",
    birthplace: "Norman, Oklahoma",
    hometown: "Norman, Oklahoma",
    residence:
      "An Oklahoma dirt racer who spends the Cup season at Joe Gibbs Racing and still looks like he packed a Chili Bowl helmet in the bag.",
    twitter: "CBellRacing",
    wikipedia: "https://en.wikipedia.org/wiki/Christopher_Bell_(racing_driver)",
    headline: "Norman dirt. Gibbs No. 20. Still a midget guy.",
    lede: "2017 Truck champion. Chili Bowl regular. The smooth Toyota driver who can still slide a midget like he never left Oklahoma.",
    facts: [
      { label: "Car", value: "#20 Toyota" },
      { label: "Team", value: "Joe Gibbs Racing" },
      { label: "Born", value: "December 16, 1994" },
      { label: "Hometown", value: "Norman, Oklahoma" },
      { label: "Title", value: "Trucks 2017" },
      { label: "2026 Cup", value: "5th · 738 pts" },
    ],
    family: [
      { label: "Spouse", value: "Morgan Bell" },
      { label: "Married", value: "February 2, 2020" },
      { label: "Home dirt", value: "Norman, Oklahoma" },
    ],
    familyNote:
      "Bell married Morgan (Kemenah) Bell in 2020. The Oklahoma accent never left. Neither did the dirt dates on the off-week calendar.",
    childhoodHeading: "Sooner State, then every indoor midget that mattered",
    childhood: [
      "Christopher David Bell was born December 16, 1994 in Norman, Oklahoma — college-football town, dirt-track state.",
      "He became a national name in USAC midgets and sprint cars long before a Cup owner knew the résumé. The Chili Bowl in Tulsa was a home game.",
      "Kyle Busch Motorsports put him in a Truck. In 2017 he won the Camping World Truck Series championship. Joe Gibbs was the next door.",
    ],
    hometownHeading: "Norman first. Huntersville for the 20.",
    hometownBody: [
      "Hometown is Norman — brick campus streets, Oklahoma sky, and the dirt tracks that built a midget champion.",
      "Joe Gibbs Racing is the Cup address. The No. 20 Toyota is the smooth one in the JGR stable, and after Loudon Bell sits fifth, 249 out of Hamlin.",
    ],
    hometownSnapshot: [
      { label: "Born", value: "Norman, Oklahoma · Dec 16, 1994" },
      { label: "Hometown", value: "Norman, Oklahoma" },
      { label: "Season home", value: "Huntersville · Joe Gibbs Racing" },
      { label: "Off-week", value: "USAC / Chili Bowl dirt" },
    ],
    raceCarHeading: "The No. 20 Camry",
    raceCarBody:
      "A Joe Gibbs Toyota with DeWalt orange in the family of schemes. Bell is the one who can win on a road course or a short track and still look like he is saving the right-rear.",
    extraKicker: "Dirt never left the calendar",
    extraHeading: "Trucks, midgets, then the 20",
    extraBody:
      "Bell is the other dirt guy in this top 10. Larson is the headline. Bell is the one who still treats Tulsa like a second playoff.",
    extraItems: [
      { name: "Truck champion", detail: "2017 Camping World Truck Series" },
      { name: "Chili Bowl", detail: "A regular in the indoor midget Super Bowl" },
      { name: "JGR Cup", detail: "No. 20 Toyota — Gibbs’s flagship number" },
      { name: "2026 points", detail: "5th after Loudon" },
    ],
    career: [
      {
        years: "2013–17",
        title: "USAC to Trucks",
        body: "Midgets and sprints first. Then Kyle Busch Motorsports and a 2017 Truck title that put Gibbs on notice.",
      },
      {
        years: "2018–20",
        title: "Xfinity, then Cup",
        body: "Xfinity wins for JGR, then a Cup seat. The learning curve was real. The dirt hands were already there.",
      },
      {
        years: "2021–now",
        title: "The 20",
        body: "He inherited Gibbs’s famous number. After Loudon he is fifth in 2026 points and still a problem on any track that rewards precision.",
      },
    ],
    trophies: [
      { name: "Truck title", detail: "2017" },
      { name: "Dirt résumé", detail: "USAC / Chili Bowl" },
      { name: "Cup number", detail: "JGR No. 20" },
      { name: "2026 points", detail: "5th after Loudon" },
    ],
    statsLine: "2026 Cup through the Dollar Tree 301: 5th · 738 points · Joe Gibbs Racing No. 20",
    images: {
      hero: {
        src: `${WIKI}/d/d6/Christopher_Bell_Las_Vegas_2026.jpg`,
        alt: "Christopher Bell in Joe Gibbs Racing fire suit at Las Vegas in 2026",
        credit: CREDIT_LV26,
      },
      hometown: {
        src: `${WIKI}/9/95/Norman_July_2019_48_%28W_Boyd_Street%29.jpg`,
        alt: "West Boyd Street in Norman, Oklahoma",
        credit: "Wikimedia Commons · Norman, Oklahoma",
      },
      raceCar: {
        src: `${WIKI}/d/d5/Christopher_Bell%2C_2026_Las_Vegas_Spring%2C_Cup.jpg`,
        alt: "Christopher Bell’s No. 20 Joe Gibbs Racing Toyota on pit road at Las Vegas in 2026",
        credit: CREDIT_LV26,
      },
    },
    metaTitle: "Christopher Bell | #20 JGR, 2017 Truck Champ",
    metaDescription:
      "Christopher Bell bio: Norman, Oklahoma dirt roots, 2017 Truck title, Joe Gibbs No. 20 Toyota. 5th in 2026 Cup points after Loudon.",
  },
  {
    slug: "chase-briscoe",
    rank: 6,
    points: 727,
    delta: "-274",
    name: "Chase Briscoe",
    legalName: "Chase David Wayne Briscoe",
    car: "19",
    team: "Joe Gibbs Racing",
    manufacturer: "Toyota",
    series: "NASCAR Cup Series",
    born: "December 15, 1994",
    birthDateISO: "1994-12-15",
    birthplace: "Mitchell, Indiana",
    hometown: "Mitchell, Indiana",
    residence:
      "Indiana dirt weekly racer turned Joe Gibbs Cup driver. Still owns a World of Outlaws sprint-car team.",
    twitter: "chasebriscoe",
    wikipedia: "https://en.wikipedia.org/wiki/Chase_Briscoe",
    headline: "Mitchell, Indiana — and back-to-back Southern 500s",
    lede: "2016 ARCA champ. Stewart-Haas graduate. Now the No. 19 Toyota at JGR, and the man who won Darlington in 2024 and 2025.",
    facts: [
      { label: "Car", value: "#19 Toyota" },
      { label: "Team", value: "Joe Gibbs Racing" },
      { label: "Born", value: "December 15, 1994" },
      { label: "Hometown", value: "Mitchell, Indiana" },
      { label: "Darlington", value: "Southern 500 in 2024 + 2025" },
      { label: "2026 Cup", value: "6th · 727 pts" },
    ],
    family: [
      { label: "Spouse", value: "Marissa Briscoe" },
      { label: "Kids", value: "A son (2021) and twins (2024)" },
      { label: "Team", value: "Chase Briscoe Racing (World of Outlaws)" },
    ],
    familyNote:
      "Chase and Marissa are raising three kids. He still funds a World of Outlaws sprint-car team — the Indiana dirt never really got replaced. It just got a Cup paycheck beside it.",
    childhoodHeading: "Weekly dirt in a town of 4,000",
    childhood: [
      "Chase David Wayne Briscoe was born December 15, 1994 in Mitchell, Indiana — small-town Midwest, sprint-car Saturday nights.",
      "He ran the weekly dirt grind and the ARCA trail. In 2016 he won the ARCA Racing Series championship. Ford and Stewart-Haas came calling.",
      "The Cup break was never fancy. It was a guy who could save a set of tires and still throw a slider on a dirt mile.",
    ],
    hometownHeading: "Mitchell on the sign. Huntersville on the timing sheet.",
    hometownBody: [
      "Hometown is Mitchell — brick storefronts and the kind of Indiana main street that still shuts down for a high-school football Friday.",
      "The Cup week is Joe Gibbs Racing now. The No. 19 Toyota is a crown-jewel car in this man’s hands: back-to-back Southern 500s will do that.",
    ],
    hometownSnapshot: [
      { label: "Born", value: "Mitchell, Indiana · Dec 15, 1994" },
      { label: "Hometown", value: "Mitchell, Indiana" },
      { label: "Season home", value: "Huntersville · Joe Gibbs Racing" },
      { label: "Dirt team", value: "Chase Briscoe Racing, World of Outlaws" },
    ],
    raceCarHeading: "The No. 19 Camry",
    raceCarBody:
      "Bass Pro / JGR Toyota, depending on the weekend. After Loudon he sits sixth, four points behind Bell — a bad 50-lap stretch from swapping spots on this board.",
    extraKicker: "Lady in Black likes him",
    extraHeading: "Two Southern 500s in a row",
    extraBody:
      "Darlington in September is supposed to be a veteran’s race. Briscoe won it in 2024 and again in 2025. That is the kind of line that gets you a Joe Gibbs seat.",
    extraItems: [
      { name: "Southern 500", detail: "Winner in 2024 and 2025" },
      { name: "ARCA champion", detail: "2016" },
      { name: "Outlaws team", detail: "Chase Briscoe Racing" },
      { name: "2026 points", detail: "6th after Loudon" },
    ],
    career: [
      {
        years: "2010s",
        title: "Indiana dirt to ARCA",
        body: "Weekly sprint cars, then the ARCA championship in 2016. Ford put him on a development path.",
      },
      {
        years: "2018–23",
        title: "Stewart-Haas",
        body: "Trucks and Xfinity wins, then a Cup seat at SHR. He learned intermediates the hard way and kept the dirt team going.",
      },
      {
        years: "2024–now",
        title: "JGR and Darlington",
        body: "The move to Gibbs and the No. 19 came with crown-jewel speed. Two Southern 500s later, he is a top-10 Cup regular.",
      },
    ],
    trophies: [
      { name: "Southern 500", detail: "2024 · 2025" },
      { name: "ARCA title", detail: "2016" },
      { name: "Outlaws owner", detail: "Chase Briscoe Racing" },
      { name: "2026 points", detail: "6th after Loudon" },
    ],
    statsLine: "2026 Cup through the Dollar Tree 301: 6th · 727 points · Joe Gibbs Racing No. 19",
    images: {
      hero: {
        src: `${WIKI}/d/d9/Chase_Briscoe_Las_Vegas_2026.jpg`,
        alt: "Chase Briscoe in Joe Gibbs Racing fire suit at Las Vegas in 2026",
        credit: CREDIT_LV26,
      },
      hometown: {
        src: `${WIKI}/2/26/Mitchell%2C_Indiana.jpg`,
        alt: "Main street buildings in Mitchell, Indiana",
        credit: "Wikimedia Commons · Mitchell, Indiana",
      },
      raceCar: {
        src: `${WIKI}/d/d0/Chase_Briscoe%2C_2026_Las_Vegas_Spring%2C_Cup.jpg`,
        alt: "Chase Briscoe’s No. 19 Joe Gibbs Racing Toyota on pit road at Las Vegas in 2026",
        credit: CREDIT_LV26,
      },
    },
    metaTitle: "Chase Briscoe | #19 JGR, Back-to-Back Southern 500s",
    metaDescription:
      "Chase Briscoe bio: Mitchell, Indiana dirt roots, 2016 ARCA champ, 2024–25 Southern 500s, JGR No. 19. 6th in 2026 Cup points.",
  },
  {
    slug: "chase-elliott",
    rank: 8,
    points: 707,
    delta: "-294",
    name: "Chase Elliott",
    legalName: "William Clyde “Chase” Elliott II",
    car: "9",
    team: "Hendrick Motorsports",
    manufacturer: "Chevrolet",
    series: "NASCAR Cup Series",
    born: "November 28, 1995",
    birthDateISO: "1995-11-28",
    birthplace: "Dawsonville, Georgia",
    hometown: "Dawsonville, Georgia",
    residence:
      "Dawsonville is still the hometown on the broadcast graphic. Hendrick in Concord is the weekday shop.",
    twitter: "chaseelliott",
    wikipedia: "https://en.wikipedia.org/wiki/Chase_Elliott",
    headline: "Dawsonville’s favorite son still drives the 9",
    lede: "Bill Elliott’s kid. 2014 Nationwide champion. 2020 Cup champion. Most Popular Driver until the sport ran out of stickers.",
    facts: [
      { label: "Car", value: "#9 Chevrolet" },
      { label: "Team", value: "Hendrick Motorsports" },
      { label: "Born", value: "November 28, 1995" },
      { label: "Hometown", value: "Dawsonville, Georgia" },
      { label: "Cup title", value: "2020" },
      { label: "2026 Cup", value: "8th · 707 pts" },
    ],
    family: [
      { label: "Father", value: "Bill Elliott — 1988 Cup champ, Hall of Fame" },
      { label: "Hometown", value: "Dawsonville, Georgia" },
      { label: "Personal", value: "Keeps the private life off the timing stand" },
    ],
    familyNote:
      "The Elliotts are a father-son Cup pair in the same sentence as the Pettys, Allisons, and Earnhardts. Chase keeps the rest of his personal life off the webcam. The fan base never needed a tell-all.",
    childhoodHeading: "Born into Awesome Bill’s town",
    childhood: [
      "William Clyde “Chase” Elliott II was born November 28, 1995 in Dawsonville, Georgia — the mountain town that already had a Cup champion named Elliott.",
      "Before stock cars he piled up late-model crown jewels: Snowball Derby, Winchester 400, World Crown 300, All American 400. The unofficial super late-model grand slam.",
      "In 2014 he won the Nationwide Series championship as a teenager and took Rookie of the Year with it. Hendrick already had the No. 9 waiting.",
    ],
    hometownHeading: "Dawsonville on the mountain. Concord in the week.",
    hometownBody: [
      "Hometown is Dawsonville — old county courthouse, mountain roads, and a town that still treats the Elliott name like a civic holiday.",
      "Hendrick Motorsports in Concord is the Cup factory. The No. 9 Chevrolet is the most merchandised car in the garage, and after Loudon Elliott sits eighth.",
    ],
    hometownSnapshot: [
      { label: "Born", value: "Dawsonville, Georgia · Nov 28, 1995" },
      { label: "Hometown", value: "Dawsonville, Georgia" },
      { label: "Season home", value: "Concord · Hendrick Motorsports" },
      { label: "Father", value: "Bill Elliott, 1988 champion" },
    ],
    raceCarHeading: "The No. 9 Camaro",
    raceCarBody:
      "NAPA blue on a Hendrick Chevrolet. Road courses and short tracks have paid him. The fan vote always has. After Loudon he is eighth, 294 out of first.",
    extraKicker: "The 9 and the mountain",
    extraHeading: "Most popular, then a champion",
    extraBody:
      "Elliott won the 2020 Cup title the same way he won the fan vote — on speed and a following that already knew the last name. Dawsonville still shows up in the hat.",
    extraItems: [
      { name: "Cup champion", detail: "2020" },
      { name: "Nationwide champ", detail: "2014 — youngest at the time" },
      { name: "Most Popular", detail: "A multi-year lock in the fan vote" },
      { name: "Late-model slam", detail: "Snowball, Winchester, World Crown, All American" },
    ],
    career: [
      {
        years: "2010–13",
        title: "Late-model mountain",
        body: "The unofficial grand slam of super late models. Georgia already treated him like a headliner.",
      },
      {
        years: "2014–15",
        title: "Nationwide, then Hendrick",
        body: "2014 championship. Cup cameos. The No. 9 was the only number that made sense.",
      },
      {
        years: "2016–now",
        title: "The 9 at Hendrick",
        body: "A 2020 title, a mountain of Most Popular trophies, and a 2026 points fight that still has him inside the top 10 after Loudon.",
      },
    ],
    trophies: [
      { name: "Cup championship", detail: "2020" },
      { name: "Nationwide title", detail: "2014" },
      { name: "Most Popular", detail: "Multi-year winner" },
      { name: "2026 points", detail: "8th after Loudon" },
    ],
    statsLine: "2026 Cup through the Dollar Tree 301: 8th · 707 points · Hendrick Motorsports No. 9",
    images: {
      hero: {
        src: `${WIKI}/a/a1/Chase_Elliott_Driver_Introductions_Las_Vegas_2026.jpg`,
        alt: "Chase Elliott in Hendrick Motorsports fire suit at Las Vegas driver introductions in 2026",
        credit: CREDIT_LV26,
      },
      hometown: {
        src: `${WIKI}/5/5a/Old_Dawson_County_Courthouse.JPG`,
        alt: "Old Dawson County Courthouse in Dawsonville, Georgia",
        credit: "Wikimedia Commons · Dawsonville, Georgia",
      },
      raceCar: {
        src: `${WIKI}/c/cf/Chase_Elliott%2C_2026_Las_Vegas_Spring%2C_Cup.jpg`,
        alt: "Chase Elliott’s No. 9 Hendrick Chevrolet on pit road at Las Vegas in 2026",
        credit: CREDIT_LV26,
      },
    },
    metaTitle: "Chase Elliott | #9 Hendrick, 2020 Cup Champion",
    metaDescription:
      "Chase Elliott bio: Dawsonville, Georgia roots, Bill Elliott’s son, 2014 Nationwide champ, 2020 Cup champ. 8th in 2026 points.",
  },
  {
    slug: "joey-logano",
    rank: 9,
    points: 682,
    delta: "-319",
    name: "Joey Logano",
    legalName: "Joseph Thomas Logano",
    car: "22",
    team: "Team Penske",
    manufacturer: "Ford",
    series: "NASCAR Cup Series",
    born: "May 24, 1990",
    birthDateISO: "1990-05-24",
    birthplace: "Middletown, Connecticut",
    hometown: "Middletown, Connecticut",
    residence:
      "Connecticut-born, North Carolina-based. The shop is Team Penske. The nickname is still Sliced Bread.",
    twitter: "joeylogano",
    wikipedia: "https://en.wikipedia.org/wiki/Joey_Logano",
    headline: "Sliced Bread grew into a three-time champion",
    lede: "Youngest Daytona 500 winner. Three Cup titles. Same No. 22 Ford. After Loudon he sits 9th — 682 points, two wins already in the bank.",
    facts: [
      { label: "Car", value: "#22 Ford" },
      { label: "Team", value: "Team Penske" },
      { label: "Born", value: "May 24, 1990" },
      { label: "Hometown", value: "Middletown, Connecticut" },
      { label: "Cup titles", value: "2018 · 2022 · 2024" },
      { label: "2026 Cup", value: "9th · 682 pts" },
    ],
    family: [
      { label: "Spouse", value: "Brittany Baca Logano" },
      { label: "Kids", value: "Emerson, Hudson, Jameson" },
      { label: "Father", value: "Tom Logano" },
    ],
    familyNote:
      "Dad Tom put him in karts. Brittany married him in 2014. Three kids later, the Logano transporter is still a family shop.",
    childhoodHeading: "Middletown, then the whole country knew the nickname",
    childhood: [
      "Joseph Thomas Logano was born May 24, 1990 in Middletown, Connecticut — a river-city kid whose dad raced and whose first office was a go-kart.",
      "The nickname arrived early: Sliced Bread. As in, greatest thing since. He was winning nationally as a teenager while other kids were still learning to shift.",
      "Joe Gibbs signed him as the next prodigy. First Cup start at 18. First Cup win at New Hampshire in 2009 — 19 years old, the youngest winner the series had ever seen.",
    ],
    hometownHeading: "The Connecticut river town that sent a champion south",
    hometownBody: [
      "Middletown sits on the Connecticut River — brick downtown, high-school Friday nights, and a racing family that decided the Southeast was the next stop.",
      "He lives the season in North Carolina now. The hometown is still Middletown. After Loudon he is 9th in Cup points with two wins already on the 2026 card.",
    ],
    hometownSnapshot: [
      { label: "Born", value: "Middletown, Connecticut · May 24, 1990" },
      { label: "Hometown", value: "Middletown, Connecticut" },
      { label: "Season home", value: "North Carolina · Team Penske" },
      { label: "Nickname", value: "Sliced Bread" },
    ],
    raceCarHeading: "The No. 22 Mustang",
    raceCarBody:
      "Shell / Pennzoil yellow, Team Penske on the deck lid. The same number that won titles in 2018, 2022, and 2024. After Loudon he is ninth — 682 points, two checkered flags this year.",
    extraKicker: "Three titles and two 500s",
    extraHeading: "The prodigy who kept winning after the hype died",
    extraBody:
      "First win as a teenager. First Daytona 500 as the youngest ever. Then three championships against fields that were supposed to have passed him. The nickname stuck because the résumé did.",
    extraItems: [
      { name: "Cup champion", detail: "2018, 2022, 2024" },
      { name: "Daytona 500", detail: "2015 (youngest) · 2024" },
      { name: "Youngest winner", detail: "New Hampshire 2009, age 19" },
      { name: "2026 points", detail: "9th after Loudon · 682 pts" },
    ],
    career: [
      {
        years: "2008–12",
        title: "Gibbs prodigy",
        body: "Joe Gibbs Racing handed a teenager the No. 20. New Hampshire 2009 made him the youngest Cup winner. The nickname followed him into every garage.",
      },
      {
        years: "2013–18",
        title: "Penske, then a title",
        body: "The No. 22 Ford was the second act. The 2015 Daytona 500 made him the youngest winner of the 500. The 2018 championship proved the kid had grown into the job.",
      },
      {
        years: "2019–now",
        title: "Three-time champion",
        body: "Titles again in 2022 and 2024. Another Daytona 500 in 2024. After Loudon 2026 he sits 9th with two wins — still the most decorated driver in this top 10.",
      },
    ],
    trophies: [
      { name: "Cup champion", detail: "2018, 2022, 2024" },
      { name: "Daytona 500", detail: "2015, 2024" },
      { name: "First Cup win", detail: "New Hampshire 2009" },
      { name: "2026 points", detail: "9th after Loudon" },
    ],
    statsLine: "2026 Cup through the Dollar Tree 301: 9th · 682 points · 2 wins · Team Penske No. 22",
    images: {
      hero: {
        src: `${WIKI}/9/96/Joey_Logano_Driver_Introductions_Las_Vegas_2026.jpg`,
        alt: "Joey Logano in Team Penske fire suit at Las Vegas driver introductions in 2026",
        credit: CREDIT_LV26,
      },
      hometown: {
        src: `${WIKI}/d/d0/Downtown_Middletown%2C_CT.jpg`,
        alt: "Downtown Middletown, Connecticut",
        credit: "Wikimedia Commons · Middletown, Connecticut",
      },
      raceCar: {
        src: `${WIKI}/d/d2/Joey_Logano_22_Las_Vegas_2026.jpg`,
        alt: "Joey Logano’s No. 22 Team Penske Ford at Las Vegas in 2026",
        credit: CREDIT_LV26,
      },
    },
    metaTitle: "Joey Logano | #22 Penske, Three-Time Cup Champ",
    metaDescription:
      "Joey Logano bio: Middletown, Connecticut roots, youngest Daytona 500 winner, three Cup titles, Team Penske No. 22. 9th in 2026 points.",
  },
  {
    slug: "chris-buescher",
    rank: 10,
    points: 676,
    delta: "-325",
    name: "Chris Buescher",
    legalName: "Christopher William Buescher",
    car: "17",
    team: "RFK Racing",
    manufacturer: "Ford",
    series: "NASCAR Cup Series",
    born: "October 29, 1992",
    birthDateISO: "1992-10-29",
    birthplace: "Prosper, Texas",
    hometown: "Prosper, Texas",
    residence:
      "Texas-born, now a North Carolina farm guy — Buescher and his wife Emma run a small homestead outside New London when the 17 is in the shop.",
    twitter: "ChrisBuescher",
    wikipedia: "https://en.wikipedia.org/wiki/Chris_Buescher",
    headline: "The quiet Ford that lives in the top 10",
    lede: "2012 ARCA champ. 2015 Xfinity champ. James Buescher’s cousin. The RFK No. 17 that nobody headlines and everybody still has to beat.",
    facts: [
      { label: "Car", value: "#17 Ford" },
      { label: "Team", value: "RFK Racing" },
      { label: "Born", value: "October 29, 1992" },
      { label: "Hometown", value: "Prosper, Texas" },
      { label: "Titles", value: "ARCA 2012 · Xfinity 2015" },
      { label: "2026 Cup", value: "10th · 676 pts" },
    ],
    family: [
      { label: "Spouse", value: "Emma Buescher" },
      { label: "Cousin", value: "James Buescher — 2012 Truck champ" },
      { label: "Home", value: "Nine-acre farm, New London, N.C." },
    ],
    familyNote:
      "Buescher married Emma and together they run a small farm in New London, North Carolina — chickens, garden, the anti-motorcoach life. Cousin James won the 2012 Truck title.",
    childhoodHeading: "North Texas, then a family pipeline",
    childhood: [
      "Christopher William Buescher was born October 29, 1992 in Prosper, Texas — back when Prosper was still a small Collin County town, not a Dallas suburb commuter stop.",
      "The Buescher name was already on a national-series entry list. He followed the ARCA path and won the 2012 championship, then the 2015 Xfinity title.",
      "Roush / RFK became the long-term home. The style never changed: save the car, hit the long run, steal a win when the loud names overdrive a set.",
    ],
    hometownHeading: "Prosper on the birth certificate. New London in the garden.",
    hometownBody: [
      "Hometown is Prosper, Texas — water tower country north of Dallas that grew up around him.",
      "Race weeks live at RFK in Concord. Off weeks live on that New London farm. After Loudon the No. 17 sits tenth — 676 points, four up on Hocevar in 11th.",
    ],
    hometownSnapshot: [
      { label: "Born", value: "Prosper, Texas · Oct 29, 1992" },
      { label: "Hometown", value: "Prosper, Texas" },
      { label: "Season home", value: "New London farm · RFK shop" },
      { label: "Family name", value: "Cousin of James Buescher" },
    ],
    raceCarHeading: "The No. 17 Mustang",
    raceCarBody:
      "Fastenal / BodyArmor / whatever Fastenal-adjacent Ford Jack Roush and Brad Keselowski are running that week. After Loudon, tenth in points — 676, hanging on the last card.",
    extraKicker: "The farm and the 17",
    extraHeading: "Two national titles, zero noise",
    extraBody:
      "ARCA in 2012. Xfinity in 2015. A Cup résumé built on consistency instead of press conferences. The 17 is the car you forget about until it is still there with 20 to go.",
    extraItems: [
      { name: "ARCA champion", detail: "2012" },
      { name: "Xfinity champion", detail: "2015" },
      { name: "Family", detail: "Cousin of 2012 Truck champ James Buescher" },
      { name: "2026 points", detail: "10th after Loudon · 676 pts" },
    ],
    career: [
      {
        years: "2010–12",
        title: "ARCA title",
        body: "The 2012 ARCA championship put a Texas kid on the Ford development map.",
      },
      {
        years: "2013–16",
        title: "Xfinity, then Cup",
        body: "2015 Xfinity champion. A Cup win at Pocono as a rookie in 2016 punched a playoff ticket in the old format.",
      },
      {
        years: "2017–now",
        title: "RFK lifer",
        body: "The Roush/RFK No. 17 became home. After Loudon he is tenth in 2026 — quietly, which is how he likes it.",
      },
    ],
    trophies: [
      { name: "ARCA title", detail: "2012" },
      { name: "Xfinity title", detail: "2015" },
      { name: "RFK Ford", detail: "No. 17" },
      { name: "2026 points", detail: "10th after Loudon" },
    ],
    statsLine: "2026 Cup through the Dollar Tree 301: 10th · 676 points · RFK Racing No. 17",
    images: {
      hero: {
        src: `${WIKI}/4/4d/Chris_Buescher_Sonoma_2026.jpg`,
        alt: "Chris Buescher in RFK Racing fire suit at Sonoma Raceway in 2026",
        credit: CREDIT_SONOMA26,
      },
      hometown: {
        src: `${WIKI}/d/d7/Prosper%2C_Texas.jpg`,
        alt: "Water tower and grain elevator in Prosper, Texas",
        credit: "Wikimedia Commons · Prosper, Texas",
      },
      raceCar: {
        src: `${WIKI}/c/c9/Chris_Buescher%2C_2026_Las_Vegas_Spring%2C_Cup.jpg`,
        alt: "Chris Buescher’s No. 17 RFK Racing Ford on pit road at Las Vegas in 2026",
        credit: CREDIT_LV26,
      },
    },
    metaTitle: "Chris Buescher | #17 RFK, ARCA & Xfinity Champ",
    metaDescription:
      "Chris Buescher bio: Prosper, Texas roots, 2012 ARCA champ, 2015 Xfinity champ, RFK No. 17. 10th in 2026 Cup points after Loudon.",
  },
  {
    slug: "bubba-wallace",
    rank: 14,
    points: 630,
    delta: "-371",
    name: "Bubba Wallace",
    legalName: "William Darrell “Bubba” Wallace Jr.",
    car: "23",
    team: "23XI Racing",
    manufacturer: "Toyota",
    series: "NASCAR Cup Series",
    born: "October 8, 1993",
    birthDateISO: "1993-10-08",
    birthplace: "Mobile, Alabama",
    hometown: "Mobile, Alabama",
    residence:
      "Alabama-born, 23XI-employed. The only full-time Black driver in Cup — and the guy who finished second at Loudon last Sunday.",
    twitter: "BubbaWallace",
    wikipedia: "https://en.wikipedia.org/wiki/Bubba_Wallace",
    headline: "Mobile to 23XI — and this close at Loudon",
    lede: "Richard Petty’s No. 43 graduate. 23XI’s No. 23. First Black Cup winner since Wendell Scott. Runner-up at the Dollar Tree 301.",
    facts: [
      { label: "Car", value: "#23 Toyota" },
      { label: "Team", value: "23XI Racing" },
      { label: "Born", value: "October 8, 1993" },
      { label: "Hometown", value: "Mobile, Alabama" },
      { label: "Breakthrough", value: "Talladega 2021 Cup win" },
      { label: "2026 Cup", value: "14th · 630 pts" },
    ],
    family: [
      { label: "Spouse", value: "Amanda Carter Wallace" },
      { label: "Daughter", value: "Nico" },
      { label: "Owners", value: "Denny Hamlin & Michael Jordan" },
    ],
    familyNote:
      "Wallace married Amanda Carter and they have a daughter, Nico. The 23XI shop is also a second family — Hamlin as owner-teammate, Jordan as the other name on the transporter.",
    childhoodHeading: "Mobile, then a Toyota development ride",
    childhood: [
      "William Darrell “Bubba” Wallace Jr. was born October 8, 1993 in Mobile, Alabama — Gulf Coast kid, go-kart kid, then a national-series prospect.",
      "Toyota’s driver program put him at Kyle Busch Motorsports in Trucks and Joe Gibbs in Xfinity. Ford and Roush followed. The Cup break was the famous No. 43 at Richard Petty Motorsports.",
      "He has been the only full-time Black American driver in NASCAR’s three national series every year he has run them. That is not a footnote. It is the job, every weekend.",
    ],
    hometownHeading: "Mobile on the skyline. 23XI on the pit box.",
    hometownBody: [
      "Hometown is Mobile — Gulf skyline, Alabama humidity, and the first people who watched a kart kid decide this was the life.",
      "23XI Racing is home now. After Loudon he is 14th in points — still the last man who had a look at Blaney, second by 0.586 seconds on the Magic Mile.",
    ],
    hometownSnapshot: [
      { label: "Born", value: "Mobile, Alabama · Oct 8, 1993" },
      { label: "Hometown", value: "Mobile, Alabama" },
      { label: "Season home", value: "North Carolina · 23XI Racing" },
      { label: "Loudon 2026", value: "2nd, 0.586s behind Blaney" },
    ],
    raceCarHeading: "The No. 23 Camry",
    raceCarBody:
      "McDonald’s / 23XI Toyota, Jordan branding on the door. Hamlin’s teammate. After Loudon he sits 14th — outside this site’s top-10 grid, still inside the Chase 16, and the one who almost stole the last race.",
    extraKicker: "History, then a near-miss at Loudon",
    extraHeading: "Talladega, 23XI, and the 43",
    extraBody:
      "Wallace’s 2021 Talladega win was the first Cup victory by a Black driver since Wendell Scott in 1963. The 43 made him famous. The 23 made him a teammate to the points leader.",
    extraItems: [
      { name: "Talladega 2021", detail: "First Black Cup winner since Wendell Scott" },
      { name: "The 43", detail: "Full-time RPM / Petty seat after Almirola" },
      { name: "Dollar Tree 301", detail: "2nd at Loudon, 2026" },
      { name: "2026 points", detail: "14th after Loudon" },
    ],
    career: [
      {
        years: "2013–17",
        title: "Trucks and Xfinity",
        body: "KBM, JGR, then Roush. He won in Trucks and learned the Xfinity pack before anyone handed him a Cup full-time.",
      },
      {
        years: "2017–20",
        title: "The 43",
        body: "Injury sub, then the full-time Richard Petty Motorsports seat. The most famous number in the sport, on the biggest stage of his life.",
      },
      {
        years: "2021–now",
        title: "23XI and Talladega",
        body: "Hamlin and Jordan built him a team. Talladega 2021 rewrote the history line. Loudon 2026 was another near-miss that still paid points.",
      },
    ],
    trophies: [
      { name: "Talladega", detail: "2021 Cup win" },
      { name: "Loudon", detail: "2nd in the 2026 Dollar Tree 301" },
      { name: "Historic first", detail: "First Black Cup winner since 1963" },
      { name: "2026 points", detail: "14th after Loudon" },
    ],
    statsLine: "2026 Cup through the Dollar Tree 301: 14th · 630 points · 23XI Racing No. 23 · 2nd at Loudon",
    images: {
      hero: {
        src: `${WIKI}/4/47/Bubba_Wallace_Driver_Introductions_Las_Vegas_2026.jpg`,
        alt: "Bubba Wallace in 23XI Racing fire suit at Las Vegas driver introductions in 2026",
        credit: CREDIT_LV26,
      },
      hometown: {
        src: `${WIKI}/d/d8/Mobile_Alabama_skyline_March_2008.jpg`,
        alt: "Skyline of Mobile, Alabama",
        credit: "Wikimedia Commons · Mobile, Alabama",
      },
      raceCar: {
        src: `${WIKI}/e/e4/Bubba_Wallace%2C_2026_Las_Vegas_Spring%2C_Cup.jpg`,
        alt: "Bubba Wallace’s No. 23 23XI Racing Toyota on pit road at Las Vegas in 2026",
        credit: CREDIT_LV26,
      },
    },
    metaTitle: "Bubba Wallace | #23 23XI, Talladega Winner",
    metaDescription:
      "Bubba Wallace bio: Mobile, Alabama roots, Petty No. 43, 23XI No. 23, 2021 Talladega win. 2nd at Loudon, 14th in 2026 Cup points.",
  },
];

const LARSON_CARD: Top10Card = {
  slug: "kyle-larson",
  href: "/drivers/kyle-larson",
  rank: 7,
  name: "Kyle Larson",
  car: "5",
  team: "Hendrick Motorsports",
  manufacturer: "Chevrolet",
  hometown: "Elk Grove, California",
  points: 708,
  portrait: {
    src: `${WIKI}/1/18/Kyle_Larson_Las_Vegas_2026.jpg`,
    alt: "Kyle Larson in Hendrick fire suit at Las Vegas Motor Speedway in 2026",
    credit: CREDIT_LV26,
  },
};

export const TOP10_CUP_CARDS: Top10Card[] = [
  ...CUP_TOP10_PROFILES.filter((d) => d.rank <= 10).map((d) => ({
    slug: d.slug,
    href: `/drivers/${d.slug}`,
    rank: d.rank,
    name: d.name,
    car: d.car,
    team: d.team,
    manufacturer: d.manufacturer,
    hometown: d.hometown,
    points: d.points,
    portrait: d.images.hero,
  })),
  LARSON_CARD,
].sort((a, b) => a.rank - b.rank);

export function getCupDriver(slug: string): CupDriverProfile | undefined {
  return CUP_TOP10_PROFILES.find((d) => d.slug === slug);
}

export function cupDriverSlugs(): string[] {
  return CUP_TOP10_PROFILES.map((d) => d.slug);
}

export function getCupDriverHref(name: string): string | undefined {
  if (name === "Kyle Larson") return "/drivers/kyle-larson";
  const match = CUP_TOP10_PROFILES.find((d) => d.name === name);
  return match ? `/drivers/${match.slug}` : undefined;
}
