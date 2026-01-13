import HomeClient from "@/components/homeClient";
import GithubCard from "@/components/githubCard/githubCard";
import AuthButton from "@/components/admin/authButton";
import VisitorTracker from "@/components/visitorTracker";
import VisitorStats from "@/components/admin/visitorStats";
import { promises as fs } from "fs";
import path from "path";

export default async function Home({
  params,
}: {
  params: Promise<{ Locale: "en" | "ar" }>;
}) {
  const { Locale } = await params;
  const postsPath = path.join(process.cwd(), "public", "posts.json");
  const postsData = await fs.readFile(postsPath, "utf8");
  const posts = JSON.parse(postsData);

  return (
    <>
      <HomeClient
        githubSection={<GithubCard />}
        posts={posts}
      />
      <AuthButton />
      <VisitorTracker />
      <VisitorStats locale={Locale} />
    </>
  );
}
