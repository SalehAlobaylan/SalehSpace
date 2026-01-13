-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255),
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    description_ar TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id VARCHAR(50) NOT NULL UNIQUE DEFAULT substring(
        md5(random()::text)
        from 1 for 12
    ),
    title VARCHAR(500) NOT NULL,
    title_ar VARCHAR(500),
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    content_ar TEXT,
    excerpt TEXT,
    excerpt_ar TEXT,
    author VARCHAR(255),
    cover_image TEXT,
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    category VARCHAR(255),
    tags TEXT [],
    read_time INTEGER DEFAULT 1,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);
-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id VARCHAR(50) NOT NULL UNIQUE DEFAULT substring(
        md5(random()::text)
        from 1 for 12
    ),
    title VARCHAR(500) NOT NULL,
    title_ar VARCHAR(500),
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    content_ar TEXT,
    excerpt TEXT,
    excerpt_ar TEXT,
    author VARCHAR(255),
    cover_image TEXT,
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    category VARCHAR(255),
    tags TEXT [],
    read_time INTEGER DEFAULT 1,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);
-- Visitors table
CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    country VARCHAR(100),
    visited_at TIMESTAMPTZ DEFAULT NOW()
);
-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured)
WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(featured)
WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
-- Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
-- RLS Policies for Posts
CREATE POLICY "Public posts are viewable by everyone" ON posts FOR
SELECT USING (published = TRUE);
CREATE POLICY "Authenticated users can insert posts" ON posts FOR
INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update posts" ON posts FOR
UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete posts" ON posts FOR DELETE USING (auth.role() = 'authenticated');
-- RLS Policies for Blogs
CREATE POLICY "Public blogs are viewable by everyone" ON blogs FOR
SELECT USING (published = TRUE);
CREATE POLICY "Authenticated users can insert blogs" ON blogs FOR
INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update blogs" ON blogs FOR
UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete blogs" ON blogs FOR DELETE USING (auth.role() = 'authenticated');
-- RLS Policies for Categories
CREATE POLICY "Categories are viewable by everyone" ON categories FOR
SELECT USING (TRUE);
CREATE POLICY "Authenticated users can manage categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ language 'plpgsql';
CREATE TRIGGER update_posts_updated_at BEFORE
UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE
UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();