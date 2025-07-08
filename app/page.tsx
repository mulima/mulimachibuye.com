import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock blog posts data - in a real app, this would come from a CMS or markdown files
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 15: A Complete Guide",
    excerpt:
      "Exploring the latest features in Next.js 15 and how they can improve your development workflow. From App Router improvements to new caching strategies.",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Web Development",
    slug: "getting-started-nextjs-15",
  },
  {
    id: 2,
    title: "The Art of Clean Code: Lessons from 5 Years of Development",
    excerpt:
      "Reflections on writing maintainable, readable code and the practices that have made the biggest difference in my career as a developer.",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Programming",
    slug: "art-of-clean-code",
  },
  {
    id: 3,
    title: "Building a Home Lab: My Journey into Self-Hosting",
    excerpt:
      "How I set up my own home server, the challenges I faced, and why self-hosting has become an essential part of my tech journey.",
    date: "2024-01-05",
    readTime: "15 min read",
    category: "Technology",
    slug: "building-home-lab",
  },
  {
    id: 4,
    title: "Why I Switched from VS Code to Neovim",
    excerpt:
      "My experience transitioning from VS Code to Neovim, the learning curve, and the productivity gains I've experienced along the way.",
    date: "2023-12-28",
    readTime: "10 min read",
    category: "Tools",
    slug: "vscode-to-neovim",
  },
];

const categories = [
  "Web Development",
  "Programming",
  "Technology",
  "Tools",
  "Personal",
];

export default function HomePage() {
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
                Thougths on tech, science, life, philosophy and everything in
                between
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
        {/* Hero Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Welcome to My Blog
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              I write about science and technlogy, life, philosopy, programming,
              technology, and my journey as a systems engineer. Join me as I
              share insights, tutorials, and thoughts from the world of tech.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {category}
              </Badge>
            ))}
          </div>
        </section>

        {/* Featured Post */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Latest Post
          </h2>
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(blogPosts[0].date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {blogPosts[0].readTime}
                </div>
                <Badge variant="secondary">{blogPosts[0].category}</Badge>
              </div>
              <CardTitle className="text-2xl mb-2">
                <Link
                  href={`/blog/${blogPosts[0].slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {blogPosts[0].title}
                </Link>
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {blogPosts[0].excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/blog/${blogPosts[0].slug}`}>
                <Button variant="outline" className="group bg-transparent">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Recent Posts
          </h2>
          <div className="space-y-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
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
                  <CardTitle className="text-xl mb-2">
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
                <CardContent>
                  <Link href={`/blog/${post.slug}`}>
                    <Button
                      variant="ghost"
                      className="group p-0 h-auto font-medium"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-slate-50 dark:bg-slate-800 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Get notified when I publish new posts. No spam, unsubscribe at any
            time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">
                About
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                A personal blog about web development, programming, and
                technology. Sharing knowledge and experiences from my journey as
                a systems engineer.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">
                Categories
              </h4>
              <ul className="space-y-2 text-sm">
                {categories.slice(0, 4).map((category) => (
                  <li key={category}>
                    <Link
                      href={`/category/${category
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">
                Connect
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:hello@mulimachibuye.com"
                    className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/mulimac"
                    className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/mulima"
                    className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-slate-600 dark:text-slate-300 text-sm">
            <p>&copy; 2025 Mulima Chibuye. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
