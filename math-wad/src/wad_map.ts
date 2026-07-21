/**
 * Wad Map Utilities
 *
 * Deterministic mapping operations for wad arrays.
 */

import { ensureSafeOperands } from "./wad_safe";

/**
 * Apply a deterministic transform to each wad value.
 */
export function wadMap(
  values: bigint[],
  fn: (x: bigint, index: number) => bigint
): bigint[] {
  ensureSafeOperands(...values);

  const out: bigint[] = [];
  for (let i = 0; i < values.length; i++) {
    const v = fn(values[i], i);
    ensureSafeOperands(v);
    out.push(v);
  }
  return out;
}

/**
 * Map two wad arrays together.
 */
export function wadMap2(
  a: bigint[],
  b: bigint[],
  fn: (x: bigint, y: bigint, index: number) => bigint
): bigint[] {
  if (a.length !== b.length) {
    throw new Error("Cannot map wad arrays of different lengths");
  }

  ensureSafeOperands(...a, ...b);

  const out: bigint[] = [];
  for (let i = 0; i < a.length; i++) {
    const v = fn(a[i], b[i], i);
    ensureSafeOperands(v);
    out.push(v);
  }
  return out;
}
