"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import GarageSignIn from "@/components/garage-sign-in";
import TriviaDisclaimer from "@/components/trivia-disclaimer";
import type { Id } from "@/convex/_generated/dataModel";

const CATEGORIES = ["beginner", "tracks", "history", "season2026", "cup", "oreilly", "trucks"] as const;
const DIFFICULTIES = ["easy", "medium", "hard"] as const;
const PACKS = ["daily", "chase", "practice"] as const;

type Draft = {
  id?: Id<"triviaQuestions">;
  prompt: string;
  answers: [string, string, string, string];
  correctIndex: number;
  explain: string;
  pack: (typeof PACKS)[number];
  category: (typeof CATEGORIES)[number];
  difficulty: (typeof DIFFICULTIES)[number];
  activeDate: string;
};

const EMPTY: Draft = {
  prompt: "",
  answers: ["", "", "", ""],
  correctIndex: 0,
  explain: "",
  pack: "daily",
  category: "beginner",
  difficulty: "easy",
  activeDate: "",
};

function OwnerDesk() {
  const isAdmin = useQuery(api.garageAuthz.isAdmin);
  const questions = useQuery(api.trivia.listQuestions, isAdmin ? {} : "skip");
  const packs = useQuery(api.trivia.listPacks, isAdmin ? {} : "skip");
  const seed = useMutation(api.trivia.seedIfEmpty);
  const saveQuestion = useMutation(api.trivia.saveQuestion);
  const publishDaily = useMutation(api.trivia.publishDaily);
  const publishChase = useMutation(api.trivia.publishChase);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [selected, setSelected] = useState<Id<"triviaQuestions">[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) void seed({});
  }, [isAdmin, seed]);

  if (isAdmin === undefined) return <p className="font-oswald text-white/50">Checking desk…</p>;
  if (!isAdmin) return <p className="font-oswald text-nascar-red">Owner only.</p>;

  const list = questions && questions.ok ? questions.questions : [];

  function toggle(id: Id<"triviaQuestions">) {
    setSelected((current) =>
      current.includes(id) ? current.filter((row) => row !== id) : [...current, id],
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-lg bg-nascar-red px-4 py-2 font-oswald uppercase tracking-wider"
          onClick={async () => {
            const result = await publishDaily({});
            setMessage(result.ok ? `Published Daily 5 for ${result.dayKey}` : result.message);
          }}
        >
          Publish tomorrow’s Daily 5
        </button>
        <button
          type="button"
          className="rounded-lg border border-white/20 px-4 py-2 font-oswald uppercase tracking-wider"
          onClick={async () => {
            if (selected.length !== 10) {
              setMessage("Pick 10 questions for a Chase pack.");
              return;
            }
            const result = await publishChase({ questionIds: selected });
            setMessage(result.ok ? `Chase pack ${result.dayKey}` : result.message);
          }}
        >
          Publish Chase pack from picks
        </button>
      </div>
      {message && <p className="font-oswald text-strategy-yellow">{message}</p>}

      <form
        className="grid gap-3 rounded-xl border border-white/15 bg-black/30 p-5"
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await saveQuestion({
            id: draft.id,
            prompt: draft.prompt,
            answers: draft.answers,
            correctIndex: draft.correctIndex,
            explain: draft.explain,
            pack: draft.pack,
            category: draft.category,
            difficulty: draft.difficulty,
            activeDate: draft.activeDate || undefined,
          });
          setMessage(result.ok ? "Question saved." : result.message);
          if (result.ok) setDraft(EMPTY);
        }}
      >
        <h2 className="font-archivo text-2xl">Add / edit question</h2>
        <textarea
          className="rounded-md border border-white/15 bg-black/40 p-3 font-oswald"
          placeholder="Prompt"
          value={draft.prompt}
          onChange={(event) => setDraft({ ...draft, prompt: event.target.value })}
          required
        />
        {draft.answers.map((answer, index) => (
          <label key={index} className="flex items-center gap-2 font-oswald">
            <input
              type="radio"
              name="correct"
              checked={draft.correctIndex === index}
              onChange={() => setDraft({ ...draft, correctIndex: index })}
            />
            <input
              className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2"
              placeholder={`Answer ${index + 1}`}
              value={answer}
              onChange={(event) => {
                const answers = [...draft.answers] as Draft["answers"];
                answers[index] = event.target.value;
                setDraft({ ...draft, answers });
              }}
              required
            />
          </label>
        ))}
        <input
          className="rounded-md border border-white/15 bg-black/40 px-3 py-2 font-oswald"
          placeholder="One-sentence explain"
          value={draft.explain}
          onChange={(event) => setDraft({ ...draft, explain: event.target.value })}
          required
        />
        <div className="grid gap-2 sm:grid-cols-3">
          <select
            className="rounded-md border border-white/15 bg-black/40 px-3 py-2 font-oswald"
            value={draft.pack}
            onChange={(event) => setDraft({ ...draft, pack: event.target.value as Draft["pack"] })}
          >
            {PACKS.map((pack) => (
              <option key={pack} value={pack}>
                {pack}
              </option>
            ))}
          </select>
          <select
            className="rounded-md border border-white/15 bg-black/40 px-3 py-2 font-oswald"
            value={draft.category}
            onChange={(event) => setDraft({ ...draft, category: event.target.value as Draft["category"] })}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className="rounded-md border border-white/15 bg-black/40 px-3 py-2 font-oswald"
            value={draft.difficulty}
            onChange={(event) => setDraft({ ...draft, difficulty: event.target.value as Draft["difficulty"] })}
          >
            {DIFFICULTIES.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
        <input
          className="rounded-md border border-white/15 bg-black/40 px-3 py-2 font-oswald"
          placeholder="Active date YYYY-MM-DD (Daily 5, optional)"
          value={draft.activeDate}
          onChange={(event) => setDraft({ ...draft, activeDate: event.target.value })}
        />
        <button type="submit" className="rounded-lg bg-nascar-red px-4 py-2 font-oswald uppercase tracking-wider">
          Save question
        </button>
      </form>

      <section className="space-y-3">
        <h2 className="font-archivo text-2xl">Question pool</h2>
        <ul className="space-y-2">
          {list.map((question) => (
            <li key={question._id} className="rounded-lg border border-white/10 bg-black/30 p-3 font-oswald text-sm">
              <label className="flex items-start gap-2">
                <input type="checkbox" checked={selected.includes(question._id)} onChange={() => toggle(question._id)} />
                <span>
                  {question.prompt} · {question.difficulty} · {question.category}
                </span>
              </label>
              <button
                type="button"
                className="mt-2 text-strategy-cyan"
                onClick={() =>
                  setDraft({
                    id: question._id,
                    prompt: question.prompt,
                    answers: [
                      question.answers[0] ?? "",
                      question.answers[1] ?? "",
                      question.answers[2] ?? "",
                      question.answers[3] ?? "",
                    ],
                    correctIndex: question.correctIndex,
                    explain: question.explain,
                    pack: question.pack,
                    category: question.category,
                    difficulty: question.difficulty,
                    activeDate: question.activeDate ?? "",
                  })
                }
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="font-oswald text-sm text-white/60">
        {packs && packs.ok && packs.packs.map((pack) => (
          <p key={pack._id}>
            {pack.packType} · {pack.dayKey} · {pack.questionIds.length} Qs
          </p>
        ))}
      </section>
    </div>
  );
}

export default function TriviaAdmin() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const state = isLoading ? "loading" : "ready";

  return (
    <div
      className="relative min-h-screen bg-strategy-panel text-white"
      data-testid="trivia-admin"
      data-state={state}
    >
      <div className="relative mx-auto max-w-4xl px-4 py-10 space-y-6">
        <p className="font-oswald text-xs uppercase tracking-[0.25em] text-strategy-cyan">Trivia Night</p>
        <h1 className="font-archivo uppercase text-4xl">Owner desk</h1>
        {isLoading ? (
          <p className="font-oswald text-white/50">Checking desk…</p>
        ) : isAuthenticated ? (
          <OwnerDesk />
        ) : (
          <GarageSignIn />
        )}
        <TriviaDisclaimer />
      </div>
    </div>
  );
}
