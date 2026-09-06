import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";
import {
  triviaCategory,
  triviaDifficulty,
  triviaPack,
} from "./schema";
import { STARTER_QUESTIONS } from "./triviaSeed";
import { clampElapsed, scoreAttempt } from "./triviaScoring";
import { nextTriviaDayKey, triviaDayKey, weekendSaturdayKey } from "./triviaTime";

type FailCode = "UNAUTHENTICATED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "INVALID";
type PackPlay = "daily" | "chase" | "practice";

function fail(code: FailCode, message: string) {
  return { ok: false as const, code, message };
}

function shuffle<T>(items: T[]) {
  const next = items.slice();
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function publicQuestion(question: Doc<"triviaQuestions">) {
  return {
    id: question._id,
    prompt: question.prompt,
    answers: question.answers,
    category: question.category,
    difficulty: question.difficulty,
  };
}

function displayName(user: Doc<"users"> | null, car: Doc<"garageCars"> | null) {
  if (car) return `#${car.carNumber} ${car.teamName}`;
  const email = user?.email ?? "";
  const fromEmail = email.includes("@") ? email.split("@")[0] : "";
  return user?.name || fromEmail || "Member";
}

async function getPack(ctx: { db: any }, packType: "daily" | "chase", dayKey: string) {
  return await ctx.db
    .query("triviaPacks")
    .withIndex("by_type_day", (q: any) => q.eq("packType", packType).eq("dayKey", dayKey))
    .unique();
}

async function loadQuestions(ctx: { db: any }, ids: Id<"triviaQuestions">[]) {
  const rows: Doc<"triviaQuestions">[] = [];
  for (const id of ids) {
    const question = await ctx.db.get(id);
    if (question) rows.push(question);
  }
  return rows;
}

async function seenQuestionIds(ctx: { db: any }, userId: Id<"users">, since: number) {
  const attempts = await ctx.db
    .query("triviaAttempts")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .collect();
  const ids = new Set<string>();
  for (const attempt of attempts) {
    if (attempt.startedAt < since) continue;
    for (const id of attempt.questionIds) ids.add(id);
  }
  return ids;
}

async function usedPackQuestionIds(ctx: { db: any }, since: number) {
  const packs = await ctx.db.query("triviaPacks").collect();
  const ids = new Set<string>();
  for (const pack of packs) {
    if (pack.packType !== "daily") continue;
    if (pack.publishedAt < since) continue;
    for (const id of pack.questionIds) ids.add(id);
  }
  return ids;
}

function pickDailyFive(pool: Doc<"triviaQuestions">[], used: Set<string>, dayKey: string) {
  const eligible = pool.filter((question) => question.pack === "daily" || question.pack === "practice");
  const dated = eligible.filter((question) => question.activeDate === dayKey);
  const unused = eligible.filter((question) => !used.has(question._id));
  const source = dated.length >= 5 ? dated : unused.length >= 5 ? unused : eligible;

  const buckets: Record<"easy" | "medium" | "hard", Doc<"triviaQuestions">[]> = {
    easy: shuffle(source.filter((question) => question.difficulty === "easy")),
    medium: shuffle(source.filter((question) => question.difficulty === "medium")),
    hard: shuffle(source.filter((question) => question.difficulty === "hard")),
  };

  const picked: Doc<"triviaQuestions">[] = [];
  const categories = new Set<string>();
  const take = (list: Doc<"triviaQuestions">[], count: number) => {
    const ordered = list
      .filter((question) => !picked.some((row) => row._id === question._id))
      .sort((a, b) => Number(categories.has(a.category)) - Number(categories.has(b.category)));
    for (const question of ordered) {
      if (picked.length >= 5) break;
      if (count <= 0) break;
      picked.push(question);
      categories.add(question.category);
      count -= 1;
    }
  };

  take(buckets.easy, 2);
  take(buckets.medium, 2);
  take(buckets.hard, 1);
  if (picked.length < 5) take(shuffle(source), 5 - picked.length);
  return picked.slice(0, 5);
}

function swapSeen(
  packQuestions: Doc<"triviaQuestions">[],
  pool: Doc<"triviaQuestions">[],
  seen: Set<string>,
) {
  const used = new Set(packQuestions.map((question) => question._id as string));
  return packQuestions.map((question) => {
    if (!seen.has(question._id)) return question;
    const replacement = shuffle(pool).find(
      (row) =>
        !used.has(row._id) &&
        !seen.has(row._id) &&
        row.difficulty === question.difficulty,
    ) ?? shuffle(pool).find((row) => !used.has(row._id) && !seen.has(row._id));
    if (!replacement) return question;
    used.add(replacement._id);
    used.delete(question._id);
    return replacement;
  });
}

async function ensureStarterQuestions(ctx: { db: any }) {
  let inserted = 0;
  for (const question of STARTER_QUESTIONS) {
    const existing = await ctx.db
      .query("triviaQuestions")
      .withIndex("by_seedKey", (q: any) => q.eq("seedKey", question.seedKey))
      .unique();
    if (existing) continue;
    await ctx.db.insert("triviaQuestions", {
      ...question,
      createdAt: Date.now(),
    });
    inserted += 1;
  }
  return inserted;
}

export const seedIfEmpty = mutation({
  args: {},
  handler: async (ctx) => {
    const inserted = await ensureStarterQuestions(ctx);
    const dayKey = triviaDayKey();
    const existing = await getPack(ctx, "daily", dayKey);
    if (existing) {
      return { ok: true as const, seededQuestions: inserted, packId: existing._id, published: false };
    }
    const pool = await ctx.db.query("triviaQuestions").collect();
    const used = await usedPackQuestionIds(ctx, Date.now() - 30 * 86_400_000);
    const picked = pickDailyFive(pool, used, dayKey);
    if (picked.length < 5) {
      return fail("INVALID", "Need 5 live questions before today’s Daily 5 can post.");
    }
    const packId = await ctx.db.insert("triviaPacks", {
      packType: "daily",
      dayKey,
      questionIds: picked.map((question) => question._id),
      publishedAt: Date.now(),
    });
    console.log("[trivia-night] published Daily 5", dayKey);
    return { ok: true as const, seededQuestions: inserted, packId, published: true };
  },
});

export const getLanding = query({
  args: {},
  handler: async (ctx) => {
    const dayKey = triviaDayKey();
    const chaseDay = weekendSaturdayKey(dayKey);
    const daily = await getPack(ctx, "daily", dayKey);
    const chase = chaseDay ? await getPack(ctx, "chase", chaseDay) : null;
    const userId = await getAuthUserId(ctx);
    let alreadyPlayed = false;
    let chasePlayed = false;
    if (userId) {
      const dailyAttempt = await ctx.db
        .query("triviaAttempts")
        .withIndex("by_user_pack_day", (q) =>
          q.eq("userId", userId).eq("packType", "daily").eq("dayKey", dayKey),
        )
        .unique();
      alreadyPlayed = dailyAttempt?.status === "done";
      if (chaseDay) {
        const chaseAttempt = await ctx.db
          .query("triviaAttempts")
          .withIndex("by_user_pack_day", (q) =>
            q.eq("userId", userId).eq("packType", "chase").eq("dayKey", chaseDay),
          )
          .unique();
        chasePlayed = chaseAttempt?.status === "done";
      }
    }
    return {
      dayKey,
      dailyReady: Boolean(daily),
      chaseReady: Boolean(chase),
      chaseDay,
      alreadyPlayed,
      chasePlayed,
      emptyCopy: "Tomorrow's Daily 5 posts at 6 a.m. MT.",
    };
  },
});

export const getDailyPlay = query({
  args: {},
  handler: async (ctx) => {
    const dayKey = triviaDayKey();
    const pack = await getPack(ctx, "daily", dayKey);
    if (!pack) return { ok: false as const, dayKey, questions: [] as ReturnType<typeof publicQuestion>[] };
    const questions = await loadQuestions(ctx, pack.questionIds);
    return { ok: true as const, dayKey, questions: questions.map(publicQuestion) };
  },
});

export const getChasePlay = query({
  args: {},
  handler: async (ctx) => {
    const dayKey = weekendSaturdayKey(triviaDayKey()) ?? triviaDayKey();
    const pack = await getPack(ctx, "chase", dayKey);
    if (!pack) return { ok: false as const, dayKey, questions: [] as ReturnType<typeof publicQuestion>[] };
    const questions = await loadQuestions(ctx, pack.questionIds);
    return { ok: true as const, dayKey, questions: questions.map(publicQuestion) };
  },
});

export const getPracticePlay = query({
  args: {},
  handler: async (ctx) => {
    const dayKey = triviaDayKey();
    const pool = await ctx.db.query("triviaQuestions").collect();
    if (pool.length === 0) return { ok: false as const, dayKey, questions: [] as ReturnType<typeof publicQuestion>[] };
    const offset = Number(dayKey.replace(/-/g, "")) % pool.length;
    const rotated = [...pool.slice(offset), ...pool.slice(0, offset)];
    return { ok: true as const, dayKey, questions: rotated.slice(0, 5).map(publicQuestion) };
  },
});

export const gradeQuestion = mutation({
  args: {
    questionId: v.id("triviaQuestions"),
    choice: v.number(),
  },
  handler: async (ctx, args) => {
    const question = await ctx.db.get(args.questionId);
    if (!question) return fail("NOT_FOUND", "Question is gone.");
    const correct = args.choice === question.correctIndex;
    return {
      ok: true as const,
      correct,
      correctIndex: question.correctIndex,
      explain: question.explain,
    };
  },
});

export const startPlay = mutation({
  args: { packType: triviaPack },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return fail("UNAUTHENTICATED", "Log in to save a Trivia Night score.");
    const packType = args.packType as PackPlay;
    const dayKey =
      packType === "chase" ? weekendSaturdayKey(triviaDayKey()) ?? triviaDayKey() : triviaDayKey();
    const attemptKey = packType === "practice" ? `practice-${Date.now()}` : dayKey;

    if (packType !== "practice") {
      const existing = await ctx.db
        .query("triviaAttempts")
        .withIndex("by_user_pack_day", (q) =>
          q.eq("userId", userId).eq("packType", packType).eq("dayKey", dayKey),
        )
        .unique();
      if (existing?.status === "done") {
        return fail("CONFLICT", "Already played this pack.");
      }
      if (existing?.status === "open") {
        const questions = await loadQuestions(ctx, existing.questionIds);
        return {
          ok: true as const,
          attemptId: existing._id,
          dayKey,
          index: existing.answers.length,
          questions: questions.map(publicQuestion),
          resumed: true,
        };
      }
    }

    const pool = await ctx.db.query("triviaQuestions").collect();
    const seen = await seenQuestionIds(ctx, userId, Date.now() - 30 * 86_400_000);
    let selected: Doc<"triviaQuestions">[] = [];

    if (packType === "daily") {
      const pack = await getPack(ctx, "daily", dayKey);
      if (!pack) return fail("NOT_FOUND", "Tomorrow's Daily 5 posts at 6 a.m. MT.");
      const packQuestions = await loadQuestions(ctx, pack.questionIds);
      selected = swapSeen(packQuestions, pool, seen);
    } else if (packType === "chase") {
      const pack = await getPack(ctx, "chase", dayKey);
      if (!pack) return fail("NOT_FOUND", "No Chase pack this weekend.");
      selected = await loadQuestions(ctx, pack.questionIds);
    } else {
      const unused = pool.filter((question) => !seen.has(question._id));
      selected = shuffle(unused.length >= 5 ? unused : pool).slice(0, 5);
    }

    const needed = packType === "chase" ? 10 : 5;
    if (selected.length < needed) {
      return fail("INVALID", "Not enough questions in this pack yet.");
    }

    const attemptId = await ctx.db.insert("triviaAttempts", {
      userId,
      packType,
      dayKey: packType === "practice" ? attemptKey : dayKey,
      questionIds: selected.map((question) => question._id),
      answers: [],
      status: "open",
      correctCount: 0,
      points: 0,
      timeBonus: 0,
      secondsUsed: 0,
      startedAt: Date.now(),
    });
    console.log("[trivia-night] start", packType, userId);
    return {
      ok: true as const,
      attemptId,
      dayKey,
      index: 0,
      questions: selected.map(publicQuestion),
      resumed: false,
    };
  },
});

