/**
 * Mock Articles Data
 * Contains sample article data for the admin articles page
 */

export const articlesData = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    author: "Sarah Chen",
    authorId: 101,
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=32&h=32&fit=crop&crop=face",
    category: "Tutorial",
    status: "published",
    publishDate: "2024-01-15",
    createdAt: "2024-01-10T09:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
    views: 2847,
    likes: 342,
    comments: 28,
    readTime: "8 min read",
    excerpt:
      "Learn the fundamentals of React Hooks and how they can simplify your component logic. This comprehensive guide covers useState, useEffect, and custom hooks...",
    content: `<h2>Introduction to React Hooks</h2>
      <p>React Hooks revolutionized the way we write React components...</p>`,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    tags: ["React", "JavaScript", "Frontend"],
    featured: true,
    seoTitle: "Getting Started with React Hooks - Complete Guide 2024",
    seoDescription:
      "Master React Hooks with this comprehensive guide. Learn useState, useEffect, and more.",
    slug: "getting-started-with-react-hooks",
  },
  {
    id: 2,
    title: "Advanced JavaScript Patterns",
    author: "Mike Johnson",
    authorId: 102,
    authorAvatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face",
    category: "Guide",
    status: "published",
    publishDate: "2024-01-14",
    createdAt: "2024-01-08T11:15:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
    views: 1923,
    likes: 267,
    comments: 19,
    readTime: "12 min read",
    excerpt:
      "Explore advanced JavaScript patterns that will make your code more maintainable and efficient. Learn about module patterns, observer patterns, and more...",
    content: `<h2>Advanced JavaScript Design Patterns</h2>
      <p>Design patterns are reusable solutions to common problems...</p>`,
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
    tags: ["JavaScript", "Design Patterns", "Advanced"],
    featured: false,
    seoTitle: "Advanced JavaScript Patterns Every Developer Should Know",
    seoDescription:
      "Learn advanced JavaScript patterns including module, observer, and factory patterns.",
    slug: "advanced-javascript-patterns",
  },
  {
    id: 3,
    title: "Building Responsive UIs with Tailwind CSS",
    author: "Emily Davis",
    authorId: 103,
    authorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    category: "Tutorial",
    status: "draft",
    publishDate: null,
    createdAt: "2024-01-13T08:00:00Z",
    updatedAt: "2024-01-13T10:30:00Z",
    views: 0,
    likes: 0,
    comments: 0,
    readTime: "10 min read",
    excerpt:
      "Master the art of creating beautiful, responsive user interfaces using Tailwind CSS utilities. Learn mobile-first design and responsive breakpoints...",
    content: `<h2>Responsive Design with Tailwind CSS</h2>
      <p>Tailwind CSS makes responsive design incredibly simple...</p>`,
    thumbnail:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop",
    tags: ["CSS", "Tailwind", "Design"],
    featured: false,
    seoTitle: "Building Responsive UIs with Tailwind CSS - Complete Tutorial",
    seoDescription:
      "Learn how to build responsive, mobile-first UIs with Tailwind CSS utilities.",
    slug: "building-responsive-uis-tailwind-css",
  },
  {
    id: 4,
    title: "Node.js Best Practices for 2024",
    author: "Alex Rodriguez",
    authorId: 104,
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    category: "Guide",
    status: "published",
    publishDate: "2024-01-12",
    createdAt: "2024-01-05T14:20:00Z",
    updatedAt: "2024-01-12T09:15:00Z",
    views: 3156,
    likes: 428,
    comments: 35,
    readTime: "15 min read",
    excerpt:
      "Discover the latest best practices for Node.js development in 2024. Security, performance optimization, error handling, and modern async patterns...",
    content: `<h2>Node.js Best Practices</h2>
      <p>Following best practices ensures your Node.js applications are secure and performant...</p>`,
    thumbnail:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=400&fit=crop",
    tags: ["Node.js", "Backend", "Best Practices"],
    featured: true,
    seoTitle: "Node.js Best Practices for 2024 - Security & Performance",
    seoDescription:
      "Master Node.js development with 2024's best practices for security and performance.",
    slug: "nodejs-best-practices-2024",
  },
  {
    id: 5,
    title: "Introduction to Data Visualization",
    author: "Lisa Wang",
    authorId: 105,
    authorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face",
    category: "Tutorial",
    status: "published",
    publishDate: "2024-01-11",
    createdAt: "2024-01-09T13:45:00Z",
    updatedAt: "2024-01-11T11:20:00Z",
    views: 1654,
    likes: 198,
    comments: 15,
    readTime: "6 min read",
    excerpt:
      "Learn the basics of data visualization and how to create compelling charts and graphs. Introduction to Chart.js, D3.js, and visualization principles...",
    content: `<h2>Data Visualization Fundamentals</h2>
      <p>Good data visualization tells a story with your data...</p>`,
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    tags: ["Data", "Visualization", "Charts"],
    featured: false,
    seoTitle: "Introduction to Data Visualization - Charts & Graphs Guide",
    seoDescription:
      "Learn data visualization basics and create compelling charts with Chart.js and D3.js.",
    slug: "introduction-data-visualization",
  },
  {
    id: 6,
    title: "Understanding TypeScript Generics",
    author: "David Kim",
    authorId: 106,
    authorAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face",
    category: "Tutorial",
    status: "published",
    publishDate: "2024-01-10",
    createdAt: "2024-01-04T10:00:00Z",
    updatedAt: "2024-01-10T15:30:00Z",
    views: 2241,
    likes: 312,
    comments: 22,
    readTime: "11 min read",
    excerpt:
      "Deep dive into TypeScript generics with practical examples. Learn how to write reusable, type-safe code that works with multiple types...",
    content: `<h2>TypeScript Generics Explained</h2>
      <p>Generics allow you to write flexible, reusable code...</p>`,
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    tags: ["TypeScript", "Programming", "Types"],
    featured: true,
    seoTitle: "Understanding TypeScript Generics - Complete Guide",
    seoDescription:
      "Master TypeScript generics with practical examples and learn to write type-safe code.",
    slug: "understanding-typescript-generics",
  },
  {
    id: 7,
    title: "REST API Design Principles",
    author: "Jennifer Martinez",
    authorId: 107,
    authorAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face",
    category: "Guide",
    status: "published",
    publishDate: "2024-01-09",
    createdAt: "2024-01-02T09:20:00Z",
    updatedAt: "2024-01-09T12:40:00Z",
    views: 2789,
    likes: 385,
    comments: 31,
    readTime: "14 min read",
    excerpt:
      "Learn the fundamental principles of RESTful API design. Best practices for endpoints, HTTP methods, status codes, and API versioning...",
    content: `<h2>RESTful API Design</h2>
      <p>Well-designed APIs are the backbone of modern applications...</p>`,
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    tags: ["API", "REST", "Backend", "Architecture"],
    featured: false,
    seoTitle: "REST API Design Principles - Best Practices Guide",
    seoDescription:
      "Learn REST API design principles and best practices for scalable web services.",
    slug: "rest-api-design-principles",
  },
  {
    id: 8,
    title: "CSS Grid vs Flexbox: When to Use What",
    author: "Tom Anderson",
    authorId: 108,
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    category: "Guide",
    status: "published",
    publishDate: "2024-01-08",
    createdAt: "2024-01-01T11:00:00Z",
    updatedAt: "2024-01-08T14:15:00Z",
    views: 3421,
    likes: 456,
    comments: 42,
    readTime: "9 min read",
    excerpt:
      "Comprehensive comparison of CSS Grid and Flexbox. Learn when to use each layout system and how to combine them effectively...",
    content: `<h2>CSS Grid vs Flexbox</h2>
      <p>Both Grid and Flexbox are powerful layout tools...</p>`,
    thumbnail:
      "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&h=400&fit=crop",
    tags: ["CSS", "Grid", "Flexbox", "Layout"],
    featured: true,
    seoTitle: "CSS Grid vs Flexbox: Complete Comparison Guide",
    seoDescription:
      "Learn when to use CSS Grid vs Flexbox with practical examples and comparisons.",
    slug: "css-grid-vs-flexbox",
  },
  {
    id: 9,
    title: "Getting Started with Docker",
    author: "Rachel Green",
    authorId: 109,
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
    category: "Tutorial",
    status: "scheduled",
    publishDate: "2024-01-20",
    createdAt: "2024-01-13T15:30:00Z",
    updatedAt: "2024-01-14T09:00:00Z",
    views: 0,
    likes: 0,
    comments: 0,
    readTime: "13 min read",
    excerpt:
      "Introduction to Docker containers and containerization. Learn how to build, run, and deploy applications with Docker...",
    content: `<h2>Docker Basics</h2>
      <p>Docker simplifies application deployment and scaling...</p>`,
    thumbnail:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop",
    tags: ["Docker", "DevOps", "Containers"],
    featured: false,
    seoTitle: "Getting Started with Docker - Beginner's Guide",
    seoDescription:
      "Learn Docker basics and containerization with this comprehensive beginner's guide.",
    slug: "getting-started-docker",
  },
  {
    id: 10,
    title: "Modern JavaScript Testing with Jest",
    author: "Chris Taylor",
    authorId: 110,
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    category: "Tutorial",
    status: "published",
    publishDate: "2024-01-07",
    createdAt: "2023-12-28T10:45:00Z",
    updatedAt: "2024-01-07T13:20:00Z",
    views: 1876,
    likes: 234,
    comments: 18,
    readTime: "10 min read",
    excerpt:
      "Master JavaScript testing with Jest. Learn unit testing, mocking, snapshot testing, and test-driven development practices...",
    content: `<h2>JavaScript Testing with Jest</h2>
      <p>Testing is crucial for maintaining code quality...</p>`,
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    tags: ["JavaScript", "Testing", "Jest", "TDD"],
    featured: false,
    seoTitle: "Modern JavaScript Testing with Jest - Complete Guide",
    seoDescription:
      "Learn JavaScript testing with Jest including unit tests, mocks, and TDD practices.",
    slug: "modern-javascript-testing-jest",
  },
  {
    id: 11,
    title: "Introduction to GraphQL",
    author: "Sophia Lee",
    authorId: 111,
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
    category: "Guide",
    status: "published",
    publishDate: "2024-01-06",
    createdAt: "2023-12-30T14:00:00Z",
    updatedAt: "2024-01-06T16:30:00Z",
    views: 2134,
    likes: 298,
    comments: 25,
    readTime: "12 min read",
    excerpt:
      "Learn GraphQL fundamentals and how it differs from REST. Explore queries, mutations, subscriptions, and schema design...",
    content: `<h2>GraphQL Fundamentals</h2>
      <p>GraphQL provides a complete description of your API...</p>`,
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    tags: ["GraphQL", "API", "Backend"],
    featured: true,
    seoTitle: "Introduction to GraphQL - Query Language Guide",
    seoDescription:
      "Learn GraphQL fundamentals with queries, mutations, and schema design.",
    slug: "introduction-graphql",
  },
  {
    id: 12,
    title: "Vue 3 Composition API Deep Dive",
    author: "Daniel Park",
    authorId: 112,
    authorAvatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=face",
    category: "Tutorial",
    status: "draft",
    publishDate: null,
    createdAt: "2024-01-14T08:30:00Z",
    updatedAt: "2024-01-14T12:00:00Z",
    views: 0,
    likes: 0,
    comments: 0,
    readTime: "16 min read",
    excerpt:
      "Comprehensive guide to Vue 3's Composition API. Learn reactive state, computed properties, watchers, and composable patterns...",
    content: `<h2>Vue 3 Composition API</h2>
      <p>The Composition API provides better code organization...</p>`,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    tags: ["Vue", "JavaScript", "Frontend"],
    featured: false,
    seoTitle: "Vue 3 Composition API Deep Dive - Complete Guide",
    seoDescription:
      "Master Vue 3 Composition API with reactive state, composables, and best practices.",
    slug: "vue3-composition-api-deep-dive",
  },
];

