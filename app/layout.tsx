import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#1E40AF" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
