"use client";

import React from "react";
import CandidateList from "../../components/CandidateList";
import VoteForm from "../../components/VoteForm";

const CandidatesPage: React.FC = () => {
  const Header = "Candidates List";

  return (
    <div className="min-h-screen ">
      <nav className=" shadow-lg">{/* Add navigation bar similar to Home page */}</nav>
      <main className="max-w-6xl mx-auto mt-6 px-4">
        <h1 className="text-3xl font-bold  mb-4">Candidates</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-bold  mb-4">{Header}</h2>
            <CandidateList />
          </div>
          <div>
            <h2 className="text-2xl font-bold  mb-4">Cast Your Vote</h2>
            <VoteForm />
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-lg mt-8">{/* Add footer similar to Home page */}</footer>
    </div>
  );
};

export default CandidatesPage;
