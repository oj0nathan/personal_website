"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { ProjectCard } from "@/components/ui/project-card"
import { BackgroundPaths } from "@/components/ui/background-paths"

const projects = [
  {
    title: "Medium Articles",
    description: "Insights on AI, quantitative finance, and technology trends.",
    image: "/medium-blog-articles-dark-theme-financial-analysis.jpg",
    link: "https://medium.com/@johoblogs",
    linkText: "Read Articles",
    isWip: false,
    isInternal: false,
  },
  {
    title: "Book Review Library",
    description: "Comprehensive reviews from my reading journey with key takeaways.",
    image: "/images/bookshelf.png",
    link: "https://joholibrary.notion.site/Jonathan-s-Library-92e916b037f14ed38b8663a79aa3e6f6?pvs=74",
    linkText: "Explore Library",
    isWip: false,
    isInternal: false,
  },
  {
    title: "Factor Modelling",
    description:
      "Building a macro factor model for sector rotation and SPY timing using rolling OLS, trend filters, and risk-aware portfolio construction.",
    image: "/factor-model-quantitative-finance-charts-dark-them.jpg",
    link: "/projects/factor-modelling",
    linkText: "View Project",
    isWip: false,
    isInternal: true,
  },
  {
    title: "Detecting Regime Shifts",
    description:
      "End-to-end regime-switching model using Hidden Markov Models to learn 4 macro regimes from US growth and inflation for multi-asset allocation.",
    image: "/images/regime-shift-thumbnail.png",
    link: "/projects/regime-detection",
    linkText: "View Project",
    isWip: false,
    isInternal: true,
  },
]

export default function ProjectsPage() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      <BackgroundPaths />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-indigo-500/[0.05] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        {/* Back button */}
        <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </motion.div>

        {/* Header */}
        <header className="mb-12">
          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl font-serif text-white mb-4 tracking-tight"
          >
            My{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">Projects</span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-xl text-white/40"
          >
            Personal projects I've been working on.
          </motion.p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              imgSrc={project.image}
              title={project.title}
              description={project.description}
              link={project.link}
              linkText={project.linkText}
              index={index}
              isWip={project.isWip}
              isInternal={project.isInternal}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </main>
  )
}
