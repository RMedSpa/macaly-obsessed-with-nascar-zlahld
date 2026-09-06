"use client";

import Link from "next/link";
import { Unauthenticated, useConvexAuth, useMutation, useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import GarageSignIn from "@/components/garage-sign-in";
import TriviaDisclaimer from "@/components/trivia-disclaimer";
import type { Id } from "@/convex/_generated/dataModel";

type PackType = "daily" | "chase" | "practice";
type PublicQuestion = {
  id: Id<"triviaQuestions">;
  prompt: string;
  answers: string[];
};
type Locked = { choice: number; correct: boolean; correctIndex: number; explain: string };
type GuestDailyScore = {
  correctCount: number;
  points: number;
  timeBonus: number;
  total: number;
};

const LETTERS = ["A", "B", "C", "D"];
const GUEST_PREFIX = "trivia-night-daily-";

function guestKey(dayKey: string) {
  return `${GUEST_PREFIX}${dayKey}`;
}

function asPack(value: string | null): PackType {
  if (value === "chase" || value === "practice") return value;
  return "daily";
}

export default function TriviaPlay() {
  const params = useSearchParams();
  const packType = asPack(params.get("pack"));
  const { isAuthenticated } = useConvexAuth();
  const landing = useQuery(api.trivia.getLanding);
  const dailyPlay = useQuery(api.trivia.getDailyPlay, packType === "daily" && !isAuthenticated ? {} : "skip");
  const chasePlay = useQuery(api.trivia.getChasePlay, packType === "chase" && !isAuthenticated ? {} : "skip");
  const practicePlay = useQuery(api.trivia.getPracticePlay, packType === "practice" && !isAuthenticated ? {} : "skip");
  const guestPlay = packType === "chase" ? chasePlay : packType === "practice" ? practicePlay : dailyPlay;
  const season = useQuery(api.trivia.getMySeason, isAuthenticated ? {} : "skip");
  const seedIfEmpty = useMutation(api.trivia.seedIfEmpty);
  const startPlay = useMutation(api.trivia.startPlay);
  const answerPlay = useMutation(api.trivia.answerPlay);
  const gradeQuestion = useMutation(api.trivia.gradeQuestion);

  const [questions, setQuestions] = useState<PublicQuestion[]>([]);
  const [attemptId, setAttemptId] = useState<Id<"triviaAttempts"> | null>(null);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState<Locked | null>(null);
  const [remainingMs, setRemainingMs] = useState(20_000);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [timeBonus, setTimeBonus] = useState(0);
  const [guestPlayed, setGuestPlayed] = useState(false);
  const started = useRef(false);
  const tickStarted = useRef(0);
  const lockAnswerRef = useRef<(choice: number) => Promise<void>>(async () => {});

  const question = questions[index];
  const total = questions.length || (packType === "chase" ? 10 : 5);
  const shareLine = `I went ${correctCount}/${total || 5} on nascarlove.org Trivia Night.`;

  useEffect(() => {
    if (landing && !landing.dailyReady) void seedIfEmpty({});
  }, [landing, seedIfEmpty]);

  useEffect(() => {
    if (!landing?.dayKey || packType !== "daily") return;
    const raw = window.localStorage.getItem(guestKey(landing.dayKey));
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as GuestDailyScore;
      setGuestPlayed(true);
      if (!isAuthenticated) {
        setDone(true);
        setCorrectCount(parsed.correctCount);
        setPoints(parsed.points);
        setTimeBonus(parsed.timeBonus);
      }
    } catch {
      setGuestPlayed(true);
    }
  }, [landing?.dayKey, packType, isAuthenticated]);

  useEffect(() => {
    if (started.current) return;
    if (isAuthenticated) {
      started.current = true;
      void (async () => {
        const result = await startPlay({ packType });
        if (!result.ok) {
          setError(result.message);
          if (result.code === "CONFLICT") setDone(true);
          return;
        }
        setAttemptId(result.attemptId);
        setQuestions(result.questions);
        setIndex(result.index);
        tickStarted.current = Date.now();
        setRemainingMs(20_000);
      })();
      return;
    }
    if (!isAuthenticated && guestPlay?.ok && !guestPlayed) {
      started.current = true;
      setQuestions(guestPlay.questions);
      tickStarted.current = Date.now();
    }
  }, [isAuthenticated, packType, startPlay, guestPlay, guestPlayed]);

  useEffect(() => {
    if (done || locked || !question) return;
    const interval = window.setInterval(() => {
      const left = Math.max(0, 20_000 - (Date.now() - tickStarted.current));
      setRemainingMs(left);
      if (left <= 0) {
        window.clearInterval(interval);
        void lockAnswerRef.current(-1);
      }
    }, 80);
    return () => window.clearInterval(interval);
  }, [done, locked, question, index]);

  async function lockAnswer(choice: number) {
    if (busy || locked || !question) return;
    setBusy(true);
    const elapsedMs = Math.min(20_000, Date.now() - tickStarted.current);
    try {
      if (attemptId) {
        const result = await answerPlay({
          attemptId,
          questionId: question.id,
          choice,
          elapsedMs,
        });
        if (!result.ok) {
          setError(result.message);
          return;
        }
        setLocked({
          choice,
          correct: result.correct,
          correctIndex: result.correctIndex,
          explain: result.explain,
        });
        setCorrectCount(result.correctCount);
        setPoints(result.points);
        setTimeBonus(result.timeBonus);
        if (result.done) {
          setDone(true);
        }
      } else {
        const result = await gradeQuestion({ questionId: question.id, choice });
        if (!result.ok) {
          setError(result.message);
          return;
        }
        const nextCorrect = correctCount + (result.correct ? 1 : 0);
        const nextBonus = timeBonus + (result.correct && elapsedMs < 8_000 && packType === "daily" ? 2 : 0);
        const nextPoints =
          points +
          (result.correct
            ? packType === "chase"
              ? 15
              : packType === "daily"
                ? 10 + (elapsedMs < 8_000 ? 2 : 0)
                : 0
            : 0);
        setLocked({
          choice,
          correct: result.correct,
          correctIndex: result.correctIndex,
          explain: result.explain,
        });
        setCorrectCount(nextCorrect);
        setPoints(nextPoints);
        setTimeBonus(nextBonus);
      }
    } finally {
      setBusy(false);
    }
  }

  lockAnswerRef.current = lockAnswer;

  function nextQuestion() {
    if (!locked) return;
    const last = index + 1 >= questions.length;
    if (last) {
      setDone(true);
      if (!isAuthenticated && packType === "daily" && landing?.dayKey) {
        window.localStorage.setItem(
          guestKey(landing.dayKey),
          JSON.stringify({ correctCount, points, timeBonus, total: questions.length }),
        );
      }
      return;
    }
    setIndex((value) => value + 1);
    setLocked(null);
    tickStarted.current = Date.now();
    setRemainingMs(20_000);
  }

  async function share() {
    const text = shareLine;
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // fall through to clipboard
      }
    }
    await navigator.clipboard.writeText(text);
  }

  const ready = Boolean(question) || done || Boolean(error);
  const barWidth = `${Math.max(0, remainingMs / 200)}%`;

  const endCard = (
    <div className="rounded-2xl border border-white/15 bg-black/40 p-6 sm:p-8 space-y-4">
      <p className="font-oswald text-xs uppercase tracking-[0.25em] text-strategy-cyan">Checkered</p>
      <p className="font-archivo text-6xl sm:text-8xl leading-none">{correctCount}/{total || 5}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-oswald">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/45">Time bonus</p>
          <p className="text-2xl text-strategy-yellow">+{timeBonus}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-white/45">Points today</p>
          <p className="text-2xl">{points}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-white/45">Season</p>
          <p className="text-2xl">{isAuthenticated ? (season?.points ?? points) : "—"}</p>
        </div>
      </div>
      <p className="font-oswald text-white/70">{shareLine}</p>
      <div className="flex flex-wrap gap-3">
        <button type="button" data-testid="trivia-share" onClick={() => void share()} className="rounded-lg bg-nascar-red px-5 py-3 font-oswald uppercase tracking-wider">
          Share the line
        </button>
        <Link href="/trivia/board" className="rounded-lg border border-white/20 px-5 py-3 font-oswald uppercase tracking-wider">
          Chase board
        </Link>
      </div>
      <Unauthenticated>
        <div className="rounded-xl border border-strategy-yellow/40 bg-black/30 p-4 space-y-4">
          <p className="font-archivo text-xl">Save this score — log in.</p>
          <GarageSignIn />
        </div>
      </Unauthenticated>
    </div>
  );

  return (
    <div
      className="relative min-h-screen bg-strategy-panel text-white"
      data-testid="trivia-play"
      data-state={ready ? "ready" : "loading"}
    >
      <div className="pointer-events-none absolute inset-0 speed-lines-bg opacity-20" />
      <div className="relative mx-auto max-w-3xl px-4 py-10 space-y-6">
        <p className="font-oswald text-xs uppercase tracking-[0.25em] text-strategy-cyan">Trivia Night · {packType}</p>
        <h1 className="font-archivo uppercase leading-none" style={{ fontSize: "clamp(28px, 6vw, 48px)" }}>
          {packType === "chase" ? "Trivia Night Chase Pack" : packType === "practice" ? "Trivia Night Practice Pack" : "Trivia Night Daily 5"}
        </h1>
        {error && <p className="font-oswald text-nascar-red">{error}</p>}
        {!question && !done && !error && <p className="font-oswald text-white/50">Rolling the next green…</p>}
        {packType === "practice" && !isAuthenticated && !question && (
          <Unauthenticated>
            <p className="font-oswald text-white/70">Practice for guests uses the Daily 5 set. Play Daily 5, or log in for a scrambled pack.</p>
          </Unauthenticated>
        )}

        {done || error === "Already played this pack." ? (
          endCard
        ) : question ? (
          <>
            <div className="flex items-end justify-between gap-4">
              <p className="font-archivo text-5xl leading-none">
                {index + 1}/{questions.length}
              </p>
              <p className="font-oswald text-strategy-yellow text-xl">{Math.ceil(remainingMs / 1000)}s</p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-strategy-yellow" style={{ width: barWidth }} />
            </div>
            <h2 className="font-archivo text-3xl sm:text-5xl leading-tight">{question.prompt}</h2>
            <div className="grid gap-3">
              {question.answers.map((answer, answerIndex) => {
                const isPick = locked?.choice === answerIndex;
                const isRight = locked && answerIndex === locked.correctIndex;
                const isWrongPick = locked && isPick && !locked.correct;
                return (
                  <button
                    key={answer}
                    type="button"
                    data-testid={`trivia-option-${answerIndex}`}
                    disabled={Boolean(locked) || busy}
                    onClick={() => void lockAnswer(answerIndex)}
                    className={`flex items-center gap-4 rounded-xl border px-4 py-4 text-left font-oswald text-xl transition-colors ${
                      isRight
                        ? "border-strategy-cyan bg-strategy-cyan/20"
                        : isWrongPick
                          ? "border-nascar-red bg-nascar-red/20"
                          : "border-white/15 bg-black/30 hover:border-strategy-yellow"
                    }`}
                  >
                    <span className="font-archivo text-strategy-yellow w-8">{LETTERS[answerIndex]}</span>
                    <span>{answer}</span>
                  </button>
                );
              })}
            </div>
            {locked && (
              <div className="rounded-xl border border-white/15 bg-black/40 p-4 space-y-3">
                <p className="font-archivo text-2xl">{locked.correct ? "Hit." : "Miss."}</p>
                <p className="font-oswald text-white/75">{locked.explain}</p>
                <button
                  type="button"
                  data-testid="trivia-next"
                  onClick={nextQuestion}
                  className="rounded-lg bg-nascar-red px-5 py-3 font-oswald uppercase tracking-wider"
                >
                  {index + 1 >= questions.length ? "Checkered" : "Next"}
                </button>
              </div>
            )}
          </>
        ) : null}

        {!isAuthenticated && packType === "practice" && !questions.length && dailyPlay?.ok && (
          <p className="font-oswald text-white/50">Open Daily 5 to run the booth without an account.</p>
        )}

        <TriviaDisclaimer />
      </div>
    </div>
  );
}
