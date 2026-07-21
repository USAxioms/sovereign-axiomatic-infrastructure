// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * CoherenceKeeper
 *
 * This contract mirrors the backend chip’s R3 convergence process.
 *
 * Responsibilities:
 *  - Store the latest commitment of the CSL state
 *  - Accept new commitments from the backend
 *  - Verify commitment transitions
 *  - Enforce monotonic constitutional coherence:
 *
 *        V(s_next) >= V(s_prev)
 *
 *  - Emit events for the blockchain to track constitutional evolution
 *
 * NOTE:
 *  This contract does NOT compute R3.
 *  The backend chip computes R3 → produces a new commitment → submits it here.
 */

contract CoherenceKeeper {
    // Latest commitment of the CSL state
    string public latestCommit;

    // Latest nonce used to generate the commitment
    uint256 public latestNonce;

    // Satisfaction score (WAD) mirrored from backend
    uint256 public latestScore;

    // Owner (backend)
    address public owner;

    // Event emitted when a new coherent state is registered
    event COHERENCE_UPDATE(
        string commit,
        uint256 nonce,
        uint256 score,
        uint256 blockNumber,
        address indexed updater
    );

    constructor(
        string memory _initialCommit,
        uint256 _initialNonce,
        uint256 _initialScore
    ) {
        owner = msg.sender;
        latestCommit = _initialCommit;
        latestNonce = _initialNonce;
        latestScore = _initialScore;

        emit COHERENCE_UPDATE(
            _initialCommit,
            _initialNonce,
            _initialScore,
            block.number,
            msg.sender
        );
    }

    /**
     * Submit a new commitment from the backend chip.
     * Must satisfy monotonic coherence:
     *
     *      score_next >= score_prev
     */
    function submitCoherentState(
        string memory _commit,
        uint256 _nonce,
        uint256 _score
    ) external {
        require(msg.sender == owner, "Only backend can update coherence");

        // Enforce monotonic constitutional coherence
        require(
            _score >= latestScore,
            "Coherence violation: score decreased"
        );

        latestCommit = _commit;
        latestNonce = _nonce;
        latestScore = _score;

        emit COHERENCE_UPDATE(
            _commit,
            _nonce,
            _score,
            block.number,
            msg.sender
        );
    }

    /**
     * Return the full coherence record.
     */
    function getCoherenceRecord()
        external
        view
        returns (
            string memory commit,
            uint256 nonce,
            uint256 score,
            uint256 blockNumber,
            address updater
        )
    {
        return (
            latestCommit,
            latestNonce,
            latestScore,
            block.number,
            owner
        );
    }
}
