import { describe, expect, it } from 'vitest';
import {
  calendarRaceChip,
  getNextCalendarRace,
  getTrack,
  trackSlugs,
  tracksByChaseOrder,
} from '@/lib/tracks';

describe('tracks desk data', () => {
  it('exports ten Chase track slugs', () => {
    expect(trackSlugs()).toEqual([
      'darlington',
      'gateway',
      'bristol',
      'kansas',
      'las-vegas',
      'charlotte',
      'phoenix',
      'talladega',
      'martinsville',
      'homestead-miami',
    ]);
  });

  it('orders tracks by Chase week', () => {
    expect(tracksByChaseOrder().map((t) => t.chaseOrder)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('keeps Charlotte Chase race on the oval', () => {
    const charlotte = getTrack('charlotte');
    expect(charlotte?.calendar2026[0]?.layout).toMatch(/oval/i);
    expect(charlotte?.calendar2026[0]?.name).toBe('Bank of America 400');
  });

  it('does not invent a 2026 Southern 500 winner', () => {
    const darlington = getTrack('darlington');
    expect(darlington?.winners.some((w) => w.year === 2026 && w.race.includes('Southern'))).toBe(false);
    expect(darlington?.calendar2026[0]?.status).toBe('live');
  });

  it('lists only four Gateway Cup winners through 2025', () => {
    expect(getTrack('gateway')?.winners).toHaveLength(4);
  });

  it('returns today’s Chase date as next when the race is later today', () => {
    const darlington = getTrack('darlington');
    expect(darlington).toBeTruthy();
    const next = getNextCalendarRace(darlington!, new Date('2026-09-06T12:00:00'));
    expect(next?.name).toBe('Cook Out Southern 500');
    const chip = calendarRaceChip(next);
    expect(chip?.live).toBe(true);
    expect(chip?.kicker).toMatch(/LIVE/i);
  });
});
