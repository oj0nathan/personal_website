"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface AnimatedHighlightProps {
  children: ReactNode
  color?: "blue" | "orange" | "green" | "cyan"
  delay?: number
  className?: string
}

export function AnimatedHighlight({ children, color = "blue", delay = 0, className = "" }: AnimatedHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const colorStyles = {
    blue: {
      text: "text-blue-400",
      underline: "bg-blue-400",
    },
    orange: {
      text: "text-orange-400",
      underline: "bg-orange-400",
    },
    green: {
      text: "text-green-400",
      underline: "bg-green-400",
    },
    cyan: {
      text: "text-cyan-400",
      underline: "bg-cyan-400",
    },
  }

  const styles = colorStyles[color]

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay }}
      className={`relative inline ${className}`}
    >
      <span className={`${styles.text} font-medium`}>{children}</span>
      {/* Hand-drawn style underline with slight wave */}
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.3, ease: "easeOut" }}
        className={`absolute -bottom-0.5 left-0 h-[3px] w-full origin-left ${styles.underline} rounded-full`}
        style={{
          clipPath:
            "polygon(0% 60%, 2% 40%, 5% 70%, 10% 30%, 15% 60%, 20% 40%, 25% 55%, 30% 35%, 35% 65%, 40% 45%, 45% 55%, 50% 40%, 55% 60%, 60% 35%, 65% 55%, 70% 45%, 75% 60%, 80% 40%, 85% 55%, 90% 35%, 95% 60%, 100% 50%, 100% 100%, 0% 100%)",
        }}
      />
    </motion.span>
  )
}

interface AnimatedBoxHighlightProps {
  children: ReactNode
  color?: "red" | "blue" | "orange" | "green" | "cyan"
  delay?: number
  className?: string
}

export function AnimatedBoxHighlight({
  children,
  color = "red",
  delay = 0,
  className = "",
}: AnimatedBoxHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const colorStyles = {
    red: {
      text: "text-red-400",
      stroke: "#f87171",
    },
    blue: {
      text: "text-blue-400",
      stroke: "#60a5fa",
    },
    orange: {
      text: "text-orange-400",
      stroke: "#fb923c",
    },
    green: {
      text: "text-green-400",
      stroke: "#4ade80",
    },
    cyan: {
      text: "text-cyan-400",
      stroke: "#22d3ee",
    },
  }

  const styles = colorStyles[color]

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      className={`relative inline-block ${className}`}
    >
      <span className={`${styles.text} font-medium relative z-10 px-1`}>{children}</span>
      {/* Hand-drawn box SVG */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 2,8 
             C 5,3 15,5 25,4 
             C 40,2 60,6 75,3 
             C 85,2 95,5 98,10
             C 100,20 97,40 99,60
             C 100,75 97,85 96,92
             C 90,97 75,95 60,97
             C 40,99 25,96 10,98
             C 3,97 1,90 2,75
             C 1,55 3,35 2,15
             C 1,10 2,8 2,8"
          fill="none"
          stroke={styles.stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: 0.8, delay: delay + 0.2, ease: "easeInOut" },
            opacity: { duration: 0.2, delay: delay + 0.2 },
          }}
          style={{
            filter: "url(#roughness)",
          }}
        />
        <defs>
          <filter id="roughness">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </motion.span>
  )
}

// Keep this for potential future use but won't use it in About page
interface AnimatedBackgroundHighlightProps {
  children: ReactNode
  color?: "blue" | "orange" | "green" | "cyan"
  delay?: number
  className?: string
}

export function AnimatedBackgroundHighlight({
  children,
  color = "green",
  delay = 0,
  className = "",
}: AnimatedBackgroundHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const colorStyles = {
    blue: {
      text: "text-white",
      bg: "bg-blue-600",
    },
    orange: {
      text: "text-white",
      bg: "bg-orange-600",
    },
    green: {
      text: "text-white",
      bg: "bg-green-600",
    },
    cyan: {
      text: "text-white",
      bg: "bg-cyan-600",
    },
  }

  const styles = colorStyles[color]

  return (
    <span ref={ref} className={`relative inline ${className}`}>
      <motion.span
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ duration: 0.5, delay }}
        className={`absolute inset-0 ${styles.bg} rounded-sm`}
      />
      <span className={`relative ${styles.text} font-medium px-1`}>{children}</span>
    </span>
  )
}
