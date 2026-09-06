/**
 * Chase-track outlines for the Tracks desk.
 *
 * Each path is an original broadcast-style silhouette redrawn from public
 * geometry (Wikipedia / Racing-Reference / OSM / published radii), not a
 * copy of an official speedway vector. Paths share a local 1000×560 space,
 * counterclockwise, frontstretch at the bottom, T1 at bottom-right.
 */

import type { TrackShapeId } from '@/lib/tracks';

export type TrackTurnLabel = {
  id: string;
  x: number;
  y: number;
};

export type TrackShapeExtra = {
  d: string;
  kind: 'ghost' | 'accent';
  label?: string;
  labelX?: number;
  labelY?: number;
};

export type TrackShapeDef = {
  id: TrackShapeId;
  /** Closed racing-surface outline. */
  d: string;
  /** Optional inner line (banking cue / groove). */
  innerD?: string;
  sf: { x: number; y: number; angle: number };
  turns: TrackTurnLabel[];
  extras?: TrackShapeExtra[];
  /** Statute miles — index scale strip. */
  lengthMiles: number;
  /** Short note shown under the graphic. */
  geometryNote: string;
  /** Public reference used to tune the outline. */
  reference: string;
};

function n(v: number): string {
  return v.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
}

function catmullClosed(pts: Array<[number, number]>): string {
  const count = pts.length;
  let d = `M ${n(pts[0][0])} ${n(pts[0][1])}`;
  for (let i = 0; i < count; i += 1) {
    const p0 = pts[(i - 1 + count) % count];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % count];
    const p3 = pts[(i + 2) % count];
    d += ` C ${n(p1[0] + (p2[0] - p0[0]) / 6)} ${n(p1[1] + (p2[1] - p0[1]) / 6)} ${n(
      p2[0] - (p3[0] - p1[0]) / 6
    )} ${n(p2[1] - (p3[1] - p1[1]) / 6)} ${n(p2[0])} ${n(p2[1])}`;
  }
  return `${d} Z`;
}

function insetPath(pts: Array<[number, number]>, scale: number, cx = 500, cy = 280): string {
  return catmullClosed(
    pts.map(([x, y]) => [cx + (x - cx) * scale, cy + (y - cy) * scale])
  );
}

/** Two-ellipse egg: unequal end radii, tapering tangent straights. */
function eggPoints(
  cx: number,
  cy: number,
  halfSpan: number,
  leftRx: number,
  rightRx: number,
  leftRy = leftRx,
  rightRy = rightRx,
  steps = 16
): Array<[number, number]> {
  const d = halfSpan * 2;
  const alpha = Math.asin(Math.max(-0.85, Math.min(0.85, (rightRx - leftRx) / d)));
  const leftCx = cx - halfSpan;
  const rightCx = cx + halfSpan;

  const pts: Array<[number, number]> = [];

  const fl: [number, number] = [
    leftCx - leftRx * Math.sin(alpha),
    cy + leftRy * Math.cos(alpha),
  ];
  const fr: [number, number] = [
    rightCx - rightRx * Math.sin(alpha),
    cy + rightRy * Math.cos(alpha),
  ];
  for (let i = 0; i <= 4; i += 1) {
    const t = i / 4;
    pts.push([fl[0] + (fr[0] - fl[0]) * t, fl[1] + (fr[1] - fl[1]) * t]);
  }

  const a0 = Math.PI / 2 - alpha;
  const a1 = -Math.PI / 2 - alpha;
  for (let i = 1; i <= steps; i += 1) {
    const t = i / steps;
    const a = a0 + (a1 - a0) * t;
    pts.push([rightCx + rightRx * Math.cos(a), cy + rightRy * Math.sin(a)]);
  }

  const br: [number, number] = [
    rightCx - rightRx * Math.sin(alpha),
    cy - rightRy * Math.cos(alpha),
  ];
  const bl: [number, number] = [
    leftCx - leftRx * Math.sin(alpha),
    cy - leftRy * Math.cos(alpha),
  ];
  for (let i = 1; i <= 4; i += 1) {
    const t = i / 4;
    pts.push([br[0] + (bl[0] - br[0]) * t, br[1] + (bl[1] - br[1]) * t]);
  }

  const bStart = Math.atan2(-leftRy * Math.cos(alpha), -leftRx * Math.sin(alpha));
  const bEnd = Math.atan2(leftRy * Math.cos(alpha), -leftRx * Math.sin(alpha));
  let span = bEnd - bStart;
  if (span > 0) span -= Math.PI * 2;
  for (let i = 1; i < steps; i += 1) {
    const a = bStart + (span * i) / steps;
    pts.push([leftCx + leftRx * Math.cos(a), cy + leftRy * Math.sin(a)]);
  }

  return pts;
}

