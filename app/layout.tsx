import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import { FinishingStagesBackground } from "@/components/finishing-stages-background"
import { AudioPlayer } from "@/components/audio-player"
import "./globals.css"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "منصة شوقي جروب - دليل الموظف",
  description: "منصة شوقي جروب الداخلية للموظفين - التشطيبات والديكور",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png",  media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body className="font-sans antialiased min-h-screen w-full overflow-x-hidden">
        <FinishingStagesBackground />
        <AudioPlayer audioUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1%20%281%29-aoeBYNORIRtr3jO0CEva9poU6ELqs0.mp3" />
        {children}
      </body>
    </html>
  )
}
