"use client";

import { useState } from "react";
import PostsCarousel, { Post } from "@/components/postsCarousel";
import TechStack from "@/components/techStack";
import BlogList from "@/components/blogList";
import SocialFeed from "@/components/socialFeed";
import Socials from "@/components/socials";
import LanguageSwitcher from "@/components/languageSwitcher";
import { useLocale } from "@/lib/localeContext";

export default function HomeClient({ githubSection, posts }: { githubSection: React.ReactNode; posts: Post[] }) {
  const [activeTab, setActiveTab] = useState<"overview" | "github" | "blogs" | "posts">("overview");
  const { t, isRTL } = useLocale();

  return (
    <div className="h-screen w-full flex items-center justify-center relative selection:bg-[#FFB703] selection:text-[#013837] overflow-x-hidden">
      {/* Abstract Background Elements */}
      <div className="blob bg-[#FFB703] w-96 h-96 top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="blob bg-[#013837] w-[500px] h-[500px] bottom-0 right-0 translate-x-1/3 translate-y-1/3"></div>

      {/* Main Container */}
      <main className="w-full max-w-5xl h-dvh md:h-[80vh] flex flex-col overflow-x-hidden overflow-y-hidden relative md:bg-[#066D6A]/80 md:backdrop-blur-xl md:border md:border-[#F6E5C6]/10 md:rounded-2xl md:shadow-2xl transition-all duration-300">
        {/* Header / Navigation */}
        <header className="flex-none p-4 md:p-8 border-b border-[#F6E5C6]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 z-10 bg-transparent md:bg-[#066D6A]/50">
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className={isRTL ? "text-right" : ""}>
              <h1 className={`text-xl md:text-2xl font-bold tracking-tight ${isRTL ? "font-arabic" : "serif"}`}>
                {t.name}
              </h1>
              <p className={`text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-60 font-medium ${isRTL ? "font-arabic" : ""}`}>
                {t.role}
              </p>
            </div>
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Minimal Tabs */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <nav className={`relative flex flex-wrap bg-[#013837]/30 rounded-lg p-1 gap-1 flex-1 md:flex-none ${isRTL ? "flex-row-reverse" : ""}`}>
              {[
                { id: "overview", label: t.nav.overview },
                { id: "github", label: t.nav.github },
                // { id: "blogs", label: t.nav.blogs },
                // { id: "posts", label: t.nav.posts },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative z-10 px-3 md:px-6 py-2 text-xs md:text-sm font-medium transition-colors rounded-md flex-1 md:flex-none ${
                    activeTab === tab.id
                      ? "text-[#013837] bg-[#FFB703] shadow-sm cursor-default"
                      : "text-[#F6E5C6] hover:text-white cursor-pointer"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-12 relative"
          id="main-scroll"
        >
          {/* TAB: OVERVIEW */}
          <section
            className={`tab-content flex flex-col justify-center ${
              activeTab === "overview" ? "active" : ""
            }`}
          >
            {/* CAROUSEL CONTAINER */}
            <div className="w-full mb-4 relative hidden md:block">
              {/* <PostsCarousel posts={posts} /> */}
            </div>

            {/* Links (Condensed) */}
            <Socials />

            <TechStack />
          </section>

          {/* TAB: GITHUB */}
          <section
            className={`tab-content max-w-3xl mx-auto py-2 ${
              activeTab === "github" ? "active" : ""
            }`}
          >
            {githubSection}
          </section>

          {/* TAB: BLOGS */}
          <section
            className={`tab-content max-w-3xl mx-auto ${
              activeTab === "blogs" ? "active" : ""
            }`}
          >
            <div className={`flex justify-between items-end mb-8 border-b border-[#F6E5C6]/10 pb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={isRTL ? "text-right" : ""}>
                <h2 className="serif text-3xl font-bold">{t.blogs.title}</h2>
                <p className="text-xs opacity-50 font-mono mt-1">
                  {t.blogs.subtitle}
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
            <div className={`flex justify-between items-end mb-8 border-b border-[#F6E5C6]/10 pb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={isRTL ? "text-right" : ""}>
                <h2 className="serif text-3xl font-bold">{t.posts.title}</h2>
                <p className="text-xs opacity-50 font-mono mt-1">
                  {t.posts.subtitle}
                </p>
              </div>
            </div>

            <SocialFeed />
          </section>
        </div>

        {/* Subtle Footer in Panel */}
        <footer className={`flex-none p-4 text-center border-t border-[#F6E5C6]/5 text-[10px] uppercase tracking-widest opacity-30 ${isRTL ? "font-arabic" : "font-mono"}`}>
          {t.footer}
        </footer>
      </main>
    </div>
  );
}
