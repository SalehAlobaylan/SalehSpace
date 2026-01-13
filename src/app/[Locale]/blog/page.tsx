import PageWrapper from "@/components/ui/pageWrapper";
import AuthButton from "@/components/admin/authButton";
import PostControls from "@/components/admin/postControls";
import { getPages } from "@/lib/cms";
import Link from "next/link";

export const revalidate = 60; // ISR: revalidate every 60 seconds

interface BlogPageProps {
  params: Promise<{ Locale: "en" | "ar" }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { Locale } = await params;
  const blogs = await getPages({ limit: 50, sort: "created_at", order: "desc" });

  return (
    <PageWrapper locale={Locale}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#F6E5C6] mb-8">
          {Locale === "ar" ? "المدونات" : "Blogs"}
        </h1>
        
        <PostControls locale={Locale} type="page" />

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#F6E5C6]/70 text-lg">
              {Locale === "ar" ? "لا توجد مدونات" : "No blogs yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/${Locale}/blog/${blog.id}`}
                className="group"
              >
                <div className="bg-[#F6E5C6]/5 backdrop-blur-sm border border-[#F6E5C6]/20 rounded-xl p-6 hover:bg-[#F6E5C6]/10 transition-all duration-300 h-full">
                  <h2 className="text-xl font-bold text-[#F6E5C6] mb-2 group-hover:text-[#FFB703] transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-[#F6E5C6]/70 mb-4 line-clamp-3">
                    {blog.content.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between text-sm text-[#F6E5C6]/50">
                    <span>
                      {new Date(blog.created_at).toLocaleDateString(
                        Locale === "ar" ? "ar-SA" : "en-US"
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <AuthButton />
    </PageWrapper>
  );
}
