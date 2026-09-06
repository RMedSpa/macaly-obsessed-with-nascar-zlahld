"use client";

import { FormEvent, useEffect, useState } from "react";
import { Authenticated, AuthLoading, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { GARAGE_COLORS } from "@/lib/garage";
import GarageShell from "@/components/garage-shell";
import GarageSignIn from "@/components/garage-sign-in";
import GarageCarPlate from "@/components/garage-car-plate";

function CarEditor() {
  const car = useQuery(api.garage.getMyCar);
  const race = useQuery(api.garage.getCurrentRace);
  const saveCar = useMutation(api.garage.saveCar);
  const [teamName, setTeamName] = useState("");
  const [carNumber, setCarNumber] = useState(7);
  const [primaryColor, setPrimaryColor] = useState("red");
  const [accentColor, setAccentColor] = useState("yellow");
  const [driverName, setDriverName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const locked = !!race && race.status !== "upcoming" && !!car;

  useEffect(() => {
    if (!car) return;
    setTeamName(car.teamName);
    setCarNumber(car.carNumber);
    setPrimaryColor(car.primaryColor);
    setAccentColor(car.accentColor);
    setDriverName(car.driverName);
  }, [car]);

  if (car === undefined) {
    return <p className="font-oswald text-white/50">Loading garage…</p>;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    const result = await saveCar({ teamName, carNumber, primaryColor, accentColor, driverName });
    setMessage(result.ok ? "Car locked in." : result.message);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]" data-testid="garage-car-form" data-state="ready">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="font-oswald text-[11px] uppercase tracking-widest text-white/50">Team name</span>
          <input value={teamName} onChange={(e) => setTeamName(e.target.value)} required className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white font-oswald" />
        </label>
        <label className="block">
          <span className="font-oswald text-[11px] uppercase tracking-widest text-white/50">Car number 1–99</span>
          <input
            type="number"
            min={1}
            max={99}
            value={carNumber}
            disabled={locked}
            onChange={(e) => setCarNumber(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white font-oswald disabled:opacity-50"
          />
        </label>
        <label className="block">
          <span className="font-oswald text-[11px] uppercase tracking-widest text-white/50">Driver name</span>
          <input value={driverName} onChange={(e) => setDriverName(e.target.value)} required className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white font-oswald" />
        </label>
        <fieldset>
          <legend className="font-oswald text-[11px] uppercase tracking-widest text-white/50 mb-2">Primary</legend>
          <div className="flex flex-wrap gap-2">
            {GARAGE_COLORS.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => setPrimaryColor(color.id)}
                className={`h-8 w-8 rounded-full border ${color.swatch} ${primaryColor === color.id ? "border-white" : "border-white/20"}`}
                aria-label={color.label}
              />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="font-oswald text-[11px] uppercase tracking-widest text-white/50 mb-2">Accent</legend>
          <div className="flex flex-wrap gap-2">
            {GARAGE_COLORS.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => setAccentColor(color.id)}
                className={`h-8 w-8 rounded-full border ${color.swatch} ${accentColor === color.id ? "border-white" : "border-white/20"}`}
                aria-label={color.label}
              />
            ))}
          </div>
        </fieldset>
        {locked && <p className="font-oswald text-xs text-strategy-yellow">Number locked after green.</p>}
        {message && <p className="font-oswald text-sm text-strategy-cyan">{message}</p>}
        <button type="submit" className="rounded-md bg-nascar-red px-5 py-3 font-oswald uppercase tracking-wider text-white">
          Save car
        </button>
      </form>
      <GarageCarPlate number={carNumber} team={teamName} driver={driverName} primary={primaryColor} accent={accentColor} />
    </div>
  );
}

export default function GarageCarForm() {
  return (
    <GarageShell title="Your car" kicker="Garage">
      <AuthLoading>
        <p className="font-oswald text-white/50">Checking session…</p>
      </AuthLoading>
      <Unauthenticated>
        <div className="max-w-md">
          <GarageSignIn />
        </div>
      </Unauthenticated>
      <Authenticated>
        <CarEditor />
      </Authenticated>
    </GarageShell>
  );
}
