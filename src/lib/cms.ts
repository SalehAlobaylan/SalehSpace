export type Media = {
  id: string;
  url: string;
  type: string;
};

export type CMSPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  media?: Media[];
};

// Update this with your actual DigitalOcean domain/IP
const CMS_API_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "https://your-cms-domain.com/api";
const DEFAULT_FETCH_TIMEOUT_MS = 5000;

export async function fetchWithTimeout(
  url: string,
  init: RequestInit & { timeoutMs?: number } = {}
) {
  const { timeoutMs = DEFAULT_FETCH_TIMEOUT_MS, ...options } = init;
  const controller = new AbortController();
  const timer = setTimeout(() => {
    try {
      controller.abort();
    } catch {}
  }, timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetch all posts from the CMS
 */
export async function fetchPosts(): Promise<CMSPost[]> {
  const res = await fetchWithTimeout(`${CMS_API_BASE_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }

  const result = await res.json();
  // Backend returns {data: [], code: 200, message: "..."}
  return result.data || [];
}

/**
 * Fetch a single post by ID
 */
export async function fetchPost(id: string): Promise<CMSPost> {
  const res = await fetchWithTimeout(`${CMS_API_BASE_URL}/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status}`);
  }

  const result = await res.json();
  // Backend returns {data: {...}, code: 200, message: "..."}
  return result.data;
}

/**
 * Create a new post (requires authentication if implemented)
 */
export async function createPost(
  post: Omit<CMSPost, "id" | "created_at" | "updated_at">
): Promise<CMSPost> {
  const res = await fetchWithTimeout(`${CMS_API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add authentication header if needed
      // "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  if (!res.ok) {
    throw new Error(`Failed to create post: ${res.status}`);
  }

  const result = await res.json();
  // Backend returns {data: {...}, code: 200, message: "..."}
  return result.data;
}

/**
 * Update an existing post (requires authentication if implemented)
 */
export async function updatePost(
  id: string,
  post: Partial<Omit<CMSPost, "id" | "created_at" | "updated_at">>
): Promise<CMSPost> {
  const res = await fetchWithTimeout(`${CMS_API_BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // Add authentication header if needed
      // "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  if (!res.ok) {
    throw new Error(`Failed to update post: ${res.status}`);
  }

  const result = await res.json();
  // Backend returns {data: {...}, code: 200, message: "..."}
  return result.data;
}

/**
 * Delete a post (requires authentication if implemented)
 */
export async function deletePost(id: string): Promise<void> {
  const res = await fetchWithTimeout(`${CMS_API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Add authentication header if needed
      // "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete post: ${res.status}`);
  }
}
