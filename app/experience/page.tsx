"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Timeline } from "@/components/ui/timeline"

export default function ExperiencePage() {
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

  const timelineData = [
    {
      title: "2025",
      content: (
        <div className="space-y-6">
          {/* WhiteCoat */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/whitecoat-logo.png"
                  alt="WhiteCoat"
                  width={48}
                  height={48}
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">WhiteCoat</h2>
              </div>
            </div>

            <div className="text-white/80 font-medium">Product & Data Intern | May 2025 - August 2025</div>

            <p className="text-white/60 leading-relaxed text-sm">
              WhiteCoat is Southeast Asia's premier omnichannel healthcare platform, delivering comprehensive on-demand
              telemedicine and in-person consultations.
            </p>

            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span>
                  Conducted comprehensive data analytics across multiple business dashboards using SQL, Databricks, and
                  Metabase
                </span>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span>Developed and deployed NLP sentiment analysis models using Hugging Face transformers</span>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span>Applied AI and prompt engineering techniques to optimize workflows</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2">
              {["Data Analytics", "NLP & AI", "Product Testing"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs border border-blue-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 w-full sm:w-fit">
              <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden border border-white/[0.08] hover:border-blue-500/30 transition-colors">
                <Image
                  src="/images/whitecoat-1.png"
                  alt="WhiteCoat team photo 1"
                  width={192}
                  height={128}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden border border-white/[0.08] hover:border-blue-500/30 transition-colors">
                <Image
                  src="/images/whitecoat-2.png"
                  alt="WhiteCoat team photo 2"
                  width={192}
                  height={128}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden border border-white/[0.08] hover:border-blue-500/30 transition-colors">
                <Image
                  src="/images/whitecoat-3.png"
                  alt="WhiteCoat team photo 3"
                  width={192}
                  height={128}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden border border-white/[0.08] hover:border-blue-500/30 transition-colors">
                <Image
                  src="/images/whitecoat-4.png"
                  alt="WhiteCoat team photo 4"
                  width={192}
                  height={128}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2025 - 2029",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
              <Image src="/images/smu-logo.png" alt="SMU" width={48} height={48} className="object-contain p-1" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">SMU Computer Science</h2>
            </div>
          </div>

          <div className="text-white/80 font-medium">Bachelor's Degree | 2025 - 2029</div>

          <p className="text-white/60 leading-relaxed text-sm">
            Pursuing Computer Science at Singapore Management University with a focus on Artificial Intelligence.
            Exploring the intersection of technology and human intelligence while building practical AI solutions.
          </p>

          <div className="flex flex-wrap gap-2">
            {["Linear Algebra", "Discrete Mathematics", "Python", "C Programming", "SQL"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs border border-blue-500/20"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:flex sm:flex-row gap-2 pt-2">
            <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden border border-white/[0.08] hover:border-blue-500/30 transition-colors">
              <Image
                src="/images/smu-1.png"
                alt="SMU classroom with code"
                width={192}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden border border-white/[0.08] hover:border-blue-500/30 transition-colors">
              <Image
                src="/images/smu-2.png"
                alt="SMU WorkWell presentation"
                width={192}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden border border-white/[0.08] hover:border-blue-500/30 transition-colors">
              <Image
                src="/images/smu-3.png"
                alt="SMU classroom group"
                width={192}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-indigo-500/[0.05] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">
        {/* Back button */}
        <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="pt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-blue-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </motion.div>

        {/* Header */}
        <div className="py-12 md:py-16">
          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl md:text-5xl mb-4 text-white font-bold"
          >
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">Journey</span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-white/40 text-base md:text-lg max-w-2xl"
          >
            A quick snapshot of everything so far
          </motion.p>
        </div>
      </div>

      <Timeline data={timelineData} />

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
    </main>
  )
}
