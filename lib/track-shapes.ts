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
  /** Miter joins keep doglegs / quad corners from dissolving into blobs. */
  sharp?: boolean;
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

function polyClosed(pts: Array<[number, number]>): string {
  return `M ${pts.map(([x, y]) => `${n(x)} ${n(y)}`).join(' L ')} Z`;
}

function insetPoly(pts: Array<[number, number]>, scale: number, cx = 500, cy = 280): string {
  return polyClosed(pts.map(([x, y]) => [cx + (x - cx) * scale, cy + (y - cy) * scale]));
}

function ellipseRing(cx: number, cy: number, rx: number, ry: number): string {
  return `M ${n(cx + rx)} ${n(cy)} A ${n(rx)} ${n(ry)} 0 1 1 ${n(cx - rx)} ${n(cy)} A ${n(rx)} ${n(ry)} 0 1 1 ${n(cx + rx)} ${n(cy)} Z`;
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
  // Nearly circular concrete bowl. 650 ft straights vs ~588 ft ends — stadium oval,
  // not a paperclip and not a fat 1.5. Dual ring = 24–28° bank width.
  // Refs: Wikipedia Bristol Motor Speedway; BMS media guide (0.533 mi).
  const cx = 500;
  const cy = 278;
  const rx = 128;
  const ry = 118;
  // Tiny flats so it reads as a stadium bowl, not a geometry-class circle.
  const stadium = [
    [cx - 22, cy + ry],
    [cx + 22, cy + ry],
    [cx + rx, cy + 18],
    [cx + rx, cy - 18],
    [cx + 22, cy - ry],
    [cx - 22, cy - ry],
    [cx - rx, cy - 18],
    [cx - rx, cy + 18],
  ] as Array<[number, number]>;
  return {
    id: 'bristol',
    d: polyClosed(stadium),
    innerD: insetPoly(stadium, 0.62),
    sf: { x: 500, y: 402, angle: 0 },
    turns: [
      { id: 'T1', x: 655, y: 355 },
      { id: 'T2', x: 655, y: 200 },
      { id: 'T3', x: 345, y: 200 },
      { id: 'T4', x: 345, y: 355 },
    ],
    extras: [
      {
        d: insetPoly(stadium, 0.8),
        kind: 'accent',
        label: 'BOWL 24–28°',
        labelX: 500,
        labelY: 278,
      },
    ],
    sharp: true,
    lengthMiles: 0.533,
    geometryNote: '0.533-mi concrete bowl · nearly circular · 24–28° banks',
    reference:
      'Wikipedia + BMS media guide: 0.533-mi stadium oval, 650 ft straights, progressive 24–28° — closest Chase track to a circle',
  };
}

function buildKansas(): TrackShapeDef {
  // ISC 1.5 tri-oval: triangular D — “grabbed the long side and pulled.”
  // Flat backstretch, single pointed frontstretch apex. Progressive 17–20°.
  // Refs: Wikipedia Kansas Speedway; Building Speed cookie-cutter taxonomy.
  const pts: Array<[number, number]> = [
    [250, 428],
    [360, 468],
    [500, 498],
    [640, 468],
    [750, 428],
    [808, 388],
    [838, 328],
    [838, 248],
    [808, 192],
    [750, 168],
    [250, 168],
    [192, 192],
    [162, 248],
    [162, 328],
    [192, 388],
  ];
  return {
    id: 'kansas',
    d: polyClosed(pts),
    innerD: insetPoly(pts, 0.86),
    sharp: true,
    sf: { x: 500, y: 498, angle: 0 },
    turns: [
      { id: 'T1', x: 860, y: 360 },
      { id: 'T2', x: 860, y: 188 },
      { id: 'T3', x: 140, y: 188 },
      { id: 'T4', x: 140, y: 360 },
    ],
    extras: [
      {
        d: 'M 400 478 L 500 498 L 600 478',
        kind: 'accent',
        label: 'TRI-OVAL',
        labelX: 500,
        labelY: 528,
      },
    ],
    lengthMiles: 1.5,
    geometryNote: '1.5-mi tri-oval · triangular D · pointed frontstretch · 17–20° prog.',
    reference:
      'Wikipedia Kansas Speedway (1.5-mi tri-oval, progressive 17–20°); Building Speed: Kansas is the D / pulled-triangle, not a quad-oval',
  };
}

