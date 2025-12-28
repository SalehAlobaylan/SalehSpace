export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ Locale: string }>;
}) {
    const { Locale } = await params;
    return (
        <div data-locale={Locale} className="min-h-screen">
            {children}
        </div>
    );
}