import type { CupDriverProfile } from '@/lib/cup-top10-drivers';
import { TOP10_CUP_CARDS } from '@/lib/cup-top10-drivers';
import type { LegendDriverProfile } from '@/lib/nascar-legends';
import { NASCAR_LEGEND_CARDS } from '@/lib/nascar-legends';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from '@/lib/site';

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function websiteOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          "NASCAR and IndyCar news hub covering Cup, O'Reilly Auto Parts, Trucks, ARCA, and IndyCar — live headlines, standings, TV guide, schedules, and beginner guides.",
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/drivers?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
        },
        image: DEFAULT_OG_IMAGE,
        sameAs: [...SOCIAL_PROFILES],
      },
    ],
  };
}

export function beginnersJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/beginners#webpage`,
    url: `${SITE_URL}/beginners`,
    name: 'NASCAR for Beginners | Cup Teams, Drivers & Tracks',
    description:
      'New to NASCAR? Learn how races work, explore Cup Series teams and drivers, and get plain-English guides to the tracks Cup races most often.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: 'NASCAR',
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is NASCAR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NASCAR is America’s top stock car racing organization. The Cup Series is the premier division, supported by the O’Reilly Auto Parts Series, Craftsman Truck Series, and ARCA Menards Series.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does a NASCAR race weekend work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A typical weekend builds from practice and qualifying to multi-stage races with cautions, pit stops, and a points system that feeds into playoffs for the championship.',
          },
        },
        {
          '@type': 'Question',
          name: 'What Cup tracks should beginners know?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cup races visit superspeedways like Daytona and Talladega, intermediate ovals, short tracks such as Bristol and Martinsville, road courses, and occasional street circuits — each with a different race style and fan tip.',
          },
        },
      ],
    },
  };
}

export function iracingTipsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/iracing#webpage`,
    url: `${SITE_URL}/iracing`,
    name: 'iRacing Tips & Cup Setup Starters | Obsessed with NASCAR',
    description:
      'iRacing tips for NASCAR fans plus Cup setup starters by track: oval lines, drafting, restarts, fuel strategy, FOV, controls, and first-click garage boards.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: 'iRacing NASCAR oval racing',
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What should new iRacing oval drivers do first?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Race fixed setups, complete clean practice laps before joining officials, brake earlier than you think, and protect safety rating by finishing races.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I climb the iRacing NASCAR ladder?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Start in Rookie Legends or Street Stocks, move into ARCA and Trucks, then O’Reilly and Cup fixed before open setups. Finish races cleanly at each step.',
          },
        },
        {
          '@type': 'Question',
          name: 'What oval skills transfer from watching NASCAR to iRacing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Restart lane choice, side drafting, tire management, fuel windows, and patience in traffic are the same themes you see on Sunday broadcasts.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where should I start a Cup open setup for each track?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Load the iRacing baseline, then use per-track starter boards for brake bias, tire pressures, anti-roll bars, track bar, wedge, and gear direction. Change one thing at a time and tune for tight or loose after a real run.',
          },
        },
      ],
    },
  };
}

export function driversJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/drivers#webpage`,
    url: `${SITE_URL}/drivers`,
    name: 'Your Driver Hub | Obsessed with NASCAR',
    description:
      "Top 10 Cup driver bios, NASCAR Legends (Dale Earnhardt and Kyle Busch), plus news, race videos, and social posts.",
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: 'NASCAR drivers',
    },
    mainEntity: {
      '@type': 'ItemList',
      name: '2026 Top 10 Cup drivers',
      numberOfItems: TOP10_CUP_CARDS.length,
      itemListElement: TOP10_CUP_CARDS.map((card) => ({
        '@type': 'ListItem',
        position: card.rank,
        name: card.name,
        url: `${SITE_URL}${card.href}`,
      })),
    },
    hasPart: {
      '@type': 'ItemList',
      name: 'NASCAR Legends',
      numberOfItems: NASCAR_LEGEND_CARDS.length,
      itemListElement: NASCAR_LEGEND_CARDS.map((card, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: card.name,
        url: `${SITE_URL}${card.href}`,
      })),
    },
  };
}

