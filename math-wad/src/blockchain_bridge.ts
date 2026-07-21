/**
 * Blockchain Bridge (Backend → Chain Interface)
 *
 * This file defines the backend-side interface that the blockchain layer
 * will use to interact with the chip:
 *
 *  - Commitments (SHA3-256)
 *  - State serialization
 *  - Chip step / convergence triggers
 *  - ZK audit hooks (stub)
 *
 * This is NOT a smart contract.
 * It is the backend "bridge" that the chain will call.
 */

import { Chip, chipStep, chipConverge } from "./chip";
import { ConstitutionalState } from "./csl_state";
import { createCommitment, verifyCommitment } from "./commit";

/**
 * Produce a commitment for the chip's current state.
 */
export function bridgeCommitState(chip: Chip): {
  commit: string;
  nonce: bigint;
} {
  return createCommitment(chip.state);
}

/**
 * Verify a commitment against the chip's current state.
 */
export function bridgeVerifyCommitment(
  chip: Chip,
  nonce: bigint,
  expectedCommit: string
): boolean {
  return verifyCommitment(chip.state, nonce, expectedCommit);
}

/**
 * Trigger a single R3 step from the blockchain.
 */
export function bridgeStep(chip: Chip): Chip {
  return chipStep(chip);
}

/**
 * Trigger full R3 convergence from the blockchain.
 */
export function bridgeConverge(chip: Chip, maxSteps: number = 10): Chip {
  return chipConverge(chip, maxSteps);
}

/**
 * Get the chip's current constitutional state for on-chain mirroring.
 */
export function bridgeGetState(chip: Chip): ConstitutionalState {
  return chip.state;
}

/**
 * ZK audit proof stub — blockchain will call this.
 * Real implementation will be added when we build the Solidity contracts.
 */
export function bridgeGenerateZKProof(_chip: Chip): string {
  // Stub: real ZK proof generation will be implemented in the chain layer
  return "ZK_PROOF_STUB";
}
