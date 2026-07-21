/**
 * Wad Constants
 *
 * Core constants for deterministic 18‑decimal fixed‑point arithmetic.
 * These values define the quantitative foundation of the sovereign system.
 */

export const WAD_SCALE = 10n ** 18n;

/**
 * Safe bounds for wad values.
 * Prevents overflow and ensures deterministic behavior across all layers.
 */
export const WAD_MIN = -(2n ** 255n);
export const WAD_MAX = 2n ** 255n;

/**
 * Utility: Check if a wad value is within safe bounds.
 */
export function wadInRange(x: bigint): boolean {
  return x >= WAD_MIN && x <= WAD_MAX;
}
