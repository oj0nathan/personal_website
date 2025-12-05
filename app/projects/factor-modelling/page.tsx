"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ExternalLink, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { BackgroundPaths } from "@/components/ui/background-paths"

export default function FactorModellingPage() {
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

  const techStack = ["Python", "pandas", "NumPy", "yfinance", "FRED", "Matplotlib", "Backtesting"]

  const tldrPoints = [
    "Built a rolling OLS macro factor model using 12 US macro indicators (growth, inflation, yield curve, credit, liquidity, USD).",
    "Tested both SPY timing (risk-on vs cash) and sector long/short rotation with trend and volatility overlays.",
    "Found that the model behaves like a defensive, value-tilted allocator: weak at shorting AI bubbles, but good at capital protection and sector rotation.",
    "Produced a full research pipeline: data ingestion → factor engineering → rolling regressions → portfolio construction → performance evaluation.",
  ]

  const demonstratesPoints = [
    "Design and implement an end-to-end systematic macro factor model in Python (pandas, NumPy, Matplotlib).",
    "Use relative sector returns instead of absolute returns to reduce market-direction noise.",
    "Combine macro factors with price-based trend filters and inverse-volatility weighting to stabilise performance.",
    "Critically evaluate regime-dependent models (macro vs AI momentum) and iterate on model design.",
  ]

  const pipelineSteps = [
    "FRED & Yahoo Finance",
    "Monthly macro factors",
    "Lag + standardise",
    "Rolling 84-month OLS",
    "SPY timing & Sector L/S",
    "Backtest & evaluation",
  ]

  const figures = [
    {
      src: "/images/macro-regime-dashboard.png",
      caption:
        "Figure 1: Macro regime dashboard. Standardised growth and inflation (top panel) and financial conditions (bottom panel) over the sample period.",
      alt: "Macro regime dashboard showing z-scores of US growth (IP YoY), inflation (CPI YoY), yield curve (10Y-2Y spread), and real policy rate from 2008 to 2026",
    },
    {
      src: "/images/rolling-beta-heatmap.png",
      caption:
        "Figure 2: Rolling sector betas to the real policy rate. Heatmap showing the time-varying sensitivity of US sectors to the chosen macro factor (here, the real Fed Funds rate). Warmer colours indicate higher positive sensitivity, colder colours indicate more negative sensitivity, illustrating that sector–macro relationships are not static over time.",
      alt: "Rolling sector sensitivity heatmap to REAL_FF showing sectors XLY, XLV, XLU, XLRE, XLP, XLK, XLI, XLF, XLE, XLB from 2022 to 2025",
    },
    {
      src: "/images/backtest-results.png",
      caption:
        "Figure 3: Macro sector long/short strategy versus benchmarks. Top panel shows cumulative returns for the macro sector long/short strategy (V2), an equal-weight sector benchmark, and buy-and-hold SPY. Bottom panel shows corresponding drawdowns. The long/short strategy delivers stronger compounding with shallower drawdowns over the out-of-sample period.",
      alt: "Cumulative returns and drawdowns chart comparing Macro L/S Sectors V2, EW Sectors Benchmark, and SPY Buy & Hold from 2023 to 2025",
    },
  ]

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      <BackgroundPaths />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-indigo-500/[0.05] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
        {/* Back button */}
        <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Projects</span>
          </Link>
        </motion.div>

        <header className="mb-16">
          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 tracking-[-0.02em] leading-[1.1]"
          >
            Macro Factor Model for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
              Sector Rotation & SPY Timing
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-white/60 mb-6 leading-relaxed max-w-3xl"
          >
            End-to-end macro factor model using rolling OLS, sector rotation, and SPY timing to test whether macro data
            can systematically improve equity allocation.
          </motion.p>

          <motion.div
            custom={2.5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/40 mb-6 font-mono"
          >
            <span>OOS: May 2020 – Sep 2025</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>Sector L/S Sharpe 1.15 vs EW 0.62</span>
          </motion.div>

          <motion.div
            custom={2.7}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-sm text-white/30 mb-8"
          >
            Timeline: 2025 · Tools: Python, pandas, NumPy, Matplotlib · Data: FRED, Yahoo Finance
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 mb-8"
          >
            <a
              href="https://johoblogs.medium.com/project-macro-factor-modelling-and-statistical-analysis-3a80bf06f8e7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Read full case study on Medium
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/oj0nathan/macro_factor_model"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-blue-500/50 text-white rounded-lg font-medium transition-colors hover:bg-white/5 text-sm"
            >
              View code on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2"
          >
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full text-white/60"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </header>

        <motion.section custom={5} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">TL;DR</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <ul className="space-y-5">
            {tldrPoints.map((point, index) => (
              <li key={index} className="flex gap-4 text-white/70 text-base md:text-lg leading-relaxed">
                <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section custom={6} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">
            What this project demonstrates
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <ul className="space-y-5">
            {demonstratesPoints.map((point, index) => (
              <li key={index} className="flex gap-4 text-white/70 text-base md:text-lg leading-relaxed">
                <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section custom={6.5} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">Pipeline</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {pipelineSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-2 md:gap-3">
                <span className="px-4 py-2 text-xs md:text-sm text-white/80 font-mono bg-white/5 border border-white/10 rounded-full whitespace-nowrap">
                  {step}
                </span>
                {index < pipelineSteps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section custom={7} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">Key Visuals</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <div className="space-y-12">
            {figures.map((figure, index) => (
              <div key={index} className="max-w-4xl mx-auto">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-white shadow-lg shadow-black/20">
                  <Image src={figure.src || "/placeholder.svg"} alt={figure.alt} fill className="object-contain" />
                </div>
                <p className="mt-4 text-sm text-white/50 leading-relaxed italic text-left">{figure.caption}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section custom={8} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">
            Appendix: Math Foundations
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-10" />

          <div className="space-y-12 text-white/70">
            {/* 1. Returns and Excess Returns */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-white tracking-[-0.01em]">
                1. Returns and Excess Returns
              </h3>
              <p className="text-base leading-relaxed">
                Let P<sub>i,t</sub> be the month-end price of asset i at month t. The simple monthly return is:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                r<sub>i,t</sub> = P<sub>i,t</sub> / P<sub>i,t-1</sub> - 1
              </div>
              <p className="text-base leading-relaxed">
                Let FF<sub>t</sub> denote the Effective Fed Funds rate at month t, expressed in annual percent. The
                monthly risk-free rate is approximated as:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                r<sub>t</sub>
                <sup>rf</sup> = (1 + FF<sub>t</sub>/100)<sup>1/12</sup> - 1
              </div>
              <p className="text-base leading-relaxed">Excess returns (used throughout the model) are:</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                r<sub>i,t</sub>
                <sup>ex</sup> = r<sub>i,t</sub> - r<sub>t</sub>
                <sup>rf</sup>
              </div>
            </div>

            {/* 2. Macro Factor Construction */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-white tracking-[-0.01em]">
                2. Macro Factor Construction
              </h3>
              <p className="text-base leading-relaxed">
                Let x<sub>t</sub> denote a generic monthly macro series (e.g. industrial production, CPI).
              </p>
              <p className="font-medium text-white/90">Year-on-year (YoY) growth:</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                x<sub>t</sub>
                <sup>YoY</sup> = x<sub>t</sub> / x<sub>t-12</sub> - 1
              </div>
              <p className="font-medium text-white/90">Acceleration of growth/inflation (6-month change in YoY):</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                Δ<sub>6</sub>x<sub>t</sub>
                <sup>YoY</sup> = x<sub>t</sub>
                <sup>YoY</sup> - x<sub>t-6</sub>
                <sup>YoY</sup>
              </div>
              <p className="font-medium text-white/90">Unemployment gap (labour market slack):</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                UNRATE_GAP<sub>t</sub> = UNRATE<sub>t</sub> - UNRATĒ<sub>t</sub>
              </div>
              <p className="text-sm text-white/50">
                where UNRATĒ<sub>t</sub> is the 5-year rolling mean.
              </p>
              <p className="font-medium text-white/90 mt-4">Real policy rate:</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                REAL_FF<sub>t</sub> = FEDFUNDS<sub>t</sub> - π<sub>t</sub>
              </div>
              <p className="text-sm text-white/50">
                Positive values indicate a restrictive real policy stance, negative values an accommodative stance.
              </p>
            </div>

            {/* 3. Lag Structure */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-white tracking-[-0.01em]">
                3. Lag Structure and Regression Targets
              </h3>
              <p className="text-base leading-relaxed">
                To avoid look-ahead bias, the model uses macro data from month t-1 to forecast returns in month t. The
                lagged factor vector:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                X̃<sub>t</sub> = X<sub>t-1</sub>
              </div>
              <p className="text-base leading-relaxed">
                Prediction targets include SPY excess return and sector relative excess returns:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                y<sub>j,t</sub> = r<sub>j,t</sub>
                <sup>ex</sup> - r<sub>SPY,t</sub>
                <sup>ex</sup>
              </div>
            </div>

            {/* 4. Rolling OLS Model */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-white tracking-[-0.01em]">4. Rolling OLS Model</h3>
              <p className="text-base leading-relaxed">
                Within each rolling 84-month window, the macro factors are standardised to have zero mean and unit
                variance. For a given window ending at month t-1:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                Z<sub>τ</sub> = S<sub>t</sub>
                <sup>-1</sup>(X̃<sub>τ</sub> - X̄<sub>t</sub>), τ ∈ W<sub>t</sub>
              </div>
              <p className="text-base leading-relaxed">For each asset i, a linear model is estimated:</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                y<sub>i,τ</sub> = α<sub>i</sub> + β<sub>i</sub>
                <sup>⊤</sup>Z<sub>τ</sub> + ε<sub>i,τ</sub>
              </div>
              <p className="text-base leading-relaxed">The OLS estimate:</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                θ̂<sub>i</sub>(t) = (X<sup>⊤</sup>X)<sup>-1</sup>X<sup>⊤</sup>y<sub>i</sub>
              </div>
            </div>

            {/* 5. SPY Timing Rule */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-white tracking-[-0.01em]">5. SPY Timing Rule</h3>
              <p className="text-base leading-relaxed">
                The SPY timing strategy uses only the forecast for SPY&apos;s excess return. Define a binary exposure
                signal:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                s<sub>t</sub>
                <sup>SPY</sup> = 1 if r̂<sub>SPY,t</sub>
                <sup>ex</sup> {">"} 0, else 0
              </div>
              <p className="text-base leading-relaxed">The realised portfolio excess return is:</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                r<sub>t</sub>
                <sup>timing</sup> = s<sub>t</sub>
                <sup>SPY</sup> · r<sub>SPY,t</sub>
                <sup>ex</sup>
              </div>
            </div>

            {/* 6. Sector Long/Short Portfolio */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-white tracking-[-0.01em]">
                6. Sector Long/Short Portfolio
              </h3>
              <p className="font-medium text-white/90">Ranking by Predicted Relative Performance:</p>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-2">
                <li>
                  Rank sectors by ŷ<sub>j,t</sub> from highest to lowest
                </li>
                <li>
                  Define the long set L<sub>t</sub> as the top N sectors (e.g. N=3)
                </li>
                <li>
                  Define the short-candidate set S<sub>t</sub> as the bottom N sectors
                </li>
              </ul>
              <p className="font-medium text-white/90 mt-4">Trend Filter:</p>
              <p className="text-base leading-relaxed">A sector is eligible for shorting only if:</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                P<sub>j,t</sub> {"<"} MA<sub>j,t</sub>(10)
              </div>
              <p className="font-medium text-white/90 mt-4">Inverse-Volatility Weights:</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                w<sub>j,t</sub>(A) = (1/σ<sub>j,t</sub>) / Σ<sub>k∈A</sub>(1/σ<sub>k,t</sub>)
              </div>
              <p className="font-medium text-white/90 mt-4">Long/Short Return:</p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                r<sub>t</sub>
                <sup>LS</sup> = Σ
                <sub>
                  j∈L<sub>t</sub>
                </sub>{" "}
                w<sub>j,t</sub>
                <sup>L</sup> r<sub>j,t</sub>
                <sup>ex</sup> - Σ
                <sub>
                  j∈S&apos;<sub>t</sub>
                </sub>{" "}
                w<sub>j,t</sub>
                <sup>S</sup> r<sub>j,t</sub>
                <sup>ex</sup>
              </div>
            </div>

            {/* 7. Performance Statistics */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-white tracking-[-0.01em]">
                7. Performance Statistics
              </h3>
              <p className="text-base leading-relaxed">
                Given a monthly return series {"{"}r<sub>t</sub>
                {"}"} (already expressed in excess-return terms):
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-white/90 mb-2">Cumulative wealth:</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                    W<sub>T</sub> = Π<sub>t=1</sub>
                    <sup>T</sup>(1 + r<sub>t</sub>)
                  </div>
                </div>
                <div>
                  <p className="font-medium text-white/90 mb-2">CAGR:</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                    CAGR = W<sub>T</sub>
                    <sup>12/T</sup> - 1
                  </div>
                </div>
                <div>
                  <p className="font-medium text-white/90 mb-2">Annualised volatility:</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                    AnnVol = σ<sub>m</sub> · √12
                  </div>
                </div>
                <div>
                  <p className="font-medium text-white/90 mb-2">Sharpe ratio:</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                    Sharpe = (μ<sub>m</sub> / σ<sub>m</sub>) · √12
                  </div>
                </div>
                <div>
                  <p className="font-medium text-white/90 mb-2">Maximum drawdown:</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm md:text-base overflow-x-auto shadow-sm">
                    MaxDD = min<sub>1≤t≤T</sub> DD<sub>t</sub>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Bottom CTAs */}
        <motion.section
          custom={9}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="pt-10 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://johoblogs.medium.com/project-macro-factor-modelling-and-statistical-analysis-3a80bf06f8e7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Read the full case study on Medium
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/oj0nathan/macro_factor_model"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Browse the code on GitHub
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.section>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </main>
  )
}
