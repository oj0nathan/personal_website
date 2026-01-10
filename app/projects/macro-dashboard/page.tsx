"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function MacroDashboardPage() {
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
            Macro Intelligence{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Dashboard</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/60 font-light mb-8 max-w-4xl leading-relaxed">
            Cloud-hosted monitoring system replacing expensive terminal workflows with automated pipelines and real-time
            analytics
          </p>
        </motion.header>

        {/* TL;DR - Visual Centerpiece */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 tracking-tight">TL;DR</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-transparent mb-8" />

          <div className="space-y-6 text-base md:text-lg text-white/70 leading-relaxed">
            <p>
              <strong className="text-white font-semibold">Built:</strong> Cloud-hosted macro terminal covering
              Inflation/Rates/Credit/Growth
            </p>
            <p>
              <strong className="text-white font-semibold">Trust:</strong> Daily refresh + last refresh timestamp +
              series count
            </p>
            <p>
              <strong className="text-white font-semibold">Workflow:</strong> Snapshot → Drivers → History (Grafana
              layout)
            </p>
            <p>
              <strong className="text-white font-semibold">Stack:</strong> FRED → Python ingest → Postgres → Grafana
            </p>
          </div>
        </motion.section>

        {/* Live Dashboards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 tracking-tight">Live Dashboards</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-transparent mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://johoblogs.grafana.net/public-dashboards/b4f40f43ced7454fa2849b5bd0b762c7"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-[280px] rounded-lg overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Bloomberg Terminal Background */}
              <div className="absolute inset-0">
                <Image src="/images/image.png" alt="Inflation dashboard preview" fill className="object-cover" />
              </div>

              {/* Dark Overlay - goes from 90% to 20% on hover */}
              <div className="absolute inset-0 bg-black/90 group-hover:bg-black/20 transition-all duration-300" />

              {/* Simplified content */}
              <div className="relative h-full p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-blue-400 mb-3">INFLATION</h3>
                <p className="text-white/80 text-sm">Is core CPI peaking or still accelerating?</p>
              </div>
            </a>

            <a
              href="https://johoblogs.grafana.net/public-dashboards/d9037fde5d724f0bac168173a009bb87"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-[280px] rounded-lg overflow-hidden border border-white/10 hover:border-violet-500/50 transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/credit-dashboard.png"
                  alt="Credit dashboard preview"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/90 group-hover:bg-black/20 transition-all duration-300" />

              {/* Simplified content */}
              <div className="relative h-full p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-violet-400 mb-3">CREDIT</h3>
                <p className="text-white/80 text-sm">Are IG-HY spreads widening or compressing?</p>
              </div>
            </a>

            <a
              href="https://johoblogs.grafana.net/public-dashboards/7c3710fda3744d95aae8a845cecb68da"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-[280px] rounded-lg overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image src="/images/rates-dashboard.png" alt="Rates dashboard preview" fill className="object-cover" />
              </div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/90 group-hover:bg-black/20 transition-all duration-300" />

              {/* Simplified content */}
              <div className="relative h-full p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-3">RATES</h3>
                <p className="text-white/80 text-sm">Where is the yield curve inverting?</p>
              </div>
            </a>

            <a
              href="https://johoblogs.grafana.net/public-dashboards/27795f6f06cf44ba9856c9e5b94f0108"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-[280px] rounded-lg overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/growth-dashboard.png"
                  alt="Growth dashboard preview"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/90 group-hover:bg-black/20 transition-all duration-300" />

              {/* Simplified content */}
              <div className="relative h-full p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-amber-400 mb-3">GROWTH</h3>
                <p className="text-white/80 text-sm">Is employment data signaling slowdown or resilience?</p>
              </div>
            </a>
          </div>
        </motion.section>

        {/* Key Visuals */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 tracking-tight">Key Visuals</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-transparent mb-8" />

          {/* ERD Diagram - Full Width */}
          <div className="mb-12">
            <div className="relative rounded-lg overflow-hidden border border-white/10 bg-white">
              <Image
                src="/images/macro-erd-diagram.png"
                alt="Database ERD showing modular schema design"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <p className="text-sm text-white/50 italic mt-4 leading-relaxed">
              Modular database schema with separate tables for CPI, Credit, Rates, and Growth series
            </p>
          </div>

          {/* Dashboard Screenshots - 3 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <div className="relative h-[400px] rounded-lg overflow-hidden border border-white/10 mb-4">
                <Image
                  src="/images/credit-dashboard.png"
                  alt="Credit dashboard with spreads and bond metrics"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-white/50 italic leading-relaxed">
                Credit dashboard displaying IG-HY spreads, issuance data, and corporate bond metrics
              </p>
            </div>

            <div className="flex flex-col">
              <div className="relative h-[400px] rounded-lg overflow-hidden border border-white/10 mb-4">
                <Image
                  src="/images/rates-dashboard.png"
                  alt="Rates dashboard showing yield curves and Treasury data"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-white/50 italic leading-relaxed">
                Rates dashboard with Treasury curves, decomposition, and curve regime indicators
              </p>
            </div>

            <div className="flex flex-col">
              <div className="relative h-[400px] rounded-lg overflow-hidden border border-white/10 mb-4">
                <Image
                  src="/images/growth-dashboard.png"
                  alt="Growth dashboard with employment and GDP metrics"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-white/50 italic leading-relaxed">
                Growth dashboard tracking employment, GDP components, and leading indicators
              </p>
            </div>
          </div>
        </motion.section>

        {/* Why I Built This */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 tracking-tight">Why I Built This</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-transparent mb-8" />

          <div className="space-y-6 text-base text-white/70 leading-relaxed max-w-3xl">
            <p>
              As a macro analyst, I wanted access to clean data, keeping it updated, and building a repeatable process.
            </p>
            <p>
              I first prototyped this as a{" "}
              <a
                href="https://globalmacrodashboard.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Streamlit dashboard
              </a>{" "}
              to explore ideas quickly. It worked, but I realized a real workflow needs a time-series database and a
              reliable visualization layer.
            </p>
            <p>
              I also tried building parts of this in Excel, but once you scale to many time series, Excel becomes slow
              and fragile (large files, long refresh times, and unstable formulas). So I rebuilt it as a production-lite
              macro data stack: automated ingestion → Postgres → Grafana.
            </p>
          </div>
        </motion.section>

        {/* Architecture Hint */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <div className="p-6 bg-white/[0.02] border border-white/10 rounded-lg">
            <h3 className="text-lg font-semibold text-white/90 mb-4">Architecture</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Python scripts pull series from FRED based on a catalog table, upsert observations into Postgres, refresh
              materialized views, and serve analytics to Grafana. Daily cron job handles automated updates with
              idempotent upserts.
            </p>
            <p className="text-white/60 text-xs">
              Stack: Python • PostgreSQL • Grafana • Docker • FRED API • DigitalOcean
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
