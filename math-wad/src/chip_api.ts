/**
 * Chip API Layer (Backend Service Interface)
 *
 * This file exposes high-level backend functions that the blockchain layer
 * and frontend will eventually call. It wraps the chip model, photonic compute,
 * and R3 engine into clean service endpoints.
 *
 * This completes the backend "chip" layer.
 */

import { Chip, chipStep, chipConverge, createChip } from "./chip";
import { ConstitutionalState, createInitialConstitutionalState } from "./csl_state";
import { Wad } from "./csl_state";

/**
 * Create a full chip with initial constraints and weights.
 */
export function apiCreateChip(
  id: string,
  nodes: number,
  constraintIds: string[],
  weights: { id: string; weight: Wad }[],
  initialInput: Wad = 1_000_000_000_000_000_000n
): Chip {
  const initialState: ConstitutionalState = createInitialConstitutionalState(
    id,
    constraintIds,
    weights,
    {}
  );

  return createChip(
    { id, nodes, initialInput },
    initialState
  );
}

/**
 * Run a single backend chip step.
 */
export function apiChipStep(chip: Chip): Chip {
  return chipStep(chip);
}

/**
 * Run backend chip until fully compliant or maxSteps reached.
 */
export function apiChipConverge(chip: Chip, maxSteps: number = 10): Chip {
  return chipConverge(chip, maxSteps);
}

/**
 * Get current chip state (for blockchain or frontend).
 */
export function apiGetChipState(chip: Chip): ConstitutionalState {
  return chip.state;
}

/**
 * Update chip input (e.g., new encrypted inference payload).
 */
export function apiSetChipInput(chip: Chip, input: Wad): Chip {
  return {
    ...chip,
    input,
  };
}
