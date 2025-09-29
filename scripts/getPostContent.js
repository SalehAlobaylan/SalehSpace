#!/usr/bin/env node
/**
 * Fetch content of a post from Twitter/X or LinkedIn.
 *
 * Usage:
 *   node scripts/getPostContent.js --url <postUrl> [--url <postUrl> ...] [--store] [--title <title>] [--id <id>] [--update-existing] [--force]
 *   npm run get:post -- --url <postUrl> [--url <postUrl> ...] [--store] [--title <title>] [--id <id>] [--update-existing] [--force]
 *
 * Env (optional for Twitter API v2):
 *   TWITTER_BEARER_TOKEN=xxxxx
 */

const https = require('https');
const { URL } = require('url');
const ogs = require('open-graph-scraper');
const fs = require('fs');
const path = require('path');

function decodeHtmlEntities(input) {
  if (!input) return input;
  const named = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&ndash;': '–',
    '&mdash;': '—',
    '&hellip;': '…',
    '&lsquo;': '‘',
    '&rsquo;': '’',
    '&ldquo;': '“',
    '&rdquo;': '”',
  };
  let output = input.replace(/&(amp|lt|gt|quot|#39|apos|nbsp|ndash|mdash|hellip|lsquo|rsquo|ldquo|rdquo);/g, (m) => named[m] || m);
  // numeric decimal
  output = output.replace(/&#(\d+);/g, (_, d) => {
    const code = Number(d);
    return Number.isFinite(code) ? String.fromCodePoint(code) : _;
  });
  // numeric hex
  output = output.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => {
    const code = parseInt(h, 16);
    return Number.isFinite(code) ? String.fromCodePoint(code) : _;
  });
  return output;
}

function extractParagraphTextFromHtml(html) {
  if (!html) return '';
  const withoutScripts = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  const match = withoutScripts.match(/<p[^>]*>([\s\s\S]*?)<\/p>/i);
  const inner = match ? match[1] : withoutScripts;
  const text = inner
    .replace(/<br\s*\/?>(\s*)/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
  return decodeHtmlEntities(text);
}

function parseArgs(argv) {
  const args = { urls: [] };
  for (let i = 2; i < argv.length; i += 1) {
    const key = argv[i];
    const next = argv[i + 1];
    if (key === '--url' || key === '-u') {
      if (next && !next.startsWith('--')) {
        args.urls.push(next);
        args.url = next; // keep last for backward compatibility
        i += 1;
      }
    } else if (key === '--store' || key === '-s') {
      args.store = true;
    } else if (key === '--title' || key === '-t') {
      args.title = next;
      i += 1;
    } else if (key === '--id' || key === '-i') {
      args.id = next;
      i += 1;
    } else if (key === '--update-existing' || key === '--update') {
      args.updateExisting = true;
    } else if (key === '--force' || key === '-f') {
      args.force = true;
    }
  }
  return args;
}

function isTwitterUrl(urlString) {
  try {
    const u = new URL(urlString);
    return (
      u.hostname === 'twitter.com' ||
      u.hostname === 'www.twitter.com' ||
      u.hostname === 'x.com' ||
      u.hostname === 'www.x.com'
    );
  } catch (_) {
    return false;
  }
}

function isLinkedInUrl(urlString) {
  try {
    const u = new URL(urlString);
    return u.hostname.endsWith('linkedin.com');
  } catch (_) {
    return false;
  }
}

function httpsGetJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, json });
        } catch (err) {
          reject(new Error(`Failed to parse JSON from ${url}: ${err.message}`));
        }
      });
    });
    req.on('error', reject);
  });
}

async function fetchTwitterViaOEmbed(targetUrl) {
  // publish.twitter.com oembed works for many public tweets
  const oembedUrl = new URL('https://publish.twitter.com/oembed');
  oembedUrl.searchParams.set('url', targetUrl);
  const { status, json } = await httpsGetJson(oembedUrl.toString());
  if (status !== 200) {
    throw new Error(`Twitter oEmbed failed with status ${status}`);
  }
  // oEmbed returns HTML; extract text roughly by stripping tags
  const html = json.html || '';
  const text = extractParagraphTextFromHtml(html);
  return {
    platform: 'twitter',
    method: 'oembed',
    author: json.author_name || null,
    url: targetUrl,
    raw: json,
    content: text,
  };
}

function extractTweetIdFromUrl(targetUrl) {
  try {
    const u = new URL(targetUrl);
    // formats like /{user}/status/{id}
    const parts = u.pathname.split('/').filter(Boolean);
    const statusIndex = parts.findIndex((p) => p === 'status');
    if (statusIndex >= 0 && parts[statusIndex + 1]) {
      return parts[statusIndex + 1];
    }
    return null;
  } catch (_) {
    return null;
  }
}

