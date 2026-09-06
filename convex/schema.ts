import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
import {
  cupRaceDebriefValidator,
  runStatusValidator,
} from "./cupDebriefValidators";

export const garageRaceStatus = v.union(
  v.literal("upcoming"),
  v.literal("green"),
  v.literal("caution"),
  v.literal("red"),
  v.literal("checkered"),
);

export const garageCallChoice = v.union(
  v.literal("stay"),
  v.literal("four"),
  v.literal("two"),
  v.literal("fuel"),
);

export const garageEntryStatus = v.union(
  v.literal("running"),
  v.literal("dnf"),
);

export const triviaPack = v.union(
  v.literal("daily"),
  v.literal("chase"),
  v.literal("practice"),
);

export const triviaCategory = v.union(
  v.literal("beginner"),
  v.literal("tracks"),
  v.literal("history"),
  v.literal("season2026"),
  v.literal("cup"),
  v.literal("oreilly"),
  v.literal("trucks"),
);

export const triviaDifficulty = v.union(
  v.literal("easy"),
  v.literal("medium"),
  v.literal("hard"),
);

export default defineSchema({
  ...authTables,

  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
  }).index("email", ["email"]),

  /**
   * Latest (and historical) Cup race debriefs used on /#last-race.
   * Autopilot inserts a new row only when a newer finished race is detected.
   */
  cupRaceDebriefs: defineTable({
    raceId: v.optional(v.number()),
    raceName: v.string(),
    dateIso: v.string(),
    track: v.string(),
    debrief: cupRaceDebriefValidator,
    sources: v.array(v.string()),
    generatedAt: v.number(),
    provenance: v.string(),
  })
    .index("by_dateIso", ["dateIso"])
    .index("by_raceId", ["raceId"])
    .index("by_generatedAt", ["generatedAt"]),

  /** Autopilot run log — nightly cron + manual force. */
  raceUpdateRuns: defineTable({
    status: runStatusValidator,
    message: v.string(),
    raceName: v.optional(v.string()),
    raceId: v.optional(v.number()),
    dateIso: v.optional(v.string()),
    sources: v.optional(v.array(v.string())),
    forced: v.boolean(),
    finishedAt: v.number(),
  }).index("by_finishedAt", ["finishedAt"]),

  garageCars: defineTable({
    userId: v.id("users"),
    teamName: v.string(),
    carNumber: v.number(),
    primaryColor: v.string(),
    accentColor: v.string(),
    driverName: v.string(),
  })
    .index("by_userId", ["userId"])
    .index("by_carNumber", ["carNumber"]),

  garageRaces: defineTable({
    name: v.string(),
    track: v.string(),
    dateLabel: v.string(),
    scheduledLaps: v.number(),
    maxStintLaps: v.number(),
    fieldAvgLapSeconds: v.number(),
    status: garageRaceStatus,
    leaderLap: v.number(),
    isCurrent: v.boolean(),
    officialResults: v.optional(
      v.array(
        v.object({
          place: v.number(),
          carNumber: v.string(),
          driver: v.string(),
        }),
      ),
    ),
    fieldGhosts: v.optional(
      v.array(
        v.object({
          key: v.string(),
          elapsedSeconds: v.number(),
        }),
      ),
    ),
    finishedAt: v.optional(v.number()),
  }).index("by_isCurrent", ["isCurrent"]),

  garageEntries: defineTable({
    raceId: v.id("garageRaces"),
    carId: v.id("garageCars"),
    userId: v.id("users"),
    plannedStops: v.union(v.literal(1), v.literal(2), v.literal(3)),
    fuelWindow: v.union(v.literal("short"), v.literal("long")),
    preraceLocked: v.boolean(),
    elapsedSeconds: v.number(),
    fuelLaps: v.number(),
    status: garageEntryStatus,
    dnfReason: v.optional(v.string()),
    frozenFinish: v.optional(v.number()),
    pointsAwarded: v.optional(v.number()),
    lastCallLap: v.optional(v.number()),
    lastCallFlag: v.optional(garageRaceStatus),
  })
    .index("by_raceId", ["raceId"])
    .index("by_race_user", ["raceId", "userId"])
    .index("by_race_car", ["raceId", "carId"]),

  garageCalls: defineTable({
    raceId: v.id("garageRaces"),
    carId: v.id("garageCars"),
    userId: v.id("users"),
    lap: v.number(),
    flag: garageRaceStatus,
    choice: garageCallChoice,
    createdAt: v.number(),
  })
    .index("by_raceId", ["raceId"])
    .index("by_race_car", ["raceId", "carId"]),

  triviaQuestions: defineTable({
    seedKey: v.optional(v.string()),
    prompt: v.string(),
    answers: v.array(v.string()),
    correctIndex: v.number(),
    explain: v.string(),
    pack: triviaPack,
    category: triviaCategory,
    difficulty: triviaDifficulty,
    activeDate: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_seedKey", ["seedKey"])
    .index("by_pack", ["pack"])
    .index("by_activeDate", ["activeDate"])
    .index("by_difficulty", ["difficulty"]),

  triviaPacks: defineTable({
    packType: v.union(v.literal("daily"), v.literal("chase")),
    dayKey: v.string(),
    questionIds: v.array(v.id("triviaQuestions")),
    publishedAt: v.number(),
    weekendLabel: v.optional(v.string()),
  }).index("by_type_day", ["packType", "dayKey"]),

  triviaAttempts: defineTable({
    userId: v.id("users"),
    packType: triviaPack,
    dayKey: v.string(),
    questionIds: v.array(v.id("triviaQuestions")),
    answers: v.array(
      v.object({
        questionId: v.id("triviaQuestions"),
        choice: v.number(),
        elapsedMs: v.number(),
        correct: v.boolean(),
      }),
    ),
    status: v.union(v.literal("open"), v.literal("done")),
    correctCount: v.number(),
    points: v.number(),
    timeBonus: v.number(),
    secondsUsed: v.number(),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user_pack_day", ["userId", "packType", "dayKey"])
    .index("by_pack_day", ["packType", "dayKey"])
    .index("by_user", ["userId"]),
});
