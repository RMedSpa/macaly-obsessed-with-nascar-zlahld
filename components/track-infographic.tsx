import type { CupTrackProfile } from '@/lib/tracks';
import {
  TRACK_SHAPE_VIEWBOX,
  getTrackShape,
  relativeScale,
  type TrackShapeDef,
} from '@/lib/track-shapes';

type Variant = 'detail' | 'thumb' | 'scale';

type Props = {
  track: CupTrackProfile;
  variant?: Variant;
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
  return (
    <g>
      <text
        x={x}
        y={y}
        fill={accent}
        fontSize="11"
        fontFamily="Oswald, sans-serif"
        letterSpacing="1.8"
        textAnchor={anchor}
      >
        {title}
      </text>
      <text
        x={x}
        y={y + 18}
        fill="#f4f6fb"
        fontSize="16"
        fontFamily="Oswald, sans-serif"
        fontWeight="600"
        textAnchor={anchor}
      >
        {value}
      </text>
    </g>
  );
}

function StartFinish({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <line x1="0" y1="-18" x2="0" y2="18" stroke="#f4f6fb" strokeWidth="3.2" />
      <g transform="translate(6 -10)">
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <rect
              key={`${c}-${r}`}
              x={c * 4}
              y={r * 4}
              width="4"
              height="4"
              fill={(c + r) % 2 === 0 ? '#fff' : '#111'}
            />
          ))
        )}
      </g>
      <text
        x="16"
        y="-12"
        fill="#fff"
        fontSize="11"
        fontFamily="Oswald, sans-serif"
        letterSpacing="1.4"
      >
        S/F
      </text>
    </g>
  );
}

function TrackOutline({
  shape,
  accent,
  showLabels,
  showExtras,
}: {
  shape: TrackShapeDef;
  accent: string;
  showLabels: boolean;
  showExtras: boolean;
}) {
  const fillId = `asphalt-${shape.id}`;
  return (
    <g>
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b2434" />
          <stop offset="100%" stopColor="#121821" />
        </linearGradient>
      </defs>
      <path d={shape.d} fill={`url(#${fillId})`} stroke="#2a3548" strokeWidth="10" />
      <path
        d={shape.d}
        fill="none"
        stroke="#c8d0dc"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {shape.innerD && (
        <path
          d={shape.innerD}
          fill="none"
          stroke={accent}
          strokeWidth={shape.id === 'bristol' ? 3.2 : 1.35}
          strokeLinejoin="round"
          opacity={shape.id === 'bristol' ? 0.55 : 0.35}
        />
      )}
      {showExtras &&
        shape.extras?.map((extra) => (
          <g key={`${extra.kind}-${extra.label ?? extra.d.slice(0, 12)}`}>
            <path
              d={extra.d}
              fill="none"
              stroke={extra.kind === 'ghost' ? '#9aa4bc' : accent}
              strokeWidth={extra.kind === 'ghost' ? 1.8 : 2.4}
              strokeDasharray={extra.kind === 'ghost' ? '5 6' : undefined}
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity={extra.kind === 'ghost' ? 0.55 : 0.9}
            />
            {extra.label && extra.labelX != null && extra.labelY != null && (
              <text
                x={extra.labelX}
                y={extra.labelY}
                fill={extra.kind === 'ghost' ? '#9aa4bc' : accent}
                fontSize="12"
                fontFamily="Oswald, sans-serif"
                letterSpacing="1.6"
                textAnchor="middle"
              >
                {extra.label}
              </text>
            )}
          </g>
        ))}
      <StartFinish x={shape.sf.x} y={shape.sf.y} angle={shape.sf.angle} />
      {showLabels &&
        shape.turns.map((t) => (
          <text
            key={t.id}
            x={t.x}
            y={t.y}
            fill="#8b93a7"
            fontSize="13"
            fontFamily="Oswald, sans-serif"
            letterSpacing="1.2"
            textAnchor="middle"
          >
            {t.id}
          </text>
        ))}
    </g>
  );
}

