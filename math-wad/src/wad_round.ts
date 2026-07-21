/**
 * Wad Rounding Utilities
 *
 * Deterministic rounding functions for wad values.
 * Ensures consistent behavior across all sovereign layers.
 */

import { WAD_SCALE } from "./wad_constants";

/**
 * Round a wad value down (floor).
 */
export function wadFloor(w: bigint): bigint {
  return (w / WAD_SCALE) * WAD_SCALE;
}

/**
 * Round a wad value up (ceil).
 */
export function wadCeil(w: bigint): bigint {
  const whole = w / WAD_SCALE;
  const frac = w % WAD_SCALE;
  return frac === 0n ? w : (whole + 1n) * WAD_SCALE;
}

/**
 * Round a wad value to the nearest whole wad.
 */
export function wadRound(w: bigint): bigint {
  const whole = w / WAD_SCALE;
  const frac = w % WAD_SCALE;
  return frac >= WAD_SCALE / 2n ? (whole + 1n) * WAD_SCALE : whole * WAD_SCALE;
}
