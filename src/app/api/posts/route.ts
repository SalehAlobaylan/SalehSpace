import { NextResponse } from "next/server";
import { DatabaseNotConfiguredError, isDatabaseConfigured } from "@/lib/db";
import { createPost, getPosts } from "@/lib/content";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const search = searchParams.get("search");
    const author = searchParams.get("author");

    const posts = await getPosts({
      limit: limit ? parseInt(limit) : 20,
      page: page ? parseInt(page) : 1,
      search: search || undefined,
      author: author || undefined,
      sort: "created_at",
      order: "desc",
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts from CMS:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { error: "DATABASE_URL is not configured yet" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { title, content, author } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const post = await createPost({ title, content, author });
    return NextResponse.json({ data: post });
  } catch (error) {
    if (error instanceof DatabaseNotConfiguredError) {
      return NextResponse.json(
        { error: "DATABASE_URL is not configured yet" },
        { status: 503 }
      );
    }

    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
