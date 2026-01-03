"use client";

import { useLocale } from "@/lib/localeContext";

const blogsData = [
  {
    id: "b1",
    title: "testing blog component",
    titleAr: "اختبار مكون المدونة",
    date: "Jan 1, 2026",
    dateAr: "١ يناير ٢٠٢٦",
    readTime: 8,
    summary:
      "This is a test blog post to demonstrate the blog list component functionality.",
    summaryAr:
      "هذه مقالة اختبارية لإظهار وظيفة مكون قائمة المدونة.",
    tags: ["backend", "testing frontend"],
    tagsAr: ["خلفية", "اختبار الواجهة"],
  },
];

export default function BlogList() {
  const { t, isRTL, locale } = useLocale();
  
  return (
    <div className="space-y-4">
      {blogsData.map((blog) => (
        <article
          key={blog.id}
          className={`blog-card rounded-lg p-5 cursor-pointer group ${isRTL ? "text-right" : ""}`}
        >
          <div className={`flex justify-between items-start mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <h3 className="text-lg font-bold font-serif text-[#F6E5C6] group-hover:text-[#FFB703] transition-colors">
              {locale === "ar" ? blog.titleAr : blog.title}
            </h3>
            <span className={`text-xs font-mono opacity-50 whitespace-nowrap ${isRTL ? "mr-0 ml-4" : "ml-4"}`}>
              {locale === "ar" ? blog.dateAr : blog.date}
            </span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed mb-4 line-clamp-2">
            {locale === "ar" ? blog.summaryAr : blog.summary}
          </p>
          <div className={`flex justify-between items-center border-t border-[#F6E5C6]/10 pt-3 mt-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              {(locale === "ar" ? blog.tagsAr : blog.tags).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-[#013837] text-[10px] uppercase tracking-wide border border-[#F6E5C6]/10"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className={`text-[10px] font-mono opacity-60 flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {blog.readTime} {t.blogs.minRead}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
