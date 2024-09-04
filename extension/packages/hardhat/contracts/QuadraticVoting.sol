// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import { IEAS,  AttestationRequestData, AttestationRequest} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import { NO_EXPIRATION_TIME, EMPTY_UID } from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";



contract QuadraticVoting is Ownable {
	IEAS public immutable eas;
	bytes32 public immutable VOTING_SCHEMA_UID;
	uint256 public constant INITIAL_CREDIT_BALANCE = 100;
	uint256 public constant MAX_CREDIT_BALANCE = 500;
	uint256 public constant CREDIT_PRICE = 0.00001 ether;

	struct Candidate {
		string name;
		uint256 votes;
	}

	mapping(address => uint256) public creditBalances;
	mapping(uint256 => Candidate) public candidates;
	mapping(address => bool) public isRegistered;
	uint256[] public candidateIds;
	uint256 public nextCandidateId = 1;


	constructor(address _eas, bytes32 _votingSchemaUID) {
		eas = IEAS(_eas);
		VOTING_SCHEMA_UID = _votingSchemaUID;
	}

	function registerVoter() external {
		require(!isRegistered[msg.sender], "Voter already registered");
		creditBalances[msg.sender] = INITIAL_CREDIT_BALANCE;
		isRegistered[msg.sender] = true;
	}

	function purchaseCredits(uint256 amount) external payable {
		require(
			creditBalances[msg.sender] == 0,
			"Must have zero credits to purchase more"
		);
		uint256 cost = amount * CREDIT_PRICE;
		require(msg.value >= cost, "Insufficient payment");
		require(amount <= MAX_CREDIT_BALANCE, "Exceeds maximum credits");
		creditBalances[msg.sender] = amount;
		if (msg.value > cost) {
			payable(msg.sender).transfer(msg.value - cost);
		}
	}

	function addCandidate(string calldata name) external onlyOwner {
		uint256 candidateId = nextCandidateId++;
		candidates[candidateId] = Candidate({ name: name, votes: 0 });
		candidateIds.push(candidateId);
	}

	function castVote(uint256 candidateId, uint256 credits) external {
        require(isRegistered[msg.sender], "Voter not registered");
        require(credits <= creditBalances[msg.sender], "Insufficient credits");
        require(bytes(candidates[candidateId].name).length > 0, "Candidate does not exist");

        uint256 votes = sqrt(credits);
        creditBalances[msg.sender] -= credits;
        candidates[candidateId].votes += votes;

       
    }

function attestVote(address voter, uint256 candidateId, uint256 credits, uint256 votes) external returns(bytes32 attestationUID) {
        return eas.attest(
            AttestationRequest({
                schema: VOTING_SCHEMA_UID,
                data: AttestationRequestData({
                    recipient: address(0), // Add this line
                    expirationTime: NO_EXPIRATION_TIME,
                    revocable: false,
                    refUID: EMPTY_UID,
                    data: abi.encode(voter, candidateId, credits, votes),
                    value: 0
                })
            })
        );
    }

	function sqrt(uint256 x) internal pure returns (uint256 y) {
		uint256 z = (x + 1) / 2;
		y = x;
		while (z < y) {
			y = z;
			z = (x / z + z) / 2;
		}
	}

	function getVoteCount(uint256 candidateId) external view returns (uint256) {
		return candidates[candidateId].votes;
	}

	function getAllCandidates() external view returns (Candidate[] memory) {
		Candidate[] memory allCandidates = new Candidate[](candidateIds.length);
		for (uint i = 0; i < candidateIds.length; i++) {
			allCandidates[i] = candidates[candidateIds[i]];
		}
		return allCandidates;
	}

	function getCreditBalance(address voter) external view returns (uint256) {
		return creditBalances[voter];
	}

	receive() external payable {}
}
