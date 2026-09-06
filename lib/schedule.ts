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
// Updated Sept 5, 2026 — Darlington Chase weekend. Cup qualifying canceled; metric grid posted. Southern 500 Sun 5 p.m. ET / 3 p.m. MDT USA.
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
];

export function getNextRace(now: Date = new Date()): CupRace | null {
  return CUP_RACES_2026.find((r) => new Date(r.date) > now) ?? null;
}
