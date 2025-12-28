"use client";

import { useState } from "react";

export default function TechStack() {
  const [showWorkedWith, setShowWorkedWith] = useState(false);

  return (
    <div className="py-6 border-t border-[#F6E5C6]/10 max-w-2xl mx-auto w-full space-y-8">
      {/* Stacked in these (Always Visible) */}
      <div className="text-center">
        <h3 className="serif text-xl font-bold mb-4 text-[#F6E5C6]">
          Stacked in these
        </h3>
        <div className="flex flex-wrap justify-center gap-1 md:gap-2">
          {[
            { i: "ts", alt: "TypeScript" },
            { i: "js", alt: "JavaScript" },
            { i: "go", alt: "Go" },
            { i: "express", alt: "Express" },
            { i: "nextjs", alt: "Next.js" },
            { i: "postgres", alt: "PostgreSQL" },
            { i: "aws", alt: "AWS" },
          ].map((tech) => (
            <a
              key={tech.i}
              href={`https://skillicons.dev/icons?i=${tech.i}`}
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <img
                src={`https://skillicons.dev/icons?i=${tech.i}`}
                alt={tech.alt}
                height="45"
                className="h-[45px]"
              />
            </a>
          ))}
        </div>
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
          {[
            { i: "python", alt: "Python" },
            { i: "java", alt: "Java" },
            { i: "angular", alt: "Angular" },
            { i: "sqlite", alt: "SQLite" },
            { i: "mongodb", alt: "MongoDB" },
            { i: "redis", alt: "Redis" },
            { i: "postman", alt: "Postman" },
            { i: "docker", alt: "Docker" },
            { i: "notion", alt: "Notion" },
            { i: "supabase", alt: "Supabase" },
            { i: "firebase", alt: "Firebase" },
            { i: "tailwind", alt: "Tailwind" },
          ].map((tech) => (
            <a
              key={tech.i}
              href={`https://skillicons.dev/icons?i=${tech.i}`}
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <img
                src={`https://skillicons.dev/icons?i=${tech.i}`}
                height="35"
                className="h-[35px]"
                alt={tech.alt}
              />
            </a>
          ))}
        </div>

        {/* Row 2: Shields */}
        <div className="flex flex-wrap justify-center gap-1 md:gap-1.5">
          {[
            {
              src: "https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white",
              alt: "Jira",
            },
            {
              src: "https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white",
              alt: "Jest",
            },
            {
              src: "https://img.shields.io/badge/CircleCI-343434?style=for-the-badge&logo=circleci&logoColor=white",
              alt: "CircleCI",
            },
            {
              src: "https://img.shields.io/badge/jasmine-%238A4182.svg?style=for-the-badge&logo=jasmine&logoColor=white",
              alt: "Jasmine",
            },
            {
              src: "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens",
              alt: "JWT",
            },
            {
              src: "https://img.shields.io/badge/Microservices-gray?style=for-the-badge&logo=hexagonal-architecture&logoColor=white",
              alt: "Microservices",
            },
            {
              src: "https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white",
              alt: "Shadcn/UI",
            },
          ].map((shield) => (
            <a
              key={shield.alt}
              href="#"
              className="hover:opacity-80 transition-opacity"
            >
              <img src={shield.src} alt={shield.alt} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
