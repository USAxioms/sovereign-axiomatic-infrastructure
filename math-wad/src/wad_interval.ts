/**
 * Wad Interval Operations
 *
 * Deterministic interval math for wad values.
 * Provides merging, intersecting, and checking interval relationships.
 */

import { ensureSafeOperands } from "./wad_safe";

export interface WadInterval {
  min: bigint;
  max: bigint;
}

/**
 * Create a normalized interval (min <= max).
 */
export function wadInterval(min: bigint, max: bigint): WadInterval {
  ensureSafeOperands(min, max);
  return min <= max ? { min, max } : { min: max, max: min };
}

/**
 * Check if two intervals overlap.
 */
export function wadIntervalsOverlap(a: WadInterval, b: WadInterval): boolean {
  ensureSafeOperands(a.min, a.max, b.min, b.max);
  return a.min <= b.max && b.min <= a.max;
}

/**
 * Intersection of two intervals.
 * Returns null if they do not overlap.
 */
export function wadIntervalIntersection(a: WadInterval, b: WadInterval): WadInterval | null {
  if (!wadIntervalsOverlap(a, b)) return null;

  const min = a.min > b.min ? a.min : b.min;
  const max = a.max < b.max ? a.max : b.max;

  return { min, max };
}

/**
 * Merge two intervals into one that covers both.
 */
export function wadIntervalMerge(a: WadInterval, b: WadInterval): WadInterval {
  ensureSafeOperands(a.min, a.max, b.min, b.max);

  const min = a.min < b.min ? a.min : b.min;
  const max = a.max > b.max ? a.max : b.max;

  return { min, max };
}
