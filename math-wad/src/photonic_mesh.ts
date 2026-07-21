/**
 * Photonic Mesh Model (MZI + Microring + PCM Weights)
 *
 * This is a software representation of the photonic "chip" layer.
 * It does NOT simulate physics — it provides a structural backend model
 * that the R3 engine can operate on.
 *
 * Layer 1 (Photonic Hardware) — software mirror.
 */

import { Wad } from "./csl_state";
import { wadAdd, wadMul } from "./wad_ops";

/**
 * PCM Weight Cell
 * Represents a single GST phase-change memory weight.
 */
export interface PCMWeightCell {
  id: string;
  /** Crystalline fraction α ∈ [0, 1] encoded in WAD */
  crystalline: Wad;
  /** Amorphous fraction (1 - α) */
  amorphous: Wad;
}

/**
 * PCM Weight Bank — fixed constitutional weights
 */
export interface PCMWeightBank {
  id: string;
  cells: PCMWeightCell[];
}

/**
 * Electro-Absorption Modulator (EAM)
 * Threshold determines whether a constraint is satisfied.
 */
export interface EAMModulator {
  id: string;
  /** Threshold T(V) encoded in WAD */
  threshold: Wad;
}

/**
 * Microring Resonator (MRR)
 * Used for wavelength routing (jurisdiction mapping).
 */
export interface MicroringResonator {
  id: string;
  /** Resonant wavelength λ encoded in WAD */
  wavelength: Wad;
}

/**
 * MZI Node — basic photonic compute unit
 */
export interface MZINode {
  id: string;
  /** Weighted sum output (WAD) */
  output: Wad;
  /** Connected PCM weights */
  weights: PCMWeightCell[];
}

/**
 * Full Photonic Mesh
 */
export interface PhotonicMesh {
  id: string;
  pcm: PCMWeightBank;
  eam: EAMModulator[];
  mrr: MicroringResonator[];
  mzi: MZINode[];
}

/**
 * Create a basic photonic mesh with N nodes.
 */
export function createPhotonicMesh(
  id: string,
  nodeCount: number
): PhotonicMesh {
  const pcm: PCMWeightBank = {
    id: `${id}-pcm`,
    cells: Array.from({ length: nodeCount }, (_, i) => ({
      id: `pcm-${i}`,
      crystalline: 1_000_000_000_000_000_000n, // 1.0 WAD
      amorphous: 0n,
    })),
  };

  const eam: EAMModulator[] = Array.from({ length: nodeCount }, (_, i) => ({
    id: `eam-${i}`,
    threshold: 500_000_000_000_000_000n, // 0.5 WAD
  }));

  const mrr: MicroringResonator[] = Array.from({ length: nodeCount }, (_, i) => ({
    id: `mrr-${i}`,
    wavelength: 1550_000_000_000_000_000n, // 1550 nm encoded in WAD
  }));

  const mzi: MZINode[] = Array.from({ length: nodeCount }, (_, i) => ({
    id: `mzi-${i}`,
    output: 0n,
    weights: [pcm.cells[i]],
  }));

  return {
    id,
    pcm,
    eam,
    mrr,
    mzi,
  };
}
