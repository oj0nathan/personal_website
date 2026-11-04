// Re-exports the book library from the public Notion site into the website.
//   node scripts/sync-books.mjs        (or: pnpm books:sync)
// Writes lib/books.json (titles, ratings, topics, dates, full reviews) and public/books/<slug>.webp covers.
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"

const SITE = "https://joholibrary.notion.site"
const SPACE = "0f6cd240-5944-4cb9-a649-035b3bae5d8b"
const COLLECTION = "dd4961ad-5b5c-4f34-b38c-c4a148902597"
const VIEW = "5a54c3c1-4fad-46af-b5b8-e4e588157a11"
// Notion's internal ids for the database columns.
const COL = { rating: "cpge", topic: "kfdQ", finished: "lUA<", author: "poBD" }

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..")
const coverDir = path.join(root, "public", "books")

// sharp ships with Next.js; borrow its copy rather than adding a dependency.
const require = createRequire(import.meta.url)
const sharpDir = fs.readdirSync(path.join(root, "node_modules", ".pnpm")).find((d) => d.startsWith("sharp@"))
const sharp = require(path.join(root, "node_modules", ".pnpm", sharpDir, "node_modules", "sharp"))
sharp.cache(false)

const unwrap = (v) => { while (v && v.value) v = v.value; return v }
const text = (p) => (p || []).map((x) => x[0]).join("")
const slugify = (s) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[’'`]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

async function post(endpoint, body) {
  const res = await fetch(SITE + "/api/v3/" + endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
  if (!res.ok) throw new Error(endpoint + " " + res.status)
  return res.json()
}

async function rows() {
  const j = await post("queryCollection?src=initial_load", {
    source: { type: "collection", id: COLLECTION, spaceId: SPACE },
    collectionView: { id: VIEW, spaceId: SPACE },
    loader: { type: "reducer", reducers: { collection_group_results: { type: "results", limit: 500 } }, searchQuery: "", userTimeZone: "Asia/Singapore" },
  })
  return j.result.reducerResults.collection_group_results.blockIds.map((id) => ({ id, ...unwrap(j.recordMap.block[id]) }))
}

async function pageBlocks(id) {
  const blocks = {}
  let cursor = { stack: [] }
  for (let n = 0; n < 10; n++) {
    const j = await post("loadCachedPageChunkV2", { page: { id }, limit: 300, cursor, verticalColumns: false })
    Object.assign(blocks, j.recordMap.block)
    if (!j.cursors || !j.cursors.length) break
    cursor = j.cursors[0]
  }
  return (bid) => unwrap(blocks[bid])
}

// Notion rich text → [{ t, b?, i?, href? }]
const rich = (title) =>
  (title || [])
    .map(([t, marks]) => {
      const seg = { t }
      for (const m of marks || []) {
        if (m[0] === "b") seg.b = true
        else if (m[0] === "i") seg.i = true
        else if (m[0] === "a") seg.href = m[1]
      }
      return seg
    })
    .filter((s) => s.t && s.t !== "‣")

const TYPES = { text: "p", quote: "quote", header: "h2", sub_header: "h3", sub_sub_header: "h3", bulleted_list: "li", numbered_list: "ol", callout: "callout" }

function walk(ids, get, out, depth = 0) {
  for (const id of ids || []) {
    const b = get(id)
    if (!b || b.alive === false) continue
    if (b.type === "divider") { out.push({ type: "hr" }); continue }
    // Toggles stay collapsible on the site (they often hide spoilers).
    if (b.type === "toggle") {
      const children = []
      walk(b.content, get, children, depth + 1)
      out.push({ type: "toggle", text: rich(b.properties && b.properties.title), children })
      continue
    }
    const kind = TYPES[b.type]
    if (kind) {
      const t = rich(b.properties && b.properties.title)
      if (t.some((s) => s.t.trim())) out.push({ type: kind, text: t })
    }
    if (b.content && depth < 2 && b.type !== "page") walk(b.content, get, out, depth + 1)
  }
}

fs.mkdirSync(coverDir, { recursive: true })
const books = []
const seen = new Set()
for (const row of await rows()) {
  const P = row.properties || {}
  const title = text(P.title).replace(/\s+/g, " ").trim()
  if (!title) continue
  let slug = slugify(title)
  while (seen.has(slug)) slug += "-2"
  seen.add(slug)
  const topics = text(P[COL.topic]).split(",").map((s) => s.trim()).filter(Boolean)
  const date = (P[COL.finished] || []).flatMap((x) => x[1] || []).find((m) => m[0] === "d")
  const rating = /([\d.]+)/.exec(text(P[COL.rating]))
  const book = {
    slug,
    title,
    author: text(P[COL.author]).replace(/\s+/g, " ").trim(),
    rating: rating ? Number(rating[1]) : null,
    topics: topics.filter((t) => t !== "In-Progress"),
    inProgress: topics.includes("In-Progress"),
    finished: date ? date[1].start_date : null,
    notion: SITE + "/" + row.id.replace(/-/g, ""),
    cover: "",
    review: [],
  }
  try {
    const get = await pageBlocks(row.id)
    const page = get(row.id)
    walk(page && page.content, get, book.review)
    const raw = page && page.format && page.format.page_cover
    if (raw) {
      const url = raw.startsWith("http") && !raw.includes("amazonaws") ? raw : SITE + "/image/" + encodeURIComponent(raw) + "?table=block&id=" + row.id + "&spaceId=" + SPACE + "&width=800&cache=v2"
      const res = await fetch(url)
      if (!res.ok) throw new Error("cover " + res.status)
      const webp = await sharp(Buffer.from(await res.arrayBuffer())).rotate().resize({ width: 480, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer()
      fs.writeFileSync(path.join(coverDir, slug + ".webp"), webp)
      book.cover = "/books/" + slug + ".webp"
    }
  } catch (e) {
    console.error("  ! " + title + ": " + e.message)
  }
  books.push(book)
  console.log((book.cover ? "  " : "  (no cover) ") + title)
}

fs.writeFileSync(path.join(root, "lib", "books.json"), JSON.stringify(books))
console.log("Synced " + books.length + " books")
