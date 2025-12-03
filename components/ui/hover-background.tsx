"use client"

import * as React from "react"
import { type HTMLMotionProps, motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

type HoverBackgroundProps = HTMLMotionProps<"div"> & {
  objectCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  children?: React.ReactNode
  colors?: {
    background?: string
    objects?: string[]
    glow?: string
  }
}

function HoverBackground({ className, objectCount = 12, children, colors = {}, ...props }: HoverBackgroundProps) {
  const {
    background = "bg-transparent",
    objects = [
      "bg-blue-400/20",
      "bg-indigo-400/20",
      "bg-cyan-400/20",
      "bg-sky-400/20",
      "bg-blue-500/20",
      "bg-indigo-500/20",
    ],
    glow = "shadow-blue-400/50",
  } = colors

  const [isHovered, setIsHovered] = React.useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, {
    stiffness: 300,
    damping: 30,
    restSpeed: 0.1,
    restDelta: 0.1,
  })
  const springY = useSpring(mouseY, {
    stiffness: 300,
    damping: 30,
    restSpeed: 0.1,
    restDelta: 0.1,
  })

  const animatedObjects = React.useMemo(
    () =>
      Array.from({ length: objectCount }, (_, i) => {
        const shape = Math.random() > 0.5 ? "circle" : "square"
        return {
          id: i,
          x: Math.random() * 90 + 5,
          y: Math.random() * 90 + 5,
          size: Math.random() * 40 + 15,
          color: objects[i % objects.length],
          delay: Math.random() * 2,
          shape,
          floatDirection: Math.random() > 0.5 ? 1 : -1,
          breathDuration: Math.random() * 3 + 3,
          parallaxStrength: Math.random() * 0.5 + 0.3,
          baseRotation: Math.random() * 360,
        }
      }),
    [objectCount, objects],
  )

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return

    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const x = (event.clientX - rect.left - centerX) / centerX
    const y = (event.clientY - rect.top - centerY) / centerY

    mouseX.set(x * 15)
    mouseY.set(y * 15)
  }

  const handleHoverStart = () => {
    setIsHovered(true)
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      data-slot="hover-background"
      className={cn("absolute inset-0 size-full overflow-hidden", background, className)}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* Animated Objects */}
      {animatedObjects.map((obj) => (
        <motion.div
          key={obj.id}
          className={cn(
            "absolute backdrop-blur-sm border border-white/10",
            obj.color,
            obj.shape === "circle" ? "rounded-full" : "rounded-lg rotate-45",
          )}
          style={{
            left: `${obj.x}%`,
            top: `${obj.y}%`,
            width: obj.size,
            height: obj.size,
            x: springX.get() * obj.parallaxStrength,
            y: springY.get() * obj.parallaxStrength,
          }}
          initial={{
            scale: 0.6,
            opacity: 0.4,
            rotate: obj.baseRotation,
          }}
          animate={{
            scale: [0.6, 0.8, 0.6],
            opacity: [0.4, 0.6, 0.4],
            rotate:
              obj.shape === "circle"
                ? [obj.baseRotation, obj.baseRotation + 10, obj.baseRotation]
                : [obj.baseRotation, obj.baseRotation + 5, obj.baseRotation],
            y: [0, obj.floatDirection * 15, 0],
            x: [0, obj.floatDirection * 8, 0],
          }}
          transition={{
            duration: obj.breathDuration,
            delay: obj.delay,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Floating Particles on Hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -30, -60],
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-10 size-full">{children}</div>
    </motion.div>
  )
}

export { HoverBackground, type HoverBackgroundProps }
