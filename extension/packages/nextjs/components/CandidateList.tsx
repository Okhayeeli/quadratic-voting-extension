"use client";

import React from "react";
import { useScaffoldReadContract } from "../hooks/scaffold-eth";

const CandidateList: React.FC = () => {
  const { data: allCandidates } = useScaffoldReadContract({
    contractName: "QuadraticVoting",
    functionName: "getAllCandidates",
  });

  console.log(allCandidates);

  return (
    <div>
      <h2>Candidates</h2>
      <ul>
        {allCandidates &&
          allCandidates.map((candidate, index) => (
            <li key={index}>
              {candidate.name}: {candidate.votes.toString() || 0} votes
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CandidateList;
