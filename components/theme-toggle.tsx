"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, useMotionValue, type PanInfo } from "framer-motion"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)

  // For drag functionality
  const y = useMotionValue(0)
  const dotCount = 10
  const dotSpacing = 14
  const maxDrag = (dotCount - 1) * dotSpacing

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme")
    if (saved === "light") {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
      y.set(maxDrag)
    } else {
      setIsDark(true)
      document.documentElement.classList.add("dark")
      y.set(0)
    }
  }, [])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = maxDrag / 2
    const currentY = y.get()

    if (currentY > threshold) {
      // Switch to light mode
      y.set(maxDrag)
      if (isDark) {
        setIsDark(false)
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
    } else {
      // Switch to dark mode
      y.set(0)
      if (!isDark) {
        setIsDark(true)
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      }
    }
  }

  const handleClick = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      y.set(0)
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      y.set(maxDrag)
    }
  }

  if (!mounted) return null

  return (
    <div className="fixed top-6 right-6 z-50" ref={containerRef}>
      <div
        className="relative flex flex-col items-center p-3 rounded-full bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-sm border border-white/[0.08]"
        style={{ height: `${dotCount * dotSpacing + 24}px` }}
      >
        {/* Static track dots */}
        {[...Array(dotCount)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full bg-neutral-600/30 dark:bg-white/10"
            style={{
              top: `${12 + i * dotSpacing}px`,
            }}
          />
        ))}

        {/* Draggable glowing bulb */}
        <motion.button
          drag="y"
          dragConstraints={{ top: 0, bottom: maxDrag }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          onClick={handleClick}
          style={{ y }}
          className="absolute top-3 w-4 h-4 rounded-full cursor-grab active:cursor-grabbing focus:outline-none z-10"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: isDark
                ? "0 0 20px 8px rgba(254, 243, 199, 0.4), 0 0 40px 16px rgba(254, 243, 199, 0.2)"
                : "0 0 30px 12px rgba(251, 191, 36, 0.6), 0 0 60px 24px rgba(251, 191, 36, 0.3)",
            }}
            transition={{ duration: 0.5 }}
          />
          {/* Inner bulb */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              backgroundColor: isDark ? "#fef3c7" : "#fbbf24",
              boxShadow: isDark ? "inset 0 -2px 4px rgba(0,0,0,0.1)" : "inset 0 -2px 4px rgba(0,0,0,0.2)",
            }}
            transition={{ duration: 0.3 }}
          />
          {/* Highlight */}
          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-white/60" />
        </motion.button>
      </div>
    </div>
  )
}
