/**
 * Wad Range Utilities
 *
 * Deterministic range operations for wad values.
 * Provides clamping, bounding, and interval checks.
 */

import { ensureSafeOperands } from "./wad_safe";

/**
 * Clamp a wad value between a minimum and maximum.
 */
export function wadClamp(x: bigint, min: bigint, max: bigint): bigint {
  ensureSafeOperands(x, min, max);
  if (x < min) return min;
  if (x > max) return max;
  return x;
}

/**
 * Check if a wad value is within an inclusive range.
 */
export function wadInInterval(x: bigint, min: bigint, max: bigint): boolean {
  ensureSafeOperands(x, min, max);
  return x >= min && x <= max;
}

/**
 * Check if a wad value is strictly inside an interval.
 */
export function wadInside(x: bigint, min: bigint, max: bigint): boolean {
  ensureSafeOperands(x, min, max);
  return x > min && x < max;
}
