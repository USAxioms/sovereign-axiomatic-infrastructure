// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * RegulatorOracle
 *
 * This contract represents the regulatory authority signaling layer.
 *
 * Responsibilities:
 *  - Store regulatory flags per jurisdiction
 *  - Allow authorized regulators to update compliance requirements
 *  - Provide override signals to the backend chip
 *  - Emit events for every regulatory change
 *
 * NOTE:
 *  This contract does NOT enforce compliance.
 *  It simply provides authoritative regulatory signals that the backend chip
 *  and AlphaKernel will consume.
 */

contract RegulatorOracle {
    // Owner (backend)
    address public owner;

    // Authorized regulators
    mapping(address => bool) public regulators;

    // Regulatory flags per jurisdiction
    mapping(string => string[]) private regulatoryFlags;

    // Event emitted when a regulator is added
    event REGULATOR_ADDED(address indexed regulator);

    // Event emitted when a regulator is removed
    event REGULATOR_REMOVED(address indexed regulator);

    // Event emitted when regulatory flags change
    event REGULATORY_UPDATE(
        string jurisdiction,
        string[] flags,
        uint256 blockNumber,
        address indexed regulator
    );

    constructor() {
        owner = msg.sender;
        regulators[msg.sender] = true; // backend is default regulator
    }

    /**
     * Add a new authorized regulator.
     */
    function addRegulator(address regulator) external {
        require(msg.sender == owner, "Only owner can add regulators");
        regulators[regulator] = true;
        emit REGULATOR_ADDED(regulator);
    }

    /**
     * Remove an authorized regulator.
     */
    function removeRegulator(address regulator) external {
        require(msg.sender == owner, "Only owner can remove regulators");
        regulators[regulator] = false;
        emit REGULATOR_REMOVED(regulator);
    }

    /**
     * Set regulatory flags for a jurisdiction.
     */
    function setRegulatoryFlags(
        string memory jurisdiction,
        string[] memory flags
    ) external {
        require(regulators[msg.sender], "Not an authorized regulator");

        regulatoryFlags[jurisdiction] = flags;

        emit REGULATORY_UPDATE(
            jurisdiction,
            flags,
            block.number,
            msg.sender
        );
    }

    /**
     * Get regulatory flags for a jurisdiction.
     */
    function getRegulatoryFlags(
        string memory jurisdiction
    ) external view returns (string[] memory) {
        return regulatoryFlags[jurisdiction];
    }

    /**
     * Check if a regulatory flag is active.
     */
    function hasFlag(
        string memory jurisdiction,
        string memory flag
    ) external view returns (bool) {
        string[] memory flags = regulatoryFlags[jurisdiction];

        for (uint256 i = 0; i < flags.length; i++) {
            if (keccak256(bytes(flags[i])) == keccak256(bytes(flag))) {
                return true;
            }
        }
        return false;
    }
}
