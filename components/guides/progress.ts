/**
 * Guide progress, stored as `{ [guideSlug]: doneStepIds }` in localStorage.
 *
 * There is no account and no server side to sync to — the store is this
 * browser, and the shape stays deliberately dumb so a corrupted entry can
 * never break a page: anything unreadable reads as "nothing done yet".
 *
 * Components re-render through a window event rather than a context, because
 * the dots and buttons that care about progress are scattered across
 * independently server-rendered sections of two different pages.
 */

const STORAGE_KEY = "openfiat:guide-progress";
const CHANGE_EVENT = "openfiat:guide-progress-changed";

export type GuideProgress = Record<string, string[]>;

export function readProgress(): GuideProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed))
      return {};
    return parsed as GuideProgress;
  } catch {
    return {};
  }
}

/** A guide counts as done when every one of its steps is marked. */
export function isGuideDone(
  progress: GuideProgress,
  slug: string,
  stepIds: string[],
): boolean {
  const done = progress[slug];
  return stepIds.length > 0 && stepIds.every((id) => done?.includes(id));
}

export function isStepDone(
  progress: GuideProgress,
  slug: string,
  stepId: string,
): boolean {
  return progress[slug]?.includes(stepId) ?? false;
}

export function toggleStepDone(slug: string, stepId: string): void {
  const progress = readProgress();
  const done = new Set(progress[slug] ?? []);
  if (done.has(stepId)) {
    done.delete(stepId);
  } else {
    done.add(stepId);
  }
  progress[slug] = [...done];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Private-mode quota errors still leave the in-page event consistent.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

/** Fires on writes from this tab and on `storage` events from others. */
export function subscribeToProgress(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
