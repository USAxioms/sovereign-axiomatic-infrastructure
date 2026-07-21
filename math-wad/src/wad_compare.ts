/**
 * Wad Comparison Utilities
 *
 * Deterministic comparison operators for wad values.
 * Ensures consistent ordering and equality checks across all layers.
 */

import { ensureSafeOperands } from "./wad_safe";

/**
 * Equal
 */
export function wadEq(x: bigint, y: bigint): boolean {
  ensureSafeOperands(x, y);
  return x === y;
}

/**
 * Not equal
 */
export function wadNe(x: bigint, y: bigint): boolean {
  ensureSafeOperands(x, y);
  return x !== y;
}

/**
 * Less than
 */
export function wadLt(x: bigint, y: bigint): boolean {
  ensureSafeOperands(x, y);
  return x < y;
}

/**
 * Greater than
 */
export function wadGt(x: bigint, y: bigint): boolean {
  ensureSafeOperands(x, y);
  return x > y;
}

/**
 * Less than or equal
 */
export function wadLe(x: bigint, y: bigint): boolean {
  ensureSafeOperands(x, y);
  return x <= y;
}

/**
 * Greater than or equal
 */
export function wadGe(x: bigint, y: bigint): boolean {
  ensureSafeOperands(x, y);
  return x >= y;
}
