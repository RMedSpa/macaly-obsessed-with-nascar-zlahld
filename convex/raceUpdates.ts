import { v } from "convex/values";
import {
  query,
  internalMutation,
  internalQuery,
  mutation,
} from "./_generated/server";
import {
  cupRaceDebriefValidator,
  runStatusValidator,
} from "./cupDebriefValidators";
import { SEED_RICHMOND_DEBRIEF } from "./seedDebrief";

/** Public: latest Cup debrief for the homepage Live shell. */
export const getLatestCupDebrief = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("cupRaceDebriefs"),
      raceId: v.optional(v.number()),
      raceName: v.string(),
      dateIso: v.string(),
      track: v.string(),
      debrief: cupRaceDebriefValidator,
      sources: v.array(v.string()),
      generatedAt: v.number(),
      provenance: v.string(),
    }),
  ),
  handler: async (ctx) => {
    const latest = await ctx.db
      .query("cupRaceDebriefs")
      .withIndex("by_dateIso")
      .order("desc")
      .take(1);
    if (latest.length === 0) return null;
    const doc = latest[0];
    return {
      _id: doc._id,
      raceId: doc.raceId,
      raceName: doc.raceName,
      dateIso: doc.dateIso,
      track: doc.track,
      debrief: doc.debrief,
      sources: doc.sources,
      generatedAt: doc.generatedAt,
      provenance: doc.provenance,
    };
  },
});

/** Public: most recent autopilot run (status strip). */
export const getLatestRun = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      status: runStatusValidator,
      message: v.string(),
      raceName: v.optional(v.string()),
      finishedAt: v.number(),
      forced: v.boolean(),
    }),
  ),
  handler: async (ctx) => {
    const runs = await ctx.db
      .query("raceUpdateRuns")
      .withIndex("by_finishedAt")
      .order("desc")
      .take(1);
    if (runs.length === 0) return null;
    const r = runs[0];
    return {
      status: r.status,
      message: r.message,
      raceName: r.raceName,
      finishedAt: r.finishedAt,
      forced: r.forced,
    };
  },
});

export const getLatestInternal = internalQuery({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("cupRaceDebriefs"),
      raceId: v.optional(v.number()),
      raceName: v.string(),
      dateIso: v.string(),
      generatedAt: v.number(),
    }),
  ),
  handler: async (ctx) => {
    const latest = await ctx.db
      .query("cupRaceDebriefs")
      .withIndex("by_dateIso")
      .order("desc")
      .take(1);
    if (latest.length === 0) return null;
    const doc = latest[0];
    return {
      _id: doc._id,
      raceId: doc.raceId,
      raceName: doc.raceName,
      dateIso: doc.dateIso,
      generatedAt: doc.generatedAt,
    };
  },
});

