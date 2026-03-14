import type { Progress } from './types';

const KEY = 'ts-practice-v2';

const today = (): string => new Date().toISOString().slice(0, 10);

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Progress;
  } catch { /* ignore */ }
  return { quizBestScore: {}, practiceComplete: [], theoryRead: [], streak: 0, lastPracticed: '' };
}

function save(p: Progress): void {
  localStorage.setItem(KEY, JSON.stringify(p));
}

function touchStreak(p: Progress): void {
  const t = today();
  if (p.lastPracticed === t) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  p.streak = p.lastPracticed === yesterday.toISOString().slice(0, 10) ? p.streak + 1 : 1;
  p.lastPracticed = t;
}

export function getProgress(): Progress {
  return load();
}

export function markTheoryRead(topicId: string): Progress {
  const p = load();
  if (!p.theoryRead.includes(topicId)) p.theoryRead.push(topicId);
  touchStreak(p);
  save(p);
  return p;
}

export function saveQuizScore(topicId: string, score: number): Progress {
  const p = load();
  const prev = p.quizBestScore[topicId] ?? 0;
  if (score > prev) p.quizBestScore[topicId] = score;
  touchStreak(p);
  save(p);
  return p;
}

export function markPracticeComplete(topicId: string): Progress {
  const p = load();
  if (!p.practiceComplete.includes(topicId)) p.practiceComplete.push(topicId);
  touchStreak(p);
  save(p);
  return p;
}

export function togglePracticeComplete(topicId: string): Progress {
  const p = load();
  const idx = p.practiceComplete.indexOf(topicId);
  if (idx === -1) p.practiceComplete.push(topicId);
  else p.practiceComplete.splice(idx, 1);
  save(p);
  return p;
}

export function topicScore(topicId: string): number {
  const p = load();
  const quiz = p.quizBestScore[topicId] ?? 0;
  const theory = p.theoryRead.includes(topicId) ? 1 : 0;
  const practice = p.practiceComplete.includes(topicId) ? 1 : 0;
  return quiz + theory + practice; // max = 5 + 1 + 1 = 7
}

export function resetProgress(): void {
  localStorage.removeItem(KEY);
}
