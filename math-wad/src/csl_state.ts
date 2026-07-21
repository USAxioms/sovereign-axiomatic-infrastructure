/**
 * Constitutional State Ledger (CSL) - State Model
 *
 * Represents the full configuration of a constitutional intelligence system,
 * including compliance status with all applicable constraints.
 *
 * This is the backend software mirror of the chip's "constitutional state space",
 * designed to be callable by blockchain and frontend clients.
 */

export type Wad = bigint;

/**
 * A single constitutional constraint evaluation.
 * `satisfied` is 1n (true) or 0n (false) in WAD space.
 */
export interface ConstraintEvaluation {
  /** Unique identifier for the constraint (e.g. "safety", "disclosure", "jurisdiction.eu") */
  id: string;
  /** WAD-encoded satisfaction: 1n = satisfied, 0n = violated */
  satisfied: Wad;
  /** Optional human-readable description or regulatory reference */
  description?: string;
}

/**
 * Weight vector entry for a constraint.
 * Higher weight encodes higher regulatory priority.
 */
export interface ConstraintWeight {
  id: string;
  /** WAD-encoded weight λᵢ, with Σ λᵢ = 1 in WAD space */
  weight: Wad;
}

/**
 * Constitutional state S.
 * This is the "chip state" as seen by the backend.
 */
export interface ConstitutionalState {
  /** Unique identifier for this state instance (could be hash, UUID, etc.) */
  id: string;

  /** Arbitrary configuration payload (model parameters, environment, etc.) */
  config: Record<string, unknown>;

  /** Current constraint evaluations πᵢ(s, s') */
  constraints: ConstraintEvaluation[];

  /** Weight vector Λ = (λ₁, …, λₙ) */
  weights: ConstraintWeight[];

  /** Aggregate satisfaction score V(s) in WAD space */
  satisfactionScore: Wad;

  /** True iff the state is fully compliant (V(s) = n in WAD terms) */
  fullyCompliant: boolean;

  /** Optional metadata: timestamps, jurisdiction, audit IDs, etc. */
  meta?: {
    createdAt?: string;
    updatedAt?: string;
    jurisdiction?: string;
    auditId?: string;
  };
}

/**
 * Helper to create an initial constitutional state.
 * All constraints start as unsatisfied (0n), satisfactionScore = 0n, fullyCompliant = false.
 */
export function createInitialConstitutionalState(
  id: string,
  constraintIds: string[],
  weights: ConstraintWeight[],
  config: Record<string, unknown> = {}
): ConstitutionalState {
  const constraints: ConstraintEvaluation[] = constraintIds.map((cid) => ({
    id: cid,
    satisfied: 0n,
  }));

  return {
    id,
    config,
    constraints,
    weights,
    satisfactionScore: 0n,
    fullyCompliant: false,
    meta: {
      createdAt: new Date().toISOString(),
    },
  };
}
