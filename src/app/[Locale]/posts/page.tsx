import PageWrapper from "@/components/ui/pageWrapper";
import AuthButton from "@/components/admin/authButton";
import PostControls from "@/components/admin/postControls";
import { getPosts } from "@/lib/cms";
import Link from "next/link";
import { translations } from "@/lib/translations";

export const revalidate = 60; // ISR: revalidate every 60 seconds

interface PostsPageProps {
  params: Promise<{ Locale: "en" | "ar" }>;
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { Locale } = await params;
  const posts = await getPosts({ limit: 50, sort: "created_at", order: "desc" });
  const t = translations[Locale];

  // Helper to strip HTML tags for preview
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '');
  };

  return (
    <PageWrapper locale={Locale}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="sticky top-0 z-10 bg-[#045C5A]/95 backdrop-blur-md py-4 mb-6 border-b border-[#F6E5C6]/20 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#F6E5C6]">
            {Locale === "ar" ? "المنشورات" : "Posts"}
          </h1>
        </div>
        
        <div className="mb-6">
          <PostControls locale={Locale} type="post" />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 border border-[#F6E5C6]/20 rounded-xl">
            <p className="text-[#F6E5C6]/70 text-lg">
              {Locale === "ar" ? "لا توجد منشورات" : "No posts yet"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col border border-[#F6E5C6]/20 rounded-xl overflow-hidden">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/${Locale}/posts/${post.id}`}
                className="group border-b border-[#F6E5C6]/20 last:border-b-0 hover:bg-[#F6E5C6]/5 transition-colors p-4 flex gap-4"
              >
                {/* Avatar (Left) */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#F6E5C6]/20 flex items-center justify-center text-[#F6E5C6] font-bold border border-[#F6E5C6]/30">
                    {post.author ? post.author[0].toUpperCase() : "S"}
                  </div>
                </div>

                {/* Content (Right) */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-[#F6E5C6] text-[15px] hover:underline">
                      {post.author || "Saleh Alobaylan"}
                    </span>
                    <span className="text-[#F6E5C6]/50 text-[14px]">
                      @{post.author ? post.author.replace(/\s+/g, '').toLowerCase() : "saleh"}
                    </span>
                    <span className="text-[#F6E5C6]/50 text-[14px]">·</span>
                    <span className="text-[#F6E5C6]/50 text-[14px] hover:underline">
                      {new Date(post.created_at).toLocaleDateString(
                        Locale === "ar" ? "ar-SA" : "en-US", 
                        { month: 'short', day: 'numeric' }
                      )}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="text-[#F6E5C6] whitespace-pre-wrap mb-3 text-[15px] leading-normal">
                    {post.title && (
                      <div className="font-bold mb-1">{post.title}</div>
                    )}
                    {stripHtml(post.content).substring(0, 280)}
                    {post.content.length > 280 && "..."}
                  </div>

                  {/* Media */}
                  {post.media && post.media[0] && (
                    <div className="rounded-2xl overflow-hidden border border-[#F6E5C6]/20 mb-3 mt-2">
                      <img
                        src={post.media[0].url}
                        alt={post.title}
                        className="w-full h-auto max-h-[500px] object-cover"
                      />
                    </div>
                  )}

                  {/* Action Bar (UI Only) */}
                  <div className="flex justify-between max-w-md text-[#F6E5C6]/50 mt-3">
                    <div className="flex items-center gap-2 group cursor-pointer hover:text-[#FFB703] transition-colors">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current group-hover:bg-[#FFB703]/10 rounded-full">
                        <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                      </svg>
                      <span className="text-xs group-hover:text-[#FFB703]">0</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer hover:text-green-500 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                      </svg>
                      <span className="text-xs group-hover:text-green-500">0</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer hover:text-red-500 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                      </svg>
                      <span className="text-xs group-hover:text-red-500">0</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer hover:text-[#066D6A] transition-colors">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.29 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
                      </svg>
                    </div>
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
