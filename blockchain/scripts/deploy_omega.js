/**
 * Deployment Script: OMEGA
 *
 * Deploys the genesis anchor contract with:
 *  - initial commitment
 *  - initial nonce
 *
 * This script is backend-side and will later be used by Hardhat/Foundry.
 */

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying OMEGA with account:", deployer.address);

  // Example values — backend will replace these dynamically
  const genesisCommit = "GENESIS_COMMIT_PLACEHOLDER";
  const genesisNonce = 123456789;

  const OMEGA = await hre.ethers.getContractFactory("OMEGA");
  const omega = await OMEGA.deploy(genesisCommit, genesisNonce);

  await omega.deployed();

  console.log("OMEGA deployed at:", omega.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
