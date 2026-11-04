import { cn } from "@/lib/utils"
import React, { type ComponentProps } from "react"

interface BookProps {
  children?: React.ReactNode
  color?: string
  textColor?: string
  texture?: boolean
  depth?: number
  variant?: "default" | "simple"
  illustration?: React.ReactNode
  /** Cover width in px. Leave it out to size the book from CSS with `[--book-width:…]` in `className`. */
  width?: number
  /** A cover image filling the front of the book, under the spine shading. */
  image?: string
  alt?: string
  /** How far the book turns on hover, in degrees. Default 20. */
  tilt?: number
  /** On hover the front cover also swings partly open on its spine, showing the pages inside. */
  peek?: boolean
  className?: string
}

// Transitions are set inline: the site's global `* { transition: … }` rule outranks Tailwind's transition utilities.
const EASE = "cubic-bezier(.2,.8,.2,1)"

export function Book(props: BookProps) {
  const { children, color = "#f50537", depth, texture, variant = "default", textColor, illustration, width, image, alt = "", tilt = 20, peek = false, className } = props
  const hover = `rotateY(-${tilt}deg) scale(${(1 + tilt * 0.0033).toFixed(3)}) translateX(-${(tilt * 0.4).toFixed(1)}px) translateY(-${(tilt * 0.2).toFixed(1)}px)`
  return (
    <div
      className={cn("group relative inline-block w-fit [--book-width:196px] [perspective:900px]", className)}
      style={
        {
          "--book-color": color,
          "--text-color": textColor,
          "--book-depth": (depth || 4) + "cqw",
          "--book-hover": hover,
          ...(width ? { "--book-width": width + "px" } : null),
        } as React.CSSProperties
      }
    >
      {/* Floor shadow: widens and softens as the book lifts. */}
      <div
        aria-hidden={true}
        className="pointer-events-none absolute -bottom-3 left-[8%] h-4 w-[84%] rounded-[50%] bg-black/60 opacity-40 blur-md group-hover:scale-x-110 group-hover:opacity-70"
        style={{ transition: `transform 600ms ${EASE}, opacity 600ms ${EASE}` }}
      />
      <div
        className="relative aspect-[49/60] w-fit min-w-[calc(var(--book-width))] rotate-0 [container-type:inline-size] [transform-style:preserve-3d] group-hover:[transform:var(--book-hover)]"
        style={{ transition: `transform 600ms ${EASE}` }}
      >
        {peek && (
          // The pages under the cover, seen when it swings open.
          <div
            aria-hidden={true}
            className="absolute inset-y-[2px] left-0 right-[3px] rounded-r-sm bg-[repeating-linear-gradient(180deg,#f6f1e7_0,#f6f1e7_5px,#ece5d8_6px)] shadow-[inset_8px_0_12px_-6px_rgba(0,0,0,.25)]"
            style={{ transform: "translateZ(-1px)" }}
          />
        )}
        <Stack
          align="stretch"
          className={cn("absolute size-full overflow-hidden rounded-l rounded-r border border-border bg-[var(--book-color)] shadow-book", peek && "origin-left group-hover:[transform:rotateY(-28deg)]")}
          style={peek ? { transition: `transform 700ms ${EASE} 60ms` } : undefined}
        >
          {image ? (
            <>
              <img src={image} alt={alt} draggable={false} className="absolute inset-0 size-full select-none object-cover" />
              <div aria-hidden={true} className="absolute inset-y-0 left-0 w-[8.2%] bg-book-bind-bg opacity-100 mix-blend-overlay" />
              {children && <div className="relative mt-auto [contain:inline-size] w-full">{children}</div>}
            </>
          ) : (
            <>
              {variant !== "simple" && (
                <Stack shrink grow direction="row" className="relative min-w-[calc(var(--book-width))] overflow-hidden bg-[var(--book-color)]">
                  <div className="absolute inset-y-0 min-w-[8.2%] bg-book-bind-bg opacity-100 mix-blend-overlay" />
                  {illustration && <div className="object-cover">{illustration}</div>}
                </Stack>
              )}
              <Stack grow={variant === "simple"} direction="row" className="h-fit">
                <div className="h-full min-w-[8.2%] bg-book-bind-bg opacity-100 mix-blend-overlay" />
                <div className="w-full [contain:inline-size]">{children}</div>
              </Stack>
            </>
          )}
          {texture && <div aria-hidden={true} className="absolute inset-0 bg-cover bg-no-repeat opacity-60 mix-blend-hard-light" />}
        </Stack>
        <div
          aria-hidden={true}
          className="absolute top-[3px] h-[calc(100%-2*6px)] w-[calc(var(--book-depth)-2px)] bg-book-pages"
          style={{ transform: "translateX(calc(var(--book-width) - var(--book-depth) / 2 - 3px)) rotateY(90deg) translateX(calc(var(--book-depth) / 2))" }}
        />
        <div
          aria-hidden={true}
          className="absolute left-0 h-full w-full rounded-l-md rounded-r bg-[var(--book-color)]"
          style={{ transform: "translateZ(calc(-1 * var(--book-depth)))" }}
        />
      </div>
    </div>
  )
}

type FlexAlignItems = "stretch" | "start" | "end" | "center"
type FlexJustifyContent = "stretch" | "start" | "end" | "space-between" | "space-around" | "space-evenly" | "center"

interface StackProps extends ComponentProps<"div"> {
  children: React.ReactNode
  direction?: "column" | "row"
  align?: FlexAlignItems
  justify?: FlexJustifyContent
  gap?: number
  padding?: number
  grow?: boolean
  shrink?: boolean
  wrap?: boolean
  className?: string
}

function Stack(props: StackProps) {
  const { children, shrink = false, grow = false, justify = "start", align = "start", wrap = false, padding = 0, gap = 0, direction = "column", className, style, ...etc } = props

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flex: "initial",
        flexDirection: direction,
        alignItems: align === "start" ? "flex-start" : align === "end" ? "flex-end" : align,
        justifyContent: justify === "start" ? "flex-start" : justify === "end" ? "flex-end" : justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        flexGrow: grow ? 1 : 0,
        flexShrink: shrink ? 1 : 0,
        padding: padding * 4 + "px",
        gap: gap * 4 + "px",
        ...style,
      }}
      {...etc}
    >
      {children}
    </div>
  )
}

export { Stack }
