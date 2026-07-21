/**
 * Wad Reduce Utilities
 *
 * Deterministic reduction operations for wad arrays.
 * Provides safe folding and aggregation with user‑defined reducers.
 */

import { ensureSafeOperands } from "./wad_safe";

/**
 * Reduce an array of wad values into a single wad.
 */
export function wadReduce(
  values: bigint[],
  fn: (acc: bigint, x: bigint, index: number) => bigint,
  initial: bigint
): bigint {
  ensureSafeOperands(...values, initial);

  let acc = initial;
  for (let i = 0; i < values.length; i++) {
    const next = fn(acc, values[i], i);
    ensureSafeOperands(next);
    acc = next;
  }
  return acc;
}

/**
 * Reduce two wad arrays together.
 */
export function wadReduce2(
  a: bigint[],
  b: bigint[],
  fn: (acc: bigint, x: bigint, y: bigint, index: number) => bigint,
  initial: bigint
): bigint {
  if (a.length !== b.length) {
    throw new Error("Cannot reduce wad arrays of different lengths");
  }

  ensureSafeOperands(...a, ...b, initial);

  let acc = initial;
  for (let i = 0; i < a.length; i++) {
    const next = fn(acc, a[i], b[i], i);
    ensureSafeOperands(next);
    acc = next;
  }
  return acc;
}
