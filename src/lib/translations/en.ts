export interface Translation {
  name: string;
  role: string;
  nav: {
    overview: string;
    github: string;
    products: string;
    blogs: string;
    posts: string;
  };
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
    copied: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    close: string;
    emailCopied: string;
  };
  techStack: {
    stackedIn: string;
    clickToShow: string;
    workedWith: string;
    showLess: string;
    viewWorkedWith: string;
  };
  blogs: {
    title: string;
    subtitle: string;
    minRead: string;
  };
  posts: {
    title: string;
    subtitle: string;
    viewOn: string;
    via: string;
  };
  github: {
    viewOnGithub: string;
    followers: string;
    repos: string;
    recentRepos: string;
    viewRepo: string;
    stars: string;
    forks: string;
    noDescription: string;
  };
  productsShowcase: {
    pillWahb: string;
    pillSilah: string;
    scrollHint: string;
    wahb: {
      heroEye: string;
      titleLine1: string;
      titleLine2: string;
      heroSub: string;
      chips: string[];
      atGlanceLabel: string;
      atGlanceTitle: string;
      atGlanceBody: string;
      stats: { n: string; l: string }[];
      portalsLabel: string;
      portalsTitle: string;
      portalConsumerName: string;
      portalConsumerSub: string;
      portalConsumerBody: string;
      portalConsumerTags: string[];
      portalAdminName: string;
      portalAdminSub: string;
      portalAdminBody: string;
      portalAdminTags: string[];
      backendLabel: string;
      backendTitle: string;
      backendBody: string;
      services: { lang: string; name: string; desc: string }[];
      featuresLabel: string;
      featuresTitle: string;
      featuresBody: string;
      featureCards: { ttl: string; body: string; signals?: string[] }[];
      pipelineLabel: string;
      pipelineTitle: string;
      pipelineBody: string;
      pipelineSteps: { step: string; sub: string }[];
      stackLabel: string;
      stackTitle: string;
      stackGroups: { label: string; items: string[] }[];
      footWm: string;
      footLink: string;
    };
    silah: {
      heroEye: string;
      titleLine1: string;
      titleLine2: string;
      heroSub: string;
      chips: string[];
      platformLabel: string;
      platformTitle: string;
      platformBody: string;
      stats: { n: string; l: string }[];
      challengeLabel: string;
      challengeTitle: string;
      challengeBody: string;
      challengeCards: { ttl: string; body: string }[];
      capabilitiesLabel: string;
      capabilitiesTitle: string;
      capabilitiesCards: { ttl: string; body: string }[];
      audienceLabel: string;
      audienceTitle: string;
      audienceCards: { ttl: string; body: string }[];
      walkthroughLabel: string;
      walkthroughTitle: string;
      walkthroughBody: string;
      walkthroughSteps: { step: string; sub: string }[];
      aiLabel: string;
      aiTitle: string;
      aiBody: string;
      aiCards: { ttl: string; body: string; badge?: string }[];
      contextLabel: string;
      contextTitle: string;
      contextCards: { ttl: string; body: string }[];
      techNote: string;
      footWm: string;
      footLink: string;
    };
  };
  footer: string;
  language: string;
  languageCode: string;
  tech: {
    ts: string;
    js: string;
    go: string;
    nextjs: string;
    postgres: string;
    aws: string;
    python: string;
    java: string;
    express: string;
    angular: string;
    sqlite: string;
    mongodb: string;
    redis: string;
    cursor: string;
    postman: string;
    docker: string;
    notion: string;
    firebase: string;
    tailwind: string;
    jira: string;
    jest: string;
    circleci: string;
    jasmine: string;
    jwt: string;
    microservices: string;
    shadcn: string;
  };
}

