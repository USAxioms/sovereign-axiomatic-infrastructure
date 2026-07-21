/**
 * Wad Arithmetic Module
 * Deterministic 18-decimal fixed-point math for sovereign state consistency.
 *
 * Base Scale: 1 wad = 10^18
 */

export const WAD = 10n ** 18n;

/**
 * Convert a regular number (float or int) into a wad-scaled bigint.
 */
export function toWad(x: number | string | bigint): bigint {
  return BigInt(Math.floor(Number(x) * 1e18));
}

/**
 * Convert wad bigint back into a floating-point number.
 */
export function fromWad(w: bigint): number {
  return Number(w) / 1e18;
}

/**
 * Wad Addition
 */
export function wadAdd(x: bigint, y: bigint): bigint {
  return x + y;
}

/**
 * Wad Subtraction
 */
export function wadSub(x: bigint, y: bigint): bigint {
  return x - y;
}

/**
 * Wad Multiplication
 * (x * y) / WAD
 */
export function wadMul(x: bigint, y: bigint): bigint {
  return (x * y) / WAD;
}

/**
 * Wad Division
 * (x * WAD) / y
 */
export function wadDiv(x: bigint, y: bigint): bigint {
  if (y === 0n) throw new Error("Wad division by zero");
  return (x * WAD) / y;
}
