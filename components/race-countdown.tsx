"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNextRace, type CupRace } from "@/lib/schedule";
import { getLiveCupRace } from "@/lib/nhms-live";
import { isDarlingtonWeekendLive } from "@/lib/darlington-weekend";

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

function calcTimeLeft(race: CupRace): TimeLeft {
  const diff = new Date(race.date).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  const secs = Math.floor(diff / 1000);
  return {
    days: Math.floor(secs / 86400),
    hours: Math.floor((secs % 86400) / 3600),
    mins: Math.floor((secs % 3600) / 60),
    secs: secs % 60,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function DigitBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 min-w-0 flex-1">
      <div className="bg-black/50 border border-white/10 rounded px-1.5 sm:px-2.5 py-1 sm:py-1.5 w-full text-center">
        <span className="font-archivo text-xl sm:text-3xl md:text-4xl text-white countdown-digit leading-none">
          {pad(value)}
        </span>
      </div>
      <span className="font-oswald text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.15em] text-white/50 uppercase">
        {label}
      </span>
    </div>
  );
}

export default function RaceCountdown() {
  const [race, setRace] = useState<CupRace | null>(null);
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const nextRace = getNextRace();
    setRace(nextRace);
    if (!nextRace) return;
    setTime(calcTimeLeft(nextRace));

    const interval = setInterval(() => {
      const current = getNextRace();
      setRace(current);
      if (current) setTime(calcTimeLeft(current));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const live = getLiveCupRace();
  if (isDarlingtonWeekendLive()) {
    return (
      <Link
        href="/#darlington-weekend"
        className="block rounded-xl border border-nascar-red/50 bg-black/60 backdrop-blur overflow-hidden text-left hover:border-nascar-red transition-colors"
        data-testid="darlington-live-cta"
      >
        <div className="bg-nascar-red/90 px-3 sm:px-4 py-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white pulse-dot flex-shrink-0" />
          <span className="font-oswald font-600 text-white text-xs tracking-[0.2em] uppercase">
            LIVE now
          </span>
        </div>
        <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-5">
          <p className="font-oswald text-[11px] tracking-[0.16em] text-white/45 uppercase mb-1">
            Cook Out Southern 500 · Chase race 1 of 10
          </p>
          <p className="font-archivo text-white text-lg sm:text-xl leading-tight mb-1">
            Green at Darlington
          </p>
          <p className="font-oswald text-sm text-strategy-yellow tracking-wide uppercase mb-2">
            Metric pole · Reddick #45
          </p>
          <p className="font-oswald text-white/55 text-[12px] leading-snug mb-3">
            Winner TBD after checkered. Creed checkered the Fleetio 200 Saturday.
          </p>
          <p className="font-oswald font-600 text-xs tracking-[0.16em] uppercase text-nascar-blue">
            Open live desk →
          </p>
        </div>
      </Link>
    );
  }
  if (live) {
    return (
      <Link
        href="/#live-race"
        className="block rounded-xl border border-nascar-red/50 bg-black/60 backdrop-blur overflow-hidden text-left hover:border-nascar-red transition-colors"
        data-testid="live-race-cta"
      >
        <div className="bg-nascar-red/90 px-3 sm:px-4 py-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white pulse-dot flex-shrink-0" />
          <span className="font-oswald font-600 text-white text-xs tracking-[0.2em] uppercase">
            Live now
          </span>
        </div>
        <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-5">
          <p className="font-oswald text-[11px] tracking-[0.16em] text-white/45 uppercase mb-1">
            {live.eventLabel}
          </p>
          <p className="font-archivo text-white text-lg sm:text-xl leading-tight mb-1">
            #{live.leader.car} {live.leader.driver} leads
          </p>
          <p className="font-oswald text-sm text-strategy-yellow tracking-wide uppercase mb-2">
            {live.lapNote}
          </p>
          <p className="font-oswald text-white/55 text-[12px] leading-snug mb-3">
            Stage 1 Larson · Stage 2 Blaney · {live.tv}
          </p>
          <p className="font-oswald font-600 text-xs tracking-[0.16em] uppercase text-nascar-blue">
            Open live race desk →
          </p>
        </div>
      </Link>
    );
  }

  if (!race) {
    return (
      <Link
        href="/#last-race"
        className="block rounded-xl border border-nascar-red/50 bg-black/60 backdrop-blur overflow-hidden text-left hover:border-nascar-red transition-colors"
        data-testid="chase-locked-cta"
      >
        <div className="bg-nascar-red/90 px-3 sm:px-4 py-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white pulse-dot flex-shrink-0" />
          <span className="font-oswald font-600 text-white text-xs tracking-[0.2em] uppercase">
            Checkered
          </span>
        </div>
        <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-5">
          <p className="font-oswald text-[11px] tracking-[0.16em] text-white/45 uppercase mb-1">
            Coke Zero Sugar 400
          </p>
          <p className="font-archivo text-white text-lg sm:text-xl leading-tight mb-1">
            #60 Preece wins Daytona
          </p>
          <p className="font-oswald text-sm text-strategy-yellow tracking-wide uppercase mb-2">
            Chase field locked · SVG misses
          </p>
          <p className="font-oswald font-600 text-xs tracking-[0.16em] uppercase text-nascar-blue">
            Open race recap →
          </p>
        </div>
      </Link>
    );
  }

  const raceOver = time.days === 0 && time.hours === 0 && time.mins === 0 && time.secs === 0;

  return (
    <div className="rounded-xl border border-nascar-red/40 bg-black/60 backdrop-blur overflow-hidden">
      {/* Top bar */}
      <div className="bg-nascar-red/90 px-3 sm:px-4 py-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-white pulse-dot flex-shrink-0" />
        <span className="font-oswald font-600 text-white text-xs tracking-[0.2em] uppercase">
          Next Race
        </span>
      </div>

      <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-5">
        {/* Race name */}
        <p className="font-archivo text-white text-lg sm:text-xl leading-tight mb-0.5 break-words">
          {race.name}
        </p>
        <p className="font-oswald text-white/60 text-sm tracking-wide mb-1 break-words">
          {race.track}
        </p>
        <p className="font-oswald text-white/50 text-[11px] sm:text-xs tracking-wider uppercase mb-3 sm:mb-4">
          {race.dateLabel} · 📺 {race.tv}
        </p>

        {/* Countdown digits */}
        {raceOver ? (
          <p className="font-oswald text-nascar-blue text-base sm:text-lg tracking-widest uppercase text-center py-2">
            🏁 Race day! Tune in now
          </p>
        ) : (
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            <DigitBlock value={time.days} label="Days" />
            <span className="font-archivo text-white/30 text-xl sm:text-3xl pb-3 sm:pb-4 flex-shrink-0">:</span>
            <DigitBlock value={time.hours} label="Hours" />
            <span className="font-archivo text-white/30 text-xl sm:text-3xl pb-3 sm:pb-4 flex-shrink-0">:</span>
            <DigitBlock value={time.mins} label="Mins" />
            <span className="font-archivo text-white/30 text-xl sm:text-3xl pb-3 sm:pb-4 flex-shrink-0">:</span>
            <DigitBlock value={time.secs} label="Secs" />
          </div>
        )}

        {/* CTA */}
        <div className="mt-3 sm:mt-4 pt-3 border-t border-white/10">
          <Link
            href={race.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center font-oswald font-600 text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-nascar-blue hover:text-white transition-colors py-1"
          >
            Race Info & Tickets →
          </Link>
        </div>
      </div>
    </div>
  );
}
