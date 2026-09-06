import type { CupTrackProfile, TrackShapeId } from '@/lib/tracks';

type Props = {
  track: CupTrackProfile;
};

const ACCENT: Record<CupTrackProfile['accent'], string> = {
  red: '#e10600',
  cyan: '#2ec8ff',
  yellow: '#ffd100',
  blue: '#1f5cff',
  truck: '#ff8a1f',
};

function HudLabel({
  x,
  y,
  title,
  value,
  accent,
  anchor = 'start',
}: {
  x: number;
  y: number;
  title: string;
  value: string;
  accent: string;
  anchor?: 'start' | 'end' | 'middle';
}) {
  const textAnchor = anchor;
  return (
    <g>
      <text
        x={x}
        y={y}
        fill={accent}
        fontSize="8"
        fontFamily="Oswald, sans-serif"
        letterSpacing="1.6"
        textAnchor={textAnchor}
      >
        {title}
      </text>
      <text
        x={x}
        y={y + 14}
        fill="#f4f6fb"
        fontSize="13"
        fontFamily="Oswald, sans-serif"
        fontWeight="600"
        textAnchor={textAnchor}
      >
        {value}
      </text>
    </g>
  );
}

function TrackPath({
  d,
  accent,
  dash,
  width = 14,
}: {
  d: string;
  accent: string;
  dash?: string;
  width?: number;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="#0b1220"
        strokeWidth={width + 10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke="#1c2436"
        strokeWidth={width + 4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke={accent}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dash}
        opacity={0.95}
      />
      <path
        d={d}
        fill="none"
        stroke="#ffffff"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="7 11"
        opacity={0.7}
      />
      <circle r="0" fill="none">
        <animate
          attributeName="stroke-dashoffset"
          values="0;80"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

function CheckeredSf({ x, y }: { x: number; y: number }) {
  const cells = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [0, 2],
    [1, 2],
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      {cells.map(([c, r], i) => (
        <rect
          key={`${c}-${r}`}
          x={c * 5}
          y={r * 5}
          width="5"
          height="5"
          fill={(c + r) % 2 === 0 ? '#fff' : '#111'}
        />
      ))}
      <text x="14" y="10" fill="#fff" fontSize="8" fontFamily="Oswald, sans-serif" letterSpacing="1.2">
        S/F
      </text>
    </g>
  );
}

function shapePath(id: TrackShapeId): { d: string; sf: [number, number] } {
  switch (id) {
    case 'darlington':
      // Egg: tighter left (T1-2), wider right (T3-4)
      return {
        d: 'M 210 188 C 168 188 148 128 210 118 C 278 106 402 102 458 128 C 508 150 518 210 458 236 C 402 262 278 258 210 244 C 168 236 168 198 210 188 Z',
        sf: [318, 100],
      };
    case 'gateway':
      return {
        d: 'M 228 196 C 186 196 176 140 228 128 C 286 114 390 118 438 140 C 478 158 482 214 438 234 C 390 256 286 252 228 236 C 186 226 190 204 228 196 Z',
        sf: [328, 112],
      };
    case 'bristol':
      return {
        d: 'M 250 200 C 250 132 390 132 390 200 C 390 268 250 268 250 200 Z',
        sf: [308, 124],
      };
    case 'kansas':
      return {
        d: 'M 198 206 C 176 150 250 108 340 104 C 430 100 500 132 518 186 C 532 228 500 262 420 272 C 330 284 230 262 198 206 Z',
        sf: [336, 98],
      };
    case 'vegas':
      return {
        d: 'M 190 200 C 178 142 248 112 348 108 C 448 104 516 140 524 196 C 530 244 478 268 390 274 C 292 280 204 250 190 200 Z',
        sf: [348, 102],
      };
    case 'charlotte':
      return {
        d: 'M 186 204 C 176 146 250 110 350 106 C 450 102 524 138 530 198 C 536 250 478 274 380 278 C 282 282 196 252 186 204 Z',
        sf: [350, 100],
      };
    case 'phoenix':
      // Mile oval with dogleg kink on the backstretch
      return {
        d: 'M 214 214 C 194 154 268 118 360 116 C 430 114 470 128 492 154 C 470 176 500 200 508 230 C 516 262 460 282 370 284 C 270 286 226 258 214 214 Z',
        sf: [360, 110],
      };
    case 'talladega':
      return {
        d: 'M 150 210 C 140 150 230 96 360 90 C 490 84 560 130 572 190 C 582 244 520 278 390 286 C 250 294 162 262 150 210 Z',
        sf: [360, 84],
      };
    case 'martinsville':
      // Paperclip
      return {
        d: 'M 236 128 C 200 128 178 158 178 188 C 178 218 200 248 236 248 L 404 248 C 440 248 462 218 462 188 C 462 158 440 128 404 128 Z',
        sf: [312, 118],
      };
    case 'homestead':
      return {
        d: 'M 196 208 C 186 150 256 114 350 110 C 444 106 510 142 520 200 C 528 250 470 276 376 280 C 276 284 206 256 196 208 Z',
        sf: [350, 104],
      };
  }
}

function ExtraMarks({ track, accent }: { track: CupTrackProfile; accent: string }) {
  if (track.shape === 'darlington') {
    return (
      <g>
        <path
          d="M 458 128 C 508 150 518 210 458 236"
          fill="none"
          stroke="#ff4d6d"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <text x="528" y="188" fill="#ff4d6d" fontSize="9" fontFamily="Oswald, sans-serif" letterSpacing="1">
          STRIPE
        </text>
      </g>
    );
  }
  if (track.shape === 'phoenix') {
    return (
      <g>
        <path d="M 470 128 L 492 154 L 470 176" fill="none" stroke={accent} strokeWidth="3.5" />
        <text x="500" y="148" fill={accent} fontSize="9" fontFamily="Oswald, sans-serif" letterSpacing="1">
          DOGLEG
        </text>
      </g>
    );
  }
  if (track.shape === 'charlotte') {
    return (
      <g opacity="0.55">
        <path
          d="M 350 168 L 318 188 L 300 220 L 332 236 L 378 230 L 400 200 L 378 172 Z"
          fill="none"
          stroke="#9aa4bc"
          strokeWidth="3"
          strokeDasharray="4 5"
        />
        <text x="248" y="300" fill="#9aa4bc" fontSize="8" fontFamily="Oswald, sans-serif" letterSpacing="1.2">
          ROVAL 2018–25 (GHOST)
        </text>
      </g>
    );
  }
  if (track.shape === 'bristol') {
    return (
      <g>
        <ellipse cx="320" cy="200" rx="46" ry="34" fill="none" stroke="#2a3348" strokeWidth="10" />
        <text x="320" y="204" fill="#fff" fontSize="10" fontFamily="Oswald, sans-serif" textAnchor="middle" letterSpacing="1">
          BOWL
        </text>
      </g>
    );
  }
  if (track.shape === 'homestead') {
    return (
      <g>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${210 + i * 8} 168 C ${230 + i * 10} 128 ${470 - i * 10} 128 ${500 - i * 8} 176`}
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
            opacity={0.35 + i * 0.15}
          />
        ))}
        <text x="168" y="150" fill={accent} fontSize="8" fontFamily="Oswald, sans-serif" letterSpacing="1">
          PROG. BANKS
        </text>
      </g>
    );
  }
  if (track.shape === 'talladega') {
    return (
      <text x="360" y="198" fill="#fff" fontSize="11" fontFamily="Oswald, sans-serif" textAnchor="middle" letterSpacing="2" opacity="0.4">
        2.66 MI
      </text>
    );
  }
  return null;
}

export default function TrackInfographic({ track }: Props) {
  const accent = ACCENT[track.accent];
  const { d, sf } = shapePath(track.shape);

  return (
    <figure
      className="relative overflow-hidden rounded-xl border border-white/10"
      style={{ backgroundColor: '#070b14' }}
      data-testid={`track-infographic-${track.slug}`}
    >
      <svg
        viewBox="0 0 640 360"
        className="w-full h-auto"
        role="img"
        aria-label={`${track.name} layout graphic, ${track.length}`}
      >
        <defs>
          <pattern id={`grid-${track.slug}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#152033" strokeWidth="0.6" />
          </pattern>
          <radialGradient id={`glow-${track.slug}`} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
            <stop offset="100%" stopColor="#070b14" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="640" height="360" fill="#070b14" />
        <rect width="640" height="360" fill={`url(#grid-${track.slug})`} />
        <rect width="640" height="360" fill={`url(#glow-${track.slug})`} />
        <rect x="0" y="0" width="8" height="360" fill={accent} />
        <rect x="0" y="0" width="640" height="3" fill={accent} opacity="0.7" />

        <text
          x="22"
          y="28"
          fill={accent}
          fontSize="10"
          fontFamily="Oswald, sans-serif"
          letterSpacing="2.4"
        >
          CUP LAYOUT · TV GRAPHIC
        </text>
        <text x="22" y="50" fill="#fff" fontSize="20" fontFamily="Archivo Black, sans-serif">
          {track.name.toUpperCase()}
        </text>
        <text
          x="618"
          y="28"
          fill="#8b93a7"
          fontSize="10"
          fontFamily="Oswald, sans-serif"
          letterSpacing="1.8"
          textAnchor="end"
        >
          CHASE {String(track.chaseOrder).padStart(2, '0')} / 10
        </text>

        <g transform="translate(0 8)">
          <TrackPath d={d} accent={accent} />
          <ExtraMarks track={track} accent={accent} />
          <CheckeredSf x={sf[0]} y={sf[1]} />
        </g>

        <HudLabel x={22} y={300} title="LENGTH" value={track.length} accent={accent} />
        <HudLabel
          x={200}
          y={300}
          title="BANKING"
          value={track.banking ?? '—'}
          accent={accent}
        />
        <HudLabel x={400} y={300} title="TURNS" value={track.turns} accent={accent} />
        <HudLabel x={618} y={300} title="SURFACE" value={track.surface} accent={accent} anchor="end" />
      </svg>
      <figcaption className="sr-only">
        Approximate {track.name} silhouette with labeled length, banking, turns, and surface. Not an official map.
      </figcaption>
    </figure>
  );
}
