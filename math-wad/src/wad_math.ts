/**
 * Wad Math — Higher‑Level Deterministic Math
 *
 * Provides composite mathematical operations built on top of
 * core wad arithmetic. These functions allow more expressive
 * quantitative behavior while preserving full determinism.
 */

import { wadMul, wadDiv, wadAdd, wadSub } from "./wad_ops";
import { ensureSafeOperands, ensureNonZeroDivisor } from "./wad_safe";

/**
 * Percentage of a wad value.
 * Example: percentOf(100 wad, 5 wad) = 5 wad
 */
export function percentOf(base: bigint, pct: bigint): bigint {
  ensureSafeOperands(base, pct);
  return wadMul(base, pct);
}

/**
 * Increase a wad value by a percentage.
 * Example: increaseByPercent(100 wad, 10 wad) = 110 wad
 */
export function increaseByPercent(base: bigint, pct: bigint): bigint {
  ensureSafeOperands(base, pct);
  return wadAdd(base, percentOf(base, pct));
}

/**
 * Decrease a wad value by a percentage.
 * Example: decreaseByPercent(100 wad, 10 wad) = 90 wad
 */
export function decreaseByPercent(base: bigint, pct: bigint): bigint {
  ensureSafeOperands(base, pct);
  return wadSub(base, percentOf(base, pct));
}

/**
 * Weighted average of two wad values.
 */
export function wadWeightedAvg(
  x: bigint,
  weightX: bigint,
  y: bigint,
  weightY: bigint
): bigint {
  ensureSafeOperands(x, y, weightX, weightY);
  const numerator = wadAdd(wadMul(x, weightX), wadMul(y, weightY));
  const denominator = wadAdd(weightX, weightY);
  ensureNonZeroDivisor(denominator);
  return wadDiv(numerator, denominator);
}
