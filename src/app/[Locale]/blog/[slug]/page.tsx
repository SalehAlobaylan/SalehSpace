import PageWrapper from "@/components/ui/pageWrapper";
import { getPageById } from "@/lib/cms";
import { notFound } from "next/navigation";
import AuthButton from "@/components/admin/authButton";
import PostControls from "@/components/admin/postControls";

export const revalidate = 3600; // ISR: revalidate every hour

interface BlogDetailProps {
  params: Promise<{ Locale: "en" | "ar"; slug: string }>;
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { Locale, slug } = await params;
  const blog = await getPageById(slug); // slug is actually the UUID id

  if (!blog) {
    notFound();
  }

  return (
    <PageWrapper locale={Locale}>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PostControls postId={blog.id} locale={Locale} type="page" />
        <h1 className="text-5xl font-bold text-[#F6E5C6] mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center gap-6 text-[#F6E5C6]/70 mb-8 text-sm">
          <span>
            {new Date(blog.created_at).toLocaleDateString(
              Locale === "ar" ? "ar-SA" : "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </span>
        </div>

        <div
          className="prose prose-lg prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
      <AuthButton />
    </PageWrapper>
  );
}
