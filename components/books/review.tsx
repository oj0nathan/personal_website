import * as React from "react"
import type { Block, Segment } from "@/lib/book-shelves"

function Text({ segments = [] }: { segments?: Segment[] }) {
  return (
    <>
      {segments.map((s, i) => {
        let node: React.ReactNode = s.t
        if (s.b) node = <strong className="font-semibold text-neutral-900">{node}</strong>
        if (s.i) node = <em>{node}</em>
        if (s.href)
          node = (
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-2">
              {node}
            </a>
          )
        return <React.Fragment key={i}>{node}</React.Fragment>
      })}
    </>
  )
}

/** A Notion review: paragraphs, quotes, headings and lists, keeping bold, italic and links. */
export function Review({ blocks }: { blocks: Block[] }) {
  const out: React.ReactNode[] = []
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]
    if (b.type === "li" || b.type === "ol") {
      const items: Block[] = []
      while (i < blocks.length && blocks[i].type === b.type) items.push(blocks[i++])
      i--
      const List = b.type === "ol" ? "ol" : "ul"
      out.push(
        <List key={i} className={b.type === "ol" ? "list-decimal space-y-1.5 pl-6" : "list-disc space-y-1.5 pl-6 marker:text-neutral-400"}>
          {items.map((it, k) => (
            <li key={k}>
              <Text segments={it.text} />
            </li>
          ))}
        </List>,
      )
    } else if (b.type === "quote")
      out.push(
        <blockquote key={i} className="border-l-2 border-amber-700/50 pl-4 font-serif text-[17px] italic text-neutral-700">
          <Text segments={b.text} />
        </blockquote>,
      )
    else if (b.type === "h2")
      out.push(
        <h3 key={i} className="pt-2 font-serif text-2xl text-neutral-900">
          <Text segments={b.text} />
        </h3>,
      )
    else if (b.type === "h3")
      out.push(
        <h4 key={i} className="pt-1 font-serif text-xl text-neutral-900">
          <Text segments={b.text} />
        </h4>,
      )
    else if (b.type === "hr") out.push(<hr key={i} className="border-neutral-300" />)
    else if (b.type === "callout")
      out.push(
        <div key={i} className="rounded-md bg-neutral-200/60 px-4 py-3 font-medium text-neutral-800">
          <Text segments={b.text} />
        </div>,
      )
    else if (b.type === "toggle")
      out.push(
        <details key={i} className="group rounded-md border border-neutral-300/70 bg-white/40 px-4 py-3">
          <summary className="cursor-pointer select-none font-medium text-neutral-800 marker:text-neutral-400">
            <Text segments={b.text} />
          </summary>
          <div className="mt-3">
            <Review blocks={b.children ?? []} />
          </div>
        </details>,
      )
    else
      out.push(
        <p key={i}>
          <Text segments={b.text} />
        </p>,
      )
  }
  return <div className="space-y-4 text-[15.5px] leading-[1.8] text-neutral-700">{out}</div>
}
