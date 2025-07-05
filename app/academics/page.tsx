import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Download, Calendar, MapPin, Award, BookOpen, Users, Presentation } from "lucide-react"
import Link from "next/link"

// Mock academic data - replace with your actual academic work
const publications = [
  {
    id: 1,
    title: "Machine Learning Approaches for Distributed System Optimization",
    authors: ["Your Name", "Dr. Jane Smith", "Dr. John Doe"],
    venue: "IEEE Transactions on Parallel and Distributed Systems",
    year: "2024",
    type: "Journal Article",
    status: "Published",
    abstract:
      "This paper presents novel machine learning approaches for optimizing distributed systems performance, focusing on load balancing and resource allocation strategies.",
    doi: "10.1109/TPDS.2024.1234567",
    pdfUrl: "#",
    citations: 12,
  },
  {
    id: 2,
    title: "Scalable Web Architecture Patterns: A Comparative Study",
    authors: ["Your Name", "Dr. Alice Johnson"],
    venue: "ACM Computing Surveys",
    year: "2023",
    type: "Journal Article",
    status: "Published",
    abstract:
      "A comprehensive analysis of modern web architecture patterns and their scalability characteristics in cloud-native environments.",
    doi: "10.1145/3579834.3579835",
    pdfUrl: "#",
    citations: 28,
  },
  {
    id: 3,
    title: "Real-time Data Processing in Edge Computing Environments",
    authors: ["Your Name", "Dr. Bob Wilson", "Dr. Carol Brown"],
    venue: "International Conference on Distributed Computing Systems (ICDCS)",
    year: "2023",
    type: "Conference Paper",
    status: "Published",
    abstract:
      "We propose a novel framework for real-time data processing at the edge, reducing latency and improving system responsiveness.",
    doi: "10.1109/ICDCS.2023.1234567",
    pdfUrl: "#",
    citations: 15,
  },
  {
    id: 4,
    title: "Blockchain-based Identity Management for IoT Devices",
    authors: ["Your Name", "Dr. David Lee"],
    venue: "Journal of Network and Computer Applications",
    year: "2024",
    type: "Journal Article",
    status: "Under Review",
    abstract:
      "This work presents a decentralized identity management system for IoT devices using blockchain technology to ensure security and privacy.",
    pdfUrl: "#",
  },
]

const researchProjects = [
  {
    id: 1,
    title: "Distributed Machine Learning Platform",
    description:
      "Developing a scalable platform for distributed machine learning workloads across heterogeneous computing environments.",
    duration: "2023 - Present",
    role: "Lead Researcher",
    funding: "NSF Grant #1234567 ($250,000)",
    collaborators: ["Stanford University", "MIT"],
    technologies: ["Python", "TensorFlow", "Kubernetes", "Apache Spark"],
    status: "Ongoing",
  },
  {
    id: 2,
    title: "Edge Computing Security Framework",
    description:
      "Research focused on developing security protocols and frameworks for edge computing environments in IoT ecosystems.",
    duration: "2022 - 2023",
    role: "Research Assistant",
    funding: "Industry Partnership with Google",
    collaborators: ["Google Research", "UC Berkeley"],
    technologies: ["Go", "Docker", "Kubernetes", "Blockchain"],
    status: "Completed",
  },
  {
    id: 3,
    title: "Quantum-Safe Cryptography Implementation",
    description:
      "Investigating post-quantum cryptographic algorithms and their practical implementation in distributed systems.",
    duration: "2024 - Present",
    role: "Co-Investigator",
    funding: "DARPA Grant #D24-1234 ($500,000)",
    collaborators: ["IBM Research", "Carnegie Mellon"],
    technologies: ["C++", "Rust", "OpenSSL", "NIST PQC"],
    status: "Ongoing",
  },
]

const presentations = [
  {
    id: 1,
    title: "The Future of Distributed Systems: Challenges and Opportunities",
    event: "IEEE International Conference on Distributed Computing Systems",
    location: "Hong Kong",
    date: "2024-07-15",
    type: "Keynote",
    slidesUrl: "#",
  },
  {
    id: 2,
    title: "Machine Learning at Scale: Lessons from Production",
    event: "ACM Symposium on Cloud Computing",
    location: "Seattle, WA",
    date: "2023-10-30",
    type: "Oral Presentation",
    slidesUrl: "#",
  },
  {
    id: 3,
    title: "Edge Computing Security: Current State and Future Directions",
    event: "International Workshop on Edge Computing",
    location: "Virtual",
    date: "2023-06-12",
    type: "Invited Talk",
    slidesUrl: "#",
  },
]

