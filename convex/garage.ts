import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";
import {
  garageCallChoice,
  garageRaceStatus,
} from "./schema";
import {
  applyCall,
  awardPoints,
  canMakeCall,
  defaultGhosts,
  packOnCaution,
  persistGhosts,
  positionOf,
  rankCars,
  STARTING_PLACE,
  tickGreenLap,
  withGhosts,
  type CallChoice,
  type FlagStatus,
  type ScoringCar,
} from "./garageScoring";

const DEFAULT_RACE = {
  name: "Cook Out Southern 500",
  track: "Darlington Raceway",
  dateLabel: "Sun Sep 6, 2026 · 5 p.m. ET / 3 p.m. MDT",
  scheduledLaps: 367,
  maxStintLaps: 68,
  fieldAvgLapSeconds: 29.4,
  status: "upcoming" as const,
  leaderLap: 0,
  isCurrent: true,
  fieldGhosts: persistGhosts(defaultGhosts()),
};

function isStaleUpcomingDefault(race: { name: string; track: string; status: string }) {
  if (race.status !== "upcoming") return false;
  return /World Wide Technology|Enjoy Illinois|Gateway/i.test(`${race.name} ${race.track}`);
}

type FailCode = "UNAUTHENTICATED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "INVALID";

function fail(code: FailCode, message: string) {
  return { ok: false as const, code, message };
}

function toScoring(entries: Doc<"garageEntries">[]): ScoringCar[] {
  return entries.map((entry) => ({
    id: entry._id,
    elapsedSeconds: entry.elapsedSeconds,
    fuelLaps: entry.fuelLaps,
    status: entry.status,
    dnfReason: entry.dnfReason,
  }));
}

function fieldFor(race: Doc<"garageRaces">, entries: Doc<"garageEntries">[]): ScoringCar[] {
  return withGhosts(toScoring(entries), race.fieldGhosts);
}

async function writeScoring(
  ctx: { db: any },
  raceId: Id<"garageRaces">,
  scored: ScoringCar[],
) {
  for (const car of scored) {
    if (car.id.startsWith("g:")) continue;
    await ctx.db.patch(car.id as Id<"garageEntries">, {
      elapsedSeconds: car.elapsedSeconds,
      fuelLaps: car.fuelLaps,
      status: car.status,
      dnfReason: car.dnfReason,
    });
  }
  await ctx.db.patch(raceId, { fieldGhosts: persistGhosts(scored) });
}

export const seedIfEmpty = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("garageRaces")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .first();
    if (existing) {
      const patch: Partial<typeof DEFAULT_RACE> = {};
      if (!existing.fieldGhosts?.length) {
        patch.fieldGhosts = persistGhosts(defaultGhosts());
      }
      if (isStaleUpcomingDefault(existing)) {
        patch.name = DEFAULT_RACE.name;
        patch.track = DEFAULT_RACE.track;
        patch.dateLabel = DEFAULT_RACE.dateLabel;
        patch.scheduledLaps = DEFAULT_RACE.scheduledLaps;
        patch.maxStintLaps = DEFAULT_RACE.maxStintLaps;
        patch.fieldAvgLapSeconds = DEFAULT_RACE.fieldAvgLapSeconds;
        console.log("[love-garage] retargeted current upcoming race to Darlington");
      }
      if (Object.keys(patch).length) {
        await ctx.db.patch(existing._id, patch);
      }
      return { ok: true as const, raceId: existing._id, seeded: false };
    }
    const raceId = await ctx.db.insert("garageRaces", DEFAULT_RACE);
    console.log("[love-garage] seeded default Darlington race");
    return { ok: true as const, raceId, seeded: true };
  },
});

export const getCurrentRace = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("garageRaces")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .first();
  },
});

export const getMyCar = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db
      .query("garageCars")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
  },
});

