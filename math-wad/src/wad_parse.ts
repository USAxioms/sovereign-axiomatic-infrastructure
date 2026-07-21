/**
 * Wad Parsing Utilities
 *
 * Convert user‑facing strings into deterministic wad bigint values.
 * Ensures strict formatting and prevents ambiguous numeric input.
 */

import { WAD_SCALE } from "./wad_constants";

/**
 * Parse a string like "123.456" into a wad bigint.
 * Always enforces exactly 18 decimal places internally.
 */
export function parseWad(input: string): bigint {
  const [whole, frac = ""] = input.split(".");

  const wholePart = BigInt(whole);
  const fracPart = BigInt((frac + "0".repeat(18)).slice(0, 18));

  return wholePart * WAD_SCALE + fracPart;
}

/**
 * Validate that a string is a proper wad‑compatible numeric format.
 */
export function isValidWadString(input: string): boolean {
  return /^[0-9]+(\.[0-9]+)?$/.test(input);
}
