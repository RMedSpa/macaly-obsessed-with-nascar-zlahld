import { GARAGE_DISCLAIMER } from "@/lib/garage";

export default function GarageDisclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <p
      className={`font-oswald tracking-wide text-white/45 ${compact ? "text-[10px]" : "text-xs"}`}
    >
      {GARAGE_DISCLAIMER}
    </p>
  );
}
