"use client";

import { createContext, useContext, ReactNode } from "react";
import { Translation, getTranslation } from "./translations";
import { Locale } from "./i18n";

interface LocaleContextType {
  locale: Locale;
  t: Translation;
  isRTL: boolean;
  dir: "ltr" | "rtl";
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const t = getTranslation(locale);
  const isRTL = locale === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <LocaleContext.Provider value={{ locale, t, isRTL, dir }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

export function useTranslation() {
  const { t } = useLocale();
  return t;
}
