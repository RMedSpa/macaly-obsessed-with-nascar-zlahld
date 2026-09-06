"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TriviaDisclaimer from "@/components/trivia-disclaimer";

export default function TriviaLanding() {
  const landing = useQuery(api.trivia.getLanding);
  const seedIfEmpty = useMutation(api.trivia.seedIfEmpty);
  const ready = landing !== undefined;

  useEffect(() => {
    if (landing && !landing.dailyReady) void seedIfEmpty({});
  }, [landing, seedIfEmpty]);

  const dailyLabel = !landing?.dailyReady
    ? "warming up"
    : landing.alreadyPlayed
      ? "already played"
      : "ready";

  return (
    <div
      className="relative min-h-screen bg-strategy-panel text-white"
      data-testid="trivia-landing"
      data-state={ready ? "ready" : "loading"}
    >
      <div className="pointer-events-none absolute inset-0 speed-lines-bg opacity-25" />
      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:py-14 space-y-8">
        <p className="font-oswald text-xs uppercase tracking-[0.25em] text-strategy-cyan">Trivia Night</p>
        <h1 className="font-archivo uppercase text-4xl sm:text-6xl leading-none">Five questions. No caution laps.</h1>
        <p className="max-w-xl font-oswald text-lg text-white/70">
          A new Daily 5 every morning at 6 a.m. Mountain.
        </p>

        <div className="flex flex-wrap gap-3 font-oswald text-xs uppercase tracking-widest">
          <span className="rounded-full border border-white/20 px-3 py-1 text-strategy-yellow">
            Today {landing?.dayKey ?? "—"} · {dailyLabel}
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1">
            Chase pack {landing?.chaseReady ? (landing.chasePlayed ? "already played" : "ready") : "later"}
          </span>
        </div>

        {!landing?.dailyReady && (
          <p className="font-oswald text-strategy-yellow">{landing?.emptyCopy ?? "Tomorrow's Daily 5 posts at 6 a.m. MT."}</p>
        )}

        <div className="flex flex-wrap gap-3">
          <Link
            href="/trivia/play"
            className="rounded-lg bg-nascar-red px-5 py-3 font-oswald text-sm uppercase tracking-wider text-white"
          >
            Play today’s Daily 5
          </Link>
          <Link
            href="/trivia/board"
            className="rounded-lg border border-white/20 px-5 py-3 font-oswald text-sm uppercase tracking-wider"
          >
            Chase board
          </Link>
          <Link
            href="/trivia/rules"
            className="rounded-lg border border-white/20 px-5 py-3 font-oswald text-sm uppercase tracking-wider"
          >
            How scoring works
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/trivia/play" className="rounded-xl border border-white/15 bg-black/30 p-5">
            <p className="font-oswald text-xs uppercase tracking-widest text-strategy-yellow">Daily 5</p>
            <p className="font-archivo text-2xl mt-2">Five live. Twenty seconds. Green flag.</p>
          </Link>
          <Link
            href={landing?.chaseReady ? "/trivia/play?pack=chase" : "/trivia"}
            className="rounded-xl border border-white/15 bg-black/30 p-5"
          >
            <p className="font-oswald text-xs uppercase tracking-widest text-strategy-cyan">Chase pack</p>
            <p className="font-archivo text-2xl mt-2">10 questions. Sat–Sun of Chase weekend.</p>
          </Link>
          <Link href="/trivia/play?pack=practice" className="rounded-xl border border-white/15 bg-black/30 p-5">
            <p className="font-oswald text-xs uppercase tracking-widest text-white/50">Practice</p>
            <p className="font-archivo text-2xl mt-2">Scrambled old Qs. No points.</p>
          </Link>
        </div>

        <p className="font-oswald text-sm text-white/55">
          Done? Call pits in{" "}
          <Link href="/garage" className="text-strategy-yellow underline-offset-4 hover:underline">
            Love Garage
          </Link>
          .
        </p>
        <TriviaDisclaimer />
      </div>
    </div>
  );
}
