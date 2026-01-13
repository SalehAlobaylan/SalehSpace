export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      blogs: {
        Row: Blog;
        Insert: InsertBlog;
        Update: Partial<Blog>;
      };
      posts: {
        Row: Post;
        Insert: InsertPost;
        Update: Partial<Post>;
      };
      categories: {
        Row: Category;
        Insert: InsertCategory;
        Update: Partial<Category>;
      };
      visitors: {
        Row: Visitor;
        Insert: InsertVisitor;
        Update: Partial<Visitor>;
      };
    };
  };
}

export interface Blog {
  id: string;
  public_id: string;
  title: string;
  title_ar: string | null;
  slug: string;
  content: string;
  content_ar: string | null;
  excerpt: string | null;
  excerpt_ar: string | null;
  author: string | null;
  cover_image: string | null;
  published: boolean;
  featured: boolean;
  category: string | null;
  tags: string[] | null;
  read_time: number;
  views: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface Post {
  id: string;
  public_id: string;
  title: string;
  title_ar: string | null;
  slug: string;
  content: string;
  content_ar: string | null;
  excerpt: string | null;
  excerpt_ar: string | null;
  author: string | null;
  cover_image: string | null;
  published: boolean;
  featured: boolean;
  category: string | null;
  tags: string[] | null;
  read_time: number;
  views: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface Category {
  id: string;
  name: string;
  name_ar: string | null;
  slug: string;
  description: string | null;
  description_ar: string | null;
  created_at: string;
}

export interface Visitor {
  id: number;
  ip_address: string;
  user_agent: string | null;
  country: string | null;
  visited_at: string;
}

export type InsertBlog = Omit<
  Blog,
  "id" | "public_id" | "created_at" | "updated_at"
>;
export type InsertPost = Omit<
  Post,
  "id" | "public_id" | "created_at" | "updated_at"
>;
export type InsertCategory = Omit<Category, "id" | "created_at">;
export type InsertVisitor = Omit<Visitor, "id" | "visited_at">;
