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
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Download,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Users,
  Presentation,
} from "lucide-react";
import Link from "next/link";

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
}

interface Presentation {
  id: number;
  title: string;
  event: string;
  location: string;
  date: string;
  type: string;
  slides_url: string | null;
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
}

interface Award {
  id: number;
  title: string;
  organization: string;
  year: string;
  description: string | null;
}

// Fallback data for when API is not available
const fallbackPublications = [
  {
    id: 1,
    title:
      "A Remote Sensor Network using Android Things and Cloud Computing for the Food Reserve Agency in Zambia",
    authors: ["Mulima Chibuye", "Dr. Jackson Phiri"],
    venue:
      "International Journal of Advanced Computer Science and Applications(IJACSA), Volume 8 Issue 11",
    year: "2017",
    type: "Journal Article",
    status: "Published",
    abstract:
      "This paper presents novel machine learning approaches for optimizing distributed systems performance, focusing on load balancing and resource allocation strategies.",
    doi: "10.14569/IJACSA.2017.081150",
    pdfUrl:
      "https://thesai.org/Downloads/Volume8No11/Paper_50-A_Remote_Sensor_Network_using_Android_Things.pdf",
    citations: 31,
  },
  {
    id: 2,
    title:
      "Current Trends in Machine-Based Predictive Analysis in Agriculture for Better Crop Management - A Systematic Review",
    authors: ["Mulima Chibuye", "Dr. Jackson Phiri"],
    venue: "Zambia Information Communication Technology (ICT) Journal",
    year: "2023",
    type: "Journal Article",
    status: "Published",
    abstract:
      "A comprehensive analysis of modern web architecture patterns and their scalability characteristics in cloud-native environments.",
    doi: "10.33260/zictjournal.v7i1.147",
    pdfUrl:
      "https://ictjournal.icict.org.zm/index.php/zictjournal/article/view/147/67",
    citations: 3,
  },
  {
    id: 3,
    title:
      "Towards Artificial General Intelligence - A Survey of Hyperdimensional Computing and Vector Symbolic Architectures with Quantum Computing for Multivariate Predictions",
    authors: ["Mulima Chibuye", "Dr. Jackson Phiri"],
    venue: "Zambia Information Communication Technology (ICT) Journal",
    year: "2023",
    type: "Journal Article",
    status: "Published",
    abstract:
      "To achieve true artificial intelligence would be to mimic the human brain. " +
      "Some have espoused that current systems that we call AI today are nothing more than if-else statements. There are other arguments that state that indeed, the act of decision making itself is a bunch of nested if-else statements. However, we note that the human brain and through processes that are far more complicated than that has levels of cognition that far outweigh those of any machines that have been made today. While computing systems perform better at certain tasks than human beings do, they remain inherently specific. Human minds are generally creative and knowledge making entities. In this paper, we explore the current progress made towards achieving Artificial General Intelligence and look at it from the angle of Hyperdimensional Computing and Vector Symbolic Architectures both running with the power of quantum computing. We explain how the achievement of AGI will lead to a much more sustainable form of industrial development as has been touted through advancements towards the Fourth Industrial Revolution.",
    doi: "10.33260/zictjournal.v7i2.265",
    pdfUrl:
      "https://ictjournal.icict.org.zm/index.php/zictjournal/article/view/265/117",
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
];

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
];

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
];

const education = [
  {
    degree: "M.S. in Computer Science",
    institution: "University of Zambia, Lusaka",
    location: "Lusaka, ZM",
    duration: "2016 - 2019",
    thesis:
      "A Remote Sensor Network using Android Things and Cloud Computing for the Food Reserve Agency in Zambia",
    advisor: "Prof Jackson Phiri",
    gpa: "3.8/4.0",
  },
  {
    degree: "B.S. in Computer Engineering",
    institution: "University of Zambia",
    location: "Lusaka, ZM",
    duration: "2004 - 2008",
    honors: "Graduated with Merit",
  },
];

const awards = [
  {
    title: "Best Paper Award",
    organization:
      "IEEE International Conference on Distributed Computing Systems",
    year: "2024",
    description: "For outstanding contribution to distributed systems research",
  },
  {
    title: "NSF Graduate Research Fellowship",
    organization: "National Science Foundation",
    year: "2021-2024",
    description:
      "Prestigious fellowship supporting graduate research in computer science",
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
    description:
      "Fellowship supporting research in distributed systems and machine learning",
  },
];

export default function AcademicsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>([]);
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAcademicData();
  }, []);

  const fetchAcademicData = async () => {
    try {
      const response = await fetch('/api/academics');
      if (response.ok) {
        const data = await response.json();
        setPublications(data.publications || []);
        setResearchProjects(data.researchProjects || []);
        setPresentations(data.presentations || []);
        setEducation(data.education || []);
        setAwards(data.awards || []);
      }
    } catch (error) {
      console.error('Error fetching academic data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-400">Loading academic content...</p>
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Academic Work
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            My research focuses on distributed systems, machine learning, and
            edge computing. Here you'll find my publications, research projects,
            and academic contributions.
          </p>
        </section>

        {/* Quick Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {publications.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Publications
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {publications.reduce(
                  (sum, pub) => sum + (pub.citations || 0),
                  0
                )}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Citations
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {researchProjects.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Research Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {awards.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Awards
              </div>
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
                    <Badge
                      variant="outline"
                      className="text-green-700 border-green-300"
                    >
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
                    <Badge
                      variant={
                        pub.status === "Published" ? "default" : "secondary"
                      }
                    >
                      {pub.status}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Badge variant="outline">{pub.type}</Badge>
                      <span>{pub.year}</span>
                      {pub.citations && (
                        <span>• {pub.citations} citations</span>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight">
                    {pub.title}
                  </CardTitle>
                  <CardDescription>
                    <div className="mb-2">
                      <span className="font-medium">Authors: </span>
                      {pub.authors}
                    </div>
                    <div className="mb-3">
                      <span className="font-medium">Published in: </span>
                      <span className="italic">{pub.venue}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      {pub.abstract}
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {pub.doi && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          DOI
                        </a>
                      </Button>
                    )}
                    {pub.pdf_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={pub.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </a>
                      </Button>
                    )}
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
                    <Badge
                      variant={
                        project.status === "Ongoing" ? "default" : "secondary"
                      }
                    >
                      {project.status}
                    </Badge>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {project.duration}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="mb-4">
                    {project.description}
                  </CardDescription>
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
                  {project.collaborators && (
                    <div>
                      <span className="font-medium text-sm">Collaborators: </span>
                      <span className="text-sm">
                        {project.collaborators}
                      </span>
                    </div>
                  )}
                  {project.technologies && (
                    <div>
                      <span className="font-medium text-sm">Technologies: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.split(',').map((tech: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
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
                    {pres.slides_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={pres.slides_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Slides
                        </a>
                      </Button>
                    )}
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
                    <Badge
                      variant="outline"
                      className="text-yellow-700 border-yellow-300"
                    >
                      {award.year}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{award.title}</CardTitle>
                  <CardDescription>
                    <div className="font-medium text-slate-700 dark:text-slate-300 mb-2">
                      {award.organization}
                    </div>
                    <p className="text-sm">{award.description}</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
