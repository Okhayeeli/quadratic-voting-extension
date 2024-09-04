"use client";

import React, { useState } from "react";
import { useScaffoldReadContract, useScaffoldWriteContract } from "../hooks/scaffold-eth";
import { useAccount } from "wagmi";

const VoteForm: React.FC = () => {
  const { address } = useAccount();
  const [candidateId, setCandidateId] = useState<number>(0);
  const [credits, setCredits] = useState<number>(0);
  const [votes] = useState<number>(0);

  const { data: creditBalance } = useScaffoldReadContract({
    contractName: "QuadraticVoting",
    functionName: "getCreditBalance",
    args: [address],
  });

  const { data: candidates } = useScaffoldReadContract({
    contractName: "QuadraticVoting",
    functionName: "getAllCandidates",
  });
  const { writeContractAsync } = useScaffoldWriteContract("QuadraticVoting");

  const handleVoteAndAttest = async () => {
    try {
      await writeContractAsync({
        functionName: "castVote",
        args: [BigInt(candidateId), BigInt(credits)],
      });

      if (address) {
        await writeContractAsync({
          functionName: "attestVote",
          args: [address, BigInt(candidateId), BigInt(credits), BigInt(votes)],
        });
      } else {
        console.error("No address available");
      }
    } catch (e) {
      console.error("Error casting vote and attesting:", e);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <h2>Cast Your Vote</h2>
      <select
        className="select select-ghost w-full max-w-xs  select-primary"
        onChange={e => setCandidateId(parseInt(e.target.value))}
        value={candidateId}
      >
        <option value={0}>Select Candidate</option>
        {candidates &&
          candidates.map((candidate: any, index: number) => (
            <option key={index} value={index + 1}>
              {candidate.name}
            </option>
          ))}
      </select>
      No of credits(Total: {creditBalance?.toString() || 0})
      <div>
        <input
          type="number"
          value={credits}
          onChange={e => setCredits(parseInt(e.target.value))}
          placeholder="Enter credits to vote"
          className="input input-secondary focus-within:border-transparent focus:outline-none focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-1/2 font-medium placeholder:text-accent/50 text-gray-400"
        />
        <button className="btn btn-secondary" onClick={handleVoteAndAttest}>
          Vote and attest
        </button>
      </div>
    </div>
  );
};

export default VoteForm;
