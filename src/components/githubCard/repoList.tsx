import { fetchGithubRepos } from "@/lib/github";
import RepoListClient from "./repoListClient";

const EXCLUDED_REPOS = ["SalehAlobaylan", "SalehSpace"];

export default async function RepoList({ username = "salehalobaylan", limit = 5 }: { username?: string; limit?: number }) {
  try {
    // Fetch more items to account for exclusions
    const repos = await fetchGithubRepos(username, { limit: limit + EXCLUDED_REPOS.length, sort: "updated", direction: "desc" });
    
    if (!repos || repos.length === 0) return null;

    const filteredRepos = repos
      .filter((repo) => !EXCLUDED_REPOS.includes(repo.name))
      .slice(0, limit);

    return <RepoListClient repos={filteredRepos} />;
  } catch (error) {
    console.error("Failed to fetch repos:", error);
    return null;
  }
}
