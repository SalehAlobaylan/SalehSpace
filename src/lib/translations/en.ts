export interface Translation {
  name: string;
  role: string;
  nav: {
    overview: string;
    github: string;
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
  footer: string;
  language: string;
  languageCode: string;
  tech: {
    ts: string;
    js: string;
    go: string;
    nextjs: string;
    postgres: string;
    supabase: string;
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
    supabase: "My main cloud development database provider.",
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
