"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ScrollAdventureImage {
  src: string
  alt: string
  /** CSS object-position, to keep the subject in frame when the photo is cropped. */
  position?: string
}

export interface ScrollAdventureSection {
  /** Text half of the screen. Its direct children fade up one after another when the section arrives. */
  content: React.ReactNode
  /** One or two photos, framed at a medium size on the other half. */
  images?: ScrollAdventureImage[]
  /** Something other than photos for that half (e.g. an animation); shown in a medium frame instead of `images`. */
  visual?: React.ReactNode
  /** Which half the photos take on wide screens. Alternate it for the split-slide look. */
  imageSide?: "left" | "right"
}

export interface ScrollAdventureProps {
  sections: ScrollAdventureSection[]
  /** Rendered above every section, e.g. a back link. */
  overlay?: React.ReactNode
  /** Slide duration in ms; input is ignored while a slide runs. */
  animTime?: number
  className?: string
}

const EASE = "cubic-bezier(.7,0,.3,1)"

// Transitions are set inline or in this sheet on purpose: the site's global `* { transition: … }` rule is unlayered,
// so it outranks Tailwind's transition utilities and would leave the slides jumping instead of moving.
//
// Text and photos travel with their half of the screen, so the whole section arrives and leaves as one:
// - arriving, everything fades and settles together a beat after the slide starts (no line-by-line trickle);
// - leaving, it stays fully visible until its half is off screen (--sa-hide = the slide time), then resets
//   out of sight, so nobody watches words vanish from a panel that is still moving.
const CSS = `
.sa-copy > * > * { opacity: 0; translate: 0 16px; transition: opacity .2s ease var(--sa-hide), translate 0s linear var(--sa-hide); }
.sa-live .sa-copy > * > * { opacity: 1; translate: 0 0; transition: opacity .55s ease .15s, translate .9s cubic-bezier(.2,.8,.2,1) .15s; }
.sa-photo { opacity: 0; scale: .96; transition: opacity .2s ease var(--sa-hide), scale 0s linear var(--sa-hide); }
.sa-live .sa-photo { opacity: 1; scale: 1; transition: opacity .55s ease .15s, scale 1s cubic-bezier(.2,.8,.2,1) .15s; }
@media (prefers-reduced-motion: reduce) {
  .sa-copy > * > *, .sa-photo { opacity: 1 !important; translate: none !important; scale: none !important; transition: none !important; }
}
`

/**
 * Full-screen split slides: each section is a text half and a photo half. Scrolling, arrow keys or a swipe move to
 * the next section, the left half sliding up from below while the right half drops in from above, its photos and text
 * riding along. The first section slides in the same way when the page opens. On phones the photos sit on top and the
 * halves slide in sideways.
 */
