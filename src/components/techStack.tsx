"use client";

import { useState } from "react";

type TechItem = {
  i: string;
  alt: string;
  desc: string;
};

type ShieldItem = {
  src: string;
  alt: string;
  desc: string;
};

const mainStack: TechItem[] = [
  { i: "ts", alt: "TypeScript", desc: "Used it primarily in production" },
  { i: "js", alt: "JavaScript", desc: "Used it primarily in production served more than 20k monthly active user with it" },
  { i: "go", alt: "Go", desc: "built with it many scalable production-ready Services and systems, 'one of them will be connected with this website soon:)'" },
  { i: "nextjs", alt: "Next.js", desc: "I'm not a frontend engineer but if I'm fullstacking i'm using Next.js." },
  { i: "postgres", alt: "PostgreSQL", desc: "used it for production, served with it more than 20k monthly active users." },
  { i: "supabase", alt: "Supabase", desc: "My main cloud development database provider." },
  { i: "aws", alt: "AWS", desc: "Deployed scalable apps using EC2, S3, IAM, and RDS for cloud infrastructure and used RDS for production." },
];

const workedWithStack: TechItem[] = [
  { i: "python", alt: "Python", desc: "Used it for data Analysis with numpy, pandas, matplotlib." },
  { i: "java", alt: "Java", desc: "Started with it for fundementals, OOP, Data structures." },
  { i: "express", alt: "Express", desc: "Most of my project is built with it" },
  { i: "angular", alt: "Angular", desc: "only limited usecases." },
  { i: "sqlite", alt: "SQLite", desc: "Lightweight database used it for scalable production then had to migrate from it because of bottleneck :)" },
  { i: "mongodb", alt: "MongoDB", desc: "NoSQL database used it for not scalable usecases just basics." },
  { i: "redis", alt: "Redis", desc: "In-memory caching used it for caching access tokens and rate limiting." },
  { i: "postman", alt: "Postman", desc: "API testing and documentation for backend development workflows." },
  { i: "docker", alt: "Docker", desc: "Containerized applications for consistent dev/prod environments." },
  { i: "notion", alt: "Notion", desc: "used its SDK for light databases integration and project management, and documentation." },
  { i: "firebase", alt: "Firebase", desc: "Used for authentication primarily." },
  { i: "tailwind", alt: "Tailwind", desc: "Used primarily with Next.js." },
];

const shieldStack: ShieldItem[] = [
  { src: "https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white", alt: "Jira", desc: "Agile project management for sprint planning and issue tracking." },
  { src: "https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white", alt: "Jest", desc: "my main tool for testing." },
  { src: "https://img.shields.io/badge/CircleCI-343434?style=for-the-badge&logo=circleci&logoColor=white", alt: "CircleCI", desc: "CI/CD pipeline for automated testing and deployment." },
  { src: "https://img.shields.io/badge/jasmine-%238A4182.svg?style=for-the-badge&logo=jasmine&logoColor=white", alt: "Jasmine", desc: "used it for my early projects but not anymore." },
  { src: "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens", alt: "JWT", desc: "many production usages for me [large systems, microservices, modular monoliths, with refreshed tokens]." },
  { src: "https://img.shields.io/badge/Microservices-gray?style=for-the-badge&logo=hexagonal-architecture&logoColor=white", alt: "Microservices", desc: "usually when i build a system i start with designing it as microservices, then gathering it to smaller approches as needed and projects limits, but my mind always *Microservicing*." },
  { src: "https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white", alt: "Shadcn/UI", desc: "I don't like to frontend so usually i start with this :)." },
];

export default function TechStack() {
  const [showWorkedWith, setShowWorkedWith] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedDesc, setSelectedDesc] = useState<string | null>(null);

  const handleTechClick = (alt: string, desc: string) => {
    if (selectedTech === alt) {
      setSelectedTech(null);
      setSelectedDesc(null);
    } else {
      setSelectedTech(alt);
      setSelectedDesc(desc);
    }
  };

  return (
    <div className="py-6 border-t border-[#F6E5C6]/10 max-w-2xl mx-auto w-full space-y-8">
      {/* Stacked in these (Always Visible) */}
      <div className="text-center relative">
        <h3 className="serif text-xl font-bold mb-4 text-[#F6E5C6]">
          Stacked in these <span className="text-[9px] font-normal text-[#F6E5C6]/25 italic ml-1">click on each to show</span>
        </h3>
        <div className="flex flex-wrap justify-center gap-1 md:gap-2">
          {mainStack.map((tech) => (
            <button
              key={tech.i}
              onClick={() => handleTechClick(tech.alt, tech.desc)}
              className={`hover:scale-110 transition-all cursor-pointer rounded-lg ${
                selectedTech === tech.alt ? "ring-2 ring-[#FFB703] scale-110" : ""
              }`}
            >
              <img
                src={`https://skillicons.dev/icons?i=${tech.i}`}
                alt={tech.alt}
                height="40"
                className="h-[40px]"
              />
            </button>
          ))}
        </div>
        
        {/* Description Display for Main Stack */}
        {selectedTech && mainStack.some(t => t.alt === selectedTech) && (
          <div className="mt-4 p-3 bg-[#F6E5C6]/5 rounded-lg border border-[#F6E5C6]/10 animate-in fade-in duration-200">
            <p className="text-sm text-[#F6E5C6]/80">
              <span className="font-semibold text-[#FFB703]">{selectedTech}:</span> {selectedDesc}
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
          {showWorkedWith ? "Show Less ↑" : "View Worked With ↓"}
        </button>
      </div>

      {/* And worked with these (Hidden on mobile by default) */}
      <div
        className={`text-center ${
          showWorkedWith ? "block" : "hidden"
        } md:block`}
      >
        <h3 className="serif text-xl font-bold mb-4 text-[#F6E5C6]">
          And worked with these
        </h3>

        {/* Row 1: Skill Icons */}
        <div className="flex flex-wrap justify-center gap-1 md:gap-1.5 mb-4">
          {workedWithStack.map((tech) => (
            <button
              key={tech.i}
              onClick={() => handleTechClick(tech.alt, tech.desc)}
              className={`hover:scale-110 transition-all cursor-pointer rounded-lg ${
                selectedTech === tech.alt ? "ring-2 ring-[#FFB703] scale-110" : ""
              }`}
            >
              <img
                src={`https://skillicons.dev/icons?i=${tech.i}`}
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
              onClick={() => handleTechClick(shield.alt, shield.desc)}
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
          <div className="mt-4 p-3 bg-[#F6E5C6]/5 rounded-lg border border-[#F6E5C6]/10 animate-in fade-in duration-200">
            <p className="text-sm text-[#F6E5C6]/80">
              <span className="font-semibold text-[#FFB703]">{selectedTech}:</span> {selectedDesc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
