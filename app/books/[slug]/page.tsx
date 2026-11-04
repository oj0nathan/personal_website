import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { OpenBook } from "@/components/books/open-book"
import { bookWithNeighbours, books } from "@/lib/books"

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = bookWithNeighbours((await params).slug)
  if (!found) return {}
  return { title: `${found.book.title} - Jonathan's Library`, description: `My review of ${found.book.title} by ${found.book.author}.` }
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const found = bookWithNeighbours((await params).slug)
  if (!found) notFound()

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-indigo-500/[0.05] blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
        <Link href="/books" className="mb-6 inline-flex items-center gap-2 text-white/50 hover:text-blue-400">
          <ArrowLeft className="h-4 w-4" />
          <span>Library</span>
        </Link>
        {/* Keyed by slug so moving to the next book replays the opening. */}
        <OpenBook key={found.book.slug} book={found.book} prev={found.prev} next={found.next} />
      </div>
    </main>
  )
}
