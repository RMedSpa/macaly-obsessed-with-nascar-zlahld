"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Authenticated, AuthLoading, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { callLabel } from "@/lib/garage";
import GarageShell from "@/components/garage-shell";
import GarageSignIn from "@/components/garage-sign-in";

function RaceDesk() {
  const hq = useQuery(api.garage.getRaceHq);
  const joinRace = useMutation(api.garage.joinRace);
  const saveCard = useMutation(api.garage.savePreraceCard);
  const lockCall = useMutation(api.garage.lockCall);
  const [stops, setStops] = useState<1 | 2 | 3>(2);
  const [fuelWindow, setFuelWindow] = useState<"short" | "long">("long");
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    if (hq && hq.ok && hq.entry) {
      setStops(hq.entry.plannedStops);
      setFuelWindow(hq.entry.fuelWindow);
    }
  }, [hq]);

  useEffect(() => {
    if (hq && hq.ok && !hq.entry) {
      void joinRace({});
    }
  }, [hq, joinRace]);

  if (hq === undefined) return <p className="font-oswald text-white/50">Loading race HQ…</p>;
  if (!hq.ok) {
    return (
      <p className="font-oswald text-strategy-yellow">
        {hq.message} <Link href="/garage/car" className="underline">Build a car</Link>
      </p>
    );
  }

  const { race, car, entry, place, callEnabled, calls } = hq;
  const checkered = race.status === "checkered";
  const flagLabel = race.status.toUpperCase();

  async function onCard(event: FormEvent) {
    event.preventDefault();
    const result = await saveCard({ plannedStops: stops, fuelWindow });
    setNote(result.ok ? "Pre-race card saved." : result.message);
  }

  async function call(choice: "stay" | "four" | "two" | "fuel") {
    const result = await lockCall({ choice });
    setNote(result.ok ? `${callLabel(choice)} locked.` : result.message);
  }

  return (
    <div data-testid="garage-race-hq" data-state="ready" className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
        {[
          { label: "Race", value: race.name },
          { label: "Track", value: race.track },
          { label: "Flag", value: flagLabel },
          { label: "Leader lap", value: String(race.leaderLap) },
          { label: "Your #", value: String(car.carNumber) },
          { label: "Est. pos", value: entry?.status === "dnf" ? "DNF" : `P${place}` },
        ].map((item) => (
          <div key={item.label} className="bg-black/50 px-3 py-3">
            <p className="font-oswald text-[10px] uppercase tracking-widest text-white/40">{item.label}</p>
            <p className="font-archivo text-white text-sm uppercase truncate">{item.value}</p>
          </div>
        ))}
      </div>
      <p className="font-oswald text-sm text-white/70">
        Fuel laps remaining: <span className="text-strategy-yellow">{entry?.fuelLaps ?? race.maxStintLaps}</span>
        {entry?.status === "dnf" ? " · Out of fuel · DNF" : ""}
      </p>

      {race.status === "upcoming" && (
        <form onSubmit={onCard} className="rounded-lg border border-white/10 bg-black/30 p-4 space-y-3">
          <h2 className="font-archivo uppercase text-white">Pre-race card</h2>
          <p className="font-oswald text-xs text-white/50">Start is fixed P20. You still make each call by hand.</p>
          <div className="flex flex-wrap gap-4">
            <label className="font-oswald text-sm text-white/80">
              Planned stops
              <select value={stops} onChange={(e) => setStops(Number(e.target.value) as 1 | 2 | 3)} className="ml-2 bg-black border border-white/20 px-2 py-1">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </label>
            <label className="font-oswald text-sm text-white/80">
              Fuel window
              <select value={fuelWindow} onChange={(e) => setFuelWindow(e.target.value as "short" | "long")} className="ml-2 bg-black border border-white/20 px-2 py-1">
                <option value="short">Short</option>
                <option value="long">Long</option>
              </select>
            </label>
          </div>
          <button className="rounded-md bg-strategy-yellow px-4 py-2 font-oswald uppercase text-black">Lock card</button>
        </form>
      )}

      {race.status === "upcoming" && (
        <p className="font-oswald text-strategy-yellow">No race green yet. Darlington goes live Sunday.</p>
      )}

      {checkered ? (
        <p className="font-archivo text-2xl text-white uppercase">
          Your finish: P{place} · season points {entry?.pointsAwarded ?? 0}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {(["stay", "four", "two", "fuel"] as const).map((choice) => (
            <button
              key={choice}
              disabled={!callEnabled}
              onClick={() => void call(choice)}
              className="min-h-24 rounded-lg border-2 border-white/20 bg-black font-archivo uppercase text-white text-xl disabled:opacity-30 hover:border-strategy-yellow"
            >
              {callLabel(choice)}
            </button>
          ))}
        </div>
      )}

      <div>
        <h3 className="font-archivo uppercase text-white mb-2">Call tape</h3>
        {calls.length === 0 ? (
          <p className="font-oswald text-sm text-white/45">No calls yet.</p>
        ) : (
          <ol className="space-y-1">
            {calls.map((row) => (
              <li key={row._id} className="font-oswald text-sm text-white/75">
                Lap {row.lap} · {row.flag} · {callLabel(row.choice)}
              </li>
            ))}
          </ol>
        )}
      </div>
      {note && <p className="font-oswald text-sm text-strategy-cyan">{note}</p>}
    </div>
  );
}

export default function GarageRaceHq() {
  return (
    <GarageShell title="Race HQ" kicker="Pit box">
      <AuthLoading>
        <p className="font-oswald text-white/50">Checking session…</p>
      </AuthLoading>
      <Unauthenticated>
        <div className="max-w-md">
          <GarageSignIn />
        </div>
      </Unauthenticated>
      <Authenticated>
        <RaceDesk />
      </Authenticated>
    </GarageShell>
  );
}
