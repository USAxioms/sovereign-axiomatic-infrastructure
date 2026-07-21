/**
 * Wad Safety Checks
 *
 * Provides deterministic guard functions for validating wad inputs,
 * preventing unsafe operations, and ensuring constitutional consistency.
 */

import { WAD_MIN, WAD_MAX, wadInRange } from "./wad_constants";

/**
 * Throw if a wad value is out of safe deterministic bounds.
 */
export function ensureSafeWad(x: bigint): void {
  if (!wadInRange(x)) {
    throw new Error("Unsafe wad value: out of deterministic bounds");
  }
}

/**
 * Throw if any operand is out of range.
 */
export function ensureSafeOperands(...values: bigint[]): void {
  for (const v of values) {
    if (!wadInRange(v)) {
      throw new Error("Unsafe wad operand detected");
    }
  }
}

/**
 * Validate that a divisor is non‑zero.
 */
export function ensureNonZeroDivisor(y: bigint): void {
  if (y === 0n) {
    throw new Error("Division by zero is not permitted");
  }
}
