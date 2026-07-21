/**
 * Wad Zip Utilities
 *
 * Deterministic zipping and pairing operations for wad arrays.
 */

import { ensureSafeOperands } from "./wad_safe";

/**
 * Zip two wad arrays into pairs.
 * Length must match exactly.
 */
export function wadZip(a: bigint[], b: bigint[]): Array<[bigint, bigint]> {
  if (a.length !== b.length) {
    throw new Error("Cannot zip wad arrays of different lengths");
  }

  ensureSafeOperands(...a, ...b);

  const out: Array<[bigint, bigint]> = [];
  for (let i = 0; i < a.length; i++) {
    out.push([a[i], b[i]]);
  }
  return out;
}

/**
 * Zip three wad arrays.
 */
export function wadZip3(
  a: bigint[],
  b: bigint[],
  c: bigint[]
): Array<[bigint, bigint, bigint]> {
  if (a.length !== b.length || b.length !== c.length) {
    throw new Error("Cannot zip wad arrays of different lengths");
  }

  ensureSafeOperands(...a, ...b, ...c);

  const out: Array<[bigint, bigint, bigint]> = [];
  for (let i = 0; i < a.length; i++) {
    out.push([a[i], b[i], c[i]]);
  }
  return out;
}
