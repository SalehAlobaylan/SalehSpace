"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PostEditorProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    author?: string;
  };
  locale: "en" | "ar";
  type: "post" | "page";
}

export default function PostEditor({ initialData, locale, type }: PostEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    author: initialData?.author || "Saleh Alobaylan",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.content.trim()) {
      setError(locale === "ar" ? "يرجى ملء جميع الحقول" : "Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = initialData?.id
        ? type === "post" ? `/api/posts/${initialData.id}` : `/api/blogs/${initialData.id}`
        : type === "post" ? "/api/posts" : "/api/blogs";

      const method = initialData?.id ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.data) {
        router.push(`/${locale}/${type === "post" ? "posts" : "blog"}/${result.data.id}`);
        router.refresh();
      } else {
        setError(result.error || (locale === "ar" ? "فشلت العملية" : "Operation failed"));
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError(locale === "ar" ? "حدث خطأ" : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (initialData?.id) {
      router.push(`/${locale}/${type === "post" ? "posts" : "blog"}/${initialData.id}`);
    } else {
      router.push(`/${locale}/${type === "post" ? "posts" : "blog"}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div>
        <label className="block text-[#F6E5C6] font-medium mb-2">
          {locale === "ar" ? "العنوان" : "Title"}
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-[#F6E5C6]/10 border border-[#F6E5C6]/20 text-[#F6E5C6] placeholder-[#F6E5C6]/50 focus:outline-none focus:border-[#FFB703]"
          placeholder={locale === "ar" ? "أدخل العنوان..." : "Enter title..."}
          disabled={isSubmitting}
        />
      </div>

      {type === "post" && (
        <div>
          <label className="block text-[#F6E5C6] font-medium mb-2">
            {locale === "ar" ? "الكاتب" : "Author"}
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-[#F6E5C6]/10 border border-[#F6E5C6]/20 text-[#F6E5C6] placeholder-[#F6E5C6]/50 focus:outline-none focus:border-[#FFB703]"
            placeholder={locale === "ar" ? "أدخل اسم الكاتب..." : "Enter author name..."}
            disabled={isSubmitting}
          />
        </div>
      )}

      <div>
        <label className="block text-[#F6E5C6] font-medium mb-2">
          {locale === "ar" ? "المحتوى" : "Content"}
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={15}
          className="w-full px-4 py-3 rounded-lg bg-[#F6E5C6]/10 border border-[#F6E5C6]/20 text-[#F6E5C6] placeholder-[#F6E5C6]/50 focus:outline-none focus:border-[#FFB703] font-mono text-sm"
          placeholder={locale === "ar" ? "أدخل المحتوى (HTML مدعوم)..." : "Enter content (HTML supported)..."}
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-[#066D6A] hover:bg-[#055959] text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isSubmitting
            ? locale === "ar" ? "جارٍ الحفظ..." : "Saving..."
            : locale === "ar" ? "حفظ" : "Save"}
        </button>

        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="px-8 py-3 bg-[#F6E5C6]/10 hover:bg-[#F6E5C6]/20 text-[#F6E5C6] rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {locale === "ar" ? "إلغاء" : "Cancel"}
        </button>
      </div>
    </form>
  );
}
