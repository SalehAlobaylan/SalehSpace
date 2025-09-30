import MainText from "@/components/mainText";
import Socials from "@/components/socials";
// import GithubPreview from "@/components/githubPreview";
import PostsCarousel from "@/components/postsCarousel";
import GithubCard from "@/components/githubCard/githubCard";
import TabsLiftedDemo from "@/components/tabs";

// import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden font-[family-name:var(--font-geist-sans)]">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-full">
        <main className="flex flex-col gap-6 sm:gap-8 items-center w-full">
          <div className="w-full flex justify-center">
            <TabsLiftedDemo />
          </div>
        </main>

        {/* footer */}
        <footer className="mt-8 sm:mt-12 flex gap-4 flex-wrap items-center justify-center text-center">
          {/* <p>Copyright © 2025 SalehSpace</p> */}
        </footer>
      </div>
    </div>
  );
}
