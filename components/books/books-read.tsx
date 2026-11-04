"use client"

import * as React from "react"

// Animations live in this sheet: the site's global `* { transition: … }` rule is unlayered and outranks
// Tailwind's transition utilities.
const CSS = `
.br-mark{stroke-dasharray:1;stroke-dashoffset:1;animation:br-draw .9s cubic-bezier(.65,0,.35,1) 1.05s forwards}
.br-mark-2{stroke-dasharray:1;stroke-dashoffset:1;animation:br-draw .6s cubic-bezier(.65,0,.35,1) 1.6s forwards}
.br-label{opacity:0;transform:translateY(6px);animation:br-in .6s ease 1.5s forwards}
@keyframes br-draw{to{stroke-dashoffset:0}}
@keyframes br-in{to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.br-mark,.br-mark-2{animation:none;stroke-dashoffset:0}.br-label{animation:none;opacity:1;transform:none}}
`

/** The total read, counting up from zero, then underlined with a hand-drawn marker stroke. */
export function BooksRead({ count }: { count: number }) {
  const [shown, setShown] = React.useState(count)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const start = performance.now()
    const duration = 1100
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setShown(Math.round(count * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    setShown(0)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [count])

  return (
    <div className="relative w-fit select-none md:pr-4" aria-label={`${count} books read`}>
      <style>{CSS}</style>
      <div className="relative">
        <span aria-hidden="true" className="block bg-gradient-to-b from-white to-white/70 bg-clip-text font-serif text-[6.5rem] leading-[0.85] tracking-tight text-transparent tabular-nums md:text-[9rem]">
          {shown}
        </span>
        <svg aria-hidden="true" viewBox="0 0 220 34" preserveAspectRatio="none" className="absolute -bottom-5 left-[-6%] h-8 w-[112%] overflow-visible md:-bottom-6 md:h-10">
          <path
            className="br-mark"
            pathLength={1}
            d="M4 22 C 40 12, 90 10, 130 13 S 196 18, 214 10"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            className="br-mark-2"
            pathLength={1}
            d="M24 29 C 70 22, 130 21, 196 24"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>
      <p className="br-label mt-8 text-xs font-medium uppercase tracking-[0.35em] text-white/50 md:mt-10">Books read</p>
    </div>
  )
}
