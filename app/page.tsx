"use client"
import Image from "next/image"
import { User, Briefcase, FolderOpen, Send } from "lucide-react"
import { motion } from "framer-motion"
import { ElegantShape } from "@/components/ui/elegant-shape"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Meteors } from "@/components/ui/meteors"
import { HoverBackground } from "@/components/ui/hover-background"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams"
import { GridGlow } from "@/components/ui/grid-glow"
import { Sparkles } from "@/components/ui/sparkles"
import { InteractiveRobot } from "@/components/ui/interactive-robot"

export default function Home() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <BackgroundBeamsWithCollision className="min-h-screen">
      <main className="relative min-h-screen w-full overflow-hidden bg-[#030303] dark:bg-[#030303]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-indigo-500/[0.05] blur-3xl" />

        {/* Elegant shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-blue-500/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-indigo-500/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-cyan-500/[0.15]"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />
          <ElegantShape
            delay={0.6}
            width={200}
            height={60}
            rotate={20}
            gradient="from-blue-400/[0.15]"
            className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          />
          <ElegantShape
            delay={0.7}
            width={150}
            height={40}
            rotate={-25}
            gradient="from-sky-500/[0.15]"
            className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
          {/* Header */}
          <header className="mb-12 md:mb-16 text-center">
            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mb-4 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">Hey, I'm</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">
                  Jonathan
                </span>
              </h1>
            </motion.div>
          </header>

          {/* Animated Bento Grid */}
          <BentoGrid className="grid-cols-1 md:grid-cols-2 auto-rows-[200px] gap-4">
            <BentoCard
              name="About"
              className="col-span-1"
              Icon={User}
              description="A bit about myself."
              href="/about"
              cta="Learn more"
              background={
                <>
                  <Meteors number={15} />
                  <div className="absolute bottom-4 right-4 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity">
                    <Image
                      src="/images/image.png"
                      alt="Avatar"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </>
              }
            />

            <BentoCard
              name="Projects"
              className="col-span-1"
              Icon={FolderOpen}
              description="Personal projects I've been working on."
              href="/projects"
              cta="View projects"
              background={
                <>
                  <HoverBackground objectCount={8} />
                  <div className="absolute bottom-0 right-0 w-28 h-28 md:w-32 md:h-32 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-auto">
                    <InteractiveRobot className="w-full h-full" />
                  </div>
                </>
              }
            />

            {/* Experience Card */}
            <BentoCard
              name="Experience"
              className="col-span-1"
              Icon={Briefcase}
              description="Internships & Education"
              href="/experience"
              cta="View experience"
              background={
                <>
                  <GridGlow />
                  <div className="absolute bottom-4 right-4 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity">
                    <Image
                      src="/images/avatar-desk.png"
                      alt="Studying"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                </>
              }
            />

            {/* Contact Card */}
            <BentoCard
              name="Contact"
              className="col-span-1"
              Icon={Send}
              description="Email, LinkedIn, carrier pigeon..."
              href="/contact"
              cta="Get in touch"
              background={
                <>
                  <Sparkles count={15} />
                  <div className="absolute bottom-4 right-4 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity">
                    <Image
                      src="/images/contact-avatar.png"
                      alt="Contact me"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </>
              }
            />
          </BentoGrid>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-16 md:mt-20 pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
              {/* Left side - Copyright */}
              <div className="space-y-2">
                <p className="text-white/60 text-sm">© 2025 Jonathan Ho</p>
                <p className="text-white/40 text-sm">All Rights Reserved</p>
              </div>

              {/* Right side - Disclaimer */}
              <div className="max-w-lg">
                <h4 className="text-white/80 font-medium mb-2">Disclaimer:</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  Nothing on this website constitutes, or is meant to constitute, advice of any kind. This site exists
                  for informational purposes only. Should you require any advice, in relation to any legal, financial
                  matter, please consult an appropriate professional.
                </p>
              </div>
            </div>

            {/* Bottom - Email and Social */}
            <div className="flex items-center justify-center gap-6 pt-6 border-t border-white/10">
              <a
                href="mailto:jonathanhosa04@gmail.com"
                className="text-white/50 hover:text-blue-400 transition-colors text-sm"
              >
                jonathanhosa04@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/jonathan-ho-3429b1283/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-blue-400 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </motion.footer>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </main>
    </BackgroundBeamsWithCollision>
  )
}
