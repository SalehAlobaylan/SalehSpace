import PageWrapper from "@/components/ui/pageWrapper";
import PostEditor from "@/components/admin/postEditor";
import AuthButton from "@/components/admin/authButton";

interface NewBlogPageProps {
  params: Promise<{ Locale: "en" | "ar" }>;
}

export default async function NewBlogPage({ params }: NewBlogPageProps) {
  const { Locale } = await params;

  return (
    <PageWrapper locale={Locale}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#F6E5C6] mb-8">
          {Locale === "ar" ? "مدونة جديدة" : "New Blog"}
        </h1>
        
        <PostEditor locale={Locale} type="page" />
      </div>
      <AuthButton />
    </PageWrapper>
  );
}
