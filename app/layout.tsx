import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aryaman Goenka",
  description: "Software Engineer & ML Practitioner. CS @ UMass Amherst.",
  keywords: "Aryaman Goenka, Software Engineer, Machine Learning, AI, UMass Amherst",
  authors: [{ name: "Aryaman Goenka" }],
  openGraph: {
    title: "Aryaman Goenka",
    description: "Software Engineer & ML Practitioner",
    type: "website",
  },
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