export function schedule2027JsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/2027-schedule#webpage`,
    url: `${SITE_URL}/2027-schedule`,
    name: '2027 NASCAR Schedule | Cup, O’Reilly, Trucks',
    description:
      'Confirmed 2027 NASCAR dates for Cup, O’Reilly Auto Parts, and Craftsman Trucks — Daytona 500 Feb. 21, San Diego Aug. 1, Homestead Nov. 14. Rolling release, not a finished 36-race grid.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: '2027 NASCAR schedule',
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'When is the 2027 Daytona 500?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The 2027 Daytona 500 is Sunday, February 21 on FOX (2:30–7:00 p.m. ET broadcast window). The Busch Light Clash returns to Daytona on Saturday, Feb. 13, with the Duel on Thursday, Feb. 18.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the 2027 NASCAR schedule complete?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. NASCAR is rolling out 2027 dates. Confirmed Cup, O’Reilly, and Truck weekends are posted, but Cup still has holes versus a 36-race points season. Watkins Glen is listed as September TBD on USA Network.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is the 2027 NASCAR championship?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Championship weekend is at Homestead-Miami Speedway: Craftsman Trucks Friday, Nov. 12; O’Reilly Auto Parts Saturday, Nov. 13; Cup Series Sunday, Nov. 14 on USA Network.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is new on the 2027 NASCAR calendar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Clash returns to Daytona, Cup races Naval Base Coronado on Aug. 1, the All-Star Race is at North Wilkesboro on May 23, Richmond opens the Cup Chase on Sept. 11, Trucks get Bowman Gray (first national points since 1971) and Canadian Tire Motorsport Park as the Truck regular-season finale.',
          },
        },
      ],
    },
  };
}

export function cupChaseJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/chase#webpage`,
    url: `${SITE_URL}/chase`,
    name: 'NASCAR Cup Chase Desk | Top 16 Points Cut Line',
    description:
      '2026 Cup Chase desk: top 16 on points only, cut-line bubble, big win bonuses (~55 pts), and a 10-race cumulative title run.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: 'NASCAR Cup Series Chase',
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do drivers make the NASCAR Cup Chase in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The top 16 drivers in regular-season points after 26 races make The Chase. Wins no longer guarantee a berth, though a race win pays a large points bonus (about 55 points) that helps climb the standings.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Cup Chase cut line?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The cut line is 16th in regular-season points — the last Chase seat. Drivers outside that mark need points swings before the regular-season finale freezes the field.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the 2026 Cup Chase work after the field is set?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Points reset with a small seed (roughly 2,100 down to 2,000). The 16 drivers then race 10 events on cumulative points with no elimination rounds and no one-race Championship 4. Highest points after race 36 is the champion.',
          },
        },
      ],
    },
  };
}

export function kyleLarsonJsonLd() {
  const pageUrl = `${SITE_URL}/drivers/kyle-larson`;
  const image =
    'https://upload.wikimedia.org/wikipedia/commons/1/18/Kyle_Larson_Las_Vegas_2026.jpg';

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Kyle Larson | #5 Hendrick, Two-Time Cup Champ',
    description:
      'Kyle Larson bio: Elk Grove childhood, family, Hendrick #5 career, two Cup titles, dirt-track wins, and a live Loudon race card.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@type': 'Person', name: 'Kyle Larson' },
    mainEntity: {
      '@type': 'Person',
      '@id': `${pageUrl}#person`,
      name: 'Kyle Larson',
      alternateName: ['Kyle Miyata Larson', 'Yung Money', 'The Iceman'],
      birthDate: '1992-07-31',
      birthPlace: {
        '@type': 'Place',
        name: 'Sacramento, California',
      },
      homeLocation: {
        '@type': 'Place',
        name: 'Elk Grove, California',
      },
      nationality: 'United States',
      jobTitle: 'NASCAR Cup Series driver',
      memberOf: {
        '@type': 'SportsTeam',
        name: 'Hendrick Motorsports',
      },
      url: pageUrl,
      image,
      sameAs: [
        'https://en.wikipedia.org/wiki/Kyle_Larson',
        'https://twitter.com/KyleLarsonRacin',
      ],
    },
  };
}

