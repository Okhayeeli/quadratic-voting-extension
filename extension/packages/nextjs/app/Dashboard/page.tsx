"use client";

import React from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const DashboardPage: React.FC = () => {
  const { address } = useAccount();

  const { data: votingResults, isLoading: resultsLoading } = useScaffoldReadContract({
    contractName: "QuadraticVoting",
    functionName: "getAllCandidates",
  });

  const { data: userCredits, isLoading: creditsLoading } = useScaffoldReadContract({
    contractName: "QuadraticVoting",
    functionName: "getCreditBalance",
    args: [address],
  });

  return (
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto mt-6 px-4">
        <h1 className="text-3xl font-bold  mb-4">Voting Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-secondary shadow-md rounded px-8 pt-6 pb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Credits</h2>
            {creditsLoading ? (
              <p>Loading credits...</p>
            ) : (
              <p className="text-xl">{userCredits?.toString() || "0"} credits available</p>
            )}
          </div>

          <div className="bg-secondary shadow-md rounded px-8 pt-6 pb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Voting Results</h2>
            {resultsLoading ? (
              <p>Loading results...</p>
            ) : votingResults && votingResults.length > 0 ? (
              <ul>
                {votingResults.map((result: any, index: number) => (
                  <li key={index} className="mb-2">
                    {result.name}: {result.votes.toString()} votes
                  </li>
                ))}
              </ul>
            ) : (
              <p>No voting results available</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
