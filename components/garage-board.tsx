"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import GarageShell from "@/components/garage-shell";

export default function GarageBoard() {
  const board = useQuery(api.garage.getBoard);
  const seedIfEmpty = useMutation(api.garage.seedIfEmpty);
  const ready = board !== undefined;

  useEffect(() => {
    if (board === undefined) return;
    void seedIfEmpty({});
  }, [board, seedIfEmpty]);

  return (
    <GarageShell title="The board" kicker="Love Garage">
      <div data-testid="garage-board" data-state={ready ? "ready" : "loading"} className="space-y-8">
        {!board || !board.race || board.race.status === "upcoming" ? (
          <>
            {board?.race && (
              <p className="font-oswald text-sm text-white/60">
                {board.race.name} · {board.race.track} · {board.race.dateLabel}
              </p>
            )}
            <p className="font-oswald text-strategy-yellow">No race green yet. Darlington goes live Sunday.</p>
          </>
        ) : (
          <>
            <p className="font-oswald text-sm text-white/60">
              {board.race.name} · {board.race.track} · {board.race.status.toUpperCase()} · lap {board.race.leaderLap}
            </p>
            <section>
              <h2 className="font-archivo uppercase text-white text-xl mb-3">Love Garage running order</h2>
              {board.garageOrder.length === 0 ? (
                <p className="font-oswald text-white/50">No ghost cars on track yet.</p>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="font-oswald text-[10px] uppercase tracking-widest text-white/40">
                      <th className="py-2">P</th>
                      <th>Car</th>
                      <th>Team</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {board.garageOrder.map((row) => (
                      <tr key={`${row.carNumber}-${row.place}`} className="border-t border-white/10 font-oswald text-white">
                        <td className="py-2 text-strategy-yellow">{row.estimated ? `est. P${row.place}` : `P${row.place}`}</td>
                        <td>#{row.carNumber} {row.driverName}</td>
                        <td>{row.teamName}</td>
                        <td className="uppercase text-white/60">{row.status === "dnf" ? "Out of fuel" : "Running"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
            <section>
              <h2 className="font-archivo uppercase text-white text-xl mb-3">Official result, entered after the race</h2>
              {board.official.length === 0 ? (
                <p className="font-oswald text-white/50">Owner pastes the real Cup top 10 after checkered. Not live timing.</p>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="font-oswald text-[10px] uppercase tracking-widest text-white/40">
                      <th className="py-2">P</th>
                      <th>Car</th>
                      <th>Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {board.official.map((row) => (
                      <tr key={row.place} className="border-t border-white/10 font-oswald text-white">
                        <td className="py-2">{row.place}</td>
                        <td>#{row.carNumber}</td>
                        <td>{row.driver}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
            <section>
              <h2 className="font-archivo uppercase text-white text-xl mb-3">Love Garage Chase</h2>
              {board.season.length === 0 ? (
                <p className="font-oswald text-white/50">Season points post after the first checkered.</p>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="font-oswald text-[10px] uppercase tracking-widest text-white/40">
                      <th className="py-2">Member</th>
                      <th>Car</th>
                      <th>Pts</th>
                      <th>Last</th>
                    </tr>
                  </thead>
                  <tbody>
                    {board.season.map((row) => (
                      <tr key={row.userId} className="border-t border-white/10 font-oswald text-white">
                        <td className="py-2">{row.driverName}</td>
                        <td>#{row.carNumber}</td>
                        <td>{row.points}</td>
                        <td>{row.lastFinish ? `P${row.lastFinish}` : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </>
        )}
      </div>
    </GarageShell>
  );
}
