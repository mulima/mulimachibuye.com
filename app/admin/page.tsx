"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, LogOut, Archive, ArchiveRestore } from "lucide-react";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category_id: number | null;
  category_name?: string;
  read_time: string | null;
  published: number;
  featured: number;
  archived: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: string;
  status: string;
  abstract: string | null;
  doi: string | null;
  pdf_url: string | null;
  citations: number;
  archived: number;
  display_order: number;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  thesis: string | null;
  advisor: string | null;
  gpa: string | null;
  honors: string | null;
  archived: number;
  display_order: number;
}

interface ResearchProject {
  id: number;
  title: string;
  description: string;
  duration: string;
  role: string;
  funding: string | null;
  collaborators: string | null;
  technologies: string | null;
  status: string;
  archived: number;
  display_order: number;
}

interface Presentation {
  id: number;
  title: string;
  event: string;
  location: string;
  date: string;
  type: string;
  slides_url: string | null;
  archived: number;
  display_order: number;
}

interface Award {
  id: number;
  title: string;
  organization: string;
  year: string;
  description: string | null;
  archived: number;
  display_order: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [siteConfig, setSiteConfig] = useState<Record<string, string>>({});
  const [publications, setPublications] = useState<Publication[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>([]);
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category_id: "",
    read_time: "",
    published: false,
    featured: false,
  });
  const [newPublication, setNewPublication] = useState({
    title: "",
    authors: "",
    venue: "",
    year: "",
    type: "Journal Article",
    status: "Published",
    abstract: "",
    doi: "",
    pdf_url: "",
    citations: 0,
    display_order: 0,
  });
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    location: "",
    duration: "",
    thesis: "",
    advisor: "",
    gpa: "",
    honors: "",
    display_order: 0,
  });
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    duration: "",
    role: "",
    funding: "",
    collaborators: "",
    technologies: "",
    status: "Active",
    display_order: 0,
  });
  const [newPresentation, setNewPresentation] = useState({
    title: "",
    event: "",
    location: "",
    date: "",
    type: "Conference",
    slides_url: "",
    display_order: 0,
  });
  const [newAward, setNewAward] = useState({
    title: "",
    organization: "",
    year: "",
    description: "",
    display_order: 0,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/session");
      const data = await response.json();

      if (data.authenticated) {
        setAuthenticated(true);
        setUsername(data.username);
        fetchData();
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/admin/login");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const [postsRes, categoriesRes, configRes, publicationsRes, educationRes, projectsRes, presentationsRes, awardsRes] = await Promise.all([
        fetch("/api/posts?published=false"),
        fetch("/api/categories"),
        fetch("/api/config"),
        fetch("/api/academics/publications"),
        fetch("/api/academics/education"),
        fetch("/api/academics/projects"),
        fetch("/api/academics/presentations"),
        fetch("/api/academics/awards"),
      ]);

      const postsData = await postsRes.json();
      const categoriesData = await categoriesRes.json();
      const configData = await configRes.json();
      const publicationsData = await publicationsRes.json();
      const educationData = await educationRes.json();
      const projectsData = await projectsRes.json();
      const presentationsData = await presentationsRes.json();
      const awardsData = await awardsRes.json();

      setPosts(postsData);
      setCategories(categoriesData);
      setSiteConfig(configData);
      setPublications(publicationsData);
      setEducation(educationData);
      setResearchProjects(projectsData);
      setPresentations(presentationsData);
      setAwards(awardsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newPost,
          category_id: newPost.category_id ? parseInt(newPost.category_id) : null,
        }),
      });

      if (response.ok) {
        alert("Post created successfully!");
        setNewPost({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category_id: "",
          read_time: "",
          published: false,
          featured: false,
        });
        fetchData();
      } else {
        alert("Error creating post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    }
  };

  const handleToggleArchivePost = async (post: Post) => {
    const action = post.archived ? "unarchive" : "archive";
    if (!confirm(`Are you sure you want to ${action} this post?`)) return;

    try {
      const response = await fetch(`/api/posts/${post.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...post,
          archived: post.archived ? 0 : 1,
        }),
      });

      if (response.ok) {
        alert(`Post ${action}d successfully!`);
        fetchData();
      } else {
        alert(`Error ${action}ing post`);
      }
    } catch (error) {
      console.error(`Error ${action}ing post:`, error);
      alert(`Error ${action}ing post`);
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Post deleted successfully!");
        fetchData();
      } else {
        alert("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post");
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    try {
      const response = await fetch(`/api/posts/${editingPost.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingPost.title,
          slug: editingPost.slug,
          excerpt: editingPost.excerpt,
          content: editingPost.content,
          category_id: editingPost.category_id,
          read_time: editingPost.read_time,
          published: editingPost.published,
          featured: editingPost.featured,
        }),
      });

      if (response.ok) {
        alert("Post updated successfully!");
        setEditingPost(null);
        fetchData();
      } else {
        alert("Error updating post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post");
    }
  };

  const handleCreatePublication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/academics/publications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPublication),
      });

      if (response.ok) {
        alert("Publication created successfully!");
        setNewPublication({
          title: "",
          authors: "",
          venue: "",
          year: "",
          type: "Journal Article",
          status: "Published",
          abstract: "",
          doi: "",
          pdf_url: "",
          citations: 0,
          display_order: 0,
        });
        fetchData();
      } else {
        alert("Error creating publication");
      }
    } catch (error) {
      console.error("Error creating publication:", error);
      alert("Error creating publication");
    }
  };

  const handleUpdatePublication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPublication) return;

    try {
      const response = await fetch("/api/academics/publications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPublication),
      });

      if (response.ok) {
        alert("Publication updated successfully!");
        setEditingPublication(null);
        fetchData();
      } else {
        alert("Error updating publication");
      }
    } catch (error) {
      console.error("Error updating publication:", error);
      alert("Error updating publication");
    }
  };

  const handleToggleArchivePublication = async (pub: Publication) => {
    const action = pub.archived ? "unarchive" : "archive";
    if (!confirm(`Are you sure you want to ${action} this publication?`)) return;

    try {
      const response = await fetch("/api/academics/publications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pub,
          archived: pub.archived ? 0 : 1,
        }),
      });

      if (response.ok) {
        alert(`Publication ${action}d successfully!`);
        fetchData();
      } else {
        alert(`Error ${action}ing publication`);
      }
    } catch (error) {
      console.error(`Error ${action}ing publication:`, error);
      alert(`Error ${action}ing publication`);
    }
  };

  const handleDeletePublication = async (id: number) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;

    try {
      const response = await fetch(`/api/academics/publications?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Publication deleted successfully!");
        fetchData();
      } else {
        alert("Error deleting publication");
      }
    } catch (error) {
      console.error("Error deleting publication:", error);
      alert("Error deleting publication");
    }
  };

  const handleCreateEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/academics/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEducation),
      });

      if (response.ok) {
        alert("Education created successfully!");
        setNewEducation({
          degree: "",
          institution: "",
          location: "",
          duration: "",
          thesis: "",
          advisor: "",
          gpa: "",
          honors: "",
          display_order: 0,
        });
        fetchData();
      } else {
        alert("Error creating education");
      }
    } catch (error) {
      console.error("Error creating education:", error);
      alert("Error creating education");
    }
  };

  const handleUpdateEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEducation) return;

    try {
      const response = await fetch("/api/academics/education", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEducation),
      });

      if (response.ok) {
        alert("Education updated successfully!");
        setEditingEducation(null);
        fetchData();
      } else {
        alert("Error updating education");
      }
    } catch (error) {
      console.error("Error updating education:", error);
      alert("Error updating education");
    }
  };

  const handleToggleArchiveEducation = async (edu: Education) => {
    const action = edu.archived ? "unarchive" : "archive";
    if (!confirm(`Are you sure you want to ${action} this education entry?`)) return;

    try {
      const response = await fetch("/api/academics/education", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...edu,
          archived: edu.archived ? 0 : 1,
        }),
      });

      if (response.ok) {
        alert(`Education ${action}d successfully!`);
        fetchData();
      } else {
        alert(`Error ${action}ing education`);
      }
    } catch (error) {
      console.error(`Error ${action}ing education:`, error);
      alert(`Error ${action}ing education`);
    }
  };

  const handleDeleteEducation = async (id: number) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;

    try {
      const response = await fetch(`/api/academics/education?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Education deleted successfully!");
        fetchData();
      } else {
        alert("Error deleting education");
      }
    } catch (error) {
      console.error("Error deleting education:", error);
      alert("Error deleting education");
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/academics/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        alert("Research project created successfully!");
        setNewProject({
          title: "",
          description: "",
          duration: "",
          role: "",
          funding: "",
          collaborators: "",
          technologies: "",
          status: "Active",
          display_order: 0,
        });
        fetchData();
      } else {
        alert("Error creating research project");
      }
    } catch (error) {
      console.error("Error creating research project:", error);
      alert("Error creating research project");
    }
  };

  const handleCreatePresentation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/academics/presentations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPresentation),
      });

      if (response.ok) {
        alert("Presentation created successfully!");
        setNewPresentation({
          title: "",
          event: "",
          location: "",
          date: "",
          type: "Conference",
          slides_url: "",
          display_order: 0,
        });
        fetchData();
      } else {
        alert("Error creating presentation");
      }
    } catch (error) {
      console.error("Error creating presentation:", error);
      alert("Error creating presentation");
    }
  };

  const handleCreateAward = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/academics/awards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAward),
      });

      if (response.ok) {
        alert("Award created successfully!");
        setNewAward({
          title: "",
          organization: "",
          year: "",
          description: "",
          display_order: 0,
        });
        fetchData();
      } else {
        alert("Error creating award");
      }
    } catch (error) {
      console.error("Error creating award:", error);
      alert("Error creating award");
    }
  };

  const handleUpdateConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteConfig),
      });

      if (response.ok) {
        alert("Site configuration updated successfully!");
      } else {
        alert("Error updating configuration");
      }
    } catch (error) {
      console.error("Error updating config:", error);
      alert("Error updating configuration");
    }
  };

  if (!authenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Welcome, {username}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="posts" className="space-y-8">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="new-post">New Post</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="config">Site Config</TabsTrigger>
          </TabsList>

          {/* Posts List */}
          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>All Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {post.slug}
                        </p>
                        <div className="flex gap-2 mt-2">
                          {post.published === 1 && (
                            <Badge variant="default">Published</Badge>
                          )}
                          {post.featured === 1 && (
                            <Badge variant="secondary">Featured</Badge>
                          )}
                          {post.category_name && (
                            <Badge variant="outline">{post.category_name}</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingPost(post)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleArchivePost(post)}
                          title={post.archived ? "Unarchive" : "Archive"}
                        >
                          {post.archived ? (
                            <ArchiveRestore className="w-4 h-4" />
                          ) : (
                            <Archive className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePost(post.slug)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Post Form */}
          <TabsContent value="new-post">
            <Card>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newPost.title}
                      onChange={(e) =>
                        setNewPost({ ...newPost, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={newPost.slug}
                      onChange={(e) =>
                        setNewPost({ ...newPost, slug: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={newPost.excerpt}
                      onChange={(e) =>
                        setNewPost({ ...newPost, excerpt: e.target.value })
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content (Markdown)</Label>
                    <Textarea
                      id="content"
                      value={newPost.content}
                      onChange={(e) =>
                        setNewPost({ ...newPost, content: e.target.value })
                      }
                      rows={10}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newPost.category_id}
                      onValueChange={(value) =>
                        setNewPost({ ...newPost, category_id: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="read_time">Read Time</Label>
                    <Input
                      id="read_time"
                      value={newPost.read_time}
                      onChange={(e) =>
                        setNewPost({ ...newPost, read_time: e.target.value })
                      }
                      placeholder="e.g., 5 min read"
                    />
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newPost.published}
                        onChange={(e) =>
                          setNewPost({ ...newPost, published: e.target.checked })
                        }
                      />
                      <span>Published</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newPost.featured}
                        onChange={(e) =>
                          setNewPost({ ...newPost, featured: e.target.checked })
                        }
                      />
                      <span>Featured</span>
                    </label>
                  </div>

                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academics */}
          <TabsContent value="academics">
            <div className="space-y-8">
              {/* Add New Publication */}
              <Card>
                <CardHeader>
                  <CardTitle>Add New Publication</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreatePublication} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="pub-title">Title *</Label>
                        <Input
                          id="pub-title"
                          value={newPublication.title}
                          onChange={(e) =>
                            setNewPublication({ ...newPublication, title: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="pub-authors">Authors * (comma-separated)</Label>
                        <Input
                          id="pub-authors"
                          value={newPublication.authors}
                          onChange={(e) =>
                            setNewPublication({ ...newPublication, authors: e.target.value })
                          }
                          placeholder="John Doe, Jane Smith"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="pub-venue">Venue *</Label>
                        <Input
                          id="pub-venue"
                          value={newPublication.venue}
                          onChange={(e) =>
                            setNewPublication({ ...newPublication, venue: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pub-year">Year *</Label>
                        <Input
                          id="pub-year"
                          value={newPublication.year}
                          onChange={(e) =>
                            setNewPublication({ ...newPublication, year: e.target.value })
                          }
                          placeholder="2024"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pub-type">Type</Label>
                        <Select
                          value={newPublication.type}
                          onValueChange={(value) =>
                            setNewPublication({ ...newPublication, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Journal Article">Journal Article</SelectItem>
                            <SelectItem value="Conference Paper">Conference Paper</SelectItem>
                            <SelectItem value="Book Chapter">Book Chapter</SelectItem>
                            <SelectItem value="Technical Report">Technical Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="pub-status">Status</Label>
                        <Select
                          value={newPublication.status}
                          onValueChange={(value) =>
                            setNewPublication({ ...newPublication, status: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Published">Published</SelectItem>
                            <SelectItem value="Under Review">Under Review</SelectItem>
                            <SelectItem value="In Preparation">In Preparation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="pub-citations">Citations</Label>
                        <Input
                          id="pub-citations"
                          type="number"
                          value={newPublication.citations}
                          onChange={(e) =>
                            setNewPublication({ ...newPublication, citations: parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="pub-abstract">Abstract</Label>
                        <Textarea
                          id="pub-abstract"
                          value={newPublication.abstract}
                          onChange={(e) =>
                            setNewPublication({ ...newPublication, abstract: e.target.value })
                          }
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label htmlFor="pub-doi">DOI</Label>
                        <Input
                          id="pub-doi"
                          value={newPublication.doi}
                          onChange={(e) =>
                            setNewPublication({ ...newPublication, doi: e.target.value })
                          }
                          placeholder="10.1234/example"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pub-pdf">PDF URL</Label>
                        <Input
                          id="pub-pdf"
                          value={newPublication.pdf_url}
                          onChange={(e) =>
                            setNewPublication({ ...newPublication, pdf_url: e.target.value })
                          }
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Publication
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Publications */}
              <Card>
                <CardHeader>
                  <CardTitle>All Publications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {publications.map((pub) => (
                      <div
                        key={pub.id}
                        className="flex items-start justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{pub.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {pub.authors}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {pub.venue} ({pub.year})
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{pub.type}</Badge>
                            <Badge variant={pub.status === "Published" ? "default" : "secondary"}>
                              {pub.status}
                            </Badge>
                            {pub.citations > 0 && (
                              <Badge variant="outline">{pub.citations} citations</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingPublication(pub)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleArchivePublication(pub)}
                            title={pub.archived ? "Unarchive" : "Archive"}
                          >
                            {pub.archived ? (
                              <ArchiveRestore className="w-4 h-4" />
                            ) : (
                              <Archive className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeletePublication(pub.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {publications.length === 0 && (
                      <p className="text-center text-slate-500 py-8">
                        No publications yet. Add your first publication!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Add New Education */}
              <Card>
                <CardHeader>
                  <CardTitle>Add New Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateEducation} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="edu-degree">Degree *</Label>
                        <Input
                          id="edu-degree"
                          value={newEducation.degree}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, degree: e.target.value })
                          }
                          placeholder="M.S. in Computer Science"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="edu-institution">Institution *</Label>
                        <Input
                          id="edu-institution"
                          value={newEducation.institution}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, institution: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edu-location">Location *</Label>
                        <Input
                          id="edu-location"
                          value={newEducation.location}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, location: e.target.value })
                          }
                          placeholder="City, Country"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edu-duration">Duration *</Label>
                        <Input
                          id="edu-duration"
                          value={newEducation.duration}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, duration: e.target.value })
                          }
                          placeholder="2020 - 2024"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edu-gpa">GPA</Label>
                        <Input
                          id="edu-gpa"
                          value={newEducation.gpa}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, gpa: e.target.value })
                          }
                          placeholder="3.8/4.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edu-advisor">Advisor</Label>
                        <Input
                          id="edu-advisor"
                          value={newEducation.advisor}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, advisor: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="edu-thesis">Thesis Title</Label>
                        <Input
                          id="edu-thesis"
                          value={newEducation.thesis}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, thesis: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="edu-honors">Honors</Label>
                        <Input
                          id="edu-honors"
                          value={newEducation.honors}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, honors: e.target.value })
                          }
                          placeholder="Graduated with Merit"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle>All Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div
                        key={edu.id}
                        className="flex items-start justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{edu.degree}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {edu.location} • {edu.duration}
                          </p>
                          {edu.gpa && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              GPA: {edu.gpa}
                            </p>
                          )}
                          {edu.thesis && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 italic">
                              Thesis: {edu.thesis}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingEducation(edu)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleArchiveEducation(edu)}
                            title={edu.archived ? "Unarchive" : "Archive"}
                          >
                            {edu.archived ? (
                              <ArchiveRestore className="w-4 h-4" />
                            ) : (
                              <Archive className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteEducation(edu.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {education.length === 0 && (
                      <p className="text-center text-slate-500 py-8">
                        No education entries yet. Add your first degree!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Add New Research Project */}
              <Card>
                <CardHeader>
                  <CardTitle>Add New Research Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateProject} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="proj-title">Title *</Label>
                        <Input
                          id="proj-title"
                          value={newProject.title}
                          onChange={(e) =>
                            setNewProject({ ...newProject, title: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="proj-description">Description *</Label>
                        <Textarea
                          id="proj-description"
                          value={newProject.description}
                          onChange={(e) =>
                            setNewProject({ ...newProject, description: e.target.value })
                          }
                          rows={3}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="proj-duration">Duration *</Label>
                        <Input
                          id="proj-duration"
                          value={newProject.duration}
                          onChange={(e) =>
                            setNewProject({ ...newProject, duration: e.target.value })
                          }
                          placeholder="2020 - 2024"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="proj-role">Role *</Label>
                        <Input
                          id="proj-role"
                          value={newProject.role}
                          onChange={(e) =>
                            setNewProject({ ...newProject, role: e.target.value })
                          }
                          placeholder="Principal Investigator"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="proj-funding">Funding</Label>
                        <Input
                          id="proj-funding"
                          value={newProject.funding}
                          onChange={(e) =>
                            setNewProject({ ...newProject, funding: e.target.value })
                          }
                          placeholder="NSF Grant #12345"
                        />
                      </div>
                      <div>
                        <Label htmlFor="proj-status">Status</Label>
                        <Select
                          value={newProject.status}
                          onValueChange={(value) =>
                            setNewProject({ ...newProject, status: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="proj-collaborators">Collaborators (comma-separated)</Label>
                        <Input
                          id="proj-collaborators"
                          value={newProject.collaborators}
                          onChange={(e) =>
                            setNewProject({ ...newProject, collaborators: e.target.value })
                          }
                          placeholder="Dr. Smith, Dr. Johnson"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="proj-technologies">Technologies (comma-separated)</Label>
                        <Input
                          id="proj-technologies"
                          value={newProject.technologies}
                          onChange={(e) =>
                            setNewProject({ ...newProject, technologies: e.target.value })
                          }
                          placeholder="Python, TensorFlow, AWS"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Research Project
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Research Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>All Research Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {researchProjects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-start justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {project.description}
                          </p>
                          <div className="flex gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                            <span>Duration: {project.duration}</span>
                            <span>Role: {project.role}</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{project.status}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert('Edit functionality coming soon')}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert('Archive functionality coming soon')}
                            title="Archive"
                          >
                            <Archive className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => alert('Delete functionality coming soon')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {researchProjects.length === 0 && (
                      <p className="text-center text-slate-500 py-8">
                        No research projects yet. Add your first project!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Add New Presentation */}
              <Card>
                <CardHeader>
                  <CardTitle>Add New Presentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreatePresentation} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="pres-title">Title *</Label>
                        <Input
                          id="pres-title"
                          value={newPresentation.title}
                          onChange={(e) =>
                            setNewPresentation({ ...newPresentation, title: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="pres-event">Event *</Label>
                        <Input
                          id="pres-event"
                          value={newPresentation.event}
                          onChange={(e) =>
                            setNewPresentation({ ...newPresentation, event: e.target.value })
                          }
                          placeholder="International Conference on AI"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pres-location">Location *</Label>
                        <Input
                          id="pres-location"
                          value={newPresentation.location}
                          onChange={(e) =>
                            setNewPresentation({ ...newPresentation, location: e.target.value })
                          }
                          placeholder="San Francisco, CA"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pres-date">Date *</Label>
                        <Input
                          id="pres-date"
                          type="date"
                          value={newPresentation.date}
                          onChange={(e) =>
                            setNewPresentation({ ...newPresentation, date: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pres-type">Type</Label>
                        <Select
                          value={newPresentation.type}
                          onValueChange={(value) =>
                            setNewPresentation({ ...newPresentation, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Conference">Conference</SelectItem>
                            <SelectItem value="Workshop">Workshop</SelectItem>
                            <SelectItem value="Seminar">Seminar</SelectItem>
                            <SelectItem value="Invited Talk">Invited Talk</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="pres-slides">Slides URL</Label>
                        <Input
                          id="pres-slides"
                          value={newPresentation.slides_url}
                          onChange={(e) =>
                            setNewPresentation({ ...newPresentation, slides_url: e.target.value })
                          }
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Presentation
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Presentations */}
              <Card>
                <CardHeader>
                  <CardTitle>All Presentations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {presentations.map((pres) => (
                      <div
                        key={pres.id}
                        className="flex items-start justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{pres.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {pres.event}
                          </p>
                          <div className="flex gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                            <span>{pres.location}</span>
                            <span>{pres.date}</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{pres.type}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert('Edit functionality coming soon')}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert('Archive functionality coming soon')}
                            title="Archive"
                          >
                            <Archive className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => alert('Delete functionality coming soon')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {presentations.length === 0 && (
                      <p className="text-center text-slate-500 py-8">
                        No presentations yet. Add your first presentation!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Add New Award */}
              <Card>
                <CardHeader>
                  <CardTitle>Add New Award</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateAward} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="award-title">Title *</Label>
                        <Input
                          id="award-title"
                          value={newAward.title}
                          onChange={(e) =>
                            setNewAward({ ...newAward, title: e.target.value })
                          }
                          placeholder="Best Paper Award"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="award-org">Organization *</Label>
                        <Input
                          id="award-org"
                          value={newAward.organization}
                          onChange={(e) =>
                            setNewAward({ ...newAward, organization: e.target.value })
                          }
                          placeholder="IEEE"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="award-year">Year *</Label>
                        <Input
                          id="award-year"
                          value={newAward.year}
                          onChange={(e) =>
                            setNewAward({ ...newAward, year: e.target.value })
                          }
                          placeholder="2024"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="award-description">Description</Label>
                        <Textarea
                          id="award-description"
                          value={newAward.description}
                          onChange={(e) =>
                            setNewAward({ ...newAward, description: e.target.value })
                          }
                          rows={2}
                          placeholder="Brief description of the award..."
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Award
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Awards */}
              <Card>
                <CardHeader>
                  <CardTitle>All Awards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {awards.map((award) => (
                      <div
                        key={award.id}
                        className="flex items-start justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{award.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {award.organization} • {award.year}
                          </p>
                          {award.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                              {award.description}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert('Edit functionality coming soon')}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert('Archive functionality coming soon')}
                            title="Archive"
                          >
                            <Archive className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => alert('Delete functionality coming soon')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {awards.length === 0 && (
                      <p className="text-center text-slate-500 py-8">
                        No awards yet. Add your first award!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Categories */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between p-3 border rounded"
                    >
                      <div>
                        <p className="font-semibold">{cat.name}</p>
                        <p className="text-sm text-slate-600">{cat.slug}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Configuration */}
          <TabsContent value="config">
            <Card>
              <CardHeader>
                <CardTitle>Site Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateConfig} className="space-y-4">
                  <div>
                    <Label htmlFor="site_title">Site Title</Label>
                    <Input
                      id="site_title"
                      value={siteConfig.site_title || ""}
                      onChange={(e) =>
                        setSiteConfig({ ...siteConfig, site_title: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="site_description">Site Description</Label>
                    <Textarea
                      id="site_description"
                      value={siteConfig.site_description || ""}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          site_description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="site_author">Site Author</Label>
                    <Input
                      id="site_author"
                      value={siteConfig.site_author || ""}
                      onChange={(e) =>
                        setSiteConfig({ ...siteConfig, site_author: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="site_email">Site Email</Label>
                    <Input
                      id="site_email"
                      type="email"
                      value={siteConfig.site_email || ""}
                      onChange={(e) =>
                        setSiteConfig({ ...siteConfig, site_email: e.target.value })
                      }
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Update Configuration
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Post Modal */}
        {editingPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Edit Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePost} className="space-y-4">
                  <div>
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      value={editingPost.title}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-slug">Slug</Label>
                    <Input
                      id="edit-slug"
                      value={editingPost.slug}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, slug: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-excerpt">Excerpt</Label>
                    <Textarea
                      id="edit-excerpt"
                      value={editingPost.excerpt || ""}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, excerpt: e.target.value })
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-content">Content (Markdown)</Label>
                    <Textarea
                      id="edit-content"
                      value={editingPost.content}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, content: e.target.value })
                      }
                      rows={10}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-category">Category</Label>
                    <Select
                      value={editingPost.category_id?.toString() || ""}
                      onValueChange={(value) =>
                        setEditingPost({
                          ...editingPost,
                          category_id: value ? parseInt(value) : null,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="edit-read-time">Read Time</Label>
                    <Input
                      id="edit-read-time"
                      value={editingPost.read_time || ""}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, read_time: e.target.value })
                      }
                      placeholder="e.g., 5 min read"
                    />
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingPost.published === 1}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            published: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                      <span>Published</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingPost.featured === 1}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            featured: e.target.checked ? 1 : 0,
                          })
                        }
                      />
                      <span>Featured</span>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditingPost(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Publication Modal */}
        {editingPublication && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Edit Publication</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePublication} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="edit-pub-title">Title *</Label>
                      <Input
                        id="edit-pub-title"
                        value={editingPublication.title}
                        onChange={(e) =>
                          setEditingPublication({ ...editingPublication, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="edit-pub-authors">Authors * (comma-separated)</Label>
                      <Input
                        id="edit-pub-authors"
                        value={editingPublication.authors}
                        onChange={(e) =>
                          setEditingPublication({ ...editingPublication, authors: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="edit-pub-venue">Venue *</Label>
                      <Input
                        id="edit-pub-venue"
                        value={editingPublication.venue}
                        onChange={(e) =>
                          setEditingPublication({ ...editingPublication, venue: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-pub-year">Year *</Label>
                      <Input
                        id="edit-pub-year"
                        value={editingPublication.year}
                        onChange={(e) =>
                          setEditingPublication({ ...editingPublication, year: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-pub-type">Type</Label>
                      <Select
                        value={editingPublication.type}
                        onValueChange={(value) =>
                          setEditingPublication({ ...editingPublication, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Journal Article">Journal Article</SelectItem>
                          <SelectItem value="Conference Paper">Conference Paper</SelectItem>
                          <SelectItem value="Book Chapter">Book Chapter</SelectItem>
                          <SelectItem value="Technical Report">Technical Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-pub-status">Status</Label>
                      <Select
                        value={editingPublication.status}
                        onValueChange={(value) =>
                          setEditingPublication({ ...editingPublication, status: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Under Review">Under Review</SelectItem>
                          <SelectItem value="In Preparation">In Preparation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="edit-pub-citations">Citations</Label>
                      <Input
                        id="edit-pub-citations"
                        type="number"
                        value={editingPublication.citations}
                        onChange={(e) =>
                          setEditingPublication({ ...editingPublication, citations: parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="edit-pub-abstract">Abstract</Label>
                      <Textarea
                        id="edit-pub-abstract"
                        value={editingPublication.abstract || ""}
                        onChange={(e) =>
                          setEditingPublication({ ...editingPublication, abstract: e.target.value })
                        }
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-pub-doi">DOI</Label>
                      <Input
                        id="edit-pub-doi"
                        value={editingPublication.doi || ""}
                        onChange={(e) =>
                          setEditingPublication({ ...editingPublication, doi: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-pub-pdf">PDF URL</Label>
                      <Input
                        id="edit-pub-pdf"
                        value={editingPublication.pdf_url || ""}
                        onChange={(e) =>
                          setEditingPublication({ ...editingPublication, pdf_url: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditingPublication(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Education Modal */}
        {editingEducation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Edit Education</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateEducation} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="edit-edu-degree">Degree *</Label>
                      <Input
                        id="edit-edu-degree"
                        value={editingEducation.degree}
                        onChange={(e) =>
                          setEditingEducation({ ...editingEducation, degree: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="edit-edu-institution">Institution *</Label>
                      <Input
                        id="edit-edu-institution"
                        value={editingEducation.institution}
                        onChange={(e) =>
                          setEditingEducation({ ...editingEducation, institution: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-edu-location">Location *</Label>
                      <Input
                        id="edit-edu-location"
                        value={editingEducation.location}
                        onChange={(e) =>
                          setEditingEducation({ ...editingEducation, location: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-edu-duration">Duration *</Label>
                      <Input
                        id="edit-edu-duration"
                        value={editingEducation.duration}
                        onChange={(e) =>
                          setEditingEducation({ ...editingEducation, duration: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-edu-gpa">GPA</Label>
                      <Input
                        id="edit-edu-gpa"
                        value={editingEducation.gpa || ""}
                        onChange={(e) =>
                          setEditingEducation({ ...editingEducation, gpa: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-edu-advisor">Advisor</Label>
                      <Input
                        id="edit-edu-advisor"
                        value={editingEducation.advisor || ""}
                        onChange={(e) =>
                          setEditingEducation({ ...editingEducation, advisor: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="edit-edu-thesis">Thesis Title</Label>
                      <Input
                        id="edit-edu-thesis"
                        value={editingEducation.thesis || ""}
                        onChange={(e) =>
                          setEditingEducation({ ...editingEducation, thesis: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="edit-edu-honors">Honors</Label>
                      <Input
                        id="edit-edu-honors"
                        value={editingEducation.honors || ""}
                        onChange={(e) =>
                          setEditingEducation({ ...editingEducation, honors: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditingEducation(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
