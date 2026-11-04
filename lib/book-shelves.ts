// Shared by the server data module (lib/books.ts) and client components. Keep the review data out of here:
// importing lib/books.json from a client component would ship every review to the browser.

export type Segment = { t: string; b?: boolean; i?: boolean; href?: string }
export type Block = { type: "p" | "quote" | "h2" | "h3" | "li" | "ol" | "hr" | "toggle" | "callout"; text?: Segment[]; children?: Block[] }

export type Book = {
  slug: string
  title: string
  author: string
  /** Out of 5, in halves; null when the book has no rating yet. */
  rating: number | null
  topics: string[]
  inProgress: boolean
  /** ISO date the book was finished. */
  finished: string | null
  notion: string
  cover: string
  review: Block[]
}

/** What the shelf needs: everything but the review, plus a one-line excerpt. */
export type BookSummary = Omit<Book, "review"> & { excerpt: string }

/** Broad shelves for the filter row; each groups one or more Notion topics. */
export const SHELVES = [
  { id: "finance", label: "Finance & Trading", topics: ["Finance", "Interview Book", "Summary Book"] },
  { id: "philosophy", label: "Philosophy & Theology", topics: ["Philosophy", "Theology"] },
  { id: "fiction", label: "Fiction & Literature", topics: ["Fiction", "Literature"] },
  { id: "history", label: "History & Society", topics: ["History", "Non-Fiction"] },
  { id: "science", label: "Science & Tech", topics: ["Science", "Biology", "Physics", "Computer Science"] },
  { id: "biography", label: "Biography & Business", topics: ["Biography", "Business"] },
  { id: "mind", label: "Rationality & Self-Help", topics: ["Rationality", "Self-Help"] },
  { id: "textbook", label: "Textbooks", topics: ["Textbook"] },
] as const

export type ShelfId = (typeof SHELVES)[number]["id"]

export function plain(segments: Segment[] = []) {
  return segments.map((s) => s.t).join("")
}

/** Newest first; books still being read go to the front. */
export function byRecent(a: { finished: string | null; inProgress: boolean }, b: { finished: string | null; inProgress: boolean }) {
  if (a.inProgress !== b.inProgress) return a.inProgress ? -1 : 1
  return (b.finished ?? "").localeCompare(a.finished ?? "")
}
