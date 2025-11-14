"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  category_name?: string;
  read_time: string | null;
  published_at: string | null;
  created_at: string;
}

interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  duration: string;
}

export default function ArchivePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArchivedContent();
  }, []);

  const fetchArchivedContent = async () => {
    try {
      const [postsRes, publicationsRes, educationRes] = await Promise.all([
        fetch('/api/posts?archived=true'),
        fetch('/api/academics/publications?archived=true'),
        fetch('/api/academics/education?archived=true'),
      ]);

      const postsData = await postsRes.json();
      const publicationsData = await publicationsRes.json();
      const educationData = await educationRes.json();

      setPosts(postsData);
      setPublications(publicationsData);
      setEducation(educationData);
    } catch (error) {
      console.error('Error fetching archived content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.published_at || post.created_at).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, Post[]>);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-400">Loading archived content...</p>
      </div>
    );
  }

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
            Archived blog posts and academic content.
          </p>
        </div>

        {/* Archived Blog Posts */}
        {posts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
              <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
              Archived Blog Posts ({posts.length})
            </h2>
            <div className="space-y-12">
              {Object.entries(postsByYear)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, yearPosts]) => (
                  <section key={year}>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                      {year}
                      <span className="ml-3 text-sm font-normal text-slate-500 dark:text-slate-400">
                        ({yearPosts.length} {yearPosts.length === 1 ? "post" : "posts"})
                      </span>
                    </h3>
                    <div className="space-y-6">
                      {yearPosts.map((post) => (
                        <Card
                          key={post.id}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardHeader>
                            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.published_at || post.created_at).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
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
                            <CardTitle className="text-xl">
                              <Link
                                href={`/blog/${post.slug}`}
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                {post.title}
                              </Link>
                            </CardTitle>
                            {post.excerpt && (
                              <CardDescription className="leading-relaxed">
                                {post.excerpt}
                              </CardDescription>
                            )}
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </section>
                ))}
            </div>
          </div>
        )}

        {/* Archived Publications */}
        {publications.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
              <BookOpen className="w-8 h-8 mr-3 text-green-600" />
              Archived Publications ({publications.length})
            </h2>
            <div className="space-y-4">
              {publications.map((pub) => (
                <Card key={pub.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{pub.title}</CardTitle>
                    <CardDescription>
                      <div className="space-y-1">
                        <p>{pub.authors}</p>
                        <p className="italic">{pub.venue} ({pub.year})</p>
                        <Badge variant="outline">{pub.type}</Badge>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Archived Education */}
        {education.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
              <GraduationCap className="w-8 h-8 mr-3 text-purple-600" />
              Archived Education ({education.length})
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <Card key={edu.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                    <CardDescription>
                      <div className="space-y-1">
                        <p>{edu.institution}</p>
                        <p className="text-sm">{edu.duration}</p>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {posts.length === 0 && publications.length === 0 && education.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-slate-600 dark:text-slate-400">
              No archived content yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
