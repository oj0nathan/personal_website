"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import type { ReactNode } from "react"

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-[#0D1117] dark:bg-[#0D1117] text-white transition-bg",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform`,
            `[background-image:repeating-linear-gradient(100deg,#0D1117_0%,#0D1117_7%,transparent_10%,transparent_12%,#0D1117_16%),repeating-linear-gradient(100deg,#3b82f6_10%,#818cf8_15%,#60a5fa_20%,#a5b4fc_25%,#3b82f6_30%)]`,
            `[background-size:300%,200%]`,
            `[background-position:50%_50%,50%_50%]`,
            `blur-[10px]`,
            `after:content-[""] after:absolute after:inset-0`,
            `after:[background-image:repeating-linear-gradient(100deg,#0D1117_0%,#0D1117_7%,transparent_10%,transparent_12%,#0D1117_16%),repeating-linear-gradient(100deg,#3b82f6_10%,#818cf8_15%,#60a5fa_20%,#a5b4fc_25%,#3b82f6_30%)]`,
            `after:[background-size:200%,100%]`,
            `after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference`,
            showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`,
          )}
        />
      </div>
      {/* </CHANGE> */}
      {children}
    </div>
  )
}
