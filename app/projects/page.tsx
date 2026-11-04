"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { BackgroundPaths } from "@/components/ui/background-paths"
import PictureRailGallery, { type PictureRailItem } from "@/components/ui/picture-rail-gallery"

// `aspect` matches each thumbnail's width ÷ height so the card shows the whole image.
const prints: PictureRailItem[] = [
  {
    id: "medium",
    title: "Medium Articles",
    artist: "Writing",
    description: "Insights on AI, quantitative finance, and technology trends.",
    image: "/medium-blog-articles-dark-theme-financial-analysis.jpg",
    aspect: 1,
    accent: "#3b82f6",
    drop: 0.04,
    href: "https://medium.com/@johoblogs",
    external: true,
  },
  {
    id: "library",
    title: "Book Review Library",
    artist: "Reading",
    description: "Comprehensive reviews from my reading journey with key takeaways.",
    image: "/images/book-morals-history.png",
    aspect: 0.75,
    accent: "#14b8a6",
    drop: 0,
    href: "/books",
  },
  {
    id: "hardware-primer",
    title: "Thematic Hardware Primer",
    artist: "Research primer",
    description: "A primer built for anyone who wants to understand the physical infrastructure behind the AI trade.",
    image: "/images/hardware-primer-thumbnail.png",
    aspect: 1.6,
    accent: "#6366f1",
    drop: 0.08,
    href: "/projects/hardware-primer",
  },
  {
    id: "macro-dashboard",
    title: "Macro Intelligence Dashboard",
    artist: "Data engineering",
    description:
      "A cloud-hosted macro monitoring system built to replace expensive terminal workflows with automated data pipelines, Postgres storage, and Grafana analytics.",
    image: "/images/bloomberg-terminal.png",
    aspect: 16 / 9,
    accent: "#0ea5e9",
    drop: 0.02,
    href: "/projects/macro-dashboard",
  },
  {
    id: "apac-risk",
    title: "APAC Multi-Asset Risk Decomposition",
    artist: "Risk modelling",
    description:
      "Building an institutional-grade risk engine to decompose portfolio variance into systematic and idiosyncratic components using Ridge Regression for stable factor attributions.",
    image: "/images/apac-risk-thumbnail.jpg",
    aspect: 1,
    accent: "#2563eb",
    drop: 0.03,
    href: "/projects/apac-risk",
  },
  {
    id: "regime-detection",
    title: "Detecting Regime Shifts",
    artist: "Quant research",
    description:
      "End-to-end regime-switching model using Hidden Markov Models to learn 4 macro regimes from US growth and inflation for multi-asset allocation.",
    image: "/images/regime-shift-cover.webp",
    aspect: 735 / 980,
    accent: "#64748b",
    drop: 0.08,
    href: "/projects/regime-detection",
  },
  {
    id: "risk-conditioned",
    title: "Risk-Conditioned Allocator",
    artist: "Portfolio construction",
    description:
      "Dynamic risk-budgeting framework routing capital between trend following, mean reversion and cash using volatility, autocorrelation and VaR overlays.",
    image: "/images/risk-allocator-thumbnail.png",
    aspect: 786 / 464,
    accent: "#0891b2",
    drop: 0,
    href: "/projects/risk-conditioned",
  },
]

export default function ProjectsPage() {
  const router = useRouter()
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

  const openProject = (item: PictureRailItem) => {
    if (!item.href) return
    if (item.external) window.open(item.href, "_blank", "noopener,noreferrer")
    else router.push(item.href)
  }

  const gallery = {
    variant: "badge" as const,
    showMeta: false,
    maxUnit: 230,
    scroll: true,
    caption: "Hover a card to bring it forward, click to open the project.",
    labels: { front: "Front", back: "Back", close: "Close", open: "Click to open" },
    onItemClick: openProject,
    className: "bg-transparent",
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
        <header className="mb-4">
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
      </div>

      {/* Projects hung as cards on a rail: hover to bring one forward, click to open it */}
      <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="relative z-10 pb-12">
        <PictureRailGallery items={prints} autoplay interval={3200} {...gallery} />
      </motion.div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </main>
  )
}
