import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

/** Five stars in halves, or "Not rated yet". `track` colours the empty stars (light text on dark pages by default). */
export function Stars({ rating, className, track = "text-white/20" }: { rating: number | null; className?: string; track?: string }) {
  if (rating == null) return <span className={cn("text-xs opacity-60", className)}>Not rated yet</span>
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-amber-400", className)} aria-label={`${rating} out of 5`} title={`${rating}/5`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = rating - i
        if (fill >= 1) return <Star key={i} className="size-3.5 fill-current" />
        if (fill >= 0.5)
          return (
            <span key={i} className="relative inline-block size-3.5">
              <Star className={cn("absolute inset-0 size-3.5", track)} />
              <StarHalf className="absolute inset-0 size-3.5 fill-current" />
            </span>
          )
        return <Star key={i} className={cn("size-3.5", track)} />
      })}
    </span>
  )
}
