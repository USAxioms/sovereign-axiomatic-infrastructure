/**
 * Commitment Layer (Backend)
 *
 * This file provides the backend hashing + commitment functions
 * that the blockchain layer will eventually consume.
 *
 * It mirrors the ANRI‑PHOTON Layer 3 commitment format:
 *
 *    Commit = SHA3-256(CSLstate | nonce)
 *
 * This backend version:
 *  - Serializes the chip's constitutional state
 *  - Mixes in a quantum-seeded nonce
 *  - Produces a deterministic SHA3-256 hash
 */

import { ConstitutionalState } from "./csl_state";
import { quantumRandom } from "./encryption";
import { createHash } from "crypto";

/**
 * Serialize CSL state into a deterministic string.
 */
export function serializeState(state: ConstitutionalState): string {
  return JSON.stringify({
    id: state.id,
    constraints: state.constraints.map(c => ({
      id: c.id,
      satisfied: c.satisfied.toString()
    })),
    weights: state.weights.map(w => ({
      id: w.id,
      weight: w.weight.toString()
    })),
    satisfactionScore: state.satisfactionScore.toString(),
    fullyCompliant: state.fullyCompliant,
    meta: state.meta ?? {}
  });
}

/**
 * Compute SHA3-256 hash.
 */
export function sha3(data: string): string {
  return createHash("sha3-256").update(data).digest("hex");
}

/**
 * Create backend commitment:
 *    SHA3-256(CSLstate | nonce)
 */
export function createCommitment(state: ConstitutionalState): {
  commit: string;
  nonce: bigint;
} {
  const nonce = quantumRandom();
  const serialized = serializeState(state);
  const combined = `${serialized}|${nonce.toString()}`;
  const commit = sha3(combined);

  return { commit, nonce };
}

/**
 * Verify a commitment by recomputing it.
 */
export function verifyCommitment(
  state: ConstitutionalState,
  nonce: bigint,
  expectedCommit: string
): boolean {
  const serialized = serializeState(state);
  const combined = `${serialized}|${nonce.toString()}`;
  const commit = sha3(combined);
  return commit === expectedCommit;
}
