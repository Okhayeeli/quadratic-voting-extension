"use client";

import React from "react";
import Link from "next/link";
import VoterRegistrationForm from "../components/VoterRegistrationForm";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen ">
      <main className="max-w-6xl mx-auto mt-6 px-4">
        <h1 className="text-3xl font-bold  mb-4">Welcome to Quadratic Voting</h1>
        <p className=" mb-6">Register as a voter to get started!</p>

        <div className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <VoterRegistrationForm />
        </div>

        <div className="bg-secondary shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Next Steps</h2>
          <ul className="list-disc list-inside">
            <li>
              <Link href="/candidates" className="text-blue-500 hover:text-blue-800">
                View and Vote for Candidates
              </Link>
            </li>
            <li>
              <Link href="/purchase-credits" className="text-blue-500 hover:text-blue-800">
                Purchase Voting Credits
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-blue-500 hover:text-blue-800">
                View Voting Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </main>

      <footer className="bg-secondary shadow-lg mt-8">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-center text-gray-500">© 2024 Quadratic Voting DApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