export const getBoard = query({
  args: {},
  handler: async (ctx) => {
    const race = await ctx.db
      .query("garageRaces")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .first();
    if (!race) {
      return { race: null, garageOrder: [], official: [], season: [] };
    }
    const entries = await ctx.db
      .query("garageEntries")
      .withIndex("by_raceId", (q) => q.eq("raceId", race._id))
      .collect();
    const scored = fieldFor(race, entries);
    const garageOrder: {
      place: number;
      carNumber: number;
      teamName: string;
      driverName: string;
      primaryColor: string;
      accentColor: string;
      status: "running" | "dnf";
      dnfReason: string | null;
      estimated: boolean;
      fuelLaps: number;
      pointsAwarded: number | null;
    }[] = [];
    for (const entry of entries) {
      const car = await ctx.db.get(entry.carId);
      if (!car) continue;
      const place =
        race.status === "checkered" && entry.frozenFinish
          ? entry.frozenFinish
          : race.status === "upcoming"
            ? STARTING_PLACE
            : positionOf(scored, entry._id);
      garageOrder.push({
        place,
        carNumber: car.carNumber,
        teamName: car.teamName,
        driverName: car.driverName,
        primaryColor: car.primaryColor,
        accentColor: car.accentColor,
        status: entry.status,
        dnfReason: entry.dnfReason ?? null,
        estimated: race.status !== "checkered",
        fuelLaps: entry.fuelLaps,
        pointsAwarded: entry.pointsAwarded ?? null,
      });
    }
    garageOrder.sort((a, b) => a.place - b.place);

    const allEntries = await ctx.db.query("garageEntries").collect();
    const seasonMap = new Map<
      string,
      {
        userId: string;
        carNumber: number;
        teamName: string;
        driverName: string;
        points: number;
        lastFinish: number | null;
      }
    >();
    for (const entry of allEntries) {
      if (entry.pointsAwarded == null) continue;
      const car = await ctx.db.get(entry.carId);
      if (!car) continue;
      const key = entry.userId;
      const prev = seasonMap.get(key) ?? {
        userId: key,
        carNumber: car.carNumber,
        teamName: car.teamName,
        driverName: car.driverName,
        points: 0,
        lastFinish: null,
      };
      prev.points += entry.pointsAwarded;
      if (entry.raceId === race._id) prev.lastFinish = entry.frozenFinish ?? null;
      seasonMap.set(key, prev);
    }
    const season = Array.from(seasonMap.values()).sort((a, b) => b.points - a.points);

    return {
      race,
      garageOrder,
      official: race.officialResults ?? [],
      season,
    };
  },
});

export const getRaceHq = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return { ok: false as const, code: "UNAUTHENTICATED" as const, message: "Sign in required." };
    const car = await ctx.db
      .query("garageCars")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
    if (!car) return { ok: false as const, code: "NOT_FOUND" as const, message: "Build a car first." };
    const race = await ctx.db
      .query("garageRaces")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .first();
    if (!race) return { ok: false as const, code: "NOT_FOUND" as const, message: "No race is posted." };
    const entry = await ctx.db
      .query("garageEntries")
      .withIndex("by_race_user", (q) => q.eq("raceId", race._id).eq("userId", userId))
      .unique();
    const entries = await ctx.db
      .query("garageEntries")
      .withIndex("by_raceId", (q) => q.eq("raceId", race._id))
      .collect();
    const scored = fieldFor(race, entries);
    const calls = entry
      ? await ctx.db
          .query("garageCalls")
          .withIndex("by_race_car", (q) => q.eq("raceId", race._id).eq("carId", car._id))
          .collect()
      : [];
    calls.sort((a, b) => a.createdAt - b.createdAt);
    const place = entry
      ? race.status === "checkered" && entry.frozenFinish
        ? entry.frozenFinish
        : race.status === "upcoming"
          ? STARTING_PLACE
          : positionOf(scored, entry._id)
      : STARTING_PLACE;
    const callEnabled = entry
      ? canMakeCall({
          raceStatus: race.status,
          leaderLap: race.leaderLap,
          fuelLaps: entry.fuelLaps,
          entryStatus: entry.status,
        })
      : false;
    return {
      ok: true as const,
      race,
      car,
      entry,
      place,
      callEnabled,
      calls,
    };
  },
});

