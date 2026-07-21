// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * SigmaAudit
 *
 * This contract anchors ZK audit proofs and regulatory verification signals.
 *
 * Responsibilities:
 *  - Store ZK proof hashes submitted by the backend chip
 *  - Store audit metadata (jurisdiction, auditor, timestamp)
 *  - Emit events for every audit submission
 *  - Provide chain-side verification hooks
 *
 * NOTE:
 *  This contract does NOT verify ZK proofs.
 *  It only anchors them on-chain.
 *  Real verification will be implemented in the ZK runtime layer.
 */

contract SigmaAudit {
    struct AuditRecord {
        string proofHash;      // Hash of the ZK proof
        string jurisdiction;   // e.g. "eu", "us.ca", "jp"
        string auditor;        // Auditor identity string
        uint256 blockNumber;   // Block when proof was anchored
        address submitter;     // Backend address
    }

    // Owner (backend)
    address public owner;

    // All audit records
    AuditRecord[] public audits;

    // Event emitted when a new audit proof is anchored
    event AUDIT_SUBMITTED(
        string proofHash,
        string jurisdiction,
        string auditor,
        uint256 blockNumber,
        address indexed submitter
    );

    constructor() {
        owner = msg.sender;
    }

    /**
     * Submit a new ZK audit proof hash.
     */
    function submitAudit(
        string memory proofHash,
        string memory jurisdiction,
        string memory auditor
    ) external {
        require(msg.sender == owner, "Only backend can submit audits");

        audits.push(
            AuditRecord({
                proofHash: proofHash,
                jurisdiction: jurisdiction,
                auditor: auditor,
                blockNumber: block.number,
                submitter: msg.sender
            })
        );

        emit AUDIT_SUBMITTED(
            proofHash,
            jurisdiction,
            auditor,
            block.number,
            msg.sender
        );
    }

    /**
     * Get total number of audits.
     */
    function getAuditCount() external view returns (uint256) {
        return audits.length;
    }

    /**
     * Get a specific audit record.
     */
    function getAudit(uint256 index)
        external
        view
        returns (
            string memory proofHash,
            string memory jurisdiction,
            string memory auditor,
            uint256 blockNumber,
            address submitter
        )
    {
        AuditRecord memory a = audits[index];
        return (
            a.proofHash,
            a.jurisdiction,
            a.auditor,
            a.blockNumber,
            a.submitter
        );
    }
}
