"use client";

const postsData = [
  {
    id: "1",
    title: "Building Microservices with Go",
    url: "#",
    date: "2024-05-15",
    source: "x",
    excerpt:
      "Why I switched from Python to Go for high-throughput microservices. The concurrency model is a game changer. #golang #backend",
    image:
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    title: "My journey rebuilding SalehSpace",
    url: "#",
    date: "2024-04-10",
    source: "linkedin",
    excerpt:
      "It's been 8 years since my first commit. Rebuilding my portfolio has been a lesson in minimalism and restraint.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    title: "أهمية هيكلة البيانات في الأنظمة الكبيرة",
    url: "#",
    date: "2024-03-22",
    source: "x",
    excerpt:
      "في الانظمة المعقدة، تصميم قاعدة البيانات هو الاساس. اذا كان الاساس ضعيف، النظام كله بينهار مع زيادة الحمل.",
    image: null,
  },
  {
    id: "4",
    title: "Event-Driven Architecture 101",
    url: "#",
    date: "2024-02-18",
    source: "blog",
    excerpt:
      "Decoupling services using Kafka. A deep dive into producers, consumers, and topic partitions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "5",
    title: "Docker vs Podman",
    url: "#",
    date: "2024-01-05",
    source: "linkedin",
    excerpt:
      "Exploring daemonless container engines. Is it time to switch? My thoughts on security and DX.",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&auto=format&fit=crop&q=60",
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