export const saveCar = mutation({
  args: {
    teamName: v.string(),
    carNumber: v.number(),
    primaryColor: v.string(),
    accentColor: v.string(),
    driverName: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return fail("UNAUTHENTICATED", "Sign in to build a car.");
    const teamName = args.teamName.trim().slice(0, 40);
    const driverName = args.driverName.trim().slice(0, 40);
    if (!teamName || !driverName) return fail("INVALID", "Team and driver names are required.");
    if (!Number.isInteger(args.carNumber) || args.carNumber < 1 || args.carNumber > 99) {
      return fail("INVALID", "Car number must be 1–99.");
    }
    const race = await ctx.db
      .query("garageRaces")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .first();
    const numberLocked = !!race && race.status !== "upcoming";
    const mine = await ctx.db
      .query("garageCars")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
    const taken = await ctx.db
      .query("garageCars")
      .withIndex("by_carNumber", (q) => q.eq("carNumber", args.carNumber))
      .unique();
    if (taken && taken.userId !== userId) {
      return fail("CONFLICT", `No. ${args.carNumber} is already claimed.`);
    }
    if (mine) {
      if (numberLocked && mine.carNumber !== args.carNumber) {
        return fail("CONFLICT", "Number is locked once the race goes green.");
      }
      await ctx.db.patch(mine._id, {
        teamName,
        carNumber: numberLocked ? mine.carNumber : args.carNumber,
        primaryColor: args.primaryColor,
        accentColor: args.accentColor,
        driverName,
      });
      console.log("[love-garage] updated car", mine.carNumber);
      return { ok: true as const, carId: mine._id };
    }
    const carId = await ctx.db.insert("garageCars", {
      userId,
      teamName,
      carNumber: args.carNumber,
      primaryColor: args.primaryColor,
      accentColor: args.accentColor,
      driverName,
    });
    console.log("[love-garage] created car", args.carNumber);
    return { ok: true as const, carId };
  },
});

export const savePreraceCard = mutation({
  args: {
    plannedStops: v.union(v.literal(1), v.literal(2), v.literal(3)),
    fuelWindow: v.union(v.literal("short"), v.literal("long")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return fail("UNAUTHENTICATED", "Sign in required.");
    const car = await ctx.db
      .query("garageCars")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
    if (!car) return fail("NOT_FOUND", "Build a car first.");
    const race = await ctx.db
      .query("garageRaces")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .first();
    if (!race) return fail("NOT_FOUND", "No race is posted.");
    if (race.status !== "upcoming") return fail("CONFLICT", "Pre-race card is locked.");
    const existing = await ctx.db
      .query("garageEntries")
      .withIndex("by_race_user", (q) => q.eq("raceId", race._id).eq("userId", userId))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, {
        plannedStops: args.plannedStops,
        fuelWindow: args.fuelWindow,
      });
      return { ok: true as const, entryId: existing._id };
    }
    const entryId = await ctx.db.insert("garageEntries", {
      raceId: race._id,
      carId: car._id,
      userId,
      plannedStops: args.plannedStops,
      fuelWindow: args.fuelWindow,
      preraceLocked: false,
      elapsedSeconds: 0,
      fuelLaps: race.maxStintLaps,
      status: "running",
    });
    return { ok: true as const, entryId };
  },
});

