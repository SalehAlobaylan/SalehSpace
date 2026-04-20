import { NextResponse } from "next/server";
import { createPage, getPages } from "@/lib/content";
import { DatabaseNotConfiguredError, isDatabaseConfigured } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const search = searchParams.get("search");

    const blogs = await getPages({
      limit: limit ? parseInt(limit) : 20,
      page: page ? parseInt(page) : 1,
      search: search || undefined,
      sort: "created_at",
      order: "desc",
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs from CMS:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
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
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const page = await createPage({ title, content });
    return NextResponse.json({ data: page });
  } catch (error) {
    if (error instanceof DatabaseNotConfiguredError) {
      return NextResponse.json(
        { error: "DATABASE_URL is not configured yet" },
        { status: 503 }
      );
    }

    console.error("Error creating page:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
