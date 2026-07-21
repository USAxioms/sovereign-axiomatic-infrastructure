/**
 * Wad Sorting Utilities
 *
 * Deterministic sorting for arrays of wad values.
 * Provides ascending, descending, and stable sort variants.
 */

import { ensureSafeOperands } from "./wad_safe";

/**
 * Sort wad values ascending.
 */
export function wadSortAsc(values: bigint[]): bigint[] {
  ensureSafeOperands(...values);
  return [...values].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

/**
 * Sort wad values descending.
 */
export function wadSortDesc(values: bigint[]): bigint[] {
  ensureSafeOperands(...values);
  return [...values].sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
}

/**
 * Stable sort with a custom comparator.
 */
export function wadSortStable(
  values: bigint[],
  compare: (a: bigint, b: bigint) => number
): bigint[] {
  ensureSafeOperands(...values);

  return values
    .map((v, i) => ({ v, i }))
    .sort((a, b) => {
      const c = compare(a.v, b.v);
      return c !== 0 ? c : a.i - b.i;
    })
    .map(entry => entry.v);
}
