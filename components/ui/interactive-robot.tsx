"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface InteractiveRobotProps {
  className?: string
}

export function InteractiveRobot({ className }: InteractiveRobotProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById("robot-container")?.getBoundingClientRect()
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        setMousePosition({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      id="robot-container"
      className={`relative cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 500)
      }}
    >
      <motion.div
        className="relative w-24 h-28"
        animate={{
          scale: isClicked ? 1.1 : isHovered ? 1.05 : 1,
          rotate: isClicked ? [0, -5, 5, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Antenna */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -top-3 w-1 h-4 bg-gradient-to-t from-blue-400 to-blue-300 rounded-full"
          animate={{ scaleY: isHovered ? 1.2 : 1 }}
        >
          <motion.div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full"
            animate={{
              boxShadow: isHovered ? "0 0 12px 4px rgba(59, 130, 246, 0.6)" : "0 0 6px 2px rgba(59, 130, 246, 0.3)",
            }}
          />
        </motion.div>

        {/* Head */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-16 bg-gradient-to-b from-slate-600 to-slate-700 rounded-2xl border-2 border-slate-500 overflow-hidden"
          style={{
            transform: `translateX(-50%) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`,
          }}
        >
          {/* Face screen */}
          <div className="absolute inset-2 bg-slate-900 rounded-lg flex items-center justify-center gap-3">
            {/* Left eye */}
            <motion.div
              className="relative w-4 h-4 bg-blue-400 rounded-full"
              animate={{
                x: mousePosition.x * 3,
                y: mousePosition.y * 3,
                scale: isClicked ? 1.3 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
            </motion.div>

            {/* Right eye */}
            <motion.div
              className="relative w-4 h-4 bg-blue-400 rounded-full"
              animate={{
                x: mousePosition.x * 3,
                y: mousePosition.y * 3,
                scale: isClicked ? 1.3 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
            </motion.div>
          </div>

          {/* Mouth */}
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 bg-blue-400 rounded-full"
            animate={{
              width: isClicked ? 12 : isHovered ? 8 : 6,
              height: isClicked ? 4 : 2,
              borderRadius: isClicked ? "9999px" : "9999px",
            }}
          />
        </motion.div>

        {/* Body */}
        <motion.div
          className="absolute top-14 left-1/2 -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-slate-600 to-slate-700 rounded-xl border-2 border-slate-500"
          animate={{ y: isHovered ? -2 : 0 }}
        >
          {/* Chest light */}
          <motion.div
            className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-800 rounded-lg flex items-center justify-center"
            animate={{
              boxShadow: isClicked ? "inset 0 0 10px rgba(59, 130, 246, 0.8)" : "inset 0 0 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            <motion.div
              className="w-3 h-3 rounded-full"
              animate={{
                backgroundColor: isClicked ? "#60a5fa" : isHovered ? "#3b82f6" : "#1e40af",
                boxShadow: isClicked
                  ? "0 0 12px 4px rgba(96, 165, 250, 0.8)"
                  : isHovered
                    ? "0 0 8px 2px rgba(59, 130, 246, 0.5)"
                    : "0 0 4px 1px rgba(30, 64, 175, 0.3)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Left arm */}
        <motion.div
          className="absolute top-16 -left-1 w-3 h-8 bg-gradient-to-b from-slate-600 to-slate-700 rounded-full border border-slate-500"
          animate={{
            rotate: isHovered ? -15 : 0,
            y: isClicked ? -3 : 0,
          }}
          style={{ transformOrigin: "top center" }}
        />

        {/* Right arm */}
        <motion.div
          className="absolute top-16 -right-1 w-3 h-8 bg-gradient-to-b from-slate-600 to-slate-700 rounded-full border border-slate-500"
          animate={{
            rotate: isHovered ? 15 : 0,
            y: isClicked ? -3 : 0,
          }}
          style={{ transformOrigin: "top center" }}
        />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 -z-10 blur-xl rounded-full"
        animate={{
          opacity: isHovered ? 0.4 : 0.2,
          scale: isClicked ? 1.3 : 1,
          backgroundColor: isClicked ? "rgba(96, 165, 250, 0.5)" : "rgba(59, 130, 246, 0.3)",
        }}
      />
    </div>
  )
}