export default function TrackInfographic({ track, variant = 'detail' }: Props) {
  const accent = ACCENT[track.accent];
  const shape = getTrackShape(track.shape);

  if (variant === 'scale') {
    const s = relativeScale(shape.lengthMiles);
    return (
      <svg
        viewBox={TRACK_SHAPE_VIEWBOX}
        className="w-full h-auto"
        role="img"
        aria-label={`${track.name} silhouette, ${track.length}`}
      >
        <g transform={`translate(${500 * (1 - s)} ${280 * (1 - s)}) scale(${s})`}>
          <path d={shape.d} fill="#1b2434" stroke={accent} strokeWidth={2.2 / s} />
        </g>
      </svg>
    );
  }

  if (variant === 'thumb') {
    return (
      <figure
        className="relative overflow-hidden rounded-lg border border-white/10"
        style={{ backgroundColor: '#070b14' }}
        data-testid={`track-infographic-${track.slug}`}
      >
        <svg
          viewBox="40 40 920 480"
          className="w-full h-auto"
          role="img"
          aria-label={`${track.name} layout outline, ${track.length}`}
        >
          <rect width="1000" height="560" x="0" y="0" fill="#070b14" />
          <TrackOutline shape={shape} accent={accent} showLabels={false} showExtras={false} />
        </svg>
      </figure>
    );
  }

  return (
    <figure
      className="relative overflow-hidden rounded-xl border border-white/10"
      style={{ backgroundColor: '#070b14' }}
      data-testid={`track-infographic-${track.slug}`}
    >
      <svg
        viewBox="0 0 1000 640"
        className="w-full h-auto"
        role="img"
        aria-label={`${track.name} layout graphic, ${track.length}`}
      >
        <defs>
          <pattern id={`grid-${track.slug}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#121a28" strokeWidth="0.7" />
          </pattern>
          <radialGradient id={`glow-${track.slug}`} cx="50%" cy="42%" r="52%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
            <stop offset="100%" stopColor="#070b14" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1000" height="640" fill="#070b14" />
        <rect width="1000" height="640" fill={`url(#grid-${track.slug})`} />
        <rect width="1000" height="640" fill={`url(#glow-${track.slug})`} />
        <rect x="0" y="0" width="8" height="640" fill={accent} />
        <rect x="0" y="0" width="1000" height="3" fill={accent} opacity="0.7" />

        <text
          x="28"
          y="32"
          fill={accent}
          fontSize="13"
          fontFamily="Oswald, sans-serif"
          letterSpacing="2.6"
        >
          CUP LAYOUT · BROADCAST OUTLINE
        </text>
        <text x="28" y="58" fill="#fff" fontSize="22" fontFamily="Archivo Black, sans-serif">
          {track.name.toUpperCase()}
        </text>
        <text
          x="972"
          y="32"
          fill="#8b93a7"
          fontSize="13"
          fontFamily="Oswald, sans-serif"
          letterSpacing="1.8"
          textAnchor="end"
        >
          CHASE {String(track.chaseOrder).padStart(2, '0')} / 10
        </text>
        <text
          x="972"
          y="54"
          fill="#8b93a7"
          fontSize="12"
          fontFamily="Oswald, sans-serif"
          letterSpacing="1.2"
          textAnchor="end"
        >
          {shape.geometryNote.toUpperCase()}
        </text>

        <g transform="translate(0 16)">
          <TrackOutline shape={shape} accent={accent} showLabels showExtras />
        </g>

        <HudLabel x={28} y={572} title="LENGTH" value={track.length} accent={accent} />
        <HudLabel x={280} y={572} title="BANKING" value={track.banking ?? '—'} accent={accent} />
        <HudLabel x={620} y={572} title="TURNS" value={track.turns} accent={accent} />
        <HudLabel x={972} y={572} title="SURFACE" value={track.surface} accent={accent} anchor="end" />
      </svg>
      <figcaption className="sr-only">
        Approximate {track.name} outline redrawn from public track geometry — {shape.reference}.
        Not an official map.
      </figcaption>
    </figure>
  );
}
