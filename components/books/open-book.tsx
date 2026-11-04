"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Stars } from "@/components/books/stars"
import { Review } from "@/components/books/review"
import type { Book } from "@/lib/book-shelves"

type Neighbour = { slug: string; title: string } | null

// The animation lives in this sheet: the site's global `* { transition: … }` rule is unlayered and would
// override Tailwind's transition utilities.
//
// Wide screens: the spread starts shifted left by a quarter, so the closed book (the right half) sits centred.
// The cover is a leaf hinged on the spine; it swings 180° to the left and its inside becomes the left page,
// while the spread slides back to centre and the review fades in on the right page.
// Narrow screens: the inside of the cover and the review stack into one page that rises in.
const CSS = `
.ob-stage{perspective:2400px}
.ob-paper{background:linear-gradient(90deg,#efe9df 0,#f8f5f0 6%,#faf8f4 100%)}
.ob-paper-left{background:linear-gradient(270deg,#e7e0d4 0,#f3efe8 5%,#f8f5f0 100%)}
.ob-right-inner{scrollbar-width:thin;scrollbar-color:rgba(60,50,40,.25) transparent}
.ob-right-inner::-webkit-scrollbar{width:6px}
.ob-right-inner::-webkit-scrollbar-thumb{background:rgba(60,50,40,.25);border-radius:3px}
.ob-right-inner::-webkit-scrollbar-track{background:transparent}
@media (min-width:768px){
  .ob-spread{position:relative;display:flex;height:min(86vh,880px);transform:translateX(-25%);transition:transform 1.1s cubic-bezier(.65,0,.35,1) .2s}
  .ob-open .ob-spread{transform:none}
  .ob-gap{width:50%}
  .ob-right{width:50%;border-radius:0 6px 6px 0;box-shadow:0 30px 60px -20px rgba(0,0,0,.6)}
  .ob-right-inner{opacity:0;transition:opacity .7s ease 1.25s}
  .ob-open .ob-right-inner{opacity:1}
  .ob-leaf{position:absolute;left:50%;top:0;width:50%;height:100%;z-index:2;transform-origin:left center;transform-style:preserve-3d;transition:transform 1.45s cubic-bezier(.65,0,.35,1) .35s}
  .ob-open .ob-leaf{transform:rotateY(-180deg)}
  .ob-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}
  .ob-front{border-radius:0 6px 6px 0;overflow:hidden;box-shadow:0 30px 60px -20px rgba(0,0,0,.7)}
  .ob-back{transform:rotateY(180deg);border-radius:6px 0 0 6px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6)}
  .ob-mobile-cover{display:none}
}
@media (max-width:767px){
  .ob-spread{animation:ob-rise .7s cubic-bezier(.2,.8,.2,1) both}
  .ob-gap,.ob-front{display:none}
  .ob-back{border-radius:6px 6px 0 0}
  .ob-right{border-radius:0 0 6px 6px}
}
@keyframes ob-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){
  .ob-spread,.ob-leaf,.ob-right-inner{transition:none!important;animation:none!important}
}
`

function finishedLabel(iso: string | null) {
  if (!iso) return null
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { month: "long", year: "numeric" })
}

export function OpenBook({ book, prev, next }: { book: Book; prev: Neighbour; next: Neighbour }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 120)
    return () => window.clearTimeout(t)
  }, [])

  const finished = finishedLabel(book.finished)

  return (
    <div className={"ob-stage" + (open ? " ob-open" : "")}>
      <style>{CSS}</style>
      <div className="ob-spread">
        <div className="ob-gap" aria-hidden="true" />

        {/* The cover leaf: front is the cover, back is the left page. */}
        <div className="ob-leaf">
          <div className="ob-face ob-front" aria-hidden="true">
            <img src={book.cover} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-y-0 left-0 w-[6%] bg-book-bind-bg mix-blend-overlay" />
          </div>

          <div className="ob-face ob-back ob-paper-left flex flex-col overflow-hidden p-8 text-neutral-800 md:p-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">Jonathan&apos;s Library</p>

            <div className="mt-8 flex gap-5 md:mt-10">
              <img src={book.cover} alt={`Cover of ${book.title}`} className="ob-mobile-cover h-36 w-24 flex-none rounded-sm object-cover shadow-md" />
              <div className="min-w-0">
                <h1 className="font-serif text-3xl leading-tight text-neutral-900 md:text-[2.6rem]">{book.title}</h1>
                <p className="mt-3 text-lg text-neutral-600">{book.author}</p>
              </div>
            </div>

            <dl className="mt-8 space-y-4 rounded-md border border-black/5 bg-white/50 p-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-neutral-500">My rating</dt>
                <dd>{book.inProgress ? <span className="text-blue-700">Currently reading</span> : <Stars rating={book.rating} className="text-amber-600" track="text-neutral-300" />}</dd>
              </div>
              {finished && (
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-neutral-500">Finished</dt>
                  <dd className="text-neutral-800">{finished}</dd>
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <dt className="text-neutral-500">Topics</dt>
                <dd className="flex flex-wrap justify-end gap-1.5">
                  {book.topics.map((t) => (
                    <span key={t} className="rounded-full border border-neutral-300 px-2.5 py-0.5 text-xs text-neutral-600">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <nav className="mt-auto flex items-center justify-between gap-4 pt-8 text-sm text-neutral-600">
              {prev ? (
                <Link href={`/books/${prev.slug}`} className="inline-flex min-w-0 items-center gap-1.5 hover:text-neutral-900">
                  <ArrowLeft className="h-4 w-4 flex-none" />
                  <span className="truncate">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link href={`/books/${next.slug}`} className="inline-flex min-w-0 items-center gap-1.5 text-right hover:text-neutral-900">
                  <span className="truncate">{next.title}</span>
                  <ArrowRight className="h-4 w-4 flex-none" />
                </Link>
              )}
            </nav>
          </div>
        </div>

        {/* The right page: the review. */}
        <div className="ob-right ob-paper relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-10 bg-gradient-to-r from-black/10 to-transparent md:block" />
          <div className="ob-right-inner h-full overflow-y-auto px-8 py-10 md:px-14 md:py-14">
            <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-neutral-500">Review</p>
            {book.review.length ? (
              <Review blocks={book.review} />
            ) : (
              <p className="font-serif text-lg italic text-neutral-500">{book.inProgress ? "Still reading this one. A review is on its way." : "No written review for this one yet."}</p>
            )}
            <p className="mt-12 text-right font-serif text-sm text-neutral-400">— J.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
