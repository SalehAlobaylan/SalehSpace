"use client";

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

const isArabic = (text: string) => /[\u0600-\u06FF\u0750-\u077F]/.test(text);

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

export default function SocialFeed() {
  const sortedPosts = postsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedPosts.map((post) => {
        const content = post.excerpt || post.title;
        const isRtl = isArabic(content);
        const dateStr = new Date(post.date).toLocaleDateString();

        return (
          <article
            key={post.id}
            className="blog-card rounded-lg p-5 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#045C5A] border border-[#F6E5C6]/20 flex items-center justify-center overflow-hidden">
                  {getIcon(post.source)}
                </span>
                <div className="flex flex-col">
                  <span className="capitalize font-bold text-sm text-[#F6E5C6] leading-none">
                    Saleh Alobaylan
                  </span>
                  <span className="text-[10px] opacity-60 flex gap-1 items-center">
                    via <span className="text-[#FFB703]">{post.source}</span>
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono opacity-50 whitespace-nowrap">
                {dateStr}
              </span>
            </div>

            <p
              className={`${
                isRtl ? "rtl text-right" : "text-left"
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

            <div className="flex justify-end border-t border-[#F6E5C6]/10 pt-3 mt-2">
              <a
                href={post.url}
                target="_blank"
                className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#F6E5C6] hover:text-[#FFB703] transition-colors"
              >
                View on {post.source}
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
