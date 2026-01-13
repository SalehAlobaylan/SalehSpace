import { supabase, createServerClient, isSupabaseConfigured } from "./supabase";
import type {
  Blog,
  Post,
  Category,
  InsertBlog,
  InsertPost,
} from "./database.types";

// ============================================
// BLOGS
// ============================================

export async function getPublishedBlogs(limit?: number): Promise<Blog[]> {
  if (!isSupabaseConfigured()) return [];

  let query = supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }

  return (data as Blog[]) || [];
}

export async function getFeaturedBlogs(limit = 3): Promise<Blog[]> {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured blogs:", error);
    return [];
  }

  return (data as Blog[]) || [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("Error fetching blog:", error);
    return null;
  }

  return data as Blog;
}

export async function incrementBlogViews(blogId: string): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const { data: blog } = await supabase
    .from("blogs")
    .select("views")
    .eq("id", blogId)
    .single();

  if (blog) {
    const currentViews = (blog as { views: number }).views || 0;
    await supabase
      .from("blogs")
      .update({ views: currentViews + 1 } as never)
      .eq("id", blogId);
  }
}

// ============================================
// POSTS
// ============================================

export async function getPublishedPosts(limit?: number): Promise<Post[]> {
  if (!isSupabaseConfigured()) return [];

  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return (data as Post[]) || [];
}

export async function getFeaturedPosts(limit = 5): Promise<Post[]> {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }

  return (data as Post[]) || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return data as Post;
}

export async function incrementPostViews(postId: string): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const { data: post } = await supabase
    .from("posts")
    .select("views")
    .eq("id", postId)
    .single();

  if (post) {
    const currentViews = (post as { views: number }).views || 0;
    await supabase
      .from("posts")
      .update({ views: currentViews + 1 } as never)
      .eq("id", postId);
  }
}

// ============================================
// CATEGORIES
// ============================================

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return (data as Category[]) || [];
}

// ============================================
// SERVER-SIDE ADMIN FUNCTIONS
// ============================================

export async function createBlog(blog: InsertBlog): Promise<Blog | null> {
  const supabaseServer = createServerClient();

  const { data, error } = await supabaseServer
    .from("blogs")
    .insert(blog as never)
    .select()
    .single();

  if (error) {
    console.error("Error creating blog:", error);
    return null;
  }

  return data as Blog;
}

export async function updateBlog(
  id: string,
  updates: Partial<Blog>
): Promise<Blog | null> {
  const supabaseServer = createServerClient();

  const { data, error } = await supabaseServer
    .from("blogs")
    .update(updates as never)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog:", error);
    return null;
  }

  return data as Blog;
}

export async function deleteBlog(id: string): Promise<boolean> {
  const supabaseServer = createServerClient();

  const { error } = await supabaseServer.from("blogs").delete().eq("id", id);

  if (error) {
    console.error("Error deleting blog:", error);
    return false;
  }

  return true;
}

export async function createPost(post: InsertPost): Promise<Post | null> {
  const supabaseServer = createServerClient();

  const { data, error } = await supabaseServer
    .from("posts")
    .insert(post as never)
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error);
    return null;
  }

  return data as Post;
}

export async function updatePost(
  id: string,
  updates: Partial<Post>
): Promise<Post | null> {
  const supabaseServer = createServerClient();

  const { data, error } = await supabaseServer
    .from("posts")
    .update(updates as never)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating post:", error);
    return null;
  }

  return data as Post;
}

export async function deletePost(id: string): Promise<boolean> {
  const supabaseServer = createServerClient();

  const { error } = await supabaseServer.from("posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting post:", error);
    return false;
  }

  return true;
}

// ============================================
// CONTENT BY LOCALE
// ============================================

export function getLocalizedContent<T extends Blog | Post>(
  content: T,
  locale: "en" | "ar"
): T & {
  localizedTitle: string;
  localizedContent: string;
  localizedExcerpt: string | null;
} {
  return {
    ...content,
    localizedTitle:
      locale === "ar" && content.title_ar ? content.title_ar : content.title,
    localizedContent:
      locale === "ar" && content.content_ar
        ? content.content_ar
        : content.content,
    localizedExcerpt:
      locale === "ar" && content.excerpt_ar
        ? content.excerpt_ar
        : content.excerpt,
  };
}
