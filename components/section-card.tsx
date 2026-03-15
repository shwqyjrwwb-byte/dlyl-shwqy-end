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

interface SectionCardProps {
  section: Section
}

export function SectionCard({ section }: SectionCardProps) {
  const CardContent = () => (
    <Card className="group relative overflow-hidden bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 h-48 sm:h-56 md:h-64 cursor-pointer hover:scale-[1.02] sm:hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
      {/* Background Image or Video */}
      <div className="absolute inset-0">
        {section.isVideo ? (
          <video 
            src={section.image}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <Image 
            src={section.image || "/placeholder.svg"} 
            alt={section.title}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-500"
            priority={section.id === "contacts" || section.id === "packages"}
          />
        )}
      </div>

      {/* Content - Empty for hover effect only */}
      <div className="relative h-full" />
    </Card>
  )

  if (section.isExternal) {
    return (
      <a href={section.href} target="_blank" rel="noopener noreferrer">
        <CardContent />
      </a>
    )
  }

  return (
    <Link href={section.href}>
      <CardContent />
    </Link>
  )
}
