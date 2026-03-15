import Link from "next/link"
import Image from "next/image"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  description: string
  icon: LucideIcon
}

export function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  return (
    <header className="bg-gradient-to-b from-background to-card py-8 px-4 border-b border-border">
      <div className="max-w-6xl mx-auto">
        {/* Top bar with logo and back button */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary gap-2">
              <ArrowRight className="w-4 h-4" />
              الصفحة الرئيسية
            </Button>
          </Link>
          <Link href="/">
            <Image
              src="/images/asset-2014.png"
              alt="Shawky Group Logo"
              width={140}
              height={60}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Page title */}
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
