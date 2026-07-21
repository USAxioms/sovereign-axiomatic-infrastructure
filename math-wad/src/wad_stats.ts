/**
 * Wad Statistical Utilities
 *
 * Deterministic statistical functions built on top of wad arithmetic.
 * All operations preserve fixed‑point precision and constitutional safety.
 */

import { wadAdd, wadSub, wadDiv, wadMul } from "./wad_ops";
import { ensureSafeOperands, ensureNonZeroDivisor } from "./wad_safe";

/**
 * Mean (average) of an array of wad values.
 */
export function wadMean(values: bigint[]): bigint {
  if (values.length === 0) {
    throw new Error("Cannot compute mean of empty array");
  }

  ensureSafeOperands(...values);

  let sum = 0n;
  for (const v of values) {
    sum = wadAdd(sum, v);
  }

  return wadDiv(sum, BigInt(values.length));
}

/**
 * Variance of wad values.
 * Uses population variance formula.
 */
export function wadVariance(values: bigint[]): bigint {
  if (values.length === 0) {
    throw new Error("Cannot compute variance of empty array");
  }

  const mean = wadMean(values);
  let sumSq = 0n;

  for (const v of values) {
    const diff = wadSub(v, mean);
    const sq = wadMul(diff, diff);
    sumSq = wadAdd(sumSq, sq);
  }

  return wadDiv(sumSq, BigInt(values.length));
}

/**
 * Standard deviation of wad values.
 * sqrt(variance) using wadMul/wadDiv approximation.
 */
export function wadStdDev(values: bigint[]): bigint {
  const variance = wadVariance(values);

  // Deterministic bigint sqrt
  let x = variance;
  let y = (x + 1n) >> 1n;

  while (y < x) {
    x = y;
    y = (x + variance / x) >> 1n;
  }

  return x;
}
