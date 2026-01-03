import { fetchGithubReadmeHtml } from "@/lib/github";

export default async function GithubReadme({ owner = "salehalobaylan", repo = "salehalobaylan" }: { owner?: string; repo?: string }) {
  try {
    const html = await fetchGithubReadmeHtml(owner, repo, { timeoutMs: 2500 });
    if (!html) return null;
    return (
      <div className="w-full mt-3 md:mt-6">
        <div
          className="gh-readme rounded-lg border border-[#F6E5C6]/10 bg-[#013837]/30 p-4 md:p-6 text-sm md:text-base leading-6 md:leading-7"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  } catch {
    return null;
  }
}
