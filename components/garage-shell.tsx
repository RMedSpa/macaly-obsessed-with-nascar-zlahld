import Link from "next/link";
import GarageDisclaimer from "@/components/garage-disclaimer";

const LINKS = [
  { href: "/garage", label: "Landing" },
  { href: "/garage/car", label: "Car" },
  { href: "/garage/race", label: "Race HQ" },
  { href: "/garage/board", label: "Board" },
  { href: "/garage/rules", label: "Scoring" },
];

export default function GarageShell({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10" style={{ backgroundColor: "hsl(var(--strategy-panel))" }}>
      <div className="pointer-events-none absolute inset-0 speed-lines-bg opacity-25" aria-hidden />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-strategy-yellow" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-3 sm:px-4 py-8 sm:py-10">
        <p className="font-oswald text-[11px] uppercase tracking-[0.22em] text-strategy-yellow mb-2">
          {kicker ?? "Love Garage"}
        </p>
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <h1 className="font-archivo uppercase text-white leading-none" style={{ fontSize: "clamp(28px, 6vw, 48px)" }}>
            {title}
          </h1>
          <GarageDisclaimer compact />
        </div>
        <nav className="flex flex-wrap gap-2 mb-8" aria-label="Love Garage">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm border border-white/15 bg-black/30 px-3 py-1.5 font-oswald text-[11px] uppercase tracking-wider text-white/80 hover:border-strategy-yellow hover:text-strategy-yellow"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </section>
  );
}
