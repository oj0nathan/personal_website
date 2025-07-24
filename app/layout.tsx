import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Jonathan Ho - Portfolio",
  description:
    "Computer Science student at SMU passionate about quantitative finance, machine learning, and building innovative solutions",
  keywords: [
    "Jonathan Ho",
    "Computer Science",
    "SMU",
    "Quantitative Finance",
    "Machine Learning",
    "Portfolio",
    "JohoBlogs",
  ],
  authors: [{ name: "Jonathan Ho" }],
  creator: "Jonathan Ho",
  publisher: "Jonathan Ho",
  openGraph: {
    title: "Jonathan Ho - Portfolio",
    description:
      "Computer Science student at SMU passionate about quantitative finance, machine learning, and building innovative solutions",
    url: "https://jonathanhosa04.vercel.app",
    siteName: "Jonathan Ho Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonathan Ho - Portfolio",
    description:
      "Computer Science student at SMU passionate about quantitative finance, machine learning, and building innovative solutions",
    creator: "@johoblogs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1E40AF" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
