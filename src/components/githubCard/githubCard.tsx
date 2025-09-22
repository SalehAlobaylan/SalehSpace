import Image from "next/image";
import { fetchGithubUser } from "@/lib/github";
import { Suspense } from "react";
import GithubReadme from "./githubReadme";
import GithubRepos from "./githubRepos";

export default async function GithubCard({ username = "salehalobaylan" }: { username?: string }) {
  try {
    const user = await fetchGithubUser(username);
    return (
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto rounded-xl border border-neutral-200/20 bg-neutral-900/40 p-3 sm:p-4 md:p-6 text-neutral-200">
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <Image
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            width={64}
            height={64}
            className="rounded-full border border-neutral-700 sm:w-[80px] sm:h-[80px] md:w-[96px] md:h-[96px]"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <a href={user.html_url} target="_blank" rel="noreferrer" className="text-base sm:text-lg md:text-2xl font-semibold hover:underline truncate">
              {user.name ?? user.login}
            </a>
            {user.bio ? (
              <p className="text-xs sm:text-sm md:text-base text-neutral-400 line-clamp-2">{user.bio}</p>
            ) : null}
            <div className="mt-1 text-xs sm:text-sm text-neutral-400">
              Followers {user.followers} • Repos {user.public_repos}
            </div>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 md:mt-6 text-right text-xs sm:text-sm">
          <a href={user.html_url} target="_blank" rel="noreferrer" className="text-neutral-400 hover:underline">
            View on GitHub →
          </a>
        </div>
            <Suspense> {/* Suspense insure the page don't overlode the website */}
                <GithubReadme />
            </Suspense>
            <GithubRepos />

      </div>
    );
  } catch {
    return (
      <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-80">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386C24 5.373 18.627 0 12 0z"/>
        </svg>
        GitHub
      </a>
    );
  }
}
