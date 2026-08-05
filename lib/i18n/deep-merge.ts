import type { Dictionary } from "./dictionaries/en";
import type { ContentDictionary } from "./dictionaries/en-content";

/**
 * A recursively-optional view of a dictionary.
 *
 * The English dictionary is the source of truth and defines every key. Until
 * now every other locale had to redeclare all of them or the build failed —
 * which is exactly why only Chinese existed: a complete ~1,600-string
 * translation was the price of admission for any new language. `DeepPartial`
 * drops that price to zero. A locale supplies only the strings it has
 * translated, and `mergeDictionary` fills the rest from English, so a language
 * can ship the day it is added and be completed over time — the same per-key
 * fallback the app and docs use.
 *
 * Arrays are treated as leaves, not merged element-by-element: a translated
 * list is either provided whole or falls back to English whole. Merging a
 * shorter translated array into a longer English one would splice languages
 * inside a single list, which reads worse than clean English.
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends readonly unknown[]
    ? T[K]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Returns `base` with every leaf that `overrides` provides substituted in,
 * recursing into plain objects and replacing arrays and primitives wholesale.
 * `base` is never mutated — the English source stays pristine for the next
 * locale to fall back onto.
 */
function deepMerge<T>(base: T, overrides: DeepPartial<T>): T {
  if (!isPlainObject(base)) {
    return (overrides as T) ?? base;
  }
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) continue;
    const current = out[key];
    out[key] =
      isPlainObject(current) && isPlainObject(value)
        ? deepMerge(current, value as DeepPartial<typeof current>)
        : value;
  }
  return out as T;
}

/** English base + a locale's partial UI translations. */
export function mergeDictionary(
  base: Dictionary,
  overrides: DeepPartial<Dictionary>,
): Dictionary {
  return deepMerge(base, overrides);
}

/** English base + a locale's partial long-form content translations. */
export function mergeContent(
  base: ContentDictionary,
  overrides: DeepPartial<ContentDictionary>,
): ContentDictionary {
  return deepMerge(base, overrides);
}
