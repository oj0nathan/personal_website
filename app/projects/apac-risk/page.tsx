"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Github, ArrowRight, Play, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ApacRiskPage() {
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

  const pipelineSteps = [
    "Data Loader",
    "Risk Engine",
    "Rolling Ridge",
    "Factor Betas",
    "Variance Decomp",
    "Dashboard UI",
  ]

  const figures = [
    {
      src: "/images/apac-portfolio-sensitivities.png",
      alt: "Portfolio risk factor sensitivities heatmap",
      caption: "Figure 1: Portfolio risk sensitivities across market factors showing asset-specific exposures.",
    },
    {
      src: "/images/apac-risk-decomposition.png",
      alt: "Risk variance decomposition donut chart",
      caption: "Figure 2: Variance decomposition showing 97% idiosyncratic vs 3% systematic risk.",
    },
    {
      src: "/images/apac-correlation-matrix.png",
      alt: "Factor correlation matrix heatmap",
      caption: "Figure 3: Correlation structure between APAC risk factors revealing diversification opportunities.",
    },
  ]

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-indigo-500/[0.05] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
        {/* Back button */}
        <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.header custom={1} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-12">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight leading-[1.1]">
            Global Multi-Asset{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
              Risk Dashboard
            </span>
          </h1>

          {/* Headline Metrics */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-white/50">Architecture:</span>{" "}
              <span className="text-white/90 font-medium">Data → Engine → View</span>
            </div>
            <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-white/50">Method:</span>{" "}
              <span className="text-white/90 font-medium">Ridge Regression</span>
            </div>
            <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
              <span className="text-white/50">Coverage:</span>{" "}
              <span className="text-white/90 font-medium">Multi-Asset Global</span>
            </div>
          </div>

          {/* Project Metadata */}
          <p className="text-white/40 text-sm mb-8">
            Built with Python • pandas • numpy • scikit-learn • Streamlit • Plotly
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="https://johoblogs.medium.com/stop-predicting-start-measuring-risk-02588f78221d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
            >
              Read Article
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/oj0nathan/global_risk_dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white/80 font-medium rounded-lg border border-white/10 transition-colors"
            >
              View Code
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://globalriskdashboard-6ayjee9rkarokethyhdwsz.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
            >
              Live Dashboard
              <Play className="w-4 h-4" />
            </a>
          </div>
        </motion.header>

        {/* TL;DR */}
        <motion.section custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">TL;DR</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <ul className="space-y-3 text-white/70 leading-relaxed">
            <li className="flex gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                <strong className="text-white/90">Built a Python-based risk engine</strong> that ingests market data and
                fits rolling regression models to decompose portfolio returns into systematic factor exposures.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                <strong className="text-white/90">Designed a "Trader's View" dashboard</strong> using Streamlit and
                Plotly to visualize real-time factor betas and stress test scenarios.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                <strong className="text-white/90">Implemented robust statistical methods</strong> including Ridge
                Regression (to handle multicollinearity) and Timezone Synchronization (lagging US factors for Asian
                markets).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                <strong className="text-white/90">Separated concerns</strong> with a clean architecture: Data Ingestion
                → Math Engine → Visualization Layer.
              </span>
            </li>
          </ul>
        </motion.section>

        {/* What this demonstrates */}
        <motion.section custom={4} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">
            What this project demonstrates
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <ul className="space-y-3 text-white/70 leading-relaxed">
            <li className="flex gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                <strong className="text-white/90">End-to-End System Design:</strong> Architecting a production-lite
                application that separates the calculation core (risk_engine.py) from the user interface (main.py).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                <strong className="text-white/90">Advanced Data Wrangling:</strong> Handling complex time-series issues,
                specifically aligning US-trading macro factors (like VIX) with Asian-trading assets (like Samsung or
                Toyota) to prevent look-ahead bias.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                <strong className="text-white/90">Statistical Modeling:</strong> Using Ridge Regression (L2
                Regularization) to stabilize beta estimates in highly correlated market regimes.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>
                <strong className="text-white/90">Scenario Analysis:</strong> Moving beyond simple linear shocks by
                implementing "Coherent Stress Testing"—using historical data to model how factors actually move together
                during stress events.
              </span>
            </li>
          </ul>
        </motion.section>

        {/* Pipeline */}
        <motion.section custom={5} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">Pipeline</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <p className="text-white/60 leading-relaxed mb-6">
            The system follows a strict "Data → Engine → View" data flow to ensure modularity and scalability.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm mb-8">
            {pipelineSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70">{step}</span>
                {index < pipelineSteps.length - 1 && <ArrowRight className="w-4 h-4 text-white/30" />}
              </div>
            ))}
          </div>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <div>
              <strong className="text-white/80">Data Loader (src/data_loader.py):</strong> Fetches raw OHLCV data via
              yfinance and handles initial cleaning.
            </div>
            <div>
              <strong className="text-white/80">Risk Engine (src/risk_engine.py):</strong> The mathematical core. It
              infers asset regions, lags US factors for APAC stocks, and fits rolling Ridge models.
            </div>
            <div>
              <strong className="text-white/80">Visualization (src/charts.py):</strong> Plotly wrappers that generate
              the standardized financial plots used in the frontend.
            </div>
          </div>
        </motion.section>

        {/* Key Visuals */}
        <motion.section custom={6} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">Key Visuals</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <div className="space-y-12">
            {figures.map((figure, index) => (
              <div key={index} className="mx-auto max-w-4xl">
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white/5">
                  <Image
                    src={figure.src || "/placeholder.svg"}
                    alt={figure.alt}
                    width={1200}
                    height={600}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
                <p className="text-white/50 text-sm mt-4 text-left italic">{figure.caption}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Appendix */}
        <motion.section custom={7} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">
            Appendix: Math Foundations
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />

          <div className="space-y-12">
            {/* Factor Risk Decomposition */}
            <div>
              <h3 className="text-xl font-serif text-white/90 mb-4">1. Factor Risk Decomposition (Ridge Regression)</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                To understand where risk comes from, we decompose portfolio returns (R<sub>p</sub>) into exposures to
                common risk factors (F). Standard OLS regression often fails in finance due to Multicollinearity (e.g.,
                Interest Rates and Equities moving together).
              </p>
              <p className="text-white/60 leading-relaxed mb-4">
                We use Ridge Regression (L2 Regularization), which adds a penalty term λ to minimize overfitting and
                stabilize the "jumpiness" of betas:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 overflow-x-auto shadow-sm font-mono text-sm md:text-base">
                β̂<sub>Ridge</sub> = argmin<sub>β</sub> (Σ<sub>t=1</sub>
                <sup>T</sup> (R<sub>p,t</sub> - X<sub>t</sub>β)<sup>2</sup> + λ Σ<sub>j=1</sub>
                <sup>p</sup> β<sub>j</sub>
                <sup>2</sup>)
              </div>
              <p className="text-white/60 leading-relaxed">
                <strong className="text-white/80">Result:</strong> Stable risk attributions that separate true signal
                from market noise.
              </p>
            </div>

            {/* Timezone Synchronization */}
            <div>
              <h3 className="text-xl font-serif text-white/90 mb-4">2. Timezone Synchronization</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                A naive model compares "Today's Nikkei Close" (happens at 3 PM Tokyo) with "Today's S&P 500 Close"
                (happens 14 hours later). This creates Look-Ahead Bias.
              </p>
              <p className="text-white/60 leading-relaxed mb-4">
                Our engine strictly enforces lag logic based on the asset's region:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 overflow-x-auto shadow-sm font-mono text-sm md:text-base">
                X
                <sub>
                  US, t<sub>adjusted</sub>
                </sub>{" "}
                = X<sub>US, t-1</sub> if Asset Region ∈ {"{JP, KR, CN, HK}"}
              </div>
            </div>

            {/* Coherent Scenario Generation */}
            <div>
              <h3 className="text-xl font-serif text-white/90 mb-4">3. Coherent Scenario Generation</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                Instead of guessing how factors move, we use history. To simulate a "20% VIX Spike":
              </p>
              <ol className="text-white/60 leading-relaxed space-y-3 ml-6 mb-4">
                <li>1. Identify historical days where VIX was in the top 98th percentile.</li>
                <li>2. Calculate the average move of all other factors (Rates, Oil, USD) on those specific days.</li>
                <li>3. Scale those moves proportionally to match the target shock size.</li>
              </ol>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 overflow-x-auto shadow-sm font-mono text-sm md:text-base">
                Move
                <sub>
                  Factor<sub>i</sub>
                </sub>{" "}
                = R̄
                <sub>
                  Factor<sub>i</sub>, StressDays
                </sub>{" "}
                × (Target Shock / R̄
                <sub>VIX, StressDays</sub>)
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer Links */}
        <motion.section custom={8} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
            <Button
              asChild
              size="lg"
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
            >
              <a
                href="https://johoblogs.medium.com/stop-predicting-start-measuring-risk-02588f78221d"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Read Article
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <a href="https://github.com/oj0nathan/global_risk_dashboard" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View Code
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30"
            >
              <a
                href="https://globalriskdashboard-6ayjee9rkarokethyhdwsz.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="w-4 h-4 mr-2" />
                Explore Dashboard
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </motion.section>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </main>
  )
}
