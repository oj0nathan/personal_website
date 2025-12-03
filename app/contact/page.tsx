"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"
import { motion } from "framer-motion"
import { AuroraBackground } from "@/components/ui/aurora-background"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subject = encodeURIComponent(
      `Contact from ${formData.name}${formData.company ? ` at ${formData.company}` : ""}`,
    )
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}${formData.company ? `\nCompany: ${formData.company}` : ""}\n\nMessage:\n${formData.message}`,
    )

    const mailtoLink = `mailto:jonathanhosa04@gmail.com?subject=${subject}&body=${body}`
    window.open(mailtoLink, "_blank")

    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <AuroraBackground className="min-h-screen w-full">
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-8 md:px-8 md:py-12 w-full">
        <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </motion.div>

        <header className="mb-10">
          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-tight"
          >
            Get in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">Touch</span>
          </motion.h1>
        </header>

        <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Jon Snow"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-white placeholder:text-white/30"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="jon.snow@stark.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-white placeholder:text-white/30"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Company</label>
              <div className="relative">
                <input
                  type="text"
                  name="company"
                  placeholder="Night's Watch Inc."
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-white placeholder:text-white/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Message</label>
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Winter is coming..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-white placeholder:text-white/30 resize-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600/80 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </form>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-4 pt-6"
          >
            <a
              href="https://www.linkedin.com/in/jonathan-ho-3429b1283/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg bg-[#0077B5] flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href="https://github.com/oj0nathan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </AuroraBackground>
  )
}