export function legendDriverJsonLd(driver: LegendDriverProfile) {
  const pageUrl = `${SITE_URL}/drivers/${driver.slug}`;
  const sameAs = [driver.wikipedia];
  if (driver.twitter) {
    sameAs.push(`https://twitter.com/${driver.twitter}`);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: driver.metaTitle,
    description: driver.metaDescription,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@type': 'Person', name: driver.name },
    mainEntity: {
      '@type': 'Person',
      '@id': `${pageUrl}#person`,
      name: driver.name,
      alternateName: [driver.legalName, driver.nickname],
      birthDate: driver.birthDateISO,
      ...(driver.deathDateISO ? { deathDate: driver.deathDateISO } : {}),
      birthPlace: {
        '@type': 'Place',
        name: driver.birthplace,
      },
      homeLocation: {
        '@type': 'Place',
        name: driver.hometown,
      },
      nationality: 'United States',
      jobTitle: 'NASCAR driver',
      memberOf: {
        '@type': 'SportsTeam',
        name: driver.team,
      },
      url: pageUrl,
      image: driver.images.hero.src,
      sameAs,
    },
  };
}

export function cupDriverJsonLd(driver: CupDriverProfile) {
  const pageUrl = `${SITE_URL}/drivers/${driver.slug}`;
  const sameAs = [driver.wikipedia];
  if (driver.twitter) {
    sameAs.push(`https://twitter.com/${driver.twitter}`);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: driver.metaTitle,
    description: driver.metaDescription,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@type': 'Person', name: driver.name },
    mainEntity: {
      '@type': 'Person',
      '@id': `${pageUrl}#person`,
      name: driver.name,
      alternateName: driver.legalName,
      birthDate: driver.birthDateISO,
      birthPlace: {
        '@type': 'Place',
        name: driver.birthplace,
      },
      homeLocation: {
        '@type': 'Place',
        name: driver.hometown,
      },
      nationality: 'United States',
      jobTitle: 'NASCAR Cup Series driver',
      memberOf: {
        '@type': 'SportsTeam',
        name: driver.team,
      },
      url: pageUrl,
      image: driver.images.hero.src,
      sameAs,
    },
  };
}

export function pitStrategyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/pit-strategy#webpage`,
        url: `${SITE_URL}/pit-strategy`,
        name: 'Pit Strategy Calculator | Live Loudon 301',
        description:
          'Berry leads Stage 3 at Loudon with ~102 to go. Model Magic Mile stints, the 88-lap tank, and the Stage 2 pit log.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: {
          '@type': 'Thing',
          name: 'NASCAR pit strategy',
        },
        mainEntity: { '@id': `${SITE_URL}/pit-strategy#calculator` },
      },
      {
        '@type': 'Product',
        '@id': `${SITE_URL}/pit-strategy#calculator`,
        name: 'NASCAR Pit Strategy Calculator',
        description:
          'Free Cup Series pit strategy calculator for tire stints, fuel windows, and track presets from short tracks to superspeedways. Default board: New Hampshire Magic Mile / Dollar Tree 301.',
        url: `${SITE_URL}/pit-strategy`,
        image: DEFAULT_OG_IMAGE,
        brand: { '@id': `${SITE_URL}/#organization` },
        category: 'Sports software',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  };
}

export function trackTypesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/track-types#webpage`,
    url: `${SITE_URL}/track-types`,
    name: 'NASCAR Track Types Guide | Ovals & Roads',
    description:
      'Learn NASCAR short tracks, flat miles like New Hampshire, intermediates, superspeedways, and road courses, plus banking and pit strategy.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: 'NASCAR track types',
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are the main NASCAR track types?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cup racing visits five main categories: short tracks (about 0.5–0.75 miles), flat miles like New Hampshire’s Magic Mile and Phoenix, intermediate ovals, superspeedways such as Daytona and Talladega, and road courses.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a NASCAR flat mile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Flat miles are about 1 mile long with low banking. New Hampshire Motor Speedway (the Magic Mile) and Phoenix Raceway are the Cup examples. Passing is hard, so track position and a balanced car matter more than sheer banking grip.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does pit strategy change by NASCAR track type?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Short tracks and flat miles are tire-degradation races. Intermediates stretch green-run fuel and tire windows. Superspeedways live on the draft and fuel window. Road courses mix tire wear with braking zones and stage strategy.',
          },
        },
      ],
    },
  };
}

