import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

// Mock blog posts data
const allPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 15: A Complete Guide",
    excerpt:
      "Exploring the latest features in Next.js 15 and how they can improve your development workflow.",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Web Development",
    slug: "getting-started-nextjs-15",
  },
  {
    id: 2,
    title: "The Art of Clean Code: Lessons from 5 Years of Development",
    excerpt:
      "Reflections on writing maintainable, readable code and the practices that have made the biggest difference.",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Programming",
    slug: "art-of-clean-code",
  },
  {
    id: 3,
    title: "Building a Home Lab: My Journey into Self-Hosting",
    excerpt:
      "How I set up my own home server, the challenges I faced, and why self-hosting has become essential.",
    date: "2024-01-05",
    readTime: "15 min read",
    category: "Technology",
    slug: "building-home-lab",
  },
  {
    id: 4,
    title: "Why I Switched from VS Code to Neovim",
    excerpt:
      "My experience transitioning from VS Code to Neovim and the productivity gains I've experienced.",
    date: "2023-12-28",
    readTime: "10 min read",
    category: "Tools",
    slug: "vscode-to-neovim",
  },
  {
    id: 5,
    title: "Understanding React Server Components",
    excerpt:
      "A deep dive into React Server Components and how they're changing the way we build React applications.",
    date: "2023-12-20",
    readTime: "14 min read",
    category: "Web Development",
    slug: "react-server-components",
  },
  {
    id: 6,
    title: "My 2023 Year in Review",
    excerpt:
      "Reflecting on the year that was - projects completed, lessons learned, and goals for the future.",
    date: "2023-12-31",
    readTime: "6 min read",
    category: "Personal",
    slug: "2023-year-review",
  },
];

// Group posts by year
const postsByYear = allPosts.reduce((acc, post) => {
  const year = new Date(post.date).getFullYear();
  if (!acc[year]) {
    acc[year] = [];
  }
  acc[year].push(post);
  return acc;
}, {} as Record<number, typeof allPosts>);

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link
                href="/"
                className="text-2xl font-bold text-slate-900 dark:text-white"
              >
                My Blog
              </Link>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Thoughts on code, life, and everything in between
              </p>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/academics"
                className="text-slate-900 dark:text-white font-medium"
              >
                Academics
              </Link>
              <Link
                href="/archive"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Archive
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Archive
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            All blog posts organized by year. {allPosts.length} posts and
            counting.
          </p>
        </div>

        {/* Posts by Year */}
        <div className="space-y-12">
          {Object.entries(postsByYear)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, posts]) => (
              <section key={year}>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                  {year}
                  <span className="ml-3 text-sm font-normal text-slate-500 dark:text-slate-400">
                    ({posts.length} {posts.length === 1 ? "post" : "posts"})
                  </span>
                </h2>
                <div className="space-y-6">
                  {posts
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((post) => (
                      <Card
                        key={post.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </div>
                            <Badge variant="secondary">{post.category}</Badge>
                          </div>
                          <CardTitle className="text-xl">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              {post.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="leading-relaxed">
                            {post.excerpt}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                </div>
              </section>
            ))}
        </div>
      </main>
    </div>
  );
}
