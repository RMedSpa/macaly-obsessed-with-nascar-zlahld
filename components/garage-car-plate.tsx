import { plateClass } from "@/lib/garage";

export default function GarageCarPlate({
  number,
  team,
  driver,
  primary,
  accent,
}: {
  number: number | string;
  team?: string;
  driver?: string;
  primary: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-white/15 overflow-hidden bg-black/40">
      <div className={`h-2 ${plateClass(accent, "accent")}`} />
      <div className={`${plateClass(primary)} px-5 py-6 text-center`}>
        <p className="font-oswald text-[10px] tracking-[0.28em] uppercase opacity-80">Love Garage</p>
        <p className="font-archivo leading-none" style={{ fontSize: "clamp(42px, 8vw, 72px)" }}>
          {number}
        </p>
      </div>
      <div className="px-4 py-3">
        <p className="font-archivo uppercase text-white text-sm truncate">{team || "Unnamed team"}</p>
        <p className="font-oswald text-xs text-white/55 uppercase tracking-wide truncate">
          {driver || "Crew chief TBD"}
        </p>
      </div>
    </div>
  );
}
