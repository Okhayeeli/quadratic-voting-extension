"use client";

import React, { useState } from "react";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const CreditPurchasePage: React.FC = () => {
  const [creditAmount, setCreditAmount] = useState<number>(0);
  const { writeContractAsync } = useScaffoldWriteContract("QuadraticVoting");

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await writeContractAsync({
        functionName: "purchaseCredits",
        args: [BigInt(creditAmount)],
        value: parseEther("0.1"),
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  };

  return (
    <div className="min-h-screen ">
      <nav className="shadow-lg">{/* Add navigation bar similar to Home page */}</nav>

      <main className="max-w-6xl mx-auto mt-6 px-4 bg-secondary">
        <h1 className="text-3xl font-bold mb-4">Purchase Voting Credits</h1>
        <div className=" shadow-md rounded px-8 pt-6 pb-8">
          <form onSubmit={handlePurchase}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="creditAmount">
                Number of Credits (Max: 500)
              </label>
              <input
                className="input input-secondary focus-within:border-transparent focus:outline-none focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-1/2 font-medium placeholder:text-accent/50 text-gray-400"
                id="creditAmount"
                type="number"
                value={creditAmount}
                onChange={e => setCreditAmount(parseInt(e.target.value))}
                min="1"
                required
              />
            </div>
            Cost {creditAmount || 0} credits: {(creditAmount * 0.00001).toFixed(5)} ETH
            <button className="btn btn-primary ml-2" type="submit">
              Purchase Credits
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-white shadow-lg mt-8">{/* Add footer similar to Home page */}</footer>
    </div>
  );
};

export default CreditPurchasePage;
