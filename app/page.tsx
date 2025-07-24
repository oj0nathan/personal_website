"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  Mail,
  BookOpen,
  GraduationCap,
  ChevronRight,
  TrendingUp,
  Send,
  Loader2,
  MessageCircle,
  User,
  AtSign,
  FileText,
  Star,
  Database,
  Brain,
  Code,
  Home,
  Briefcase,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

import { AuroraBackground } from "@/components/ui/aurora-background"
import { LampContainer } from "@/components/ui/lamp-container"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"

// Animated Geometric Shape Component
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-indigo-500/[0.15]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -200,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, -200], // Continuous falling loop
        rotate: [rotate, rotate + 360], // Full rotation during fall
        x: [0, 20, -15, 10, -5, 0], // Subtle horizontal drift
      }}
      transition={{
        opacity: { duration: 1.2, delay },
        y: {
          duration: 25, // 25 seconds for full fall cycle
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: delay + 2,
        },
        rotate: {
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: delay + 2,
        },
        x: {
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: delay + 2,
        },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0], // Additional floating motion
          scale: [1, 1.05, 1], // Gentle breathing effect
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(59,130,246,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

// Floating Paths Component for Personal Projects Background (Simplified)
function FloatingPaths({ position }: { position: number }) {
  // Create more paths distributed across the entire section
  const mainPaths = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    d: `M-${200 - i * 12 * position} -${100 + i * 15}C-${200 - i * 12 * position} -${100 + i * 15} -${
      150 - i * 12 * position
    } ${300 - i * 15} ${250 - i * 12 * position} ${500 - i * 15}C${450 - i * 12 * position} ${700 - i * 15} ${
      600 - i * 12 * position
    } ${900 - i * 15} ${600 - i * 12 * position} ${900 - i * 15}`,
    color: `rgba(30,64,175,${0.15 + i * 0.02})`,
    width: 0.8 + i * 0.03,
  }))

  // Additional horizontal flowing paths
  const horizontalPaths = Array.from({ length: 20 }, (_, i) => ({
    id: `h-${i}`,
    d: `M0 ${100 + i * 40}C200 ${80 + i * 40} 400 ${120 + i * 40} 600 ${100 + i * 40}C800 ${80 + i * 40} 1000 ${120 + i * 40} 1200 ${100 + i * 40}`,
    width: 0.6 + i * 0.02,
  }))

  // Diagonal cross paths for full coverage
  const diagonalPaths = Array.from({ length: 15 }, (_, i) => ({
    id: `d-${i}`,
    d: `M${i * 80} 0L${400 + i * 60} 400L${800 + i * 40} 800`,
    width: 0.5 + i * 0.02,
  }))

  const allPaths = [...mainPaths, ...horizontalPaths, ...diagonalPaths]

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-blue-400/40" viewBox="0 0 1400 1000" fill="none">
        <title>Background Paths</title>
        {allPaths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.12 + allPaths.indexOf(path) * 0.015}
            fill="none"
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: [0.3, 1, 0.3],
              opacity: [0.4, 0.8, 0.4],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const [terminalText, setTerminalText] = useState("")
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const commands = [
    {
      command: "$ git status",
      response:
        "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean",
    },
    { command: "$ git add .", response: "Adding files to staging area...\n✓ All changes staged successfully" },
    {
      command: "$ git commit -m 'feat: portfolio optimization'",
      response:
        "[main a1b2c3d] feat: portfolio optimization\n 3 files changed, 247 insertions(+)\n create mode 100644 optimizer.py",
    },
    {
      command: "$ git push origin main",
      response:
        "Enumerating objects: 12, done.\nCounting objects: 100% (12/12), done.\n✓ Successfully pushed to origin/main",
    },
    {
      command: "$ git log --oneline",
      response:
        "a1b2c3d feat: portfolio optimization\nb2c3d4e docs: update README\nc3d4e5f fix: responsive design issues\nd4e5f6g feat: add dark mode support",
    },
  ]

  const links = [
    {
      label: "Home",
      href: "#",
      icon: <Home className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Projects",
      href: "#work",
      icon: <Briefcase className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Experience",
      href: "#about",
      icon: <Clock className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Contact",
      href: "#contact",
      icon: <Mail className="h-5 w-5 flex-shrink-0" />,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Terminal typing animation with realistic delays
  useEffect(() => {
    if (!commands[currentCommandIndex]) return

    const currentCommand = commands[currentCommandIndex]
    const fullText = `${currentCommand.command}\n${currentCommand.response}`

    if (isTyping) {
      if (terminalText.length < fullText.length) {
        const char = fullText[terminalText.length]
        const isNewLine = char === "\n"
        const delay = isNewLine ? 200 : Math.random() * 100 + 30 // Longer delay for new lines

        const timeout = setTimeout(() => {
          setTerminalText(fullText.slice(0, terminalText.length + 1))
        }, delay)
        return () => clearTimeout(timeout)
      } else {
        setIsTyping(false)
        const timeout = setTimeout(() => {
          setCurrentCommandIndex((prev) => (prev + 1) % commands.length)
          setTerminalText("")
          setIsTyping(true)
        }, 4000)
        return () => clearTimeout(timeout)
      }
    }
  }, [terminalText, isTyping, currentCommandIndex, commands])

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || "Portfolio Contact")
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      )
      const mailtoLink = `mailto:jonathanhosa04@gmail.com?subject=${subject}&body=${body}`

      // Open email client
      window.location.href = mailtoLink

      // Reset form after a short delay
      setTimeout(() => {
        setIsSubmitting(false)
        setFormData({ name: "", email: "", subject: "", message: "" })
      }, 1000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
    }
  }

  // Safe terminal text rendering
  const renderTerminalLines = () => {
    if (!terminalText) return null

    try {
      return terminalText.split("\n").map((line, index) => {
        const key = `terminal-line-${index}`

        if (line.startsWith("$")) {
          return (
            <div key={key} className="text-[#1E40AF] font-semibold">
              {line}
            </div>
          )
        } else if (line.includes("✓")) {
          return (
            <div key={key} className="text-[#1E40AF] pl-4">
              {line}
            </div>
          )
        } else if (line.includes("Loading") || line.includes("Starting") || line.includes("Installing")) {
          return (
            <div key={key} className="text-[#FFD93D] pl-4">
              {line}
            </div>
          )
        } else if (line.includes("Sharpe") || line.includes("Return") || line.includes("Price")) {
          return (
            <div key={key} className="text-[#3B82F6] pl-4 font-semibold">
              {line}
            </div>
          )
        } else if (line.includes("[main") || line.includes("files changed")) {
          return (
            <div key={key} className="text-[#A855F7] pl-4">
              {line}
            </div>
          )
        } else {
          return (
            <div key={key} className="text-white/90 pl-4">
              {line}
            </div>
          )
        }
      })
    } catch (error) {
      console.error("Error rendering terminal lines:", error)
      return <div className="text-white/90">Loading terminal...</div>
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-white overflow-x-hidden">
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-2">
              {/* Updated branding */}
              <motion.div
                className="mb-8 overflow-hidden"
                animate={{
                  opacity: 1,
                }}
              >
                <div className="text-2xl font-bold tracking-tight text-[#1E40AF] whitespace-nowrap">JohoBlogs</div>
              </motion.div>

              <div className="flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom section with social links and resume */}
          <div className="overflow-hidden">
            <div className="flex flex-col gap-2 mb-4">
              <Link
                href="https://www.linkedin.com/in/jonathan-ho-3429b1283/"
                className="flex items-center gap-2 group/sidebar py-3 px-2 rounded-lg hover:bg-[#1E40AF]/10 transition-all duration-200 overflow-hidden"
              >
                <Linkedin className="text-white group-hover/sidebar:text-[#1E40AF] h-5 w-5 flex-shrink-0 transition-colors duration-200" />
                <motion.span
                  className="text-white group-hover/sidebar:text-[#1E40AF] text-sm whitespace-nowrap overflow-hidden"
                  animate={{
                    opacity: 1,
                    width: "auto",
                  }}
                  style={{ display: "block" }}
                >
                  LinkedIn
                </motion.span>
              </Link>

              <Link
                href="https://github.com/oj0nathan"
                className="flex items-center gap-2 group/sidebar py-3 px-2 rounded-lg hover:bg-[#1E40AF]/10 transition-all duration-200 overflow-hidden"
              >
                <Github className="text-white group-hover/sidebar:text-[#1E40AF] h-5 w-5 flex-shrink-0 transition-colors duration-200" />
                <motion.span
                  className="text-white group-hover/sidebar:text-[#1E40AF] text-sm whitespace-nowrap overflow-hidden"
                  animate={{
                    opacity: 1,
                    width: "auto",
                  }}
                  style={{ display: "block" }}
                >
                  GitHub
                </motion.span>
              </Link>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content with adjusted margin for sidebar */}
      <div className="md:ml-[60px] transition-all duration-300">
        {/* Mobile top spacing */}
        <div className="md:hidden h-16">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-[#1E40AF]">JohoBlogs</span>
          </div>
        </div>

        {/* Hero Section with Animated Background */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-40 pb-40">
          {/* Animated Geometric Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Base gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-blue-500/[0.05] blur-3xl" />

            {/* Animated geometric shapes */}
            <ElegantShape
              delay={0.3}
              width={600}
              height={140}
              rotate={12}
              gradient="from-indigo-500/[0.15]"
              className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
            />
            <ElegantShape
              delay={0.5}
              width={500}
              height={120}
              rotate={-15}
              gradient="from-blue-500/[0.15]"
              className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
            />
            <ElegantShape
              delay={0.4}
              width={300}
              height={80}
              rotate={-8}
              gradient="from-violet-500/[0.15]"
              className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
            />
            <ElegantShape
              delay={0.6}
              width={200}
              height={60}
              rotate={20}
              gradient="from-indigo-400/[0.15]"
              className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
            />
            <ElegantShape
              delay={0.7}
              width={150}
              height={40}
              rotate={-25}
              gradient="from-blue-400/[0.15]"
              className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
            />
            <ElegantShape
              delay={0.8}
              width={250}
              height={70}
              rotate={18}
              gradient="from-violet-400/[0.15]"
              className="right-[30%] md:right-[35%] bottom-[15%] md:bottom-[20%]"
            />
          </div>

          {/* Existing gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/5 via-[#3B82F6]/3 to-transparent"></div>

          {/* Text readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/80 via-transparent to-[#0D1117]/60 pointer-events-none" />

          <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 md:gap-32 items-center relative z-10 max-w-8xl">
            <div className="space-y-16">
              <div
                className="space-y-12"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                  opacity: Math.max(0, 1 - scrollY * 0.001),
                }}
              >
                <div className="space-y-8">
                  <p className="text-[#1E40AF] font-semibold tracking-wider uppercase text-lg md:text-xl font-serif">
                    SMU Computer Science
                  </p>
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter font-serif">
                    Hey, I'm{" "}
                    <span className="bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#1E40AF] bg-clip-text text-transparent font-serif">
                      Jonathan
                    </span>
                  </h1>
                </div>
                <div className="space-y-6">
                  <ul className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl font-light space-y-4">
                    <li className="flex items-start space-x-3">
                      <span className="text-[#1E40AF] mt-2">•</span>
                      <span>Computer Science student at Singapore Management University (SMU)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-[#1E40AF] mt-2">•</span>
                      <span>Passionate about quantitative finance, econometrics, and statistical methods</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-[#1E40AF] mt-2">•</span>
                      <span>
                        Experienced in programming with extensive knowledge in quantitative finance and machine learning
                        techniques
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-[#1E40AF] mt-2">•</span>
                      <span>Fitness enthusiast focused on running and strength training</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-[#1E40AF] mt-2">•</span>
                      <span>Writer of Medium articles and Notion book reviews</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-[#1E40AF] mt-2">•</span>
                      <span>Dedicated to share insights and knowledge with my audience</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center space-x-8 md:space-x-12 text-lg md:text-xl text-white/60">
                  <div className="flex items-center space-x-4">
                    <TrendingUp className="w-6 h-6 text-[#1E40AF]" />
                    <span>CS, AI, Finance & Fitness Enthusiast</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <GraduationCap className="w-6 h-6 text-[#3B82F6]" />
                    <span>Singapore</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative"
              style={{
                transform: `translateY(${scrollY * -0.05}px) rotateX(${scrollY * 0.003}deg)`,
              }}
            >
              <div className="bg-[#161B22]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl hover:shadow-[#1E40AF]/10 transition-all duration-700 transform hover:scale-[1.02] relative overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center space-x-4 mb-6 md:mb-10">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-[#FF6B6B] rounded-full"></div>
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-[#FFD93D] rounded-full"></div>
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-[#1E40AF] rounded-full"></div>
                  <span className="text-white/60 text-lg md:text-xl ml-4 md:ml-8 font-mono tracking-wide">
                    jonathan's personal website ~ %
                  </span>
                </div>

                {/* Terminal Content */}
                <div className="font-mono text-lg md:text-xl space-y-3 min-h-[300px] md:min-h-[400px]">
                  {renderTerminalLines()}
                  <div className="text-[#1E40AF] font-semibold">
                    ${" "}
                    <span
                      className={`inline-block w-3 h-6 md:w-4 md:h-7 bg-[#1E40AF] ml-2 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
                    ></span>
                  </div>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E40AF]/5 via-transparent to-[#3B82F6]/5 rounded-3xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Projects Section with Animated Background Paths */}
        <section id="work" className="py-20 md:py-40 relative overflow-hidden">
          {/* Animated Background Paths */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.08] via-indigo-500/[0.05] to-blue-600/[0.08] opacity-60" />
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/20 via-transparent to-[#0D1117]/20" />
          </div>

          <div className="container mx-auto px-6 md:px-12 max-w-8xl relative z-10">
            <div className="text-center mb-16 md:mb-32">
              <h2 className="text-5xl md:text-7xl font-black mb-12 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent tracking-tight font-serif">
                Personal Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-32">
              {/* Medium Articles */}
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 group hover:shadow-2xl hover:shadow-[#1E40AF]/20 transition-all duration-700 transform hover:scale-[1.02] rounded-3xl relative overflow-hidden flex flex-col h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-end mb-6 md:mb-10">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-k3Jno4BrpvL2SbJ7u3v4lwBhknXxBm.png"
                        alt="Medium"
                        width={24}
                        height={24}
                        className="w-5 h-5 md:w-6 md:h-6"
                      />
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 md:mb-10 font-serif">
                    Medium Articles
                  </h3>

                  <p className="text-lg md:text-2xl text-white/80 leading-relaxed mb-6 md:mb-10 font-serif">
                    Sharing insights on artificial intelligence, quantitative finance, and technology trends. My
                    articles aim to bridge complex concepts with practical applications.
                  </p>

                  <div className="relative group-hover:scale-105 transition-transform duration-500 mb-6 md:mb-10">
                    <div className="flex items-center justify-center h-48 md:h-64 bg-black rounded-2xl border border-white/10 shadow-xl">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Medium%20Logo.jpg-fKRZNPiIifBrMJVvM2qwdGnjc1Gq2D.jpeg"
                        alt="Medium Logo"
                        width={200}
                        height={120}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="flex-grow mb-6 md:mb-10">
                    <div className="space-y-4">
                      <div className="border-l-4 border-[#1E40AF] pl-4 md:pl-6 hover:bg-white/5 p-3 md:p-4 rounded-r-2xl transition-all duration-300 cursor-pointer">
                        <h4 className="font-semibold text-white text-base md:text-lg mb-2">
                          Who Blinks First: Trump or Xi?
                        </h4>
                        <p className="text-white/70 text-sm">
                          The New Economic Cold War and the Battle for Global Supremacy...
                        </p>
                      </div>
                      <div className="border-l-4 border-[#3B82F6] pl-4 md:pl-6 hover:bg-white/5 p-3 md:p-4 rounded-r-2xl transition-all duration-300 cursor-pointer">
                        <h4 className="font-semibold text-white text-base md:text-lg mb-2">
                          Mean Reversion Strategies
                        </h4>
                        <p className="text-white/70 text-sm">
                          An Overview of Mean Reversion with their Underlying Concepts...
                        </p>
                      </div>
                      <div className="border-l-4 border-[#1E40AF] pl-4 md:pl-6 hover:bg-white/5 p-3 md:p-4 rounded-r-2xl transition-all duration-300 cursor-pointer">
                        <h4 className="font-semibold text-white text-base md:text-lg mb-2">
                          Market Dynamics: How Important is Academia in Today's Application of Finance?
                        </h4>
                        <p className="text-white/70 text-sm">
                          The relationship between academic theory and practical applications in modern finance...
                        </p>
                      </div>
                      <div className="border-l-4 border-[#3B82F6] pl-4 md:pl-6 hover:bg-white/5 p-3 md:p-4 rounded-r-2xl transition-all duration-300 cursor-pointer">
                        <h4 className="font-semibold text-white text-base md:text-lg mb-2">
                          2025: An Outlook on Markets
                        </h4>
                        <p className="text-white/70 text-sm">
                          A TLDR on Markets & My Opinion—Trump's Presidency, DeepSeek AI, and Impacts...
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link href="https://medium.com/@johoblogs" className="mt-auto">
                    <Button className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold shadow-xl hover:shadow-[#1E40AF]/25 transition-all duration-500 text-lg md:text-xl py-4 md:py-6 rounded-2xl">
                      Read Articles <ChevronRight className="w-5 h-5 md:w-6 md:h-6 ml-3" />
                    </Button>
                  </Link>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/5 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
              </Card>

              {/* Book Review Page */}
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 group hover:shadow-2xl hover:shadow-[#3B82F6]/20 transition-all duration-700 transform hover:scale-[1.02] rounded-3xl relative overflow-hidden flex flex-col h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-end mb-6 md:mb-10">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4LpdKkuJPFibpHMVIoqwaX3bEHeA5V.png"
                        alt="Notion"
                        width={24}
                        height={24}
                        className="w-5 h-5 md:w-6 md:h-6"
                      />
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 md:mb-10 font-serif">
                    Book Review Page
                  </h3>

                  <p className="text-lg md:text-2xl text-white/80 leading-relaxed mb-6 md:mb-10 font-serif">
                    Comprehensive reviews and insights from my reading journey. From finance classics to cutting-edge AI
                    research, I share key takeaways and practical applications.
                  </p>

                  <div className="relative group-hover:scale-105 transition-transform duration-500 mb-6 md:mb-10">
                    <div className="flex items-center justify-center h-48 md:h-64 bg-white rounded-2xl border border-white/10 shadow-xl">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Notion%20Logo-H5oUwygMPj2xcdIU9mOfjuYVpDg9sQ.png"
                        alt="Notion Logo"
                        width={120}
                        height={120}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="flex-grow mb-6 md:mb-10">
                    <ul className="text-white/80 space-y-3 text-base md:text-lg leading-relaxed">
                      <li className="flex items-start space-x-3">
                        <span className="text-[#3B82F6] mt-1">•</span>
                        <span>
                          My reviews cover a range of genres, including self-help, finance, philosophy and the various
                          sciences.
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-[#3B82F6] mt-1">•</span>
                        <span>I aim to provide insightful summaries and personal reflections on each book.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-[#3B82F6] mt-1">•</span>
                        <span>I'm more than happy to discuss and hear your thoughts on the books I review.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-[#3B82F6] mt-1">•</span>
                        <span>Feel free to explore my thoughts and recommendations to find your next great read!</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-[#3B82F6] mt-1">•</span>
                        <span>
                          <strong>Disclaimer:</strong> My reviews are based on personal perspectives and experiences.
                          Opinions on books may vary, so I encourage you to read and form your own views.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <Link
                    href="https://joholibrary.notion.site/Jonathan-s-Library-92e916b037f14ed38b8663a79aa3e6f6?pvs=74"
                    className="mt-auto"
                  >
                    <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold shadow-xl hover:shadow-[#3B82F6]/25 transition-all duration-500 text-lg md:text-xl py-4 md:py-6 rounded-2xl">
                      View Reviews <ChevronRight className="w-5 h-5 md:w-6 md:h-6 ml-3" />
                    </Button>
                  </Link>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
              </Card>
            </div>

            {/* Skills & Recommendations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
              {/* Technical Skills */}
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] rounded-3xl relative overflow-hidden">
                <div className="space-y-6 md:space-y-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Tech Stack</h3>
                    <Code className="w-8 h-8 md:w-10 md:h-10 text-[#1E40AF]" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1E40AF]/20 rounded-2xl flex items-center justify-center">
                        <Code className="w-5 h-5 md:w-6 md:h-6 text-[#1E40AF]" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg md:text-xl">Python</h4>
                        <p className="text-white/60">Core Language</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#3B82F6]/20 rounded-2xl flex items-center justify-center">
                        <Database className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg md:text-xl">SQL</h4>
                        <p className="text-white/60">Data Management</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1E40AF]/20 rounded-2xl flex items-center justify-center">
                        <Brain className="w-5 h-5 md:w-6 md:h-6 text-[#1E40AF]" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg md:text-xl">AI Engineering</h4>
                        <p className="text-white/60">Model Development</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#3B82F6]/20 rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg md:text-xl">ML</h4>
                        <p className="text-white/60">Machine Learning</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/5 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
              </Card>

              {/* Top 5 Reads Recommended */}
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] rounded-3xl relative overflow-hidden">
                <div className="space-y-6 md:space-y-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Top 5 Reads</h3>
                      <p className="text-white/60 text-base md:text-lg mt-2">In no particular order</p>
                    </div>
                    <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-[#3B82F6]" />
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center space-x-4 p-3 md:p-4 hover:bg-white/5 rounded-2xl transition-all duration-300 cursor-pointer">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-[#3B82F6] rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-base md:text-lg">
                          Jim Simons: The Man that Revolutionized the Market
                        </h4>
                        <p className="text-white/60 text-sm">Gregory Zuckerman</p>
                      </div>
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-[#FFD93D]" />
                    </div>
                    <div className="flex items-center space-x-4 p-3 md:p-4 hover:bg-white/5 rounded-2xl transition-all duration-300 cursor-pointer">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-[#3B82F6] rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-base md:text-lg">Shoe Dog</h4>
                        <p className="text-white/60 text-sm">Phil Knight</p>
                      </div>
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-[#FFD93D]" />
                    </div>
                    <div className="flex items-center space-x-4 p-3 md:p-4 hover:bg-white/5 rounded-2xl transition-all duration-300 cursor-pointer">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-[#3B82F6] rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-base md:text-lg">FAQ in Quantitative Finance</h4>
                        <p className="text-white/60 text-sm">Paul Wilmott</p>
                      </div>
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-[#FFD93D]" />
                    </div>
                    <div className="flex items-center space-x-4 p-3 md:p-4 hover:bg-white/5 rounded-2xl transition-all duration-300 cursor-pointer">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-[#3B82F6] rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-base md:text-lg">Inside the Black Box</h4>
                        <p className="text-white/60 text-sm">Rishi K. Narang</p>
                      </div>
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-[#FFD93D]" />
                    </div>
                    <div className="flex items-center space-x-4 p-3 md:p-4 hover:bg-white/5 rounded-2xl transition-all duration-300 cursor-pointer">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-[#3B82F6] rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-base md:text-lg">The Biggest Bluff</h4>
                        <p className="text-white/60 text-sm">Maria Konnikova</p>
                      </div>
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-[#FFD93D]" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section with Lamp Effect */}
        <LampContainer className="py-20 relative overflow-hidden min-h-screen">
          <section id="about" className="relative z-10 w-full pt-20 md:pt-40">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
              <motion.div
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="text-center mb-12 md:mb-20"
              >
                <h2 className="text-5xl md:text-7xl font-black mb-12 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent tracking-tight font-serif">
                  My Experience
                </h2>
              </motion.div>

              <div className="space-y-12 md:space-y-16 mt-16 md:mt-32">
                {/* SMU Computer Science */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] rounded-3xl relative overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                    <div className="space-y-6 md:space-y-10">
                      <div className="flex items-center space-x-4 md:space-x-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-3xl flex items-center justify-center">
                          <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <div>
                          <Badge className="bg-[#1E40AF]/20 text-[#1E40AF] border-[#1E40AF]/30 px-4 md:px-6 py-2 md:py-3 text-lg md:text-xl font-semibold mb-3 rounded-2xl">
                            Current
                          </Badge>
                          <p className="text-white/60 text-lg md:text-xl">2025 - 2029</p>
                        </div>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-serif">
                        SMU Computer Science
                      </h3>
                      <p className="text-lg md:text-2xl text-white/80 leading-relaxed">
                        Pursuing Computer Science at Singapore Management University with a focus on Artificial
                        Intelligence. Exploring the intersection of technology and human intelligence while building
                        practical AI solutions.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Badge
                          variant="outline"
                          className="border-white/20 text-white/80 hover:bg-white/10 transition-colors text-lg md:text-xl py-2 md:py-3 px-4 md:px-6 rounded-2xl"
                        >
                          Artificial Intelligence
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-white/20 text-white/80 hover:bg-white/10 transition-colors text-lg md:text-xl py-2 md:py-3 px-4 md:px-6 rounded-2xl"
                        >
                          Machine Learning
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-white/20 text-white/80 hover:bg-white/10 transition-colors text-lg md:text-xl py-2 md:py-3 px-4 md:px-6 rounded-2xl"
                        >
                          Data Science
                        </Badge>
                      </div>
                    </div>
                    <div className="relative">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HXh971lXYVLkaITULzJbLunkW37nTs.png"
                        alt="SMU Logo"
                        width={700}
                        height={500}
                        className="rounded-3xl border border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/5 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
                </Card>

                {/* WhiteCoat Internship */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 group hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] rounded-3xl relative overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                    <div className="relative order-2 lg:order-1">
                      <div className="flex items-center justify-center h-[300px] md:h-[500px] bg-white rounded-3xl border border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0LhwfXgO90UYilpWyemOp9t8epbRoh.png"
                          alt="WhiteCoat Logo"
                          width={400}
                          height={400}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="space-y-6 md:space-y-10 order-1 lg:order-2">
                      <div className="flex items-center space-x-4 md:space-x-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] rounded-3xl flex items-center justify-center">
                          <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <div>
                          <Badge className="bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/30 px-4 md:px-6 py-2 md:py-3 text-lg md:text-xl font-semibold mb-3 rounded-2xl">
                            Internship
                          </Badge>
                          <p className="text-white/60 text-lg md:text-xl">May - August 2025</p>
                        </div>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-serif">
                        Product & Data Intern
                      </h3>
                      <p className="text-lg md:text-2xl text-white/80 leading-relaxed font-serif">
                        WhiteCoat Internship
                      </p>
                      <ul className="text-lg md:text-xl text-white/80 leading-relaxed space-y-3">
                        <li className="flex items-start space-x-3">
                          <span className="text-[#3B82F6] mt-1">•</span>
                          <span>
                            Conducted comprehensive data analytics across multiple business dashboards using SQL,
                            Databricks, and Metabase to drive strategic decision-making
                          </span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-[#3B82F6] mt-1">•</span>
                          <span>
                            Executed product quality assurance and regression testing to ensure optimal platform
                            performance and user experience
                          </span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-[#3B82F6] mt-1">•</span>
                          <span>
                            Developed and deployed NLP sentiment analysis models using Hugging Face transformers to
                            analyze patient feedback, with daily automated production runs informing business strategy
                          </span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-[#3B82F6] mt-1">•</span>
                          <span>
                            Applied AI and prompt engineering techniques to optimize workflows and enhance operational
                            efficiency
                          </span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-[#3B82F6] mt-1">•</span>
                          <span>
                            Collaborated cross-functionally to translate data insights into actionable business
                            recommendations
                          </span>
                        </li>
                      </ul>
                      <div className="flex flex-wrap gap-4">
                        <Badge
                          variant="outline"
                          className="border-white/20 text-white/80 hover:bg-white/10 transition-colors text-lg md:text-xl py-2 md:py-3 px-4 md:px-6 rounded-2xl"
                        >
                          Data Analytics
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-white/20 text-white/80 hover:bg-white/10 transition-colors text-lg md:text-xl py-2 md:py-3 px-4 md:px-6 rounded-2xl"
                        >
                          NLP & AI
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-white/20 text-white/80 hover:bg-white/10 transition-colors text-lg md:text-xl py-2 md:py-3 px-4 md:px-6 rounded-2xl"
                        >
                          Product Testing
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Company Description - Moved to bottom */}
                  <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
                    <p className="text-base md:text-lg text-white/60 leading-relaxed italic font-light">
                      WhiteCoat is Southeast Asia's premier omnichannel healthcare platform, delivering comprehensive
                      on-demand telemedicine and in-person consultations. The platform seamlessly connects patients with
                      GPs, specialists, and allied healthcare providers while offering integrated medication delivery
                      services across the region.
                    </p>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
                </Card>
              </div>
            </div>
          </section>
        </LampContainer>

        {/* Contact Section with Aurora Background */}
        <AuroraBackground className="py-20 md:py-40 relative" showRadialGradient={false}>
          <section id="contact" className="relative z-10">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
              <div className="text-center mb-16 md:mb-32 font-serif">
                <h2 className="text-5xl md:text-7xl font-black mb-12 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent tracking-tight">
                  Get in Touch
                </h2>
                <p className="text-2xl md:text-3xl text-white/70 max-w-4xl mx-auto font-light leading-relaxed font-serif">
                  Let's connect and explore opportunities together.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
                {/* Contact Form */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8 md:p-16 rounded-3xl relative overflow-hidden">
                  <div className="space-y-6 md:space-y-10">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 tracking-tight font-serif">
                        Send a Message
                      </h3>
                      <p className="text-white/70 text-lg md:text-xl">I'd love to hear from you</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="relative">
                          <User className="absolute left-4 md:left-6 top-4 md:top-6 w-5 h-5 md:w-6 md:h-6 text-white/40" />
                          <Input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-12 md:pl-16 bg-white/5 border-white/20 focus:border-[#1E40AF] focus:ring-[#1E40AF] transition-all duration-300 text-white placeholder:text-white/50 text-lg md:text-xl py-4 md:py-6 rounded-2xl"
                            required
                          />
                        </div>
                        <div className="relative">
                          <AtSign className="absolute left-4 md:left-6 top-4 md:top-6 w-5 h-5 md:w-6 md:h-6 text-white/40" />
                          <Input
                            type="email"
                            name="email"
                            placeholder="your.email@domain.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-12 md:pl-16 bg-white/5 border-white/20 focus:border-[#1E40AF] focus:ring-[#1E40AF] transition-all duration-300 text-white placeholder:text-white/50 text-lg md:text-xl py-4 md:py-6 rounded-2xl"
                            required
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <FileText className="absolute left-4 md:left-6 top-4 md:top-6 w-5 h-5 md:w-6 md:h-6 text-white/40" />
                        <Input
                          type="text"
                          name="subject"
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="pl-12 md:pl-16 bg-white/5 border-white/20 focus:border-[#1E40AF] focus:ring-[#1E40AF] transition-all duration-300 text-white placeholder:text-white/50 text-lg md:text-xl py-4 md:py-6 rounded-2xl"
                          required
                        />
                      </div>

                      <div className="relative">
                        <MessageCircle className="absolute left-4 md:left-6 top-4 md:top-6 w-5 h-5 md:w-6 md:h-6 text-white/40" />
                        <Textarea
                          name="message"
                          placeholder="Tell me about your project, idea, or just say hello!"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className="pl-12 md:pl-16 bg-white/5 border-white/20 focus:border-[#1E40AF] focus:ring-[#1E40AF] transition-all duration-300 text-white placeholder:text-white/50 text-lg md:text-xl py-4 md:py-6 rounded-2xl resize-none"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold shadow-2xl hover:shadow-[#1E40AF]/25 transition-all duration-500 transform hover:scale-[1.02] disabled:transform-none disabled:hover:bg-[#1E40AF] text-lg md:text-xl py-4 md:py-6 rounded-2xl"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 md:w-6 md:h-6 mr-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 md:w-6 md:h-6 mr-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/5 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
                </Card>

                {/* Contact Info */}
                <div className="space-y-6 md:space-y-10">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-10 tracking-tight font-serif">
                      Other Ways to Reach Me
                    </h3>
                    <div className="space-y-6 md:space-y-8">
                      <Link
                        href="mailto:jonathanhosa04@gmail.com"
                        className="flex items-center space-x-6 md:space-x-8 p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:shadow-xl hover:shadow-[#1E40AF]/10 transition-all duration-500 transform hover:scale-[1.02] group cursor-pointer"
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1E40AF]/20 rounded-2xl flex items-center justify-center group-hover:bg-[#1E40AF]/30 transition-colors duration-300">
                          <Mail className="w-8 h-8 md:w-10 md:h-10 text-[#1E40AF]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white text-xl md:text-2xl">Email</h4>
                          <p className="text-white/70 text-lg md:text-xl">jonathanhosa04@gmail.com</p>
                        </div>
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white/40 group-hover:text-[#1E40AF] transition-colors duration-300" />
                      </Link>

                      <Link
                        href="https://www.linkedin.com/in/jonathan-ho-3429b1283/"
                        className="flex items-center space-x-6 md:space-x-8 p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:shadow-xl hover:shadow-[#1E40AF]/10 transition-all duration-500 transform hover:scale-[1.02] group"
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1E40AF]/20 rounded-2xl flex items-center justify-center group-hover:bg-[#1E40AF]/30 transition-colors duration-300">
                          <Linkedin className="w-8 h-8 md:w-10 md:h-10 text-[#1E40AF]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white text-xl md:text-2xl">LinkedIn</h4>
                          <p className="text-white/70 text-lg md:text-xl">Professional networking</p>
                        </div>
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white/40 group-hover:text-[#1E40AF] transition-colors duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AuroraBackground>

        {/* Footer */}
        <footer className="py-12 md:py-20 border-t border-white/10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
              <div className="space-y-4">
                <div className="text-white/60 text-lg md:text-xl">© 2025 Jonathan Ho</div>
                <div className="text-white/60 text-base md:text-lg">All Rights Reserved</div>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg md:text-xl">Disclaimer:</h4>
                <p className="text-white/60 text-base md:text-lg leading-relaxed">
                  Nothing on this website constitutes, or is meant to constitute, advice of any kind. This site exists
                  for informational purposes only. Should you require any advice, in relation to any legal, financial
                  matter, please consult an appropriate professional.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
              <div className="flex items-center space-x-6 md:space-x-10">
                <Link
                  href="mailto:jonathanhosa04@gmail.com"
                  className="text-white/60 hover:text-white hover:underline transition-all duration-300 font-medium text-lg md:text-xl cursor-pointer"
                >
                  jonathanhosa04@gmail.com
                </Link>
                <Link
                  href="https://www.linkedin.com/in/jonathan-ho-3429b1283/"
                  className="text-white/60 hover:text-[#1E40AF] transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="w-6 h-6 md:w-7 md:h-7" />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
