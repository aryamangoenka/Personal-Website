import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aryaman Goenka - AI/ML Developer & Computer Science Student",
  description:
    "Passionate Computer Science student at UMass Amherst specializing in AI/ML, neural networks, and full-stack development. Building the future with intelligent solutions.",
  keywords:
    "Aryaman Goenka, Computer Science, AI, Machine Learning, Neural Networks, Full Stack Developer, UMass Amherst",
  authors: [{ name: "Aryaman Goenka" }],
  openGraph: {
    title: "Aryaman Goenka - AI/ML Developer",
    description: "Building intelligent solutions with AI/ML and modern web technologies",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
