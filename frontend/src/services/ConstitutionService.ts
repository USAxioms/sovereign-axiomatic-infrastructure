/**
 * ConstitutionService.ts
 *
 * Unified frontend service that merges:
 *  - Backend chip client
 *  - Blockchain chain client
 *
 * This gives the UI a single, clean interface for:
 *  - Running R3 (via backend)
 *  - Reading constitutional state (via backend)
 *  - Anchoring commitments (via chain)
 *  - Submitting tensor updates (via chain)
 *  - Submitting audit proofs (via chain)
 *  - Reading regulatory flags (via chain)
 */

import { ChipClient } from "../gateway/chipClient";
import { ChainClient } from "../gateway/chainClient";

import type { ConstitutionalState } from "../types/ConstitutionalState";
import type { Wad } from "../types/Wad";

export class ConstitutionService {
  chip: ChipClient;
  chain: ChainClient;

  constructor(chip: ChipClient, chain: ChainClient) {
    this.chip = chip;
    this.chain = chain;
  }

  // ------------------------------------------------------------
  // CHIP OPERATIONS (Backend)
  // ------------------------------------------------------------

  async createChip(
    id: string,
    nodes: number,
    constraintIds: string[],
    weights: { id: string; weight: Wad }[],
    initialInput: Wad
  ) {
    return await this.chip.createChip(
      id,
      nodes,
      constraintIds,
      weights,
      initialInput
    );
  }

  async step(chipId: string) {
    return await this.chip.step(chipId);
  }

  async converge(chipId: string, maxSteps: number = 10) {
    return await this.chip.converge(chipId, maxSteps);
  }

  async getState(chipId: string): Promise<ConstitutionalState> {
    return await this.chip.getState(chipId);
  }

  async setInput(chipId: string, input: Wad) {
    return await this.chip.setInput(chipId, input);
  }

  // ------------------------------------------------------------
  // COMMITMENTS (Backend → Chain)
  // ------------------------------------------------------------

  async commitState(chipId: string) {
    return await this.chip.commit(chipId);
  }

  async verifyCommit(chipId: string, nonce: bigint, commit: string) {
    return await this.chip.verifyCommit(chipId, nonce, commit);
  }

  // ------------------------------------------------------------
  // CHAIN OPERATIONS (Blockchain)
  // ------------------------------------------------------------

  async submitCoherence(commit: string, nonce: bigint, score: Wad) {
    return await this.chain.submitCoherence(commit, nonce, score);
  }

  async submitTensor(
    commit: string,
    nonce: bigint,
    score: Wad,
    satisfied: Wad[]
  ) {
    return await this.chain.submitTensor(commit, nonce, score, satisfied);
  }

  async submitJurisdiction(jurisdiction: string, constraints: string[]) {
    return await this.chain.submitJurisdiction(jurisdiction, constraints);
  }

  async submitAuditProof(
    proofHash: string,
    jurisdiction: string,
    auditor: string
  ) {
    return await this.chain.submitAuditProof(
      proofHash,
      jurisdiction,
      auditor
    );
  }

  async submitRegulatoryFlags(jurisdiction: string, flags: string[]) {
    return await this.chain.submitRegulatoryFlags(jurisdiction, flags);
  }

  // ------------------------------------------------------------
  // CHAIN QUERIES (Frontend → Chain)
  // ------------------------------------------------------------

  async getCoherenceRecord() {
    return await this.chain.getCoherenceRecord();
  }

  async getTensor() {
    return await this.chain.getTensor();
  }

  async getJurisdictionConstraints(jurisdiction: string) {
    return await this.chain.getJurisdictionConstraints(jurisdiction);
  }

  async getAudit(index: number) {
    return await this.chain.getAudit(index);
  }

  async getRegulatoryFlags(jurisdiction: string) {
    return await this.chain.getRegulatoryFlags(jurisdiction);
  }
}
