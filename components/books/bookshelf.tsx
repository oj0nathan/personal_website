"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowDownUp, Atom, BookOpen, Briefcase, Brain, GraduationCap, Landmark, Library, LineChart, Shuffle, Sparkles } from "lucide-react"
import { Book } from "@/components/ui/book"
import { Stars } from "@/components/books/stars"
import { SHELVES, byRecent, type BookSummary, type ShelfId } from "@/lib/book-shelves"
import { cn } from "@/lib/utils"

const ICONS: Record<ShelfId | "all", React.ComponentType<{ className?: string }>> = {
  all: Library,
  finance: LineChart,
  philosophy: Sparkles,
  fiction: BookOpen,
  history: Landmark,
  science: Atom,
  biography: Briefcase,
  mind: Brain,
  textbook: GraduationCap,
}

type Sort = "recent" | "rating" | "title"

function shuffled<T>(items: T[]) {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function Bookshelf({ books }: { books: BookSummary[] }) {
  const [shelf, setShelf] = React.useState<ShelfId | "all">("all")
  const [sort, setSort] = React.useState<Sort>("recent")
  const [order, setOrder] = React.useState<string[] | null>(null)

  const counts = React.useMemo(() => {
    const c: Record<string, number> = { all: books.length }
    for (const s of SHELVES) c[s.id] = books.filter((b) => b.topics.some((t) => (s.topics as readonly string[]).includes(t))).length
    return c
  }, [books])

  const visible = React.useMemo(() => {
    const def = SHELVES.find((s) => s.id === shelf)
    const list = def ? books.filter((b) => b.topics.some((t) => (def.topics as readonly string[]).includes(t))) : books
    if (order) {
      const rank = new Map(order.map((slug, i) => [slug, i]))
      return [...list].sort((a, b) => (rank.get(a.slug) ?? 0) - (rank.get(b.slug) ?? 0))
    }
    if (sort === "rating") return [...list].sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1) || byRecent(a, b))
    if (sort === "title") return [...list].sort((a, b) => a.title.localeCompare(b.title))
    return [...list].sort(byRecent)
  }, [books, shelf, sort, order])

  const chip = (active: boolean) =>
    cn(
      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
      active ? "border-blue-400/60 bg-blue-500/10 text-blue-300" : "border-white/10 text-white/60 hover:border-white/25 hover:text-white",
    )

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Shelves">
        {(["all", ...SHELVES.map((s) => s.id)] as const).map((id) => {
          const Icon = ICONS[id]
          const label = id === "all" ? "All Books" : SHELVES.find((s) => s.id === id)!.label
          return (
            <button key={id} type="button" aria-pressed={shelf === id} onClick={() => setShelf(id)} className={chip(shelf === id)}>
              <Icon className="size-4" />
              {label}
              <span className="text-xs text-white/35">{counts[id]}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
        <button type="button" onClick={() => setOrder(shuffled(books.map((b) => b.slug)))} className={chip(order !== null)}>
          <Shuffle className="size-4" />
          Shuffle
        </button>
        <label className={cn(chip(false), "cursor-pointer")}>
          <ArrowDownUp className="size-4" />
          <span className="sr-only">Sort by</span>
          <select
            value={order ? "" : sort}
            onChange={(e) => {
              setOrder(null)
              setSort(e.target.value as Sort)
            }}
            className="cursor-pointer bg-transparent outline-none [&>option]:bg-neutral-900"
          >
            {order && <option value="">Shuffled</option>}
            <option value="recent">Most recent</option>
            <option value="rating">Highest rated</option>
            <option value="title">Title A–Z</option>
          </select>
        </label>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {visible.map((book) => (
          <li key={book.slug}>
            <Link href={`/books/${book.slug}`} className="group/card block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#030303]">
              <div className="flex justify-center">
                <Book image={book.cover} alt={`Cover of ${book.title}`} depth={8} color="#1f2937" tilt={34} peek className="[--book-width:132px] sm:[--book-width:150px] lg:[--book-width:164px]" />
              </div>
              <div className="mt-5 space-y-1.5 px-1">
                <h2 className="line-clamp-2 font-serif text-lg leading-snug text-white group-hover/card:text-blue-300">{book.title}</h2>
                <p className="line-clamp-1 text-sm text-white/50">{book.author}</p>
                <div className="flex items-center gap-2">
                  {book.inProgress ? (
                    <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-blue-300">Reading</span>
                  ) : (
                    <Stars rating={book.rating} />
                  )}
                </div>
                {book.excerpt && <p className="line-clamp-2 pt-1 text-[13px] leading-relaxed text-white/40">{book.excerpt}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
