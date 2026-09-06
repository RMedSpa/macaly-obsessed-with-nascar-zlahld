import { v } from "convex/values";

/** Shared Convex validators matching lib/cup-race-debrief.ts shapes. */

export const finishRowValidator = v.object({
  pos: v.number(),
  car: v.string(),
  driver: v.string(),
  team: v.string(),
  start: v.number(),
  status: v.string(),
  gap: v.string(),
  lapsLed: v.optional(v.number()),
});

export const pitCrewRowValidator = v.object({
  driver: v.string(),
  car: v.string(),
  avgStop: v.number(),
  bestStop: v.number(),
  stops: v.number(),
  note: v.optional(v.string()),
  isWinner: v.optional(v.boolean()),
});

export const raceIncidentValidator = v.object({
  bin: v.union(
    v.literal("wreck"),
    v.literal("penalty"),
    v.literal("pit"),
    v.literal("mechanical"),
  ),
  lap: v.optional(v.number()),
  driver: v.string(),
  car: v.optional(v.string()),
  title: v.string(),
  detail: v.string(),
});

export const stageResultValidator = v.object({
  stage: v.union(v.literal(1), v.literal(2), v.literal(3)),
  winner: v.string(),
  runnerUp: v.optional(v.string()),
  note: v.optional(v.string()),
});

export const winnerPitStopValidator = v.object({
  lap: v.number(),
  window: v.union(
    v.literal("green"),
    v.literal("caution"),
    v.literal("stage-break"),
  ),
  service: v.string(),
  durationSec: v.optional(v.number()),
  posIn: v.optional(v.string()),
  posOut: v.optional(v.string()),
  note: v.string(),
  decisive: v.optional(v.boolean()),
});

export const winnerPitStrategyValidator = v.object({
  label: v.string(),
  summary: v.string(),
  totalStops: v.number(),
  avgStopSec: v.number(),
  bestStopSec: v.number(),
  stops: v.array(winnerPitStopValidator),
  keysToWin: v.array(v.string()),
  note: v.string(),
});

export const cupRaceDebriefValidator = v.object({
  raceName: v.string(),
  eventLabel: v.string(),
  track: v.string(),
  dateLabel: v.string(),
  dateIso: v.string(),
  tv: v.string(),
  distance: v.string(),
  winner: v.object({
    driver: v.string(),
    car: v.string(),
    team: v.string(),
    manufacturer: v.string(),
    start: v.number(),
    lapsLed: v.number(),
    margin: v.string(),
    careerWin: v.number(),
    seasonWin: v.number(),
    headline: v.string(),
    blurb: v.string(),
  }),
  winnerPitStrategy: winnerPitStrategyValidator,
  stages: v.array(stageResultValidator),
  stats: v.object({
    leadChanges: v.number(),
    leaders: v.number(),
    cautions: v.number(),
    cautionLaps: v.number(),
    avgSpeed: v.string(),
    pole: v.string(),
    poleTime: v.string(),
    mostLapsLed: v.string(),
    mostLapsLedCount: v.number(),
    fastestLap: v.string(),
  }),
  finishers: v.array(finishRowValidator),
  pitScoreboard: v.array(pitCrewRowValidator),
  pitNote: v.string(),
  incidents: v.array(raceIncidentValidator),
  takeaways: v.array(v.string()),
  nextRace: v.object({
    name: v.string(),
    track: v.string(),
    when: v.string(),
  }),
});

export const runStatusValidator = v.union(
  v.literal("success"),
  v.literal("skipped"),
  v.literal("failed"),
);
