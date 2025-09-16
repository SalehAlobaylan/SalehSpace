export type GithubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  public_repos: number;
  html_url: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

const GITHUB_API = "https://api.github.com";
const DEFAULT_FETCH_TIMEOUT_MS = 4000;
const MAX_README_CHARS = 200_000;

export function getGithubAuthHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

export async function fetchWithTimeout(
  url: string,
  init: RequestInit & { timeoutMs?: number } = {}
) {
  const { timeoutMs = DEFAULT_FETCH_TIMEOUT_MS, ...options } = init;
  const controller = new AbortController();
  const timer = setTimeout(() => {
    try {
      controller.abort();
    } catch {}
  }, timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      next: { revalidate: 1800 },
    });
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchGithubUser(username: string): Promise<GithubUser> {
  const res = await fetchWithTimeout(`${GITHUB_API}/users/${username}`, {
    headers: getGithubAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to fetch GitHub user: ${res.status}`);
  return res.json();
}

export async function fetchGithubRepos(
  username: string,
  opts?: {
    limit?: number;
    sort?: "updated" | "pushed" | "created";
    direction?: "desc" | "asc";
  }
) {
  const limit = Math.max(1, Math.min(50, opts?.limit ?? 5));
  const sort = opts?.sort ?? "updated";
  const direction = opts?.direction ?? "desc";
  const url = `${GITHUB_API}/users/${username}/repos?per_page=${limit}&sort=${sort}&direction=${direction}`;
  const res = await fetchWithTimeout(url, {
    headers: getGithubAuthHeaders(),
    timeoutMs: 4000,
  });
  if (!res.ok) throw new Error(`Failed to fetch repos: ${res.status}`);
  const data = (await res.json()) as GithubRepo[];
  return data.slice(0, limit);
}

export function sanitizeReadmeHtml(html: string): string {
  let out = html || "";
  // remove scripts/styles
  out = out.replace(/<script[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<style[\s\S]*?<\/style>/gi, "");
  // drop heavy media/vector content completely
  out = out.replace(/<img\b[^>]*>/gi, "");
  out = out.replace(/<source\b[^>]*>/gi, "");
  out = out.replace(
    /<(video|audio|iframe|object|embed|svg|picture|canvas)\b[\s\S]*?<\/\1>/gi,
    ""
  );
  // strip inline event handlers and inline styles
  //   out = out.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  //   out = out.replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*')/gi, "");

  // neutralize javascript: and data: urls
  //   out = out.replace(/\shref\s*=\s*"\s*javascript:[^"]*"/gi, ' href="#"');
  //   out = out.replace(/\shref\s*=\s*'\s*javascript:[^']*'/gi, ' href="#"');
  //   out = out.replace(/\s(src|href)\s*=\s*"\s*data:[^"]*"/gi, "");
  //   out = out.replace(/\s(src|href)\s*=\s*'\s*data:[^']*'/gi, "");

  // ensure safe anchors
  //   out = out.replace(/<a\b([^>]*)>/gi, (_m, attrs: string) => {
  //     let a = attrs || "";
  //     if (!/\btarget\s*=/.test(a)) a += ' target="_blank"';
  //     if (!/\brel\s*=/.test(a)) a += ' rel="noopener noreferrer nofollow"';
  //     return `<a${a}>`;
  //   });

  // remove empty anchors (no inner text and no nested content) *empty tables*
  out = out.replace(/<a\b[^>]*>\s*<\/a>/gi, "");
  // hide leftover section headings that reference stripped media (socials, stack, worked with)
  out = out.replace(
    /<(h[1-6]|p|div)[^>]*>\s*(?:🌐\s*)?Socials:?\s*<\/\1>/gi,
    ""
  );
  out = out.replace(
    /<(h[1-6]|p|div)[^>]*>\s*Stacked\s+in\s+these\s*<\/\1>/gi,
    ""
  );
  out = out.replace(
    /<(h[1-6]|p|div)[^>]*>\s*And\s+worked\s+with\s+these\s*<\/\1>/gi,
    ""
  );

  // remove now-empty lists/paragraphs created by media stripping
  //   out = out.replace(/<ul[^>]*>\s*<\/ul>/gi, "");
  //   out = out.replace(/<ol[^>]*>\s*<\/ol>/gi, "");
  //   out = out.replace(/<p[^>]*>\s*<\/p>/gi, "");

  // collapse empty table rows/cells and strip fully *empty tables*
  out = out.replace(/<t[hd][^>]*>\s*<\/t[hd]>/gi, "");
  out = out.replace(/<tr[^>]*>\s*<\/tr>/gi, "");
  out = out.replace(/<thead[^>]*>\s*<\/thead>/gi, "");
  out = out.replace(/<tbody[^>]*>\s*<\/tbody>/gi, "");
  out = out.replace(/<table[^>]*>\s*<\/table>/gi, "");

  // collapse excessive whitespace
  //   out = out.replace(/\s{2,}/g, " ");
  // cap size
  if (out.length > MAX_README_CHARS) {
    out =
      out.slice(0, MAX_README_CHARS) +
      "\n<p><em>Truncated. View full README on GitHub.</em></p>";
  }
  return out.trim();
}

export async function fetchGithubReadmeHtml(
  owner: string,
  repo: string,
  opts?: { timeoutMs?: number }
): Promise<string> {
  const res = await fetchWithTimeout(
    `${GITHUB_API}/repos/${owner}/${repo}/readme`,
    {
      headers: {
        ...getGithubAuthHeaders(),
        Accept: "application/vnd.github.v3.html",
      },
      timeoutMs: opts?.timeoutMs ?? 4500,
    }
  );
  if (!res.ok) throw new Error(`Failed to fetch README: ${res.status}`);
  const html = await res.text();
  return sanitizeReadmeHtml(html);
}