export const en: Translation = {
  // Header
  name: "Saleh Alobaylan",
  role: "Backend Engineer",

  // Navigation
  nav: {
    overview: "Overview",
    github: "GitHub",
    products: "Products",
    blogs: "Blogs",
    posts: "Posts",
  },

  // Socials
  socials: {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    email: "Email",
    copied: "Copied!",
  },

  // Contact
  contact: {
    title: "Get in Touch",
    subtitle: "Send me a message",
    name: "Name / Organization",
    namePlaceholder: "Your name / organization",
    email: "Email",
    emailPlaceholder: "your@email.com",
    message: "Message",
    messagePlaceholder: "Your message...",
    send: "Send Message",
    sending: "Sending...",
    success: "Message sent successfully!",
    error: "Failed to send message. Please try again.",
    close: "Close",
    emailCopied: "Email Copied!",
  },

  // Tech Stack
  techStack: {
    stackedIn: "Stacked in these",
    clickToShow: "click on each to show",
    workedWith: "And worked with these",
    showLess: "Show Less ↑",
    viewWorkedWith: "View Worked With ↓",
  },

  // Blogs
  blogs: {
    title: "Latest Thoughts",
    subtitle: "Deep dives into backend engineering",
    minRead: "min read",
  },

  // Posts / Social Feed
  posts: {
    title: "Social Feed",
    subtitle: "Updates from X & LinkedIn",
    viewOn: "View on",
    via: "via",
  },

  // GitHub Card
  github: {
    viewOnGithub: "View on GitHub →",
    followers: "Followers",
    repos: "Repos",
    recentRepos: "Recent Repositories",
    viewRepo: "View Repo",
    stars: "stars",
    forks: "forks",
    noDescription: "No description available.",
  },

  // Products Showcase
  productsShowcase: {
    pillWahb: "Wahb",
    pillSilah: "Silah Legal",
    scrollHint: "Scroll to explore",
    wahb: {
      heroEye: "Social Media Platform",
      titleLine1: "Wahb",
      titleLine2: "Platform",
      heroSub:
        "A production-grade social platform designed around clear service ownership, AI-ready content workflows, a user-facing app, and an admin dashboard for the Wahb team.",
      chips: ["TypeScript", "Go", "Python", "6 Services", "Admin Dashboard"],
      atGlanceLabel: "At a glance",
      atGlanceTitle: "Designed to scale without losing clarity",
      atGlanceBody:
        "The platform is split by domain boundaries instead of framework convenience. Go handles high-throughput HTTP paths, Node.js coordinates asynchronous aggregation work, and Python powers the enrichment layer where ML workflows belong.",
      stats: [
        { n: "6", l: "Services" },
        { n: "3", l: "Languages" },
        { n: "7", l: "Ranking signals" },
        { n: "9", l: "Source types" },
      ],
      portalsLabel: "Product surfaces",
      portalsTitle: "User app and team dashboard",
      portalConsumerName: "Wahb user app",
      portalConsumerSub: "User-facing app · Next.js",
      portalConsumerBody:
        "The public product experience: social feeds, content interactions, user profiles, and state-driven flows built with Next.js and TypeScript for a fast, server-rendered user surface.",
      portalConsumerTags: ["Next.js", "TypeScript", "Social Feeds", "Client APIs"],
      portalAdminName: "Wahb admin dashboard",
      portalAdminSub: "Team operations dashboard · Next.js 15 · React 19",
      portalAdminBody:
        "The dashboard Wahb's team uses to manage the app: content moderation, source management, ranking intelligence tuning, enrichment monitoring, and analytics inside a typed React 19 application with TanStack Table, Recharts, and role-aware views.",
      portalAdminTags: ["React", "TypeScript", "Admin Dashboard", "RBAC"],
      backendLabel: "Backend services",
      backendTitle: "Four backend services with focused ownership",
      backendBody:
        "Each service owns a narrow slice of the system so the platform can grow without turning every change into a cross-cutting rewrite.",
      services: [
        {
          lang: "Go · Gin",
          name: "Content Management System",
          desc: "Owns feed APIs, content lifecycle, engagement actions such as likes, reposts, and comments, plus admin endpoints behind Go's high-throughput HTTP layer.",
        },
        {
          lang: "Go · Gin",
          name: "IAM Service",
          desc: "Handles authentication, JWT issuance and validation, role-based access control, and the middleware chain that keeps identity consistent across the platform.",
        },
        {
          lang: "Node · Fastify",
          name: "Aggregation Service",
          desc: "Coordinates source fetchers, BullMQ queues, workers, FFmpeg media processing, content normalization, and reliable write-back into the CMS.",
        },
        {
          lang: "Python · FastAPI",
          name: "Enrichment Service",
          desc: "Exposes transcription, vector embeddings, entity extraction, multilingual translation, and summarization through a clean async API backed by Python's ML ecosystem.",
        },
      ],
      featuresLabel: "Product surface",
      featuresTitle: "A dual-mode discovery experience",
      featuresBody:
        "Wahb is built around two complementary feeds and a real-time ranking engine. Together they replace decision fatigue with curated, contextual content that respects the way people actually browse.",
      featureCards: [
        {
          ttl: "For You feed",
          body: "Full-screen vertical cards with snap scrolling, auto-play on view, and tap to pause. Content surfaces as MP4 with Zustand-driven state for liked, bookmarked, and viewport-optimized playback.",
          signals: ["Snap scroll", "Auto-play", "MP4 native", "Viewport optimized"],
        },
        {
          ttl: "News feed",
          body: "Magazine-style slides pair one featured article with three related reactions, opened full-screen on tap. Editorial pacing rather than infinite scroll, designed for considered reading.",
          signals: ["Featured + reactions", "Full-screen reader"],
        },
        {
          ttl: "7-signal ranking engine",
          body: "Per-tenant scoring that runs at query time, not in stale batches. Operators tune weights from the console with auto-normalized sliders, plus per-item overrides: boost, suppress, pin, exclude.",
          signals: ["Freshness", "Engagement", "Velocity", "Similarity", "Quality", "Diversity", "Trending"],
        },
      ],
      pipelineLabel: "Ingestion pipeline",
      pipelineTitle: "From raw source to ranked feed",
      pipelineBody:
        "Sources flow through a queue-driven pipeline with circuit breakers between stages. Aggregation fetches and normalizes; Enrichment transcribes and embeds; the CMS owns the canonical state and serves the feeds.",
      pipelineSteps: [
        { step: "Sources", sub: "RSS · YouTube · X · Reddit · Telegram · Podcasts · iTunes · Web · Manual" },
        { step: "Aggregation", sub: "Node · Fastify · BullMQ · FFmpeg" },
        { step: "Enrichment", sub: "Python · faster-whisper · all-MiniLM-L6-v2 · Scrapling" },
        { step: "CMS", sub: "Go · Gin · PostgreSQL + pgvector" },
        { step: "Platform", sub: "Next.js consumer + admin console" },
      ],
      stackLabel: "Tech stack",
      stackTitle: "Tools chosen per workload, not per fashion",
      stackGroups: [
        { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Zustand", "TanStack Query", "Tailwind"] },
        { label: "Backend", items: ["Go · Gin", "Node.js · Fastify", "Python · FastAPI"] },
        { label: "Data", items: ["PostgreSQL", "pgvector", "Redis", "BullMQ"] },
        { label: "AI / Media", items: ["Whisper", "Sentence embeddings", "FFmpeg", "Scrapling"] },
        { label: "Infra", items: ["Docker", "JWT auth", "RBAC"] },
      ],
      footWm: "Saleh Alobaylan · Wahb Platform",
      footLink: "https://wahb.salehspace.dev",
    },
    silah: {
      heroEye: "Legal Case Management · Saudi Arabia",
      titleLine1: "Silah",
      titleLine2: "Legal",
      heroSub:
        "A focused legal workspace for Saudi law firms, combining AI-assisted regulation discovery, document intelligence, and case operations in one coherent product.",
      chips: ["Legal Tech", "AI-Powered", "Saudi Law", "Case Management", "Document Intelligence"],
      platformLabel: "The platform",
      platformTitle: "Research, documents, and cases in one workflow",
      platformBody:
        "Silah Legal brings the daily work of a law office into one place: case files, legal research, document review, deadlines, and team coordination shaped around the Saudi legal context.",
      stats: [
        { n: "1", l: "Unified platform" },
        { n: "3", l: "Core pillars" },
        { n: "AI", l: "Regulation engine" },
        { n: "KSA", l: "Saudi law focus" },
      ],
      challengeLabel: "The challenge",
      challengeTitle: "Legal teams lose time before the real work begins",
      challengeBody:
        "Before a lawyer can argue, draft, or advise, they often have to search regulations, compare documents, reconstruct timelines, and pull context from scattered sources. Silah reduces that operational drag.",
      challengeCards: [
        {
          ttl: "Scattered documents",
          body: "Case files, contracts, notes, and court submissions are spread across email, drives, and local folders, making it difficult to trust that everyone is working from the latest context.",
        },
        {
          ttl: "Manual research",
          body: "Lawyers manually search Saudi regulations and references, a process that takes time and can miss provisions that materially affect the case.",
        },
        {
          ttl: "No explainability",
          body: "When a regulation appears, teams still need to know why it matters, how strongly it applies, and whether it fits the facts of the case.",
        },
      ],
      capabilitiesLabel: "Capabilities",
      capabilitiesTitle: "Built around the way legal work actually moves",
      capabilitiesCards: [
        {
          ttl: "Regulation discovery",
          body: "Semantic search over Saudi legal material surfaces relevant regulations and provisions from the facts and description of a case.",
        },
        {
          ttl: "Explainable scoring",
          body: "Every suggested regulation includes a relevance signal and reasoning, giving attorneys a clearer basis for review instead of a black-box result.",
        },
        {
          ttl: "Document intelligence",
          body: "Legal documents can be uploaded and converted into structured insights such as parties, dates, obligations, legal references, and items that need attention.",
        },
        {
          ttl: "Case timeline",
          body: "Milestones, deadlines, hearings, filings, and case events are tracked from one centralized timeline so active matters stay visible.",
        },
        {
          ttl: "Regulation tracker",
          body: "Relevant Saudi regulations can be monitored for amendments, with alerts when changes may affect active cases or legal positions.",
        },
        {
          ttl: "Team collaboration",
          body: "Role-based access, shared case files, and assignment workflows keep lawyers, trainees, and administrators aligned around the same case context.",
        },
      ],
      audienceLabel: "Who it's for",
      audienceTitle: "Built for the people who handle the matter",
      audienceCards: [
        {
          ttl: "Law firms",
          body: "Practices juggling many active matters at once need shared case context, role-based access for partners, associates, and trainees, and a regulation library that doesn't fall behind real legal practice.",
        },
        {
          ttl: "In-house legal",
          body: "Corporate legal teams operating across commercial, labor, and administrative matters need one workspace where contracts, internal cases, and regulatory exposure live next to each other.",
        },
        {
          ttl: "Legal consultants",
          body: "Solo practitioners and consultants advising on Saudi law need fast research, defensible reasoning to share with clients, and a single workspace they can stand up without IT.",
        },
      ],
      walkthroughLabel: "A case, end to end",
      walkthroughTitle: "What a matter looks like inside Silah",
      walkthroughBody:
        "Silah is shaped around the way a case actually moves through a legal team — from the moment it lands on someone's desk to the day it closes.",
      walkthroughSteps: [
        { step: "Open the case", sub: "Pick the case type, parties, jurisdiction, and assign the team" },
        { step: "Bring the documents", sub: "Upload contracts, filings, and notes — text and OCR run automatically" },
        { step: "Surface the law", sub: "AI reads the case and suggests the Saudi regulations that actually apply" },
        { step: "Review the evidence", sub: "Inspect matched articles, scores, and the snippets that triggered each link" },
        { step: "Track and stay current", sub: "Hearings, deadlines, and regulation amendments stay live in one timeline" },
      ],
      aiLabel: "Defensible by design",
      aiTitle: "AI a lawyer can stand behind",
      aiBody:
        "Suggestions are not delivered as opinions. Every match arrives with the evidence behind it, the score that ranked it, and a clear path to accept, edit, or reject — so the lawyer remains the one making the call.",
      aiCards: [
        {
          ttl: "Transparent scoring",
          body: "Each suggested regulation carries a composite score with its parts visible: semantic match, supporting coverage, lexical overlap, and case-type fit. No mystery number — the reasoning is on the page.",
          badge: "Auditable",
        },
        {
          ttl: "Citable evidence",
          body: "Every link exposes the exact regulation passages that matched and the case snippets that triggered them, so reasoning can be reviewed, shared with a partner, or referenced in client work.",
          badge: "Citable evidence",
        },
        {
          ttl: "Document intelligence",
          body: "Uploaded files are read with native text extraction first, OCR fallback for scanned Arabic and English material, then summarized and highlighted in the context of the case.",
          badge: "Arabic + English",
        },
        {
          ttl: "Regulations stay current",
          body: "A monitoring worker tracks the Ministry of Justice laws site and creates a new version on amendment, so subscribed users get a diff and a notification — no manual checking.",
          badge: "MOJ-synced",
        },
      ],
      contextLabel: "Built for the Saudi context",
      contextTitle: "Local from the schema up",
      contextCards: [
        {
          ttl: "Arabic-first, fully bilingual",
          body: "The interface ships with full Arabic and English support and proper RTL layout — not a translation layer bolted on later. Lawyers can work in the language the matter is in.",
        },
        {
          ttl: "Six case types matching local practice",
          body: "The case taxonomy mirrors how Saudi legal work is actually divided: criminal, civil, commercial, labor, family, and administrative — set at the schema level, not configurable buckets.",
        },
        {
          ttl: "MOJ regulations, kept fresh",
          body: "Regulations are sourced and version-tracked from the Ministry of Justice laws site, with hash-based change detection so amendments produce a real diff, not a silent overwrite.",
        },
      ],
      techNote:
        "Built on Next.js, Fastify, and FastAPI with PostgreSQL + pgvector — multilingual BGE-M3 embeddings power the AI.",
      footWm: "Saleh Alobaylan · Silah Legal",
      footLink: "https://silah.salehspace.dev",
    },
  },

  // Footer
  footer: "Backend Development and more",

  // Language
  language: "العربية",
  languageCode: "ar",

  // Tech descriptions
  tech: {
    ts: "Used it primarily in production",
    js: "Used it primarily in production served more than 20k monthly active user with it",
    go: "built with it many scalable production-ready Services and systems, 'one of them will be connected with this website soon:)'",
    nextjs:
      "I'm not a frontend engineer but if I'm fullstacking I'm using Next.js.",
    postgres:
      "used it for production, served with it more than 20k monthly active users.",
    aws: "Deployed scalable apps using EC2, S3, IAM, and RDS for cloud infrastructure and used RDS for production.",
    python: "Used it for data Analysis with numpy, pandas, matplotlib.",
    java: "Started with it for fundamentals, OOP, Data structures.",
    express: "Most of my project is built with it",
    angular: "only limited usecases.",
    sqlite:
      "Lightweight database used it for scalable production then had to migrate from it because of bottleneck :)",
    mongodb: "NoSQL database used it for not scalable usecases just basics.",
    redis:
      "In-memory caching used it for caching access tokens and rate limiting.",
    cursor: "My primary AI-powered code editor for accelerated development.",
    postman: "API testing and documentation for backend development workflows.",
    docker: "Containerized applications for consistent dev/prod environments.",
    notion:
      "used its SDK for light databases integration and project management, and documentation.",
    firebase: "Used for authentication primarily.",
    tailwind: "Used primarily with Next.js.",
    jira: "Agile project management for sprint planning and issue tracking.",
    jest: "my main tool for testing.",
    circleci: "CI/CD pipeline for automated testing and deployment.",
    jasmine: "used it for my early projects but not anymore.",
    jwt: "many production usages for me [large systems, microservices, modular monoliths, with refreshed tokens].",
    microservices:
      "usually when i build a system i start with designing it as microservices, then gathering it to smaller approaches as needed and projects limits, but my mind always *Microservicing*.",
    shadcn: "I don't like to frontend so usually i start with this :).",
  },
};
