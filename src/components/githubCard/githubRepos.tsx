import { fetchGithubRepos, type GithubRepo } from "@/lib/github";

export default async function GithubRepos({ username = "salehalobaylan", limit = 5 }: { username?: string; limit?: number }) {
  let repos: GithubRepo[] = [];
  try {
    repos = await fetchGithubRepos(username, { limit, sort: "updated", direction: "desc" });
  } catch {
    return null;
  }

  if (!repos.length) return null;

  return (
    <div className="w-full max-w-4xl 2xl:max-w-5xl mt-3 md:mt-6 rounded-lg border border-neutral-800 bg-black/20 p-3 md:p-5">
      <div className="mb-2 md:mb-3 text-sm md:text-base font-medium text-neutral-300">Recent Repos</div>
      <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
        {repos.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-2 md:gap-4">
            <a href={r.html_url} target="_blank" rel="noreferrer" className="hover:underline text-neutral-200">
              {r.name}
            </a>
            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-neutral-400">
              {r.language ? <span>{r.language}</span> : null}
              <span>★ {r.stargazers_count}</span>
              <span>⑂ {r.forks_count}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
