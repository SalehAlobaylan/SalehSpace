import PageWrapper from "@/components/ui/pageWrapper";
import PostEditor from "@/components/admin/postEditor";
import AuthButton from "@/components/admin/authButton";
import { getPageById } from "@/lib/cms";
import { notFound } from "next/navigation";

interface EditBlogPageProps {
  params: Promise<{ Locale: "en" | "ar"; slug: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { Locale, slug } = await params;
  const blog = await getPageById(slug);

  if (!blog) {
    notFound();
  }

  return (
    <PageWrapper locale={Locale}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#F6E5C6] mb-8">
          {Locale === "ar" ? "تعديل المدونة" : "Edit Blog"}
        </h1>
        
        <PostEditor
          initialData={{
            id: blog.id,
            title: blog.title,
            content: blog.content,
          }}
          locale={Locale}
          type="page"
        />
      </div>
      <AuthButton />
    </PageWrapper>
  );
}