/** Paperclip / stadium: parallel straights + circular hairpin ends. */
function paperclipPoints(
  cx: number,
  cy: number,
  straight: number,
  endR: number,
  steps = 12
): Array<[number, number]> {
  const x0 = cx - straight / 2;
  const x1 = cx + straight / 2;
  const pts: Array<[number, number]> = [];

  for (let i = 0; i <= 4; i += 1) {
    const t = i / 4;
    pts.push([x0 + (x1 - x0) * t, cy + endR]);
  }
  for (let i = 1; i <= steps; i += 1) {
    const a = Math.PI / 2 - (Math.PI * i) / steps;
    pts.push([x1 + endR * Math.cos(a), cy + endR * Math.sin(a)]);
  }
  for (let i = 1; i <= 4; i += 1) {
    const t = i / 4;
    pts.push([x1 + (x0 - x1) * t, cy - endR]);
  }
  for (let i = 1; i < steps; i += 1) {
    const a = -Math.PI / 2 - (Math.PI * i) / steps;
    pts.push([x0 + endR * Math.cos(a), cy + endR * Math.sin(a)]);
  }
  return pts;
}

/**
 * D / tri-oval: flatter backstretch, single frontstretch bulge.
 * `bulge` is extra south offset at mid-frontstretch (TV grandstand side).
 * `pointed` > 0 sharpens the tri-oval into a more triangular D (Kansas).
 */
function triOvalPoints(opts: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  bulge: number;
  pointed?: number;
  backFlat?: number;
  steps?: number;
}): Array<[number, number]> {
  const { cx, cy, rx, ry, bulge, pointed = 0, backFlat = 0.22, steps = 48 } = opts;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < steps; i += 1) {
    // 0 at +x (T1), increasing CCW in math (y-up). Convert so frontstretch is +y in SVG.
    const a = (Math.PI * 2 * i) / steps + Math.PI / 2;
    let x = cx + rx * Math.cos(a);
    let y = cy + ry * Math.sin(a);

    const front = Math.max(0, Math.sin(a)); // 1 at bottom
    const back = Math.max(0, -Math.sin(a));
    const mid = Math.pow(front, 2.1);
    y += bulge * mid;
    if (pointed > 0) {
      x += (x - cx) * pointed * mid;
      y += pointed * 10 * mid;
    }
    y += backFlat * back * (ry * 0.08);
    pts.push([x, y]);
  }
  return pts;
}

/** Quad-oval: two discrete frontstretch doglegs with a short S/F straight. */
function quadOvalPoints(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  dogleg: number,
  steps = 64
): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < steps; i += 1) {
    const a = (Math.PI * 2 * i) / steps + Math.PI / 2;
    let x = cx + rx * Math.cos(a);
    let y = cy + ry * Math.sin(a);
    const front = Math.max(0, Math.sin(a));
    const nx = (x - cx) / rx;
    // Two shoulders + a flat S/F shelf — the SMI “double dogleg” read.
    const shoulder = Math.pow(front, 1.15) * Math.pow(Math.abs(Math.abs(nx) - 0.32), 0.35);
    const shelf = front > 0.78 && Math.abs(nx) < 0.2 ? 0.42 : 0;
    y += dogleg * (0.55 * Math.pow(front, 1.8) + 0.9 * shoulder * Math.pow(front, 1.2) - shelf);
    pts.push([x, y]);
  }
  return pts;
}

/**
 * Phoenix: mile oval + unmistakable backstretch/front dogleg kink.
 * After the 2018 remodel the S/F sits just before the dogleg (RacingCircuits.info).
 */
