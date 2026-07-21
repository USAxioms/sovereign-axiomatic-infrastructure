/**
 * Wad Filter Utilities
 *
 * Deterministic filtering operations for wad arrays.
 */

import { ensureSafeOperands } from "./wad_safe";

/**
 * Filter wad values by a predicate.
 */
export function wadFilter(
  values: bigint[],
  fn: (x: bigint, index: number) => boolean
): bigint[] {
  ensureSafeOperands(...values);

  const out: bigint[] = [];
  for (let i = 0; i < values.length; i++) {
    if (fn(values[i], i)) {
      out.push(values[i]);
    }
  }
  return out;
}

/**
 * Filter two wad arrays together.
 */
export function wadFilter2(
  a: bigint[],
  b: bigint[],
  fn: (x: bigint, y: bigint, index: number) => boolean
): Array<[bigint, bigint]> {
  if (a.length !== b.length) {
    throw new Error("Cannot filter wad arrays of different lengths");
  }

  ensureSafeOperands(...a, ...b);

  const out: Array<[bigint, bigint]> = [];
  for (let i = 0; i < a.length; i++) {
    if (fn(a[i], b[i], i)) {
      out.push([a[i], b[i]]);
    }
  }
  return out;
}