export const answerPlay = mutation({
  args: {
    attemptId: v.id("triviaAttempts"),
    questionId: v.id("triviaQuestions"),
    choice: v.number(),
    elapsedMs: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return fail("UNAUTHENTICATED", "Log in to keep scoring.");
    const attempt = await ctx.db.get(args.attemptId);
    if (!attempt || attempt.userId !== userId) return fail("NOT_FOUND", "No open quiz.");
    if (attempt.status !== "open") return fail("CONFLICT", "Quiz already in the books.");
    const expected = attempt.questionIds[attempt.answers.length];
    if (expected !== args.questionId) return fail("INVALID", "Wrong question order.");
    if (attempt.answers.some((row) => row.questionId === args.questionId)) {
      return fail("CONFLICT", "Already locked this one.");
    }
    const question = await ctx.db.get(args.questionId);
    if (!question) return fail("NOT_FOUND", "Question is gone.");
    const elapsedMs = clampElapsed(args.elapsedMs);
    const correct = args.choice === question.correctIndex;
    const answers = [
      ...attempt.answers,
      { questionId: args.questionId, choice: args.choice, elapsedMs, correct },
    ];
    const done = answers.length >= attempt.questionIds.length;
    const scored = scoreAttempt(attempt.packType, answers);
    await ctx.db.patch(attempt._id, {
      answers,
      ...scored,
      status: done ? "done" : "open",
      completedAt: done ? Date.now() : undefined,
    });
    if (done) console.log("[trivia-night] finish", attempt.packType, scored.points);
    return {
      ok: true as const,
      correct,
      correctIndex: question.correctIndex,
      explain: question.explain,
      done,
      correctCount: scored.correctCount,
      points: scored.points,
      timeBonus: scored.timeBonus,
      secondsUsed: scored.secondsUsed,
      total: attempt.questionIds.length,
    };
  },
});

