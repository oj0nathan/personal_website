"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowLeft, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

const PdfViewer = dynamic(() => import("@/components/pdf-viewer").then((mod) => mod.PdfViewer), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center gap-3 py-32 rounded-2xl border border-white/10 bg-[#0a0a0a]">
      <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      <span className="text-white/50 text-sm">Loading viewer...</span>
    </div>
  ),
})

export default function HardwarePrimerPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
        {/* Back button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors text-sm mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        {/* Hero Title */}
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight leading-[1.05]">
            Thematic Hardware{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Primer</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/60 font-light mb-8 max-w-4xl leading-relaxed">
            The physical infrastructure behind the AI trade, from first principles to supply chain
          </p>
        </motion.header>

        {/* Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <div className="space-y-6 text-base md:text-lg text-white/70 leading-relaxed max-w-4xl">
            <p>
              A primer built for anyone who wants to understand the physical infrastructure behind the AI trade. I go
              from first principles to supply chain, covering the full stack &mdash; semiconductors, lithography,
              memory, optics, power and grid, and humanoid robots.
            </p>
            <p>
              The AI trade is usually told through the lens of the Magnificent Seven, but the real bottlenecks are
              physical. This includes HBM availability, EUV scanner capacity, transformer lead times, and grid
              capacity.
            </p>
          </div>
        </motion.section>

        {/* PDF Viewer */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PdfViewer file="/documents/hardware-primer.pdf" downloadName="Jonathans_Hardware_Primer.pdf" />
        </motion.section>
      </div>
    </main>
  )
}
