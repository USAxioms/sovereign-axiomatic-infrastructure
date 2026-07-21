/**
 * Photonic R3 Engine
 *
 * This file connects:
 *  - The photonic compute layer (MZI, EAM, MRR)
 *  - The constitutional state (CSL)
 *  - The R3 operator (Reason → Reflect → Refine)
 *
 * This is the backend software mirror of the physical photonic R3 mapping:
 *      R3_photonic = Rrefine ∘ Rreflect ∘ Rreason
 */

import { ConstitutionalState } from "./csl_state";
import { PhotonicMesh } from "./photonic_mesh";
import { runPhotonicInference } from "./photonic_compute";
import { applyR3 } from "./r3_engine";
import { Wad } from "./csl_state";

/**
 * Run photonic inference and update CSL state.
 *
 * In hardware:
 *   - MZI mesh computes weighted sums
 *   - EAM gates compliance predicates
 *   - MRR routes jurisdiction wavelengths
 *
 * In software:
 *   - We treat the photonic output as constraint satisfaction signals.
 */
export function photonicR3Step(
  mesh: PhotonicMesh,
  state: ConstitutionalState,
  input: Wad
): ConstitutionalState {
  // Step 1: run photonic inference (returns array of 0n/1n signals)
  const photonicOutputs = runPhotonicInference(mesh, input);

  // Step 2: map photonic outputs → constraint satisfaction
  const updatedConstraints = state.constraints.map((c, i) => ({
    ...c,
    satisfied: photonicOutputs[i] ?? 0n,
  }));

  const updatedState: ConstitutionalState = {
    ...state,
    constraints: updatedConstraints,
    satisfactionScore: updatedConstraints.reduce((acc, c) => acc + c.satisfied, 0n),
    fullyCompliant: updatedConstraints.every((c) => c.satisfied === 1n),
    meta: {
      ...state.meta,
      updatedAt: new Date().toISOString(),
      photonicStep: true,
    },
  };

  // Step 3: apply software R3 operator on top of photonic output
  const refinedState = applyR3(updatedState);

  return refinedState;
}

/**
 * Run multiple photonic R3 steps until convergence.
 */
export function photonicR3Converge(
  mesh: PhotonicMesh,
  state: ConstitutionalState,
  input: Wad,
  maxSteps: number = 10
): ConstitutionalState {
  let current = state;

  for (let i = 0; i < maxSteps; i++) {
    const next = photonicR3Step(mesh, current, input);

    if (next.fullyCompliant) {
      return next;
    }

    current = next;
  }

  return current;
}
