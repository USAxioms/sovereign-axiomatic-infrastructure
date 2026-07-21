// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * ThetaGateway
 *
 * The ThetaGateway is the unified blockchain entry point for:
 *  - Backend chip submissions
 *  - Contract suite coordination
 *  - Frontend queries
 *
 * It does NOT compute R3.
 * It routes:
 *  - Commitments → OMEGA / CoherenceKeeper
 *  - Tensor updates → RUSSELL_SINGULARITY_ENGINE
 *  - Jurisdiction updates → AlphaKernel
 *  - ZK proofs → SigmaAudit
 *  - Regulatory flags → RegulatorOracle
 *
 * This contract is the "front door" of the chain layer.
 */

interface ICoherenceKeeper {
    function submitCoherentState(
        string memory _commit,
        uint256 _nonce,
        uint256 _score
    ) external;
}

interface IRussellEngine {
    function submitTensorUpdate(
        string memory commit,
        uint256 nonce,
        uint256 score,
        uint256[] memory newSatisfied
    ) external;
}

interface IAlphaKernel {
    function setJurisdictionConstraints(
        string memory jurisdiction,
        string[] memory constraints
    ) external;
}

interface ISigmaAudit {
    function submitAudit(
        string memory proofHash,
        string memory jurisdiction,
        string memory auditor
    ) external;
}

interface IRegulatorOracle {
    function setRegulatoryFlags(
        string memory jurisdiction,
        string[] memory flags
    ) external;
}

contract ThetaGateway {
    address public owner;

    ICoherenceKeeper public coherenceKeeper;
    IRussellEngine public russellEngine;
    IAlphaKernel public alphaKernel;
    ISigmaAudit public sigmaAudit;
    IRegulatorOracle public regulatorOracle;

    event GATEWAY_UPDATE(
        string action,
        uint256 blockNumber,
        address indexed caller
    );

    constructor(
        address _coherenceKeeper,
        address _russellEngine,
        address _alphaKernel,
        address _sigmaAudit,
        address _regulatorOracle
    ) {
        owner = msg.sender;

        coherenceKeeper = ICoherenceKeeper(_coherenceKeeper);
        russellEngine = IRussellEngine(_russellEngine);
        alphaKernel = IAlphaKernel(_alphaKernel);
        sigmaAudit = ISigmaAudit(_sigmaAudit);
        regulatorOracle = IRegulatorOracle(_regulatorOracle);
    }

    // ------------------------------------------------------------
    // Backend → Chain Routing
    // ------------------------------------------------------------

    function submitCoherence(
        string memory commit,
        uint256 nonce,
        uint256 score
    ) external {
        require(msg.sender == owner, "Only backend can submit");

        coherenceKeeper.submitCoherentState(commit, nonce, score);

        emit GATEWAY_UPDATE("coherence", block.number, msg.sender);
    }

    function submitTensor(
        string memory commit,
        uint256 nonce,
        uint256 score,
        uint256[] memory satisfied
    ) external {
        require(msg.sender == owner, "Only backend can submit");

        russellEngine.submitTensorUpdate(commit, nonce, score, satisfied);

        emit GATEWAY_UPDATE("tensor", block.number, msg.sender);
    }

    function submitJurisdiction(
        string memory jurisdiction,
        string[] memory constraints
    ) external {
        require(msg.sender == owner, "Only backend can submit");

        alphaKernel.setJurisdictionConstraints(jurisdiction, constraints);

        emit GATEWAY_UPDATE("jurisdiction", block.number, msg.sender);
    }

    function submitAuditProof(
        string memory proofHash,
        string memory jurisdiction,
        string memory auditor
    ) external {
        require(msg.sender == owner, "Only backend can submit");

        sigmaAudit.submitAudit(proofHash, jurisdiction, auditor);

        emit GATEWAY_UPDATE("audit", block.number, msg.sender);
    }

    function submitRegulatoryFlags(
        string memory jurisdiction,
        string[] memory flags
    ) external {
        require(msg.sender == owner, "Only backend can submit");

        regulatorOracle.setRegulatoryFlags(jurisdiction, flags);

        emit GATEWAY_UPDATE("regulatory", block.number, msg.sender);
    }
}
