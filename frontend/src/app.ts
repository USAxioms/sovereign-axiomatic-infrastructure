/**
 * app.ts
 *
 * Frontend bootstrap initializer.
 *
 * This file:
 *  - Creates the blockchain provider + signer
 *  - Instantiates ChainClient
 *  - Instantiates ChipClient
 *  - Instantiates ConstitutionService
 *  - Instantiates constitutionStore + uiStore
 *  - Exports everything for the UI
 */

import { ethers } from "ethers";

import { ChainClient } from "./gateway/chainClient";
import { ChipClient } from "./gateway/chipClient";
import { ConstitutionService } from "./services/ConstitutionService";

import { createConstitutionStore } from "./state/constitutionStore";
import { createUiStore } from "./state/uiStore";

// ------------------------------------------------------------
// BLOCKCHAIN SETUP
// ------------------------------------------------------------

// Replace with your actual RPC endpoint
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// Replace with actual signer (Metamask, WalletConnect, etc.)
const signer = provider.getSigner();

// Replace with deployed contract addresses
const addresses = {
  thetaGateway: "0x0000000000000000000000000000000000000001",
  coherenceKeeper: "0x0000000000000000000000000000000000000002",
  russellEngine: "0x0000000000000000000000000000000000000003",
  alphaKernel: "0x0000000000000000000000000000000000000004",
  sigmaAudit: "0x0000000000000000000000000000000000000005",
  regulatorOracle: "0x0000000000000000000000000000000000000006"
};

// Create blockchain client
const chainClient = new ChainClient(provider, signer, addresses);

// ------------------------------------------------------------
// BACKEND CHIP SETUP
// ------------------------------------------------------------

// Replace with your backend API URL
const chipClient = new ChipClient("http://localhost:3000");

// ------------------------------------------------------------
// SERVICE LAYER
// ------------------------------------------------------------

const constitutionService = new ConstitutionService(chipClient, chainClient);

// ------------------------------------------------------------
// STATE STORES
// ------------------------------------------------------------

const constitutionStore = createConstitutionStore(constitutionService);
const uiStore = createUiStore();

// ------------------------------------------------------------
// EXPORT EVERYTHING FOR THE UI
// ------------------------------------------------------------

export {
  provider,
  signer,
  chainClient,
  chipClient,
  constitutionService,
  constitutionStore,
  uiStore
};
