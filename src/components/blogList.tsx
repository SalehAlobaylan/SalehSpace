"use client";

import { useLocale } from "@/lib/localeContext";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CMSPage {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function BlogList() {
  const { locale } = useLocale();
  const [blogs, setBlogs] = useState<CMSPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const response = await fetch("/api/blogs?limit=3");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-[#F6E5C6] mb-12 text-center">
          {locale === "ar" ? "جارٍ التحميل..." : "Loading..."}
        </h2>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-[#F6E5C6] mb-12 text-center">
          {locale === "ar" ? "المدونات المميزة" : "Featured Blogs"}
        </h2>
        <p className="text-center text-[#F6E5C6]/70">
          {locale === "ar" ? "لا توجد مدونات حالياً" : "No blogs available"}
        </p>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-[#F6E5C6] mb-12 text-center">
        {locale === "ar" ? "المدونات المميزة" : "Featured Blogs"}
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/${locale}/blog/${blog.id}`}
            className="group bg-[#F6E5C6]/5 backdrop-blur-sm border border-[#F6E5C6]/20 rounded-xl p-6 hover:bg-[#F6E5C6]/10 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-[#F6E5C6] mb-2 group-hover:text-[#FFB703] transition-colors">
              {blog.title}
            </h3>
            <p className="text-[#F6E5C6]/70 mb-4 line-clamp-2">
              {blog.content.substring(0, 150)}...
            </p>
            <div className="flex items-center justify-between text-sm text-[#F6E5C6]/50">
              <span>
                {new Date(blog.created_at).toLocaleDateString(
                  locale === "ar" ? "ar-SA" : "en-US"
                )}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href={`/${locale}/blog`}
          className="text-[#FFB703] hover:text-[#F6E5C6] transition-colors font-medium"
        >
          {locale === "ar" ? "عرض المزيد ←" : "View More →"}
        </Link>
      </div>
    </section>
  );
}
