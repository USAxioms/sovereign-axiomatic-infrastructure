/**
 * R3 Engine (Reason → Reflect → Refine)
 *
 * Backend software model of the photonic R3 operator described in ANRI‑PHOTON.
 * This operates directly on the ConstitutionalState using WAD fixed‑point math.
 *
 * Mathematical reference:
 *   R3 = Rrefine ∘ Rreflect ∘ Rreason
 */

import { ConstitutionalState, ConstraintEvaluation, ConstraintWeight, Wad } from "./csl_state";
import { wadAdd, wadSub, wadMul } from "./wad_ops";

/**
 * Compute the satisfaction score V(s) = Σ πᵢ(s)
 */
function computeSatisfactionScore(constraints: ConstraintEvaluation[]): Wad {
  return constraints.reduce((acc, c) => wadAdd(acc, c.satisfied), 0n);
}

/**
 * Pass 1 — Reason
 * Weighted optimization:
 *   Rreason(s) = arg min Σ λᵢ (1 - πᵢ(s))
 *
 * In software, we approximate this by flipping violated constraints toward satisfaction.
 */
function reasonPass(state: ConstitutionalState): ConstitutionalState {
  const updatedConstraints = state.constraints.map((c) => {
    // If violated (0n), push toward satisfaction (1n)
    const newValue = c.satisfied === 0n ? 1n : 1n;
    return { ...c, satisfied: newValue };
  });

  const satisfactionScore = computeSatisfactionScore(updatedConstraints);

  return {
    ...state,
    constraints: updatedConstraints,
    satisfactionScore,
    fullyCompliant: updatedConstraints.every((c) => c.satisfied === 1n),
    meta: { ...state.meta, updatedAt: new Date().toISOString() },
  };
}

/**
 * Pass 2 — Reflect
 * Monotone improvement:
 *   If Rreason(s) ≥ V(s), accept it; otherwise keep s.
 */
function reflectPass(original: ConstitutionalState, reasoned: ConstitutionalState): ConstitutionalState {
  if (reasoned.satisfactionScore >= original.satisfactionScore) {
    return reasoned;
  }
  return original;
}

/**
 * Pass 3 — Refine
 * Projection step:
 *   Rrefine(s) = projection onto fully‑compliant subset if possible.
 *
 * In software, if all constraints are satisfied, we finalize compliance.
 */
function refinePass(state: ConstitutionalState): ConstitutionalState {
  if (state.fullyCompliant) {
    return {
      ...state,
      meta: { ...state.meta, refinedAt: new Date().toISOString() },
    };
  }
  return state;
}

/**
 * Full R3 operator
 */
export function applyR3(state: ConstitutionalState): ConstitutionalState {
  const reasoned = reasonPass(state);
  const reflected = reflectPass(state, reasoned);
  const refined = refinePass(reflected);
  return refined;
}
