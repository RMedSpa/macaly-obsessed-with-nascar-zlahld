"use client";

import { FormEvent, useEffect, useState } from "react";
import { Authenticated, AuthLoading, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import GarageShell from "@/components/garage-shell";
import GarageSignIn from "@/components/garage-sign-in";

function AdminDesk() {
  const isAdmin = useQuery(api.garageAuthz.isAdmin);
  const race = useQuery(api.garage.getCurrentRace, isAdmin ? {} : "skip");
  const seed = useMutation(api.garage.seedIfEmpty);
  const saveRace = useMutation(api.garage.saveRace);
  const setFlag = useMutation(api.garage.setFlag);
  const setLeaderLap = useMutation(api.garage.setLeaderLap);
  const saveOfficial = useMutation(api.garage.saveOfficialResults);
  const [name, setName] = useState("Cook Out Southern 500");
  const [track, setTrack] = useState("Darlington Raceway");
  const [dateLabel, setDateLabel] = useState("Sun Sep 6, 2026 · 5 p.m. ET / 3 p.m. MDT");
  const [scheduledLaps, setScheduledLaps] = useState(367);
  const [maxStintLaps, setMaxStintLaps] = useState(68);
  const [fieldAvgLapSeconds, setFieldAvgLapSeconds] = useState(29.4);
  const [lapInput, setLapInput] = useState(0);
  const [resultsText, setResultsText] = useState("");
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) void seed({});
  }, [isAdmin, seed]);

  useEffect(() => {
    if (!race) return;
    setName(race.name);
    setTrack(race.track);
    setDateLabel(race.dateLabel);
    setScheduledLaps(race.scheduledLaps);
    setMaxStintLaps(race.maxStintLaps);
    setFieldAvgLapSeconds(race.fieldAvgLapSeconds);
    setLapInput(race.leaderLap);
  }, [race]);

  if (isAdmin === undefined) return <p className="font-oswald text-white/50">Checking desk…</p>;
  if (!isAdmin) return <p className="font-oswald text-nascar-red">Owner only.</p>;

  async function onSave(event: FormEvent) {
    event.preventDefault();
    const result = await saveRace({ name, track, dateLabel, scheduledLaps, maxStintLaps, fieldAvgLapSeconds });
    setNote(result.ok ? "Race saved." : result.message);
  }

  async function onOfficial(event: FormEvent) {
    event.preventDefault();
    const results = resultsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const parts = line.split(/[,\t ]+/);
        return {
          place: Number(parts[0] || index + 1),
          carNumber: String(parts[1] || ""),
          driver: parts.slice(2).join(" ") || "Unknown",
        };
      });
    const result = await saveOfficial({ results });
    setNote(result.ok ? "Official top 10 saved." : result.message);
  }

  return (
    <div data-testid="garage-admin" data-state="ready" className="space-y-6">
      <form onSubmit={onSave} className="grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white font-oswald" />
        <input value={track} onChange={(e) => setTrack(e.target.value)} className="rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white font-oswald" />
        <input value={dateLabel} onChange={(e) => setDateLabel(e.target.value)} className="sm:col-span-2 rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white font-oswald" />
        <label className="font-oswald text-xs text-white/60">Scheduled laps
          <input type="number" value={scheduledLaps} onChange={(e) => setScheduledLaps(Number(e.target.value))} className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white" />
        </label>
        <label className="font-oswald text-xs text-white/60">Max stint laps
          <input type="number" value={maxStintLaps} onChange={(e) => setMaxStintLaps(Number(e.target.value))} className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white" />
        </label>
        <label className="font-oswald text-xs text-white/60">Field-average lap sec
          <input type="number" step="0.1" value={fieldAvgLapSeconds} onChange={(e) => setFieldAvgLapSeconds(Number(e.target.value))} className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white" />
        </label>
        <button className="rounded-md bg-nascar-red px-4 py-2 font-oswald uppercase text-white">Save race</button>
      </form>

      <div className="flex flex-wrap gap-2">
        {(["upcoming", "green", "caution", "red", "checkered"] as const).map((status) => (
          <button key={status} onClick={() => void setFlag({ status }).then((r) => setNote(r.ok ? `Flag ${status}` : r.message))} className="rounded-md border border-white/20 px-3 py-2 font-oswald uppercase text-white text-xs">
            {status}
          </button>
        ))}
        <button onClick={() => void setLeaderLap({ leaderLap: 0, increment: true })} className="rounded-md bg-strategy-yellow px-3 py-2 font-oswald uppercase text-black text-xs">
          +1 lap
        </button>
      </div>
      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void setLeaderLap({ leaderLap: lapInput });
        }}
      >
        <input type="number" value={lapInput} onChange={(e) => setLapInput(Number(e.target.value))} className="w-28 rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white" />
        <button className="rounded-md border border-white/20 px-3 py-2 font-oswald uppercase text-white text-xs">Set lap</button>
      </form>

      <form onSubmit={onOfficial} className="space-y-2">
        <p className="font-oswald text-xs text-white/50">After checkered: one line per car. Example: 1 11 Denny Hamlin</p>
        <textarea value={resultsText} onChange={(e) => setResultsText(e.target.value)} rows={8} className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-white font-oswald" />
        <button className="rounded-md bg-nascar-blue px-4 py-2 font-oswald uppercase text-white">Save official top 10</button>
      </form>
      {note && <p className="font-oswald text-sm text-strategy-cyan">{note}</p>}
      <p className="font-oswald text-xs text-white/40">Do not invent live official timing. Ghost field only.</p>
    </div>
  );
}

export default function GarageAdmin() {
  return (
    <GarageShell title="Owner desk" kicker="Love Garage admin">
      <AuthLoading>
        <p className="font-oswald text-white/50">Checking session…</p>
      </AuthLoading>
      <Unauthenticated>
        <div className="max-w-md">
          <GarageSignIn />
        </div>
      </Unauthenticated>
      <Authenticated>
        <AdminDesk />
      </Authenticated>
    </GarageShell>
  );
}
