"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ExternalLink, ChevronRight, Play } from "lucide-react"
import { motion } from "framer-motion"
import { BackgroundPaths } from "@/components/ui/background-paths"

export default function RiskConditionedPage() {
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

  const techStack = ["Python", "pandas", "NumPy", "yfinance", "Backtesting", "EWMA Volatility", "VaR", "Streamlit"]

  const tldrPoints = [
    "Built two simple cross-asset trading sleeves on a 5-ETF universe (SPY, TLT, GLD, USO, UUP): a **Trend sleeve** (long when price > 100-day SMA) and a **Mean-reversion sleeve** (Bollinger-band rule buying dips below −2σ, selling rallies above +2σ).",
    "Constructed a **risk-state engine** on the equal-weighted market return using EWMA volatility to detect high-risk regimes, 20-day rolling autocorrelation to distinguish trend, mean-reversion and noise, and parametric 1-day 95% VaR and 5-day drawdown to cap tail risk.",
    "Allocated capital between Trend, Mean Reversion and Cash via a **signal-to-noise playbook**: High vol & positive autocorr → fund Trend; High vol & negative autocorr → fund Mean Reversion; High vol & low autocorr → cut risk to Cash; Low vol → 50/50 diversified mix.",
    "Applied **volatility targeting, VaR scaling and a drawdown breaker** on top: each sleeve targets 10% annualised vol, portfolio VaR capped at 2% of equity, and if 5-day drawdown breaches −3%, all risk is cut in half until the book stabilises.",
    "The allocator sacrifices some long-run CAGR versus fully invested SPY, but **decapitates crash risk**: drawdowns capped around −15% and worst 5-day loss only −3.6%. With the same underlying alpha rules, intelligent risk budgeting delivers a smoother, more leverage-able return stream.",
  ]

  const demonstratesPoints = [
    "Building a risk-state engine on top of simple signals. Uses only daily prices, yet recovers a rich risk taxonomy (trend, mean-reversion, noise, high vs low vol) through EWMA volatility and rolling autocorrelation, then turns those diagnostics into capital-allocation decisions.",
    "Separating alpha from risk management. The trading rules are deliberately plain-vanilla (100-day SMA trend, 20-day Bollinger mean reversion). Any performance difference between the naïve 50/50 blend and the allocator comes from risk budgeting, not more complex signals.",
    "Daily-frequency risk management similar to a real desk. All overlays (vol targeting, VaR cap, drawdown breaker) operate at daily frequency, mirroring how risk is actually monitored in a systematic macro book even when underlying alpha moves slowly.",
    "Combining multiple overlays: volatility, VaR, drawdown and cash. Shows how to layer volatility targeting on each sleeve, a VaR budget on the aggregate book, and a short-horizon drawdown breaker, while treating unallocated capital as a yield-bearing asset.",
    "Framing results in portfolio terms, not just strategy PnL. Compares full distributions (vol, Sharpe, Sortino, worst 5-day loss, drawdowns) rather than just CAGRs, and explains why the allocator's lower risk profile could be attractive when levered inside a larger portfolio.",
  ]

  const pipelineSteps = [
    "Yahoo Finance (daily)",
    "Log returns & EW market",
    "Trend & MR signals",
    "Risk diagnostics",
    "Signal-to-noise allocator",
    "Vol target + VaR + DD breaker",
    "Portfolio evaluation",
  ]

  const figures = [
    {
      src: "/images/risk-market-state.png",
      caption: "Market risk state showing EWMA volatility and 20-day rolling autocorrelation from 2008-2025.",
      alt: "Market Risk State chart with volatility and autocorrelation",
    },
    {
      src: "/images/risk-allocation-weights.png",
      caption: "Dynamic allocation weights between Cash, Mean Reversion, and Trend sleeves over time.",
      alt: "Dynamic Allocation Weights stacked area chart",
    },
    {
      src: "/images/risk-var-monitor.png",
      caption: "VaR usage monitor showing estimated VaR against the 2% limit threshold.",
      alt: "VaR Usage Monitor chart",
    },
    {
      src: "/images/risk-equity-curves.png",
      caption: "Equity curves comparing SPY, 50/50 Fixed, and Risk-Managed Allocator with drawdown analysis.",
      alt: "Equity Curves comparison chart with drawdowns",
    },
  ]

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      <BackgroundPaths />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:px-8 md:py-16">
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

        {/* Header */}
        <header className="mb-16">
          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 tracking-[-0.02em] leading-[1.1]"
          >
            Risk-Conditioned Macro Allocation for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
              Trend & Mean Reversion
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-white/60 mb-6 leading-relaxed max-w-3xl"
          >
            A dynamic allocator that routes capital between Trend, Mean Reversion and Cash sleeves based on real-time
            volatility and autocorrelation signals, with VaR and drawdown overlays to cap tail risk.
          </motion.p>

          {/* Headline metrics */}
          <motion.div
            custom={2.5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/40 mb-6 font-mono"
          >
            <span>OOS: 2007 – 2025</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>Max DD −15% vs SPY −55%</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>Sharpe 0.45</span>
          </motion.div>

          <motion.div
            custom={2.7}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-sm text-white/30 mb-8"
          >
            Timeline: 2025 · Tools: Python, pandas, NumPy, yfinance · Data: Yahoo Finance
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 mb-10"
          >
            <a
              href="https://medium.com/@johoblogs/project-risk-conditioned-macro-allocation-for-trend-and-mean-reversion-strategies-b1b36915bad3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Read Article
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/oj0nathan/risk-conditioned-allocator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white/80 font-medium rounded-lg border border-white/10 transition-colors"
            >
              View Code
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://risk-conditioned-allocator-c9murg2wfvkq2scygzy9jg.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
            >
              Live Dashboard
              <Play className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Tech stack */}
          <motion.div custom={4} variants={fadeUpVariants} initial="hidden" animate="visible">
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-mono text-white/60 bg-white/5 border border-white/10 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </header>

        {/* Performance Comparison Table */}
        <motion.section custom={5} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">Performance Snapshot</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/50 font-medium">Metric</th>
                  <th className="text-right py-3 px-4 text-white/50 font-medium">Buy & Hold SPY</th>
                  <th className="text-right py-3 px-4 text-white/50 font-medium">Fixed 50/50</th>
                  <th className="text-right py-3 px-4 text-emerald-400/80 font-medium">Risk-Managed</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">CAGR</td>
                  <td className="text-right py-3 px-4">9.8%</td>
                  <td className="text-right py-3 px-4">2.0%</td>
                  <td className="text-right py-3 px-4 text-emerald-400">4.1%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">Volatility</td>
                  <td className="text-right py-3 px-4">19.5%</td>
                  <td className="text-right py-3 px-4">3.9%</td>
                  <td className="text-right py-3 px-4 text-emerald-400">9.1%</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">Sharpe</td>
                  <td className="text-right py-3 px-4">0.35</td>
                  <td className="text-right py-3 px-4">−0.26</td>
                  <td className="text-right py-3 px-4 text-emerald-400">0.12</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">Max Drawdown</td>
                  <td className="text-right py-3 px-4">−55.2%</td>
                  <td className="text-right py-3 px-4">−10.9%</td>
                  <td className="text-right py-3 px-4 text-emerald-400">−15.4%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Worst 5-day Loss</td>
                  <td className="text-right py-3 px-4">−18.3%</td>
                  <td className="text-right py-3 px-4">−3.3%</td>
                  <td className="text-right py-3 px-4 text-emerald-400">−3.6%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* TL;DR */}
        <motion.section custom={5.5} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">TL;DR</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <ul className="space-y-4">
            {tldrPoints.map((point, index) => (
              <li key={index} className="flex gap-3 text-white/60 leading-relaxed">
                <span className="text-blue-400 mt-1.5">
                  <ChevronRight className="w-4 h-4" />
                </span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90">$1</strong>'),
                  }}
                />
              </li>
            ))}
          </ul>
        </motion.section>

        {/* What this demonstrates */}
        <motion.section custom={6} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">What this demonstrates</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <ul className="space-y-4">
            {demonstratesPoints.map((point, index) => (
              <li key={index} className="flex gap-3 text-white/60 leading-relaxed">
                <span className="text-emerald-400 mt-1.5">
                  <ChevronRight className="w-4 h-4" />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Pipeline */}
        <motion.section custom={7} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">Pipeline</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {pipelineSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70">{step}</span>
                {index < pipelineSteps.length - 1 && <ArrowRight className="w-4 h-4 text-white/30" />}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Key Visuals */}
        <motion.section custom={8} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">Key Visuals</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />
          <div className="space-y-10">
            {figures.map((figure, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full max-w-4xl bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={figure.src || "/placeholder.svg"}
                    alt={figure.alt}
                    width={700}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <p className="mt-4 text-sm text-white/50 italic max-w-3xl text-left">{figure.caption}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Appendix */}
        <motion.section custom={9} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-[-0.01em]">
            Appendix: How the Risk Engine Works
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent mb-8" />

          <div className="space-y-12">
            {/* Returns and Market Proxy */}
            <div>
              <h3 className="text-xl font-serif text-white/90 mb-4">Returns and Market Proxy</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                All returns are computed from daily adjusted close prices:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 overflow-x-auto shadow-sm font-mono text-sm md:text-base">
                r<sub>t</sub> = ln(P<sub>t</sub> / P<sub>t-1</sub>)
              </div>
              <p className="text-white/60 leading-relaxed">
                The "market" return is the simple equal-weighted average across the five ETFs (SPY, TLT, GLD, USO, UUP).
                This series is used to define the global risk state (volatility and autocorrelation) that drives
                allocation between sleeves.
              </p>
            </div>

            {/* EWMA Volatility */}
            <div>
              <h3 className="text-xl font-serif text-white/90 mb-4">EWMA Volatility</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                To track time-varying risk, we estimate an Exponentially Weighted Moving Average (EWMA) variance:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 overflow-x-auto shadow-sm font-mono text-sm md:text-base">
                σ<sup>2</sup>
                <sub>t</sub> = λ · σ<sup>2</sup>
                <sub>t-1</sub> + (1-λ) · r<sup>2</sup>
                <sub>t-1</sub>
              </div>
              <p className="text-white/60 leading-relaxed mb-4">
                with λ = 0.94 (similar to RiskMetrics). Recent returns receive more weight than distant history. Vol
                spikes quickly in crises and decays gradually as markets calm. A high-vol threshold is set at the 75th
                percentile of historical EWMA vol.
              </p>
            </div>

            {/* Rolling Autocorrelation */}
            <div>
              <h3 className="text-xl font-serif text-white/90 mb-4">Rolling Autocorrelation (Signal vs Noise)</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                Volatility tells you <em>how much</em> markets move, not <em>how usable</em> that movement is. To detect
                structure vs noise, we compute a rolling lag-1 autocorrelation over a 20-day window:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 overflow-x-auto shadow-sm font-mono text-sm md:text-base">
                ρ<sub>t</sub> = corr(r<sub>t-19:t</sub>
                <sup>mkt</sup>, r<sub>t-20:t-1</sub>
                <sup>mkt</sup>)
              </div>
              <ul className="text-white/60 leading-relaxed space-y-2 ml-4">
                <li>
                  • <strong className="text-white/80">ρ {">"} 0.10:</strong> Trend state – returns are positively
                  autocorrelated
                </li>
                <li>
                  • <strong className="text-white/80">ρ {"<"} −0.10:</strong> Mean-reversion state – returns are
                  negatively autocorrelated
                </li>
                <li>
                  • <strong className="text-white/80">|ρ| ≤ 0.10:</strong> Noise state – near random-walk
                </li>
              </ul>
            </div>

            {/* Parametric VaR */}
            <div>
              <h3 className="text-xl font-serif text-white/90 mb-4">Parametric VaR</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                To enforce a hard risk budget, the framework monitors parametric 1-day 95% Value-at-Risk (VaR):
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 overflow-x-auto shadow-sm font-mono text-sm md:text-base">
                VaR<sub>t</sub>
                <sup>95%</sup> = z<sub>0.95</sub> · σ<sub>t</sub>
              </div>
              <p className="text-white/60 leading-relaxed">
                A VaR limit of 2% of equity is enforced. If VaR exceeds this, all risky positions are scaled down
                proportionally. This behaves like a risk-budgeting overlay: the more volatile the book becomes, the
                smaller the gross exposures allowed.
              </p>
            </div>

            {/* Drawdown Breaker */}
            <div>
              <h3 className="text-xl font-serif text-white/90 mb-4">Drawdown Breaker</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                VaR is forward-looking but model-dependent. To capture realised pain, we add a short-horizon drawdown
                breaker. If the 5-day drawdown breaches −3%, all exposures are halved until the book stabilises. This
                mimics a risk manager forcing the desk to cut risk when losses accelerate.
              </p>
            </div>

            {/* Putting It Together */}
            <div>
              <h3 className="text-xl font-serif text-white/90 mb-4">Putting It Together</h3>
              <p className="text-white/60 leading-relaxed mb-4">On each day:</p>
              <ol className="text-white/60 leading-relaxed space-y-2 ml-4 list-decimal list-inside">
                <li>Determine risk state from EWMA vol and rolling autocorr (trend / MR / noise, high vs low vol)</li>
                <li>Set allocation weights via the signal-to-noise playbook</li>
                <li>Apply sleeve-level vol targeting to get trend and MR scaling</li>
                <li>Compute pre-overlay portfolio return from scaled sleeves</li>
                <li>Apply VaR scaling and drawdown scaling</li>
                <li>Route residual capital to cash, earning 3% risk-free rate</li>
              </ol>
              <p className="text-white/60 leading-relaxed mt-4">
                The result is a portfolio that can <strong className="text-white/80">turn risk off</strong> when the
                tape is noisy or stressed,
                <strong className="text-white/80"> lean into trend or mean reversion</strong> when those structures are
                strong, and <strong className="text-white/80">respect explicit risk budgets</strong> at all times.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Footer links */}
        <motion.section
          custom={10}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Link>
            <div className="flex items-center gap-4">
              <a
                href="https://medium.com/@johoblogs/project-risk-conditioned-macro-allocation-for-trend-and-mean-reversion-strategies-b1b36915bad3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors"
              >
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/oj0nathan/risk-conditioned-allocator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors"
              >
                <span>View Code</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://risk-conditioned-allocator-c9murg2wfvkq2scygzy9jg.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400/70 hover:text-emerald-400 transition-colors"
              >
                <span>Live Dashboard</span>
                <Play className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </main>
  )
}
