"use client";

import Image from "next/image";
import { useLocale } from "@/lib/localeContext";

interface GithubUser {
  avatar_url: string;
  login: string;
  name: string | null;
  bio: string | null;
  html_url: string;
  followers: number;
  public_repos: number;
}

interface GithubCardClientProps {
  user: GithubUser;
  children: React.ReactNode;
}

export default function GithubCardClient({ user, children }: GithubCardClientProps) {
  const { t, isRTL } = useLocale();

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-[#F6E5C6]/10 bg-[#013837]/40 p-3 sm:p-4 md:p-6 text-[#F6E5C6] overflow-visible">
      <div className={`flex items-center gap-3 sm:gap-4 md:gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
        <Image
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          width={64}
          height={64}
          className="rounded-full border border-[#F6E5C6]/20 sm:w-[80px] sm:h-[80px] md:w-[96px] md:h-[96px]"
        />
        <div className={`flex flex-col min-w-0 flex-1 ${isRTL ? "text-right" : ""}`}>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-base sm:text-lg md:text-2xl font-semibold hover:underline truncate"
          >
            {user.name ?? user.login}
          </a>
          {user.bio ? (
            <p className="text-xs sm:text-sm md:text-base opacity-60 line-clamp-2">{user.bio}</p>
          ) : null}
          <div className={`mt-1 text-xs sm:text-sm opacity-60 flex items-center gap-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
            <span>{t.github.followers} {user.followers}</span>
            <span>•</span>
            <span>{t.github.repos} {user.public_repos}</span>
          </div>
        </div>
      </div>
      <div className={`mt-3 sm:mt-4 md:mt-6 text-xs sm:text-sm ${isRTL ? "text-left" : "text-right"}`}>
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-[#FFB703] hover:underline"
        >
          {t.github.viewOnGithub}
        </a>
      </div>
      {children}
    </div>
  );
}
