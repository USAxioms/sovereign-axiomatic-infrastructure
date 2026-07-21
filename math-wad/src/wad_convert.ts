/**
 * Wad Conversion Utilities
 *
 * Convert between raw numbers, strings, and wad‑scaled bigint values.
 */

import { WAD_SCALE } from "./wad_constants";

/**
 * Convert a number or string into a wad bigint.
 */
export function toWad(x: number | string): bigint {
  const n = Number(x);
  return BigInt(Math.floor(n * Number(WAD_SCALE)));
}

/**
 * Convert a wad bigint back into a floating‑point number.
 */
export function fromWad(w: bigint): number {
  return Number(w) / Number(WAD_SCALE);
}

/**
 * Convert a wad bigint into a string with full precision.
 */
export function wadToString(w: bigint): string {
  const whole = w / WAD_SCALE;
  const frac = w % WAD_SCALE;
  return `${whole}.${frac.toString().padStart(18, "0")}`;
}