const education = [
  {
    degree: "Ph.D. in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    duration: "2020 - 2024",
    thesis: "Scalable Machine Learning Systems for Distributed Computing Environments",
    advisor: "Dr. Jane Smith",
    gpa: "3.9/4.0",
  },
  {
    degree: "M.S. in Computer Science",
    institution: "University of California, Berkeley",
    location: "Berkeley, CA",
    duration: "2018 - 2020",
    thesis: "Performance Optimization in Cloud-Native Applications",
    advisor: "Dr. John Doe",
    gpa: "3.8/4.0",
  },
  {
    degree: "B.S. in Computer Engineering",
    institution: "Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    duration: "2014 - 2018",
    honors: "Summa Cum Laude, Phi Beta Kappa",
    gpa: "3.9/4.0",
  },
]

const awards = [
  {
    title: "Best Paper Award",
    organization: "IEEE International Conference on Distributed Computing Systems",
    year: "2024",
    description: "For outstanding contribution to distributed systems research",
  },
  {
    title: "NSF Graduate Research Fellowship",
    organization: "National Science Foundation",
    year: "2021-2024",
    description: "Prestigious fellowship supporting graduate research in computer science",
  },
  {
    title: "Outstanding Graduate Student Award",
    organization: "Stanford University Computer Science Department",
    year: "2023",
    description: "Recognizing exceptional academic and research achievements",
  },
  {
    title: "Google PhD Fellowship",
    organization: "Google Research",
    year: "2022-2023",
    description: "Fellowship supporting research in distributed systems and machine learning",
  },
]

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Link href="/academics" className="text-slate-900 dark:text-white font-medium">
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Academic Work</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            My research focuses on distributed systems, machine learning, and edge computing. Here you'll find my
            publications, research projects, and academic contributions.
          </p>
        </section>

        {/* Quick Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{publications.length}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Publications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {publications.reduce((sum, pub) => sum + (pub.citations || 0), 0)}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Citations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{researchProjects.length}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Research Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{awards.length}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Awards</div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{edu.degree}</CardTitle>
                      <CardDescription className="text-lg font-medium text-slate-700 dark:text-slate-300">
                        {edu.institution}
                      </CardDescription>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {edu.duration}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      GPA: {edu.gpa}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {edu.thesis && (
                    <div className="mb-2">
                      <span className="font-medium">Thesis: </span>
                      <span className="italic">{edu.thesis}</span>
                    </div>
                  )}
                  {edu.advisor && (
                    <div className="mb-2">
                      <span className="font-medium">Advisor: </span>
                      {edu.advisor}
                    </div>
                  )}
                  {edu.honors && (
                    <div>
                      <span className="font-medium">Honors: </span>
                      {edu.honors}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-green-600" />
            Publications
          </h2>
          <div className="space-y-6">
            {publications.map((pub) => (
              <Card key={pub.id} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={pub.status === "Published" ? "default" : "secondary"}>{pub.status}</Badge>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Badge variant="outline">{pub.type}</Badge>
                      <span>{pub.year}</span>
                      {pub.citations && <span>• {pub.citations} citations</span>}
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight">{pub.title}</CardTitle>
                  <CardDescription>
                    <div className="mb-2">
                      <span className="font-medium">Authors: </span>
                      {pub.authors.map((author, index) => (
                        <span key={index} className={author === "Your Name" ? "font-semibold" : ""}>
                          {author}
                          {index < pub.authors.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                    <div className="mb-3">
                      <span className="font-medium">Published in: </span>
                      <span className="italic">{pub.venue}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{pub.abstract}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {pub.doi && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          DOI
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Research Projects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <Users className="w-8 h-8 mr-3 text-purple-600" />
            Research Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {researchProjects.map((project) => (
              <Card key={project.id} className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={project.status === "Ongoing" ? "default" : "secondary"}>{project.status}</Badge>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{project.duration}</span>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="mb-4">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-sm">Role: </span>
                    <span className="text-sm">{project.role}</span>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Funding: </span>
                    <span className="text-sm">{project.funding}</span>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Collaborators: </span>
                    <span className="text-sm">{project.collaborators.join(", ")}</span>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Technologies: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Presentations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <Presentation className="w-8 h-8 mr-3 text-orange-600" />
            Conference Presentations
          </h2>
          <div className="space-y-4">
            {presentations.map((pres) => (
              <Card key={pres.id} className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{pres.type}</Badge>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {new Date(pres.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{pres.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-4 mt-1">
                          <span>{pres.event}</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {pres.location}
                          </div>
                        </div>
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={pres.slidesUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Slides
                      </a>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <Award className="w-8 h-8 mr-3 text-yellow-600" />
            Awards & Honors
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                      {award.year}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{award.title}</CardTitle>
                  <CardDescription>
                    <div className="font-medium text-slate-700 dark:text-slate-300 mb-2">{award.organization}</div>
                    <p className="text-sm">{award.description}</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
