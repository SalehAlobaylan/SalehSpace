"use client";

import { useState } from "react";
import PostsCarousel, { Post } from "@/components/postsCarousel";
import TechStack from "@/components/techStack";
import BlogList from "@/components/blogList";
import SocialFeed from "@/components/socialFeed";

export default function HomeClient({ githubSection, posts }: { githubSection: React.ReactNode; posts: Post[] }) {
  const [activeTab, setActiveTab] = useState<"overview" | "github" | "blogs" | "posts">("overview");

  return (
    <div className="h-screen w-full flex items-center justify-center relative selection:bg-[#FFB703] selection:text-[#013837]">
      {/* Abstract Background Elements */}
      <div className="blob bg-[#FFB703] w-96 h-96 top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="blob bg-[#013837] w-[500px] h-[500px] bottom-0 right-0 translate-x-1/3 translate-y-1/3"></div>

      {/* Main Container */}
      <main className="w-full max-w-5xl h-dvh md:h-[80vh] flex flex-col overflow-hidden relative md:bg-[#066D6A]/80 md:backdrop-blur-xl md:border md:border-[#F6E5C6]/10 md:rounded-2xl md:shadow-2xl transition-all duration-300">
        {/* Header / Navigation */}
        <header className="flex-none p-6 md:p-8 border-b border-[#F6E5C6]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10 bg-transparent md:bg-[#066D6A]/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#013837] border border-[#FFB703] flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="https://avatars.githubusercontent.com/u/87912478?v=4"
                alt="Saleh"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="serif text-2xl font-bold tracking-tight">
                SalehSpace<span className="text-[#FFB703]">.</span>
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] opacity-60 font-medium">
                Backend Engineer
              </p>
            </div>
          </div>

          {/* Minimal Tabs */}
          <nav className="relative flex flex-wrap bg-[#013837]/30 rounded-lg p-1 gap-1">
            {[
              { id: "overview", label: "Overview" },
              { id: "github", label: "GitHub" },
              { id: "blogs", label: "Blogs" },
              { id: "posts", label: "Posts" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative z-10 px-4 md:px-6 py-2 text-sm font-medium transition-colors rounded-md ${
                  activeTab === tab.id
                    ? "text-[#013837] bg-[#FFB703] shadow-sm cursor-default"
                    : "text-[#F6E5C6] hover:text-white cursor-pointer"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Content Area */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 relative scroll-smooth"
          id="main-scroll"
        >
          {/* TAB: OVERVIEW */}
          <section
            className={`tab-content h-full flex flex-col justify-center ${
              activeTab === "overview" ? "active" : ""
            }`}
          >
            {/* CAROUSEL CONTAINER */}
            <div className="w-full mb-4 relative hidden md:block">
              <PostsCarousel posts={posts} />
            </div>

            {/* Links (Condensed) */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-2 pb-6">
              <a
                href="https://github.com/SalehAlobaylan"
                target="_blank"
                className="flex items-center gap-2 text-xs hover:text-[#FFB703] transition-colors group"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5 md:w-4 md:h-4 opacity-70 group-hover:opacity-100"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="font-mono hidden md:inline">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/salehalobaylan"
                target="_blank"
                className="flex items-center gap-2 text-xs hover:text-[#FFB703] transition-colors group"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5 md:w-4 md:h-4 opacity-70 group-hover:opacity-100"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
                <span className="font-mono hidden md:inline">LinkedIn</span>
              </a>
              <a
                href="https://x.com/SAlobaylan"
                target="_blank"
                className="flex items-center gap-2 text-xs hover:text-[#FFB703] transition-colors group"
                aria-label="X / Twitter"
              >
                <svg
                  className="w-5 h-5 md:w-4 md:h-4 opacity-70 group-hover:opacity-100"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
                </svg>
                <span className="font-mono hidden md:inline">X / Twitter</span>
              </a>
              <a
                href="mailto:salehwleed1@gmail.com"
                className="flex items-center gap-2 text-xs hover:text-[#FFB703] transition-colors group"
                aria-label="Email"
              >
                <svg
                  className="w-5 h-5 md:w-4 md:h-4 opacity-70 group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="font-mono hidden md:inline">Email</span>
              </a>
            </div>

            <TechStack />
          </section>

          {/* TAB: GITHUB */}
          <section
            className={`tab-content max-w-3xl mx-auto ${
              activeTab === "github" ? "active" : ""
            }`}
          >
            {githubSection}
          </section>

          {/* TAB: BLOGS */}
          <section
            className={`tab-content h-full max-w-3xl mx-auto ${
              activeTab === "blogs" ? "active" : ""
            }`}
          >
            <div className="flex justify-between items-end mb-8 border-b border-[#F6E5C6]/10 pb-4">
              <div>
                <h2 className="serif text-3xl font-bold">Latest Thoughts</h2>
                <p className="text-xs opacity-50 font-mono mt-1">
                  Deep dives into backend engineering
                </p>
              </div>
            </div>

            <BlogList />
          </section>

          {/* TAB: POSTS */}
          <section
            className={`tab-content h-full max-w-3xl mx-auto ${
              activeTab === "posts" ? "active" : ""
            }`}
          >
            <div className="flex justify-between items-end mb-8 border-b border-[#F6E5C6]/10 pb-4">
              <div>
                <h2 className="serif text-3xl font-bold">Social Feed</h2>
                <p className="text-xs opacity-50 font-mono mt-1">
                  Updates from X & LinkedIn
                </p>
              </div>
            </div>

            <SocialFeed />
          </section>
        </div>

        {/* Subtle Footer in Panel */}
        <footer className="flex-none p-4 text-center border-t border-[#F6E5C6]/5 text-[10px] uppercase tracking-widest opacity-30 font-mono">
          {/* &copy; 2026 Saleh Alobaylan */}
          Backend Development and more
        </footer>
      </main>
    </div>
  );
}
