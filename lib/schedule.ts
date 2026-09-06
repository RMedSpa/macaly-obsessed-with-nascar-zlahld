export interface CupRace {
  name: string;
  track: string;
  date: string; // ISO string (local server time)
  dateLabel: string; // human readable
  tv: string;
  url: string;
}

// Cup Series 2026 upcoming races — sorted chronologically
// Times converted to MST/MDT for Arizona-facing audience
// Updated Sept 6, 2026 ~3:25 p.m. MDT — Southern 500 LIVE (Chase race 1 of 10). Dollar Tree 301 and Coke Zero Sugar 400 are checkered (Blaney, Preece).
export const CUP_RACES_2026: CupRace[] = [
  {
    name: 'Dollar Tree 301',
    track: 'New Hampshire Motor Speedway',
    date: '2026-08-23T13:00:00',
    dateLabel: 'Sun Aug 23, 1:00 PM MDT',
    tv: 'USA Network',
    url: 'https://www.nascar.com',
  },
  {
    name: 'Coke Zero Sugar 400',
    track: 'Daytona International Speedway',
    date: '2026-08-29T17:30:00',
    dateLabel: 'Sat Aug 29, 5:30 PM MDT',
    tv: 'NBC',
    url: 'https://www.nascar.com',
  },
  {
    name: 'Cook Out Southern 500',
    track: 'Darlington Raceway',
    date: '2026-09-06T15:00:00',
    dateLabel: 'Sun Sep 6, 3:00 PM MDT',
    tv: 'USA Network',
    url: 'https://www.nascar.com',
  },
  {
    name: 'Enjoy Illinois 300',
    track: 'World Wide Technology Raceway',
    date: '2026-09-13T13:00:00',
    dateLabel: 'Sun Sep 13, 1:00 PM MDT',
    tv: 'USA Network',
    url: 'https://www.nascar.com',
  },
  {
    name: 'Bass Pro Shops Night Race',
    track: 'Bristol Motor Speedway',
    date: '2026-09-19T17:30:00',
    dateLabel: 'Sat Sep 19, 5:30 PM MDT',
    tv: 'USA Network',
    url: 'https://www.nascar.com',
  },
  {
    name: 'Hollywood Casino 400',
    track: 'Kansas Speedway',
    date: '2026-09-27T13:00:00',
    dateLabel: 'Sun Sep 27, 1:00 PM MDT',
    tv: 'USA Network',
    url: 'https://www.nascar.com',
  },
  {
    name: 'South Point 400',
    track: 'Las Vegas Motor Speedway',
    date: '2026-10-04T15:30:00',
    dateLabel: 'Sun Oct 4, 3:30 PM MDT',
    tv: 'USA Network',
    url: 'https://www.nascar.com',
  },
  {
    name: 'Bank of America 400',
    track: 'Charlotte Motor Speedway',
    date: '2026-10-11T13:00:00',
    dateLabel: 'Sun Oct 11, 1:00 PM MDT',
    tv: 'USA Network',
    url: 'https://www.nascar.com',
  },
  {
    name: 'Freeway Insurance 500',
    track: 'Phoenix Raceway',
    date: '2026-10-18T13:00:00',
    dateLabel: 'Sun Oct 18, 1:00 PM MDT',
    tv: 'USA Network',
    url: 'https://www.nascar.com',
  },
  {
    name: 'YellaWood 500',
    track: 'Talladega Superspeedway',
    date: '2026-10-25T12:00:00',
    dateLabel: 'Sun Oct 25, 12:00 PM MDT',
    tv: 'NBC',
    url: 'https://www.nascar.com',
  },
  {
    name: 'Xfinity 500',
    track: 'Martinsville Speedway',
    date: '2026-11-01T12:00:00',
    dateLabel: 'Sun Nov 1, 12:00 PM MST',
    tv: 'NBC',
    url: 'https://www.nascar.com',
  },
  {
    name: 'Straight Talk Wireless 400',
    track: 'Homestead-Miami Speedway',
    date: '2026-11-08T13:00:00',
    dateLabel: 'Sun Nov 8, 1:00 PM MST',
    tv: 'NBC',
    url: 'https://www.nascar.com',
  },
];

export function getNextRace(now: Date = new Date()): CupRace | null {
  return CUP_RACES_2026.find((r) => new Date(r.date) > now) ?? null;
}
