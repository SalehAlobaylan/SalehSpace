// CMS API Client for Go Backend Integration
// Base URL for the CMS API
const CMS_API_BASE =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:8080/api/v1";

// CMS Data Types matching Go backend models
export interface CMSPost {
  id: string; // UUID
  title: string;
  content: string;
  author: string;
  media: CMSMedia[];
  created_at: string;
  updated_at: string;
}

export interface CMSPage {
  id: string; // UUID
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CMSMedia {
  id: string; // UUID
  url: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface CMSResponse<T> {
  code: number;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    offset: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
  links?: {
    self: string;
    next: string | null;
    prev: string | null;
    first: string;
    last: string;
  };
}

// Fetch posts from CMS
export async function getPosts(params?: {
  page?: number;
  limit?: number;
  author?: string;
  search?: string;
  sort?: string;
  order?: string;
}): Promise<CMSPost[]> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.author) searchParams.set("author[eq]", params.author);
  if (params?.search) searchParams.set("search", params.search);
  if (params?.sort) searchParams.set("sort", params.sort);
  if (params?.order) searchParams.set("order", params.order);

  const url = `${CMS_API_BASE}/posts${
    searchParams.toString() ? "?" + searchParams : ""
  }`;

  try {
    const response = await fetch(url, {
      cache: "no-store", // or use next: { revalidate: 60 } for ISR
    });

    if (!response.ok) {
      console.error("CMS API error:", response.status);
      return [];
    }

    const result: CMSResponse<CMSPost[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Failed to fetch posts from CMS:", error);
    return [];
  }
}

// Fetch a single post by ID
export async function getPostById(id: string): Promise<CMSPost | null> {
  try {
    const response = await fetch(`${CMS_API_BASE}/posts/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result: CMSResponse<CMSPost> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

// Fetch pages from CMS (for blogs)
export async function getPages(params?: {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: string;
}): Promise<CMSPage[]> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);
  if (params?.sort) searchParams.set("sort", params.sort);
  if (params?.order) searchParams.set("order", params.order);

  const url = `${CMS_API_BASE}/pages${
    searchParams.toString() ? "?" + searchParams : ""
  }`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("CMS API error:", response.status);
      return [];
    }

    const result: CMSResponse<CMSPage[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Failed to fetch pages from CMS:", error);
    return [];
  }
}

// Fetch a single page by ID
export async function getPageById(id: string): Promise<CMSPage | null> {
  try {
    const response = await fetch(`${CMS_API_BASE}/pages/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result: CMSResponse<CMSPage> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Failed to fetch page:", error);
    return null;
  }
}

// Create a new post (for admin)
export async function createPost(post: {
  title: string;
  content: string;
  author: string;
  media?: { id: string }[];
}): Promise<CMSPost | null> {
  try {
    const response = await fetch(`${CMS_API_BASE}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      return null;
    }

    const result: CMSResponse<CMSPost> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Failed to create post:", error);
    return null;
  }
}

// Update a post (for admin)
export async function updatePost(
  id: string,
  post: {
    title: string;
    content: string;
    author: string;
    media?: { id: string }[];
  }
): Promise<CMSPost | null> {
  try {
    const response = await fetch(`${CMS_API_BASE}/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      return null;
    }

    const result: CMSResponse<CMSPost> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Failed to update post:", error);
    return null;
  }
}

// Delete a post (for admin)
export async function deletePost(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${CMS_API_BASE}/posts/${id}`, {
      method: "DELETE",
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to delete post:", error);
    return false;
  }
}
// Create a new page
export async function createPage(page: {
  title: string;
  content: string;
}): Promise<CMSPage | null> {
  try {
    const response = await fetch(`${CMS_API_BASE}/pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(page),
    });

    if (!response.ok) {
      console.error("Failed to create page:", response.status);
      return null;
    }

    const result: CMSResponse<CMSPage> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Failed to create page:", error);
    return null;
  }
}

// Update a page
export async function updatePage(
  id: string,
  page: {
    title: string;
    content: string;
  }
): Promise<CMSPage | null> {
  try {
    const response = await fetch(`${CMS_API_BASE}/pages/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(page),
    });

    if (!response.ok) {
      console.error("Failed to update page:", response.status);
      return null;
    }

    const result: CMSResponse<CMSPage> = await response.json();
    return result.data;
  } catch (error) {
    console.error("Failed to update page:", error);
    return null;
  }
}

// Delete a page
export async function deletePage(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${CMS_API_BASE}/pages/${id}`, {
      method: "DELETE",
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to delete page:", error);
    return false;
  }
}
// Helper to get localized content (for bilingual support)
export function getLocalizedPost(post: CMSPost, locale: "en" | "ar"): CMSPost {
  // Since CMS doesn't have built-in i18n, you might store JSON in content
  // or have separate posts for each language
  // For now, return as-is
  return post;
}

export function getLocalizedPage(page: CMSPage, locale: "en" | "ar"): CMSPage {
  return page;
}