export const publishDebrief = internalMutation({
  args: {
    raceId: v.optional(v.number()),
    raceName: v.string(),
    dateIso: v.string(),
    track: v.string(),
    debrief: cupRaceDebriefValidator,
    sources: v.array(v.string()),
    provenance: v.string(),
    /** When true, replace if same raceId already exists (manual force rewrite). */
    forceReplace: v.boolean(),
  },
  returns: v.object({
    wrote: v.boolean(),
    reason: v.string(),
    id: v.optional(v.id("cupRaceDebriefs")),
  }),
  handler: async (ctx, args) => {
    const now = Date.now();

    if (args.raceId != null) {
      const existingById = await ctx.db
        .query("cupRaceDebriefs")
        .withIndex("by_raceId", (q) => q.eq("raceId", args.raceId))
        .take(1);
      if (existingById.length > 0) {
        if (!args.forceReplace) {
          return {
            wrote: false,
            reason: `Race id ${args.raceId} already published`,
            id: existingById[0]._id,
          };
        }
        await ctx.db.patch(existingById[0]._id, {
          raceName: args.raceName,
          dateIso: args.dateIso,
          track: args.track,
          debrief: args.debrief,
          sources: args.sources,
          generatedAt: now,
          provenance: args.provenance,
        });
        console.log("Replaced cup debrief for raceId", args.raceId);
        return { wrote: true, reason: "replaced", id: existingById[0]._id };
      }
    }

    const latest = await ctx.db
      .query("cupRaceDebriefs")
      .withIndex("by_dateIso")
      .order("desc")
      .take(1);

    if (
      latest.length > 0 &&
      latest[0].dateIso === args.dateIso &&
      latest[0].raceName === args.raceName &&
      !args.forceReplace
    ) {
      return {
        wrote: false,
        reason: "Same race name + date already latest",
        id: latest[0]._id,
      };
    }

    if (
      latest.length > 0 &&
      args.dateIso < latest[0].dateIso &&
      !args.forceReplace
    ) {
      return {
        wrote: false,
        reason: `Older than published debrief (${latest[0].dateIso})`,
      };
    }

    const id = await ctx.db.insert("cupRaceDebriefs", {
      raceId: args.raceId,
      raceName: args.raceName,
      dateIso: args.dateIso,
      track: args.track,
      debrief: args.debrief,
      sources: args.sources,
      generatedAt: now,
      provenance: args.provenance,
    });
    console.log("Published cup debrief", args.raceName, args.dateIso, id);
    return { wrote: true, reason: "inserted", id };
  },
});

export const logRun = internalMutation({
  args: {
    status: runStatusValidator,
    message: v.string(),
    raceName: v.optional(v.string()),
    raceId: v.optional(v.number()),
    dateIso: v.optional(v.string()),
    sources: v.optional(v.array(v.string())),
    forced: v.boolean(),
  },
  returns: v.id("raceUpdateRuns"),
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("raceUpdateRuns", {
      status: args.status,
      message: args.message,
      raceName: args.raceName,
      raceId: args.raceId,
      dateIso: args.dateIso,
      sources: args.sources,
      forced: args.forced,
      finishedAt: Date.now(),
    });
    console.log("raceUpdateRun", args.status, args.message);
    return id;
  },
});

/** Seed Richmond editorial debrief once so Live never starts empty. */
export const seedIfEmpty = internalMutation({
  args: {},
  returns: v.object({ seeded: v.boolean() }),
  handler: async (ctx) => {
    const existing = await ctx.db.query("cupRaceDebriefs").take(1);
    if (existing.length > 0) {
      console.log("seedIfEmpty: already have debrief(s), skip");
      return { seeded: false };
    }
    const d = SEED_RICHMOND_DEBRIEF;
    await ctx.db.insert("cupRaceDebriefs", {
      raceId: 5622,
      raceName: d.raceName,
      dateIso: d.dateIso,
      track: d.track,
      debrief: d,
      sources: [
        "editorial seed (Cook Out 400 Richmond — post-race desk)",
        "https://cf.nascar.com/live/feeds/live-feed.json",
      ],
      generatedAt: Date.now(),
      provenance: "seed · Richmond Cook Out 400 editorial",
    });
    console.log("seedIfEmpty: seeded Richmond Cook Out 400");
    return { seeded: true };
  },
});

/** Public one-shot seed helper (safe to call repeatedly). */
export const ensureSeed = mutation({
  args: {},
  returns: v.object({ seeded: v.boolean() }),
  handler: async (ctx) => {
    const existing = await ctx.db.query("cupRaceDebriefs").take(1);
    if (existing.length > 0) return { seeded: false };
    const d = SEED_RICHMOND_DEBRIEF;
    await ctx.db.insert("cupRaceDebriefs", {
      raceId: 5622,
      raceName: d.raceName,
      dateIso: d.dateIso,
      track: d.track,
      debrief: d,
      sources: [
        "editorial seed (Cook Out 400 Richmond — post-race desk)",
        "https://cf.nascar.com/live/feeds/live-feed.json",
      ],
      generatedAt: Date.now(),
      provenance: "seed · Richmond Cook Out 400 editorial",
    });
    return { seeded: true };
  },
});
