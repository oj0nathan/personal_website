"use client"

import * as React from "react"
import { Mail } from "lucide-react"
import { cn } from "@/lib/utils"

// --- SVG Icons ---

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

// --- Helper Components ---

const DashedLine = () => <div className="w-full border-t-2 border-dashed border-white/10" aria-hidden="true" />

const Barcode = ({ value }: { value: string }) => {
  const hashCode = (s: string) =>
    s.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
  const seed = hashCode(value)
  const random = (s: number) => {
    const x = Math.sin(s) * 10000
    return x - Math.floor(x)
  }

  const bars = Array.from({ length: 60 }).map((_, index) => ({ width: random(seed + index) > 0.7 ? 2.5 : 1.5 }))

  const spacing = 1.5
  const totalWidth = bars.reduce((acc, bar) => acc + bar.width + spacing, 0) - spacing
  const svgWidth = 250
  const svgHeight = 70
  let currentX = (svgWidth - totalWidth) / 2

  return (
    <div className="flex flex-col items-center py-2">
      <svg xmlns="http://www.w3.org/2000/svg" width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} aria-label={`Barcode for value ${value}`} className="max-w-full fill-current text-white/85">
        {bars.map((bar, index) => {
          const x = currentX
          currentX += bar.width + spacing
          return <rect key={index} x={x} y="10" width={bar.width} height="50" />
        })}
      </svg>
      <p className="mt-2 text-sm tracking-[0.3em] text-white/45">{value}</p>
    </div>
  )
}

const CONFETTI_COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#8b5cf6", "#f97316"]

const ConfettiExplosion = () => {
  // Positions are picked once so re-renders don't reshuffle the pieces mid-fall.
  const pieces = React.useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        left: Math.random() * 100,
        top: -20 + Math.random() * 10,
        rotate: Math.random() * 360,
        duration: 2.5 + Math.random() * 2.5,
        delay: Math.random() * 2,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      })),
    [],
  )

  return (
    <>
      <style>
        {`
          @keyframes ticket-confetti-fall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) { .ticket-confetti { display: none; } }
        `}
      </style>
      <div className="ticket-confetti pointer-events-none fixed inset-0 z-50" aria-hidden="true">
        {pieces.map((p, i) => (
          <div
            key={i}
            className="absolute h-4 w-2"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              backgroundColor: p.color,
              transform: `rotate(${p.rotate}deg)`,
              animation: `ticket-confetti-fall ${p.duration}s ${p.delay}s linear forwards`,
            }}
          />
        ))}
      </div>
    </>
  )
}

// --- Main Ticket Component ---

export interface TicketProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shown as the reference number; also drives the barcode pattern. */
  ticketId: string
  date: Date
  title?: string
  subtitle?: string
  /** Who the message went to. */
  recipient: string
  senderName: string
  senderEmail: string
  /** Rendered under the barcode, e.g. a "send another" button. */
  footer?: React.ReactNode
}

// The side notches are real holes cut with a mask, so whatever the ticket sits on shows through them.
const NOTCHES = "radial-gradient(circle 16px at 0 50%, transparent 15.5px, #000 16px), radial-gradient(circle 16px at 100% 50%, transparent 15.5px, #000 16px)"
const NOTCH_MASK: React.CSSProperties = {
  WebkitMaskImage: NOTCHES,
  maskImage: NOTCHES,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
}

const AnimatedTicket = React.forwardRef<HTMLDivElement, TicketProps>(
  ({ className, ticketId, date, title = "Thank you!", subtitle = "Your message has been sent successfully", recipient, senderName, senderEmail, footer, style, ...props }, ref) => {
    const [showConfetti, setShowConfetti] = React.useState(false)

    React.useEffect(() => {
      const mountTimer = setTimeout(() => setShowConfetti(true), 100)
      const unmountTimer = setTimeout(() => setShowConfetti(false), 6000)
      return () => {
        clearTimeout(mountTimer)
        clearTimeout(unmountTimer)
      }
    }, [])

    const formattedDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })
      .format(date)
      .replace(",", " •")

    return (
      <>
        {showConfetti && <ConfettiExplosion />}
        {/* drop-shadow (unlike box-shadow) follows the masked outline, notches included. */}
        <div className={cn("relative z-10 w-full max-w-sm [filter:drop-shadow(0_25px_40px_rgba(0,0,0,.55))]", "animate-in fade-in-0 zoom-in-95 duration-500", className)}>
        <div
          ref={ref}
          role="status"
          className="relative w-full rounded-2xl bg-neutral-900/95 font-sans text-white backdrop-blur"
          style={{ ...NOTCH_MASK, ...style }}
          {...props}
        >

          <div className="flex flex-col items-center p-8 text-center">
            <div className="animate-in zoom-in-50 rounded-full bg-blue-500/15 p-3 delay-300 duration-500">
              <CheckCircleIcon className="animate-in zoom-in-75 h-10 w-10 text-blue-400 delay-500 duration-500" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
            <p className="mt-1 text-white/55">{subtitle}</p>
          </div>

          <div className="space-y-6 px-8 pb-8">
            <DashedLine />

            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-xs uppercase text-white/45">Reference</p>
                <p className="font-mono font-medium">{ticketId}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase text-white/45">Sent to</p>
                <p className="font-semibold">{recipient}</p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase text-white/45">Date &amp; Time</p>
              <p className="font-medium">{formattedDate}</p>
            </div>

            <div className="flex items-center space-x-4 rounded-lg bg-white/[0.05] p-4">
              <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-blue-500/15">
                <Mail className="h-5 w-5 text-blue-300" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold">{senderName}</p>
                <p className="truncate font-mono text-sm tracking-wide text-white/55">{senderEmail}</p>
              </div>
            </div>

            <DashedLine />

            <Barcode value={ticketId} />
            {footer}
          </div>
        </div>
        </div>
      </>
    )
  },
)

AnimatedTicket.displayName = "AnimatedTicket"

export { AnimatedTicket }