async function fetchTwitterViaApi(targetUrl) {
  const bearer = process.env.TWITTER_BEARER_TOKEN;
  if (!bearer) throw new Error('TWITTER_BEARER_TOKEN not set');
  const tweetId = extractTweetIdFromUrl(targetUrl);
  if (!tweetId) throw new Error('Could not parse tweet ID from URL');
  const fields = new URLSearchParams({
    'tweet.fields': 'created_at,lang,public_metrics,entities,author_id',
    expansions: 'author_id',
    'user.fields': 'name,username,verified',
  }).toString();
  const apiUrl = `https://api.twitter.com/2/tweets/${tweetId}?${fields}`;
  const { status, json } = await httpsGetJson(apiUrl, {
    Authorization: `Bearer ${bearer}`,
  });
  if (status !== 200) {
    const errDetail = json && (json.error || json.title || JSON.stringify(json));
    throw new Error(`Twitter API error (${status}): ${errDetail}`);
  }
  const tweet = json.data;
  const users = (json.includes && json.includes.users) || [];
  const author = users.find((u) => u.id === tweet.author_id);
  return {
    platform: 'twitter',
    method: 'api_v2',
    author: author ? `${author.name} (@${author.username})` : null,
    url: targetUrl,
    raw: json,
    content: decodeHtmlEntities(tweet.text || ''),
  };
}

async function fetchLinkedInViaOG(targetUrl) {
  // Use open-graph-scraper to read meta tags
  const { error, result } = await ogs({ url: targetUrl, timeout: 10000 });
  if (error) {
    throw new Error(`LinkedIn OG scrape failed: ${result?.error || 'Unknown error'}`);
  }
  const title = result.ogTitle || result.twitterTitle || '';
  const desc = result.ogDescription || result.twitterDescription || '';
  const text = decodeHtmlEntities([title, desc].filter(Boolean).join(' - '));
  return {
    platform: 'linkedin',
    method: 'open_graph',
    author: null,
    url: targetUrl,
    raw: result,
    content: text || null,
  };
}

async function main() {
  const { url, urls, store, title, id, updateExisting, force } = parseArgs(process.argv);
  const postsPath = path.join(__dirname, '..', 'public', 'posts.json');

  if (!updateExisting && (!url && (!urls || urls.length === 0))) {
    console.error('Usage: node scripts/getPostContent.js --url <postUrl> [--url <postUrl> ...] [--store] [--title <title>] [--id <id>] [--update-existing] [--force]');
    process.exit(1);
  }

  try {
    // Helper to fetch a single URL
    async function fetchForUrl(singleUrl) {
      if (isTwitterUrl(singleUrl)) {
        if (process.env.TWITTER_BEARER_TOKEN) {
          try {
            return await fetchTwitterViaApi(singleUrl);
          } catch (apiErr) {
            const fallback = await fetchTwitterViaOEmbed(singleUrl);
            fallback.warning = `API failed: ${apiErr.message}`;
            return fallback;
          }
        }
        return await fetchTwitterViaOEmbed(singleUrl);
      }
      if (isLinkedInUrl(singleUrl)) {
        return await fetchLinkedInViaOG(singleUrl);
      }
      throw new Error('URL must be a Twitter/X or LinkedIn post URL');
    }

    // Load posts list if needed
    function loadPostsList() {
      try {
        const raw = fs.readFileSync(postsPath, 'utf8');
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch (_) {
        return [];
      }
    }

    function savePostsList(list) {
      fs.writeFileSync(postsPath, `${JSON.stringify(list, null, 2)}\n`, 'utf8');
    }

    if (updateExisting) {
      const list = loadPostsList();
      let updated = 0;
      for (const entry of list) {
        try {
          if (!entry || !entry.url) continue;
          if (!(isTwitterUrl(entry.url) || isLinkedInUrl(entry.url))) continue;
          const fetched = await fetchForUrl(entry.url);
          const newExcerpt = (fetched && fetched.content) || '';
          if (force || newExcerpt) {
            entry.excerpt = newExcerpt;
            updated += 1;
          }
          // Do not change title/date/id unless explicitly provided
        } catch (e) {
          // Skip on error but continue
          process.stderr.write(`Failed to update ${entry.url}: ${e.message}\n`);
        }
      }
      savePostsList(list);
      process.stdout.write(`Updated ${updated} entr${updated === 1 ? 'y' : 'ies'} in ${postsPath}\n`);
      return;
    }

    const targetUrls = urls && urls.length > 0 ? urls : [url];
    let list = store ? loadPostsList() : null;
    for (const u of targetUrls) {
      const data = await fetchForUrl(u);
      process.stdout.write(`${JSON.stringify(data, null, 2)}\n`);
      if (store) {
        const source = isTwitterUrl(u) ? 'x' : isLinkedInUrl(u) ? 'linkedin' : 'unknown';
        const newId = id || `${Date.now()}`;
        const excerpt = (data && data.content) || '';
        const existingIndex = list.findIndex((p) => p.url === u);
        if (existingIndex >= 0) {
          const existing = list[existingIndex];
          const effectiveTitle = typeof title === 'string' ? title : existing.title;
          const effectiveDate = existing.date || new Date().toISOString();
          list[existingIndex] = {
            ...existing,
            id: existing.id || newId,
            title: effectiveTitle || (source === 'x' ? 'X Post' : source === 'linkedin' ? 'LinkedIn Post' : 'Post'),
            url: u,
            date: effectiveDate,
            source,
            excerpt,
          };
        } else {
          const newTitle = typeof title === 'string' ? title : (source === 'x' ? 'X Post' : source === 'linkedin' ? 'LinkedIn Post' : 'Post');
          list.push({
            id: newId,
            title: newTitle,
            url: u,
            date: new Date().toISOString(),
            source,
            excerpt,
          });
        }
      }
    }
    if (store && list) {
      savePostsList(list);
      process.stdout.write(`Saved to ${postsPath}\n`);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(2);
  }
}

main();


