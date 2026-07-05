"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedHighlight, AnimatedBoxHighlight } from "@/components/ui/animated-highlight"
import { ShootingStars } from "@/components/ui/shooting-stars"

export default function AboutPage() {
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

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-indigo-500/[0.05] blur-3xl" />

      {/* Shooting stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ShootingStars
          starColor="#3B82F6"
          trailColor="#60A5FA"
          minSpeed={15}
          maxSpeed={35}
          minDelay={800}
          maxDelay={2500}
          starWidth={12}
          starHeight={2}
        />
        <ShootingStars
          starColor="#6366F1"
          trailColor="#818CF8"
          minSpeed={10}
          maxSpeed={25}
          minDelay={1500}
          maxDelay={3500}
          starWidth={8}
          starHeight={1}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
        {/* Back button */}
        <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </motion.div>

        <header className="mb-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex-1">
            <motion.h1
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-serif text-white mb-4 tracking-tight"
            >
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">Me</span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-xl text-white/40"
            >
              A bit about myself.
            </motion.p>
          </div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-end items-end"
          >
            {/* Photo 1 - Running */}
            <motion.div
              className="relative w-28 h-40 md:w-32 md:h-48 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-xl shadow-blue-500/10"
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image src="/images/image-me-3.webp" alt="Jonathan - running" fill className="object-cover object-top" />
            </motion.div>

            {/* Photo 2 - Reading */}
            <motion.div
              className="relative w-28 h-40 md:w-32 md:h-48 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/images/about-reading.png"
                alt="Jonathan - reading a book"
                fill
                className="object-cover object-[center_55%]"
              />
            </motion.div>

            {/* Photo 3 - Presenting */}
            <motion.div
              className="relative w-28 h-40 md:w-32 md:h-48 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl"
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/images/about-presenting.png"
                alt="Jonathan - presenting"
                fill
                className="object-cover object-[center_65%]"
              />
            </motion.div>

            {/* Photo 4 - Fitness competition */}
            <motion.div
              className="relative w-28 h-40 md:w-32 md:h-48 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/images/about-fitness.png"
                alt="Jonathan - fitness competition"
                fill
                className="object-cover object-[center_35%]"
              />
            </motion.div>

            {/* Photo 5 - Cradle Mountain */}
            <motion.div
              className="relative w-28 h-40 md:w-32 md:h-48 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl"
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/images/about-mountain.png"
                alt="Jonathan - Cradle Mountain"
                fill
                className="object-cover object-[30%_70%]"
              />
            </motion.div>
          </motion.div>
        </header>

        {/* Content - Flowing text with selective highlights */}
        <div className="space-y-10">
          {/* Paragraph 1 - Education & Interests */}
          <motion.section custom={4} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-white/70 leading-relaxed text-lg md:text-xl">
              I am studying Information Systems at{" "}
              <AnimatedHighlight color="blue" delay={0.2}>
                Singapore Management University (SMU)
              </AnimatedHighlight>
              , with a specialization in Financial Technology. Since my National Service days, I have been drawn to{" "}
              <AnimatedBoxHighlight color="red" delay={0.4}>
                financial markets
              </AnimatedBoxHighlight>{" "}
              and{" "}
              <AnimatedBoxHighlight color="red" delay={0.6}>
                macro research
              </AnimatedBoxHighlight>{" "}
              where global events, policy shifts, and capital flows connect and play out over time.
            </p>
          </motion.section>

          {/* Paragraph 2 - Technical Foundation */}
          <motion.section custom={5} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-white/70 leading-relaxed text-lg md:text-xl">
              Alongside that, I have a strong technical foundation across both{" "}
              <AnimatedBoxHighlight color="red" delay={0.8}>
                hardware
              </AnimatedBoxHighlight>{" "}
              and{" "}
              <AnimatedBoxHighlight color="red" delay={1.0}>
                software equities
              </AnimatedBoxHighlight>
              , and I have a solid grasp of statistical models and machine learning techniques and how they apply to
              real-world problems, especially when grounded in solid data and evidence.
            </p>
          </motion.section>

          {/* Paragraph 3 - Personal Interests */}
          <motion.section custom={6} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-white/70 leading-relaxed text-lg md:text-xl">
              Outside of school, you will often find me running, in the gym working on strength training, or just
              taking some time to clear my head through exercise. I also spend a lot of time reading, whether it&apos;s
              biographies, economics, geopolitics, or philosophy, and turning those ideas into writing. Sometimes that
              looks like longer reflections on Medium, other times it is more structured book reviews on Notion.
              Writing helps me organise my thoughts and see what I truly understand.
            </p>
          </motion.section>

          {/* Paragraph 4 - Teaching & Sharing */}
          <motion.section custom={7} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-white/70 leading-relaxed text-lg md:text-xl">
              I really enjoy <span className="text-white font-semibold">sharing what I learn with others</span>,
              especially topics that might seem intimidating at first. This began back in Junior College, where I
              founded a peer tutoring initiative that still continues today. My goal is to make complex ideas feel more
              approachable, practical, and maybe even enjoyable.
            </p>
          </motion.section>

          {/* Paragraph 5 - Call to Action */}
          <motion.section custom={8} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-white/70 leading-relaxed text-lg md:text-xl">
              Feel free to connect and have a conversation about your ideas, whether they are related to finance, tech,
              markets, or anything in between.
            </p>
          </motion.section>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </main>
  )
}
