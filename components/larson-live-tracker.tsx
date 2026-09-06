import Link from "next/link";
import type { CupLiveDesk } from "@/lib/nhms-live";

function pitKindClass(kind: "green" | "stage" | "caution") {
  if (kind === "caution") return "border-strategy-yellow/40 bg-strategy-yellow/10 text-strategy-yellow";
  if (kind === "stage") return "border-strategy-cyan/40 bg-strategy-cyan/10 text-strategy-cyan";
  return "border-border bg-muted text-foreground";
}

export default function LarsonLiveTracker({
  live,
  compact = false,
}: {
  live: CupLiveDesk;
  compact?: boolean;
}) {
  const driver = live.featuredDriver;
  if (!driver) return null;

  console.log("[larson-live] render", driver.position, driver.interval, live.lapNote);

  return (
    <section
      data-testid="larson-live-tracker"
      aria-labelledby="larson-live-heading"
      className={`overflow-hidden rounded-lg border border-nascar-red/40 bg-card ${
        compact ? "mb-5" : "mb-6"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-nascar-red px-2 py-0.5 font-oswald text-[10px] font-600 tracking-[0.18em] uppercase text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white pulse-dot" aria-hidden />
            Live · #{driver.car}
          </span>
          <p
            id="larson-live-heading"
            className="font-archivo uppercase tracking-tight text-foreground"
            style={{ fontSize: compact ? 16 : 20 }}
          >
            Kyle Larson
          </p>
        </div>
        <Link
          href={driver.profileHref}
          className="font-oswald text-[11px] uppercase tracking-[0.16em] text-nascar-blue hover:text-foreground"
        >
          Full driver story →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
        <Stat label="Position" value={`P${driver.position}`} accent />
        <Stat label="Started" value={`P${driver.started}`} />
        <Stat label="Interval" value={driver.interval} />
        <Stat label="Laps led" value={`${driver.lapsLed}`} />
        <Stat label="Last stop" value={`Lap ${driver.lastStopLap}`} />
        <Stat label="Status" value={driver.status === "running" ? "Running" : "Out"} />
      </div>

      <div className="border-t border-border px-4 py-3 sm:px-5">
        <p className="font-oswald text-sm sm:text-base text-nascar-red uppercase tracking-wide mb-1">
          {driver.headline}
        </p>
        {compact ? null : (
          <p className="font-oswald text-sm text-foreground/80 leading-relaxed max-w-3xl">{driver.blurb}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-sm border border-nascar-blue/30 bg-muted px-2 py-0.5 font-oswald text-[11px] uppercase tracking-wider text-nascar-blue">
            {driver.stage1}
          </span>
          <span className="rounded-sm border border-border bg-muted px-2 py-0.5 font-oswald text-[11px] uppercase tracking-wider text-foreground">
            Stage 2 · {driver.stage2}
          </span>
          <span className="rounded-sm border border-border bg-muted px-2 py-0.5 font-oswald text-[11px] uppercase tracking-wider text-foreground">
            {live.lapNote}
          </span>
        </div>
      </div>

      {compact ? null : (
        <ol className="border-t border-border divide-y divide-border">
          {driver.pits.map((stop) => (
            <li key={`${stop.lap}-${stop.kind}`} className="flex flex-wrap items-start gap-3 px-4 py-2.5 sm:px-5">
              <span className="font-archivo text-nascar-red leading-none min-w-[4.5rem]">
                LAP {stop.lap}
              </span>
              <span
                className={`rounded-sm border px-1.5 py-0.5 font-oswald text-[10px] uppercase tracking-wider ${pitKindClass(stop.kind)}`}
              >
                {stop.kind}
              </span>
              <p className="font-oswald text-sm text-foreground/80 flex-1 min-w-[12rem]">{stop.note}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border-b border-border px-4 py-3 sm:px-5">
      <p className="font-oswald text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p
        className={`font-archivo uppercase leading-none mt-1 ${
          accent ? "text-nascar-red" : "text-foreground"
        }`}
        style={{ fontSize: accent ? 28 : 20 }}
      >
        {value}
      </p>
    </div>
  );
}
