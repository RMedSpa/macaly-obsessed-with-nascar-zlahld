"use client";

import Link from "next/link";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { GARAGE_STEPS, garageNextChip } from "@/lib/garage";
import GarageShell from "@/components/garage-shell";
import GarageCarPlate from "@/components/garage-car-plate";

function Ctas({ hasCar }: { hasCar: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={hasCar ? "/garage/race" : "/garage/car"}
        className="inline-flex items-center rounded-md bg-nascar-red px-5 py-3 font-oswald text-sm uppercase tracking-wider text-white"
      >
        {hasCar ? "Go to race HQ" : "Build your car"}
      </Link>
      <Link
        href="/garage/rules"
        className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 font-oswald text-sm uppercase tracking-wider text-white/80"
      >
        How scoring works
      </Link>
    </div>
  );
}

export default function GarageLanding() {
  const race = useQuery(api.garage.getCurrentRace);
  const car = useQuery(api.garage.getMyCar);
  const seedIfEmpty = useMutation(api.garage.seedIfEmpty);
  const ready = race !== undefined;
  const nextChip = garageNextChip(race);

  useEffect(() => {
    if (race === undefined) return;
    void seedIfEmpty({});
  }, [race, seedIfEmpty]);

  return (
    <GarageShell title="Love Garage" kicker="Crew chief game">
      <div
        data-testid="love-garage-landing"
        data-state={ready ? "ready" : "loading"}
        className="space-y-8"
      >
        <p className="font-archivo uppercase text-white leading-tight" style={{ fontSize: "clamp(22px, 4vw, 36px)" }}>
          Bring your own car. Call the pits. Stack up against the field.
        </p>
        <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-strategy-yellow/40 bg-strategy-yellow/10 px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-strategy-yellow pulse-dot" />
          <span className="font-oswald text-xs uppercase tracking-wider text-strategy-yellow">
            LIVE · {nextChip.name} · {nextChip.track} · {nextChip.when}
          </span>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {GARAGE_STEPS.map((step) => (
            <li key={step.n} className="rounded-lg border border-white/10 bg-black/30 p-4">
              <p className="font-oswald text-[10px] tracking-[0.2em] text-strategy-yellow">{step.n}</p>
              <h2 className="font-archivo uppercase text-white mt-1">{step.title}</h2>
              <p className="font-oswald text-sm text-white/65 mt-2">{step.body}</p>
            </li>
          ))}
        </ol>
        <Authenticated>
          {car ? (
            <div className="max-w-xs">
              <GarageCarPlate
                number={car.carNumber}
                team={car.teamName}
                driver={car.driverName}
                primary={car.primaryColor}
                accent={car.accentColor}
              />
            </div>
          ) : null}
          <Ctas hasCar={!!car} />
        </Authenticated>
        <Unauthenticated>
          <Ctas hasCar={false} />
        </Unauthenticated>
        <p className="font-oswald text-xs text-white/40">Chase pass coming later. No betting. Ghost cars only.</p>
      </div>
    </GarageShell>
  );
}
