"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0D1117] w-full z-0",
        className,
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "30rem" }}
          whileInView={{ opacity: 1, width: "80rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-96 overflow-visible w-[80rem] bg-gradient-conic from-blue-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-[#0D1117] h-60 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-60 h-[100%] left-0 bg-[#0D1117] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "30rem" }}
          whileInView={{ opacity: 1, width: "80rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-96 w-[80rem] bg-gradient-conic from-transparent via-transparent to-blue-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-60 h-[100%] right-0 bg-[#0D1117] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-[#0D1117] h-60 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-80 w-full translate-y-12 scale-x-200 bg-[#0D1117] blur-3xl"></div>
        <div className="absolute top-1/2 z-50 h-80 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-60 w-[60rem] -translate-y-1/2 rounded-full bg-blue-600 opacity-40 blur-3xl"></div>
        <motion.div
          initial={{ width: "16rem" }}
          whileInView={{ width: "40rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-60 w-[40rem] -translate-y-[8rem] rounded-full bg-blue-500 blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ width: "30rem" }}
          whileInView={{ width: "70rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-1 w-[70rem] -translate-y-[10rem] bg-blue-400"
        ></motion.div>
        <div className="absolute inset-auto z-40 h-60 w-full -translate-y-[16rem] bg-[#0D1117]"></div>
      </div>
      <div className="relative z-50 flex -translate-y-40 flex-col items-center px-5 w-full">{children}</div>
    </div>
  )
}
