"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/localeContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCopiedNotification: boolean;
}

export default function ContactModal({ isOpen, onClose, showCopiedNotification }: ContactModalProps) {
  const { t, isRTL } = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Close on escape key
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setStatus("idle");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
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
            showCopiedNotification 
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
        <div className={`mb-6 ${isRTL ? "text-right" : "text-left"}`}>
          <h2 className={`text-2xl font-bold text-[#F6E5C6] mb-1 ${isRTL ? "font-arabic" : ""}`}>
            {t.contact.title}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label 
              htmlFor="name" 
              className={`block text-sm font-medium text-[#F6E5C6]/80 mb-1.5 ${isRTL ? "font-arabic text-right" : "text-left"}`}
            >
              {t.contact.name}
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t.contact.namePlaceholder}
              className={`w-full px-4 py-2.5 bg-[#013837]/50 border border-[#F6E5C6]/20 rounded-lg text-[#F6E5C6] placeholder-[#F6E5C6]/40 focus:outline-none focus:border-[#FFB703]/50 focus:ring-1 focus:ring-[#FFB703]/50 transition-colors ${isRTL ? "text-right" : ""}`}
            />
          </div>

          {/* Email Field */}
          <div>
            <label 
              htmlFor="email" 
              className={`block text-sm font-medium text-[#F6E5C6]/80 mb-1.5 ${isRTL ? "font-arabic text-right" : "text-left"}`}
            >
              {t.contact.email}
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={t.contact.emailPlaceholder}
              className={`w-full px-4 py-2.5 bg-[#013837]/50 border border-[#F6E5C6]/20 rounded-lg text-[#F6E5C6] placeholder-[#F6E5C6]/40 focus:outline-none focus:border-[#FFB703]/50 focus:ring-1 focus:ring-[#FFB703]/50 transition-colors ${isRTL ? "text-right" : ""}`}
            />
          </div>

          {/* Message Field */}
          <div>
            <label 
              htmlFor="message" 
              className={`block text-sm font-medium text-[#F6E5C6]/80 mb-1.5 ${isRTL ? "font-arabic text-right" : "text-left"}`}
            >
              {t.contact.message}
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={t.contact.messagePlaceholder}
              className={`w-full px-4 py-2.5 bg-[#013837]/50 border border-[#F6E5C6]/20 rounded-lg text-[#F6E5C6] placeholder-[#F6E5C6]/40 focus:outline-none focus:border-[#FFB703]/50 focus:ring-1 focus:ring-[#FFB703]/50 transition-colors resize-none ${isRTL ? "text-right" : ""}`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
              status === "success"
                ? "bg-green-500 text-white"
                : status === "error"
                ? "bg-red-500 text-white"
                : "bg-[#FFB703] text-[#013837] hover:bg-[#FFB703]/90 hover:shadow-lg"
            } disabled:opacity-70 disabled:cursor-not-allowed ${isRTL ? "font-arabic" : ""}`}
          >
            {status === "sending" && t.contact.sending}
            {status === "success" && t.contact.success}
            {status === "error" && t.contact.error}
            {status === "idle" && t.contact.send}
          </button>
        </form>

        {/* Email Display */}
        <p className="mt-4 text-center text-xs text-[#F6E5C6]/50">
          salehwleed1@gmail.com
        </p>
      </div>
    </div>
  );
}
