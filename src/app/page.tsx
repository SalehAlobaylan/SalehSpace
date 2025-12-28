import HomeClient from "@/components/homeClient";
import GithubCard from "@/components/githubCard/githubCard";
import { promises as fs } from "fs";
import path from "path";

export default async function Home() {
  const postsPath = path.join(process.cwd(), "public", "posts.json");
  const postsData = await fs.readFile(postsPath, "utf8");
  const posts = JSON.parse(postsData);

  return (
    <HomeClient
      githubSection={<GithubCard />}
      posts={posts}
    />
  );
}