function webPageNode(path: string, name: string, description: string) {
  return {
    '@type': 'WebPage',
    '@id': `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
}

export function garageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageNode(
        '/garage',
        'Love Garage | Obsessed with NASCAR',
        'Bring your own car. Call the pits. Stack up against the field in the Love Garage crew-chief game.',
      ),
      {
        '@type': 'WebApplication',
        '@id': `${SITE_URL}/garage#app`,
        name: 'Love Garage',
        url: `${SITE_URL}/garage`,
        applicationCategory: 'GameApplication',
        operatingSystem: 'Web',
        description:
          'Fan crew-chief game: ghost cars, midpack starts, and pit calls during Cup weekends. Not affiliated with NASCAR.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
    ],
  };
}

export function garageBoardJsonLd() {
  return {
    '@context': 'https://schema.org',
    ...webPageNode(
      '/garage/board',
      'Love Garage Race Board | NASCAR Crew Game',
      'Love Garage running order, owner-entered Cup top 10, and the Love Garage Chase.',
    ),
  };
}

export function garageRulesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/garage/rules#webpage`,
    url: `${SITE_URL}/garage/rules`,
    name: 'How Scoring Works | Love Garage',
    description: 'Plain-English Love Garage scoring: ghost cars, caution bunch, and season points.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a Love Garage ghost car?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You do not drive. Everybody rolls off midpack at P20. Track position only moves when you call a pit or burn fuel wrong.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does green-flag running work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each leader lap adds the field-average lap time to your elapsed clock and burns one fuel lap. Tank starts at the admin max stint (68 at Darlington).',
        },
      },
      {
        '@type': 'Question',
        name: 'When can you call a pit from Love Garage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Buttons light only under caution, when the leader lap is a multiple of 40, or when you have five fuel laps or less.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is Love Garage scored at checkered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rank among Love Garage cars freezes. 1st 40, 2nd 39, down to 1. Out of fuel is DNF, last, no bonus. No stage points.',
        },
      },
    ],
  };
}

export function triviaJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageNode(
        '/trivia',
        'Trivia Night | Obsessed with NASCAR',
        'Five questions. No caution laps. Daily 5 drop at 6 a.m. Mountain on nascarlove.org.',
      ),
      {
        '@type': 'Quiz',
        '@id': `${SITE_URL}/trivia#quiz`,
        name: 'Trivia Night Daily 5',
        url: `${SITE_URL}/trivia`,
        description: 'Fan NASCAR quiz. Daily 5 plus Chase packs. Not an official NASCAR contest.',
        educationalLevel: 'beginner',
      },
    ],
  };
}

export function triviaPlayJsonLd() {
  return {
    '@context': 'https://schema.org',
    ...webPageNode(
      '/trivia/play',
      'Play Trivia Night Daily 5 | NASCAR Fan Quiz',
      'A 20-second booth quiz. Daily 5 plus Chase packs. Fan quiz, not an official contest.',
    ),
  };
}

export function triviaBoardJsonLd() {
  return {
    '@context': 'https://schema.org',
    ...webPageNode(
      '/trivia/board',
      'Trivia Night Chase Board | Daily 5 Rankings',
      'Today’s top 20 and the Trivia Night season board. Practice does not count.',
    ),
  };
}

export function triviaRulesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/trivia/rules#webpage`,
    url: `${SITE_URL}/trivia/rules`,
    name: 'How Scoring Works | Trivia Night',
    description: 'Daily 5 scoring, Chase packs, and Mountain-time rules for Trivia Night.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does Trivia Night Daily 5 scoring work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '10 points per correct. +2 if you answer in under 8 seconds. 0 for wrong or timeout. Max 60 on a perfect fast day. One attempt per Mountain-time day (clock flips at 6 a.m. MT).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Chase packs score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '15 per correct. No timer bonus. 10 questions. One pack per Chase weekend (Sat–Sun).',
        },
      },
      {
        '@type': 'Question',
        name: 'Does practice count on the Trivia Night board?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Practice uses scrambled older questions. No points. It does not hit the board.',
        },
      },
    ],
  };
}
