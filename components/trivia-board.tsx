"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TriviaDisclaimer from "@/components/trivia-disclaimer";

export default function TriviaBoard() {
  const board = useQuery(api.trivia.getBoard);
  const ready = board !== undefined;

  return (
    <div
      className="relative min-h-screen bg-strategy-panel text-white"
      data-testid="trivia-board"
      data-state={ready ? "ready" : "loading"}
    >
      <div className="pointer-events-none absolute inset-0 speed-lines-bg opacity-25" />
      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:py-14 space-y-8">
        <p className="font-oswald text-xs uppercase tracking-[0.25em] text-strategy-cyan">Trivia Night</p>
        <h1 className="font-archivo uppercase text-4xl sm:text-6xl leading-none">Chase board</h1>
        <p className="font-oswald text-white/65">Daily 5 + Chase packs only. Practice does not count.</p>

        <section className="rounded-xl border border-white/15 bg-black/30 p-5 space-y-3">
          <h2 className="font-oswald text-sm uppercase tracking-widest text-strategy-yellow">Today’s top 20</h2>
          {board && board.today.length === 0 ? (
            <p className="font-oswald text-strategy-yellow">Tomorrow&apos;s Daily 5 posts at 6 a.m. MT.</p>
          ) : (
            <ol className="space-y-2 font-oswald">
              {board?.today.map((row, index) => (
                <li key={`${row.name}-${index}`} className="flex justify-between gap-3 border-b border-white/10 pb-2">
                  <span>
                    P{index + 1} · {row.name}
                  </span>
                  <span className="text-strategy-cyan">{row.points} pts · {row.secondsUsed}s</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="rounded-xl border border-white/15 bg-black/30 p-5 space-y-3">
          <h2 className="font-oswald text-sm uppercase tracking-widest text-strategy-yellow">Season top 20</h2>
          {board && board.season.length === 0 ? (
            <p className="font-oswald text-white/55">No points in the book yet.</p>
          ) : (
            <ol className="space-y-2 font-oswald">
              {board?.season.map((row, index) => (
                <li key={`${row.name}-season-${index}`} className="flex justify-between gap-3 border-b border-white/10 pb-2">
                  <span>
                    P{index + 1} · {row.name}
                  </span>
                  <span className="text-strategy-cyan">{row.points} pts · {row.secondsUsed}s</span>
                </li>
              ))}
            </ol>
          )}
        </section>
        <TriviaDisclaimer />
      </div>
    </div>
  );
}
