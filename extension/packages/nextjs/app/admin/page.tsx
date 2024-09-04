"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const AdminPage = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useScaffoldWriteContract("QuadraticVoting");

  const { data: owner } = useScaffoldReadContract({
    contractName: "QuadraticVoting",
    functionName: "owner",
  });

  const [name, setName] = useState<string>("");

  const handleAdd = async () => {
    try {
      await writeContractAsync({
        functionName: "addCandidate",
        args: [name],
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  };

  return (
    <div>
      {owner === address ? (
        <div className="flex flex-col gap-1 p-6">
          <h2>Add candidate</h2>
          <div>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Candidate Name"
              className="input input-secondary focus-within:border-transparent focus:outline-none focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-1/3 font-medium placeholder:text-accent/50 text-gray-400"
            />
            <button className="btn btn-secondary" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8">Access Denied</div>
      )}
    </div>
  );
};

export default AdminPage;
