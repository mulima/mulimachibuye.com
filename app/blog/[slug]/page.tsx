import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

// Mock blog post data - in a real app, this would come from a CMS or markdown files
const blogPost = {
  title: "Getting Started with Next.js 15: A Complete Guide",
  date: "2024-01-15",
  readTime: "8 min read",
  category: "Web Development",
  content: `
# Getting Started with Next.js 15: A Complete Guide

Next.js 15 brings exciting new features and improvements that make building React applications even more powerful and developer-friendly. In this comprehensive guide, we'll explore the key features and how to get started.

## What's New in Next.js 15

### Improved App Router
The App Router continues to evolve with better performance and new capabilities. The routing system is now more intuitive and provides better developer experience.

### Enhanced Caching
Next.js 15 introduces smarter caching strategies that automatically optimize your application's performance without requiring manual configuration.

### Better TypeScript Support
TypeScript integration has been improved with better type inference and more helpful error messages.

## Getting Started

To create a new Next.js 15 project, run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Features to Explore

### 1. Server Components by Default
Server Components are now the default, providing better performance and SEO out of the box.

### 2. Improved Image Optimization
The Image component has been enhanced with better lazy loading and optimization strategies.

### 3. Enhanced Developer Experience
Better error messages, improved hot reloading, and more intuitive debugging tools.

## Best Practices

When working with Next.js 15, keep these best practices in mind:

- Use Server Components when possible for better performance
- Implement proper error boundaries
- Optimize your images using the built-in Image component
- Take advantage of the new caching strategies

## Conclusion

Next.js 15 represents a significant step forward in React development. The improvements in performance, developer experience, and new features make it an excellent choice for modern web applications.

Whether you're building a simple blog or a complex web application, Next.js 15 provides the tools and performance you need to succeed.
  `,
}

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white">
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
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
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
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article>
          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(blogPost.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {blogPost.readTime}
              </div>
              <Badge variant="secondary">{blogPost.category}</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {blogPost.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  AB
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Author Name</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Software Engineer</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, "<br />") }} />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  AB
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">About the Author</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {"I'm a full-stack developer passionate about building great software and sharing knowledge. "}
                    {"When I'm not coding, you'll find me writing blog posts or contributing to open source projects."}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/about">More About Me</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://twitter.com/yourusername">Follow on Twitter</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}
