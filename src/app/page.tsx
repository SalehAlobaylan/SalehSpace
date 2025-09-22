import MainText from "@/components/mainText";
import Socials from "@/components/socials";
// import GithubPreview from "@/components/githubPreview";
import PostsCarousel from "@/components/postsCarousel";
import GithubCard from "@/components/githubCard/githubCard";
// import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <MainText />
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <PostsCarousel />
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
        <Socials />
        </div>
        <GithubCard />

      </main>

      {/* footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* <p>Copyright © 2025 SalehSpace</p> */}
      </footer>
    </div>
  );
}
