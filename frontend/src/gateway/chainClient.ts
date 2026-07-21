/**
 * chainClient.ts
 *
 * Frontend → Blockchain Gateway Client
 *
 * This file provides a typed interface for the frontend to interact with:
 *  - ThetaGateway
 *  - CoherenceKeeper
 *  - RUSSELL_SINGULARITY_ENGINE
 *  - AlphaKernel
 *  - SigmaAudit
 *  - RegulatorOracle
 *
 * It does NOT contain UI code.
 * It is the frontend-side blockchain bridge.
 */

import { ethers } from "ethers";

// ------------------------------------------------------------
// Contract ABIs (placeholder — backend will auto-generate)
// ------------------------------------------------------------

import ThetaGatewayABI from "./abi/ThetaGateway.json";
import CoherenceKeeperABI from "./abi/CoherenceKeeper.json";
import RussellEngineABI from "./abi/RUSSELL_SINGULARITY_ENGINE.json";
import AlphaKernelABI from "./abi/AlphaKernel.json";
import SigmaAuditABI from "./abi/SigmaAudit.json";
import RegulatorOracleABI from "./abi/RegulatorOracle.json";

// ------------------------------------------------------------
// Client Class
// ------------------------------------------------------------

export class ChainClient {
  provider: ethers.providers.Provider;
  signer: ethers.Signer;

  thetaGateway: ethers.Contract;
  coherenceKeeper: ethers.Contract;
  russellEngine: ethers.Contract;
  alphaKernel: ethers.Contract;
  sigmaAudit: ethers.Contract;
  regulatorOracle: ethers.Contract;

  constructor(
    provider: ethers.providers.Provider,
    signer: ethers.Signer,
    addresses: {
      thetaGateway: string;
      coherenceKeeper: string;
      russellEngine: string;
      alphaKernel: string;
      sigmaAudit: string;
      regulatorOracle: string;
    }
  ) {
    this.provider = provider;
    this.signer = signer;

    this.thetaGateway = new ethers.Contract(
      addresses.thetaGateway,
      ThetaGatewayABI,
      signer
    );

    this.coherenceKeeper = new ethers.Contract(
      addresses.coherenceKeeper,
      CoherenceKeeperABI,
      signer
    );

    this.russellEngine = new ethers.Contract(
      addresses.russellEngine,
      RussellEngineABI,
      signer
    );

    this.alphaKernel = new ethers.Contract(
      addresses.alphaKernel,
      AlphaKernelABI,
      signer
    );

    this.sigmaAudit = new ethers.Contract(
      addresses.sigmaAudit,
      SigmaAuditABI,
      signer
    );

    this.regulatorOracle = new ethers.Contract(
      addresses.regulatorOracle,
      RegulatorOracleABI,
      signer
    );
  }

  // ------------------------------------------------------------
  // Backend → Chain Actions
  // ------------------------------------------------------------

  async submitCoherence(commit: string, nonce: bigint, score: bigint) {
    return await this.thetaGateway.submitCoherence(commit, nonce, score);
  }

  async submitTensor(
    commit: string,
    nonce: bigint,
    score: bigint,
    satisfied: bigint[]
  ) {
    return await this.thetaGateway.submitTensor(
      commit,
      nonce,
      score,
      satisfied
    );
  }

  async submitJurisdiction(jurisdiction: string, constraints: string[]) {
    return await this.thetaGateway.submitJurisdiction(
      jurisdiction,
      constraints
    );
  }

  async submitAuditProof(
    proofHash: string,
    jurisdiction: string,
    auditor: string
  ) {
    return await this.thetaGateway.submitAuditProof(
      proofHash,
      jurisdiction,
      auditor
    );
  }

  async submitRegulatoryFlags(jurisdiction: string, flags: string[]) {
    return await this.thetaGateway.submitRegulatoryFlags(
      jurisdiction,
      flags
    );
  }

  // ------------------------------------------------------------
  // Frontend → Chain Queries
  // ------------------------------------------------------------

  async getCoherenceRecord() {
    return await this.coherenceKeeper.getCoherenceRecord();
  }

  async getTensor() {
    return await this.russellEngine.getTensor();
  }

  async getJurisdictionConstraints(jurisdiction: string) {
    return await this.alphaKernel.getJurisdictionConstraints(jurisdiction);
  }

  async getAudit(index: number) {
    return await this.sigmaAudit.getAudit(index);
  }

  async getRegulatoryFlags(jurisdiction: string) {
    return await this.regulatorOracle.getRegulatoryFlags(jurisdiction);
  }
}
