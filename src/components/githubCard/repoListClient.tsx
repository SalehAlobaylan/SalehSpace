"use client";

import { useState } from "react";
import { GithubRepo } from "@/lib/github";

interface RepoListClientProps {
  repos: GithubRepo[];
}

export default function RepoListClient({ repos }: RepoListClientProps) {
  const [expandedRepo, setExpandedRepo] = useState<number | null>(null);

  const toggleRepo = (id: number) => {
    setExpandedRepo(expandedRepo === id ? null : id);
  };

  return (
    <div className="mt-4">
      <h3 className="text-sm font-mono uppercase tracking-wider opacity-50 mb-3">
        Recent Repositories
      </h3>
      <div className="space-y-3">
        {repos.map((repo) => (
          <div
            key={repo.id}
          className={`repo-card bg-[#013837]/40 border border-[#F6E5C6]/5 hover:border-[#F6E5C6]/20 rounded-lg p-3 md:p-4 cursor-pointer transition-all ${
            expandedRepo === repo.id ? "expanded" : ""
          }`}
          onClick={() => toggleRepo(repo.id)}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
              <span className="text-[#FFB703] opacity-80 shrink-0">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg>
              </span>
              <h3 className="font-semibold text-base md:text-lg truncate min-w-0">{repo.name}</h3>
            </div>
            <div className="flex items-center gap-3 md:gap-4 text-xs opacity-60 font-mono shrink-0 pl-6 sm:pl-0">
              {repo.language && <span className="truncate max-w-[80px]">{repo.language}</span>}
              <span className="whitespace-nowrap">★ {repo.stargazers_count}</span>
            </div>
          </div>
          <div className="repo-details text-sm opacity-80 pl-6 md:pl-8">
            <p className="mb-3">{repo.description || "No description available."}</p>
            <div className="flex flex-wrap gap-2">
                {repo.language && (
                    <span className="px-2 py-1 bg-[#045C5A] rounded text-[10px] uppercase">
                        {repo.language}
                    </span>
                )}
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="px-2 py-1 bg-[#FFB703] text-[#013837] rounded text-[10px] uppercase font-bold hover:opacity-80" onClick={(e) => e.stopPropagation()}>
                    View Code
                </a>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