/**
 * Article categories
 */
export const articleCategories = [
  { value: "tutorial", label: "Tutorial" },
  { value: "guide", label: "Guide" },
  { value: "news", label: "News" },
  { value: "case-study", label: "Case Study" },
  { value: "opinion", label: "Opinion" },
];

/**
 * Article status options
 */
export const articleStatuses = [
  { value: "draft", label: "Draft", color: "gray" },
  { value: "published", label: "Published", color: "green" },
  { value: "scheduled", label: "Scheduled", color: "blue" },
  { value: "archived", label: "Archived", color: "orange" },
];

/**
 * Get articles by status
 */
export const getArticlesByStatus = (status) => {
  if (status === "all") return articlesData;
  return articlesData.filter((article) => article.status === status);
};

/**
 * Get articles by category
 */
export const getArticlesByCategory = (category) => {
  if (category === "all") return articlesData;
  return articlesData.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
};

/**
 * Get featured articles
 */
export const getFeaturedArticles = () => {
  return articlesData.filter((article) => article.featured);
};

/**
 * Get article by slug
 */
export const getArticleBySlug = (slug) => {
  return articlesData.find((article) => article.slug === slug);
};

/**
 * Get article by ID
 */
export const getArticleById = (id) => {
  return articlesData.find((article) => article.id === id);
};

