"use client"

import { useEffect, useState } from "react"
import { Zap, TrendingUp, Star, Award, Target, Flame } from "lucide-react"

const STATS = [
  { icon: Flame,     text: "شوقي جروب - الأقوى في التشطيبات",     color: "text-orange-400" },
  { icon: Star,      text: "جودة لا تُضاهى في كل مشروع",           color: "text-amber-400" },
  { icon: Target,    text: "دقة في التنفيذ • التزام بالمواعيد",     color: "text-blue-400" },
  { icon: Award,     text: "ثقة أكثر من 900 عميل",                  color: "text-purple-400" },
  { icon: TrendingUp,text: "نمو مستمر • فريق محترف",                color: "text-green-400" },
  { icon: Zap,       text: "سرعة في الإنجاز • احترافية في العمل",   color: "text-cyan-400" },
]

export function RamadanMarquee() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 1) % (STATS.length * 320))
    }, 20)
    return () => clearInterval(interval)
  }, [])

  const items = [...STATS, ...STATS, ...STATS]

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-r from-black via-[#0d0d14] to-black py-3">
      {/* glow edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ transform: `translateX(${offset}px)`, transition: "none" }}
      >
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} className="flex items-center gap-2 px-8 min-w-[320px]">
              <div className="w-px h-5 bg-amber-500/30 ml-4" />
              <Icon className={`w-4 h-4 flex-shrink-0 ${item.color}`} />
              <span className={`text-sm font-bold ${item.color}`}>{item.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
