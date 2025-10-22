"use client";

import { useState, useEffect } from "react";
import { CMSPost } from "@/lib/cms";

const CMS_API_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "https://your-cms-domain.com/api";

/**
 * Client-side hook to fetch posts from the CMS
 */
export function usePosts() {
  const [posts, setPosts] = useState<CMSPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${CMS_API_BASE_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }

      const result = await response.json();
      // Backend returns {data: [], code: 200, message: "..."}
      setPosts(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, refetch: fetchPosts };
}

/**
 * Client-side hook to fetch a single post by ID
 */
export function usePost(id: string) {
  const [post, setPost] = useState<CMSPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${CMS_API_BASE_URL}/posts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }

        const result = await response.json();
        // Backend returns {data: {...}, code: 200, message: "..."}
        setPost(result.data || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch post");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { post, loading, error };
}
