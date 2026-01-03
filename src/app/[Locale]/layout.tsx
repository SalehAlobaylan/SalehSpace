import { LocaleProvider } from "@/lib/localeContext";
import { Locale as LocaleType, isValidLocale } from "@/lib/i18n";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ Locale: string }>;
}) {
    const { Locale } = await params;
    const locale: LocaleType = isValidLocale(Locale) ? Locale : "en";
    const isRTL = locale === "ar";
    
    return (
        <LocaleProvider locale={locale}>
            <div 
                data-locale={locale} 
                dir={isRTL ? "rtl" : "ltr"}
                className={`min-h-screen ${isRTL ? "font-arabic" : ""}`}
            >
                {children}
            </div>
        </LocaleProvider>
    );
}