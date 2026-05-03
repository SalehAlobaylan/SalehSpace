"use client";

import { useEffect, useRef, useState } from "react";
import TechStack from "@/components/techStack";
import Socials from "@/components/socials";
import LanguageSwitcher from "@/components/languageSwitcher";
import ProductsShowcase from "@/components/productsShowcase";
import { useLocale } from "@/lib/localeContext";
import type { Post } from "@/components/postsCarousel";

type TabId = "overview" | "products" | "github";

const TRANSITION_MS = 900;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function HomeClient({ githubSection, posts: _posts }: { githubSection: React.ReactNode; posts: Post[] }) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  // Mount the heavy showcase only after the chrome animation completes.
  // Keep it mounted briefly after leaving products so the exit animation can play.
  const [showcaseMounted, setShowcaseMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const animTimer = useRef<number | null>(null);
  const mountTimer = useRef<number | null>(null);

  const { t, isRTL } = useLocale();
  const isProducts = activeTab === "products";

  function changeTab(next: TabId) {
    if (next === activeTab) return;
    setAnimating(true);
    if (animTimer.current) clearTimeout(animTimer.current);
    if (mountTimer.current) clearTimeout(mountTimer.current);

    if (next === "products") {
      // Delay heavy showcase mount until chrome animation is mostly done.
      setActiveTab(next);
      mountTimer.current = window.setTimeout(() => setShowcaseMounted(true), TRANSITION_MS - 50);
    } else if (activeTab === "products") {
      // Leave products: unmount showcase first, then change tab → chrome animates without
      // the heavy canvas thrashing the main thread.
      setShowcaseMounted(false);
      // Give one frame for unmount cleanup.
      requestAnimationFrame(() => setActiveTab(next));
    } else {
      setActiveTab(next);
    }
    animTimer.current = window.setTimeout(() => setAnimating(false), TRANSITION_MS + 60);
  }

  useEffect(() => {
    return () => {
      if (animTimer.current) clearTimeout(animTimer.current);
      if (mountTimer.current) clearTimeout(mountTimer.current);
    };
  }, []);

  const transition = `all ${TRANSITION_MS}ms ${EASE}`;
  const transitionPaddingBg = `padding ${TRANSITION_MS}ms ${EASE}, background-color ${TRANSITION_MS}ms ${EASE}`;
  const transitionPadding = `padding ${TRANSITION_MS}ms ${EASE}`;

  return (
    <div className="h-screen w-full flex items-center justify-center relative selection:bg-[#FFB703] selection:text-[#013837] overflow-hidden">
      <div
        className={`blob bg-[#FFB703] w-96 h-96 top-0 left-0 -translate-x-1/2 -translate-y-1/2 ${
          isProducts ? "opacity-0" : "opacity-40"
        }`}
        style={{ transition: `opacity 1100ms ${EASE}` }}
      />
      <div
        className={`blob bg-[#013837] w-[500px] h-[500px] bottom-0 right-0 translate-x-1/3 translate-y-1/3 ${
          isProducts ? "opacity-0" : "opacity-40"
        }`}
        style={{ transition: `opacity 1100ms ${EASE}` }}
      />

      {/* Main Container */}
      <main
        className={`flex flex-col relative overflow-hidden ${
          isProducts
            ? "w-full h-screen md:rounded-none md:border-0 md:shadow-none bg-[#045C5A] md:bg-[#045C5A]"
            : "w-full max-w-5xl h-dvh md:h-[80vh] md:bg-[#066D6A]/80 md:backdrop-blur-xl md:border md:border-[#F6E5C6]/10 md:rounded-2xl md:shadow-2xl"
        }`}
        style={{
          transition,
          willChange: "max-width, height, border-radius, background-color",
          contain: "layout paint",
          transform: "translateZ(0)",
        }}
      >
        {/* Header */}
        <header
          className={`flex-none border-b border-[#F6E5C6]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 z-20 ${
            isProducts
              ? "p-4 md:p-6 bg-[#066D6A]/70 backdrop-blur-xl"
              : "p-4 md:p-8 bg-transparent md:bg-[#066D6A]/50"
          }`}
          style={{ transition: transitionPaddingBg, willChange: "padding, background-color" }}
        >
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

          <div className="flex items-center gap-3 w-full md:w-auto">
            <nav className={`relative flex flex-wrap bg-[#013837]/30 rounded-lg p-1 gap-1 flex-1 md:flex-none ${isRTL ? "flex-row-reverse" : ""}`}>
              {[
                { id: "overview" as const, label: t.nav.overview },
                { id: "products" as const, label: t.nav.products },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => changeTab(tab.id)}
                  disabled={animating}
                  className={`relative z-10 px-3 md:px-6 py-2 text-xs md:text-sm font-medium transition-colors rounded-md flex-1 md:flex-none ${
                    activeTab === tab.id
                      ? "text-[#013837] bg-[#FFB703] shadow-sm cursor-default"
                      : "text-[#F6E5C6] hover:text-white cursor-pointer"
                  } ${animating && activeTab !== tab.id ? "pointer-events-none opacity-70" : ""}`}
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
          id="main-scroll"
          className={`flex-1 overflow-y-auto overflow-x-hidden relative ${
            isProducts ? "p-0" : "p-4 md:p-12"
          }`}
          style={{ transition: transitionPadding, willChange: "padding" }}
        >
          {/* TAB: OVERVIEW */}
          <section
            className={`tab-content flex flex-col justify-center ${
              activeTab === "overview" ? "active" : ""
            }`}
          >
            <div className="w-full mb-4 relative hidden md:block">
              {/* <PostsCarousel posts={posts} /> */}
            </div>
            <Socials onGithubClick={() => changeTab("github")} />
            <TechStack />
          </section>

          {/* TAB: PRODUCTS — heavy mount gated on showcaseMounted */}
          <section
            className={`tab-content ${activeTab === "products" ? "active" : ""}`}
          >
            {showcaseMounted ? (
              <ProductsShowcase scrollContainerId="main-scroll" />
            ) : (
              <div className="h-full w-full" />
            )}
          </section>

          {/* TAB: GITHUB */}
          <section
            className={`tab-content max-w-3xl mx-auto py-2 ${
              activeTab === "github" ? "active" : ""
            }`}
          >
            {githubSection}
          </section>
        </div>

        {/* Footer */}
        <footer
          className={`flex-none text-center border-t border-[#F6E5C6]/5 text-[10px] uppercase tracking-widest overflow-hidden ${
            isRTL ? "font-arabic" : "font-mono"
          } ${isProducts ? "h-0 p-0 opacity-0 border-t-0" : "h-auto p-4 opacity-30"}`}
          style={{ transition }}
          aria-hidden={isProducts}
        >
          {t.footer}
        </footer>
      </main>
    </div>
  );
}
