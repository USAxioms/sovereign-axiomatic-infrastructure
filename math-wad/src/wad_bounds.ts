/**
 * Wad Bounds
 *
 * Deterministic boundary helpers for wad values.
 * Provides inclusive and exclusive bound checks and safe enforcement.
 */

import { ensureSafeOperands } from "./wad_safe";

/**
 * Check if x is >= min.
 */
export function wadAtLeast(x: bigint, min: bigint): boolean {
  ensureSafeOperands(x, min);
  return x >= min;
}

/**
 * Check if x is <= max.
 */
export function wadAtMost(x: bigint, max: bigint): boolean {
  ensureSafeOperands(x, max);
  return x <= max;
}

/**
 * Enforce x >= min.
 */
export function wadRequireMin(x: bigint, min: bigint): bigint {
  ensureSafeOperands(x, min);
  return x < min ? min : x;
}

/**
 * Enforce x <= max.
 */
export function wadRequireMax(x: bigint, max: bigint): bigint {
  ensureSafeOperands(x, max);
  return x > max ? max : x;
}
