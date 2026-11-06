"use client"

import React, { useState } from "react"
import { motion, MotionConfigContext, LayoutGroup, type MotionStyle } from "framer-motion"

/**
 * A card with a wireframe cube icon beside a heading and a line of text. On hover the cube twists towards you,
 * its corner brackets spring outwards, and a fill wipes across the heading, inverting its colours.
 * Colours come from the page's --background and --foreground; the type is inherited.
 */

interface Props {
  heading?: string
  text?: string
  variant?: "Default" | "Hover"
  className?: string
  style?: React.CSSProperties
  /** Fixed size of the outer box, in px. Leave out to size to the content. */
  width?: number
  height?: number
}

const spring = { bounce: 0, delay: 0, duration: 0.4, type: "spring" as const }
const tween = { delay: 0, duration: 0.4, ease: [0.44, 0, 0.56, 1] as [number, number, number, number], type: "tween" as const }
const titleTransition = { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], type: "tween" as const }
const centre = (_: unknown, t: string) => `translate(-50%, -50%) ${t}`

/** Overrides the transition for everything inside it that doesn't set its own. */
function Transition({ value, children }: { value: object; children: React.ReactNode }) {
  const config = React.useContext(MotionConfigContext)
  const contextValue = React.useMemo(() => ({ ...config, transition: value }), [config, value])
  return <MotionConfigContext.Provider value={contextValue}>{children}</MotionConfigContext.Provider>
}

const EDGE = "4px solid var(--foreground)"
const face = (style: MotionStyle): MotionStyle => ({
  position: "absolute",
  overflow: "hidden",
  zIndex: 1,
  border: EDGE,
  backgroundColor: "var(--background)",
  ...style,
})

/** One flat layer of the cube: a 240×34 box drawn from six faces. */
function Slice() {
  return (
    <Transition value={tween}>
      <motion.div style={{ display: "flex", position: "relative", transformStyle: "preserve-3d", width: "min-content", height: "min-content" }}>
        <motion.div style={{ ...face({ position: "relative", height: 34, width: 240, zIndex: 120 }) }} />
        <motion.div style={face({ top: 0, bottom: 0, right: 0, width: 240, rotateY: 180 })} />
        <motion.div style={face({ top: 0, bottom: 0, left: 120, width: 240, rotateY: 90 })} />
        <motion.div style={face({ top: 0, bottom: 0, right: 120, width: 240, rotateY: -90 })} />
        <motion.div style={face({ left: 0, right: 0, top: -120, height: 240, rotateX: 90 })} />
        <motion.div style={face({ left: 0, right: 0, top: -86, height: 240, rotateX: 90 })} />
      </motion.div>
    </Transition>
  )
}

export const IconHover3D: React.FC<Props> = ({
  heading = "Library",
  text = "A comprehensive collection of digital books and resources for learning and research.",
  variant = "Default",
  className = "",
  style = {},
  width,
  height,
}) => {
  const [current, setCurrent] = useState<"Default" | "Hover">(variant)
  const layoutId = React.useId()
  const hover = current === "Hover"
  const state = hover ? "hover" : "rest"

  // Corner brackets: inset at rest, pushed out and enlarged on hover.
  const corner = (pos: React.CSSProperties, sides: React.CSSProperties) => (
    <motion.div
      style={{ position: "absolute", width: 24, height: 24, zIndex: 2, ...sides, ...pos }}
      variants={{ rest: { scale: 1 }, hover: { scale: 2.2 } }}
      animate={state}
    />
  )
  const near = hover ? -6 : 14

  return (
    <div style={{ width, height }}>
      <LayoutGroup id={layoutId}>
        <Transition value={spring}>
          <motion.div
            className={`icon-hover-3d ${className}`}
            onMouseEnter={() => setCurrent("Hover")}
            onMouseLeave={() => setCurrent("Default")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(16px, 4vw, 32px)",
              padding: "clamp(14px, 3vw, 20px)",
              position: "relative",
              borderRadius: 12,
              backgroundColor: "var(--background)",
              border: "1px solid color-mix(in srgb, var(--foreground) 10%, transparent)",
              ...style,
            }}
          >
            {/* Icon */}
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "none",
                position: "relative",
                width: 100,
                height: 100,
                zIndex: 1,
                border: "1px solid color-mix(in srgb, var(--foreground) 20%, transparent)",
              }}
            >
              <motion.div style={{ flex: "none", position: "relative", width: 348, height: 348, zIndex: 2, scale: 0.3 }}>
                <motion.div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 28,
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transformStyle: "preserve-3d",
                    zIndex: 3,
                    rotate: 49,
                    rotateX: 23,
                    rotateY: 33,
                    scale: 0.7,
                    transformPerspective: 1200,
                  }}
                  transformTemplate={centre}
                  variants={{ rest: { rotateX: 23, rotateY: 33, scale: 0.7 }, hover: { rotateX: -28, rotateY: -43, scale: 1.1 } }}
                  animate={state}
                >
                  <Slice />
                  <Slice />
                  <Slice />
                </motion.div>
                {corner({ left: near, top: near }, { borderLeft: EDGE, borderTop: EDGE })}
                {corner({ left: near, top: hover ? 330 : 310 }, { borderLeft: EDGE, borderBottom: EDGE })}
                {corner({ right: near, bottom: near }, { borderRight: EDGE, borderBottom: EDGE })}
                {corner({ right: near, top: near }, { borderRight: EDGE, borderTop: EDGE })}
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, minWidth: 0, maxWidth: 440 }}>
              {/* The heading may wrap on narrow screens; the overlay copy wraps identically, so the wipe stays aligned. */}
              <motion.div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  padding: "4px 0",
                  fontWeight: 600,
                  fontSize: 19,
                  lineHeight: 1.3,
                  color: "var(--foreground)",
                  userSelect: "none",
                  cursor: "default",
                }}
              >
                <span className="mx-1 block" style={{ position: "relative", zIndex: 1 }}>
                  {heading}
                </span>
                {/* The same heading in the page colour, revealed left to right over the fill */}
                <motion.span
                  aria-hidden="true"
                  className="mx-1 block"
                  style={{ position: "absolute", top: 4, left: 0, right: 0, color: "var(--background)", zIndex: 3 }}
                  initial={false}
                  animate={{ clipPath: `inset(0 ${hover ? "0%" : "100%"} 0 0)` }}
                  transition={titleTransition}
                >
                  {heading}
                </motion.span>
                <motion.div
                  style={{ position: "absolute", inset: 0, backgroundColor: "var(--foreground)", transformOrigin: "left center", zIndex: 2 }}
                  initial={false}
                  animate={{ scaleX: hover ? 1 : 0 }}
                  transition={titleTransition}
                />
              </motion.div>

              <motion.div
                style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "color-mix(in srgb, var(--foreground) 70%, transparent)",
                  userSelect: "none",
                }}
              >
                {text}
              </motion.div>
            </motion.div>
          </motion.div>
        </Transition>
      </LayoutGroup>
    </div>
  )
}
