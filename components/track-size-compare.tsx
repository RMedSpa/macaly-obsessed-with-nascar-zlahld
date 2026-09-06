import { TRACK_CATEGORIES, type TrackCategory } from '@/lib/track-types';

/** Simple SVG silhouettes — relative outer size tracks yardstick miles */
function silhouettePath(cat: TrackCategory, cx: number, cy: number, r: number): string {
  switch (cat.shape) {
    case 'dogleg': {
      // Mile oval with a backstretch dogleg kink
      const rx = r * 1.25;
      const ry = r * 0.72;
      return [
        `M ${cx - rx} ${cy}`,
        `C ${cx - rx} ${cy - ry} ${cx - rx * 0.3} ${cy - ry} ${cx} ${cy - ry * 0.85}`,
        `C ${cx + rx * 0.35} ${cy - ry * 0.7} ${cx + rx * 0.55} ${cy - ry * 0.15} ${cx + rx * 0.4} ${cy + ry * 0.1}`,
        `C ${cx + rx * 0.15} ${cy + ry * 0.45} ${cx + rx * 0.1} ${cy + ry} ${cx - rx * 0.15} ${cy + ry}`,
        `C ${cx - rx * 0.7} ${cy + ry} ${cx - rx} ${cy + ry * 0.55} ${cx - rx} ${cy}`,
        'Z',
      ].join(' ');
    }
    case 'super': {
      // Wide tri-oval
      const rx = r * 1.35;
      const ry = r * 0.7;
      return [
        `M ${cx - rx} ${cy}`,
        `C ${cx - rx} ${cy - ry} ${cx - rx * 0.2} ${cy - ry * 1.05} ${cx + rx * 0.1} ${cy - ry * 0.95}`,
        `C ${cx + rx * 0.7} ${cy - ry * 0.75} ${cx + rx} ${cy - ry * 0.25} ${cx + rx} ${cy}`,
        `C ${cx + rx} ${cy + ry * 0.55} ${cx + rx * 0.2} ${cy + ry} ${cx - rx * 0.25} ${cy + ry}`,
        `C ${cx - rx * 0.75} ${cy + ry} ${cx - rx} ${cy + ry * 0.4} ${cx - rx} ${cy}`,
        'Z',
      ].join(' ');
    }
    case 'road': {
      // Abstract road-course ribbon (not to real COTA scale — vibe only)
      const s = r * 0.95;
      return [
        `M ${cx - s * 0.9} ${cy + s * 0.55}`,
        `L ${cx - s * 0.95} ${cy - s * 0.1}`,
        `L ${cx - s * 0.35} ${cy - s * 0.8}`,
        `L ${cx + s * 0.15} ${cy - s * 0.55}`,
        `L ${cx + s * 0.55} ${cy - s * 0.85}`,
        `L ${cx + s * 0.95} ${cy - s * 0.2}`,
        `L ${cx + s * 0.7} ${cy + s * 0.35}`,
        `L ${cx + s * 0.2} ${cy + s * 0.15}`,
        `L ${cx - s * 0.1} ${cy + s * 0.75}`,
        `L ${cx - s * 0.55} ${cy + s * 0.35}`,
        'Z',
      ].join(' ');
    }
    case 'trioval':
    case 'oval':
    default: {
      const rx = r * 1.2;
      const ry = r * 0.7;
      return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;
    }
  }
}

const ACCENT_STROKE: Record<TrackCategory['accent'], string> = {
  'nascar-red': 'stroke-nascar-red',
  'nascar-blue': 'stroke-nascar-blue',
  'series-truck': 'stroke-series-truck',
  'strategy-cyan': 'stroke-strategy-cyan',
  'series-arca': 'stroke-series-arca',
};

const ACCENT_FILL: Record<TrackCategory['accent'], string> = {
  'nascar-red': 'fill-nascar-red/15',
  'nascar-blue': 'fill-nascar-blue/15',
  'series-truck': 'fill-series-truck/15',
  'strategy-cyan': 'fill-strategy-cyan/15',
  'series-arca': 'fill-series-arca/15',
};

export default function TrackSizeCompare() {
  const maxMi = Math.max(...TRACK_CATEGORIES.map((c) => c.scaleMi));
  // Layout: 5 columns, baseline shared
  const colW = 120;
  const padX = 24;
  const width = padX * 2 + colW * TRACK_CATEGORIES.length;
  const height = 220;
  const baseY = 150;

  return (
    <figure
      className="rounded-xl border border-border bg-card overflow-hidden"
      data-testid="track-size-compare"
    >
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-border bg-secondary/40">
        <div>
          <p className="font-oswald text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Visual scale
          </p>
          <h2 className="font-archivo text-base sm:text-lg uppercase tracking-wide text-foreground">
            Relative size by track type
          </h2>
        </div>
        <p className="font-oswald text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider text-right max-w-[14rem]">
          Shapes are simplified silhouettes · sized by typical length
        </p>
      </div>

      <div className="px-2 sm:px-4 py-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[640px] h-auto"
          role="img"
          aria-label="Comparison of relative NASCAR track type sizes from short tracks to superspeedways and road courses"
        >
          {/* Yardsticks */}
          <line
            x1={padX}
            x2={width - padX}
            y1={baseY + 28}
            y2={baseY + 28}
            className="stroke-border"
            strokeWidth={1}
          />
          {[0.5, 1, 1.5, 2, 2.5].map((mi) => {
            const x = padX + (mi / maxMi) * (width - padX * 2 - 40);
            return (
              <g key={mi}>
                <line
                  x1={x}
                  x2={x}
                  y1={baseY + 24}
                  y2={baseY + 32}
                  className="stroke-muted-foreground/50"
                  strokeWidth={1}
                />
              </g>
            );
          })}

          {TRACK_CATEGORIES.map((cat, i) => {
            const cx = padX + colW * i + colW / 2;
            const r = 18 + (cat.scaleMi / maxMi) * 52;
            const cy = baseY - r * 0.15;
            const d = silhouettePath(cat, cx, cy, r);

            return (
              <g key={cat.id}>
                <path
                  d={d}
                  className={`${ACCENT_FILL[cat.accent]} ${ACCENT_STROKE[cat.accent]}`}
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                />
                {/* inner apron hint for ovals */}
                {cat.shape !== 'road' ? (
                  <path
                    d={silhouettePath(cat, cx, cy, r * 0.55)}
                    className="fill-none stroke-border"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    opacity={0.7}
                  />
                ) : null}
                <text
                  x={cx}
                  y={baseY + 48}
                  textAnchor="middle"
                  className="fill-foreground font-archivo"
                  style={{ fontSize: 11 }}
                >
                  {cat.label.toUpperCase()}
                </text>
                <text
                  x={cx}
                  y={baseY + 64}
                  textAnchor="middle"
                  className="fill-muted-foreground font-oswald"
                  style={{ fontSize: 10, letterSpacing: '0.08em' }}
                >
                  ~{cat.scaleMi.toFixed(1)} MI TYP.
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption className="px-4 sm:px-5 py-3 border-t border-border font-oswald text-xs text-muted-foreground leading-relaxed">
        Short tracks pack the most lap traffic per mile. Superspeedways are enormous draft bowls. Road
        courses look smaller in “oval radius” but run a longer timed distance with lefts and rights.
        Phoenix’s dogleg silhouette is called out separately from pure short ovals.
      </figcaption>
    </figure>
  );
}