export const getMySeason = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const attempts = await ctx.db
      .query("triviaAttempts")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    const counted = attempts.filter(
      (attempt) => attempt.status === "done" && attempt.packType !== "practice",
    );
    return {
      points: counted.reduce((sum, attempt) => sum + attempt.points, 0),
      secondsUsed: counted.reduce((sum, attempt) => sum + attempt.secondsUsed, 0),
    };
  },
});

export const getBoard = query({
  args: {},
  handler: async (ctx) => {
    const dayKey = triviaDayKey();
    const attempts = await ctx.db.query("triviaAttempts").collect();
    const done = attempts.filter((attempt) => attempt.status === "done" && attempt.packType !== "practice");

    const seasonMap = new Map<
      string,
      { userId: Id<"users">; points: number; secondsUsed: number }
    >();
    for (const attempt of done) {
      const current = seasonMap.get(attempt.userId) ?? {
        userId: attempt.userId,
        points: 0,
        secondsUsed: 0,
      };
      current.points += attempt.points;
      current.secondsUsed += attempt.secondsUsed;
      seasonMap.set(attempt.userId, current);
    }

    const today = done.filter((attempt) => attempt.packType === "daily" && attempt.dayKey === dayKey);

    const decorate = async (
      rows: { userId: Id<"users">; points: number; secondsUsed: number; correctCount?: number }[],
    ) => {
      const ranked = rows
        .slice()
        .sort((a, b) => b.points - a.points || a.secondsUsed - b.secondsUsed)
        .slice(0, 20);
      const out: {
        name: string;
        points: number;
        secondsUsed: number;
        correctCount?: number;
      }[] = [];
      for (const row of ranked) {
        const user = await ctx.db.get(row.userId);
        const car = await ctx.db
          .query("garageCars")
          .withIndex("by_userId", (q) => q.eq("userId", row.userId))
          .unique();
        out.push({
          name: displayName(user, car),
          points: row.points,
          secondsUsed: Math.round(row.secondsUsed * 10) / 10,
          correctCount: row.correctCount,
        });
      }
      return out;
    };

    return {
      dayKey,
      today: await decorate(
        today.map((attempt) => ({
          userId: attempt.userId,
          points: attempt.points,
          secondsUsed: attempt.secondsUsed,
          correctCount: attempt.correctCount,
        })),
      ),
      season: await decorate(Array.from(seasonMap.values())),
    };
  },
});

