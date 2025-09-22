"use client";

import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"], display: "swap" });

export default function Header() {
    return (
        <div className="flex justify-center items-center py-3">
            <div className="flex items-center gap-2">
                <div className="relative h-5 w-5 rounded-full border border-muted-foreground/30 animate-spin [animation-duration:6s]">
                    <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-primary shadow-sm" />
                </div>
                <h1 className={`${cinzel.className} text-sm sm:text-base font-semibold tracking-tight antialiased text-foreground`}>
                    Saleh<span className="opacity-70">Space</span>
                </h1>
            </div>
        </div>
    )
}