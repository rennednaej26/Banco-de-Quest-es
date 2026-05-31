import type { ReviewState } from "@/types/study";

const DAY_MS = 24 * 60 * 60 * 1000;

export function gradeAnswer(isCorrect: boolean, elapsedSeconds: number, avgTimeSeconds: number) {
  if (!isCorrect) return 2;
  if (elapsedSeconds <= avgTimeSeconds * 0.75) return 5;
  if (elapsedSeconds <= avgTimeSeconds * 1.25) return 4;
  return 3;
}

export function scheduleSm2(previous: ReviewState, quality: number, now = new Date()): ReviewState {
  const easeFactor = Math.max(1.3, previous.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  const failed = quality < 3;
  const repetitions = failed ? 0 : previous.repetitions + 1;
  const lapses = failed ? previous.lapses + 1 : previous.lapses;

  let intervalDays = 1;
  if (failed) intervalDays = 1;
  else if (repetitions === 1) intervalDays = 1;
  else if (repetitions === 2) intervalDays = 6;
  else intervalDays = Math.round(previous.intervalDays * easeFactor);

  const dueAt = new Date(now.getTime() + intervalDays * DAY_MS).toISOString();
  const correctReviews = previous.history.filter((entry) => entry.quality >= 3).length + (quality >= 3 ? 1 : 0);
  const totalReviews = previous.history.length + 1;

  return {
    ...previous,
    intervalDays,
    easeFactor,
    repetitions,
    lapses,
    dueAt,
    accuracy: Math.round((correctReviews / totalReviews) * 100),
    history: [...previous.history, { reviewedAt: now.toISOString(), quality, intervalDays, easeFactor }]
  };
}

export function initialReviewState(itemId: string, itemType: ReviewState["itemType"]): ReviewState {
  return { itemId, itemType, intervalDays: 0, easeFactor: 2.5, repetitions: 0, lapses: 0, dueAt: new Date().toISOString(), history: [], accuracy: 0 };
}
