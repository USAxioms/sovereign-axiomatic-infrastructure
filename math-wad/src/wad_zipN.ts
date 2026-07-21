/**
 * Wad Zip‑N Utilities
 *
 * Deterministic zipping for arbitrary numbers of wad arrays.
 */

import { ensureSafeOperands } from "./wad_safe";

/**
 * Zip any number of wad arrays.
 * All arrays must have identical length.
 */
export function wadZipN(...arrays: bigint[][]): bigint[][] {
  if (arrays.length === 0) {
    throw new Error("Cannot zip zero arrays");
  }

  const length = arrays[0].length;

  for (const arr of arrays) {
    if (arr.length !== length) {
      throw new Error("Cannot zip wad arrays of different lengths");
    }
    ensureSafeOperands(...arr);
  }

  const out: bigint[][] = [];

  for (let i = 0; i < length; i++) {
    const row: bigint[] = [];
    for (const arr of arrays) {
      row.push(arr[i]);
    }
    out.push(row);
  }

  return out;
}
