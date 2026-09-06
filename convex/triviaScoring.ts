export const DAILY_CORRECT = 10;
export const DAILY_FAST_BONUS = 2;
export const DAILY_FAST_MS = 8_000;
export const CHASE_CORRECT = 15;
export const QUESTION_MS = 20_000;

export type ScoredAnswer = {
  correct: boolean;
  elapsedMs: number;
};

export function clampElapsed(ms: number) {
  if (!Number.isFinite(ms) || ms < 0) return QUESTION_MS;
  return Math.min(QUESTION_MS, Math.round(ms));
}

export function scoreAttempt(packType: "daily" | "chase" | "practice", answers: ScoredAnswer[]) {
  let points = 0;
  let timeBonus = 0;
  let secondsUsed = 0;
  let correctCount = 0;

  for (const answer of answers) {
    const elapsedMs = clampElapsed(answer.elapsedMs);
    secondsUsed += elapsedMs / 1000;
    if (!answer.correct) continue;
    correctCount += 1;
    if (packType === "daily") {
      points += DAILY_CORRECT;
      if (elapsedMs < DAILY_FAST_MS) {
        points += DAILY_FAST_BONUS;
        timeBonus += DAILY_FAST_BONUS;
      }
    } else if (packType === "chase") {
      points += CHASE_CORRECT;
    }
  }

  return {
    points,
    timeBonus,
    secondsUsed: Math.round(secondsUsed * 10) / 10,
    correctCount,
  };
}
