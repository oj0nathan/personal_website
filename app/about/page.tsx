"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import { AnimatedHighlight, AnimatedBoxHighlight } from "@/components/ui/animated-highlight"
import ScrollAdventure, { type ScrollAdventureSection } from "@/components/ui/animated-scroll"

function Chapter({ index, label, children }: { index: string; label: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl space-y-5 md:space-y-7">
      <p className="text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-blue-400/80">
        {index} <span className="text-white/30">—</span> {label}
      </p>
      {children}
    </div>
  )
}

const prose = "text-white/75 leading-relaxed text-[15px] md:text-xl xl:text-[1.6rem] xl:leading-[1.6]"

const sections: ScrollAdventureSection[] = [
  {
    imageSide: "left",
    images: [
      { src: "/images/about-dress-shirt.webp", alt: "Jonathan smiling in a white dress shirt", position: "center 60%" },
      { src: "/images/about-presenting.png", alt: "Jonathan presenting", position: "center 65%" },
    ],
    content: (
      <Chapter index="01" label="Background">
        <h1 className="text-4xl md:text-6xl xl:text-7xl font-serif text-white tracking-tight">
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">Me</span>
        </h1>
        <p className={prose}>
          I am studying Information Systems at{" "}
          <AnimatedHighlight color="blue" delay={0.4}>
            Singapore Management University (SMU)
          </AnimatedHighlight>
          , with a specialization in Financial Technology. Since my National Service days, I have been drawn to{" "}
          <AnimatedBoxHighlight color="red" delay={0.6}>
            financial markets
          </AnimatedBoxHighlight>{" "}
          and{" "}
          <AnimatedBoxHighlight color="red" delay={0.8}>
            macro research
          </AnimatedBoxHighlight>{" "}
          where global events, policy shifts, and capital flows connect and play out over time.
        </p>
        <p className={prose}>
          Alongside that, I have a strong technical foundation across both{" "}
          <AnimatedBoxHighlight color="red" delay={1.0}>
            hardware
          </AnimatedBoxHighlight>{" "}
          and{" "}
          <AnimatedBoxHighlight color="red" delay={1.2}>
            software equities
          </AnimatedBoxHighlight>
          , and I have a solid grasp of statistical models and machine learning techniques and how they apply to
          real-world problems, especially when grounded in solid data and evidence.
        </p>
      </Chapter>
    ),
  },
  {
    imageSide: "right",
    images: [
      { src: "/images/about-fitness.png", alt: "Jonathan at a Hyrox fitness competition", position: "center 35%" },
      { src: "/images/about-running.webp", alt: "Jonathan running on a track", position: "center 40%" },
    ],
    content: (
      <Chapter index="02" label="Outside of school">
        <p className={prose}>
          Outside of school, you will often find me{" "}
          <AnimatedHighlight color="blue" delay={0.9}>
            running
          </AnimatedHighlight>
          , in the gym working on{" "}
          <AnimatedHighlight color="blue" delay={1.1}>
            strength training
          </AnimatedHighlight>
          , or just taking some time to clear my head through exercise. I also spend a lot of time{" "}
          <AnimatedBoxHighlight color="red" delay={1.3}>
            reading
          </AnimatedBoxHighlight>
          , whether it&apos;s biographies, economics, geopolitics, or philosophy, and turning those ideas into{" "}
          <AnimatedBoxHighlight color="red" delay={1.5}>
            writing
          </AnimatedBoxHighlight>
          . Sometimes that looks like longer reflections on Medium, other times it is more structured book reviews on
          Notion. Writing helps me organise my thoughts and{" "}
          <AnimatedHighlight color="blue" delay={1.7}>
            see what I truly understand
          </AnimatedHighlight>
          .
        </p>
      </Chapter>
    ),
  },
  {
    imageSide: "left",
    images: [{ src: "/images/about-reading.png", alt: "Jonathan reading a book", position: "center 55%" }],
    content: (
      <Chapter index="03" label="Sharing what I learn">
        <p className={prose}>
          I really enjoy{" "}
          <AnimatedHighlight color="blue" delay={0.9}>
            sharing what I learn with others
          </AnimatedHighlight>
          , especially topics that might seem intimidating at first. This began back in Junior College, where I founded
          a{" "}
          <AnimatedBoxHighlight color="red" delay={1.2}>
            peer tutoring initiative
          </AnimatedBoxHighlight>{" "}
          that still continues today. My goal is to make complex ideas feel more{" "}
          <AnimatedHighlight color="blue" delay={1.5}>
            approachable, practical, and maybe even enjoyable
          </AnimatedHighlight>
          .
        </p>
      </Chapter>
    ),
  },
  {
    imageSide: "right",
    images: [{ src: "/images/about-mountain.png", alt: "Jonathan at Cradle Mountain", position: "30% 75%" }],
    content: (
      <Chapter index="04" label="Let's talk">
        <p className={prose}>
          Feel free to{" "}
          <AnimatedHighlight color="blue" delay={0.9}>
            connect and have a conversation
          </AnimatedHighlight>{" "}
          about your ideas, whether they are related to{" "}
          <AnimatedBoxHighlight color="red" delay={1.1}>
            finance
          </AnimatedBoxHighlight>
          ,{" "}
          <AnimatedBoxHighlight color="red" delay={1.3}>
            tech
          </AnimatedBoxHighlight>
          ,{" "}
          <AnimatedBoxHighlight color="red" delay={1.5}>
            markets
          </AnimatedBoxHighlight>
          , or anything in between.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-blue-400/60 hover:text-blue-300"
        >
          Get in touch
        </Link>
      </Chapter>
    ),
  },
]

export default function AboutPage() {
  return (
    <main className="relative w-full bg-[#030303]">
      <ScrollAdventure
        sections={sections}
        overlay={
          <div className="p-4 md:p-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-sm text-white/80 backdrop-blur transition-colors hover:text-blue-400"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
          </div>
        }
      />
    </main>
  )
}