function buildVegas(): TrackShapeDef {
  // Traditional D / tri-oval: flat-ish backstretch, one continuous frontstretch
  // curve (Daytona-like), 20° banks. Fuller ends than Kansas; no quad corners.
  // Refs: Wikipedia LVMS; Racing-Reference “D-shaped oval”; RacingCircuits.
  const pts: Array<[number, number]> = [
    [280, 412],
    [360, 442],
    [440, 458],
    [500, 464],
    [560, 458],
    [640, 442],
    [720, 412],
    [778, 368],
    [808, 310],
    [808, 242],
    [778, 190],
    [710, 164],
    [290, 164],
    [222, 190],
    [192, 242],
    [192, 310],
    [222, 368],
  ];
  return {
    id: 'vegas',
    d: polyClosed(pts),
    innerD: insetPoly(pts, 0.86),
    sharp: true,
    sf: { x: 500, y: 464, angle: 0 },
    turns: [
      { id: 'T1', x: 830, y: 348 },
      { id: 'T2', x: 830, y: 178 },
      { id: 'T3', x: 170, y: 178 },
      { id: 'T4', x: 170, y: 348 },
    ],
    extras: [
      {
        d: 'M 400 450 L 500 464 L 600 450',
        kind: 'accent',
        label: 'D-OVAL 20°',
        labelX: 500,
        labelY: 500,
      },
    ],
    lengthMiles: 1.5,
    geometryNote: '1.5-mi D-oval · single frontstretch curve · 20° banks',
    reference:
      'Wikipedia Las Vegas Motor Speedway (D-shaped 1.5); RacingCircuits traditional tri-oval (Daytona-like single frontstretch curve)',
  };
}

function buildCharlotte(): TrackShapeDef {
  // SMI quad-oval: two discrete frontstretch corners + a flat S/F grandstand
  // shelf (the “quad”). 24° turns. 2026 Chase is the oval; Roval as ghost.
  // Refs: Wikipedia CMS; RacingCircuits quad-oval; CMS Feb 3 2026 oval return.
  const pts: Array<[number, number]> = [
    [318, 428],
    [378, 456],
    [430, 468],
    [570, 468],
    [622, 456],
    [682, 428],
    [748, 392],
    [798, 348],
    [822, 298],
    [822, 236],
    [798, 188],
    [738, 160],
    [262, 160],
    [202, 188],
    [178, 236],
    [178, 298],
    [202, 348],
    [252, 392],
  ];
  const roval = 'M 748 392 L 700 360 L 640 348 L 600 318 L 560 300 L 510 312 L 470 348 L 450 390 L 480 428 L 530 448';
  return {
    id: 'charlotte',
    d: polyClosed(pts),
    innerD: insetPoly(pts, 0.86),
    sharp: true,
    sf: { x: 500, y: 468, angle: 0 },
    turns: [
      { id: 'T1', x: 848, y: 330 },
      { id: 'T2', x: 848, y: 176 },
      { id: 'T3', x: 152, y: 176 },
      { id: 'T4', x: 152, y: 330 },
    ],
    extras: [
      {
        d: roval,
        kind: 'ghost',
        label: 'ROVAL 2018–25',
        labelX: 500,
        labelY: 328,
      },
    ],
    lengthMiles: 1.5,
    geometryNote: '1.5-mi quad-oval · double dogleg + flat S/F shelf · 24° banks',
    reference:
      'Wikipedia CMS quad-oval; RacingCircuits: SMI double dogleg with S/F on the mid-straight; CMS 2026 oval return (not Roval)',
  };
}

