import React, { ReactNode } from "react";
import Header from "@/components/header";
import LanguageSwitcher from "@/components/languageSwitcher";
import Link from "next/link";

interface PageWrapperProps {
  children: ReactNode;
  locale: "en" | "ar";
  showBackButton?: boolean;
}

export default function PageWrapper({ children, locale, showBackButton = true }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#066D6A] via-[#055959] to-[#044848] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFB703] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F6E5C6] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#FFB703] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showBackButton && (
                <Link
                  href={`/${locale}`}
                  className="text-[#F6E5C6] hover:text-[#FFB703] transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={locale === "ar" ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
                    />
                  </svg>
                </Link>
              )}
              <Header />
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">{children}</main>
    </div>
  );
}
