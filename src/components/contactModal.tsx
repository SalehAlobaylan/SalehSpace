"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/localeContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL = "salehwleed1@gmail.com";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t, isRTL } = useLocale();
  const [copied, setCopied] = useState(false);

  // Close on escape key + lock body scroll while open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset the copied state whenever the modal re-opens
  useEffect(() => {
    if (isOpen) setCopied(false);
  }, [isOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard API unavailable — selection fallback below still lets users copy manually
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md bg-[#066D6A] border border-[#F6E5C6]/20 rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all duration-300 ${isRTL ? "text-right" : ""}`}
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Copied Notification Banner */}
        <div
          className={`absolute -top-14 left-1/2 -translate-x-1/2 mx-4 px-5 py-2.5 bg-[#FFB703] text-[#013837] font-semibold rounded-lg shadow-lg transform transition-all duration-400 flex items-center gap-2 ${
            copied
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span className={`text-sm ${isRTL ? "font-arabic" : ""}`}>{t.contact.emailCopied}</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} p-2 text-[#F6E5C6]/60 hover:text-[#FFB703] transition-colors rounded-lg hover:bg-[#013837]/30`}
          aria-label={t.contact.close}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className={`mb-5 ${isRTL ? "text-right" : "text-left"}`}>
          <h2 className={`text-2xl font-bold text-[#F6E5C6] mb-2 ${isRTL ? "font-arabic" : ""}`}>
            {t.contact.title}
          </h2>
          <p className={`text-sm text-[#F6E5C6]/60 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
            {t.contact.emailIntro}
          </p>
        </div>

        {/* Email label */}
        <div className={`text-xs font-medium uppercase tracking-wider text-[#F6E5C6]/50 mb-2 ${isRTL ? "font-arabic" : ""}`}>
          {t.contact.email}
        </div>

        {/* Email container: selectable address + copy button */}
        <div className="flex items-stretch gap-2">
          <div
            className="flex-1 min-w-0 flex items-center px-4 py-3 bg-[#013837]/60 border border-[#F6E5C6]/20 rounded-xl"
            dir="ltr"
          >
            <span className="font-mono text-sm md:text-base text-[#F6E5C6] truncate select-all">
              {EMAIL}
            </span>
          </div>
          <button
            onClick={copyEmail}
            className={`shrink-0 flex items-center justify-center gap-2 px-4 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer ${
              copied
                ? "bg-green-500 text-white"
                : "bg-[#FFB703] text-[#013837] hover:bg-[#FFB703]/90 hover:shadow-lg"
            } ${isRTL ? "font-arabic" : ""}`}
            aria-label={t.contact.copy}
          >
            {copied ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
            <span>{copied ? t.contact.copied : t.contact.copy}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
