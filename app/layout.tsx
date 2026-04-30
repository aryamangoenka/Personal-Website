import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Aryaman Goenka — Founder, Assemblr",
  description:
    "Founder building Assemblr at Founders, Inc. Agents, applied AI, and a few things in between.",
  openGraph: {
    title: "Aryaman Goenka — Founder, Assemblr",
    description:
      "Founder building Assemblr at Founders, Inc. Agents, applied AI, and a few things in between.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
