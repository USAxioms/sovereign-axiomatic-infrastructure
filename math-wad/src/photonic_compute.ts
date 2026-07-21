/**
 * Photonic Compute Layer
 *
 * This file models the computational behavior of the photonic chip:
 * - Weighted-sum inference (MZI mesh)
 * - Threshold gating (EAM modulators)
 * - Wavelength routing (MRR resonators)
 *
 * This is the backend software mirror of the physical photonic compute pipeline.
 */

import { PhotonicMesh, MZINode, EAMModulator, MicroringResonator } from "./photonic_mesh";
import { Wad } from "./csl_state";
import { wadAdd, wadMul } from "./wad_ops";

/**
 * Compute weighted sum for a single MZI node.
 * In hardware: Σ Wᵢ * Sᵢ
 */
export function computeMZINode(node: MZINode, input: Wad): Wad {
  let sum = 0n;

  for (const w of node.weights) {
    // Weighted sum: crystalline fraction * input
    sum = wadAdd(sum, wadMul(w.crystalline, input));
  }

  return sum;
}

/**
 * Apply EAM threshold gating.
 * If output >= threshold → pass (1n)
 * Else → block (0n)
 */
export function applyEAM(output: Wad, eam: EAMModulator): Wad {
  return output >= eam.threshold ? 1n : 0n;
}

/**
 * Route through microring resonator.
 * In hardware: wavelength determines jurisdiction path.
 * In software: we simply return the wavelength for logging.
 */
export function routeMRR(mrr: MicroringResonator): Wad {
  return mrr.wavelength;
}

/**
 * Full photonic inference pass over the mesh.
 * This is the backend simulation of the chip's inference pipeline.
 */
export function runPhotonicInference(mesh: PhotonicMesh, input: Wad): Wad[] {
  const results: Wad[] = [];

  for (let i = 0; i < mesh.mzi.length; i++) {
    const node = mesh.mzi[i];
    const eam = mesh.eam[i];
    const mrr = mesh.mrr[i];

    // Step 1: weighted sum
    const weighted = computeMZINode(node, input);

    // Step 2: threshold gating
    const gated = applyEAM(weighted, eam);

    // Step 3: wavelength routing (logged only)
    const wavelength = routeMRR(mrr);

    // Final output for this node
    results.push(gated);
  }

  return results;
}
