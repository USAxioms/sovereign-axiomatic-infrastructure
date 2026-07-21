/**
 * Wad Array Utilities
 *
 * Deterministic operations over arrays of wad values.
 * These helpers provide safe aggregation, filtering, and transformation.
 */

import { wadAdd, wadSub, wadMul, wadDiv } from "./wad_ops";
import { ensureSafeOperands, ensureNonZeroDivisor } from "./wad_safe";

/**
 * Sum of wad values.
 */
export function wadSum(values: bigint[]): bigint {
  ensureSafeOperands(...values);
  let total = 0n;
  for (const v of values) {
    total = wadAdd(total, v);
  }
  return total;
}

/**
 * Minimum wad value in an array.
 */
export function wadMin(values: bigint[]): bigint {
  if (values.length === 0) throw new Error("Cannot compute min of empty array");
  ensureSafeOperands(...values);
  let m = values[0];
  for (const v of values) {
    if (v < m) m = v;
  }
  return m;
}

/**
 * Maximum wad value in an array.
 */
export function wadMax(values: bigint[]): bigint {
  if (values.length === 0) throw new Error("Cannot compute max of empty array");
  ensureSafeOperands(...values);
  let m = values[0];
  for (const v of values) {
    if (v > m) m = v;
  }
  return m;
}

/**
 * Normalize an array of wad weights so they sum to 1 wad.
 */
export function wadNormalize(weights: bigint[]): bigint[] {
  ensureSafeOperands(...weights);
  const total = wadSum(weights);
  ensureNonZeroDivisor(total);
  return weights.map(w => wadDiv(w, total));
}
