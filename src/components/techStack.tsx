"use client";

import { useState } from "react";
import { useLocale } from "@/lib/localeContext";

type TechItem = {
  i: string;
  key: string;
  alt: string;
  customSrc?: string;
};

type ShieldItem = {
  src: string;
  key: string;
  alt: string;
};

const mainStack: TechItem[] = [
  { i: "ts", key: "ts", alt: "TypeScript" },
  { i: "js", key: "js", alt: "JavaScript" },
  { i: "go", key: "go", alt: "Go" },
  { i: "nextjs", key: "nextjs", alt: "Next.js" },
  { i: "postgres", key: "postgres", alt: "PostgreSQL" },
  { i: "supabase", key: "supabase", alt: "Supabase" },
  { i: "aws", key: "aws", alt: "AWS" },
];

const workedWithStack: TechItem[] = [
  { i: "python", key: "python", alt: "Python" },
  { i: "java", key: "java", alt: "Java" },
  { i: "express", key: "express", alt: "Express" },
  { i: "angular", key: "angular", alt: "Angular" },
  { i: "sqlite", key: "sqlite", alt: "SQLite" },
  { i: "mongodb", key: "mongodb", alt: "MongoDB" },
  { i: "redis", key: "redis", alt: "Redis" },
  { i: "cursor", key: "cursor", alt: "Cursor", customSrc: "https://www.cursor.com/assets/images/logo.svg" },
  { i: "postman", key: "postman", alt: "Postman" },
  { i: "docker", key: "docker", alt: "Docker" },
  { i: "notion", key: "notion", alt: "Notion" },
  { i: "firebase", key: "firebase", alt: "Firebase" },
  { i: "tailwind", key: "tailwind", alt: "Tailwind" },
];

const shieldStack: ShieldItem[] = [
  { src: "https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white", key: "jira", alt: "Jira" },
  { src: "https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white", key: "jest", alt: "Jest" },
  { src: "https://img.shields.io/badge/CircleCI-343434?style=for-the-badge&logo=circleci&logoColor=white", key: "circleci", alt: "CircleCI" },
  { src: "https://img.shields.io/badge/jasmine-%238A4182.svg?style=for-the-badge&logo=jasmine&logoColor=white", key: "jasmine", alt: "Jasmine" },
  { src: "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens", key: "jwt", alt: "JWT" },
  { src: "https://img.shields.io/badge/Microservices-gray?style=for-the-badge&logo=hexagonal-architecture&logoColor=white", key: "microservices", alt: "Microservices" },
  { src: "https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white", key: "shadcn", alt: "Shadcn/UI" },
];

export default function TechStack() {
  const [showWorkedWith, setShowWorkedWith] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const { t, isRTL } = useLocale();

  const handleTechClick = (alt: string, key: string) => {
    if (selectedTech === alt) {
      setSelectedTech(null);
      setSelectedKey(null);
    } else {
      setSelectedTech(alt);
      setSelectedKey(key);
    }
  };

  const getDescription = (key: string | null): string => {
    if (!key) return "";
    return t.tech[key as keyof typeof t.tech] || "";
  };

  return (
    <div className="py-6 border-t border-[#F6E5C6]/10 max-w-2xl mx-auto w-full space-y-8">
      {/* Stacked in these (Always Visible) */}
      <div className="text-center relative">
        <h3 className="serif text-xl font-bold mb-4 text-[#F6E5C6]">
          {t.techStack.stackedIn} <span className="text-[9px] font-normal text-[#F6E5C6]/25 italic mx-1">{t.techStack.clickToShow}</span>
        </h3>
        <div className="flex flex-wrap justify-center gap-1 md:gap-2">
          {mainStack.map((tech) => (
            <button
              key={tech.i}
              onClick={() => handleTechClick(tech.alt, tech.key)}
              className={`hover:scale-110 transition-all cursor-pointer rounded-lg ${
                selectedTech === tech.alt ? "ring-2 ring-[#FFB703] scale-110" : ""
              }`}
            >
              <img
                src={tech.customSrc || `https://skillicons.dev/icons?i=${tech.i}`}
                alt={tech.alt}
                height="40"
                className="h-[40px]"
              />
            </button>
          ))}
        </div>
        
        {/* Description Display for Main Stack */}
        {selectedTech && mainStack.some(t => t.alt === selectedTech) && (
          <div className={`mt-4 p-3 bg-[#F6E5C6]/5 rounded-lg border border-[#F6E5C6]/10 animate-in fade-in duration-200 ${isRTL ? "text-right" : "text-left"}`}>
            <p className="text-sm text-[#F6E5C6]/80">
              <span className="font-semibold text-[#FFB703]">{selectedTech}:</span> {getDescription(selectedKey)}
            </p>
          </div>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <div className="text-center md:hidden">
        <button
          onClick={() => setShowWorkedWith(!showWorkedWith)}
          className="text-xs text-[#FFB703] border border-[#FFB703]/30 px-4 py-2 rounded-full hover:bg-[#FFB703] hover:text-[#045C5A] transition-colors"
        >
          {showWorkedWith ? t.techStack.showLess : t.techStack.viewWorkedWith}
        </button>
      </div>

      {/* And worked with these (Hidden on mobile by default) */}
      <div
        className={`text-center ${
          showWorkedWith ? "block" : "hidden"
        } md:block`}
      >
        <h3 className="serif text-xl font-bold mb-4 text-[#F6E5C6]">
          {t.techStack.workedWith}
        </h3>

        {/* Row 1: Skill Icons */}
        <div className="flex flex-wrap justify-center gap-1 md:gap-1.5 mb-4">
          {workedWithStack.map((tech) => (
            <button
              key={tech.i}
              onClick={() => handleTechClick(tech.alt, tech.key)}
              className={`hover:scale-110 transition-all cursor-pointer rounded-lg ${
                selectedTech === tech.alt ? "ring-2 ring-[#FFB703] scale-110" : ""
              }`}
            >
              <img
                src={tech.customSrc || `https://skillicons.dev/icons?i=${tech.i}`}
                height="35"
                className="h-[35px]"
                alt={tech.alt}
              />
            </button>
          ))}
        </div>

        {/* Row 2: Shields */}
        <div className="flex flex-wrap justify-center gap-1 md:gap-1.5">
          {shieldStack.map((shield) => (
            <button
              key={shield.alt}
              onClick={() => handleTechClick(shield.alt, shield.key)}
              className={`hover:opacity-80 transition-all cursor-pointer rounded ${
                selectedTech === shield.alt ? "ring-2 ring-[#FFB703]" : ""
              }`}
            >
              <img src={shield.src} alt={shield.alt} />
            </button>
          ))}
        </div>

        {/* Description Display for Worked With Stack */}
        {selectedTech && (workedWithStack.some(t => t.alt === selectedTech) || shieldStack.some(t => t.alt === selectedTech)) && (
          <div className={`mt-4 p-3 bg-[#F6E5C6]/5 rounded-lg border border-[#F6E5C6]/10 animate-in fade-in duration-200 ${isRTL ? "text-right" : "text-left"}`}>
            <p className="text-sm text-[#F6E5C6]/80">
              <span className="font-semibold text-[#FFB703]">{selectedTech}:</span> {getDescription(selectedKey)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
