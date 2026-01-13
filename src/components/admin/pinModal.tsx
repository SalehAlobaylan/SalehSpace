"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/authContext";
import { translations } from "@/lib/translations";
import { useLocale } from "@/lib/localeContext";

interface PinModalProps {
  onClose: () => void;
}

export default function PinModal({ onClose }: PinModalProps) {
  const { login } = useAuth();
  const { locale } = useLocale();
  const t = translations[locale];
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (pin.length !== 6) {
      setError(locale === "ar" ? "يجب أن يتكون الرمز من 6 أرقام" : "PIN must be 6 digits");
      return;
    }

    setIsLoading(true);

    const success = await login(pin);

    if (success) {
      onClose();
    } else {
      setError(locale === "ar" ? "رمز PIN غير صحيح" : "Incorrect PIN");
      setPin("");
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-gradient-to-br from-[#F6E5C6] to-white p-8 rounded-2xl shadow-2xl border border-[#066D6A]/20 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-[#066D6A] mb-6 text-center">
          {locale === "ar" ? "أدخل رمز PIN" : "Enter PIN"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={inputRef}
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#066D6A]/30 focus:border-[#066D6A] focus:outline-none text-center text-2xl tracking-widest bg-white"
            placeholder="••••••"
            disabled={isLoading}
          />

          {error && (
            <p className="text-red-600 text-sm text-center font-medium">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 font-medium"
            >
              {locale === "ar" ? "إلغاء" : "Cancel"}
            </button>
            <button
              type="submit"
              disabled={isLoading || pin.length !== 6}
              className="flex-1 px-4 py-3 rounded-lg bg-[#066D6A] hover:bg-[#055959] text-white transition-colors disabled:opacity-50 font-medium"
            >
              {isLoading
                ? locale === "ar"
                  ? "جارٍ التحقق..."
                  : "Verifying..."
                : locale === "ar"
                ? "تسجيل الدخول"
                : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