/**
 * Search articles by title or excerpt
 */
export const searchArticles = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return articlesData.filter(
    (article) =>
      article.title.toLowerCase().includes(term) ||
      article.excerpt.toLowerCase().includes(term) ||
      article.tags.some((tag) => tag.toLowerCase().includes(term))
  );
};

/**
 * Get article statistics
 */
export const getArticleStats = () => {
  const total = articlesData.length;
  const published = articlesData.filter((a) => a.status === "published").length;
  const draft = articlesData.filter((a) => a.status === "draft").length;
  const scheduled = articlesData.filter((a) => a.status === "scheduled").length;
  const totalViews = articlesData.reduce(
    (sum, article) => sum + article.views,
    0
  );
  const totalLikes = articlesData.reduce(
    (sum, article) => sum + article.likes,
    0
  );
  const totalComments = articlesData.reduce(
    (sum, article) => sum + article.comments,
    0
  );

  const averageReadTime =
    total > 0
      ? Math.round(
          articlesData.reduce((sum, article) => sum + article.readTime, 0) / total
        )
      : 0;

  return {
    total,
    published,
    draft,
    scheduled,
    totalViews,
    totalLikes,
    totalComments,
    averageViews: Math.round(totalViews / total),
    averageLikes: Math.round(totalLikes / total),
    averageComments: Math.round(totalComments / total),
    averageReadTime,
  };
};

export default articlesData;
