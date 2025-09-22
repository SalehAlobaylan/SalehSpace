import { fetchGithubReadmeHtml } from "@/lib/github";

export default async function GithubReadme({ owner = "salehalobaylan", repo = "salehalobaylan" }: { owner?: string; repo?: string }) {
  try {
    const html = await fetchGithubReadmeHtml(owner, repo, { timeoutMs: 2500 });
    if (!html) return null;
    return (
      <div className="w-full max-w-4xl 2xl:max-w-5xl mt-3 md:mt-6">
        <div
          className="gh-readme rounded-lg border border-neutral-800 bg-black/20 p-4 md:p-6 text-sm md:text-base leading-6 md:leading-7 max-h-[60vh] md:max-h-[70vh] overflow-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  } catch {
    return null;
  }
}
