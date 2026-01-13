"use client";

import { useAuth } from "@/lib/authContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PostControlsProps {
  postId?: string;
  locale: "en" | "ar";
  type: "post" | "page";
}

export default function PostControls({ postId, locale, type }: PostControlsProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isAuthenticated) return null;

  const handleDelete = async () => {
    if (!postId) return;

    const confirmMessage = locale === "ar" 
      ? `هل أنت متأكد من حذف هذا ${type === "post" ? "المنشور" : "المدونة"}?`
      : `Are you sure you want to delete this ${type}?`;

    if (!confirm(confirmMessage)) return;

    setIsDeleting(true);

    try {
      const endpoint = type === "post" ? `/api/posts/${postId}` : `/api/blogs/${postId}`;
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push(`/${locale}/${type === "post" ? "posts" : "blog"}`);
        router.refresh();
      } else {
        alert(locale === "ar" ? "فشل الحذف" : "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(locale === "ar" ? "حدث خطأ" : "An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    if (postId) {
      router.push(`/${locale}/${type === "post" ? "posts" : "blog"}/${postId}/edit`);
    }
  };

  const handleCreate = () => {
    router.push(`/${locale}/${type === "post" ? "posts" : "blog"}/new`);
  };

  return (
    <div className="flex gap-3 my-6">
      {!postId && (
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-[#066D6A] hover:bg-[#055959] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <span>+</span>
          {locale === "ar" ? "إنشاء جديد" : "Create New"}
        </button>
      )}

      {postId && (
        <>
          <button
            onClick={handleEdit}
            className="px-6 py-3 bg-[#FFB703] hover:bg-[#FF9500] text-[#045C5A] rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span>✎</span>
            {locale === "ar" ? "تعديل" : "Edit"}
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <span>🗑</span>
            {isDeleting
              ? locale === "ar" ? "جارٍ الحذف..." : "Deleting..."
              : locale === "ar" ? "حذف" : "Delete"}
          </button>
        </>
      )}
    </div>
  );
}