function phoenixPoints(): Array<[number, number]> {
  // Constructed as a rounded D, then a dogleg kink on the south-east frontstretch.
  // Refs: Wikipedia "dogleg oval"; 2011 dogleg pushed out 95 ft / radius ~500 ft.
  const cx = 500;
  const cy = 278;
  const pts: Array<[number, number]> = [];
  const steps = 64;
  for (let i = 0; i < steps; i += 1) {
    const a = (Math.PI * 2 * i) / steps + Math.PI / 2;
    let rx = 268;
    let ry = 148;
    // T3–T4 (west) tighter than T1–T2 (east) — 11° vs 9° banks, shorter radius.
    if (Math.cos(a) < 0) {
      rx = 238;
      ry = 142;
    }
    let x = cx + rx * Math.cos(a);
    let y = cy + ry * Math.sin(a);

    // Dogleg: sharp outward kink on the frontstretch, biased toward T1 (east).
    // TV graphic reads this as the passing lane / restart launch.
    const ang = ((a - Math.PI / 2 + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2);
    if (ang > 0.03 && ang < 0.2) {
      const t = (ang - 0.03) / 0.17;
      const bump = Math.pow(Math.sin(t * Math.PI), 0.72);
      x += 36 * bump;
      y += 78 * bump;
    }
    pts.push([x, y]);
  }
  return pts;
}

function turnAt(
  pts: Array<[number, number]>,
  index: number,
  outward: number,
  id: string
): TrackTurnLabel {
  const p = pts[index];
  const prev = pts[(index - 1 + pts.length) % pts.length];
  const next = pts[(index + 1) % pts.length];
  const tx = next[0] - prev[0];
  const ty = next[1] - prev[1];
  const len = Math.hypot(tx, ty) || 1;
  // Outward normal (path is CCW, so right-hand normal in SVG y-down is inward; flip)
  const nx = ty / len;
  const ny = -tx / len;
  return { id, x: p[0] + nx * outward, y: p[1] + ny * outward };
}

function midFront(pts: Array<[number, number]>): { x: number; y: number; angle: number } {
  // First few points are the frontstretch (left → right).
  const a = pts[1];
  const b = pts[2] ?? pts[1];
  const angle = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
  return { x: (a[0] + b[0]) / 2, y: (a[1] + b[1]) / 2, angle };
}

function buildDarlington(): TrackShapeDef {
  // T3–T4 west 525 ft / 23° / 62 ft wide; T1–T2 east 600 ft / 25° / 79 ft.
  // Straights both 1,229 ft. Egg tapers toward the west (minnow-pond) end.
  // Refs: Wikipedia Darlington Raceway; Wikimapia radii; Autoweek minnow-pond history.
  const pts = eggPoints(512, 278, 204, 82, 142, 78, 132, 16);
  return {
    id: 'darlington',
    d: catmullClosed(pts),
    innerD: insetPath(pts, 0.86),
    sf: midFront(pts),
    turns: [
      turnAt(pts, 8, 28, 'T1'),
      turnAt(pts, 16, 28, 'T2'),
      turnAt(pts, 28, 26, 'T3'),
      turnAt(pts, 34, 26, 'T4'),
    ],
    extras: [
      {
        // Tight T3–T4 wall — the stripe lives on the west end.
        d: (() => {
          const slice = pts.slice(26, 36);
          return `M ${slice.map((p) => `${n(p[0])} ${n(p[1])}`).join(' L ')}`;
        })(),
        kind: 'accent',
        label: 'STRIPE · T3–T4',
        labelX: 148,
        labelY: 278,
      },
    ],
    lengthMiles: 1.366,
    geometryNote: 'Egg · T3–T4 pinched (525 ft) · T1–T2 sweeping (600 ft)',
    reference:
      'Wikipedia Darlington Raceway (asymmetric egg); Wikimapia T1–T2 r=600 ft / T3–T4 r=525 ft; Autoweek minnow-pond west-end pinch',
  };
}

function buildGateway(): TrackShapeDef {
  // 1.25-mi egg. Backstretch pinned to IL-203 → T1–T2 tighter (11°) than T3–T4 (9°).
  // Frontstretch 1,922 ft, backstretch 1,976 ft. Opposite pinch of Darlington.
  // Refs: Wikipedia Gateway Motorsports Park; Jayski / FRCS stretch lengths.
  const pts = eggPoints(488, 280, 178, 132, 78, 124, 74, 16);
  return {
    id: 'gateway',
    d: catmullClosed(pts),
    innerD: insetPath(pts, 0.87),
    sf: midFront(pts),
    turns: [
      turnAt(pts, 8, 26, 'T1'),
      turnAt(pts, 16, 26, 'T2'),
      turnAt(pts, 28, 26, 'T3'),
      turnAt(pts, 34, 26, 'T4'),
    ],
    lengthMiles: 1.25,
    geometryNote: '1.25-mi egg · T1–T2 tighter (IL-203) · not a 1.5 cookie-cutter',
    reference:
      'Wikipedia Gateway / WWTR: backstretch parallel to IL-203 makes T1–T2 tighter than T3–T4; FRCS stretches 1,922 / 1,976 ft',
  };
}

function buildBristol(): TrackShapeDef {
  // Stadium oval — short 650 ft straights vs large-radius ends; nearly circular bowl.
  // Concrete, 24–28° progressive banks. Dual-line width is the banking cue.
  // Refs: Wikipedia Bristol Motor Speedway; BMS media guide (0.533 mi, 650 ft straights).
  const pts = paperclipPoints(500, 280, 78, 152, 16);
  return {
    id: 'bristol',
    d: catmullClosed(pts),
    innerD: insetPath(pts, 0.72),
    sf: midFront(pts),
    turns: [
      turnAt(pts, 8, 34, 'T1'),
      turnAt(pts, 16, 34, 'T2'),
      turnAt(pts, 26, 34, 'T3'),
      turnAt(pts, 34, 34, 'T4'),
    ],
    lengthMiles: 0.533,
    geometryNote: '0.533-mi concrete bowl · nearly circular · 24–28° banks',
    reference:
      'Wikipedia + BMS media guide: 0.533-mi stadium oval, 650 ft straights, progressive 24–28° — closest Chase track to a circle',
  };
}

function buildKansas(): TrackShapeDef {
  // ISC 1.5 tri-oval: triangular D — “grabbed the long side and pulled.”
  // Single frontstretch bulge, flatter backstretch. Progressive 17–20°.
  // Refs: Wikipedia Kansas Speedway; Building Speed cookie-cutter taxonomy (Kansas = D / tri-oval).
  const pts = triOvalPoints({
    cx: 500,
    cy: 258,
    rx: 300,
    ry: 132,
    bulge: 78,
    pointed: 0.22,
    backFlat: 0.55,
  });
  return {
    id: 'kansas',
    d: catmullClosed(pts),
    innerD: insetPath(pts, 0.88),
    sf: { x: 500, y: 468, angle: 0 },
    turns: [
      { id: 'T1', x: 812, y: 348 },
      { id: 'T2', x: 812, y: 168 },
      { id: 'T3', x: 188, y: 168 },
      { id: 'T4', x: 188, y: 348 },
    ],
    extras: [
      {
        d: 'M 430 454 L 500 478 L 570 454',
        kind: 'accent',
        label: 'TRI-OVAL',
        labelX: 500,
        labelY: 512,
      },
    ],
    lengthMiles: 1.5,
    geometryNote: '1.5-mi tri-oval · triangular D · single frontstretch bulge',
    reference:
      'Wikipedia Kansas Speedway (1.5-mi tri-oval, progressive 17–20°); Building Speed: Kansas is the D / pulled-triangle, not a quad-oval',
  };
}

function buildVegas(): TrackShapeDef {
  // Traditional tri-oval / rounded D — smoother frontstretch curve than Kansas,
  // slightly fatter, 20° constant banks. Not the same ellipse as Homestead.
  // Refs: Wikipedia LVMS; Racing-Reference “D-shaped oval”; RacingCircuits “traditional tri-oval.”
  const pts = triOvalPoints({
    cx: 500,
    cy: 276,
    rx: 270,
    ry: 168,
    bulge: 28,
    pointed: 0,
    backFlat: 0.08,
  });
  return {
    id: 'vegas',
    d: catmullClosed(pts),
    innerD: insetPath(pts, 0.88),
    sf: { x: 500, y: 464, angle: 0 },
    turns: [
      { id: 'T1', x: 780, y: 368 },
      { id: 'T2', x: 780, y: 180 },
      { id: 'T3', x: 220, y: 180 },
      { id: 'T4', x: 220, y: 368 },
    ],
    extras: [
      {
        d: 'M 420 456 Q 500 478 580 456',
        kind: 'accent',
        label: 'D-OVAL',
        labelX: 500,
        labelY: 504,
      },
    ],
    lengthMiles: 1.5,
    geometryNote: '1.5-mi D-oval · smoother tri-oval than Kansas · 20° banks',
    reference:
      'Wikipedia Las Vegas Motor Speedway (D-shaped 1.5); RacingCircuits traditional tri-oval (Daytona-like single frontstretch curve)',
  };
}

function buildCharlotte(): TrackShapeDef {
  // SMI quad-oval: double dogleg on the frontstretch, S/F on the mid-straight.
  // 24° turns, 5° straights. 2026 Chase is the oval; Roval 2018–25 as ghost.
  // Refs: Wikipedia Charlotte Motor Speedway; RacingCircuits quad-oval definition; CMS Feb 3 2026 oval return.
  const pts = quadOvalPoints(500, 268, 288, 146, 68);
  const roval =
    'M 742 318 C 720 360 680 378 628 372 C 580 366 552 348 538 320 C 522 288 500 274 468 278 C 432 284 408 312 400 344 C 390 380 408 408 448 418 C 492 428 540 412 562 378 C 578 354 602 348 630 360 C 662 374 688 400 682 430 C 674 468 620 488 500 492';
  return {
    id: 'charlotte',
    d: catmullClosed(pts),
    innerD: insetPath(pts, 0.88),
    sf: { x: 500, y: 468, angle: 0 },
    turns: [
      { id: 'T1', x: 790, y: 362 },
      { id: 'T2', x: 790, y: 178 },
      { id: 'T3', x: 210, y: 178 },
      { id: 'T4', x: 210, y: 362 },
    ],
    extras: [
      {
        d: roval,
        kind: 'ghost',
        label: 'ROVAL 2018–25',
        labelX: 500,
        labelY: 330,
      },
    ],
    lengthMiles: 1.5,
    geometryNote: '1.5-mi quad-oval · double frontstretch dogleg · 2026 Chase is oval',
    reference:
      'Wikipedia CMS quad-oval; RacingCircuits: SMI double dogleg with S/F on the mid-straight; CMS 2026 oval return (not Roval)',
  };
}

function buildPhoenix(): TrackShapeDef {
  const pts = phoenixPoints();
  return {
    id: 'phoenix',
    d: catmullClosed(pts),
    innerD: insetPath(pts, 0.86),
    sf: { x: 548, y: 430, angle: 18 },
    turns: [
      { id: 'T1', x: 790, y: 300 },
      { id: 'T2', x: 760, y: 168 },
      { id: 'T3', x: 232, y: 168 },
      { id: 'T4', x: 220, y: 360 },
    ],
    extras: [
      {
        d: 'M 560 428 C 600 460 650 478 702 456',
        kind: 'accent',
        label: 'DOGLEG',
        labelX: 720,
        labelY: 500,
      },
    ],
    lengthMiles: 1.0,
    geometryNote: '1-mi dogleg mile · S/F launches into the kink (2018 remodel)',
    reference:
      'Wikipedia Phoenix Raceway (dogleg oval); RacingCircuits.info 2011 dogleg +95 ft / 2018 S/F moved to just before the dogleg',
  };
}

function buildTalladega(): TrackShapeDef {
  // Longest Cup oval: 2.66 mi tri-oval. Frontstretch 4,300 ft with 16.5° bulge;
  // backstretch 4,000 ft; turns r≈1,100 ft / 33°. S/F offset toward T1.
  // Refs: Wikipedia Talladega; ESPN / RacingCircuits stretch + radius notes.
  const pts = triOvalPoints({
    cx: 500,
    cy: 278,
    rx: 368,
    ry: 118,
    bulge: 38,
    pointed: 0.04,
    backFlat: 0.4,
    steps: 56,
  });
  return {
    id: 'talladega',
    d: catmullClosed(pts),
    innerD: insetPath(pts, 0.9),
    sf: { x: 612, y: 430, angle: -6 },
    turns: [
      { id: 'T1', x: 868, y: 348 },
      { id: 'T2', x: 868, y: 208 },
      { id: 'T3', x: 132, y: 208 },
      { id: 'T4', x: 132, y: 348 },
    ],
    extras: [
      {
        d: 'M 430 428 Q 500 452 620 430',
        kind: 'accent',
        label: 'TRI-OVAL 2.66 MI',
        labelX: 500,
        labelY: 488,
      },
    ],
    lengthMiles: 2.66,
    geometryNote: '2.66-mi tri-oval · longest Cup oval · frontstretch bulge · S/F offset to T1',
    reference:
      'Wikipedia Talladega (2.660 mi, 33° / 16.5° tri-oval); ESPN: frontstretch 4,300 ft, backstretch 4,000 ft, turn radius 1,100 ft; S/F ~¼-mi toward T1',
  };
}

function buildMartinsville(): TrackShapeDef {
  // Classic paperclip: ~800 ft straights, 12° hairpin ends, 0.526 mi.
  // Concrete lower lanes in the corners. Oldest Cup track still on the board.
  // Refs: Wikipedia Martinsville Speedway; FRCS paperclip taxonomy.
  const pts = paperclipPoints(500, 280, 310, 78, 14);
  return {
    id: 'martinsville',
    d: catmullClosed(pts),
    innerD: insetPath(pts, 0.78),
    sf: midFront(pts),
    turns: [
      turnAt(pts, 8, 28, 'T1'),
      turnAt(pts, 16, 28, 'T2'),
      turnAt(pts, 26, 28, 'T3'),
      turnAt(pts, 34, 28, 'T4'),
    ],
    lengthMiles: 0.526,
    geometryNote: '0.526-mi paperclip · long straights · tight 12° hairpins',
    reference:
      'Wikipedia Martinsville (0.526 mi, 12° turns, 0° straights, concrete corners); FRCS paperclip: two long straights + sharp 180° ends',
  };
}

function buildHomestead(): TrackShapeDef {
  // True stadium oval after the 2003 variable-bank rebuild — not a D, not a quad.
  // Progressive 18–20°. Most elliptical of the 1.5s on this desk.
  // Refs: Wikipedia Homestead-Miami; Building Speed: “Homestead actually is oval shaped.”
  const pts = triOvalPoints({
    cx: 500,
    cy: 280,
    rx: 248,
    ry: 178,
    bulge: 4,
    pointed: 0,
    backFlat: 0,
    steps: 48,
  });
  return {
    id: 'homestead',
    d: catmullClosed(pts),
    innerD: insetPath(pts, 0.88),
    sf: { x: 500, y: 456, angle: 0 },
    turns: [
      { id: 'T1', x: 768, y: 372 },
      { id: 'T2', x: 768, y: 188 },
      { id: 'T3', x: 232, y: 188 },
      { id: 'T4', x: 232, y: 372 },
    ],
    extras: [
      {
        d: 'M 300 200 Q 500 168 700 200',
        kind: 'accent',
        label: 'PROG. BANKS',
        labelX: 178,
        labelY: 168,
      },
    ],
    lengthMiles: 1.5,
    geometryNote: '1.5-mi true oval · progressive 18–20° · not a D or quad',
    reference:
      'Wikipedia Homestead-Miami Speedway (variable-bank oval post-2003); Building Speed taxonomy: Homestead is the oval-shaped 1.5, unlike Kansas/Vegas D or Charlotte quad',
  };
}

const BUILDERS: Record<TrackShapeId, () => TrackShapeDef> = {
  darlington: buildDarlington,
  gateway: buildGateway,
  bristol: buildBristol,
  kansas: buildKansas,
  vegas: buildVegas,
  charlotte: buildCharlotte,
  phoenix: buildPhoenix,
  talladega: buildTalladega,
  martinsville: buildMartinsville,
  homestead: buildHomestead,
};

export const TRACK_SHAPES: Record<TrackShapeId, TrackShapeDef> = {
  darlington: buildDarlington(),
  gateway: buildGateway(),
  bristol: buildBristol(),
  kansas: buildKansas(),
  vegas: buildVegas(),
  charlotte: buildCharlotte(),
  phoenix: buildPhoenix(),
  talladega: buildTalladega(),
  martinsville: buildMartinsville(),
  homestead: buildHomestead(),
};

export const TRACK_SHAPE_VIEWBOX = '0 0 1000 560';

export function getTrackShape(id: TrackShapeId): TrackShapeDef {
  return TRACK_SHAPES[id];
}

export function trackShapeIds(): TrackShapeId[] {
  return Object.keys(BUILDERS) as TrackShapeId[];
}

/** Linear size vs Talladega, floored so half-miles stay readable on the index strip. */
export function relativeScale(lengthMiles: number): number {
  const raw = lengthMiles / 2.66;
  return Math.max(0.28, raw);
}
