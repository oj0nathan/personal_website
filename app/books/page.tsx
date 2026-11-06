import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Bookshelf } from "@/components/books/bookshelf"
import { BooksRead } from "@/components/books/books-read"
import { IconHover3D } from "@/components/ui/icon-3d-hover"
import { summaries } from "@/lib/books"

export const metadata: Metadata = {
  title: "Jonathan's Library - Book Reviews",
  description: "Reviews of the books I've read, from finance and philosophy to fiction and the sciences.",
}

export default function BooksPage() {
  const list = summaries()
  const read = list.filter((b) => !b.inProgress).length
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-indigo-500/[0.05] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-white/50 hover:text-blue-400">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>

        <header className="mb-12 grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="max-w-3xl">
            <h1 className="mb-6 font-serif text-4xl tracking-tight text-white md:text-6xl">
              Jonathan&apos;s <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">Library</span>
            </h1>
            <IconHover3D
              heading="Welcome to my book reviews!"
              text="I started reading seriously when I was in National Service."
              className="mb-6 bg-transparent"
              style={{ backgroundColor: "transparent" }}
            />
            {/* The rest of the intro from the Notion library, point for point (the total is the big number beside it). */}
            <ul className="space-y-2.5 text-base leading-relaxed text-white/55 md:text-[17px]">
              {[
                <>My reviews cover a range of genres, including self-help, finance, philosophy and the various sciences.</>,
                <>I aim to provide insightful summaries and personal reflections on each book.</>,
                <>I&apos;m more than happy to discuss and hear your thoughts on the books I review.</>,
                <>Feel free to explore my thoughts and recommendations to find your next great read!</>,
                <>
                  <span className="font-semibold text-white/75">Disclaimer:</span> My reviews are based on personal perspectives and
                  experiences. Opinions on books may vary, so I encourage you to read and form your own views.
                </>,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-blue-400/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <BooksRead count={read} />
        </header>

        <Bookshelf books={list} />
      </div>
    </main>
  )
}
