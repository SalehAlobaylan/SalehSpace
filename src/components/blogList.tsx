"use client";

const blogsData = [
  {
    id: "b1",
    title: "testing blog component",
    date: "Jan 1, 2026",
    readTime: "8 min read",
    summary:
      "This is a test blog post to demonstrate the blog list component functionality.",
    tags: ["backend", "testing frontend"],
  },
];

export default function BlogList() {
  return (
    <div className="space-y-4">
      {blogsData.map((blog) => (
        <article
          key={blog.id}
          className="blog-card rounded-lg p-5 cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold font-serif text-[#F6E5C6] group-hover:text-[#FFB703] transition-colors">
              {blog.title}
            </h3>
            <span className="text-xs font-mono opacity-50 whitespace-nowrap ml-4">
              {blog.date}
            </span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed mb-4 line-clamp-2">
            {blog.summary}
          </p>
          <div className="flex justify-between items-center border-t border-[#F6E5C6]/10 pt-3 mt-2">
            <div className="flex gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-[#013837] text-[10px] uppercase tracking-wide border border-[#F6E5C6]/10"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-[10px] font-mono opacity-60 flex items-center gap-1">
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
              {blog.readTime}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