export default function ScrollAdventure({ sections, overlay, animTime = 1000, className }: ScrollAdventureProps) {
  const [current, setCurrent] = React.useState(0)
  const [reduced, setReduced] = React.useState(false)
  // Starts false so the first section renders off screen, then slides in like any other section.
  const [entered, setEntered] = React.useState(false)

  React.useEffect(() => {
    const t = window.setTimeout(() => setEntered(true), 80)
    return () => window.clearTimeout(t)
  }, [])
  const count = sections.length
  const locked = React.useRef(false)
  const lastWheel = React.useRef(0)
  const touchY = React.useRef<number | null>(null)

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  const go = React.useCallback(
    (direction: 1 | -1) => {
      if (locked.current) return
      setCurrent((page) => {
        const next = Math.min(count - 1, Math.max(0, page + direction))
        if (next !== page) {
          locked.current = true
          window.setTimeout(() => (locked.current = false), animTime)
        }
        return next
      })
    },
    [count, animTime],
  )

  const jump = (index: number) => {
    if (locked.current || index === current) return
    locked.current = true
    window.setTimeout(() => (locked.current = false), animTime)
    setCurrent(index)
  }

  React.useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const now = performance.now()
      const fresh = now - lastWheel.current > 220
      lastWheel.current = now
      // A mouse notch turns the page at once; a trackpad turns it on the start of a swipe and ignores the momentum
      // events that trail after it, so one swipe moves one section.
      if (Math.abs(event.deltaY) >= 50 || (fresh && Math.abs(event.deltaY) >= 4)) go(event.deltaY > 0 ? 1 : -1)
    }
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault()
        go(1)
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault()
        go(-1)
      }
    }
    const onTouchStart = (event: TouchEvent) => {
      touchY.current = event.touches[0]?.clientY ?? null
    }
    const onTouchEnd = (event: TouchEvent) => {
      const start = touchY.current
      const end = event.changedTouches[0]?.clientY
      touchY.current = null
      if (start === null || end === undefined || Math.abs(start - end) < 50) return
      go(start > end ? 1 : -1)
    }
    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("keydown", onKey)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [go])

  const slide: React.CSSProperties = reduced
    ? { transition: "none" }
    : { transition: `translate ${animTime}ms ${EASE}` }

  return (
    <div className={cn("fixed inset-0 overflow-hidden bg-[#030303]", className)} style={{ "--sa-hide": `${animTime}ms` } as React.CSSProperties}>
      <style>{CSS}</style>
      {sections.map((section, i) => {
        const active = entered && i === current
        const imagesLeft = (section.imageSide ?? "left") === "left"
        const images = section.images ?? []
        // Photos and the optional visual share the half: two or more of them sit as a staggered pair.
        const tiles = images.length + (section.visual ? 1 : 0)
        const pair = tiles > 1
        // Photos get a framed card; the visual sits unframed, as part of the backdrop.
        const tile = (k: number, framed = true) =>
          cn(
            "sa-photo relative h-full",
            framed && "overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/10",
            pair ? "aspect-[3/4] min-w-0 max-w-[46%] md:h-[min(50vh,440px)] md:max-w-none" : "aspect-[4/5] md:h-[min(62vh,560px)]",
            pair && k === 1 && "md:translate-y-12",
            pair && k === 0 && "md:-translate-y-6",
          )
        // Desktop: whatever sits on the left rises from below, the right half drops from above.
        // Phone: photos (top) come in from the right, text (bottom) from the left.
        const imageMove = active
          ? "translate-x-0 translate-y-0"
          : cn("translate-x-full md:translate-x-0", imagesLeft ? "md:translate-y-full" : "md:-translate-y-full")
        const textMove = active
          ? "translate-x-0 translate-y-0"
          : cn("-translate-x-full md:translate-x-0", imagesLeft ? "md:-translate-y-full" : "md:translate-y-full")

        return (
          <section
            key={i}
            aria-hidden={!active}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className={cn("absolute inset-0", active ? "sa-live z-10" : "pointer-events-none z-0")}
          >
            <div
              className={cn(
                "absolute left-0 top-0 flex h-[36%] w-full items-center justify-center gap-4 bg-[#05070c] px-6 pb-2 pt-14 md:h-full md:w-1/2 md:gap-8 md:p-12 lg:p-16",
                imagesLeft ? "md:left-0" : "md:left-1/2",
                imageMove,
              )}
              style={slide}
            >
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(59,130,246,0.10),transparent_70%)]" />
              {images.map((image, k) => (
                <div key={image.src} className={tile(k)}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable={false}
                    className="absolute inset-0 h-full w-full select-none object-cover"
                    style={{ objectPosition: image.position ?? "center" }}
                  />
                </div>
              ))}
              {section.visual && <div className={tile(images.length, false)}>{section.visual}</div>}
            </div>

            <div
              className={cn(
                "absolute left-0 top-[36%] h-[64%] w-full overflow-hidden md:top-0 md:h-full md:w-1/2",
                imagesLeft ? "md:left-1/2" : "md:left-0",
                textMove,
              )}
              style={slide}
            >
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.06] via-transparent to-indigo-500/[0.06]" />
              <div className="sa-copy relative flex h-full flex-col justify-center py-6 pl-6 pr-10 md:px-12 md:py-10 lg:px-16">
                {section.content}
              </div>
            </div>
          </section>
        )
      })}

      {overlay && <div className="pointer-events-none absolute inset-x-0 top-0 z-30 [&>*]:pointer-events-auto">{overlay}</div>}

      <nav aria-label="Sections" className="absolute right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2 md:right-5">
        {sections.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to section ${i + 1}`}
            aria-current={i === current}
            onClick={() => jump(i)}
            className={cn(
              "w-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
              i === current ? "h-6 bg-white" : "h-1.5 bg-white/35 hover:bg-white/60",
            )}
            style={{ transition: "height .3s ease, background-color .3s ease" }}
          />
        ))}
      </nav>

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs uppercase tracking-[0.25em] text-white/60 md:flex",
          current === count - 1 ? "opacity-0" : "opacity-100",
        )}
        style={{ transition: "opacity .5s ease" }}
      >
        <span>Scroll</span>
        <svg viewBox="0 0 16 16" className="size-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </div>
    </div>
  )
}
