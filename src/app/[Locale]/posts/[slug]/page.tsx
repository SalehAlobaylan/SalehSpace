import PageWrapper from "@/components/ui/pageWrapper";
import { getPostById } from "@/lib/cms";
import { notFound } from "next/navigation";
import AuthButton from "@/components/admin/authButton";
import PostControls from "@/components/admin/postControls";

export const revalidate = 3600; // ISR: revalidate every hour

interface PostDetailProps {
  params: Promise<{ Locale: "en" | "ar"; slug: string }>;
}

export default async function PostDetail({ params }: PostDetailProps) {
  const { Locale, slug } = await params;
  const post = await getPostById(slug); // slug is actually the UUID id

  if (!post) {
    notFound();
  }

  return (
    <PageWrapper locale={Locale}>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PostControls postId={post.id} locale={Locale} type="post" />
        {post.media && post.media[0] && (
          <img
            src={post.media[0].url}
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl mb-8"
          />
        )}

        <h1 className="text-5xl font-bold text-[#F6E5C6] mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 text-[#F6E5C6]/70 mb-8 text-sm">
          <span>{post.author}</span>
          <span>
            {new Date(post.created_at).toLocaleDateString(
              Locale === "ar" ? "ar-SA" : "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </span>
        </div>

        <div
          className="prose prose-lg prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      <AuthButton />
    </PageWrapper>
  );
}
