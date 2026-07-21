// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * OMEGA Contract
 *
 * This is the genesis anchor of the CSL on-chain mirror.
 * It stores:
 *  - The initial commitment of the chip state
 *  - The nonce used to generate that commitment
 *  - The block number of deployment (immutable timestamp)
 *
 * Backend → blockchain bridge will call:
 *    bridgeCommitState(chip)
 *
 * This contract does NOT run R3.
 * It is the anchor and registry for the chip's constitutional identity.
 */

contract OMEGA {
    // Commitment of the initial CSL state
    string public genesisCommit;

    // Nonce used to generate the commitment
    uint256 public genesisNonce;

    // Deployment block number (immutable timestamp)
    uint256 public genesisBlock;

    // Owner (backend deployer)
    address public owner;

    // Event emitted when OMEGA is initialized
    event OMEGA_INITIALIZE(
        string commit,
        uint256 nonce,
        uint256 blockNumber,
        address indexed initializer
    );

    constructor(string memory _commit, uint256 _nonce) {
        owner = msg.sender;
        genesisCommit = _commit;
        genesisNonce = _nonce;
        genesisBlock = block.number;

        emit OMEGA_INITIALIZE(
            _commit,
            _nonce,
            block.number,
            msg.sender
        );
    }

    /**
     * Return the full genesis record.
     */
    function getGenesisRecord()
        external
        view
        returns (
            string memory commit,
            uint256 nonce,
            uint256 blockNumber,
            address initializer
        )
    {
        return (
            genesisCommit,
            genesisNonce,
            genesisBlock,
            owner
        );
    }
}
