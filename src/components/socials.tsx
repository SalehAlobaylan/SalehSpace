"use client";

import { useState } from "react";
import { useLocale } from "@/lib/localeContext";
import ContactModal from "@/components/contactModal";

export default function Socials() {
  const { t, isRTL } = useLocale();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCopiedNotification, setShowCopiedNotification] = useState(false);

  const handleEmailClick = () => {
    // Copy email to clipboard
    navigator.clipboard.writeText("salehwleed1@gmail.com");
    setShowCopiedNotification(true);
    setShowContactModal(true);
    
    // Hide the notification after 3 seconds
    setTimeout(() => setShowCopiedNotification(false), 3000);
  };
  
  return (
    <>
    <div className={`flex flex-wrap justify-center gap-2 md:gap-4 pt-2 pb-4 md:pb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
      <a
        href="https://github.com/SalehAlobaylan"
        target="_blank"
        className="flex items-center gap-1.5 text-[10px] md:text-xs hover:text-[#FFB703] transition-colors group"
        aria-label="GitHub"
      >
        <svg
          className="w-4 h-4 md:w-4 md:h-4 opacity-70 group-hover:opacity-100"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="font-mono">{t.socials.github}</span>
      </a>
      <a
        href="https://linkedin.com/in/salehalobaylan"
        target="_blank"
        className="flex items-center gap-1.5 text-[10px] md:text-xs hover:text-[#FFB703] transition-colors group"
        aria-label="LinkedIn"
      >
        <svg
          className="w-4 h-4 md:w-4 md:h-4 opacity-70 group-hover:opacity-100"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
        </svg>
        <span className="font-mono">{t.socials.linkedin}</span>
      </a>
      <a
        href="https://x.com/SAlobaylan"
        target="_blank"
        className="flex items-center gap-1.5 text-[10px] md:text-xs hover:text-[#FFB703] transition-colors group"
        aria-label="X / Twitter"
      >
        <svg
          className="w-4 h-4 md:w-4 md:h-4 opacity-70 group-hover:opacity-100"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
        </svg>
        <span className="font-mono">{t.socials.twitter}</span>
      </a>
      <button
        onClick={handleEmailClick}
        className="relative flex items-center gap-1.5 text-[10px] md:text-xs hover:text-[#FFB703] transition-colors group cursor-pointer"
        aria-label="Copy email to clipboard"
      >
        <svg
          className="w-4 h-4 md:w-4 md:h-4 opacity-70 group-hover:opacity-100"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
        <span className="font-mono">{t.socials.email}</span>
      </button>
    </div>

    {/* Contact Modal */}
    <ContactModal 
      isOpen={showContactModal} 
      onClose={() => setShowContactModal(false)}
      showCopiedNotification={showCopiedNotification}
    />
    </>
  );
}