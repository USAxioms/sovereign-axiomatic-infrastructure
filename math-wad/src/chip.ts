/**
 * Full Chip Model (Backend Software Representation)
 *
 * This file ties together:
 *  - Constitutional State (CSL)
 *  - Photonic Mesh (PCM + MZI + EAM + MRR)
 *  - Photonic Compute Pipeline
 *  - Photonic R3 Engine
 *
 * This is the backend "whole chip" abstraction.
 */

import { ConstitutionalState } from "./csl_state";
import { PhotonicMesh, createPhotonicMesh } from "./photonic_mesh";
import { photonicR3Step, photonicR3Converge } from "./photonic_r3";
import { Wad } from "./csl_state";

/**
 * Chip configuration options
 */
export interface ChipConfig {
  id: string;
  nodes: number;
  initialInput?: Wad;
}

/**
 * Full chip object
 */
export interface Chip {
  id: string;
  mesh: PhotonicMesh;
  state: ConstitutionalState;
  input: Wad;
}

/**
 * Create a full chip instance
 */
export function createChip(
  config: ChipConfig,
  initialState: ConstitutionalState
): Chip {
  const mesh = createPhotonicMesh(config.id, config.nodes);

  return {
    id: config.id,
    mesh,
    state: initialState,
    input: config.initialInput ?? 1_000_000_000_000_000_000n, // default 1.0 WAD
  };
}

/**
 * Run a single photonic R3 step on the chip
 */
export function chipStep(chip: Chip): Chip {
  const newState = photonicR3Step(chip.mesh, chip.state, chip.input);

  return {
    ...chip,
    state: newState,
  };
}

/**
 * Run multiple steps until fully compliant or maxSteps reached
 */
export function chipConverge(chip: Chip, maxSteps: number = 10): Chip {
  const newState = photonicR3Converge(chip.mesh, chip.state, chip.input, maxSteps);

  return {
    ...chip,
    state: newState,
  };
}
