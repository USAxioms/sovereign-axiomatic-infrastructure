/**
 * Wad Operations
 *
 * Deterministic 18‑decimal fixed‑point arithmetic operators.
 * These functions form the core quantitative behavior of the sovereign system.
 */

import { WAD_SCALE, WAD_MIN, WAD_MAX, wadInRange } from "./wad_constants";

/**
 * Ensure a wad value stays within safe deterministic bounds.
 */
function assertWadRange(x: bigint): void {
  if (!wadInRange(x)) {
    throw new Error("Wad value out of safe deterministic range");
  }
}

/**
 * Wad Addition
 */
export function wadAdd(x: bigint, y: bigint): bigint {
  const result = x + y;
  assertWadRange(result);
  return result;
}

/**
 * Wad Subtraction
 */
export function wadSub(x: bigint, y: bigint): bigint {
  const result = x - y;
  assertWadRange(result);
  return result;
}

/**
 * Wad Multiplication
 * (x * y) / WAD_SCALE
 */
export function wadMul(x: bigint, y: bigint): bigint {
  const result = (x * y) / WAD_SCALE;
  assertWadRange(result);
  return result;
}

/**
 * Wad Division
 * (x * WAD_SCALE) / y
 */
export function wadDiv(x: bigint, y: bigint): bigint {
  if (y === 0n) {
    throw new Error("Wad division by zero");
  }
  const result = (x * WAD_SCALE) / y;
  assertWadRange(result);
  return result;
}
