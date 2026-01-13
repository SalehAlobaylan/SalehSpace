"use client";

import { useLocale } from "@/lib/localeContext";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CMSPost {
  id: string;
  title: string;
  content: string;
  author: string;
  media: { id: string; url: string; type: string }[];
  created_at: string;
  updated_at: string;
}

export default function SocialFeed() {
  const { locale } = useLocale();
  const [posts, setPosts] = useState<CMSPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch("/api/posts?limit=5");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
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

  if (posts.length === 0) {
    return (
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-[#F6E5C6] mb-12 text-center">
          {locale === "ar" ? "آخر المنشورات" : "Latest Posts"}
        </h2>
        <p className="text-center text-[#F6E5C6]/70">
          {locale === "ar" ? "لا توجد منشورات حالياً" : "No posts available"}
        </p>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-[#F6E5C6] mb-12 text-center">
        {locale === "ar" ? "آخر المنشورات" : "Latest Posts"}
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/${locale}/posts/${post.id}`}
            className="group bg-[#F6E5C6]/5 backdrop-blur-sm border border-[#F6E5C6]/20 rounded-xl p-6 hover:bg-[#F6E5C6]/10 transition-all duration-300"
          >
            {post.media && post.media[0]?.url && (
              <img
                src={post.media[0].url}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-bold text-[#F6E5C6] mb-2 group-hover:text-[#FFB703] transition-colors">
              {post.title}
            </h3>
            <p className="text-[#F6E5C6]/70 mb-4 line-clamp-2">
              {post.content.substring(0, 150)}...
            </p>
            <div className="flex items-center justify-between text-sm text-[#F6E5C6]/50">
              <span>
                {new Date(post.created_at).toLocaleDateString(
                  locale === "ar" ? "ar-SA" : "en-US"
                )}
              </span>
              {post.author && <span>{post.author}</span>}
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href={`/${locale}/posts`}
          className="text-[#FFB703] hover:text-[#F6E5C6] transition-colors font-medium"
        >
          {locale === "ar" ? "عرض المزيد ←" : "View More →"}
        </Link>
      </div>
    </section>
  );
}
