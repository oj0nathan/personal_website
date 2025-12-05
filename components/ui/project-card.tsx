"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  title: string
  description: string
  link: string
  linkText?: string
  index?: number
  isWip?: boolean
  isInternal?: boolean // Added isInternal prop to handle internal vs external links
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      className,
      imgSrc,
      title,
      description,
      link,
      linkText = "View Project",
      index = 0,
      isWip = false,
      isInternal = false,
      ...props
    },
    ref,
  ) => {
    const renderContent = () => (
      <>
        {isWip && (
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-amber-500/90 text-black text-xs font-semibold tracking-wide">
            Work in Progress
          </div>
        )}

        {/* Card Image Section */}
        <div className="aspect-video overflow-hidden bg-neutral-900">
          <img
            src={imgSrc || "/placeholder.svg"}
            alt={title}
            className={cn(
              "h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110",
              isWip && "opacity-60",
            )}
            loading="lazy"
          />
        </div>

        {/* Card Content Section */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-serif font-semibold transition-colors duration-300 group-hover:text-blue-400">
            {title}
          </h3>
          <p className="mt-3 flex-1 text-white/50 leading-relaxed">{description}</p>

          {/* Card Link/CTA - Show different style for WIP */}
          {isWip ? (
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-400/80">
              {linkText}
            </span>
          ) : (
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-all duration-300 group-hover:underline">
              {linkText}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          )}
        </div>
      </>
    )

    const cardClasses = cn(
      "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] text-white shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:border-blue-500/30",
      className,
    )

    if (isInternal && !isWip) {
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3 + index * 0.15,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          {...props}
        >
          <Link href={link} className={cardClasses}>
            {renderContent()}
          </Link>
        </motion.div>
      )
    }

    if (!isWip) {
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3 + index * 0.15,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          {...props}
        >
          <a href={link} target="_blank" rel="noopener noreferrer" className={cardClasses}>
            {renderContent()}
          </a>
        </motion.div>
      )
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3 + index * 0.15,
          ease: [0.25, 0.4, 0.25, 1],
        }}
        className={cardClasses}
        {...props}
      >
        {renderContent()}
      </motion.div>
    )
  },
)
ProjectCard.displayName = "ProjectCard"

export { ProjectCard }
