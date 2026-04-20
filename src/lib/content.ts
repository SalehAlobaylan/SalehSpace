import "server-only";

import { DatabaseNotConfiguredError, getDbOrNull } from "./db";
import type {
  BlogInput,
  ContentBlog,
  ContentListParams,
  ContentPost,
  PostInput,
  PostListParams,
} from "./content-types";

type PostRow = Omit<ContentPost, "media">;
type BlogRow = ContentBlog;

function clampLimit(limit: number | undefined, fallback = 20): number {
  if (!limit) {
    return fallback;
  }

  return Math.min(Math.max(limit, 1), 100);
}

function normalizePage(page: number | undefined): number {
  return Math.max(page || 1, 1);
}

function getSortColumn(sort: string | undefined): "created_at" | "updated_at" {
  return sort === "updated_at" ? "updated_at" : "created_at";
}

function getSortDirection(order: string | undefined): "ASC" | "DESC" {
  return order === "asc" ? "ASC" : "DESC";
}

function mapPost(row: PostRow): ContentPost {
  return {
    ...row,
    media: [],
  };
}

async function listPosts(params?: PostListParams): Promise<ContentPost[]> {
  const db = getDbOrNull();

  if (!db) {
    return [];
  }

  const page = normalizePage(params?.page);
  const limit = clampLimit(params?.limit);
  const offset = (page - 1) * limit;
  const sortColumn = getSortColumn(params?.sort);
  const sortDirection = getSortDirection(params?.order);
  const author = params?.author?.trim();
  const search = params?.search?.trim();
  const searchTerm = search ? `%${search}%` : null;

  let rows: PostRow[];

  if (author && searchTerm) {
    rows = await db<PostRow[]>`
      SELECT
        id::text,
        title,
        content,
        author,
        created_at::text,
        updated_at::text
      FROM posts
      WHERE author = ${author}
        AND (title ILIKE ${searchTerm} OR content ILIKE ${searchTerm})
      ORDER BY ${db.unsafe(sortColumn)} ${db.unsafe(sortDirection)}
      LIMIT ${limit}
      OFFSET ${offset}
    `;
  } else if (author) {
    rows = await db<PostRow[]>`
      SELECT
        id::text,
        title,
        content,
        author,
        created_at::text,
        updated_at::text
      FROM posts
      WHERE author = ${author}
      ORDER BY ${db.unsafe(sortColumn)} ${db.unsafe(sortDirection)}
      LIMIT ${limit}
      OFFSET ${offset}
    `;
  } else if (searchTerm) {
    rows = await db<PostRow[]>`
      SELECT
        id::text,
        title,
        content,
        author,
        created_at::text,
        updated_at::text
      FROM posts
      WHERE title ILIKE ${searchTerm} OR content ILIKE ${searchTerm}
      ORDER BY ${db.unsafe(sortColumn)} ${db.unsafe(sortDirection)}
      LIMIT ${limit}
      OFFSET ${offset}
    `;
  } else {
    rows = await db<PostRow[]>`
      SELECT
        id::text,
        title,
        content,
        author,
        created_at::text,
        updated_at::text
      FROM posts
      ORDER BY ${db.unsafe(sortColumn)} ${db.unsafe(sortDirection)}
      LIMIT ${limit}
      OFFSET ${offset}
    `;
  }

  return rows.map(mapPost);
}

async function listBlogs(params?: ContentListParams): Promise<ContentBlog[]> {
  const db = getDbOrNull();

  if (!db) {
    return [];
  }

  const page = normalizePage(params?.page);
  const limit = clampLimit(params?.limit);
  const offset = (page - 1) * limit;
  const sortColumn = getSortColumn(params?.sort);
  const sortDirection = getSortDirection(params?.order);
  const search = params?.search?.trim();
  const searchTerm = search ? `%${search}%` : null;

  if (searchTerm) {
    return db<BlogRow[]>`
      SELECT
        id::text,
        title,
        content,
        created_at::text,
        updated_at::text
      FROM blogs
      WHERE title ILIKE ${searchTerm} OR content ILIKE ${searchTerm}
      ORDER BY ${db.unsafe(sortColumn)} ${db.unsafe(sortDirection)}
      LIMIT ${limit}
      OFFSET ${offset}
    `;
  }

  return db<BlogRow[]>`
    SELECT
      id::text,
      title,
      content,
      created_at::text,
      updated_at::text
    FROM blogs
    ORDER BY ${db.unsafe(sortColumn)} ${db.unsafe(sortDirection)}
    LIMIT ${limit}
    OFFSET ${offset}
  `;
}

