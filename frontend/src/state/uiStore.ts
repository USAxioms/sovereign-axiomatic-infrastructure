/**
 * uiStore.ts
 *
 * Lightweight UI state store for:
 *  - Active chip ID
 *  - Active jurisdiction
 *  - Loading indicators
 *  - Error messages
 *  - Modal visibility
 *  - Theme preferences
 *
 * This store contains ONLY UI state.
 * It does NOT talk to the backend or blockchain.
 */

import { reactive } from "vue"; // or zustand/pinia if React — replace as needed

export function createUiStore() {
  const state = reactive({
    // Which chip the UI is currently viewing
    activeChipId: null as string | null,

    // Which jurisdiction the UI is currently viewing
    activeJurisdiction: null as string | null,

    // Global loading indicator
    loading: false,

    // Global error message
    error: null as string | null,

    // Modal visibility flags
    modals: {
      createChip: false,
      auditDetails: false,
      regulatoryDetails: false
    },

    // UI theme
    theme: "light" as "light" | "dark"
  });

  // ------------------------------------------------------------
  // UI ACTIONS
  // ------------------------------------------------------------

  function setActiveChip(id: string | null) {
    state.activeChipId = id;
  }

  function setActiveJurisdiction(j: string | null) {
    state.activeJurisdiction = j;
  }

  function setLoading(v: boolean) {
    state.loading = v;
  }

  function setError(msg: string | null) {
    state.error = msg;
  }

  function openModal(name: keyof typeof state.modals) {
    state.modals[name] = true;
  }

  function closeModal(name: keyof typeof state.modals) {
    state.modals[name] = false;
  }

  function toggleTheme() {
    state.theme = state.theme === "light" ? "dark" : "light";
  }

  // ------------------------------------------------------------
  // PUBLIC API
  // ------------------------------------------------------------

  return {
    state,
    setActiveChip,
    setActiveJurisdiction,
    setLoading,
    setError,
    openModal,
    closeModal,
    toggleTheme
  };
}
