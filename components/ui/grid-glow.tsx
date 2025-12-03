"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GridGlowProps {
  className?: string
}

export function GridGlow({ className }: GridGlowProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated glow spots */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-blue-500/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ top: "20%", left: "10%" }}
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-indigo-500/20 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{ bottom: "20%", right: "15%" }}
      />
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-cyan-500/15 blur-2xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{ top: "50%", right: "30%" }}
      />
    </div>
  )
}
