"use client";

import React from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

// Assuming you're using wagmi for provider/signer management
// Import your ABI and contract address

const VoterRegistrationForm: React.FC = () => {
  const { writeContractAsync: writeYourContractAsync, isMining } = useScaffoldWriteContract("QuadraticVoting");

  const handleRegister = async () => {
    console.log("Registering...");
  };

  return (
    <form onSubmit={() => handleRegister()} className="space-y-4">
      <button
        className="btn btn-secondary"
        type="button"
        onClick={async () => {
          try {
            await writeYourContractAsync({
              functionName: "registerVoter",
            });
          } catch (e) {
            console.error("Error setting greeting:", e);
          }
        }}
      >
        {isMining ? "Registering..." : "Register as Voter"}
      </button>
    </form>
  );
};

export default VoterRegistrationForm;

// {error && <p className="text-red-500 mt-2">{error}</p>}
//       {success && <p className="text-green-500 mt-2">{success}</p>}
