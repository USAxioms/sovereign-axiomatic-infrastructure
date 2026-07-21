/**
 * chipClient.ts
 *
 * Frontend → Backend Chip Gateway
 *
 * This file provides a typed interface for the frontend to interact with:
 *  - Backend chip API
 *  - Photonic R3 engine (via backend)
 *  - Constitutional state (via backend)
 *  - Encryption layer (via backend)
 *
 * It does NOT contain UI code.
 * It is the frontend-side backend bridge.
 */

import axios from "axios";
import type { ConstitutionalState } from "../../types/ConstitutionalState";
import type { Wad } from "../../types/Wad";

export class ChipClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // ------------------------------------------------------------
  // Chip Creation
  // ------------------------------------------------------------

  async createChip(
    id: string,
    nodes: number,
    constraintIds: string[],
    weights: { id: string; weight: Wad }[],
    initialInput: Wad
  ) {
    const res = await axios.post(`${this.baseUrl}/chip/create`, {
      id,
      nodes,
      constraintIds,
      weights,
      initialInput
    });

    return res.data;
  }

  // ------------------------------------------------------------
  // Chip Execution (R3)
  // ------------------------------------------------------------

  async step(chipId: string) {
    const res = await axios.post(`${this.baseUrl}/chip/step`, { chipId });
    return res.data;
  }

  async converge(chipId: string, maxSteps: number = 10) {
    const res = await axios.post(`${this.baseUrl}/chip/converge`, {
      chipId,
      maxSteps
    });

    return res.data;
  }

  // ------------------------------------------------------------
  // Chip State
  // ------------------------------------------------------------

  async getState(chipId: string): Promise<ConstitutionalState> {
    const res = await axios.get(`${this.baseUrl}/chip/state/${chipId}`);
    return res.data;
  }

  // ------------------------------------------------------------
  // Chip Input
  // ------------------------------------------------------------

  async setInput(chipId: string, input: Wad) {
    const res = await axios.post(`${this.baseUrl}/chip/input`, {
      chipId,
      input
    });

    return res.data;
  }

  // ------------------------------------------------------------
  // Encryption Layer
  // ------------------------------------------------------------

  async encrypt(value: Wad): Promise<Wad> {
    const res = await axios.post(`${this.baseUrl}/encrypt`, { value });
    return res.data.cipher;
  }

  async decrypt(cipher: Wad): Promise<Wad> {
    const res = await axios.post(`${this.baseUrl}/decrypt`, { cipher });
    return res.data.plain;
  }

  // ------------------------------------------------------------
  // Commitments
  // ------------------------------------------------------------

  async commit(chipId: string) {
    const res = await axios.post(`${this.baseUrl}/chip/commit`, { chipId });
    return res.data;
  }

  async verifyCommit(chipId: string, nonce: bigint, commit: string) {
    const res = await axios.post(`${this.baseUrl}/chip/verifyCommit`, {
      chipId,
      nonce,
      commit
    });

    return res.data.valid;
  }
}