function buildPhoenix(): TrackShapeDef {
  // Dogleg lives on the BACKSTRETCH (top). Classic PIR / RacingCircuits “desert
  // oddball”: T2 → outward kink → T3. 2018 S/F sits just before the launch.
  // Refs: Wikipedia Phoenix Raceway; RacingCircuits.info (dogleg on backstretch).
  const pts: Array<[number, number]> = [
    [320, 428],
    [500, 436],
    [680, 428],
    [758, 392],
    [800, 332],
    [800, 250],
    [768, 196],
    [720, 172],
    [660, 158],
    [575, 72],
    [425, 158],
    [360, 176],
    [300, 198],
    [232, 218],
    [200, 278],
    [210, 348],
    [248, 400],
  ];
  return {
    id: 'phoenix',
    d: polyClosed(pts),
    innerD: insetPoly(pts, 0.84),
    sharp: true,
    sf: { x: 690, y: 160, angle: -28 },
    turns: [
      { id: 'T1', x: 830, y: 360 },
      { id: 'T2', x: 830, y: 188 },
      { id: 'T3', x: 200, y: 188 },
      { id: 'T4', x: 168, y: 380 },
    ],
    extras: [
      {
        d: 'M 660 158 L 575 72 L 425 158',
        kind: 'accent',
        label: 'DOGLEG',
        labelX: 500,
        labelY: 52,
      },
    ],
    lengthMiles: 1.0,
    geometryNote: '1-mi dogleg mile · unmistakable backstretch kink · 2018 S/F at the launch',
    reference:
      'Wikipedia Phoenix Raceway (dogleg oval); RacingCircuits.info: unique dog-leg on the backstretch; 2011 +95 ft / 2018 S/F moved to just before the dogleg',
  };
}

function buildTalladega(): TrackShapeDef {
  // Longest Cup oval: 2.66 mi. Frontstretch 4,300 ft + 16.5° tri-oval bulge;
  // backstretch 4,000 ft; turns r≈1,100 ft / 33°. S/F offset toward T1.
  // Drawn using almost the full 1000-wide artboard so Dega dwarfs Bristol.
  // Refs: Wikipedia Talladega; ESPN stretch + radius notes.
  const pts: Array<[number, number]> = [
    [190, 372],
    [300, 382],
    [410, 430],
    [530, 468],
    [650, 452],
    [780, 400],
    [870, 360],
    [928, 316],
    [946, 278],
    [928, 236],
    [870, 194],
    [780, 166],
    [220, 166],
    [130, 194],
    [72, 236],
    [54, 278],
    [72, 316],
    [130, 360],
  ];
  return {
    id: 'talladega',
    d: polyClosed(pts),
    innerD: insetPoly(pts, 0.9),
    sharp: true,
    sf: { x: 620, y: 456, angle: -10 },
    turns: [
      { id: 'T1', x: 960, y: 330 },
      { id: 'T2', x: 960, y: 188 },
      { id: 'T3', x: 40, y: 188 },
      { id: 'T4', x: 40, y: 330 },
    ],
    extras: [
      {
        d: 'M 400 436 L 560 454 L 720 440',
        kind: 'accent',
        label: 'TRI-OVAL 2.66 MI',
        labelX: 500,
        labelY: 492,
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
  // True oval after the 2003 variable-bank rebuild — continuous ellipse, not a
  // D or quad. Progressive 18–20° shown as concentric rings (move-up-the-fence).
  // Refs: Wikipedia Homestead-Miami; Building Speed: “Homestead actually is oval shaped.”
  const cx = 500;
  const cy = 278;
  const rx = 248;
  const ry = 168;
  return {
    id: 'homestead',
    d: ellipseRing(cx, cy, rx, ry),
    innerD: ellipseRing(cx, cy, rx * 0.84, ry * 0.84),
    sf: { x: 500, y: 446, angle: 0 },
    turns: [
      { id: 'T1', x: 770, y: 370 },
      { id: 'T2', x: 770, y: 186 },
      { id: 'T3', x: 230, y: 186 },
      { id: 'T4', x: 230, y: 370 },
    ],
    extras: [
      {
        d: ellipseRing(cx, cy, rx * 0.92, ry * 0.92),
        kind: 'accent',
        label: 'PROG. 18–20°',
        labelX: 500,
        labelY: 278,
      },
    ],
    lengthMiles: 1.5,
    geometryNote: '1.5-mi true oval · progressive 18–20° rings · not a D or quad',
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
