"use client";

import { useLocale } from "@/lib/localeContext";

const postsData = [
  {
    id: "1",
    title: "First static post :)",
    url: "#",
    date: "2026-01-01",
    source: "SalehSpace",
    excerpt:
      "First static post to show case the social feed component functionality.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const isArabicText = (text: string) => /[\u0600-\u06FF\u0750-\u077F]/.test(text);

const getIcon = (source: string) => {
  if (source === "x" || source === "linkedin") {
    return (
      <img
        src="https://avatars.githubusercontent.com/u/87912478?v=4"
        alt="Profile"
        className="w-full h-full object-cover"
      />
    );
  } else {
    return (
      <span className="text-xs flex items-center justify-center h-full w-full">
        📝
      </span>
    );
  }
};

const formatDate = (dateString: string, locale: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  if (locale === "ar") {
    // Convert to Arabic-Indic numerals
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const dayAr = day.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
    const monthAr = month.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
    const yearAr = year.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
    return `${dayAr}/${monthAr}/${yearAr}`;
  }
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[month - 1]} ${day}, ${year}`;
};

export default function SocialFeed() {
  const { t, isRTL, locale } = useLocale();
  
  const sortedPosts = postsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedPosts.map((post) => {
        const content = post.excerpt || post.title;
        const isRtlContent = isArabicText(content);
        const dateStr = formatDate(post.date, locale);

        return (
          <article
            key={post.id}
            className={`blog-card rounded-lg p-5 cursor-pointer ${isRTL ? "text-right" : ""}`}
          >
            <div className={`flex justify-between items-start mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <span className="w-8 h-8 rounded-full bg-[#045C5A] border border-[#F6E5C6]/20 flex items-center justify-center overflow-hidden">
                  {getIcon(post.source)}
                </span>
                <div className={`flex flex-col ${isRTL ? "text-right" : ""}`}>
                  <span className="capitalize font-bold text-sm text-[#F6E5C6] leading-none">
                    {isRTL ? "صالح العبيلان" : "Saleh Alobaylan"}
                  </span>
                  <span className={`text-[10px] opacity-60 flex gap-1 items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                    {t.posts.via} <span className="text-[#FFB703]">{post.source}</span>
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono opacity-50 whitespace-nowrap">
                {dateStr}
              </span>
            </div>

            <p
              className={`${
                isRtlContent || isRTL ? "rtl text-right" : "text-left"
              } text-sm opacity-90 leading-relaxed mb-4`}
            >
              {content}
            </p>

            {post.image && (
              <div className="w-full h-48 mb-4 rounded-lg overflow-hidden relative border border-[#F6E5C6]/10">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className={`flex justify-end border-t border-[#F6E5C6]/10 pt-3 mt-2 ${isRTL ? "justify-start" : ""}`}>
              <a
                href={post.url}
                target="_blank"
                className={`flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#F6E5C6] hover:text-[#FFB703] transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {t.posts.viewOn} {post.source}
                <svg
                  className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
