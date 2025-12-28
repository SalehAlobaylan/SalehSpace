export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ Locale: string }>;
}) {
    const { Locale } = await params;
    return (
        <html lang={Locale}>
            <body>{children}</body>
        </html>
    );
}