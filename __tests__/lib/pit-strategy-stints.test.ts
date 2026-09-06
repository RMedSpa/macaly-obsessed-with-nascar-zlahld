import { describe, expect, it } from 'vitest';
import {
  buildStintsFromStops,
  compareStintToOptimal,
  stintDegSeconds,
} from '@/lib/pit-strategy';

describe('Berry Loudon stints vs optimal', () => {
  const stops = [
    { lap: 40, kind: 'caution' as const, note: 'wets', rainTires: true },
    { lap: 70, kind: 'stage' as const, note: 'stage 1' },
    { lap: 132, kind: 'green' as const, note: 'leader green' },
    { lap: 185, kind: 'stage' as const, note: 'stage 2' },
  ];

  it('builds completed stints plus the open set', () => {
    const stints = buildStintsFromStops(stops, 199);
    expect(stints.map((s) => s.laps)).toEqual([40, 30, 62, 53, 14]);
    expect(stints[0].rainTires).toBe(true);
    expect(stints[2].kind).toBe('green');
    expect(stints[4].kind).toBe('open');
    expect(stints[4].completed).toBe(false);
  });

  it('scores extra fade vs a 32-lap optimal', () => {
    const stints = buildStintsFromStops(stops, 199);
    const green = compareStintToOptimal(stints[2], 32, 29.8, 0.072);
    expect(green.comparable).toBe(true);
    expect(green.deltaLaps).toBe(30);
    expect(green.extraDegSeconds).toBeCloseTo(
      stintDegSeconds(62, 0.072) - stintDegSeconds(32, 0.072),
      5,
    );
    expect(compareStintToOptimal(stints[0], 32, 29.8, 0.072).skipReason).toBe('Rain tires');
    expect(compareStintToOptimal(stints[4], 32, 29.8, 0.072).skipReason).toBe('In progress');
  });
});
