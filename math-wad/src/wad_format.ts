/**
 * Wad Formatting Utilities
 *
 * Provides human‑readable formatting for wad values while preserving
 * deterministic precision.
 */

import { WAD_SCALE } from "./wad_constants";

/**
 * Format a wad bigint into a fixed 18‑decimal string.
 */
export function formatWad(w: bigint): string {
  const whole = w / WAD_SCALE;
  const frac = w % WAD_SCALE;
  return `${whole}.${frac.toString().padStart(18, "0")}`;
}

/**
 * Format a wad bigint into a shortened display string.
 * Example: 123.456000000000000000 → "123.456"
 */
export function formatWadShort(w: bigint): string {
  const full = formatWad(w);
  return full.replace(/\.?0+$/, "");
}
