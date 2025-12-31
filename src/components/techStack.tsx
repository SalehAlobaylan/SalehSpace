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
  { i: "js", alt: "JavaScript", desc: "UUsed it primarily in production served more than 20k monthly active user with it" },
  { i: "go", alt: "Go", desc: "built with it many scalable production-ready projects" },
  { i: "express", alt: "Express", desc: "Most of my pproject with it" },
  { i: "nextjs", alt: "Next.js", desc: "Full-stack React framework I use for SSR, API routes, and this portfolio site." },
  { i: "postgres", alt: "PostgreSQL", desc: "Reliable relational database for complex queries and data integrity in production apps." },
  { i: "aws", alt: "AWS", desc: "Deployed scalable apps using EC2, S3, Lambda, and RDS for cloud infrastructure." },
];

const workedWithStack: TechItem[] = [
  { i: "python", alt: "Python", desc: "Used for data processing, scripting, and building automation tools." },
  { i: "java", alt: "Java", desc: "Built enterprise applications and learned OOP fundamentals." },
  { i: "angular", alt: "Angular", desc: "Developed component-based SPAs with TypeScript and RxJS." },
  { i: "sqlite", alt: "SQLite", desc: "Lightweight database for local development and mobile apps." },
  { i: "mongodb", alt: "MongoDB", desc: "NoSQL database for flexible schema and rapid prototyping." },
  { i: "redis", alt: "Redis", desc: "In-memory caching for session management and performance optimization." },
  { i: "postman", alt: "Postman", desc: "API testing and documentation for backend development workflows." },
  { i: "docker", alt: "Docker", desc: "Containerized applications for consistent dev/prod environments." },
  { i: "notion", alt: "Notion", desc: "Project management and documentation for team collaboration." },
  { i: "supabase", alt: "Supabase", desc: "Open-source Firebase alternative for auth and real-time databases." },
  { i: "firebase", alt: "Firebase", desc: "Used for authentication, hosting, and real-time data sync." },
  { i: "tailwind", alt: "Tailwind", desc: "Utility-first CSS framework for rapid, responsive UI development." },
];

const shieldStack: ShieldItem[] = [
  { src: "https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white", alt: "Jira", desc: "Agile project management for sprint planning and issue tracking." },
  { src: "https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white", alt: "Jest", desc: "JavaScript testing framework for unit and integration tests." },
  { src: "https://img.shields.io/badge/CircleCI-343434?style=for-the-badge&logo=circleci&logoColor=white", alt: "CircleCI", desc: "CI/CD pipeline for automated testing and deployment." },
  { src: "https://img.shields.io/badge/jasmine-%238A4182.svg?style=for-the-badge&logo=jasmine&logoColor=white", alt: "Jasmine", desc: "BDD testing framework for Angular and JavaScript projects." },
  { src: "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens", alt: "JWT", desc: "Secure token-based authentication for API authorization." },
  { src: "https://img.shields.io/badge/Microservices-gray?style=for-the-badge&logo=hexagonal-architecture&logoColor=white", alt: "Microservices", desc: "Designed distributed systems with independent, scalable services." },
  { src: "https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white", alt: "Shadcn/UI", desc: "Modern React component library for beautiful, accessible UIs." },
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
                height="45"
                className="h-[45px]"
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
