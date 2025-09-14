import Image from "next/image";

type GithubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  public_repos: number;
  html_url: string;
};

const GITHUB_API = "https://api.github.com";

function getGithubAuthHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

async function fetchGithubUser(username: string): Promise<GithubUser> {
  const res = await fetch(`${GITHUB_API}/users/${username}`, {
    headers: getGithubAuthHeaders(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub user: ${res.status}`);
  }
  return res.json();
}

async function fetchGithubReadme(username: string): Promise<string> {
  const res = await fetch(`${GITHUB_API}/repos/${username}/${username}/readme`, {
    headers: { ...getGithubAuthHeaders(), Accept: "application/vnd.github.v3.html" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch README: ${res.status}`);
  }
  return res.text();
}

export default async function GithubPreview({ username = "salehalobaylan" }: { username?: string }) {
  let user: GithubUser | null = null;
  let readmeHtml = "";

  try {
    [user, readmeHtml] = await Promise.all([
      fetchGithubUser(username),
      fetchGithubReadme(username),
    ]);
  } catch (err) {
    console.log("failed fetch github account" + err);
    return (
      <a href="https://github.com/salehalobaylan" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-80">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        GitHub
      </a>
    );
  }

  return (
    <div className="w-full max-w-2xl rounded-xl border border-neutral-200/20 bg-neutral-900/40 p-4 text-neutral-200">
      <div className="flex items-center gap-4">
        <Image
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          width={64}
          height={64}
          className="rounded-full border border-neutral-700"
        />
        <div className="flex flex-col">
          <a href={user.html_url} target="_blank" rel="noreferrer" className="text-lg font-semibold hover:underline">
            {user.name ?? user.login}
          </a>
          {user.bio ? (
            <p className="text-sm text-neutral-400">{user.bio}</p>
          ) : null}
          <div className="mt-1 text-xs text-neutral-400">
            Followers {user.followers} • Repos {user.public_repos}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm font-medium text-neutral-300">README</div>
        <div
          className="gh-readme rounded-lg border border-neutral-800 bg-black/20 p-4 text-sm leading-6 max-h-[60vh] overflow-auto"
          dangerouslySetInnerHTML={{ __html: readmeHtml.replaceAll('<img ', '<img loading=\"lazy\" ') }}
        />
      </div>

      <div className="mt-4 text-right text-xs">
        <a href={user.html_url} target="_blank" rel="noreferrer" className="text-neutral-400 hover:underline">
          View on GitHub →
        </a>
      </div>
    </div>
  );
}