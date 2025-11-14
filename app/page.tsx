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
import { getAllPosts, getFeaturedPost, getAllCategories, getAllSiteConfig } from "@/lib/db-queries";
import ClientWrapper from "@/components/ClientWrapper";

export default async function HomePage() {
  // Fetch data from database
  const siteConfig = getAllSiteConfig();
  const allPosts = getAllPosts(true);
  const featuredPost = getFeaturedPost() || allPosts[0];
  const recentPosts = allPosts.filter(post => post.id !== featuredPost?.id).slice(0, 3);
  const categories = getAllCategories();

  const siteTitle = siteConfig.site_title || "My Blog";
  const siteDescription = siteConfig.site_description || "Thoughts on tech, science, life, philosophy and everything in between";

  return (
    <ClientWrapper siteTitle={siteTitle} siteDescription={siteDescription}>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Welcome to {siteTitle}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {siteDescription}
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant="outline"
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              Latest Post
            </h2>
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  {featuredPost.read_time && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.read_time}
                    </div>
                  )}
                  {featuredPost.category_name && (
                    <Badge variant="secondary">{featuredPost.category_name}</Badge>
                  )}
                </div>
                <CardTitle className="text-2xl mb-2">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {featuredPost.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Button variant="outline" className="group bg-transparent">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              Recent Posts
            </h2>
            <div className="space-y-8">
              {recentPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_at || post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      {post.read_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.read_time}
                        </div>
                      )}
                      {post.category_name && (
                        <Badge variant="secondary">{post.category_name}</Badge>
                      )}
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
        )}

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
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {category.name}
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
            <p>&copy; 2025 {siteConfig.site_author || "Mulima Chibuye"}. All rights reserved.</p>
            <p className="mt-2">
              <Link 
                href="/admin/login" 
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors text-xs"
              >
                Admin
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </ClientWrapper>
  );
}
