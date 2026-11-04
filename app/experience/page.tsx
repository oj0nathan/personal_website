"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Timeline } from "@/components/ui/timeline"
import PolaroidLineCarousel, { type Slide } from "@/components/ui/polaroid-line-carousel"

// Every print is a 4:3 landscape so group shots fit; `position` keeps everyone in frame on the portrait photos.
// No titles, so the prints are photo only; `alt` still describes each one. Clicking the centre print enlarges it.
const capitalPhotos: Slide[] = [
  { image: "/images/capital-1.png", alt: "Capital Group summer interns", position: "center 60%" },
  { image: "/images/capital-2.png", alt: "Dinner with the Capital Group interns", position: "center 45%" },
  { image: "/images/capital-3.png", alt: "Capital Group team outing at Gardens by the Bay", position: "center 92%" },
]

const whiteCoatPhotos: Slide[] = [
  { image: "/images/whitecoat-2.png", alt: "WhiteCoat interns at the office", position: "center 48%" },
  { image: "/images/whitecoat-1.png", alt: "At the WhiteCoat front desk", position: "center 55%" },
  { image: "/images/whitecoat-3.png", alt: "With a colleague at WhiteCoat", position: "center 45%" },
  { image: "/images/whitecoat-4.png", alt: "With the WhiteCoat team", position: "center 35%" },
]

const smuPhotos: Slide[] = [
  { image: "/images/smu-class-1.webp", alt: "SMU class photo", position: "center 55%" },
  { image: "/images/smu-class-2.webp", alt: "SMU project team photo", position: "center 100%" },
]

/** A line of polaroids for an entry's photos, on a faint panel so it reads as part of the card above. */
function PhotoLine({ slides, label }: { slides: Slide[]; label: string }) {
  return (
    <div className="mt-2 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      <PolaroidLineCarousel
        slides={slides}
        height={560}
        cardWidth={380}
        fill={0.68}
        aspect={4 / 3}
        sag={22}
        autoplay={5000}
        string="rgba(255,255,255,0.35)"
        background="transparent"
        ink="#e5e7eb"
        ariaLabel={label}
      />
    </div>
  )
}

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
      title: "2026",
      content: (
        <div className="space-y-6">
          {/* Capital Group */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/capital-group-logo.png"
                  alt="Capital Group"
                  width={48}
                  height={48}
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Capital Group</h2>
              </div>
            </div>

            <div className="text-white/85 font-medium text-base md:text-lg">Asset Management Summer Associate | May 2026 - July 2026</div>

            <p className="text-white/65 leading-relaxed text-base md:text-lg">
              Since 1931, Capital Group has been dedicated to improving people&apos;s lives through successful
              investing. Capital Group&apos;s commitment to that mission has fostered lasting relationships with
              investors and financial intermediaries built on trust, integrity, excellent service and investment
              results. Today, Capital Group manages over $3.2 trillion in assets, with more than 9,000 associates
              working across 33 offices around the world, making it one of the world&apos;s largest active investment
              managers.
            </p>

            <PhotoLine slides={capitalPhotos} label="Capital Group photos" />
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div className="space-y-6">
          {/* WhiteCoat */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/whitecoat-logo.png"
                  alt="WhiteCoat"
                  width={48}
                  height={48}
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">WhiteCoat</h2>
              </div>
            </div>

            <div className="text-white/85 font-medium text-base md:text-lg">Product & Data Intern | May 2025 - August 2025</div>

            <p className="text-white/65 leading-relaxed text-base md:text-lg">
              WhiteCoat is Southeast Asia's premier omnichannel healthcare platform, delivering comprehensive on-demand
              telemedicine and in-person consultations.
            </p>

            <PhotoLine slides={whiteCoatPhotos} label="WhiteCoat photos" />
          </div>
        </div>
      ),
    },
    {
      title: "2025 - 2029",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
              <Image src="/images/smu-logo.png" alt="SMU" width={48} height={48} className="object-contain p-1" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">SMU Information Systems</h2>
            </div>
          </div>

          <div className="text-white/85 font-medium text-base md:text-lg">Bachelor's Degree | 2025 - 2029</div>

          <p className="text-white/65 leading-relaxed text-base md:text-lg">
            Pursuing Information Systems at Singapore Management University, majoring in Financial Technology.
            Exploring the intersection of finance and technology through financial markets.
          </p>

          <PhotoLine slides={smuPhotos} label="SMU photos" />
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