export const listQuestions = query({
  args: {},
  handler: async (ctx) => {
    const isUserAdmin: boolean = await ctx.runQuery(api.garageAuthz.isAdmin, {});
    if (!isUserAdmin) return { ok: false as const, code: "FORBIDDEN" as const, message: "Owner only.", questions: [] };
    const questions = await ctx.db.query("triviaQuestions").collect();
    return { ok: true as const, questions };
  },
});

export const listPacks = query({
  args: {},
  handler: async (ctx) => {
    const isUserAdmin: boolean = await ctx.runQuery(api.garageAuthz.isAdmin, {});
    if (!isUserAdmin) return { ok: false as const, code: "FORBIDDEN" as const, message: "Owner only.", packs: [] };
    const packs = await ctx.db.query("triviaPacks").collect();
    return { ok: true as const, packs: packs.sort((a, b) => b.publishedAt - a.publishedAt) };
  },
});

export const saveQuestion = mutation({
  args: {
    id: v.optional(v.id("triviaQuestions")),
    prompt: v.string(),
    answers: v.array(v.string()),
    correctIndex: v.number(),
    explain: v.string(),
    pack: triviaPack,
    category: triviaCategory,
    difficulty: triviaDifficulty,
    activeDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const isUserAdmin: boolean = await ctx.runQuery(api.garageAuthz.isAdmin, {});
    if (!isUserAdmin) return fail("FORBIDDEN", "Owner only.");
    if (args.prompt.trim().length < 8) return fail("INVALID", "Prompt is too short.");
    if (args.answers.length !== 4 || args.answers.some((answer) => !answer.trim())) {
      return fail("INVALID", "Need four answers.");
    }
    if (args.correctIndex < 0 || args.correctIndex > 3) return fail("INVALID", "Correct index must be 0-3.");
    const payload = {
      prompt: args.prompt.trim(),
      answers: args.answers.map((answer) => answer.trim()),
      correctIndex: args.correctIndex,
      explain: args.explain.trim(),
      pack: args.pack,
      category: args.category,
      difficulty: args.difficulty,
      activeDate: args.activeDate?.trim() || undefined,
    };
    if (args.id) {
      await ctx.db.patch(args.id, payload);
      return { ok: true as const, questionId: args.id };
    }
    const questionId = await ctx.db.insert("triviaQuestions", {
      ...payload,
      createdAt: Date.now(),
    });
    console.log("[trivia-night] saved question", questionId);
    return { ok: true as const, questionId };
  },
});

