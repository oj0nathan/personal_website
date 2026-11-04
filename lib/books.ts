import data from "./books.json"
import { byRecent, plain, type Book, type BookSummary } from "./book-shelves"

// lib/books.json is exported from Jonathan's Notion library (https://joholibrary.notion.site):
// titles, ratings, topics, finish dates and full reviews, with covers saved to public/books.
// Server only: pages pass the client just what it shows.

export const books = data as Book[]

function excerpt(book: Book) {
  // Books still being read only have working notes, not a review worth quoting.
  if (book.inProgress) return ""
  const first = book.review.find((b) => b.type === "p" && plain(b.text).trim().length > 40)
  const text = first ? plain(first.text).replace(/\s+/g, " ").trim() : ""
  return text.length > 150 ? text.slice(0, 147).replace(/\s+\S*$/, "") + "…" : text
}

export function summaries(): BookSummary[] {
  return books.map(({ review, ...rest }) => ({ ...rest, excerpt: excerpt({ review, ...rest }) })).sort(byRecent)
}

/** The book plus its neighbours in shelf order, for prev/next links. */
export function bookWithNeighbours(slug: string) {
  const order = [...books].sort(byRecent)
  const i = order.findIndex((b) => b.slug === slug)
  if (i < 0) return null
  const pick = (b?: Book) => (b ? { slug: b.slug, title: b.title } : null)
  return { book: order[i], prev: pick(order[i - 1]), next: pick(order[i + 1]) }
}
