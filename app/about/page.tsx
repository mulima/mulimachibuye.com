import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Github, Twitter, MapPin, Coffee } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
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
        <section className="mb-16 text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
            <img
              src="/images/mulima_001.jpg"
              alt="My Photo"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About Me
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {
              "Hi! I'm a Systems Engineer and researcher in all things tech,  passionate about building great solutions and sharing knowledge with the community."
            }
          </p>
        </section>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>My Story</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  {
                    "I'm a systems and software engineer with over 17 years of expreience in the telecom and tech space. I am also a qualified project manager and thrive on building scalable, efficient systems that solve real-world problems. My journey in tech started with a fascination for computers and programming, which led me to pursue a degree in Computer Science."
                  }
                </p>
                <p>
                  {
                    "Currently, I work as an IT Operations Manager for Airtel Mobile Commerce Limited, the largest mobile money provider in Zambia."
                  }
                </p>
                <p>
                  {
                    "I started this blog to share my experiences, document my learning journey, and hopefully help other tech professionals along the way. I believe in learning in public and the power of community-driven knowledge sharing."
                  }
                </p>

                <p>
                  {
                    "Besides my academic and professional work, I am also an author with one book to my name so far. I decided to follow my passion and bring my long life passion of understadning money to life."
                  }
                </p>
              </CardContent>
            </Card>

            {/* What I Write About */}
            <Card>
              <CardHeader>
                <CardTitle>What I Write About</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Airtificial Intelligence
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Large Language Models, AI ethics, Quantum Computing
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Telecom Engineering
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      All IP, Edge Networking, Data Centre, APIs, and system
                      architecture.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      DevOps & Tools
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Docker, CI/CD, cloud platforms, and developer productivity
                      tools.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Career & Growth
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Professional development, learning strategies, and
                      industry insights.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="w-5 h-5" />
                  Quick Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    Lusaka, ZM
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    Languages I speak:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      English
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Cantonese
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      JavaScript
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    Currently learning:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      Next.js, TypeScript, and Tailwind CSS
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Python
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tech Stack */}
            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                      Frontend
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        React
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Next.js
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        TypeScript
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Tailwind
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                      Backend
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        Node.js
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Python
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        PostgreSQL
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Redis
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                      Tools
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        Docker
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        AWS
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Git
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Neovim
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Kubernetes
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>{"Let's Connect"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <a href="mailto:hello@mulimachibuye.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Me
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <a
                    href="https://github.com/mulima"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <a
                    href="https://twitter.com/mulimac"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