export const joinRace = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return fail("UNAUTHENTICATED", "Sign in required.");
    const car = await ctx.db
      .query("garageCars")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
    if (!car) return fail("NOT_FOUND", "Build a car first.");
    const race = await ctx.db
      .query("garageRaces")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .first();
    if (!race) return fail("NOT_FOUND", "No race is posted.");
    const existing = await ctx.db
      .query("garageEntries")
      .withIndex("by_race_user", (q) => q.eq("raceId", race._id).eq("userId", userId))
      .unique();
    if (existing) return { ok: true as const, entryId: existing._id };
    const entries = await ctx.db
      .query("garageEntries")
      .withIndex("by_raceId", (q) => q.eq("raceId", race._id))
      .collect();
    const p20 = rankCars(fieldFor(race, entries))[STARTING_PLACE - 1];
    const entryId = await ctx.db.insert("garageEntries", {
      raceId: race._id,
      carId: car._id,
      userId,
      plannedStops: 2,
      fuelWindow: "long",
      preraceLocked: race.status !== "upcoming",
      elapsedSeconds: race.status === "upcoming" ? 0 : (p20?.elapsedSeconds ?? 0),
      fuelLaps: race.maxStintLaps,
      status: "running",
    });
    return { ok: true as const, entryId };
  },
});

export const lockCall = mutation({
  args: { choice: garageCallChoice },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return fail("UNAUTHENTICATED", "Sign in required.");
    const car = await ctx.db
      .query("garageCars")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
    if (!car) return fail("NOT_FOUND", "Build a car first.");
    const race = await ctx.db
      .query("garageRaces")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .first();
    if (!race) return fail("NOT_FOUND", "No race is posted.");
    const entry = await ctx.db
      .query("garageEntries")
      .withIndex("by_race_user", (q) => q.eq("raceId", race._id).eq("userId", userId))
      .unique();
    if (!entry) return fail("NOT_FOUND", "Join the race first.");
    if (
      !canMakeCall({
        raceStatus: race.status,
        leaderLap: race.leaderLap,
        fuelLaps: entry.fuelLaps,
        entryStatus: entry.status,
      })
    ) {
      return fail("CONFLICT", "Pits are closed. Wait for caution, a 40-lap window, or five laps of fuel.");
    }
    if (entry.lastCallLap === race.leaderLap && entry.lastCallFlag === race.status) {
      return fail("CONFLICT", "Call already locked for this window.");
    }
    const entries = await ctx.db
      .query("garageEntries")
      .withIndex("by_raceId", (q) => q.eq("raceId", race._id))
      .collect();
    const scored = applyCall(
      fieldFor(race, entries),
      entry._id,
      args.choice as CallChoice,
      race.status as FlagStatus,
      race.maxStintLaps,
    );
    await writeScoring(ctx, race._id, scored);
    await ctx.db.patch(entry._id, {
      lastCallLap: race.leaderLap,
      lastCallFlag: race.status,
    });
    await ctx.db.insert("garageCalls", {
      raceId: race._id,
      carId: car._id,
      userId,
      lap: race.leaderLap,
      flag: race.status,
      choice: args.choice,
      createdAt: Date.now(),
    });
    console.log("[love-garage] call locked", args.choice, "lap", race.leaderLap);
    return { ok: true as const };
  },
});

export const saveRace = mutation({
  args: {
    name: v.string(),
    track: v.string(),
    dateLabel: v.string(),
    scheduledLaps: v.number(),
    maxStintLaps: v.number(),
    fieldAvgLapSeconds: v.number(),
  },
  handler: async (ctx, args) => {
    const admin = await ctx.runQuery(api.garageAuthz.isAdmin, {});
    if (!admin) return fail("FORBIDDEN", "Owner only.");
    const current = await ctx.db
      .query("garageRaces")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .first();
    const patch = {
      name: args.name.trim(),
      track: args.track.trim(),
      dateLabel: args.dateLabel.trim(),
      scheduledLaps: Math.max(1, Math.floor(args.scheduledLaps)),
      maxStintLaps: Math.max(1, Math.floor(args.maxStintLaps)),
      fieldAvgLapSeconds: Math.max(1, args.fieldAvgLapSeconds),
    };
    if (current) {
      await ctx.db.patch(current._id, patch);
      return { ok: true as const, raceId: current._id };
    }
    const raceId = await ctx.db.insert("garageRaces", {
      ...patch,
      status: "upcoming",
      leaderLap: 0,
      isCurrent: true,
      fieldGhosts: persistGhosts(defaultGhosts()),
    });
    return { ok: true as const, raceId };
  },
});

