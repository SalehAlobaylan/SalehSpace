export default function RootLayout({
    children,
    params: { Locale },
}: {
    children: React.ReactNode;
    params: { Locale: string };
}) {
    return (
        <html lang={Locale}>
            <body>{children}</body>
        </html>
    );
}