import { NextResponse } from "next/server"

// Sends contact-form messages to Jonathan's inbox through Resend (https://resend.com).
// Needs RESEND_API_KEY in the environment (.env.local locally, Project Settings → Environment Variables on Vercel).
// Optional: CONTACT_TO (defaults to Jonathan's Gmail) and CONTACT_FROM (defaults to Resend's shared sender,
// which can only deliver to the Resend account's own address until a domain is verified).

const TO = process.env.CONTACT_TO || "jonathanhosa04@gmail.com"
const FROM = process.env.CONTACT_FROM || "Portfolio Contact <onboarding@resend.dev>"
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const field = (key: string, max: number) => String(body[key] ?? "").trim().slice(0, max)
  const name = field("name", 120)
  const email = field("email", 200)
  const company = field("company", 160)
  const message = field("message", 5000)

  // Honeypot: a hidden field people never fill in. Bots that do get a quiet "success".
  if (field("website", 200)) return NextResponse.json({ ok: true })

  if (!name || !message || !EMAIL.test(email)) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error("Contact form: RESEND_API_KEY is not set")
    return NextResponse.json({ error: "Email isn't set up yet. Please reach out on LinkedIn instead." }, { status: 503 })
  }

  const subject = `Portfolio message from ${name}${company ? ` (${company})` : ""}`
  const lines = [`Name: ${name}`, `Email: ${email}`, ...(company ? [`Company: ${company}`] : []), "", message]
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
      <p><strong>Name:</strong> ${escape(name)}<br/><strong>Email:</strong> <a href="mailto:${escape(email)}">${escape(email)}</a>${company ? `<br/><strong>Company:</strong> ${escape(company)}` : ""}</p>
      <p style="white-space:pre-wrap;border-left:3px solid #3b82f6;padding-left:12px">${escape(message)}</p>
    </div>`

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject, text: lines.join("\n"), html }),
  })

  if (!res.ok) {
    console.error("Contact form: Resend responded", res.status, await res.text())
    return NextResponse.json({ error: "Your message couldn't be sent. Please try again in a moment." }, { status: 502 })
  }

  const sent = (await res.json()) as { id?: string }
  return NextResponse.json({ ok: true, id: sent.id ?? null })
}