export const publishDaily = mutation({
  args: {
    dayKey: v.optional(v.string()),
    questionIds: v.optional(v.array(v.id("triviaQuestions"))),
  },
  handler: async (ctx, args) => {
    const isUserAdmin: boolean = await ctx.runQuery(api.garageAuthz.isAdmin, {});
    if (!isUserAdmin) return fail("FORBIDDEN", "Owner only.");
    const dayKey = args.dayKey?.trim() || nextTriviaDayKey();
    let ids = args.questionIds ?? [];
    if (ids.length === 0) {
      const pool = await ctx.db.query("triviaQuestions").collect();
      const used = await usedPackQuestionIds(ctx, Date.now() - 30 * 86_400_000);
      const picked = pickDailyFive(pool, used, dayKey);
      ids = picked.map((question) => question._id);
    }
    if (ids.length !== 5) return fail("INVALID", "Daily 5 needs exactly 5 questions.");
    const existing = await getPack(ctx, "daily", dayKey);
    if (existing) {
      await ctx.db.patch(existing._id, { questionIds: ids, publishedAt: Date.now() });
      console.log("[trivia-night] updated Daily 5", dayKey);
      return { ok: true as const, packId: existing._id, dayKey };
    }
    const packId = await ctx.db.insert("triviaPacks", {
      packType: "daily",
      dayKey,
      questionIds: ids,
      publishedAt: Date.now(),
    });
    console.log("[trivia-night] published Daily 5", dayKey);
    return { ok: true as const, packId, dayKey };
  },
});

export const publishChase = mutation({
  args: {
    dayKey: v.optional(v.string()),
    questionIds: v.array(v.id("triviaQuestions")),
    weekendLabel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const isUserAdmin: boolean = await ctx.runQuery(api.garageAuthz.isAdmin, {});
    if (!isUserAdmin) return fail("FORBIDDEN", "Owner only.");
    if (args.questionIds.length !== 10) return fail("INVALID", "Chase pack needs 10 questions.");
    const dayKey = args.dayKey?.trim() || weekendSaturdayKey(triviaDayKey()) || triviaDayKey();
    const existing = await getPack(ctx, "chase", dayKey);
    if (existing) {
      await ctx.db.patch(existing._id, {
        questionIds: args.questionIds,
        publishedAt: Date.now(),
        weekendLabel: args.weekendLabel,
      });
      return { ok: true as const, packId: existing._id, dayKey };
    }
    const packId = await ctx.db.insert("triviaPacks", {
      packType: "chase",
      dayKey,
      questionIds: args.questionIds,
      publishedAt: Date.now(),
      weekendLabel: args.weekendLabel,
    });
    console.log("[trivia-night] published Chase pack", dayKey);
    return { ok: true as const, packId, dayKey };
  },
});
