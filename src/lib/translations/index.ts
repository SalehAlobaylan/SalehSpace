import { en, type Translation } from "./en";
import { ar } from "./ar";

export const translations: Record<string, Translation> = {
  en,
  ar,
};

export function getTranslation(locale: string): Translation {
  return translations[locale] || translations.en;
}

export type { Translation };
