'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BEGINNER_BASICS,
  CUP_TEAMS,
  CUP_TRACKS,
  TEAM_COLOR_CLASSES,
  TRACK_TYPE_BADGE,
  TRACK_TYPE_LABELS,
  type TrackType,
} from '@/lib/beginners-data';
import { BEGINNER_TRACK_DESK } from '@/lib/tracks';

const JUMP_LINKS = [
  { id: 'basics', label: 'Basics' },
  { id: 'teams', label: 'Cup Teams' },
  { id: 'tracks', label: 'Tracks' },
] as const;

const TRACK_FILTERS: Array<{ id: 'all' | TrackType; label: string }> = [
  { id: 'all', label: 'All tracks' },
  { id: 'superspeedway', label: 'Superspeedway' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'short-track', label: 'Short track' },
  { id: 'road-course', label: 'Road course' },
  { id: 'street', label: 'Street' },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function BeginnersGuide() {
  const [teamSearch, setTeamSearch] = useState('');
  const [trackSearch, setTrackSearch] = useState('');
  const [trackFilter, setTrackFilter] = useState<'all' | TrackType>('all');

  const filteredTeams = useMemo(() => {
    const q = teamSearch.trim().toLowerCase();
    if (!q) return CUP_TEAMS;
    return CUP_TEAMS.filter((team) => {
      const hay = [
        team.name,
        team.nickname ?? '',
        ...team.drivers.map((d) => `${d.name} ${d.number}`),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [teamSearch]);

  const filteredTracks = useMemo(() => {
    const q = trackSearch.trim().toLowerCase();
    return CUP_TRACKS.filter((track) => {
      const matchType = trackFilter === 'all' || track.type === trackFilter;
      if (!matchType) return false;
      if (!q) return true;
      const hay = `${track.name} ${track.location} ${track.raceStyle} ${TRACK_TYPE_LABELS[track.type]}`.toLowerCase();
      return hay.includes(q);
    });
  }, [trackSearch, trackFilter]);

  const driverCount = CUP_TEAMS.reduce((sum, t) => sum + t.drivers.length, 0);

  return (
    <div className="bg-background">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border px-3 sm:px-4 py-10 sm:py-14">
          <div className="absolute inset-0 pointer-events-none speed-lines-bg opacity-70" aria-hidden />
          <div
            className="absolute -right-16 -top-20 w-72 h-72 rounded-full blur-3xl opacity-30"
            style={{ background: 'hsl(var(--nascar-red) / 0.35)' }}
            aria-hidden
          />
          <div
            className="absolute -left-10 bottom-0 w-64 h-64 rounded-full blur-3xl opacity-25"
            style={{ background: 'hsl(var(--nascar-blue) / 0.3)' }}
            aria-hidden
          />

          <div className="relative max-w-5xl mx-auto">
            <p className="font-oswald tracking-[0.25em] text-muted-foreground text-xs sm:text-sm uppercase mb-2">
              Obsessed with NASCAR · Fan School
            </p>
            <h1 className="font-archivo text-4xl sm:text-5xl md:text-7xl tracking-tight text-foreground leading-[0.95] mb-4">
              NASCAR FOR{' '}
              <span className="relative inline-block">
                <span
                  className="absolute inset-0 bg-nascar-red"
                  style={{ transform: 'skewX(-8deg)', borderRadius: '2px' }}
                />
                <span className="relative text-white px-2 sm:px-3">BEGINNERS</span>
              </span>
            </h1>
            <p className="font-oswald text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              New to stock cars? Start here. Learn how races work, meet the Cup Series teams and drivers,
              and get a plain-English guide to the tracks they thrash every season.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {[
                { label: `${CUP_TEAMS.length} Cup teams`, tone: 'bg-nascar-red text-white' },
                { label: `${driverCount}+ drivers listed`, tone: 'bg-nascar-blue text-white' },
                { label: `${CUP_TRACKS.length} tracks explained`, tone: 'bg-foreground text-background' },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className={`font-oswald text-[11px] sm:text-xs tracking-widest uppercase px-3 py-1.5 rounded-full ${chip.tone}`}
                >
                  {chip.label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {JUMP_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToId(link.id)}
                  className="font-oswald text-sm tracking-wider uppercase px-4 py-2.5 rounded-lg border border-border bg-card hover:border-nascar-red hover:text-nascar-red transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Link
                href="/drivers"
                className="font-oswald text-sm tracking-wider uppercase px-4 py-2.5 rounded-lg bg-nascar-red text-white hover:opacity-90 transition-opacity"
              >
                Driver Hub →
              </Link>
            </div>
          </div>
        </section>

        {/* Basics */}
        <section id="basics" className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-14 scroll-mt-20">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="h-px flex-1 bg-border" />
            <h2 className="font-archivo text-lg sm:text-2xl tracking-wide text-foreground uppercase whitespace-nowrap">
              📘 The Basics
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {BEGINNER_BASICS.map((card, i) => (
              <article
                key={card.id}
                className="bg-card border border-border border-t-4 border-t-nascar-red rounded-xl p-4 sm:p-5 card-lift"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl leading-none" aria-hidden>
                    {card.icon}
                  </span>
                  <h3 className="font-archivo text-base sm:text-lg uppercase tracking-wide text-foreground leading-tight">
                    {card.title}
                  </h3>
                </div>
                <p className="font-oswald text-sm text-muted-foreground leading-relaxed mb-3">
                  {card.body}
                </p>
                {card.bullets && (
                  <ul className="space-y-2">
                    {card.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 font-oswald text-sm text-foreground/90 leading-snug"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-nascar-red flex-shrink-0" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Teams */}
        <section id="teams" className="bg-secondary/40 border-y border-border scroll-mt-20">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-14">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="h-px flex-1 bg-border" />
              <h2 className="font-archivo text-lg sm:text-2xl tracking-wide text-foreground uppercase whitespace-nowrap">
                🏎️ Cup Teams & Drivers
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>

            <p className="font-oswald text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto text-center mb-6">
              Cup Series organizations field the cars you see every Sunday. Search by team or driver.
              Lineups can shift during a season — this is your fan-friendly starter map.
            </p>

            <div className="max-w-xl mx-auto mb-6 sm:mb-8">
              <label htmlFor="team-search" className="sr-only">
                Search teams or drivers
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" aria-hidden>
                  🔍
                </span>
                <input
                  id="team-search"
                  type="search"
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  placeholder="Search team, driver, or car #…"
                  className="w-full rounded-lg border border-border bg-card pl-9 pr-3 py-3 font-oswald text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-nascar-red/40"
                />
              </div>
            </div>

            {filteredTeams.length === 0 ? (
              <p className="text-center font-oswald text-muted-foreground py-8">
                No teams match “{teamSearch}”. Try another name or number.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {filteredTeams.map((team) => {
                  const colors = TEAM_COLOR_CLASSES[team.color];
                  return (
                    <article
                      key={team.id}
                      className={`bg-card border border-border border-t-4 ${colors.border} rounded-xl overflow-hidden flex flex-col`}
                    >
                      <div className="p-4 sm:p-5 border-b border-border/60 bg-secondary/20">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="min-w-0">
                            <h3 className="font-archivo text-base sm:text-lg uppercase tracking-wide text-foreground leading-tight">
                              {team.name}
                            </h3>
                            <p className="font-oswald text-xs tracking-widest text-muted-foreground uppercase mt-1">
                              Est. {team.founded} · {team.hq}
                            </p>
                          </div>
                          {team.nickname && (
                            <span className={`flex-shrink-0 font-oswald text-[10px] tracking-widest uppercase px-2 py-1 rounded ${colors.soft}`}>
                              {team.nickname}
                            </span>
                          )}
                        </div>
                        <p className="font-oswald text-sm text-muted-foreground leading-relaxed">
                          {team.blurb}
                        </p>
                      </div>

                      <div className="p-4 sm:p-5 flex-1">
                        <p className="font-oswald text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3">
                          Drivers
                        </p>
                        <ul className="space-y-2">
                          {team.drivers.map((driver) => (
                            <li
                              key={`${team.id}-${driver.number}-${driver.name}`}
                              className="flex items-center gap-3 rounded-lg bg-secondary/50 border border-border/50 px-3 py-2.5"
                            >
                              <span
                                className={`font-archivo text-sm min-w-[2.5rem] text-center px-2 py-1 rounded ${colors.badge}`}
                              >
                                #{driver.number}
                              </span>
                              <span className="font-oswald text-sm sm:text-base text-foreground font-500 min-w-0 truncate">
                                {driver.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <p className="mt-6 text-center font-oswald text-xs text-muted-foreground tracking-wide">
              Fan overview · Not an official NASCAR entry list · Part-time & last-minute swaps may differ
            </p>
          </div>
        </section>

        {/* Tracks */}
        <section id="tracks" className="max-w-7xl mx-auto px-3 sm:px-4 py-10 sm:py-14 scroll-mt-20">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="h-px flex-1 bg-border" />
            <h2 className="font-archivo text-lg sm:text-2xl tracking-wide text-foreground uppercase whitespace-nowrap">
              🏟️ Cup Track Guide
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <p className="font-oswald text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto text-center mb-6">
            Cup doesn’t race the same track every week. Type changes everything — pack chaos at Daytona,
            bumper wars at Bristol, braking art at Sonoma.
          </p>

          <div className="flex flex-col gap-3 mb-6 sm:mb-8">
            <div className="max-w-xl mx-auto w-full">
              <label htmlFor="track-search" className="sr-only">
                Search tracks
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" aria-hidden>
                  🔍
                </span>
                <input
                  id="track-search"
                  type="search"
                  value={trackSearch}
                  onChange={(e) => setTrackSearch(e.target.value)}
                  placeholder="Search track or city…"
                  className="w-full rounded-lg border border-border bg-card pl-9 pr-3 py-3 font-oswald text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-nascar-blue/40"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {TRACK_FILTERS.map((f) => {
                const active = trackFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setTrackFilter(f.id)}
                    className={`font-oswald text-xs sm:text-sm tracking-wider uppercase px-3 py-2 rounded-full border transition-colors ${
                      active
                        ? 'bg-nascar-blue text-white border-nascar-blue'
                        : 'bg-card text-muted-foreground border-border hover:border-nascar-blue/50 hover:text-foreground'
                    }`}
                    aria-pressed={active}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredTracks.length === 0 ? (
            <p className="text-center font-oswald text-muted-foreground py-8">
              No tracks match that filter. Clear search or pick another type.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {filteredTracks.map((track) => (
                <article
                  key={track.id}
                  className="bg-card border border-border rounded-xl overflow-hidden flex flex-col"
                >
                  <div className="px-4 sm:px-5 py-4 border-b border-border/70 bg-secondary/25">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`font-oswald text-[10px] sm:text-[11px] tracking-widest uppercase px-2 py-0.5 rounded border ${TRACK_TYPE_BADGE[track.type]}`}
                      >
                        {TRACK_TYPE_LABELS[track.type]}
                      </span>
                      <span className="font-oswald text-[11px] tracking-wider text-muted-foreground uppercase">
                        {track.length}
                        {track.banking ? ` · ${track.banking}` : ''}
                      </span>
                    </div>
                    <h3 className="font-archivo text-base sm:text-lg uppercase tracking-wide text-foreground leading-tight">
                      {BEGINNER_TRACK_DESK[track.id] ? (
                        <Link href={`/tracks/${BEGINNER_TRACK_DESK[track.id]}`} className="hover:text-nascar-red">
                          {track.name}
                        </Link>
                      ) : (
                        track.name
                      )}
                    </h3>
                    <p className="font-oswald text-xs sm:text-sm text-muted-foreground mt-1">
                      {track.location}
                    </p>
                  </div>

                  <div className="px-4 sm:px-5 py-4 space-y-3 flex-1">
                    <div>
                      <p className="font-oswald text-[10px] tracking-[0.18em] text-muted-foreground uppercase mb-1">
                        Race style
                      </p>
                      <p className="font-oswald text-sm text-foreground">{track.raceStyle}</p>
                    </div>
                    <div>
                      <p className="font-oswald text-[10px] tracking-[0.18em] text-muted-foreground uppercase mb-1">
                        Why it matters
                      </p>
                      <p className="font-oswald text-sm text-foreground/90 leading-relaxed">
                        {track.whyItMatters}
                      </p>
                    </div>
                    <div className="rounded-lg border border-nascar-red/20 bg-nascar-red/5 px-3 py-2.5">
                      <p className="font-oswald text-[10px] tracking-[0.18em] text-nascar-red uppercase mb-1">
                        Fan tip
                      </p>
                      <p className="font-oswald text-sm text-foreground leading-relaxed">{track.fanTip}</p>
                    </div>
                    {BEGINNER_TRACK_DESK[track.id] && (
                      <Link
                        href={`/tracks/${BEGINNER_TRACK_DESK[track.id]}`}
                        className="inline-flex font-oswald text-xs uppercase tracking-wider text-nascar-red hover:underline"
                      >
                        Chase track desk →
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-border bg-foreground text-background px-3 sm:px-4 py-10 sm:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-archivo text-2xl sm:text-3xl uppercase tracking-wide mb-3">
              Ready to pick a side?
            </h2>
            <p className="font-oswald text-sm sm:text-base text-white/70 mb-6 leading-relaxed">
              Find a driver you vibe with, check this weekend’s TV schedule, and start following races
              with context — not confusion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/drivers"
                className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg bg-nascar-red text-white hover:opacity-90 transition-opacity"
              >
                Open Driver Hub
              </Link>
              <Link
                href="/#tv-guide"
                className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg border border-white/25 text-white hover:bg-white/10 transition-colors"
              >
                This weekend TV
              </Link>
              <Link
                href="/#schedule"
                className="inline-flex items-center justify-center font-oswald tracking-wider uppercase text-sm px-5 py-3 rounded-lg border border-white/25 text-white hover:bg-white/10 transition-colors"
              >
                Full schedule
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
