"use client";

import { useLocale } from "@/lib/localeContext";
import { useRouter, usePathname } from "next/navigation";
import { Locale, locales, addLocaleToPathname, removeLocaleFromPathname } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, t, isRTL } = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = () => {
    const newLocale: Locale = locale === "en" ? "ar" : "en";
    const cleanPath = removeLocaleFromPathname(pathname);
    const newPath = addLocaleToPathname(cleanPath, newLocale);
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#F6E5C6]/20 hover:border-[#FFB703]/50 hover:bg-[#FFB703]/10 transition-all duration-200 group"
      aria-label={`Switch to ${locale === "en" ? "Arabic" : "English"}`}
    >
      {isRTL ? (
        <svg
          className="w-4 h-4 opacity-70 group-hover:opacity-100"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      ) : (
        <span className="w-4 h-4 flex items-center justify-center font-arabic font-bold text-sm opacity-70 group-hover:opacity-100">
          ع
        </span>
      )}
      <span className={`font-medium ${isRTL ? "font-arabic" : ""}`}>
        {t.language}
      </span>
    </button>
  );
}
