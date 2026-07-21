/**
 * constitutionStore.ts
 *
 * Reactive frontend state store for:
 *  - Constitutional state (from backend chip)
 *  - Coherence record (from blockchain)
 *  - Tensor state (from blockchain)
 *  - Jurisdiction constraints (from blockchain)
 *  - Regulatory flags (from blockchain)
 *
 * This store keeps the UI synchronized with both the backend and chain.
 */

import { reactive } from "vue"; // or zustand/pinia if React — replace as needed
import type { ConstitutionalState } from "../types/ConstitutionalState";
import type { Wad } from "../types/Wad";

import { ConstitutionService } from "../services/ConstitutionService";

export function createConstitutionStore(service: ConstitutionService) {
  const state = reactive({
    chipState: null as ConstitutionalState | null,
    coherenceRecord: null as any,
    tensor: null as any,
    jurisdiction: {} as Record<string, string[]>,
    regulatory: {} as Record<string, string[]>,
    loading: false,
    error: null as string | null
  });

  // ------------------------------------------------------------
  // LOAD CHIP STATE
  // ------------------------------------------------------------

  async function loadChipState(chipId: string) {
    try {
      state.loading = true;
      state.chipState = await service.getState(chipId);
    } catch (err: any) {
      state.error = err.message;
    } finally {
      state.loading = false;
    }
  }

  // ------------------------------------------------------------
  // LOAD COHERENCE RECORD
  // ------------------------------------------------------------

  async function loadCoherence() {
    try {
      state.loading = true;
      state.coherenceRecord = await service.getCoherenceRecord();
    } catch (err: any) {
      state.error = err.message;
    } finally {
      state.loading = false;
    }
  }

  // ------------------------------------------------------------
  // LOAD TENSOR
  // ------------------------------------------------------------

  async function loadTensor() {
    try {
      state.loading = true;
      state.tensor = await service.getTensor();
    } catch (err: any) {
      state.error = err.message;
    } finally {
      state.loading = false;
    }
  }

  // ------------------------------------------------------------
  // LOAD JURISDICTION CONSTRAINTS
  // ------------------------------------------------------------

  async function loadJurisdiction(jurisdiction: string) {
    try {
      state.loading = true;
      state.jurisdiction[jurisdiction] =
        await service.getJurisdictionConstraints(jurisdiction);
    } catch (err: any) {
      state.error = err.message;
    } finally {
      state.loading = false;
    }
  }

  // ------------------------------------------------------------
  // LOAD REGULATORY FLAGS
  // ------------------------------------------------------------

  async function loadRegulatory(jurisdiction: string) {
    try {
      state.loading = true;
      state.regulatory[jurisdiction] =
        await service.getRegulatoryFlags(jurisdiction);
    } catch (err: any) {
      state.error = err.message;
    } finally {
      state.loading = false;
    }
  }

  // ------------------------------------------------------------
  // PUBLIC API
  // ------------------------------------------------------------

  return {
    state,
    loadChipState,
    loadCoherence,
    loadTensor,
    loadJurisdiction,
    loadRegulatory
  };
}
