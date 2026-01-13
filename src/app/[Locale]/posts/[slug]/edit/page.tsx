import PageWrapper from "@/components/ui/pageWrapper";
import PostEditor from "@/components/admin/postEditor";
import AuthButton from "@/components/admin/authButton";
import { getPostById } from "@/lib/cms";
import { notFound } from "next/navigation";

interface EditPostPageProps {
  params: Promise<{ Locale: "en" | "ar"; slug: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { Locale, slug } = await params;
  const post = await getPostById(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageWrapper locale={Locale}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#F6E5C6] mb-8">
          {Locale === "ar" ? "تعديل المنشور" : "Edit Post"}
        </h1>
        
        <PostEditor
          initialData={{
            id: post.id,
            title: post.title,
            content: post.content,
            author: post.author,
          }}
          locale={Locale}
          type="post"
        />
      </div>
      <AuthButton />
    </PageWrapper>
  );
}
