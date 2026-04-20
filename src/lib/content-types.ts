export interface ContentMedia {
  id: string;
  url: string;
  type: string;
}

export interface ContentPost {
  id: string;
  title: string;
  content: string;
  author: string | null;
  media: ContentMedia[];
  created_at: string;
  updated_at: string;
}

export interface ContentBlog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ContentListParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: string;
}

export interface PostListParams extends ContentListParams {
  author?: string;
}

export interface PostInput {
  title: string;
  content: string;
  author?: string;
}

export interface BlogInput {
  title: string;
  content: string;
}