export const setFlag = mutation({
  args: { status: garageRaceStatus },
  handler: async (ctx, args) => {
    const admin = await ctx.runQuery(api.garageAuthz.isAdmin, {});
    if (!admin) return fail("FORBIDDEN", "Owner only.");
    const race = await ctx.db
      .query("garageRaces")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .first();
    if (!race) return fail("NOT_FOUND", "Create a race first.");
    const entries = await ctx.db
      .query("garageEntries")
      .withIndex("by_raceId", (q) => q.eq("raceId", race._id))
      .collect();
    if (args.status !== "upcoming") {
      for (const entry of entries) {
        if (!entry.preraceLocked) await ctx.db.patch(entry._id, { preraceLocked: true });
      }
    }
    if (args.status === "caution" && race.status !== "caution") {
      await writeScoring(ctx, race._id, packOnCaution(fieldFor(race, entries)));
    }
    if (args.status === "checkered") {
      const latest = await ctx.db
        .query("garageEntries")
        .withIndex("by_raceId", (q) => q.eq("raceId", race._id))
        .collect();
      const scored = fieldFor(race, latest);
      const awards = awardPoints(scored);
      for (const row of awards) {
        await ctx.db.patch(row.id as Id<"garageEntries">, {
          frozenFinish: positionOf(scored, row.id),
          pointsAwarded: row.points,
        });
      }
      await ctx.db.patch(race._id, { status: args.status, finishedAt: Date.now() });
      console.log("[love-garage] checkered, field frozen");
      return { ok: true as const };
    }
    await ctx.db.patch(race._id, { status: args.status });
    console.log("[love-garage] flag", args.status);
    return { ok: true as const };
  },
});

export const setLeaderLap = mutation({
  args: { leaderLap: v.number(), increment: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    const admin = await ctx.runQuery(api.garageAuthz.isAdmin, {});
    if (!admin) return fail("FORBIDDEN", "Owner only.");
    const race = await ctx.db
      .query("garageRaces")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .first();
    if (!race) return fail("NOT_FOUND", "Create a race first.");
    const nextLap = args.increment ? race.leaderLap + 1 : Math.max(0, Math.floor(args.leaderLap));
    let entries = await ctx.db
      .query("garageEntries")
      .withIndex("by_raceId", (q) => q.eq("raceId", race._id))
      .collect();
    if (race.status === "green" && nextLap > race.leaderLap) {
      let scored = fieldFor(race, entries);
      const ticks = nextLap - race.leaderLap;
      for (let i = 0; i < ticks; i += 1) {
        scored = tickGreenLap(scored, race.fieldAvgLapSeconds);
      }
      await writeScoring(ctx, race._id, scored);
    }
    await ctx.db.patch(race._id, { leaderLap: nextLap });
    return { ok: true as const, leaderLap: nextLap };
  },
});

export const saveOfficialResults = mutation({
  args: {
    results: v.array(
      v.object({
        place: v.number(),
        carNumber: v.string(),
        driver: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const admin = await ctx.runQuery(api.garageAuthz.isAdmin, {});
    if (!admin) return fail("FORBIDDEN", "Owner only.");
    const race = await ctx.db
      .query("garageRaces")
      .withIndex("by_isCurrent", (q) => q.eq("isCurrent", true))
      .first();
    if (!race) return fail("NOT_FOUND", "Create a race first.");
    if (race.status !== "checkered") {
      return fail("CONFLICT", "Paste official results after checkered.");
    }
    await ctx.db.patch(race._id, { officialResults: args.results.slice(0, 10) });
    return { ok: true as const };
  },
});
