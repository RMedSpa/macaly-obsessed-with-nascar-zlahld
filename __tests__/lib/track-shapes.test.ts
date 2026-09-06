import { describe, expect, it } from 'vitest';
import { TRACKS } from '@/lib/tracks';
import {
  TRACK_SHAPES,
  getTrackShape,
  relativeScale,
  trackShapeIds,
} from '@/lib/track-shapes';

describe('broadcast track outlines', () => {
  it('exports a researched path for every Chase shape id', () => {
    expect(trackShapeIds()).toEqual([
      'darlington',
      'gateway',
      'bristol',
      'kansas',
      'vegas',
      'charlotte',
      'phoenix',
      'talladega',
      'martinsville',
      'homestead',
    ]);
    for (const id of trackShapeIds()) {
      const shape = getTrackShape(id);
      expect(shape.d.startsWith('M ')).toBe(true);
      expect(shape.d.includes('Z')).toBe(true);
      expect(shape.reference.length).toBeGreaterThan(20);
      expect(shape.lengthMiles).toBeGreaterThan(0.4);
      expect(shape.turns).toHaveLength(4);
    }
  });

  it('keeps every outline unique so the 1.5s are not the same ellipse', () => {
    const paths = trackShapeIds().map((id) => TRACK_SHAPES[id].d);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('shares one shape table with every track desk slug', () => {
    for (const track of TRACKS) {
      expect(TRACK_SHAPES[track.shape]).toBeTruthy();
      expect(TRACK_SHAPES[track.shape].id).toBe(track.shape);
    }
  });

  it('draws Bristol much smaller than Talladega on the scale strip', () => {
    expect(relativeScale(0.533)).toBeLessThan(relativeScale(2.66) * 0.35);
    expect(relativeScale(2.66)).toBe(1);
  });

  it('encodes Darlington as an egg and Phoenix with a dogleg callout', () => {
    expect(TRACK_SHAPES.darlington.geometryNote.toLowerCase()).toMatch(/egg/);
    expect(TRACK_SHAPES.phoenix.extras?.some((e) => e.label === 'DOGLEG')).toBe(true);
    expect(TRACK_SHAPES.charlotte.extras?.some((e) => e.kind === 'ghost')).toBe(true);
    expect(TRACK_SHAPES.martinsville.geometryNote.toLowerCase()).toMatch(/paperclip/);
    expect(TRACK_SHAPES.talladega.lengthMiles).toBeCloseTo(2.66);
  });

  it('draws the seven problem tracks as polylines or rings, not Catmull blobs', () => {
    const seven = ['bristol', 'charlotte', 'homestead', 'phoenix', 'vegas', 'talladega', 'kansas'] as const;
    for (const id of seven) {
      const d = TRACK_SHAPES[id].d;
      expect(d.includes(' C ')).toBe(false);
      expect(d.includes(' L ') || d.includes(' A ')).toBe(true);
    }
    expect(TRACK_SHAPES.phoenix.d).toMatch(/575 72/);
    expect(TRACK_SHAPES.charlotte.d).toMatch(/430 468/);
    expect(TRACK_SHAPES.kansas.d).toMatch(/500 498/);
    expect(TRACK_SHAPES.bristol.d).toMatch(/ L /);
    expect(TRACK_SHAPES.homestead.d).toMatch(/ A /);
  });
});
