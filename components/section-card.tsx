"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

interface Section {
  id: string
  title: string
  description: string
  image: string
  href: string
  isExternal?: boolean
  isVideo?: boolean
}

export function SectionCard({ section }: { section: Section }) {
  const CardContent = () => (
    <Card className="group relative overflow-hidden bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 h-44 sm:h-52 md:h-60 cursor-pointer hover:scale-[1.02] sm:hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
      {/* Background */}
      <div className="absolute inset-0">
        {section.isVideo ? (
          <video
            src={section.image}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <Image
            src={section.image || "/placeholder.svg"}
            alt={section.title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={section.id === "contacts" || section.id === "packages"}
          />
        )}
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Title - always visible at bottom on mobile, on hover on desktop */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 md:translate-y-full md:group-hover:translate-y-0 sm:translate-y-0 sm:opacity-100">
        <p className="text-white font-bold text-sm text-center drop-shadow-lg leading-tight">{section.title}</p>
      </div>

      {/* Mobile: always show title */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent md:hidden">
        <p className="text-white font-bold text-xs text-center leading-tight">{section.title}</p>
      </div>
    </Card>
  )

  if (section.isExternal) {
    return (
      <a href={section.href} target="_blank" rel="noopener noreferrer" aria-label={section.title}>
        <CardContent />
      </a>
    )
  }

  return (
    <Link href={section.href} aria-label={section.title}>
      <CardContent />
    </Link>
  )
}
