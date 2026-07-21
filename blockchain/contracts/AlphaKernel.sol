// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * AlphaKernel
 *
 * The AlphaKernel is the jurisdiction + constraint‑activation router.
 *
 * Responsibilities:
 *  - Maintain jurisdictional constraint groups
 *  - Activate / deactivate constraints based on:
 *        • region
 *        • regulatory mode
 *        • backend chip signals
 *  - Provide chain‑side policy routing
 *  - Emit events for every jurisdictional transition
 *
 * NOTE:
 *  This contract does NOT compute R3.
 *  It simply routes which constraints are active for the backend chip.
 */

contract AlphaKernel {
    // Owner (backend)
    address public owner;

    // Jurisdiction → active constraint IDs
    mapping(string => string[]) private jurisdictionConstraints;

    // Event emitted when jurisdiction routing changes
    event JURISDICTION_UPDATE(
        string jurisdiction,
        string[] activeConstraints,
        uint256 blockNumber,
        address indexed updater
    );

    constructor() {
        owner = msg.sender;
    }

    /**
     * Set active constraints for a jurisdiction.
     */
    function setJurisdictionConstraints(
        string memory jurisdiction,
        string[] memory constraints
    ) external {
        require(msg.sender == owner, "Only backend can update jurisdiction");

        jurisdictionConstraints[jurisdiction] = constraints;

        emit JURISDICTION_UPDATE(
            jurisdiction,
            constraints,
            block.number,
            msg.sender
        );
    }

    /**
     * Get active constraints for a jurisdiction.
     */
    function getJurisdictionConstraints(
        string memory jurisdiction
    ) external view returns (string[] memory) {
        return jurisdictionConstraints[jurisdiction];
    }

    /**
     * Check if a constraint is active in a jurisdiction.
     */
    function isConstraintActive(
        string memory jurisdiction,
        string memory constraintId
    ) external view returns (bool) {
        string[] memory list = jurisdictionConstraints[jurisdiction];

        for (uint256 i = 0; i < list.length; i++) {
            if (keccak256(bytes(list[i])) == keccak256(bytes(constraintId))) {
                return true;
            }
        }
        return false;
    }
}
