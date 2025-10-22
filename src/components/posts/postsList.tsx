"use client";

import { usePosts } from "@/hooks/usePosts";
import Post from "./post";
import CreatePostDialog from "./createPostDialog";
import { useState } from "react";

export default function PostsList() {
  const { posts, loading, error, refetch } = usePosts();
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="flex justify-end mb-6">
          <CreatePostDialog onPostCreated={refetch} />
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const isDatabaseError = error.includes("relation") || error.includes("does not exist");
    
    return (
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="flex justify-end mb-6">
          <CreatePostDialog onPostCreated={refetch} />
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md space-y-3">
            <p className="text-destructive mb-2">⚠️ Error loading posts</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            {isDatabaseError ? (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3 mt-4">
                <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium mb-1">
                  Database Migration Required
                </p>
                <p className="text-xs text-muted-foreground">
                  The posts table doesn't exist. Run your database migrations on DigitalOcean.
                </p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground mt-4">
                Make sure NEXT_PUBLIC_CMS_API_URL is set correctly in your environment variables
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="flex justify-end mb-6">
          <CreatePostDialog onPostCreated={refetch} />
        </div>
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <p className="text-muted-foreground text-center">
            📝 No posts available yet
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Click "Create New Post" to get started!
          </p>
        </div>
      </div>
    );
  }

  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <h2 className="text-2xl font-bold">All Posts ({posts.length})</h2>
        <div className="flex gap-2 items-center">
          {/* Sort Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("newest")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === "newest"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setSortBy("oldest")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === "oldest"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Oldest
            </button>
          </div>
          {/* Create Post Button */}
          <CreatePostDialog onPostCreated={refetch} />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {sortedPosts.map((post) => (
          <Post key={post.id} post={post} compact />
        ))}
      </div>
    </div>
  );
}


