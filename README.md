# SalehSpace

## Tech Stack

<p align="left">
  <img src="https://skillicons.dev/icons?i=nextjs" alt="Next.js" height="50" />
  <img src="https://skillicons.dev/icons?i=tailwindcss" alt="Tailwind CSS" height="50" />
  <img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" alt="ShadCN UI" height="50" />
  <img src="https://skillicons.dev/icons?i=postgres" alt="PostgreSQL" height="50" />
  <img src="https://skillicons.dev/icons?i=docker" alt="Docker" height="50" />
</p>

## Main colors for the website:

- Dark Turquoise #045C5A
- Lightweight Beige #F6E5C6 (For font)

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Then Open [http://localhost:3000](http://localhost:3000) with your browser

## Social Media Post Management

This project includes a CLI script to fetch content from Twitter/X and LinkedIn posts and manage them in `public/posts.json`.

### Usage

#### Fetch a single post

```bash
# Just fetch and display
npm run get:post -- --url https://x.com/username/status/123456789

# Fetch and store in posts.json
npm run get:post -- --url https://x.com/username/status/123456789 --store

# Store with custom title and ID
npm run get:post -- --url https://x.com/username/status/123456789 --store --title "My Post" --id "custom-id"
```

#### Fetch multiple posts at once

```bash
npm run get:post -- --url https://x.com/user/status/123 --url https://linkedin.com/posts/user-post --store
```

#### Update all existing posts

```bash
# Refresh excerpts for all posts in posts.json
npm run sync:posts
```

### Supported Platforms

- **Twitter/X**: Uses oEmbed API (public posts) or Twitter API v2 (if `TWITTER_BEARER_TOKEN` is set)
- **LinkedIn**: Uses Open Graph meta tags for basic content extraction

### Environment Variables

- `TWITTER_BEARER_TOKEN` (optional): For richer Twitter data via API v2

### CLI Options

- `--url <url>`: Post URL (can be repeated for multiple posts)
- `--store`: Save to `public/posts.json`
- `--title <title>`: Custom title for the post
- `--id <id>`: Custom ID for the post
- `--update-existing`: Update all existing posts in posts.json
- `--force`: Force update even if content is empty