export async function getPosts(params?: PostListParams): Promise<ContentPost[]> {
  return listPosts(params);
}

export async function getPostById(id: string): Promise<ContentPost | null> {
  const db = getDbOrNull();

  if (!db) {
    return null;
  }

  const [row] = await db<PostRow[]>`
    SELECT
      id::text,
      title,
      content,
      author,
      created_at::text,
      updated_at::text
    FROM posts
    WHERE id = ${id}
    LIMIT 1
  `;

  return row ? mapPost(row) : null;
}

export async function createPost(input: PostInput): Promise<ContentPost> {
  const db = getDbOrNull();

  if (!db) {
    throw new DatabaseNotConfiguredError();
  }

  const [row] = await db<PostRow[]>`
    INSERT INTO posts (title, content, author)
    VALUES (
      ${input.title.trim()},
      ${input.content.trim()},
      ${input.author?.trim() || null}
    )
    RETURNING
      id::text,
      title,
      content,
      author,
      created_at::text,
      updated_at::text
  `;

  return mapPost(row);
}

export async function updatePost(
  id: string,
  input: PostInput
): Promise<ContentPost | null> {
  const db = getDbOrNull();

  if (!db) {
    throw new DatabaseNotConfiguredError();
  }

  const [row] = await db<PostRow[]>`
    UPDATE posts
    SET
      title = ${input.title.trim()},
      content = ${input.content.trim()},
      author = ${input.author?.trim() || null}
    WHERE id = ${id}
    RETURNING
      id::text,
      title,
      content,
      author,
      created_at::text,
      updated_at::text
  `;

  return row ? mapPost(row) : null;
}

export async function deletePost(id: string): Promise<boolean> {
  const db = getDbOrNull();

  if (!db) {
    throw new DatabaseNotConfiguredError();
  }

  const rows = await db<{ id: string }[]>`
    DELETE FROM posts
    WHERE id = ${id}
    RETURNING id::text
  `;

  return rows.length > 0;
}

export async function getPages(
  params?: ContentListParams
): Promise<ContentBlog[]> {
  return listBlogs(params);
}

export async function getPageById(id: string): Promise<ContentBlog | null> {
  const db = getDbOrNull();

  if (!db) {
    return null;
  }

  const [row] = await db<BlogRow[]>`
    SELECT
      id::text,
      title,
      content,
      created_at::text,
      updated_at::text
    FROM blogs
    WHERE id = ${id}
    LIMIT 1
  `;

  return row || null;
}

export async function createPage(input: BlogInput): Promise<ContentBlog> {
  const db = getDbOrNull();

  if (!db) {
    throw new DatabaseNotConfiguredError();
  }

  const [row] = await db<BlogRow[]>`
    INSERT INTO blogs (title, content)
    VALUES (${input.title.trim()}, ${input.content.trim()})
    RETURNING
      id::text,
      title,
      content,
      created_at::text,
      updated_at::text
  `;

  return row;
}

export async function updatePage(
  id: string,
  input: BlogInput
): Promise<ContentBlog | null> {
  const db = getDbOrNull();

  if (!db) {
    throw new DatabaseNotConfiguredError();
  }

  const [row] = await db<BlogRow[]>`
    UPDATE blogs
    SET
      title = ${input.title.trim()},
      content = ${input.content.trim()}
    WHERE id = ${id}
    RETURNING
      id::text,
      title,
      content,
      created_at::text,
      updated_at::text
  `;

  return row || null;
}

export async function deletePage(id: string): Promise<boolean> {
  const db = getDbOrNull();

  if (!db) {
    throw new DatabaseNotConfiguredError();
  }

  const rows = await db<{ id: string }[]>`
    DELETE FROM blogs
    WHERE id = ${id}
    RETURNING id::text
  `;

  return rows.length > 0;
}
