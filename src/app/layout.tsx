import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// SOMAR Arabic Font - Local font
const somar = localFont({
  src: [
    {
      path: "../../public/fonts/SOMAR-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SOMAR-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SOMAR-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-somar",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SalehSpace - Backend Engineer",
  description: "Backend Engineer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} ${somar.variable} antialiased font-sans bg-[#045C5A] text-[#F6E5C6]`}
      >
        {children}
      </body>
    </html>
  );
}
