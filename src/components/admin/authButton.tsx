"use client";

import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import PinModal from "./pinModal";
import { translations } from "@/lib/translations";
import { useLocale } from "@/lib/localeContext";

export default function AuthButton() {
  const { isAuthenticated, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { locale } = useLocale();
  const t = translations[locale];

  const handleClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#066D6A]/20 to-[#FFB703]/20 backdrop-blur-sm border border-[#066D6A]/30 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center text-2xl z-50"
        title={isAuthenticated ? (locale === "ar" ? "تسجيل الخروج" : "Logout") : (locale === "ar" ? "تسجيل الدخول" : "Login")}
      >
        {isAuthenticated ? "✓" : "π"}
      </button>

      {showModal && <PinModal onClose={() => setShowModal(false)} />}
    </>
  );
}
